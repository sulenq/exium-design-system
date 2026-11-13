// src/design-system/stores/measurement-store.ts

import type { MeasurementSystem } from "@/design-system/constants/types/units.type";
import type { MeasurementStore } from "@/design-system/stores/types/measurement-store.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const STORAGE_KEY = "measurement-config";

const IMPERIAL_REGIONS = new Set(["US", "LR", "MM"]);

export function getDefaultMeasurementSystem(): MeasurementSystem {
  if (typeof navigator === "undefined" || !navigator.language) {
    return "metric";
  }

  try {
    const localeParts = navigator.language.split("-");
    const region = localeParts[localeParts.length - 1]?.toUpperCase();
    if (region && IMPERIAL_REGIONS.has(region)) {
      return "imperial";
    }
  } catch {
    return "metric";
  }

  return "metric";
}

export const useMeasurementStore = create<MeasurementStore>()(
  persist(
    (set) => ({
      measurementSystem: getDefaultMeasurementSystem(),
      setMeasurementSystem: (system: MeasurementSystem) => {
        set({ measurementSystem: system });
      },
    }),
    { name: STORAGE_KEY },
  ),
);

export function useMeasurementSystem(): MeasurementSystem {
  return useMeasurementStore((s) => s.measurementSystem);
}

