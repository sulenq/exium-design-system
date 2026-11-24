// src/design-system/components/input/currency-input/currency-input.utils.test.ts

import {
  clampValue,
  formatCurrency,
  formatCurrencyNumber,
  formatWhileTyping,
  getCurrencyFractionDigits,
  getCurrencySymbol,
  parseCurrencyInput,
} from "@/design-system/components/input/currency-input/currency-input.utils";
import { describe, expect, it } from "vitest";

const ID = { locale: "id-ID", fractionDigits: 0, shorthand: true };

describe("fraction digits", () => {
  it("uses 0 for IDR even though Intl says 2", () => {
    expect(getCurrencyFractionDigits("IDR")).toBe(0);
    expect(getCurrencyFractionDigits("idr")).toBe(0);
  });

  it("falls back to Intl for other currencies", () => {
    expect(getCurrencyFractionDigits("USD", "en-US")).toBe(2);
  });
});

describe("formatting", () => {
  it("formats rupiah without decimals or spaces", () => {
    expect(formatCurrency(1500000, { currency: "IDR", locale: "id-ID" })).toBe("Rp1.500.000");
    expect(formatCurrencyNumber(1500000, { locale: "id-ID", fractionDigits: 0 })).toBe("1.500.000");
  });

  it("returns the narrow symbol", () => {
    expect(getCurrencySymbol("IDR", "id-ID")).toBe("Rp");
    expect(getCurrencySymbol("USD", "en-US")).toBe("$");
  });
});

describe("parseCurrencyInput", () => {
  it.each([
    ["1.500.000", 1500000],
    ["1500000", 1500000],
    ["1,5jt", 1500000],
    ["1.5jt", 1500000],
    ["1,5 juta", 1500000],
    ["250rb", 250000],
    ["250 ribu", 250000],
    ["12k", 12000],
    ["2m", 2000000000],
    ["2 miliar", 2000000000],
  ])("parses %s", (text, expected) => {
    expect(parseCurrencyInput(text, ID)).toBe(expected);
  });

  it("returns null for empty or unreadable input", () => {
    expect(parseCurrencyInput("", ID)).toBeNull();
    expect(parseCurrencyInput("abc", ID)).toBeNull();
    expect(parseCurrencyInput("1,2,3jt", { ...ID, shorthand: false })).toBeNull();
  });

  it("ignores shorthand when disabled", () => {
    expect(parseCurrencyInput("250rb", { ...ID, shorthand: false })).toBeNull();
  });

  it("rounds to the currency's fraction digits", () => {
    expect(parseCurrencyInput("1.000,567", { locale: "id-ID", fractionDigits: 2, shorthand: false })).toBe(1000.57);
    expect(parseCurrencyInput("1,5", ID)).toBe(2);
  });

  it("reads en-US separators", () => {
    expect(parseCurrencyInput("1,234.5", { locale: "en-US", fractionDigits: 2, shorthand: false })).toBe(1234.5);
  });
});

describe("clampValue", () => {
  it("clamps to min and max", () => {
    expect(clampValue(5, 10, 20)).toBe(10);
    expect(clampValue(25, 10, 20)).toBe(20);
    expect(clampValue(15, 10, 20)).toBe(15);
  });
});

describe("formatWhileTyping", () => {
  const opts = { locale: "id-ID", fractionDigits: 0 };

  it("groups digits and keeps the caret after the same digit", () => {
    expect(formatWhileTyping("15000", 5, opts)).toEqual({ text: "15.000", caret: 6 });
    // caret after "1" in "1500000" stays after "1"
    expect(formatWhileTyping("1500000", 1, opts)).toEqual({ text: "1.500.000", caret: 1 });
  });

  it("leaves shorthand untouched", () => {
    expect(formatWhileTyping("1,5j", 4, opts)).toEqual({ text: "1,5j", caret: 4 });
  });

  it("drops leading zeros and handles empty", () => {
    expect(formatWhileTyping("007", 3, opts).text).toBe("7");
    expect(formatWhileTyping("", 0, opts)).toEqual({ text: "", caret: 0 });
  });

  it("keeps a typed decimal for currencies with minor units", () => {
    expect(formatWhileTyping("1234,", 5, { locale: "id-ID", fractionDigits: 2 }).text).toBe("1.234,");
  });
});
