// src/design-system/components/input/currency-input/currency-input.utils.ts

import type { ParseCurrencyOptions } from "@/design-system/components/input/currency-input/currency-input.type";

// -------------------------------------------------------------------------------------
// Fraction digits
// -------------------------------------------------------------------------------------

/**
 * Minor units people actually use. Intl gives IDR 2 fraction digits, but rupiah amounts
 * are written without decimals, so IDR (and other zero-decimal currencies) override it.
 */
const FRACTION_DIGITS_OVERRIDES: Record<string, number> = {
  IDR: 0,
  JPY: 0,
  KRW: 0,
  VND: 0,
  CLP: 0,
  ISK: 0,
};

export function getCurrencyFractionDigits(currency: string, locale = "id-ID"): number {
  const code = currency.toUpperCase();
  if (code in FRACTION_DIGITS_OVERRIDES) return FRACTION_DIGITS_OVERRIDES[code];
  return (
    new Intl.NumberFormat(locale, { style: "currency", currency: code }).resolvedOptions()
      .maximumFractionDigits ?? 2
  );
}

// -------------------------------------------------------------------------------------
// Locale separators and symbol
// -------------------------------------------------------------------------------------

export function getLocaleSeparators(locale: string): { group: string; decimal: string } {
  const parts = new Intl.NumberFormat(locale).formatToParts(1234567.5);
  return {
    group: parts.find((part) => part.type === "group")?.value ?? ".",
    decimal: parts.find((part) => part.type === "decimal")?.value ?? ",",
  };
}

/** Narrow currency symbol, e.g. "Rp" for IDR or "$" for USD. */
export function getCurrencySymbol(currency: string, locale: string): string {
  const parts = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
  }).formatToParts(0);
  return parts.find((part) => part.type === "currency")?.value ?? currency;
}

// -------------------------------------------------------------------------------------
// Formatting
// -------------------------------------------------------------------------------------

/** Number without the symbol, grouped for the locale: 1500000 → "1.500.000" (id-ID). */
export function formatCurrencyNumber(
  value: number,
  options: { locale: string; fractionDigits: number },
): string {
  const { locale, fractionDigits } = options;
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

/**
 * Full amount with an unambiguous symbol: 1500000 IDR → "Rp1.500.000", 82.23 USD in id-ID →
 * "US$82,23" (a narrow "$" would be ambiguous next to other dollar currencies).
 */
export function formatCurrency(
  value: number,
  options: { currency: string; locale: string; fractionDigits?: number },
): string {
  const { currency, locale } = options;
  const fractionDigits = options.fractionDigits ?? getCurrencyFractionDigits(currency, locale);
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    currencyDisplay: "symbol",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })
    .format(value)
    .replace(/\s/g, "");
}

// -------------------------------------------------------------------------------------
// Parsing
// -------------------------------------------------------------------------------------

/**
 * Indonesian and English magnitude suffixes. Matched longest first, so "rb" is read as
 * ribu and not as "b" (billion). "m" follows Indonesian usage: miliar, not million.
 */
const SHORTHAND_SUFFIXES: Array<[string, number]> = (
  [
    ["miliar", 1e9],
    ["milyar", 1e9],
    ["billion", 1e9],
    ["bn", 1e9],
    ["b", 1e9],
    ["m", 1e9],
    ["juta", 1e6],
    ["million", 1e6],
    ["jt", 1e6],
    ["mn", 1e6],
    ["ribu", 1e3],
    ["thousand", 1e3],
    ["rb", 1e3],
    ["k", 1e3],
  ] as Array<[string, number]>
).sort((a, b) => b[0].length - a[0].length);

/**
 * Parse what someone typed into a number. Accepts grouped numbers ("1.500.000"),
 * a locale decimal ("12,5") and, with `shorthand`, magnitude suffixes:
 * "1,5jt" → 1500000, "250rb" → 250000, "2m" → 2000000000.
 * Returns null for empty or unreadable input.
 */
export function parseCurrencyInput(text: string, options: ParseCurrencyOptions): number | null {
  const { locale, fractionDigits, shorthand } = options;
  const { group, decimal } = getLocaleSeparators(locale);
  let raw = text.trim().replace(/\s/g, "");
  if (raw === "") return null;

  let multiplier = 1;
  if (shorthand) {
    const lower = raw.toLowerCase();
    const match = SHORTHAND_SUFFIXES.find(([suffix]) => lower.endsWith(suffix));
    if (match) {
      multiplier = match[1];
      raw = raw.slice(0, raw.length - match[0].length);
    }
  }

  // With a multiplier, the separator is a decimal ("1,5jt" or "1.5jt").
  // Without one, the locale group separator is ignored.
  let normalized: string;
  if (multiplier !== 1) {
    const [whole, ...fraction] = raw.split(/[.,]/);
    normalized = fraction.length > 1 ? "invalid" : [whole, ...fraction].join(".");
  } else {
    normalized = raw.split(group).join("").replace(decimal, ".");
  }

  if (!/^-?\d*\.?\d*$/.test(normalized) || normalized === "" || normalized === "-") return null;
  const parsed = Number(normalized) * multiplier;
  if (!Number.isFinite(parsed)) return null;

  const factor = 10 ** fractionDigits;
  return Math.round(parsed * factor) / factor;
}

export function clampValue(value: number, min?: number, max?: number): number {
  if (min !== undefined && value < min) return min;
  if (max !== undefined && value > max) return max;
  return value;
}

// -------------------------------------------------------------------------------------
// Live formatting while typing
// -------------------------------------------------------------------------------------

/**
 * Re-group a plain number while the user types, and return where the caret should go.
 * Shorthand input ("1,5j…") is left untouched until blur.
 */
export function formatWhileTyping(
  text: string,
  caret: number,
  options: { locale: string; fractionDigits: number },
): { text: string; caret: number } {
  const { locale, fractionDigits } = options;
  const { group, decimal } = getLocaleSeparators(locale);
  if (/[a-z]/i.test(text)) return { text, caret };

  const withoutGroups = text.split(group).join("");
  const [integerPart = "", ...rest] = withoutGroups.split(decimal);
  const hasDecimal = fractionDigits > 0 && rest.length > 0;
  const fractionPart = hasDecimal ? rest.join("").replace(/\D/g, "").slice(0, fractionDigits) : "";
  const digits = integerPart.replace(/\D/g, "").replace(/^0+(?=\d)/, "");
  const negative = integerPart.trim().startsWith("-");
  if (digits === "" && !hasDecimal) return { text: negative ? "-" : "", caret: negative ? 1 : 0 };

  const groupedInteger = digits === "" ? "0" : new Intl.NumberFormat(locale).format(Number(digits));
  const next = `${negative ? "-" : ""}${groupedInteger}${hasDecimal ? decimal + fractionPart : ""}`;

  // Keep the caret after the same number of significant characters
  const significantBefore = text.slice(0, caret).replace(new RegExp(`\\${group}`, "g"), "").length;
  let count = 0;
  let nextCaret = next.length;
  for (let index = 0; index < next.length; index += 1) {
    if (count >= significantBefore) {
      nextCaret = index;
      break;
    }
    if (next[index] !== group) count += 1;
  }
  return { text: next, caret: nextCaret };
}
