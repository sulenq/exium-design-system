// src/design-system/components/input/utils/phone.utils.ts

import { E164_MAX_DIGITS } from "@/design-system/constants/phone-countries";
import type {
  ParsedPhoneValue,
  PhoneCountry,
} from "@/design-system/constants/types/phone-countries.type";

/** Regional-indicator flag emoji for an ISO 3166-1 alpha-2 code. */
export function getFlagEmoji(countryCode: string): string {
  const upper = countryCode.toUpperCase();
  if (!/^[A-Z]{2}$/.test(upper)) return "";
  return String.fromCodePoint(
    ...[...upper].map((char) => 0x1f1e6 + char.charCodeAt(0) - 65),
  );
}

/** Localized country name, falling back to the ISO code when unsupported. */
export function getCountryName(countryCode: string, locale: string): string {
  try {
    const displayNames = new Intl.DisplayNames([locale], { type: "region" });
    return displayNames.of(countryCode.toUpperCase()) ?? countryCode;
  } catch {
    return countryCode;
  }
}

export function findPhoneCountry(
  countries: PhoneCountry[],
  countryCode: string | undefined,
): PhoneCountry | undefined {
  if (!countryCode) return undefined;
  const upper = countryCode.toUpperCase();
  return countries.find((country) => country.code === upper);
}

/**
 * Keeps digits only, optionally drops the national trunk prefix ("0"), and
 * caps the length so dial code + national number never exceeds E.164.
 */
export function sanitizeNationalNumber(
  raw: string,
  dialCode: string,
  stripLeadingZero: boolean,
): string {
  let digits = raw.replace(/\D/g, "");
  if (stripLeadingZero) {
    digits = digits.replace(/^0+/, "");
  }
  return digits.slice(0, Math.max(E164_MAX_DIGITS - dialCode.length, 0));
}

/** "+{dialCode}{nationalNumber}", or "" when there is no national number. */
export function formatE164(dialCode: string, nationalNumber: string): string {
  if (!nationalNumber) return "";
  return `+${dialCode}${nationalNumber}`;
}

/**
 * Splits an international number ("+62812...", "0062812...") into country and
 * national number. The longest matching calling code wins; when several
 * countries share it, `preferredCountry` is kept if it is one of them.
 * Returns null when the value is not international or matches no country.
 */
export function parseInternationalNumber(
  value: string,
  countries: PhoneCountry[],
  preferredCountry?: PhoneCountry,
): ParsedPhoneValue | null {
  const trimmed = value.trim();
  const isInternational = trimmed.startsWith("+") || trimmed.startsWith("00");
  if (!isInternational) return null;

  const digits = trimmed.replace(/^00/, "").replace(/\D/g, "");
  if (!digits) return null;

  const matches = countries.filter((country) =>
    digits.startsWith(country.dialCode),
  );
  const longest = Math.max(0, ...matches.map((c) => c.dialCode.length));
  const candidates = matches.filter((c) => c.dialCode.length === longest);
  const country =
    candidates.find((c) => c.code === preferredCountry?.code) ?? candidates[0];
  if (!country) return null;

  return {
    country,
    nationalNumber: digits.slice(country.dialCode.length),
  };
}
