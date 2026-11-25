// src/test/media-mocks.ts

import { vi } from "vitest";

/** A fake camera stream whose tracks can be inspected after unmount. */
export function createFakeStream() {
  const track = {
    kind: "video",
    stop: vi.fn(),
    getCapabilities: () => ({ torch: true }),
    applyConstraints: vi.fn().mockResolvedValue(undefined),
  };
  const stream = {
    getTracks: () => [track],
    getVideoTracks: () => [track],
    getAudioTracks: () => [],
  } as unknown as MediaStream;
  return { stream, track };
}

/** Install navigator.mediaDevices and make <video> look ready. Returns the getUserMedia mock. */
export function installFakeCamera(impl?: () => Promise<MediaStream>) {
  const fake = createFakeStream();
  const getUserMedia = vi.fn<(constraints: MediaStreamConstraints) => Promise<MediaStream>>(
    impl ?? (() => Promise.resolve(fake.stream)),
  );
  Object.defineProperty(navigator, "mediaDevices", {
    configurable: true,
    value: { getUserMedia },
  });
  Object.defineProperty(HTMLMediaElement.prototype, "readyState", {
    configurable: true,
    get: () => 4,
  });
  Object.defineProperty(HTMLMediaElement.prototype, "play", {
    configurable: true,
    value: () => Promise.resolve(),
  });
  Object.defineProperty(HTMLMediaElement.prototype, "srcObject", {
    configurable: true,
    writable: true,
    value: null,
  });
  return { getUserMedia, ...fake };
}

export function uninstallFakeCamera() {
  Object.defineProperty(navigator, "mediaDevices", { configurable: true, value: undefined });
}

/** Global BarcodeDetector that returns the queued values one detection at a time. */
export function installFakeBarcodeDetector(values: string[]) {
  const queue = [...values];
  class FakeBarcodeDetector {
    static getSupportedFormats = () => Promise.resolve(["qr_code"]);
    detect = vi.fn(async () => {
      const next = queue.shift();
      return next ? [{ rawValue: next, format: "qr_code" }] : [];
    });
  }
  Object.defineProperty(globalThis, "BarcodeDetector", {
    configurable: true,
    value: FakeBarcodeDetector,
  });
  return {
    push: (...more: string[]) => queue.push(...more),
  };
}
