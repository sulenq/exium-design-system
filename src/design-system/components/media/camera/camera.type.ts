// src/design-system/components/media/camera/camera.type.ts

export type CameraFacingMode = "environment" | "user";

export type CameraStatus =
  | "idle"
  | "requesting"
  | "active"
  | "permission-denied"
  | "unsupported"
  | "error";

export type UseCameraStreamOptions = {
  /** Start the camera. Turning it off releases the stream. */
  enabled: boolean;
  facingMode: CameraFacingMode;
  /** Also capture audio, for video recording. */
  audio?: boolean;
  /** Preferred resolution; the device may give less. */
  idealWidth?: number;
  idealHeight?: number;
};

export type UseCameraStreamResult = {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  stream: MediaStream | null;
  status: CameraStatus;
  /** True when the active camera has a controllable flashlight. */
  torchSupported: boolean;
  torchOn: boolean;
  setTorch: (on: boolean) => Promise<void>;
  /** Ask again, e.g. after the user granted permission in settings. */
  restart: () => void;
};
