// src/design-system/components/input/currency-input/exchange-rate.service.ts

import type { CurrencyConversion } from "@/design-system/components/input/currency-input/currency-input.type";

/**
 * Daily mid-market rates for display only, never for transaction amounts.
 * Primary: Frankfurter (no key, no quota, self-hostable). Fallback: fawazahmed0/currency-api
 * on jsDelivr (no key).
 */
export const FRANKFURTER_URL = "https://api.frankfurter.dev/v2/rate";
export const CURRENCY_API_FALLBACK_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

async function fetchFromFrankfurter(
  from: string,
  to: string,
  signal?: AbortSignal,
): Promise<CurrencyConversion> {
  const response = await fetch(`${FRANKFURTER_URL}/${from.toLowerCase()}/${to.toLowerCase()}`, {
    signal,
  });
  if (!response.ok) throw new Error(`Frankfurter ${response.status}`);
  const data = (await response.json()) as { date?: string; rate?: number };
  if (typeof data.rate !== "number" || !data.date) throw new Error("Frankfurter: no rate");
  return { to: to.toUpperCase(), rate: data.rate, rateDate: data.date };
}

async function fetchFromFallback(
  from: string,
  to: string,
  signal?: AbortSignal,
): Promise<CurrencyConversion> {
  const base = from.toLowerCase();
  const response = await fetch(`${CURRENCY_API_FALLBACK_URL}/${base}.json`, { signal });
  if (!response.ok) throw new Error(`currency-api ${response.status}`);
  const data = (await response.json()) as { date?: string } & Record<string, unknown>;
  const rates = data[base] as Record<string, number> | undefined;
  const rate = rates?.[to.toLowerCase()];
  if (typeof rate !== "number" || !data.date) throw new Error("currency-api: no rate");
  return { to: to.toUpperCase(), rate, rateDate: data.date };
}

/** Try Frankfurter, then the fallback. Throws only when both fail. */
export async function fetchExchangeRate(
  from: string,
  to: string,
  signal?: AbortSignal,
): Promise<CurrencyConversion> {
  try {
    return await fetchFromFrankfurter(from, to, signal);
  } catch (primaryError) {
    if (signal?.aborted) throw primaryError;
    return fetchFromFallback(from, to, signal);
  }
}
