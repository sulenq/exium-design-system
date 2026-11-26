// src/design-system/components/input/time-input/time-input.type.ts

import type { StackProps } from "@/design-system/components/layout/flex-box/flex-box.type";
import type { ChangeEvent, FocusEvent, ReactNode, RefObject } from "react";

/** "HH:mm:ss" (or "HH:mm" when seconds are off), 24-hour clock. null = empty. */
export type TimeValue = string | null;

export type TimeParts = {
  hours: number;
  minutes: number;
  seconds: number;
};

export type TimeUnit = keyof TimeParts;

export type TimeInputProps = Omit<
  StackProps,
  "value" | "defaultValue" | "onChange" | "onBlur" | "children" | "title"
> & {
  /** Unique key that syncs the picker modal with the `overlay` URL param. */
  modalKey: string;

  value?: TimeValue;
  defaultValue?: TimeValue;
  onValueChange?: (value: TimeValue) => void;

  /** Include the seconds column and emit "HH:mm:ss". Default true. */
  withSeconds?: boolean;
  /** Interval between selectable minutes. Default 1. */
  minuteStep?: number;
  /** Interval between selectable seconds. Default 1. */
  secondStep?: number;

  /** Modal title. Default: localized "Select Time". */
  title?: string;
  /** Text shown in the default trigger while empty. */
  placeholder?: string;
  /** Custom trigger element. Replaces the default input-like trigger. */
  children?: ReactNode;

  disabled?: boolean;

  // React Hook Form
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLElement>) => void;
};

export type TimeWheelColumnProps = {
  /** Accessible name of the column, e.g. "Hours". */
  label: string;
  /** Selected value. */
  value: number;
  /** Exclusive upper bound: 24 for hours, 60 for minutes and seconds. */
  count: number;
  /** Interval between options. */
  step?: number;
  onValueChange: (value: number) => void;
};

export type TimeSegmentKey = "hours" | "minutes" | "seconds";

export type TimeSegmentValues = {
  hours: string;
  minutes: string;
  seconds: string;
};

export type TimeSegmentInputProps = {
  id: string;
  segmentKey: TimeSegmentKey;
  value: string;
  disabled?: boolean;
  showPlaceholder?: boolean;
  onValueChange: (key: TimeSegmentKey, value: string) => void;
  onAutoAdvance: (key: TimeSegmentKey) => void;
  onArrowNavigate: (key: TimeSegmentKey, dir: "prev" | "next") => void;
  inputRef: RefObject<HTMLInputElement | null>;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
};

export type TimePickerPanelProps = {
  initialValue: TimeValue;
  withSeconds: boolean;
  minuteStep: number;
  secondStep: number;
  onConfirm: (value: string) => void;
  onCancel: () => void;
};
