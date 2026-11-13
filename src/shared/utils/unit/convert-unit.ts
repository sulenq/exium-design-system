// src/shared/utils/unit/convert-unit.ts

import { UNIT_REGISTRY } from "@/design-system/constants/units";
import type {
  MeasurementSystem,
  UnitDef,
  UnitOf,
  UnitQuantity,
} from "@/design-system/constants/types/units.type";

export function getUnitDef<Q extends UnitQuantity>(
  quantity: Q,
  unitKey: UnitOf<Q> | string,
): UnitDef {
  const qDef = UNIT_REGISTRY[quantity];
  const found = qDef.units.find((u) => u.key === unitKey);
  if (!found) {
    throw new Error(
      `Unit "${unitKey}" is not registered under quantity "${quantity}".`,
    );
  }
  return found as unknown as UnitDef;
}

export function getUnitsForQuantity<Q extends UnitQuantity>(
  quantity: Q,
  opts?: { includeExtended?: boolean },
): UnitDef[] {
  const qDef = UNIT_REGISTRY[quantity];
  const includeExtended = opts?.includeExtended ?? false;
  return qDef.units.filter(
    (u) => includeExtended || u.tier === "common",
  ) as unknown as UnitDef[];
}

export function getDefaultUnit<Q extends UnitQuantity>(
  quantity: Q,
  system: MeasurementSystem,
): UnitOf<Q> {
  const qDef = UNIT_REGISTRY[quantity];
  return (
    system === "imperial" ? qDef.defaults.imperial : qDef.defaults.metric
  ) as UnitOf<Q>;
}

export function toBase<Q extends UnitQuantity>(
  value: number,
  quantity: Q,
  from: UnitOf<Q>,
): number {
  const unitDef = getUnitDef(quantity, from);
  return unitDef.toBase(value);
}

export function fromBase<Q extends UnitQuantity>(
  baseValue: number,
  quantity: Q,
  to: UnitOf<Q>,
): number {
  const unitDef = getUnitDef(quantity, to);
  return unitDef.fromBase(baseValue);
}

export function convertUnit<Q extends UnitQuantity>(
  value: number,
  quantity: Q,
  from: UnitOf<Q>,
  to: UnitOf<Q>,
  opts?: { maxFractionDigits?: number },
): number {
  if (from === to) {
    return value;
  }

  const base = toBase(value, quantity, from);
  const rawConverted = fromBase(base, quantity, to);

  // Kill float noise (e.g. 0.1 + 0.2 artifacts)
  const precise = Number(rawConverted.toPrecision(12));

  const maxFractionDigits = opts?.maxFractionDigits ?? 6;
  const factor = 10 ** maxFractionDigits;
  const rounded = Math.round(precise * factor) / factor;

  // Never produce "-0", normalize to 0
  return Object.is(rounded, -0) ? 0 : rounded;
}

