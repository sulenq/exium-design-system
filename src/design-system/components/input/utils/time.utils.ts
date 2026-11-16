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
