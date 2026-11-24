// src/design-system/components/data-display/utils/countdown.utils.test.ts

import {
  formatCountdownParts,
  getCountdownParts,
} from "@/design-system/components/data-display/utils/countdown.utils";
import { describe, expect, it } from "vitest";

const NOW = new Date("2026-11-24T10:00:00Z");

describe("getCountdownParts", () => {
  it("splits the remaining time into parts", () => {
    expect(getCountdownParts("2026-11-25T11:02:03Z", NOW)).toEqual({
      days: 1,
      hours: 1,
      minutes: 2,
      seconds: 3,
      isFinished: false,
    });
  });

  it("is finished for past, equal and invalid dates", () => {
    expect(getCountdownParts("2026-11-24T09:59:59Z", NOW).isFinished).toBe(true);
    expect(getCountdownParts(NOW, NOW).isFinished).toBe(true);
    expect(getCountdownParts("not-a-date", NOW).isFinished).toBe(true);
  });
});

describe("formatCountdownParts", () => {
  it("applies a custom format with padded tokens", () => {
    const parts = getCountdownParts("2026-11-24T10:05:07Z", NOW);
    expect(formatCountdownParts(parts, "{mm}:{ss}")).toBe("05:07");
  });

  it("renders a dash once finished", () => {
    expect(formatCountdownParts(getCountdownParts(NOW, NOW))).toBe("-");
  });

  it("produces a non-empty localized default format", () => {
    const parts = getCountdownParts("2026-11-24T10:05:07Z", NOW);
    const label = formatCountdownParts(parts);
    expect(label).toContain("05");
    expect(label).toContain("07");
  });
});
