// src/design-system/components/input/utils/time.utils.ts

import type {
  TimeParts,
  TimeValue,
} from "@/design-system/components/input/time-input/time-input.type";

export const HOURS_COUNT = 24;
export const MINUTES_COUNT = 60;
export const SECONDS_COUNT = 60;

export const EMPTY_TIME_PARTS: TimeParts = { hours: 0, minutes: 0, seconds: 0 };

export function padTimeUnit(value: number): string {
  return String(value).padStart(2, "0");
}

/**
 * Parses "HH:mm" or "HH:mm:ss" (24-hour). Returns null for anything else,
 * including out-of-range parts such as "24:00" or "12:60".
 */
export function parseTime(value: TimeValue | undefined): TimeParts | null {
  if (!value) return null;

  const match = /^(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(value.trim());
  if (!match) return null;

  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  const seconds = match[3] === undefined ? 0 : Number(match[3]);

  if (hours >= HOURS_COUNT) return null;
  if (minutes >= MINUTES_COUNT) return null;
  if (seconds >= SECONDS_COUNT) return null;

  return { hours, minutes, seconds };
}

export function formatTime(parts: TimeParts, withSeconds: boolean): string {
  const base = `${padTimeUnit(parts.hours)}:${padTimeUnit(parts.minutes)}`;
  if (!withSeconds) return base;
  return `${base}:${padTimeUnit(parts.seconds)}`;
}

/** Options of one wheel column: 0, step, 2*step, ... below `count`. */
export function getWheelOptions(count: number, step: number): number[] {
  const safeStep = Number.isInteger(step) && step > 0 ? step : 1;
  const options: number[] = [];
  for (let option = 0; option < count; option += safeStep) {
    options.push(option);
  }
  return options;
}

/** Index of the option closest to `value` (ties resolve to the lower one). */
export function getNearestOptionIndex(
  options: number[],
  value: number,
): number {
  let nearestIndex = 0;
  let nearestDistance = Number.POSITIVE_INFINITY;
  options.forEach((option, index) => {
    const distance = Math.abs(option - value);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestIndex = index;
    }
  });
  return nearestIndex;
}

/**
 * Formats raw typed time text into `HH:mm:ss` (or `HH:mm` when `withSeconds` is false).
 * Flags `invalidSeparator` when `:` is typed at the start or consecutively.
 */
export function formatTimeInputValue(
  raw: string,
  withSeconds: boolean,
): { formatted: string; invalidSeparator: boolean; invalidRange: boolean } {
  const maxSegments = withSeconds ? 3 : 2;
  const cleaned = raw.replace(/[^\d:]/g, "");
  let invalidSeparator = false;
  let invalidRange = false;

  if (cleaned.startsWith(":") || cleaned.includes("::")) {
    invalidSeparator = true;
  }

  const rawParts = cleaned.split(":");
  let digits = "";
  for (let i = 0; i < rawParts.length; i++) {
    const partDigits = rawParts[i].replace(/\D/g, "");
    const hasTrailingColon = i < rawParts.length - 1;
    if (hasTrailingColon && partDigits.length === 1) {
      digits += partDigits.padStart(2, "0");
    } else {
      digits += partDigits;
    }
  }

  const capped = digits.slice(0, maxSegments * 2);
  const p1 = capped.slice(0, 2);
  const p2 = capped.slice(2, 4);
  const p3 = withSeconds ? capped.slice(4, 6) : "";

  if (p1.length === 2 && parseInt(p1, 10) > 23) invalidRange = true;
  if (p2.length === 2 && parseInt(p2, 10) > 59) invalidRange = true;
  if (p3.length === 2 && parseInt(p3, 10) > 59) invalidRange = true;

  let formatted = p1;
  if (p1.length === 2 && (p2.length > 0 || cleaned.endsWith(":"))) {
    formatted += `:${p2}`;
  } else if (p2.length > 0) {
    formatted += `:${p2}`;
  }
  if (withSeconds) {
    if (p2.length === 2 && (p3.length > 0 || (p1.length === 2 && cleaned.endsWith(":")))) {
      formatted += `:${p3}`;
    } else if (p3.length > 0) {
      formatted += `:${p3}`;
    }
  }

  return { formatted, invalidSeparator, invalidRange };
}

export function formatTimeValueToDisplay(
  value: string | null | undefined,
  withSeconds: boolean,
): string {
  if (!value) return "";
  const parts = value.split(":");
  const hh = (parts[0] ?? "00").padStart(2, "0");
  const mm = (parts[1] ?? "00").padStart(2, "0");
  if (!withSeconds) return `${hh}:${mm}`;
  const ss = (parts[2] ?? "00").padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}
