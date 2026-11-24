// src/design-system/components/input/utils/date.utils.ts

import type {
  CalendarDay,
  DateFormat,
  DateRange,
  DateValue,
  FieldOrder,
  ValidationOptions,
  ValidationResult,
} from "@/design-system/components/input/date-picker/date-picker.type";
import {
  CalendarDate,
  getLocalTimeZone,
  parseDate,
  today,
} from "@internationalized/date";

// -------------------------------------------------------------------------------------
// Constants
// -------------------------------------------------------------------------------------

/** @deprecated English only. Use `getMonthNames(locale)`. */
export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

/** @deprecated English only. Use `getMonthNames(locale, "short")`. */
export const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

/** @deprecated English only. Use `getWeekdayNames(locale)`. */
export const WEEKDAYS_HEADER = ["S", "M", "T", "W", "T", "F", "S"] as const;

export const YEAR_PAGE_SIZE = 16;

// -------------------------------------------------------------------------------------
// Parsing
// -------------------------------------------------------------------------------------

/** Parse an ISO date string (YYYY-MM-DD) into a CalendarDate. Returns null on failure. */
export function parseISODate(
  value: DateValue | undefined,
): CalendarDate | null {
  if (value == null) return null;
  try {
    return parseDate(value);
  } catch {
    return null;
  }
}

/** Serialize a CalendarDate to ISO string (YYYY-MM-DD). */
export function toISODate(date: CalendarDate): string {
  return date.toString();
}

// -------------------------------------------------------------------------------------
// Timezone
// -------------------------------------------------------------------------------------

/** Return the effective timezone string. */
export function resolveTimezone(timezone: string | undefined): string {
  return timezone ?? getLocalTimeZone();
}

/** Return UTC offset string for a timezone, e.g. "UTC+07:00". */
export function getUTCOffsetLabel(timezone: string): string {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en", {
      timeZone: timezone,
      timeZoneName: "shortOffset",
    });
    const parts = formatter.formatToParts(now);
    const offset = parts.find((p) => p.type === "timeZoneName")?.value ?? "UTC";
    return offset;
  } catch {
    return "UTC";
  }
}

/** Build the footer timezone label, e.g. "Asia/Jakarta (UTC+07:00)". */
export function buildTimezoneLabel(timezone: string): string {
  const offset = getUTCOffsetLabel(timezone);
  return `${timezone} (${offset})`;
}

// -------------------------------------------------------------------------------------
// Today
// -------------------------------------------------------------------------------------

export function getTodayDate(timezone: string): CalendarDate {
  return today(timezone);
}

// -------------------------------------------------------------------------------------
// Validation
// -------------------------------------------------------------------------------------

/**
 * Layer 1 + 2: Validate individual numeric fields and real calendar date.
 */
export function validateFields(
  day: number,
  month: number,
  year: number,
): ValidationResult {
  if (year < 1 || year > 9999) return { valid: false, reason: "Invalid year" };
  if (month < 1 || month > 12) return { valid: false, reason: "Invalid month" };
  if (day < 1 || day > 31) return { valid: false, reason: "Invalid day" };

  // Real calendar check via CalendarDate
  try {
    new CalendarDate(year, month, day);
    return { valid: true };
  } catch {
    return { valid: false, reason: "Invalid date" };
  }
}

/**
 * Full validation pipeline (Layers 1-5).
 * Accepts pre-parsed CalendarDate to avoid duplicate parsing.
 */
export function validateDate(
  date: CalendarDate,
  options: ValidationOptions = {},
): ValidationResult {
  const { min, max, disabledDates, availableDates } = options;

  if (min) {
    const minDate = parseISODate(min);
    if (minDate && date.compare(minDate) < 0) {
      return { valid: false, reason: `Date before minimum (${min})` };
    }
  }

  if (max) {
    const maxDate = parseISODate(max);
    if (maxDate && date.compare(maxDate) > 0) {
      return { valid: false, reason: `Date after maximum (${max})` };
    }
  }

  if (disabledDates?.length) {
    const iso = toISODate(date);
    if (disabledDates.includes(iso)) {
      return { valid: false, reason: "Date is disabled" };
    }
  }

  if (availableDates && !isDateAvailable(date, availableDates)) {
    return { valid: false, reason: "Date is not available" };
  }

  return { valid: true };
}

/** Whether a date is inside an `availableDates` whitelist (range object or array of ISO dates). */
export function isDateAvailable(
  date: CalendarDate,
  availableDates: DateRange | string[],
): boolean {
  if (Array.isArray(availableDates)) {
    return availableDates.includes(toISODate(date));
  }
  const start = parseISODate(availableDates.start);
  const end = parseISODate(availableDates.end);
  if (start && date.compare(start) < 0) return false;
  if (end && date.compare(end) > 0) return false;
  return true;
}

