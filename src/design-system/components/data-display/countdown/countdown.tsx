// src/design-system/components/data-display/countdown/countdown.tsx

import type {
  CountdownLevel,
  CountdownProps,
} from "@/design-system/components/data-display/countdown/countdown.type";
import {
  formatCountdownParts,
  getCountdownParts,
} from "@/design-system/components/data-display/utils/countdown.utils";
import { P, TNum } from "@/design-system/components/typography/p/p";
import { Span } from "@/design-system/components/typography/span/span";
import { t } from "@/shared/libs/i18n";
import { useCallback, useEffect, useRef, useState } from "react";

const COUNTDOWN_INTERVAL_MS = 1000;

export const Countdown = (props: CountdownProps) => {
  // Props
  const {
    finishedAt,
    format,
    warningThresholdDays = 3,
    warningThresholdHours,
    dangerThresholdMinutes,
    color,
    dangerColor = "fg.error",
    finishColor = "fg",
    clockOffsetMs = 0,
    onFinish,
    onThresholdChange,
    ...restProps
  } = props;

  // Refs
  const onFinishRef = useRef(onFinish);
  const onThresholdChangeRef = useRef(onThresholdChange);
  const previousLevelRef = useRef<CountdownLevel | null>(null);
  const hasFinishedRef = useRef(false);

  // Derived Values
  const getNow = useCallback(
    () => new Date(Date.now() + clockOffsetMs),
    [clockOffsetMs],
  );

  // States
  const [countdown, setCountdown] = useState(() =>
    getCountdownParts(finishedAt, getNow()),
  );
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    onFinishRef.current = onFinish;
    onThresholdChangeRef.current = onThresholdChange;
  }, [onFinish, onThresholdChange]);

  useEffect(() => {
    hasFinishedRef.current = false;

    const updateCountdown = () => {
      const nextCountdown = getCountdownParts(finishedAt, getNow());
      setCountdown(nextCountdown);
      return nextCountdown.isFinished;
    };

    if (updateCountdown()) return;

    const intervalId = window.setInterval(() => {
      if (updateCountdown()) window.clearInterval(intervalId);
    }, COUNTDOWN_INTERVAL_MS);

    // Browsers throttle intervals in background tabs; resync when the tab is visible again.
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") updateCountdown();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [finishedAt, getNow]);

  // Derived Values — Color based on remaining time threshold
  const totalMinutesRemaining =
    countdown.days * 24 * 60 + countdown.hours * 60 + countdown.minutes;

  const isDanger =
    !countdown.isFinished &&
    dangerThresholdMinutes !== undefined &&
    totalMinutesRemaining < dangerThresholdMinutes;

  const isNearExpiry =
    !countdown.isFinished &&
    !isDanger &&
    (warningThresholdHours !== undefined
      ? countdown.days === 0 && countdown.hours < warningThresholdHours
      : warningThresholdDays > 0 && countdown.days < warningThresholdDays);

  const level: CountdownLevel = countdown.isFinished
    ? "finished"
    : isDanger
      ? "danger"
      : isNearExpiry
        ? "warning"
        : "normal";

  const formatted = formatCountdownParts(countdown, format);

  // Effects — notify level changes once per transition and announce them to screen readers
  useEffect(() => {
    if (previousLevelRef.current === level) return;
    const isInitial = previousLevelRef.current === null;
    previousLevelRef.current = level;

    if (level === "finished" && !hasFinishedRef.current) {
      hasFinishedRef.current = true;
      onFinishRef.current?.();
    }
    onThresholdChangeRef.current?.(level);

    if (isInitial) return;
    setAnnouncement(
      level === "finished"
        ? t["countdown.finished"]()
        : t["countdown.remaining"]({ time: formatted }),
    );
  }, [level, formatted]);

  const dynamicColor =
    color ??
    (countdown.isFinished
      ? finishColor
      : isDanger
        ? dangerColor
        : isNearExpiry
          ? "orange.fg"
          : undefined);

  return (
    <P
      role={"timer"}
      whiteSpace={"nowrap"}
      color={dynamicColor}
      fontWeight={
        isDanger || isNearExpiry || countdown.isFinished ? "medium" : undefined
      }
      {...restProps}
    >
      <TNum>{formatted}</TNum>

      <Span srOnly={true} aria-live={"polite"}>
        {announcement}
      </Span>
    </P>
  );
};
