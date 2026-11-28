// src/design-system/components/input/time-input/time-input.tsx

"use client";

import { IconButton } from "@/design-system/components/button/button/button";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { Input } from "@/design-system/components/input/input/input";
import type {
  TimeInputProps,
  TimeValue,
} from "@/design-system/components/input/time-input/time-input.type";
import { TimePickerTrigger } from "@/design-system/components/input/time-picker/time-picker";
import {
  formatTime,
  formatTimeInputValue,
  formatTimeValueToDisplay,
} from "@/design-system/components/input/utils/time.utils";
import { Box } from "@/design-system/components/layout/box/box";
import { usePopDisclosure } from "@/design-system/components/overlay/hooks/use-pop-disclosure";
import { t } from "@/shared/libs/i18n";
import { toast } from "@/design-system/components/toast/core/toast.manager";
import { useFieldContext } from "@chakra-ui/react";
import { ClockIcon } from "@phosphor-icons/react";
import {
  forwardRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
} from "react";

function parseDisplayToTimeValue(
  display: string,
  withSeconds: boolean,
): TimeValue | null {
  const parts = display.split(":");
  const expectedParts = withSeconds ? 3 : 2;
  if (parts.length !== expectedParts) return null;
  if (parts.some((p) => p.length !== 2)) return null;

  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  const seconds = withSeconds ? parseInt(parts[2], 10) : 0;

  if (
    isNaN(hours) ||
    isNaN(minutes) ||
    isNaN(seconds) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59 ||
    seconds < 0 ||
    seconds > 59
  ) {
    return null;
  }

  return formatTime({ hours, minutes, seconds }, withSeconds);
}

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
      placeholder,
      ...restProps
    } = props;

    // Contexts
    const fieldContext = useFieldContext();
    const disabled = disabledProp || Boolean(fieldContext?.disabled);

    // Hooks
    const { modalKey } = usePopDisclosure({
      modalKey: propsModalKey,
    });

    // States
    const isControlled = controlledValue !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState<TimeValue>(
      () => defaultValue,
    );
    const committedValue = isControlled ? controlledValue : uncontrolledValue;

    const [draftText, setDraftText] = useState<string>(() =>
      formatTimeValueToDisplay(committedValue, withSeconds),
    );
    const [prevCommitted, setPrevCommitted] =
      useState<TimeValue>(committedValue);
    if (committedValue !== prevCommitted) {
      setPrevCommitted(committedValue);
      setDraftText(formatTimeValueToDisplay(committedValue, withSeconds));
    }

    // Derived Values
    const resolvedTitle = title ?? t["common.select_time"]();
    const formatHint = withSeconds ? "HH:mm:ss" : "HH:mm";

    // Handlers
    function commitValue(nextVal: TimeValue) {
      if (!isControlled) {
        setUncontrolledValue(nextVal);
      }
      onValueChange?.(nextVal);
      if (onChange) {
        onChange({
          target: { name: name ?? "", value: nextVal ?? "" },
          currentTarget: { name: name ?? "", value: nextVal ?? "" },
        } as ChangeEvent<HTMLInputElement>);
      }
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
      const { formatted, invalidSeparator, invalidRange } =
        formatTimeInputValue(e.target.value, withSeconds);

      const example = withSeconds ? "08:30:00" : "08:30";

      if (invalidSeparator) {
        toast.info("Format waktu tidak sesuai", {
          id: "time-input-format-hint",
          description: `Ketik angka saja atau ikuti format ${formatHint} (contoh: ${example})`,
        });
      }

      if (invalidRange) {
        toast.warning("Waktu di luar rentang", {
          id: "time-input-range-invalid",
          description: `Jam harus 00-23, menit & detik 00-59 (contoh: ${example})`,
        });
        return;
      }

      setDraftText(formatted);

      if (!formatted) {
        commitValue(null);
        return;
      }

      const parsed = parseDisplayToTimeValue(formatted, withSeconds);
      if (parsed) {
        commitValue(parsed);
      }
    }

    function handleInputBlur(e: FocusEvent<HTMLInputElement>) {
      if (draftText) {
        const parsed = parseDisplayToTimeValue(draftText, withSeconds);
        if (!parsed) {
          setDraftText(formatTimeValueToDisplay(committedValue, withSeconds));
        }
      }
      onBlur?.(e);
    }

    if (children) {
      return (
        <>
          <input
            ref={ref}
            type={"hidden"}
            name={name}
            value={committedValue ?? ""}
          />
          <TimePickerTrigger
            modalKey={modalKey}
            title={resolvedTitle}
            value={committedValue}
            onValueChange={(nextVal) => {
              commitValue(nextVal);
              setDraftText(formatTimeValueToDisplay(nextVal, withSeconds));
            }}
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
          ref={ref}
          type={"hidden"}
          name={name}
          value={committedValue ?? ""}
        />

        <Input
          value={draftText}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          placeholder={placeholder ?? formatHint}
          disabled={disabled}
          floatingLabel={floatingLabelProp}
          inputMode={"numeric"}
          endElement={
            <Box display={"inline-flex"} alignItems={"center"}>
              <TimePickerTrigger
                modalKey={modalKey}
                title={resolvedTitle}
                value={committedValue}
                onValueChange={(nextVal) => {
                  commitValue(nextVal);
                  setDraftText(formatTimeValueToDisplay(nextVal, withSeconds));
                }}
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
            </Box>
          }
          {...(restProps as Record<string, unknown>)}
        />
      </>
    );
  },
);
