// src/design-system/components/input/time-input/time-input.tsx

"use client";

import { IconButton } from "@/design-system/components/button/button/button";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { useFieldContextValue } from "@/design-system/components/input/context/field.context";
import { FloatingLabel } from "@/design-system/components/input/floating-label/floating-label";
import { floatingLabelWrapperCss } from "@/design-system/styles/floating-label.css";
import type {
  TimeInputProps,
  TimeSegmentInputProps,
  TimeSegmentKey,
  TimeSegmentValues,
  TimeValue,
} from "@/design-system/components/input/time-input/time-input.type";
import { TimePickerTrigger } from "@/design-system/components/input/time-picker/time-picker";
import {
  formatTime,
  parseTime,
} from "@/design-system/components/input/utils/time.utils";
import { Box } from "@/design-system/components/layout/box/box";
import { HStack } from "@/design-system/components/layout/flex-box/flex-box";
import { P } from "@/design-system/components/typography/p/p";
import { useThemeStore } from "@/design-system/stores/theme-store";
import { t } from "@/shared/libs/i18n";
import { useFieldContext } from "@chakra-ui/react";
import { ClockIcon } from "@phosphor-icons/react";
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
} from "react";

// -------------------------------------------------------------------------------------
// Helpers
// -------------------------------------------------------------------------------------

const EMPTY_SEGMENTS: TimeSegmentValues = {
  hours: "",
  minutes: "",
  seconds: "",
};

function timeValueToSegments(val: TimeValue): TimeSegmentValues {
  if (!val) return EMPTY_SEGMENTS;
  const parsed = parseTime(val);
  if (!parsed) return EMPTY_SEGMENTS;
  return {
    hours: String(parsed.hours).padStart(2, "0"),
    minutes: String(parsed.minutes).padStart(2, "0"),
    seconds: String(parsed.seconds).padStart(2, "0"),
  };
}

function segmentsToTimeValue(
  segments: TimeSegmentValues,
  withSeconds: boolean,
): TimeValue {
  const h = parseInt(segments.hours, 10);
  const m = parseInt(segments.minutes, 10);
  const s = withSeconds ? parseInt(segments.seconds, 10) : 0;

  if (isNaN(h) || isNaN(m) || (withSeconds && isNaN(s))) return null;
  if (h < 0 || h > 23) return null;
  if (m < 0 || m > 59) return null;
  if (s < 0 || s > 59) return null;

  return formatTime({ hours: h, minutes: m, seconds: s }, withSeconds);
}

// -------------------------------------------------------------------------------------
// TimeSegmentInput — a single numeric segment (hh, mm, ss)
// -------------------------------------------------------------------------------------

const TimeSegmentInput = memo(function TimeSegmentInput(
  props: TimeSegmentInputProps,
) {
  // Props
  const {
    id,
    segmentKey,
    value,
    disabled,
    showPlaceholder = true,
    onValueChange,
    onAutoAdvance,
    onArrowNavigate,
    inputRef,
    onBlur,
  } = props;

  // Derived Values
  const placeholder =
    segmentKey === "hours" ? "hh" : segmentKey === "minutes" ? "mm" : "ss";

  // Handlers
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const rawValue = e.target.value.replace(/\D/g, "").slice(0, 2);
    onValueChange(segmentKey, rawValue);

    if (rawValue.length === 2) {
      onAutoAdvance(segmentKey);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowLeft") {
      if (e.currentTarget.selectionStart === 0) {
        e.preventDefault();
        onArrowNavigate(segmentKey, "prev");
      }
      return;
    }

    if (e.key === "ArrowRight") {
      if (e.currentTarget.selectionStart === e.currentTarget.value.length) {
        e.preventDefault();
        onArrowNavigate(segmentKey, "next");
      }
      return;
    }

    if (e.key === "Backspace" && e.currentTarget.value.length === 0) {
      e.preventDefault();
      onArrowNavigate(segmentKey, "prev");
      return;
    }

    if (e.key === ":" || e.key === "/" || e.key === "-") {
      e.preventDefault();
      onArrowNavigate(segmentKey, "next");
    }
  }

  function handleFocus(e: FocusEvent<HTMLInputElement>) {
    e.target.select();
  }

  function handleBlur(e: FocusEvent<HTMLInputElement>) {
    if (value.length === 1) {
      onValueChange(segmentKey, value.padStart(2, "0"));
    }
    onBlur?.(e);
  }

  return (
    <Box
      as={"input"}
      id={id}
      ref={inputRef}
      // @ts-expect-error -- HTML input attributes on Chakra Box
      type={"text"}
      inputMode={"numeric"}
      maxLength={2}
      value={value}
      disabled={disabled}
      placeholder={showPlaceholder ? placeholder : ""}
      aria-label={
        segmentKey === "hours"
          ? t["common.hours"]()
          : segmentKey === "minutes"
            ? t["common.minutes"]()
            : t["common.seconds"]()
      }
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      w={"2.5ch"}
      textAlign={"center"}
      bg={"transparent"}
      border={"none"}
      outline={"none"}
      fontSize={"md"}
      fontVariantNumeric={"tabular-nums"}
      color={disabled ? "fg.muted" : "fg"}
      _placeholder={{ color: "fg.subtle" }}
      cursor={disabled ? "not-allowed" : "text"}
    />
  );
});

