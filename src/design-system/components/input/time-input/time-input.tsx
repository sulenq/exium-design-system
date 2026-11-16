// src/design-system/components/input/time-input/time-input.tsx

import { Button } from "@/design-system/components/button/button/button";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { useFieldContextValue } from "@/design-system/components/input/context/field.context";
import type {
  TimeInputProps,
  TimeParts,
  TimePickerPanelProps,
  TimeUnit,
  TimeValue,
} from "@/design-system/components/input/time-input/time-input.type";
import { TimeWheelColumn } from "@/design-system/components/input/time-input/time-wheel-column";
import {
  EMPTY_TIME_PARTS,
  formatTime,
  HOURS_COUNT,
  MINUTES_COUNT,
  parseTime,
  SECONDS_COUNT,
} from "@/design-system/components/input/utils/time.utils";
import { Box } from "@/design-system/components/layout/box/box";
import { HStack } from "@/design-system/components/layout/flex-box/flex-box";
import { usePopDisclosure } from "@/design-system/components/overlay/hooks/use-pop-disclosure";
import { Modal } from "@/design-system/components/overlay/modal/modal";
import { P } from "@/design-system/components/typography/p/p";
import { useThemeStore } from "@/design-system/stores/theme-store";
import { t } from "@/shared/libs/i18n";
import { useFieldContext } from "@chakra-ui/react";
import { ClockIcon } from "lucide-react";
import { forwardRef, useState, type ChangeEvent } from "react";

// -------------------------------------------------------------------------------------
// TimePickerPanel — wheels + confirm footer. Mounted only while the modal is
// open, so its draft always starts from the committed value.
// -------------------------------------------------------------------------------------

