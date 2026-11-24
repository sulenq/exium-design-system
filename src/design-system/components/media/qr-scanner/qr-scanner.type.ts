// src/design-system/components/media/qr-scanner/qr-scanner.type.ts

import type { CameraFacingMode } from "@/design-system/components/media/camera/camera.type";
import type { BoxProps } from "@/design-system/components/layout/box/box.type";
import type { ReactNode } from "react";

export type QrScanResult = {
  value: string;
  /** Barcode format, e.g. "qr_code", or "manual" when typed. */
  format: string;
  /** `Date.now()` at detection; use it for rules such as "same animal within 10 s". */
  scannedAt: number;
};

export type QrScanValidation = { ok: true } | { ok: false; message: string };

export type QrScannerStatus =
  | "requesting"
  | "scanning"
  | "success"
  | "rejected"
  | "paused"
  | "permission-denied"
  | "unsupported"
  | "error";

export type QrScannerManualEntry = {
  /** Label of the manual input, e.g. "Nomor eartag". */
  label: string;
  placeholder?: string;
  /** Typed values that do not match are refused before `validate`. */
  pattern?: RegExp;
};

export type QrScannerProps = Omit<BoxProps, "children" | "onError"> & {
  /** Called for every accepted scan (after `validate`). */
  onScan: (result: QrScanResult) => void;
  /** Called when `validate` refuses a scan. */
  onReject?: (result: QrScanResult, message: string) => void;
  /** `single` pauses after a success; `continuous` is ready for the next code right away. */
  mode?: "single" | "continuous";
  /** Decide whether a value is accepted, e.g. "eartag belongs to this farm". */
  validate?: (value: string) => QrScanValidation | Promise<QrScanValidation>;
  /** Ignore the same value for this long (ms). Default 1500. */
  cooldownMs?: number;
  /** BarcodeDetector formats. Default ["qr_code"]. */
  formats?: string[];
  /** Show a flashlight toggle when the device supports it. Default true. */
  torch?: boolean;
  /** Fallback for damaged or unreadable codes. */
  manualEntry?: QrScannerManualEntry;
  facingMode?: CameraFacingMode;
  /** Stop decoding without closing the camera. */
  paused?: boolean;
  /** Vibrate on result (different patterns for success and rejected). Default true. */
  haptic?: boolean;
  /** Short tone on result. Default true. */
  sound?: boolean;
  /** Content on top of the camera, e.g. "12 dari 40 ternak". */
  overlay?: ReactNode;
  /** Seconds without a detection before showing a hint. Default 5. */
  noDetectionHintAfterSec?: number;
};

export type BarcodeDetectorLike = {
  detect: (source: CanvasImageSource) => Promise<Array<{ rawValue: string; format: string }>>;
};

export type NativeBarcodeDetector = {
  new (options: { formats: string[] }): BarcodeDetectorLike;
  getSupportedFormats: () => Promise<string[]>;
};
