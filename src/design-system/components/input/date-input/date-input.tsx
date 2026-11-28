// src/design-system/components/input/date-input/date-input.tsx

"use client";

import { CalendarDate } from "@internationalized/date";
import { FloatingLabel } from "@/design-system/components/input/floating-label/floating-label";
import { floatingLabelWrapperCss } from "@/design-system/styles/floating-label.css";
import {
  forwardRef,
  Fragment,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type RefObject,
} from "react";

import { IconButton } from "@/design-system/components/button/button/button";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { useFieldContextValue } from "@/design-system/components/input/context/field.context";
import type {
  DateInputProps,
  FieldInputProps,
  FieldKey,
  FieldValues,
} from "@/design-system/components/input/date-input/date-input.type";
import type { DateValue } from "@/design-system/components/input/date-picker/date-picker.type";
import { DatePickerTrigger } from "@/design-system/components/input/date-picker/date-picker";
import {
  getFieldOrder,
  getMaxLength,
  getPlaceholder,
  parseISODate,
  toISODate,
  validateFromFields,
} from "@/design-system/components/input/utils/date.utils";
import { Box } from "@/design-system/components/layout/box/box";
import { HStack } from "@/design-system/components/layout/flex-box/flex-box";
import { usePopDisclosure } from "@/design-system/components/overlay/hooks/use-pop-disclosure";
import { P } from "@/design-system/components/typography/p/p";
import { useThemeStore } from "@/design-system/stores/theme-store";
import { useFieldContext } from "@chakra-ui/react";
import { CalendarIcon } from "@phosphor-icons/react";
import { t } from "@/shared/libs/i18n";

// -------------------------------------------------------------------------------------
// Helpers
// -------------------------------------------------------------------------------------

const EMPTY_FIELDS: FieldValues = { day: "", month: "", year: "" };

function isoToFields(iso: DateValue): FieldValues {
  if (!iso) return EMPTY_FIELDS;
  const parsed = parseISODate(iso);
  if (!parsed) return EMPTY_FIELDS;
  return {
    day: String(parsed.day).padStart(2, "0"),
    month: String(parsed.month).padStart(2, "0"),
    year: String(parsed.year).padStart(4, "0"),
  };
}

function fieldsToCalendarDate(fields: FieldValues): CalendarDate | null {
  const day = parseInt(fields.day, 10);
  const month = parseInt(fields.month, 10);
  const year = parseInt(fields.year, 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) return null;

  // Reject out-of-range values before constructing —
  // CalendarDate silently normalizes overflow instead of throwing.
  if (month < 1 || month > 12) return null;
  if (day < 1 || day > 31) return null;

  try {
    const cd = new CalendarDate(year, month, day);
    // Detect normalization (e.g. Feb 30 -> Mar 2)
    if (cd.day !== day || cd.month !== month || cd.year !== year) {
      return null;
    }
    return cd;
  } catch {
    return null;
  }
}

// -------------------------------------------------------------------------------------
// FieldInput — a single numeric input part
// -------------------------------------------------------------------------------------

