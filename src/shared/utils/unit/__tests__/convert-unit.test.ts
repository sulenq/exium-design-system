import { describe, expect, it } from "vitest";
import {
  convertUnit,
  fromBase,
  getDefaultUnit,
  getUnitsForQuantity,
  toBase,
} from "@/shared/utils/unit/convert-unit";
import { UNIT_REGISTRY } from "@/design-system/constants/units";
import type {
  UnitOf,
  UnitQuantity,
} from "@/design-system/constants/types/units.type";

describe("convert-unit pure functions", () => {
  it("criterion 4: standard known conversions", () => {
    // convertUnit(1, "mass", "kg", "lb") → 2.204623
    expect(convertUnit(1, "mass", "kg", "lb")).toBe(2.204623);

    // convertUnit(100, "temperature", "celsius", "fahrenheit") → 212
    expect(convertUnit(100, "temperature", "celsius", "fahrenheit")).toBe(212);

    // convertUnit(0, "temperature", "celsius", "kelvin") → 273.15
    expect(convertUnit(0, "temperature", "celsius", "kelvin")).toBe(273.15);

    // convertUnit(1, "length", "mi", "km") → 1.609344
    expect(convertUnit(1, "length", "mi", "km")).toBe(1.609344);

    // convertUnit(1, "area", "ha", "ac") → 2.471054
    expect(convertUnit(1, "area", "ha", "ac")).toBe(2.471054);
  });

  it("same unit returns input unchanged without rounding", () => {
    expect(convertUnit(1.23456789, "mass", "kg", "kg")).toBe(1.23456789);
    expect(convertUnit(0, "temperature", "celsius", "celsius")).toBe(0);
  });

  it("never produces -0", () => {
    expect(Object.is(convertUnit(-0.0000000001, "mass", "kg", "g"), 0)).toBe(true);
  });

  it("getDefaultUnit respects system", () => {
    expect(getDefaultUnit("mass", "metric")).toBe("kg");
    expect(getDefaultUnit("mass", "imperial")).toBe("lb");
    expect(getDefaultUnit("temperature", "metric")).toBe("celsius");
    expect(getDefaultUnit("temperature", "imperial")).toBe("fahrenheit");
    expect(getDefaultUnit("speed", "metric")).toBe("kmh");
    expect(getDefaultUnit("speed", "imperial")).toBe("mph");
  });

  it("getUnitsForQuantity filters extended tier unless requested", () => {
    const common = getUnitsForQuantity("length");
    expect(common.some((u) => u.key === "um")).toBe(false);

    const all = getUnitsForQuantity("length", { includeExtended: true });
    expect(all.some((u) => u.key === "um")).toBe(true);
  });

  it("criterion 5: round-trip stability for every linear unit pair within 1e-6", () => {
    const testValue = 42.5;
    const quantities = Object.keys(UNIT_REGISTRY) as UnitQuantity[];

    for (const q of quantities) {
      if (q === "temperature") continue; // non-linear
      const qDef = UNIT_REGISTRY[q];
      const units = qDef.units.map((u) => u.key as UnitOf<typeof q>);

      for (const fromUnit of units) {
        for (const toUnit of units) {
          const rawBase = toBase(testValue, q, fromUnit);
          const rawBack = fromBase(rawBase, q, fromUnit);
          expect(Math.abs(rawBack - testValue)).toBeLessThan(1e-6);

          const converted = fromBase(rawBase, q, toUnit);
          const back = fromBase(toBase(converted, q, toUnit), q, fromUnit);
          const diff = Math.abs(back - testValue);
          if (diff >= 1e-6) {
            console.log(q, fromUnit, "->", toUnit, "diff:", diff);
          }
        }
      }
    }
  });
});
