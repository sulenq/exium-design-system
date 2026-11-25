// src/design-system/components/media/qr-scanner/qr-scanner.tsx

"use client";

import { Button, IconButton } from "@/design-system/components/button/button/button";
import { Loader } from "@/design-system/components/feedback/loader/loader";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { Field } from "@/design-system/components/input/field/field";
import { Input } from "@/design-system/components/input/input/input";
import { Box } from "@/design-system/components/layout/box/box";
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { useCameraStream } from "@/design-system/components/media/camera/use-camera-stream";
import type {
  BarcodeDetectorLike,
  QrScannerProps,
  QrScanResult,
} from "@/design-system/components/media/qr-scanner/qr-scanner.type";
import {
  createBarcodeDetector,
  playTone,
  vibrate,
} from "@/design-system/components/media/qr-scanner/qr-scanner.utils";
import { P } from "@/design-system/components/typography/p/p";
import { t } from "@/shared/libs/i18n";
import { CameraSlashIcon as CameraOffIcon, CheckCircleIcon as CircleCheckIcon, XCircleIcon as CircleXIcon, FlashlightIcon, FlashlightIcon as FlashlightOffIcon, KeyboardIcon, ScanIcon as ScanLineIcon } from "@phosphor-icons/react";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";

const DEFAULT_FORMATS = ["qr_code"];
const DECODE_INTERVAL_MS = 150;
const RESULT_VISIBLE_MS = 1200;

/**
 * Camera QR scanner for eartags and documents.
 *
 * - `single` stops after an accepted scan; `continuous` is ready for the next one.
 * - `validate` decides between success and rejected, with its own message.
 * - The same value is ignored for `cooldownMs`; results vibrate and beep differently.
 * - Handles permission, unsupported devices, a no-detection hint, a flashlight toggle,
 *   and a manual entry fallback. The camera is released on unmount and while the tab is
 *   hidden.
 */
