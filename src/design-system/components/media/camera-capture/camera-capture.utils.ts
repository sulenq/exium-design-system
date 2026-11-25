// src/design-system/components/media/camera-capture/camera-capture.utils.ts

import type {
  CameraCaptureCompress,
  CameraFrameConfig,
  CameraFrameVariant,
  CapturedMedia,
  CapturedMediaLocation,
} from "@/design-system/components/media/camera-capture/camera-capture.type";

// -------------------------------------------------------------------------------------
// Frame variants (hardcoded options)
// -------------------------------------------------------------------------------------

export const CAMERA_FRAME_VARIANTS: Record<CameraFrameVariant, CameraFrameConfig> = {
  none: { ratio: 1, shape: "none", size: 1, defaultFacing: "environment", hintKey: null },
  // ID-1 card, 85.6 × 54 mm
  ktp: { ratio: 85.6 / 54, shape: "rect", size: 0.86, defaultFacing: "environment", hintKey: "camera_capture.hint_ktp" },
  selfie: { ratio: 3 / 4, shape: "oval", size: 0.62, defaultFacing: "user", hintKey: "camera_capture.hint_selfie" },
  "selfie-ktp": { ratio: 3 / 4, shape: "oval-and-card", size: 0.5, defaultFacing: "user", hintKey: "camera_capture.hint_selfie_ktp" },
  // A4, 210 × 297 mm
  document: { ratio: 210 / 297, shape: "rect", size: 0.8, defaultFacing: "environment", hintKey: "camera_capture.hint_document" },
  livestock: { ratio: 16 / 9, shape: "rect", size: 0.92, defaultFacing: "environment", hintKey: "camera_capture.hint_livestock" },
  scale: { ratio: 2, shape: "rect", size: 0.55, defaultFacing: "environment", hintKey: "camera_capture.hint_scale" },
};

export const DEFAULT_COMPRESS: CameraCaptureCompress = { maxWidth: 1600, quality: 0.8 };

// -------------------------------------------------------------------------------------
// Photo
// -------------------------------------------------------------------------------------

/** Size that fits `maxWidth` on the longest side, keeping the aspect ratio. */
export function fitWithin(width: number, height: number, maxSide: number) {
  const scale = Math.min(1, maxSide / Math.max(width, height));
  return { width: Math.round(width * scale), height: Math.round(height * scale) };
}

/** Grab the current video frame as a compressed JPEG File. */
export async function capturePhoto(
  video: HTMLVideoElement,
  compress: CameraCaptureCompress,
): Promise<File> {
  const { width, height } = fitWithin(video.videoWidth || 1280, video.videoHeight || 720, compress.maxWidth);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas 2D is not available");
  context.drawImage(video, 0, 0, width, height);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => (result ? resolve(result) : reject(new Error("Could not encode the photo"))),
      "image/jpeg",
      compress.quality,
    );
  });
  return new File([blob], `foto-${Date.now()}.jpg`, { type: "image/jpeg" });
}

// -------------------------------------------------------------------------------------
// Video
// -------------------------------------------------------------------------------------

const VIDEO_MIME_CANDIDATES = [
  "video/mp4;codecs=avc1",
  "video/mp4",
  "video/webm;codecs=vp9,opus",
  "video/webm;codecs=vp8,opus",
  "video/webm",
];

/** First recording format this browser supports; iOS Safari only records MP4. */
export function pickVideoMimeType(): string | undefined {
  if (typeof MediaRecorder === "undefined") return undefined;
  return VIDEO_MIME_CANDIDATES.find((type) => MediaRecorder.isTypeSupported?.(type));
}

export function isVideoRecordingSupported(): boolean {
  return typeof MediaRecorder !== "undefined";
}

export function videoFileFromChunks(chunks: Blob[], mimeType: string): File {
  const type = mimeType.split(";")[0];
  const extension = type === "video/mp4" ? "mp4" : "webm";
  return new File(chunks, `video-${Date.now()}.${extension}`, { type });
}

// -------------------------------------------------------------------------------------
// Metadata
// -------------------------------------------------------------------------------------

export async function sha256Hex(file: Blob): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", await file.arrayBuffer());
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

/** One position fix, or undefined when denied, unavailable or slower than 10 s. */
export function getLocationOnce(): Promise<CapturedMediaLocation | undefined> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(undefined);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) =>
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        }),
      () => resolve(undefined),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  });
}

let idCounter = 0;

export async function createCapturedMedia(
  file: File,
  type: CapturedMedia["type"],
  options: { location?: CapturedMediaLocation; withHash: boolean },
): Promise<CapturedMedia> {
  idCounter += 1;
  return {
    id: `capture-${Date.now()}-${idCounter}`,
    file,
    type,
    capturedAt: Date.now(),
    previewUrl: URL.createObjectURL(file),
    location: options.location,
    hash: options.withHash ? await sha256Hex(file) : undefined,
  };
}

export function revokePreview(item: CapturedMedia) {
  try {
    URL.revokeObjectURL(item.previewUrl);
  } catch {
    // Already revoked
  }
}

export function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
