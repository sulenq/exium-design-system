// src/design-system/components/input/date-picker/date-picker.type.ts

import type { StackProps } from "@/design-system/components/layout/flex-box/flex-box.type";
import type { CalendarDate } from "@internationalized/date";
import type { ReactNode } from "react";

export type DatePickerProps = Omit<
  StackProps,
  "value" | "defaultValue" | "onChange"
> & {
  value?: DateValue;
  defaultValue?: DateValue;
  onValueChange?: (value: DateValue) => void;

  inputFormat?: DateFormat;

  min?: string;
  max?: string;

  disabledDates?: string[];
  /**
   * Whitelist of selectable dates. Pass a `{ start, end }` range or an array of specific
   * ISO dates. Combined with `min`, `max` and `disabledDates`: a date is selectable only
   * when it passes all of them. A single-date array preselects that date when uncontrolled.
   */
  availableDates?: DateRange | string[];

  timezone?: string;
  locale?: string;

  disabled?: boolean;
};

export type DatePickerMode = "day" | "month" | "year";

export type DateFormat = "dmy" | "mdy" | "ymd";

export type DateValue = string | null;

/** Inclusive ISO date range ("YYYY-MM-DD"). */
export type DateRange = { start: string; end: string };

export type NavHeaderProps = {
  label: string;
  onPrev: () => void;
  onNext: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
  onLabelClick?: () => void;
  labelClickable?: boolean;
};

export type DayViewProps = {
  viewDate: CalendarDate;
  selectedDate: CalendarDate | null;
  todayDate: CalendarDate;
  isDateDisabled: (date: CalendarDate) => boolean;
  onSelectDay: (date: CalendarDate) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onGoToMonthView: () => void;
  onFocusDate: (date: CalendarDate) => void;
  prevMonthDisabled?: boolean;
  nextMonthDisabled?: boolean;
  locale: string;
};

export type MonthViewProps = {
  viewDate: CalendarDate;
  onSelectMonth: (month: number) => void;
  onPrevYear: () => void;
  onNextYear: () => void;
  onGoToYearView: () => void;
  locale: string;
};

export type YearViewProps = {
  viewDate: CalendarDate;
  onSelectYear: (year: number) => void;
  yearPageStart: number;
  onPrevPage: () => void;
  onNextPage: () => void;
};

export type DatePickerTriggerProps = DatePickerProps & {
  children: ReactNode;
  modalKey: string;
  datePickerSubtitle?: string;
};

export type ValidationResult =
  | { valid: true }
  | { valid: false; reason: string };

export type ValidationOptions = {
  min?: string;
  max?: string;
  disabledDates?: string[];
  availableDates?: DateRange | string[];
};

export type CalendarDay = {
  date: CalendarDate;
  isCurrentMonth: boolean;
};

export type FieldOrder = [
  "day" | "month" | "year",
  "day" | "month" | "year",
  "day" | "month" | "year",
];

