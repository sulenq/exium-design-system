// src/design-system/components/data-display/countdown/countdown.type.ts

import type { PProps } from "@/design-system/components/typography/p/p.type";

export type CountdownLevel = "normal" | "warning" | "danger" | "finished";

export type CountdownProps = Omit<PProps, "children"> & {
  finishedAt: string | Date;
  format?: string;
  /** Number of days remaining to trigger warning color (default: 3 days). Set to 0 to disable. */
  warningThresholdDays?: number;
  /** Number of hours remaining to trigger warning color (e.g. 1 for < 1 hour). Overrides warningThresholdDays when provided. */
  warningThresholdHours?: number;
  /** Number of minutes remaining to trigger danger color (e.g. 15 for < 15 minutes). */
  dangerThresholdMinutes?: number;
  /** Color when below danger threshold. Defaults to 'fg.error'. */
  dangerColor?: string;
  /** Color when finished/expired. Defaults to 'fg.error'. */
  finishColor?: string;
  /**
   * Server time minus device time, in milliseconds, taken from the last sync.
   * Deadlines set by the server stay correct even when the device clock is changed.
   */
  clockOffsetMs?: number;
  /** Called once when the countdown reaches zero. */
  onFinish?: () => void;
  /** Called whenever the level changes between normal, warning, danger and finished. */
  onThresholdChange?: (level: CountdownLevel) => void;
};

export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isFinished: boolean;
};