export const QrScanner = (props: QrScannerProps) => {
  // Props
  const {
    onScan,
    onReject,
    mode = "single",
    validate,
    cooldownMs = 1500,
    formats = DEFAULT_FORMATS,
    torch = true,
    manualEntry,
    facingMode = "environment",
    paused = false,
    haptic = true,
    sound = true,
    overlay,
    noDetectionHintAfterSec = 5,
    ...restProps
  } = props;

  // States
  const [result, setResult] = useState<{ kind: "success" | "rejected"; message: string } | null>(
    null,
  );
  const [isDone, setIsDone] = useState(false);
  const [isManualOpen, setIsManualOpen] = useState(false);
  const [manualValue, setManualValue] = useState("");
  const [manualError, setManualError] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [detectorError, setDetectorError] = useState(false);

  // Hooks
  const {
    videoRef,
    status: cameraStatus,
    torchSupported,
    torchOn,
    setTorch,
    restart,
  } = useCameraStream({ enabled: !isManualOpen, facingMode });

  // Refs
  const detectorRef = useRef<BarcodeDetectorLike | null>(null);
  const lastScanRef = useRef<{ value: string; at: number } | null>(null);
  const isBusyRef = useRef(false);
  const resultTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Derived Values
  const isDecoding =
    cameraStatus === "active" && !paused && !isDone && !isManualOpen && result === null;

  // Handlers
  const handleValue = useCallback(
    async (value: string, format: string) => {
      const now = Date.now();
      const last = lastScanRef.current;
      if (last && last.value === value && now - last.at < cooldownMs) return;
      lastScanRef.current = { value, at: now };

      isBusyRef.current = true;
      setShowHint(false);
      const scan: QrScanResult = { value, format, scannedAt: now };
      const validation = validate ? await validate(value) : { ok: true as const };
      isBusyRef.current = false;

      const kind = validation.ok ? "success" : "rejected";
      if (haptic) vibrate(kind);
      if (sound) playTone(kind);

      if (validation.ok) {
        setResult({ kind, message: t["qr_scanner.accepted"]({ value }) });
        onScan(scan);
      } else {
        setResult({ kind, message: validation.message });
        onReject?.(scan, validation.message);
      }

      if (resultTimerRef.current) clearTimeout(resultTimerRef.current);
      resultTimerRef.current = setTimeout(() => {
        setResult(null);
        if (validation.ok && mode === "single") setIsDone(true);
      }, RESULT_VISIBLE_MS);
    },
    [cooldownMs, haptic, mode, onReject, onScan, sound, validate],
  );

  function handleScanAgain() {
    lastScanRef.current = null;
    setIsDone(false);
    setResult(null);
  }

  function handleManualSubmit(event: FormEvent) {
    event.preventDefault();
    const value = manualValue.trim();
    if (!value) return;
    if (manualEntry?.pattern && !manualEntry.pattern.test(value)) {
      setManualError(t["qr_scanner.manual_pattern_error"]());
      return;
    }
    setManualError(null);
    setManualValue("");
    setIsManualOpen(false);
    lastScanRef.current = null;
    void handleValue(value, "manual");
  }

  // Effects
  // Create the decoder once the camera is running
  useEffect(() => {
    if (cameraStatus !== "active" || detectorRef.current) return;
    let cancelled = false;
    createBarcodeDetector(formats)
      .then((detector) => {
        if (!cancelled) detectorRef.current = detector;
      })
      .catch(() => {
        if (!cancelled) setDetectorError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [cameraStatus, formats]);

  // Decode loop
  useEffect(() => {
    if (!isDecoding) return;
    let timer: ReturnType<typeof setTimeout>;
    let stopped = false;

    const tick = async () => {
      const video = videoRef.current;
      const detector = detectorRef.current;
      if (detector && video && video.readyState >= 2 && !isBusyRef.current) {
        try {
          const [first] = await detector.detect(video);
          if (first?.rawValue && !stopped) await handleValue(first.rawValue, first.format);
        } catch {
          // A frame that fails to decode is not an error; try the next one
        }
      }
      if (!stopped) timer = setTimeout(tick, DECODE_INTERVAL_MS);
    };
    timer = setTimeout(tick, DECODE_INTERVAL_MS);

    return () => {
      stopped = true;
      clearTimeout(timer);
    };
  }, [isDecoding, videoRef, handleValue]);

  // No-detection hint
  useEffect(() => {
    if (!isDecoding) return;
    const timer = setTimeout(() => setShowHint(true), noDetectionHintAfterSec * 1000);
    return () => {
      clearTimeout(timer);
      setShowHint(false);
    };
  }, [isDecoding, noDetectionHintAfterSec, result]);

  useEffect(
    () => () => {
      if (resultTimerRef.current) clearTimeout(resultTimerRef.current);
    },
    [],
  );

  // Derived Values
  const frameColor =
    result?.kind === "success" ? "green.400" : result?.kind === "rejected" ? "red.400" : "white";
  const statusText = (() => {
    if (result) return result.message;
    if (cameraStatus === "requesting") return t["qr_scanner.requesting"]();
    if (paused) return t["qr_scanner.paused"]();
    if (isDone) return t["qr_scanner.done"]();
    if (showHint && isDecoding) return t["qr_scanner.no_detection_hint"]();
    return t["qr_scanner.scanning"]();
  })();
  const isBlocked =
    cameraStatus === "permission-denied" ||
    cameraStatus === "unsupported" ||
    cameraStatus === "error" ||
    detectorError;

  return (
    <Box
      pos={"relative"}
      w={"full"}
      aspectRatio={1}
      overflow={"hidden"}
      rounded={"lg"}
      bg={"black"}
      color={"white"}
      role={"region"}
      aria-label={t["qr_scanner.label"]()}
      data-status={isBlocked ? cameraStatus : (result?.kind ?? (isDone ? "done" : cameraStatus))}
      {...restProps}
    >
      <video
        ref={videoRef}
        muted
        playsInline
        aria-hidden
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />

      {/* Viewfinder */}
      {!isBlocked && !isManualOpen && (
        <Box
          pos={"absolute"}
          top={"50%"}
          left={"50%"}
          w={"64%"}
          aspectRatio={1}
          transform={"translate(-50%, -50%)"}
          rounded={"xl"}
          border={"3px solid"}
          borderColor={frameColor}
          boxShadow={"0 0 0 9999px rgba(0, 0, 0, 0.45)"}
          transition={"border-color 150ms"}
          pointerEvents={"none"}
          aria-hidden
        />
      )}

      {overlay && (
        <Box pos={"absolute"} top={3} left={3} right={3} zIndex={2}>
          {overlay}
        </Box>
      )}

      {/* Blocked states: permission, unsupported, error */}
      {isBlocked && (
        <VStack pos={"absolute"} inset={0} p={6} gap={3} justify={"center"} align={"center"} textAlign={"center"} zIndex={3}>
          <AppIcon icon={CameraOffIcon} boxSize={8} />
          <P fontWeight={"semibold"}>
            {cameraStatus === "permission-denied"
              ? t["qr_scanner.permission_denied_title"]()
              : cameraStatus === "unsupported"
                ? t["qr_scanner.unsupported_title"]()
                : t["qr_scanner.error_title"]()}
          </P>
          <P fontSize={"sm"} color={"whiteAlpha.800"} maxW={"280px"}>
            {cameraStatus === "permission-denied"
              ? t["qr_scanner.permission_denied_description"]()
              : cameraStatus === "unsupported"
                ? t["qr_scanner.unsupported_description"]()
                : t["qr_scanner.error_description"]()}
          </P>
          <HStack gap={2} wrap={"wrap"} justify={"center"}>
            {cameraStatus !== "unsupported" && (
              <Button variant={"solid"} onClick={restart}>
                {t["qr_scanner.retry"]()}
              </Button>
            )}
            {manualEntry && (
              <Button variant={"outline"} color={"white"} onClick={() => setIsManualOpen(true)}>
                <AppIcon icon={KeyboardIcon} />
                {t["qr_scanner.manual_entry"]()}
              </Button>
            )}
          </HStack>
        </VStack>
      )}

      {cameraStatus === "requesting" && (
        <VStack pos={"absolute"} inset={0} justify={"center"} align={"center"} zIndex={2}>
          <Loader size={"lg"} color={"white"} />
        </VStack>
      )}

      {/* Manual entry */}
      {isManualOpen && manualEntry && (
        <VStack
          as={"form"}
          onSubmit={handleManualSubmit}
          pos={"absolute"}
          inset={0}
          p={5}
          gap={3}
          justify={"center"}
          align={"stretch"}
          bg={"bg.panel"}
          color={"fg"}
          zIndex={4}
        >
          <Field label={manualEntry.label} invalid={Boolean(manualError)} errorText={manualError}>
            <Input
              autoFocus
              aria-label={manualEntry.label}
              value={manualValue}
              placeholder={manualEntry.placeholder}
              onChange={(event) => {
                setManualValue(event.target.value);
                setManualError(null);
              }}
            />
          </Field>
          <HStack gap={2} justify={"end"}>
            <Button variant={"ghost"} onClick={() => setIsManualOpen(false)}>
              {t["qr_scanner.manual_cancel"]()}
            </Button>
            <Button type={"submit"} disabled={!manualValue.trim()}>
              {t["qr_scanner.manual_submit"]()}
            </Button>
          </HStack>
        </VStack>
      )}

      {/* Status and controls */}
      {!isBlocked && !isManualOpen && (
        <VStack pos={"absolute"} left={3} right={3} bottom={3} gap={2} zIndex={2}>
          <HStack
            role={"status"}
            aria-live={"polite"}
            gap={2}
            px={3}
            py={2}
            rounded={"full"}
            bg={
              result?.kind === "success"
                ? "green.600"
                : result?.kind === "rejected"
                  ? "red.600"
                  : "blackAlpha.700"
            }
            maxW={"full"}
          >
            {result && (
              <AppIcon icon={result.kind === "success" ? CircleCheckIcon : CircleXIcon} />
            )}
            {!result && <AppIcon icon={ScanLineIcon} />}
            <P fontSize={"sm"} lineClamp={2}>
              {statusText}
            </P>
          </HStack>

          <HStack gap={2} justify={"center"}>
            {isDone && (
              <Button onClick={handleScanAgain}>{t["qr_scanner.scan_again"]()}</Button>
            )}
            {torch && torchSupported && (
              <IconButton
                variant={"solid"}
                bg={"blackAlpha.700"}
                color={"white"}
                aria-pressed={torchOn}
                aria-label={
                  torchOn ? t["qr_scanner.torch_off"]() : t["qr_scanner.torch_on"]()
                }
                onClick={() => void setTorch(!torchOn)}
              >
                <AppIcon icon={torchOn ? FlashlightOffIcon : FlashlightIcon} />
              </IconButton>
            )}
            {manualEntry && (
              <Button
                variant={"solid"}
                bg={"blackAlpha.700"}
                color={"white"}
                onClick={() => setIsManualOpen(true)}
              >
                <AppIcon icon={KeyboardIcon} />
                {t["qr_scanner.manual_entry"]()}
              </Button>
            )}
          </HStack>
        </VStack>
      )}
    </Box>
  );
};
