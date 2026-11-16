// src/design-system/components/input/utils/phone.utils.test.ts

import {
  findPhoneCountry,
  formatE164,
  getFlagEmoji,
  parseInternationalNumber,
  sanitizeNationalNumber,
} from "@/design-system/components/input/utils/phone.utils";
import { PHONE_COUNTRIES } from "@/design-system/constants/phone-countries";
import { describe, expect, it } from "vitest";

describe("PHONE_COUNTRIES", () => {
  it("has unique ISO codes and digit-only calling codes", () => {
    const codes = PHONE_COUNTRIES.map((country) => country.code);
    expect(new Set(codes).size).toBe(codes.length);
    PHONE_COUNTRIES.forEach((country) => {
      expect(country.code).toMatch(/^[A-Z]{2}$/);
      expect(country.dialCode).toMatch(/^[1-9]\d{0,2}$/);
    });
  });
});

describe("sanitizeNationalNumber", () => {
  it("keeps digits only", () => {
    expect(sanitizeNationalNumber("812-3456 789abc", "62", true)).toBe(
      "8123456789",
    );
  });

  it("drops the trunk prefix only when asked to", () => {
    expect(sanitizeNationalNumber("0812", "62", true)).toBe("812");
    expect(sanitizeNationalNumber("0812", "62", false)).toBe("0812");
  });

  it("caps dial code + national number at 15 digits (E.164)", () => {
    const result = sanitizeNationalNumber("9".repeat(30), "62", true);
    expect(result).toHaveLength(13);
    expect(sanitizeNationalNumber("9".repeat(30), "880", true)).toHaveLength(
      12,
    );
  });
});

describe("formatE164", () => {
  it("prefixes the calling code", () => {
    expect(formatE164("62", "8123456789")).toBe("+628123456789");
  });

  it("is empty when there is no national number, so required checks work", () => {
    expect(formatE164("62", "")).toBe("");
  });
});

describe("parseInternationalNumber", () => {
  it("splits calling code and national number", () => {
    const parsed = parseInternationalNumber("+62 812-3456", PHONE_COUNTRIES);
    expect(parsed?.country.code).toBe("ID");
    expect(parsed?.nationalNumber).toBe("8123456");
  });

  it("accepts the 00 international prefix", () => {
    const parsed = parseInternationalNumber("006591234567", PHONE_COUNTRIES);
    expect(parsed?.country.code).toBe("SG");
    expect(parsed?.nationalNumber).toBe("91234567");
  });

  it("prefers the longest calling code", () => {
    // +673 (Brunei) must not be read as +67... or a shorter code
    const parsed = parseInternationalNumber("+6737123456", PHONE_COUNTRIES);
    expect(parsed?.country.code).toBe("BN");
  });

  it("keeps the preferred country among countries sharing a code", () => {
    const canada = findPhoneCountry(PHONE_COUNTRIES, "CA");
    const us = findPhoneCountry(PHONE_COUNTRIES, "US");
    expect(
      parseInternationalNumber("+14155550100", PHONE_COUNTRIES, us)?.country
        .code,
    ).toBe("US");
    expect(
      parseInternationalNumber("+14155550100", PHONE_COUNTRIES, canada)?.country
        .code,
    ).toBe("CA");
  });

  it("returns null for national numbers and unknown codes", () => {
    expect(parseInternationalNumber("08123456", PHONE_COUNTRIES)).toBeNull();
    expect(parseInternationalNumber("+", PHONE_COUNTRIES)).toBeNull();
    expect(
      parseInternationalNumber("+62812", [{ code: "SG", dialCode: "65" }]),
    ).toBeNull();
  });
});

describe("getFlagEmoji", () => {
  it("maps an ISO code to its regional-indicator pair", () => {
    expect(getFlagEmoji("id")).toBe("\u{1F1EE}\u{1F1E9}");
  });

  it("returns an empty string for invalid codes", () => {
    expect(getFlagEmoji("IDN")).toBe("");
  });
});
