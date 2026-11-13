// src/design-system/stores/types/measurement-store.type.ts

import type { MeasurementSystem } from "@/design-system/constants/types/units.type";

export type MeasurementStore = {
  measurementSystem: MeasurementSystem;
  setMeasurementSystem: (system: MeasurementSystem) => void;
};

