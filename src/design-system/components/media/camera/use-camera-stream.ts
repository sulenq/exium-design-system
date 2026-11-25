// src/design-system/components/media/camera/use-camera-stream.ts

import type {
  CameraStatus,
  UseCameraStreamOptions,
  UseCameraStreamResult,
} from "@/design-system/components/media/camera/camera.type";
import { useCallback, useEffect, useRef, useState } from "react";

function isCameraSupported(): boolean {
  return (
    typeof navigator !== "undefined" &&
    Boolean(navigator.mediaDevices?.getUserMedia) &&
    (typeof window === "undefined" || window.isSecureContext !== false)
  );
}

function stopStream(stream: MediaStream | null) {
  stream?.getTracks().forEach((track) => track.stop());
}

/**
 * Open the device camera and keep it tied to the component's lifetime: the stream is
 * released on unmount, when `enabled` turns off, and while the tab is hidden (it reopens
 * when the tab is visible again). Shared by QrScanner and CameraCapture.
 */
export function useCameraStream(options: UseCameraStreamOptions): UseCameraStreamResult {
  // Props
  const { enabled, facingMode, audio = false, idealWidth = 1920, idealHeight = 1080 } = options;

  // Refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // States
  const [attempt, setAttempt] = useState(0);
  const [isHidden, setIsHidden] = useState(
    typeof document !== "undefined" && document.visibilityState === "hidden",
  );
  // Results of the async request, tagged with the request they belong to
  const [result, setResult] = useState<{
    key: string;
    status: CameraStatus;
    stream: MediaStream | null;
    torchSupported: boolean;
  } | null>(null);
  const [torchState, setTorchState] = useState<{ key: string; on: boolean } | null>(null);

  // Derived Values
  const isActive = enabled && !isHidden;
  const isSupported = isCameraSupported();
  const requestKey = `${facingMode}|${audio}|${idealWidth}x${idealHeight}|${attempt}`;
  const current = isActive && result?.key === requestKey ? result : null;
  const status: CameraStatus = !isActive
    ? "idle"
    : !isSupported
      ? "unsupported"
      : (current?.status ?? "requesting");
  const stream = current?.stream ?? null;
  const torchSupported = current?.torchSupported ?? false;
  const torchOn = torchState?.key === requestKey && status === "active" ? torchState.on : false;

  // Effects
  useEffect(() => {
    const onVisibility = () => setIsHidden(document.visibilityState === "hidden");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (!isActive || !isSupported) return;
    let cancelled = false;
    const key = requestKey;

    navigator.mediaDevices
      .getUserMedia({
        audio,
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: idealWidth },
          height: { ideal: idealHeight },
        },
      })
      .then(async (nextStream) => {
        if (cancelled) {
          stopStream(nextStream);
          return;
        }
        streamRef.current = nextStream;
        const track = nextStream.getVideoTracks()[0];
        const capabilities = (track?.getCapabilities?.() ?? {}) as MediaTrackCapabilities & {
          torch?: boolean;
        };

        const video = videoRef.current;
        if (video) {
          video.srcObject = nextStream;
          video.muted = true;
          video.setAttribute("playsinline", "true");
          await Promise.resolve()
            .then(() => video.play())
            .catch(() => undefined);
        }
        if (cancelled) return;
        setResult({
          key,
          status: "active",
          stream: nextStream,
          torchSupported: Boolean(capabilities.torch),
        });
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        const name = error instanceof DOMException ? error.name : "";
        const isDenied = name === "NotAllowedError" || name === "SecurityError";
        setResult({
          key,
          status: isDenied ? "permission-denied" : "error",
          stream: null,
          torchSupported: false,
        });
      });

    return () => {
      cancelled = true;
      stopStream(streamRef.current);
      streamRef.current = null;
    };
  }, [isActive, isSupported, requestKey, facingMode, audio, idealWidth, idealHeight]);

  // Handlers
  const setTorch = useCallback(
    async (on: boolean) => {
      const track = streamRef.current?.getVideoTracks()[0];
      if (!track) return;
      try {
        await track.applyConstraints({ advanced: [{ torch: on } as MediaTrackConstraintSet] });
        setTorchState({ key: requestKey, on });
      } catch {
        setTorchState({ key: requestKey, on: false });
      }
    },
    [requestKey],
  );

  const restart = useCallback(() => setAttempt((value) => value + 1), []);

  return { videoRef, stream, status, torchSupported, torchOn, setTorch, restart };
}
