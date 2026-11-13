// src/design-system/constants/types/units.type.ts

import type { UNIT_REGISTRY } from "@/design-system/constants/units";

export type MeasurementSystem = "metric" | "imperial";

export type UnitQuantity =
  | "mass"
  | "length"
  | "area"
  | "volume"
  | "temperature"
  | "duration"
  | "speed"
  | "data"
  | "pressure"
  | "energy"
  | "power"
  | "angle"
  | "frequency"
  | "force"
  | "count";

export type UnitDef<K extends string = string> = {
  key: K;
  symbol: string;
  name: string;
  system: "metric" | "imperial" | "neutral";
  tier: "common" | "extended";
  toBase: (v: number) => number;
  fromBase: (b: number) => number;
};

export type QuantityDef<K extends string = string> = {
  base: K;
  allowNegative: boolean;
  defaults: { metric: K; imperial: K };
  units: readonly UnitDef<K>[];
};

export type UnitRegistry = typeof UNIT_REGISTRY;

export type UnitKey = {
  [Q in UnitQuantity]: UnitRegistry[Q]["units"][number]["key"];
}[UnitQuantity];

export type UnitOf<Q extends UnitQuantity> =
  UnitRegistry[Q]["units"][number]["key"];
