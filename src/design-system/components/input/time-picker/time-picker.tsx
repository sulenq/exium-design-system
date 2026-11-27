// src/design-system/components/input/time-picker/time-picker.tsx

"use client";

import { Button } from "@/design-system/components/button/button/button";
import type {
  TimeParts,
  TimeUnit,
} from "@/design-system/components/input/time-input/time-input.type";
import { TimeWheelColumn } from "@/design-system/components/input/time-input/time-wheel-column";
import type {
  TimePickerProps,
  TimePickerTriggerProps,
} from "@/design-system/components/input/time-picker/time-picker.type";
import {
  EMPTY_TIME_PARTS,
  formatTime,
  HOURS_COUNT,
  MINUTES_COUNT,
  parseTime,
  SECONDS_COUNT,
} from "@/design-system/components/input/utils/time.utils";
import {
  HStack,
  VStack,
} from "@/design-system/components/layout/flex-box/flex-box";
import { usePopDisclosure } from "@/design-system/components/overlay/hooks/use-pop-disclosure";
import { Modal } from "@/design-system/components/overlay/modal/modal";
import { P } from "@/design-system/components/typography/p/p";
import { t } from "@/shared/libs/i18n";
import { useState } from "react";

// -------------------------------------------------------------------------------------
// TimePicker (reusable wheel content + confirm/cancel actions)
// -------------------------------------------------------------------------------------

export const TimePicker = (props: TimePickerProps) => {
  // Props
  const {
    value = null,
    onValueChange,
    withSeconds = true,
    minuteStep = 1,
    secondStep = 1,
    onConfirm,
    onCancel,
  } = props;

  // States
  const [draft, setDraft] = useState<TimeParts>(
    () => parseTime(value) ?? EMPTY_TIME_PARTS,
  );

  // Handlers
  const handleUnitChange = (unit: TimeUnit, nextValue: number) => {
    const nextDraft = { ...draft, [unit]: nextValue };
    setDraft(nextDraft);
    const confirmed: TimeParts = withSeconds
      ? nextDraft
      : { ...nextDraft, seconds: 0 };
    onValueChange?.(formatTime(confirmed, withSeconds));
  };

  const handleConfirm = () => {
    const confirmed: TimeParts = withSeconds ? draft : { ...draft, seconds: 0 };
    onConfirm?.(formatTime(confirmed, withSeconds));
  };

  return (
    <>
      <Modal.Body pt={0}>
        <HStack align={"center"} justify={"center"} gap={2}>
          <TimeWheelColumn
            label={t["common.hours"]()}
            value={draft.hours}
            count={HOURS_COUNT}
            onValueChange={(next) => handleUnitChange("hours", next)}
          />

          <P fontSize={"xl"} fontWeight={"semibold"} aria-hidden={true}>
            {":"}
          </P>

          <TimeWheelColumn
            label={t["common.minutes"]()}
            value={draft.minutes}
            count={MINUTES_COUNT}
            step={minuteStep}
            onValueChange={(next) => handleUnitChange("minutes", next)}
          />

          {withSeconds && (
            <>
              <P fontSize={"xl"} fontWeight={"semibold"} aria-hidden={true}>
                {":"}
              </P>

              <TimeWheelColumn
                label={t["common.seconds"]()}
                value={draft.seconds}
                count={SECONDS_COUNT}
                step={secondStep}
                onValueChange={(next) => handleUnitChange("seconds", next)}
              />
            </>
          )}
        </HStack>
      </Modal.Body>

      {(onConfirm || onCancel) && (
        <Modal.Footer>
          <VStack gap={2} w={"full"}>
            {onConfirm && (
              <Button primary={true} bouncy={true} onClick={handleConfirm}>
                {t["action.confirm"]()}
              </Button>
            )}

            {onCancel && (
              <Button bouncy={true} onClick={onCancel}>
                {t["action.cancel"]()}
              </Button>
            )}
          </VStack>
        </Modal.Footer>
      )}
    </>
  );
}

// -------------------------------------------------------------------------------------
// TimePickerTrigger (Modal wrapper around TimePicker)
// -------------------------------------------------------------------------------------

export const TimePickerTrigger = (props: TimePickerTriggerProps) => {
  // Props
  const {
    modalKey,
    title,
    value = null,
    onValueChange,
    withSeconds = true,
    minuteStep = 1,
    secondStep = 1,
    disabled = false,
    children,
  } = props;

  // Hooks
  const { isOpen, open, close } = usePopDisclosure({ modalKey });

  // Derived Values
  const resolvedTitle = title ?? "Pilih Waktu";

  if (disabled) {
    return <>{children}</>;
  }

  return (
    <Modal.Root
      modalKey={modalKey}
      opened={isOpen}
      open={open}
      close={close}
      size={"xs"}
    >
      <Modal.Trigger>{children}</Modal.Trigger>

      <Modal.Content>
        <Modal.Header>
          <Modal.Title>{resolvedTitle}</Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>

        {isOpen && (
          <TimePicker
            value={value}
            withSeconds={withSeconds}
            minuteStep={minuteStep}
            secondStep={secondStep}
            onConfirm={(confirmedValue) => {
              onValueChange?.(confirmedValue);
              close();
            }}
            onCancel={close}
          />
        )}
      </Modal.Content>
    </Modal.Root>
  );
}

