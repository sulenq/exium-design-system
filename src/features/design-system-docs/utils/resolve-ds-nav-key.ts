// src/features/design-system-docs/utils/resolve-ds-nav-key.ts

import { DS_NAVS_MAP } from "@/features/design-system-docs/constants/ds.navs";
import type { DsNavKey } from "@/features/design-system-docs/types/ds-docs-navs.type";

const DS_NAV_KEYS = new Set(Object.keys(DS_NAVS_MAP));

/**
 * Ubah nilai `?component=` dari URL menjadi DsNavKey.
 * Menerima snake_case, kebab-case, camelCase, dan PascalCase
 * (`currency_input`, `currency-input`, `currencyInput`, `CurrencyInput`).
 * Kosong → "overview". Tidak dikenal → null.
 */
export const resolveDsNavKey = (raw?: string): DsNavKey | null => {
  const value = raw?.trim();
  if (!value) return "overview";
  if (DS_NAV_KEYS.has(value)) return value as DsNavKey;

  const normalized = value
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/[-\s]+/g, "_")
    .toLowerCase();

  return DS_NAV_KEYS.has(normalized) ? (normalized as DsNavKey) : null;
};
