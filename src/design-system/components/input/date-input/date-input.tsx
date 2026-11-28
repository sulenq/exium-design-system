// src/design-system/components/input/date-input/date-input.tsx

"use client";

import { IconButton } from "@/design-system/components/button/button/button";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import type { DateInputProps } from "@/design-system/components/input/date-input/date-input.type";
import { DatePickerTrigger } from "@/design-system/components/input/date-picker/date-picker";
import type { DateValue } from "@/design-system/components/input/date-picker/date-picker.type";
import { Input } from "@/design-system/components/input/input/input";
import {
  formatDateInputValue,
  formatIsoToDisplayDate,
  getDateFormatHint,
  toISODate,
  validateFromFields,
} from "@/design-system/components/input/utils/date.utils";
import { Box } from "@/design-system/components/layout/box/box";
import { usePopDisclosure } from "@/design-system/components/overlay/hooks/use-pop-disclosure";
import { toast } from "@/design-system/components/toast/core/toast.manager";
import { useAppConfigStore } from "@/design-system/stores/app-config-store";
import { t } from "@/shared/libs/i18n";
import { CalendarDate } from "@internationalized/date";
import { CalendarIcon } from "@phosphor-icons/react";
import {
  forwardRef,
  memo,
  useState,
  type ChangeEvent,
  type FocusEvent,
} from "react";

function parseDisplayToCalendarDate(
  display: string,
  inputFormat: "dmy" | "mdy" | "ymd",
): CalendarDate | null {
  const parts = display.split("/");
  if (parts.length !== 3) return null;

  let dayStr: string;
  let monthStr: string;
  let yearStr: string;

  if (inputFormat === "mdy") {
    [monthStr, dayStr, yearStr] = parts;
  } else if (inputFormat === "ymd") {
    [yearStr, monthStr, dayStr] = parts;
  } else {
    [dayStr, monthStr, yearStr] = parts;
  }

  if (dayStr.length !== 2 || monthStr.length !== 2 || yearStr.length !== 4) {
    return null;
  }

  const day = parseInt(dayStr, 10);
  const month = parseInt(monthStr, 10);
  const year = parseInt(yearStr, 10);
  if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;

  try {
    const cd = new CalendarDate(year, month, day);
    if (cd.day !== day || cd.month !== month || cd.year !== year) return null;
    return cd;
  } catch {
    return null;
  }
}

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
      inputFormat: inputFormatProp,
      min,
      max,
      disabledDates,
      timezone,
      locale,
      disabled,
      datePickerSubtitle,
      floatingLabel: floatingLabelProp = true,
      ...restProps
    } = props;

    // Stores
    const storeDateFormat = useAppConfigStore((s) => s.dateFormat);
    const inputFormat = inputFormatProp ?? storeDateFormat;

    // Hooks
    const { modalKey } = usePopDisclosure({
      modalKey: propsModalKey,
    });

    // States
    const isControlled = controlledValue !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState<DateValue>(
      defaultValue ?? null,
    );
    const committedValue = isControlled ? controlledValue : uncontrolledValue;

    const [draftText, setDraftText] = useState<string>(() =>
      formatIsoToDisplayDate(committedValue, inputFormat),
    );
    const [prevCommitted, setPrevCommitted] =
      useState<DateValue>(committedValue);
    if (committedValue !== prevCommitted) {
      setPrevCommitted(committedValue);
      setDraftText(formatIsoToDisplayDate(committedValue, inputFormat));
    }

    // Derived Values
    const formatHint = getDateFormatHint(inputFormat);

    // Handlers
    function commitValue(nextVal: DateValue) {
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
        formatDateInputValue(e.target.value, inputFormat);

      if (invalidSeparator) {
        toast.info("Format tanggal tidak sesuai", {
          id: "date-input-format-hint",
          description: `Ketik angka saja atau ikuti format ${formatHint} (contoh: 05/11/2026)`,
        });
      }

      if (invalidRange) {
        toast.warning("Tanggal atau bulan di luar rentang", {
          id: "date-input-range-invalid",
          description:
            "Tanggal harus 01-31 dan bulan 01-12 (contoh: 05/11/2026)",
        });
        return;
      }

      setDraftText(formatted);

      if (!formatted) {
        commitValue(null);
        return;
      }

      const cd = parseDisplayToCalendarDate(formatted, inputFormat);
      if (cd) {
        const validation = validateFromFields(cd.day, cd.month, cd.year, {
          min,
          max,
          disabledDates,
        });
        if (validation.valid) {
          commitValue(toISODate(cd));
        }
      }
    }

    function handleInputBlur(e: FocusEvent<HTMLInputElement>) {
      if (draftText) {
        const cd = parseDisplayToCalendarDate(draftText, inputFormat);
        if (!cd) {
          setDraftText(formatIsoToDisplayDate(committedValue, inputFormat));
        }
      }
      onBlur?.(e);
    }

    return (
      <>
        <input
          type={"hidden"}
          name={name}
          ref={ref}
          value={committedValue || ""}
        />

        <Input
          value={draftText}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          placeholder={formatHint}
          disabled={disabled}
          floatingLabel={floatingLabelProp}
          inputMode={"numeric"}
          endElement={
            modalKey ? (
              <Box display={"inline-flex"} alignItems={"center"}>
                <DatePickerTrigger
                  modalKey={modalKey}
                  datePickerSubtitle={datePickerSubtitle}
                  value={committedValue}
                  onValueChange={(nextVal) => {
                    commitValue(nextVal);
                    setDraftText(formatIsoToDisplayDate(nextVal, inputFormat));
                  }}
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
                    disabled={disabled}
                    mr={-2}
                  >
                    <AppIcon icon={CalendarIcon} weight={"fill"} />
                  </IconButton>
                </DatePickerTrigger>
              </Box>
            ) : undefined
          }
          {...(restProps as Record<string, unknown>)}
        />
      </>
    );
  }),
);
