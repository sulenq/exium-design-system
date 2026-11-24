// src/design-system/components/input/utils/date.utils.test.ts

import {
  getSelectableBounds,
  isDateAvailable,
  parseISODate,
  toISODate,
  validateDate,
} from "@/design-system/components/input/utils/date.utils";
import { describe, expect, it } from "vitest";

const d = (iso: string) => {
  const date = parseISODate(iso);
  if (!date) throw new Error(`bad fixture ${iso}`);
  return date;
};

describe("isDateAvailable", () => {
  it("accepts dates inside a range object, inclusive", () => {
    const range = { start: "2026-12-01", end: "2026-12-10" };
    expect(isDateAvailable(d("2026-12-01"), range)).toBe(true);
    expect(isDateAvailable(d("2026-12-10"), range)).toBe(true);
    expect(isDateAvailable(d("2026-11-30"), range)).toBe(false);
    expect(isDateAvailable(d("2026-12-11"), range)).toBe(false);
  });

  it("accepts only listed dates for an array", () => {
    const list = ["2026-12-03", "2026-12-17"];
    expect(isDateAvailable(d("2026-12-03"), list)).toBe(true);
    expect(isDateAvailable(d("2026-12-04"), list)).toBe(false);
  });
});

describe("validateDate with availableDates", () => {
  it("rejects a date outside the whitelist", () => {
    expect(
      validateDate(d("2026-12-04"), { availableDates: ["2026-12-03"] }).valid,
    ).toBe(false);
  });

  it("still applies min/max on top of the whitelist", () => {
    const result = validateDate(d("2026-12-03"), {
      min: "2026-12-05",
      availableDates: { start: "2026-12-01", end: "2026-12-31" },
    });
    expect(result.valid).toBe(false);
  });
});

describe("getSelectableBounds", () => {
  it("intersects min/max with a range whitelist", () => {
    const { start, end } = getSelectableBounds({
      min: "2026-12-05",
      max: "2026-12-31",
      availableDates: { start: "2026-12-01", end: "2026-12-20" },
    });
    expect(start && toISODate(start)).toBe("2026-12-05");
    expect(end && toISODate(end)).toBe("2026-12-20");
  });

  it("uses the earliest and latest entries of an unsorted array", () => {
    const { start, end } = getSelectableBounds({
      availableDates: ["2026-12-17", "2026-12-03", "2026-12-09"],
    });
    expect(start && toISODate(start)).toBe("2026-12-03");
    expect(end && toISODate(end)).toBe("2026-12-17");
  });

  it("returns nulls when nothing constrains the calendar", () => {
    expect(getSelectableBounds({})).toEqual({ start: null, end: null });
  });
});