// -------------------------------------------------------------------------------------
// TimeInput (public)
// -------------------------------------------------------------------------------------

export const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
  function TimeInput(props, ref) {
    // Props
    const {
      modalKey: propsModalKey,
      value: controlledValue,
      defaultValue = null,
      onValueChange,
      withSeconds = true,
      minuteStep = 1,
      secondStep = 1,
      title,
      children,
      disabled: disabledProp = false,
      name,
      onChange,
      onBlur,
      floatingLabel: floatingLabelProp = true,
      ...restProps
    } = props;

    // Contexts
    const { theme } = useThemeStore();
    const fieldContext = useFieldContext();
    const customFieldContext = useFieldContextValue();
    const disabled = disabledProp || Boolean(fieldContext?.disabled);
    const invalid = Boolean(fieldContext?.invalid);

    // Refs
    const hoursRef = useRef<HTMLInputElement | null>(null);
    const minutesRef = useRef<HTMLInputElement | null>(null);
    const secondsRef = useRef<HTMLInputElement | null>(null);

    // States
    const [uncontrolledValue, setUncontrolledValue] = useState<TimeValue>(
      () => defaultValue,
    );
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const isControlled = controlledValue !== undefined;
    const committedValue = isControlled ? controlledValue : uncontrolledValue;

    const [segments, setSegments] = useState<TimeSegmentValues>(() =>
      timeValueToSegments(committedValue),
    );
    const [prevCommitted, setPrevCommitted] =
      useState<TimeValue>(committedValue);

    if (committedValue !== prevCommitted) {
      setPrevCommitted(committedValue);
      setSegments(timeValueToSegments(committedValue));
    }

    // Derived Values
    const segmentOrder = useMemo<TimeSegmentKey[]>(
      () =>
        withSeconds ? ["hours", "minutes", "seconds"] : ["hours", "minutes"],
      [withSeconds],
    );
    const resolvedTitle = title ?? "Pilih Waktu";
    const modalKey = propsModalKey ?? `time-input-${name ?? "picker"}`;

    const isFloatingField =
      floatingLabelProp && customFieldContext?.variant === "floating";
    const floatingLabel = isFloatingField
      ? customFieldContext?.label
      : undefined;
    const hasFloatingLabel = Boolean(floatingLabel);
    const hasSegmentValue = Boolean(
      segments.hours || segments.minutes || segments.seconds,
    );
    const isLabelFloated = isFocused || hasSegmentValue;

    const containerHeight = hasFloatingLabel ? "52px" : "40px";
    const containerBorderColor = invalid
      ? "border.error"
      : isFocused
        ? "border"
        : "border.muted";
    const containerOpacity = disabled ? 0.5 : 1;
    const containerCursor = disabled ? "not-allowed" : "text";

    // Handlers
    const commitValue = useCallback(
      (nextValue: TimeValue) => {
        if (!isControlled) {
          setUncontrolledValue(nextValue);
        }
        onValueChange?.(nextValue);
        if (onChange) {
          const syntheticEvent = {
            target: { name: name ?? "", value: nextValue ?? "" },
            currentTarget: { name: name ?? "", value: nextValue ?? "" },
          } as ChangeEvent<HTMLInputElement>;
          onChange(syntheticEvent);
        }
      },
      [isControlled, name, onChange, onValueChange],
    );

    const handleSegmentChange = useCallback(
      (key: TimeSegmentKey, nextVal: string) => {
        const next = { ...segments, [key]: nextVal };
        setSegments(next);
        const parsed = segmentsToTimeValue(next, withSeconds);
        if (parsed !== null) {
          commitValue(parsed);
        } else if (!next.hours && !next.minutes && !next.seconds) {
          commitValue(null);
        }
      },
      [commitValue, segments, withSeconds],
    );

    const focusSegment = useCallback((key: TimeSegmentKey) => {
      const target =
        key === "hours"
          ? hoursRef.current
          : key === "minutes"
            ? minutesRef.current
            : secondsRef.current;
      target?.focus();
    }, []);

    const handleAutoAdvance = useCallback(
      (key: TimeSegmentKey) => {
        const idx = segmentOrder.indexOf(key);
        const nextKey = segmentOrder[idx + 1];
        if (nextKey) focusSegment(nextKey);
      },
      [focusSegment, segmentOrder],
    );

    const handleArrowNavigate = useCallback(
      (key: TimeSegmentKey, dir: "prev" | "next") => {
        const idx = segmentOrder.indexOf(key);
        const targetKey =
          dir === "prev" ? segmentOrder[idx - 1] : segmentOrder[idx + 1];
        if (targetKey) focusSegment(targetKey);
      },
      [focusSegment, segmentOrder],
    );

    const handleContainerClick = (e: MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      if ((e.target as HTMLElement).tagName === "INPUT") return;
      if ((e.target as HTMLElement).closest("button")) return;
      focusSegment("hours");
    };

    const handleContainerFocus = () => {
      setIsFocused(true);
    };

    const handleContainerBlur = (e: FocusEvent<HTMLDivElement>) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
        setIsFocused(false);
        onBlur?.(e);
      }
    };

    const handlePickerConfirm = (confirmedValue: TimeValue) => {
      setSegments(timeValueToSegments(confirmedValue));
      commitValue(confirmedValue);
    };

    if (children) {
      return (
        <>
          <input
            type={"hidden"}
            name={name}
            ref={ref}
            value={committedValue ?? ""}
            disabled={disabled}
            readOnly={true}
          />
          <TimePickerTrigger
            modalKey={modalKey}
            title={resolvedTitle}
            value={committedValue}
            onValueChange={handlePickerConfirm}
            withSeconds={withSeconds}
            minuteStep={minuteStep}
            secondStep={secondStep}
            disabled={disabled}
          >
            {children}
          </TimePickerTrigger>
        </>
      );
    }

    return (
      <>
        <input
          type={"hidden"}
          name={name}
          ref={ref}
          value={committedValue ?? ""}
          disabled={disabled}
          readOnly={true}
        />

        <HStack
          position={"relative"}
          align={"center"}
          justify={"space-between"}
          gap={2}
          w={"full"}
          h={containerHeight}
          px={3}
          border={"1px solid"}
          borderColor={containerBorderColor}
          rounded={theme.radii.component}
          bg={"transparent"}
          opacity={containerOpacity}
          cursor={containerCursor}
          transition={"200ms"}
          onClick={handleContainerClick}
          onFocus={handleContainerFocus}
          onBlur={handleContainerBlur}
          data-floated={isLabelFloated ? "true" : undefined}
          css={hasFloatingLabel ? floatingLabelWrapperCss : undefined}
          {...restProps}
        >
          {hasFloatingLabel && (
            <FloatingLabel label={floatingLabel} right={"44px"} />
          )}

          <HStack
            flex={1}
            minW={0}
            align={"center"}
            gap={0.5}
            {...(hasFloatingLabel && { pt: "20px" })}
          >
            {segmentOrder.map((segKey, idx) => (
              <Fragment key={segKey}>
                {idx > 0 && (
                  <P
                    color={hasSegmentValue ? "fg" : "fg.subtle"}
                    aria-hidden={true}
                    userSelect={"none"}
                  >
                    {":"}
                  </P>
                )}
                <TimeSegmentInput
                  id={`${modalKey}-${segKey}`}
                  segmentKey={segKey}
                  value={segments[segKey]}
                  disabled={disabled}
                  showPlaceholder={!hasFloatingLabel || isLabelFloated}
                  onValueChange={handleSegmentChange}
                  onAutoAdvance={handleAutoAdvance}
                  onArrowNavigate={handleArrowNavigate}
                  inputRef={
                    segKey === "hours"
                      ? hoursRef
                      : segKey === "minutes"
                        ? minutesRef
                        : secondsRef
                  }
                />
              </Fragment>
            ))}
          </HStack>

          <TimePickerTrigger
            modalKey={modalKey}
            title={resolvedTitle}
            value={committedValue}
            onValueChange={handlePickerConfirm}
            withSeconds={withSeconds}
            minuteStep={minuteStep}
            secondStep={secondStep}
            disabled={disabled}
          >
            <IconButton
              size={"xs"}
              variant={"filledIcon"}
              aria-label={resolvedTitle}
              disabled={disabled}
              mr={-2}
            >
              <AppIcon icon={ClockIcon} weight={"fill"} />
            </IconButton>
          </TimePickerTrigger>
        </HStack>
      </>
    );
  },
);