const TimePickerPanel = (props: TimePickerPanelProps) => {
  // Props
  const {
    initialValue,
    withSeconds,
    minuteStep,
    secondStep,
    onConfirm,
    onCancel,
  } = props;

  // States
  const [draft, setDraft] = useState<TimeParts>(
    () => parseTime(initialValue) ?? EMPTY_TIME_PARTS,
  );

  // Handlers
  const handleUnitChange = (unit: TimeUnit, nextValue: number) => {
    setDraft((prev) => ({ ...prev, [unit]: nextValue }));
  };

  const handleConfirm = () => {
    const confirmed: TimeParts = withSeconds ? draft : { ...draft, seconds: 0 };
    onConfirm(formatTime(confirmed, withSeconds));
  };

  return (
    <>
      <Modal.Body pt={0}>
        <HStack align={"center"} justify={"center"} gap={2}>
          <TimeWheelColumn
            label={t["common.hours"]()}
            value={draft.hours}
            count={HOURS_COUNT}
            onValueChange={(next) => handleUnitChange("hours", next)}
          />

          <P fontSize={"xl"} fontWeight={"semibold"} aria-hidden={true}>
            {":"}
          </P>

          <TimeWheelColumn
            label={t["common.minutes"]()}
            value={draft.minutes}
            count={MINUTES_COUNT}
            step={minuteStep}
            onValueChange={(next) => handleUnitChange("minutes", next)}
          />

          {withSeconds && (
            <>
              <P fontSize={"xl"} fontWeight={"semibold"} aria-hidden={true}>
                {":"}
              </P>

              <TimeWheelColumn
                label={t["common.seconds"]()}
                value={draft.seconds}
                count={SECONDS_COUNT}
                step={secondStep}
                onValueChange={(next) => handleUnitChange("seconds", next)}
              />
            </>
          )}
        </HStack>
      </Modal.Body>

      <Modal.Footer>
        <Button variant={"outline"} onClick={onCancel}>
          {t["action.cancel"]()}
        </Button>

        <Button primary={true} onClick={handleConfirm}>
          {t["action.confirm"]()}
        </Button>
      </Modal.Footer>
    </>
  );
};

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
      placeholder,
      children,
      disabled = false,
      name,
      onChange,
      onBlur,
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

    // Hooks
    const { modalKey, isOpen, open, close } = usePopDisclosure({
      modalKey: propsModalKey,
    });

    // States
    const [internalValue, setInternalValue] = useState<TimeValue>(defaultValue);

    // Derived Values
    const isControlled = controlledValue !== undefined;
    const rawValue = isControlled ? controlledValue : internalValue;
    const committedParts = parseTime(rawValue);
    const committedValue: TimeValue = committedParts
      ? formatTime(committedParts, withSeconds)
      : null;
    const hasValue = committedValue !== null;
    const isInvalid = Boolean(chakraFieldContext?.invalid);
    const resolvedTitle = title ?? t["common.select_time"]();
    const resolvedPlaceholder =
      placeholder ?? (withSeconds ? "--:--:--" : "--:--");
    const hasFloatingLabel = Boolean(floatingLabel);
    const triggerText = hasValue ? committedValue : resolvedPlaceholder;
    const triggerTextColor = hasValue ? "fg" : "fg.subtle";
    const triggerBorderColor = isInvalid ? "border.error" : "border.muted";
    const triggerHeight = hasFloatingLabel ? "60px" : 10;
    const triggerOpacity = disabled ? 0.5 : 1;
    const triggerCursor = disabled ? "not-allowed" : "pointer";
    // An empty floating field shows only its label, like the other inputs
    const isTriggerTextVisible = hasValue || !hasFloatingLabel;
    const floatingLabelTransform = hasValue
      ? "translateY(0)"
      : "translateY(12px)";
    const floatingLabelFontSize = hasValue ? "xs" : "md";

    // Handlers
    const handleConfirm = (nextValue: string) => {
      if (!isControlled) {
        setInternalValue(nextValue);
      }
      onValueChange?.(nextValue);
      onChange?.({
        target: { name, value: nextValue },
      } as ChangeEvent<HTMLInputElement>);
      close();
    };

    const defaultTrigger = (
      <HStack
        as={"button"}
        // @ts-expect-error -- `type`/`disabled` belong to the rendered <button>
        type={"button"}
        disabled={disabled}
        aria-label={`${floatingLabel ?? resolvedTitle}: ${triggerText}`}
        position={"relative"}
        align={"center"}
        justify={"space-between"}
        gap={2}
        w={"full"}
        h={triggerHeight}
        px={3}
        border={"1px solid"}
        borderColor={triggerBorderColor}
        rounded={theme.radii.component}
        bg={"transparent"}
        opacity={triggerOpacity}
        cursor={triggerCursor}
        textAlign={"start"}
        transition={"200ms"}
        _focusVisible={{
          outline: "2px solid",
          outlineColor: "border.emphasized",
          outlineOffset: "2px",
        }}
        onBlur={onBlur}
        {...restProps}
      >
        {hasFloatingLabel && (
          <Box
            position={"absolute"}
            left={"12px"}
            right={"44px"}
            top={"7px"}
            pointerEvents={"none"}
            transform={floatingLabelTransform}
            transition={"transform 0.18s cubic-bezier(0.4, 0, 0.2, 1)"}
          >
            <P
              lineClamp={1}
              fontSize={floatingLabelFontSize}
              fontWeight={"medium"}
              color={"fg.subtle"}
              transition={"font-size 0.18s cubic-bezier(0.4, 0, 0.2, 1)"}
            >
              {floatingLabel}
            </P>
          </Box>
        )}

        <Box flex={1} minW={0} {...(hasFloatingLabel && { pt: "22px" })}>
          {isTriggerTextVisible && (
            <P color={triggerTextColor} fontVariantNumeric={"tabular-nums"}>
              {triggerText}
            </P>
          )}
        </Box>

        <AppIcon icon={ClockIcon} color={"fg.subtle"} />
      </HStack>
    );

    return (
      <>
        <input
          type={"hidden"}
          name={name}
          ref={ref}
          value={committedValue ?? ""}
        />

        <Modal.Root
          modalKey={modalKey}
          opened={isOpen}
          open={open}
          close={close}
          size={"xs"}
        >
          <Modal.Trigger>{children ?? defaultTrigger}</Modal.Trigger>

          <Modal.Content>
            <Modal.Header>
              <Modal.Title mx={"auto"}>{resolvedTitle}</Modal.Title>
              <Modal.CloseButton mb={"auto"} />
            </Modal.Header>

            <TimePickerPanel
              initialValue={committedValue}
              withSeconds={withSeconds}
              minuteStep={minuteStep}
              secondStep={secondStep}
              onConfirm={handleConfirm}
              onCancel={close}
            />
          </Modal.Content>
        </Modal.Root>
      </>
    );
  },
);