const FieldInput = memo(function FieldInput(props: FieldInputProps) {
  // Props
  const {
    id,
    fieldKey,
    value,
    disabled,
    onValueChange,
    onAutoAdvance,
    onArrowNavigate,
    showPlaceholder = true,
    inputRef,
    onBlur,
  } = props;

  // Derived Values
  const maxLen = getMaxLength(fieldKey);
  const placeholder = getPlaceholder(fieldKey);
  const width =
    fieldKey === "year" ? "4.5ch" : fieldKey === "month" ? "3ch" : "2.5ch";

  // Handlers
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const rawValue = e.target.value.replace(/\D/g, "").slice(0, maxLen);
    onValueChange(fieldKey, rawValue);

    if (rawValue.length === maxLen) {
      onAutoAdvance(fieldKey);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && value === "") {
      onAutoAdvance(fieldKey); // go back
      return;
    }

    // Only jump fields when the caret is already at the edge of the segment —
    // otherwise let the browser move the caret within the current value normally.
    if (e.key === "ArrowRight") {
      const { selectionStart, selectionEnd } = e.currentTarget;
      const atEnd =
        selectionStart === value.length && selectionEnd === value.length;
      if (atEnd) {
        e.preventDefault();
        onArrowNavigate(fieldKey, "right");
      }
      return;
    }

    if (e.key === "ArrowLeft") {
      const { selectionStart, selectionEnd } = e.currentTarget;
      const atStart = selectionStart === 0 && selectionEnd === 0;
      if (atStart) {
        e.preventDefault();
        onArrowNavigate(fieldKey, "left");
      }
    }
  }

  return (
    <input
      id={id}
      ref={inputRef as RefObject<HTMLInputElement>}
      type={"text"}
      value={value}
      placeholder={showPlaceholder ? placeholder : ""}
      maxLength={maxLen}
      disabled={disabled}
      inputMode={"numeric"}
      aria-label={fieldKey}
      onChange={handleChange}
      onBlur={onBlur}
      onKeyDown={handleKeyDown}
      style={{
        width,
        minWidth: width,
        maxWidth: width,
        padding: 0,
        margin: 0,
        border: "none",
        outline: "none",
        background: "transparent",
        textAlign: "center",
        fontSize: "14px",
        fontVariantNumeric: "tabular-nums",
        fontFeatureSettings: '"tnum"',
        color: "inherit",
        cursor: "text",
        boxSizing: "content-box",
      }}
    />
  );
});

// -------------------------------------------------------------------------------------
// DateInput
// -------------------------------------------------------------------------------------

