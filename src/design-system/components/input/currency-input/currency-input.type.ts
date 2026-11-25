// src/design-system/components/input/currency-input/currency-input.type.ts

import type { InputProps } from "@/design-system/components/input/input/input.type";

/** A display-only conversion of the typed amount, e.g. "≈ US$82,23 · kurs 24 Nov 2026". */
export type CurrencyConversion = {
  /** ISO 4217 code to convert to, e.g. "USD". */
  to: string;
  /** Units of `to` per one unit of the input currency. */
  rate: number;
  /** Date of the rate, ISO `YYYY-MM-DD`. */
  rateDate: string;
};

export type CurrencyInputProps = Omit<
  InputProps,
  "value" | "defaultValue" | "onChange" | "type" | "min" | "max" | "startElement"
> & {
  /** Numeric value (controlled). `null` means empty. */
  value?: number | null;
  defaultValue?: number | null;
  /** Called with the parsed number while typing and with the clamped number on blur. */
  onValueChange?: (value: number | null) => void;
  /** ISO 4217 code. Default "IDR". */
  currency?: string;
  /** Formatting locale. Default "id-ID" (Rp1.500.000). */
  locale?: string;
  /** Override minor units. Default per currency: IDR 0, USD 2. */
  fractionDigits?: number;
  /** Clamped on blur. */
  min?: number;
  max?: number;
  /** Accept "1,5jt", "250rb", "2m" (miliar). Default true. */
  shorthand?: boolean;
  /** Display-only conversion shown under the input. Use `useExchangeRate` to get one. */
  conversion?: CurrencyConversion;
  /** Hide the currency symbol at the start of the input. */
  hideSymbol?: boolean;
};

export type ExchangeRateResult = {
  conversion: CurrencyConversion | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
};

export type ParseCurrencyOptions = {
  locale: string;
  fractionDigits: number;
  shorthand: boolean;
};
