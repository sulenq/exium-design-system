// src/shared/utils/date/types/duration.type.ts

export type DurationUnit =
  | "millisecond"
  | "second"
  | "minute"
  | "hour"
  | "day"
  | "week";

export type DurationValue = {
  value: number;
  unit: DurationUnit;
};

