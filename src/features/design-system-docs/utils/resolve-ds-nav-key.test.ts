// src/features/design-system-docs/utils/resolve-ds-nav-key.test.ts

import { resolveDsNavKey } from "@/features/design-system-docs/utils/resolve-ds-nav-key";
import { describe, expect, it } from "vitest";

describe("resolveDsNavKey", () => {
  it("falls back to overview when empty", () => {
    expect(resolveDsNavKey(undefined)).toBe("overview");
    expect(resolveDsNavKey("  ")).toBe("overview");
  });

  it("accepts every common spelling of a key", () => {
    for (const raw of [
      "currency_input",
      "currency-input",
      "currencyInput",
      "CurrencyInput",
    ]) {
      expect(resolveDsNavKey(raw)).toBe("currency_input");
    }
    expect(resolveDsNavKey("TreeView")).toBe("tree_view");
    expect(resolveDsNavKey("qr-scanner")).toBe("qr_scanner");
  });

  it("returns null for unknown keys instead of pretending it is the overview", () => {
    expect(resolveDsNavKey("does_not_exist")).toBeNull();
  });
});
