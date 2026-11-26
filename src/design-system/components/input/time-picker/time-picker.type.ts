// src/design-system/components/input/time-picker/time-picker.type.ts

import type { TimeValue } from "@/design-system/components/input/time-input/time-input.type";
import type { ReactNode } from "react";

export type TimePickerProps = {
  value?: TimeValue;
  onValueChange?: (value: TimeValue) => void;
  withSeconds?: boolean;
  minuteStep?: number;
  secondStep?: number;
  onConfirm?: (value: string) => void;
  onCancel?: () => void;
};

export type TimePickerTriggerProps = {
  modalKey: string;
  title?: string;
  value?: TimeValue;
  onValueChange?: (value: TimeValue) => void;
  withSeconds?: boolean;
  minuteStep?: number;
  secondStep?: number;
  disabled?: boolean;
  children?: ReactNode;
};

