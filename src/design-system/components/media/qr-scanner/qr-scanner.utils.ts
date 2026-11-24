// src/design-system/components/media/qr-scanner/qr-scanner.utils.ts

import type {
  BarcodeDetectorLike,
  NativeBarcodeDetector,
} from "@/design-system/components/media/qr-scanner/qr-scanner.type";

/**
 * Use the browser's BarcodeDetector when it supports the formats (Chrome on Android);
 * otherwise lazy-load the ZXing WebAssembly ponyfill. The .wasm file is bundled, not
 * fetched from a CDN.
 */
export async function createBarcodeDetector(formats: string[]): Promise<BarcodeDetectorLike> {
  const Native = (globalThis as { BarcodeDetector?: NativeBarcodeDetector }).BarcodeDetector;
  if (Native) {
    try {
      const supported = await Native.getSupportedFormats();
      if (formats.every((format) => supported.includes(format))) return new Native({ formats });
    } catch {
      // Fall through to the ponyfill
    }
  }

  const [{ BarcodeDetector, setZXingModuleOverrides }, { default: wasmUrl }] = await Promise.all([
    import("barcode-detector/ponyfill"),
    import("zxing-wasm/reader/zxing_reader.wasm?url"),
  ]);
  setZXingModuleOverrides({
    locateFile: (path: string, prefix: string) => (path.endsWith(".wasm") ? wasmUrl : prefix + path),
  });
  return new BarcodeDetector({ formats: formats as never }) as unknown as BarcodeDetectorLike;
}

// -------------------------------------------------------------------------------------
// Feedback
// -------------------------------------------------------------------------------------

const VIBRATION = { success: [60], rejected: [40, 60, 40] } as const;
const TONE = { success: 880, rejected: 220 } as const;

let audioContext: AudioContext | null = null;

export function vibrate(kind: "success" | "rejected") {
  try {
    navigator.vibrate?.([...VIBRATION[kind]]);
  } catch {
    // Vibration is best-effort
  }
}

export function playTone(kind: "success" | "rejected") {
  try {
    const Context =
      window.AudioContext ?? (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Context) return;
    audioContext ??= new Context();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.frequency.value = TONE[kind];
    gain.gain.setValueAtTime(0.08, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.15);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.15);
  } catch {
    // Sound is best-effort
  }
}
