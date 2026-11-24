// src/design-system/hooks/use-exchange-rate.ts

import type {
  CurrencyConversion,
  ExchangeRateResult,
} from "@/design-system/components/input/currency-input/currency-input.type";
import { fetchExchangeRate } from "@/design-system/components/input/currency-input/exchange-rate.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const DAY_MS = 24 * 60 * 60 * 1000;
const STORAGE_PREFIX = "exium:exchange-rate:";

function readCached(key: string): { data: CurrencyConversion; savedAt: number } | undefined {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw) as { data: CurrencyConversion; savedAt: number };
    return Date.now() - parsed.savedAt < DAY_MS ? parsed : undefined;
  } catch {
    return undefined;
  }
}

function writeCached(key: string, data: CurrencyConversion) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify({ data, savedAt: Date.now() }));
  } catch {
    // Storage full or blocked: the in-memory query cache still applies
  }
}

/**
 * Daily exchange rate for a display-only conversion, cached for 24 hours in memory and in
 * localStorage. Pass the result's `conversion` to `CurrencyInput`.
 *
 * @example
 * const { conversion } = useExchangeRate("IDR", "USD");
 * <CurrencyInput value={price} onValueChange={setPrice} conversion={conversion} />
 */
export function useExchangeRate(
  from: string,
  to: string,
  options?: { enabled?: boolean },
): ExchangeRateResult {
  // Derived Values
  const key = `${from.toUpperCase()}-${to.toUpperCase()}`;
  const isSameCurrency = from.toUpperCase() === to.toUpperCase();
  const cached = readCached(key);

  // Queries
  const query = useQuery({
    queryKey: ["exium", "exchange-rate", key],
    queryFn: ({ signal }) => fetchExchangeRate(from, to, signal),
    enabled: (options?.enabled ?? true) && !isSameCurrency,
    staleTime: DAY_MS,
    gcTime: DAY_MS,
    retry: 1,
    initialData: cached?.data,
    initialDataUpdatedAt: cached?.savedAt,
  });

  // Effects
  useEffect(() => {
    if (query.data && query.dataUpdatedAt !== cached?.savedAt) writeCached(key, query.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.data, query.dataUpdatedAt, key]);

  if (isSameCurrency) {
    return { conversion: undefined, isLoading: false, isError: false, refetch: () => {} };
  }

  return {
    conversion: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: () => void query.refetch(),
  };
}