/** Earliest and latest selectable dates implied by min, max and availableDates. */
export function getSelectableBounds(options: ValidationOptions): {
  start: CalendarDate | null;
  end: CalendarDate | null;
} {
  const { min, max, availableDates } = options;
  const candidatesStart: CalendarDate[] = [];
  const candidatesEnd: CalendarDate[] = [];
  const minDate = parseISODate(min);
  const maxDate = parseISODate(max);
  if (minDate) candidatesStart.push(minDate);
  if (maxDate) candidatesEnd.push(maxDate);

  if (Array.isArray(availableDates)) {
    const sorted = availableDates
      .map((iso) => parseISODate(iso))
      .filter((date): date is CalendarDate => date !== null)
      .sort((a, b) => a.compare(b));
    if (sorted[0]) candidatesStart.push(sorted[0]);
    if (sorted[sorted.length - 1]) candidatesEnd.push(sorted[sorted.length - 1]);
  } else if (availableDates) {
    const start = parseISODate(availableDates.start);
    const end = parseISODate(availableDates.end);
    if (start) candidatesStart.push(start);
    if (end) candidatesEnd.push(end);
  }

  const start = candidatesStart.reduce<CalendarDate | null>(
    (latest, date) => (!latest || date.compare(latest) > 0 ? date : latest),
    null,
  );
  const end = candidatesEnd.reduce<CalendarDate | null>(
    (earliest, date) => (!earliest || date.compare(earliest) < 0 ? date : earliest),
    null,
  );
  return { start, end };
}

// -------------------------------------------------------------------------------------
// Localized labels
// -------------------------------------------------------------------------------------

/** Month names for the active locale, e.g. "November" / "November" or "Nov" / "Nov". */
export function getMonthNames(
  locale: string,
  width: "long" | "short" = "long",
): string[] {
  const formatter = new Intl.DateTimeFormat(locale, {
    month: width,
    timeZone: "UTC",
  });
  return Array.from({ length: 12 }, (_, index) =>
    formatter.format(new Date(Date.UTC(2024, index, 1))),
  );
}

/** Narrow weekday names starting on Sunday, matching `buildCalendarGrid`. */
export function getWeekdayNames(
  locale: string,
  width: "narrow" | "short" = "narrow",
): string[] {
  const formatter = new Intl.DateTimeFormat(locale, {
    weekday: width,
    timeZone: "UTC",
  });
  // 2024-09-01 is a Sunday.
  return Array.from({ length: 7 }, (_, index) =>
    formatter.format(new Date(Date.UTC(2024, 8, 1 + index))),
  );
}

/** Full spoken date for screen readers, e.g. "Selasa, 24 November 2026". */
export function formatDateLabel(date: CalendarDate, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(date.year, date.month - 1, date.day)));
}

/**
 * Full validation pipeline from raw field values.
 * Combines Layer 1-2 (fields) + Layer 3-5 (constraints).
 */
export function validateFromFields(
  day: number,
  month: number,
  year: number,
  options: ValidationOptions = {},
): ValidationResult {
  const fieldResult = validateFields(day, month, year);
  if (!fieldResult.valid) return fieldResult;

  const date = new CalendarDate(year, month, day);
  return validateDate(date, options);
}

// -------------------------------------------------------------------------------------
// Calendar grid generation
// -------------------------------------------------------------------------------------

/**
 * Generate a 6-row × 7-col calendar grid for the given month/year.
 * Row starts on Sunday (index 0).
 */
export function buildCalendarGrid(
  year: number,
  month: number,
): CalendarDay[][] {
  const firstOfMonth = new CalendarDate(year, month, 1);
  // CalendarDate.toDate needs a timezone; use a simple approach via JS Date
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay(); // 0=Sun

  const daysInMonth = getDaysInMonth(year, month);
  const prevMonth = month === 1 ? 12 : month - 1;
  const prevYear = month === 1 ? year - 1 : year;
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

  const cells: CalendarDay[] = [];

  // Fill leading days from previous month
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    cells.push({
      date: new CalendarDate(prevYear, prevMonth, day),
      isCurrentMonth: false,
    });
  }

  // Fill current month days
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      date: firstOfMonth.set({ day: d }),
      isCurrentMonth: true,
    });
  }

  // Fill trailing days from next month
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;
  let nextDay = 1;
  while (cells.length < 42) {
    cells.push({
      date: new CalendarDate(nextYear, nextMonth, nextDay++),
      isCurrentMonth: false,
    });
  }

  // Split into rows
  const rows: CalendarDay[][] = [];
  for (let i = 0; i < 42; i += 7) {
    rows.push(cells.slice(i, i + 7));
  }
  return rows;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

// -------------------------------------------------------------------------------------
// Year pages
// -------------------------------------------------------------------------------------

export function getYearPageStart(year: number): number {
  return Math.floor(year / YEAR_PAGE_SIZE) * YEAR_PAGE_SIZE;
}

export function buildYearPage(pageStart: number): number[] {
  return Array.from({ length: YEAR_PAGE_SIZE }, (_, i) => pageStart + i);
}

// -------------------------------------------------------------------------------------
// Format order
// -------------------------------------------------------------------------------------

export function getFieldOrder(format: DateFormat): FieldOrder {
  switch (format) {
    case "dmy":
      return ["day", "month", "year"];
    case "mdy":
      return ["month", "day", "year"];
    case "ymd":
      return ["year", "month", "day"];
  }
}

export function getPlaceholder(field: "day" | "month" | "year"): string {
  switch (field) {
    case "day":
      return "dd";
    case "month":
      return "mm";
    case "year":
      return "yyyy";
  }
}

export function getMaxLength(field: "day" | "month" | "year"): number {
  return field === "year" ? 4 : 2;
}