export const DateInput = memo(
  forwardRef<HTMLInputElement, DateInputProps>(function DateInput(props, ref) {
    // Props
    const {
      modalKey: propsModalKey = "",
      value: controlledValue,
      defaultValue,
      onValueChange,
      name,
      onChange,
      onBlur,
      inputFormat = "dmy",
      min,
      max,
      disabledDates,
      timezone,
      locale,
      disabled,
      datePickerSubtitle,
      ...restProps
    } = props;

    // Stores
    const { theme } = useThemeStore();

    // Contexts
    const chakraFieldContext = useFieldContext();
    const customFieldContext = useFieldContextValue();
    const isFloatingVariant = customFieldContext?.variant === "floating";
    const floatingLabel = isFloatingVariant
      ? customFieldContext?.label
      : undefined;
    const isOptional = customFieldContext?.optional;
    const isFieldInvalid = chakraFieldContext?.invalid;

    // Hooks
    const { modalKey } = usePopDisclosure({
      modalKey: propsModalKey,
    });

    // States
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [internalValue, setInternalValue] = useState<DateValue>(
      () => defaultValue ?? null,
    );

    // Derived Values
    const controlled = controlledValue !== undefined;
    const committedValue = controlled
      ? (controlledValue ?? null)
      : internalValue;

    const [fields, setFields] = useState<FieldValues>(() =>
      isoToFields(committedValue),
    );

    // Refs
    const prevCommittedRef = useRef<DateValue>(committedValue);
    if (prevCommittedRef.current !== committedValue) {
      prevCommittedRef.current = committedValue;
      setFields(isoToFields(committedValue));
    }

    // Refs for focus management
    const fieldOrder = useMemo(() => getFieldOrder(inputFormat), [inputFormat]);
    const fieldRefs = useRef<
      Record<FieldKey, RefObject<HTMLInputElement | null>>
    >({
      day: { current: null },
      month: { current: null },
      year: { current: null },
    });

    const validationOptions = useMemo(
      () => ({ min, max, disabledDates }),
      [min, max, disabledDates],
    );

    // RHF Handlers
    const handleValueChange = useCallback(
      (iso: DateValue) => {
        if (!controlled) setInternalValue(iso);
        onValueChange?.(iso);

        if (onChange) {
          onChange({
            target: { name, value: iso || "" },
            type: "change",
          } as unknown as ChangeEvent<HTMLInputElement>);
        }
      },
      [controlled, onValueChange, onChange, name],
    );

    // Commit value from fields
    const commitFields = useCallback(
      (nextFields: FieldValues) => {
        if (
          nextFields.day === "" &&
          nextFields.month === "" &&
          nextFields.year === ""
        ) {
          handleValueChange(null);
          return;
        }

        const day = parseInt(nextFields.day, 10);
        const month = parseInt(nextFields.month, 10);
        const year = parseInt(nextFields.year, 10);

        if (isNaN(day) || isNaN(month) || isNaN(year)) {
          return;
        }

        const result = validateFromFields(day, month, year, validationOptions);
        if (!result.valid) return;

        const date = new CalendarDate(year, month, day);
        const iso = toISODate(date);

        handleValueChange(iso);
      },
      [handleValueChange, validationOptions],
    );

    // ref mirror of fields, updated synchronously in event handlers
    // so blur (which can fire before React re-renders, e.g. during
    // auto-advance's synchronous .focus() call) always reads the latest value
    const fieldsRef = useRef<FieldValues>(fields);

    // keep ref in sync whenever the render-time reset happens
    if (prevCommittedRef.current !== committedValue) {
      prevCommittedRef.current = committedValue;
      const resetFields = isoToFields(committedValue);
      fieldsRef.current = resetFields;
      setFields(resetFields);
    }

    // Handlers
    function handleFieldChange(field: FieldKey, rawValue: string) {
      const nextFields = { ...fields, [field]: rawValue };
      fieldsRef.current = nextFields; // sync ref before autoAdvance can trigger a stale blur
      setFields(nextFields);

      if (
        nextFields.day === "" &&
        nextFields.month === "" &&
        nextFields.year === ""
      ) {
        handleValueChange(null);
      }
    }

    function handleFieldBlur(e: FocusEvent<HTMLInputElement>) {
      commitFields(fieldsRef.current);
      if (onBlur) {
        onBlur({
          ...e,
          target: { ...e.target, name },
        } as unknown as FocusEvent<HTMLInputElement>);
      }
    }

    function handleAutoAdvance(fromField: FieldKey) {
      const currentIdx = fieldOrder.indexOf(fromField);
      const currentValue = fields[fromField];

      // Empty value (after backspace) -> move back, unless already at first field
      if (currentValue === "") {
        if (currentIdx > 0) {
          const prevField = fieldOrder[currentIdx - 1];
          fieldRefs.current[prevField]?.current?.focus();
        }
        return; // always return here, including when at index 0
      }

      // On fill — advance to next
      const nextIdx = currentIdx + 1;
      if (nextIdx < fieldOrder.length) {
        const nextField = fieldOrder[nextIdx];
        fieldRefs.current[nextField].current?.focus();
      }
    }

    function handleContainerClick(e: MouseEvent<HTMLDivElement>) {
      const target = e.target as HTMLElement;
      if (target.closest("input, button")) return; // don't hijack clicks on field/button

      // First click lands on "day" segment
      const targetField = fieldRefs.current.day?.current
        ? "day"
        : (fieldOrder.find((field) => fields[field] === "") ??
          fieldOrder[fieldOrder.length - 1]);

      fieldRefs.current[targetField]?.current?.focus();
    }

    function handleArrowNavigate(
      fromField: FieldKey,
      direction: "left" | "right",
    ) {
      const currentIdx = fieldOrder.indexOf(fromField);
      const targetIdx = direction === "right" ? currentIdx + 1 : currentIdx - 1;

      // Already at the first/last field — no field to jump to, stay put.
      if (targetIdx < 0 || targetIdx >= fieldOrder.length) return;

      const targetField = fieldOrder[targetIdx];
      const targetInput = fieldRefs.current[targetField]?.current;
      if (!targetInput) return;

      targetInput.focus();
      const caretPos = direction === "right" ? 0 : targetInput.value.length;
      targetInput.setSelectionRange(caretPos, caretPos);
    }

    // Derived Values
    const isFieldsValid = useMemo(() => {
      const cd = fieldsToCalendarDate(fields);
      if (!cd)
        // if fields empty will return true
        return fields.day === "" && fields.month === "" && fields.year === "";
      const result = validateFromFields(
        cd.day,
        cd.month,
        cd.year,
        validationOptions,
      );
      return result.valid;
    }, [fields, validationOptions]);

    const showError = !isFieldsValid;

    const allFieldsEmpty =
      fields.day === "" && fields.month === "" && fields.year === "";
    const hasValue =
      !allFieldsEmpty &&
      (Boolean(committedValue) ||
        fields.day !== "" ||
        fields.month !== "" ||
        fields.year !== "");
    const isLabelFloating =
      !isFloatingVariant || !floatingLabel || isFocused || hasValue;
    const showSegmentsPlaceholder = isLabelFloating;

    const inputCore = (
      <HStack
        justify={"space-between"}
        gap={1}
        border={"1px solid"}
        borderColor={
          showError || isFieldInvalid ? "border.error" : "border.muted"
        }
        rounded={theme.radii.component}
        opacity={disabled ? 0.5 : 1}
        pointerEvents={disabled ? "none" : undefined}
        transition={"200ms"}
        px={3}
        cursor={"text"}
        h={isFloatingVariant && floatingLabel ? "48px" : 10}
        w={restProps.w || "full"}
        onClick={handleContainerClick}
        onFocusCapture={() => setIsFocused(true)}
        onBlurCapture={() => setIsFocused(false)}
        {...restProps}
      >
        <HStack
          flex={1}
          align={"center"}
          h={"full"}
          cursor={"text"}
          {...(isFloatingVariant &&
            floatingLabel && {
              pt: "22px",
            })}
        >
          {fieldOrder.map((field, idx) => (
            <Fragment key={field}>
              <FieldInput
                id={`${modalKey}-${field}`}
                fieldKey={field}
                value={fields[field]}
                disabled={disabled}
                onValueChange={handleFieldChange}
                onAutoAdvance={handleAutoAdvance}
                onArrowNavigate={handleArrowNavigate}
                showPlaceholder={showSegmentsPlaceholder}
                onBlur={handleFieldBlur}
                inputRef={fieldRefs.current[field]}
              />

              {idx < fieldOrder.length - 1 && (
                <P
                  color={"fg.muted"}
                  lineHeight={1}
                  userSelect={"none"}
                  visibility={showSegmentsPlaceholder ? "visible" : "hidden"}
                >
                  {"-"}
                </P>
              )}
            </Fragment>
          ))}
        </HStack>

        {modalKey && (
          <Box display={"inline-flex"} alignItems={"center"} my={"auto"}>
            <DatePickerTrigger
              modalKey={modalKey}
              datePickerSubtitle={datePickerSubtitle}
              value={committedValue}
              onValueChange={handleValueChange}
              min={min}
              max={max}
              disabledDates={disabledDates}
              timezone={timezone}
              locale={locale}
              inputFormat={inputFormat}
            >
              <IconButton
                size={"xs"}
                variant={"filledIcon"}
                aria-label={t["common.open_date_picker"]()}
                mr={-2}
              >
                <AppIcon icon={CalendarIcon} weight={"fill"} />
              </IconButton>
            </DatePickerTrigger>
          </Box>
        )}
      </HStack>
    );

    return (
      <>
        <input
          type="hidden"
          name={name}
          ref={ref}
          value={committedValue || ""}
        />

        {isFloatingVariant && floatingLabel ? (
          <Box
            position={"relative"}
            w={restProps.w || "full"}
            css={floatingLabelWrapperCss}
            data-floated={isLabelFloating ? "true" : undefined}
          >
            <FloatingLabel label={floatingLabel} optional={isOptional} />

            {inputCore}
          </Box>
        ) : (
          inputCore
        )}
      </>
    );
  }),
);
