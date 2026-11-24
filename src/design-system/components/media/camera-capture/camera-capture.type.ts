// src/design-system/components/media/camera-capture/camera-capture.type.ts

import type { CameraFacingMode } from "@/design-system/components/media/camera/camera.type";

export type CameraFrameVariant =
  | "none"
  | "ktp"
  | "selfie"
  | "selfie-ktp"
  | "document"
  | "livestock"
  | "scale";

export type CapturedMediaLocation = {
  latitude: number;
  longitude: number;
  /** Meters. */
  accuracy: number;
};

export type CapturedMedia = {
  id: string;
  file: File;
  type: "image" | "video";
  /** `Date.now()` when captured. */
  capturedAt: number;
  /** Object URL for previews; revoked when the item is removed. */
  previewUrl: string;
  location?: CapturedMediaLocation;
  /** SHA-256 of the file, hex. Use it to detect a reused photo. */
  hash?: string;
};

export type CameraCaptureCompress = {
  /** Longest side in px. Default 1600. */
  maxWidth: number;
  /** JPEG quality 0–1. Default 0.8. */
  quality: number;
};

export type CameraCaptureProps = {
  value?: CapturedMedia[];
  onChange?: (items: CapturedMedia[]) => void;
  /** Media types the camera can take. Default "image". */
  accept?: "image" | "video" | "both";
  /** Allow more than one item. Default false (one item, retake replaces it). */
  multiple?: boolean;
  /** Upper limit when `multiple`. Default 10. */
  maxFiles?: number;
  /** Default 15, with a visible timer. */
  maxVideoDurationSec?: number;
  /** Defaults to the frame variant's camera: "user" for selfies, else "environment". */
  facingMode?: CameraFacingMode;
  /** Show a front/back switch. Default true. */
  allowSwitchCamera?: boolean;
  /** Guide overlay. Default "none". */
  frameVariant?: CameraFrameVariant;
  /** Photo compression. Default { maxWidth: 1600, quality: 0.8 }. */
  compress?: CameraCaptureCompress;
  /** Attach GPS position to each item. */
  withLocation?: boolean;
  /** Attach a SHA-256 hash to each item. */
  withHash?: boolean;
  /** Text of the open-camera button. */
  label?: string;
  disabled?: boolean;
  /** Overrides the surrounding Field's invalid state. */
  invalid?: boolean;
};

export type CameraFrameConfig = {
  /** Width / height of the guide area. */
  ratio: number;
  shape: "rect" | "oval" | "oval-and-card" | "none";
  /** Share of the viewport the guide may take on its longest side. */
  size: number;
  defaultFacing: CameraFacingMode;
  hintKey:
    | "camera_capture.hint_ktp"
    | "camera_capture.hint_selfie"
    | "camera_capture.hint_selfie_ktp"
    | "camera_capture.hint_document"
    | "camera_capture.hint_livestock"
    | "camera_capture.hint_scale"
    | null;
};

export type CameraCaptureSessionProps = Required<
  Pick<
    CameraCaptureProps,
    | "accept"
    | "maxVideoDurationSec"
    | "allowSwitchCamera"
    | "frameVariant"
    | "compress"
    | "withLocation"
    | "withHash"
  >
> & {
  initialItems: CapturedMedia[];
  maxItems: number;
  initialFacing: CameraFacingMode;
  onDone: (items: CapturedMedia[]) => void;
  onCancel: () => void;
};

export type CameraFrameOverlayProps = {
  variant: CameraFrameVariant;
};
