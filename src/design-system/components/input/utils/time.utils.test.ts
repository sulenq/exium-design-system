// src/design-system/components/input/utils/time.utils.test.ts

import {
  formatTime,
  getNearestOptionIndex,
  getWheelOptions,
  parseTime,
} from "@/design-system/components/input/utils/time.utils";
import { describe, expect, it } from "vitest";

describe("parseTime", () => {
  it("parses HH:mm:ss and HH:mm", () => {
    expect(parseTime("09:30:05")).toEqual({
      hours: 9,
      minutes: 30,
      seconds: 5,
    });
    expect(parseTime("23:59")).toEqual({ hours: 23, minutes: 59, seconds: 0 });
  });

  it("rejects out-of-range and malformed values", () => {
    expect(parseTime("24:00:00")).toBeNull();
    expect(parseTime("12:60")).toBeNull();
    expect(parseTime("12:00:60")).toBeNull();
    expect(parseTime("9:30")).toBeNull();
    expect(parseTime("abc")).toBeNull();
    expect(parseTime("")).toBeNull();
    expect(parseTime(null)).toBeNull();
  });
});

describe("formatTime", () => {
  const parts = { hours: 7, minutes: 5, seconds: 9 };

  it("pads every part", () => {
    expect(formatTime(parts, true)).toBe("07:05:09");
  });

  it("omits seconds when they are off", () => {
    expect(formatTime(parts, false)).toBe("07:05");
  });

  it("round-trips with parseTime", () => {
    expect(parseTime(formatTime(parts, true))).toEqual(parts);
  });
});

describe("getWheelOptions", () => {
  it("lists 00-23 for hours and 00-59 for minutes and seconds", () => {
    const hours = getWheelOptions(24, 1);
    const minutes = getWheelOptions(60, 1);
    expect(hours).toHaveLength(24);
    expect(hours[0]).toBe(0);
    expect(hours[23]).toBe(23);
    expect(minutes).toHaveLength(60);
    expect(minutes[59]).toBe(59);
  });

  it("applies the step", () => {
    expect(getWheelOptions(60, 15)).toEqual([0, 15, 30, 45]);
  });

  it("falls back to a step of 1 for invalid steps", () => {
    expect(getWheelOptions(24, 0)).toHaveLength(24);
    expect(getWheelOptions(24, -5)).toHaveLength(24);
    expect(getWheelOptions(24, 1.5)).toHaveLength(24);
  });
});

describe("getNearestOptionIndex", () => {
  const quarterHours = [0, 15, 30, 45];

  it("returns the exact match", () => {
    expect(getNearestOptionIndex(quarterHours, 30)).toBe(2);
  });

  it("snaps to the closest option, lower one on a tie", () => {
    expect(getNearestOptionIndex(quarterHours, 40)).toBe(3);
    expect(getNearestOptionIndex(quarterHours, 20)).toBe(1);
    expect(getNearestOptionIndex([0, 10, 20], 5)).toBe(0);
  });
});
