// src/design-system/hooks/use-persisted-state.ts

import type {
  PersistedStateUpdater,
  UsePersistedStateOptions,
} from "@/design-system/hooks/types/use-persisted-state.type";
import { useCallback, useEffect, useState } from "react";

export function usePersistedState<T>(
  key: string,
  initialValue: T | (() => T),
  options: UsePersistedStateOptions = {},
): [T, (value: PersistedStateUpdater<T>) => void, () => void] {
  // Options
  const { storageType = "local", syncTabs = true } = options;

  // Helpers
  const getStorageArea = useCallback(() => {
    if (typeof window === "undefined") return null;
    return storageType === "local" ? window.localStorage : window.sessionStorage;
  }, [storageType]);

  const readValue = useCallback((): T => {
    const storage = getStorageArea();
    if (!storage) {
      return typeof initialValue === "function"
        ? (initialValue as () => T)()
        : initialValue;
    }

    try {
      const item = storage.getItem(key);
      if (item === null) {
        return typeof initialValue === "function"
          ? (initialValue as () => T)()
          : initialValue;
      }
      return JSON.parse(item) as T;
    } catch {
      return typeof initialValue === "function"
        ? (initialValue as () => T)()
        : initialValue;
    }
  }, [key, initialValue, getStorageArea]);

  // States
  const [state, setState] = useState<T>(readValue);

  // Callbacks
  const setPersistedState = useCallback(
    (value: PersistedStateUpdater<T>) => {
      setState((prev) => {
        const next = typeof value === "function" ? (value as (prev: T) => T)(prev) : value;
        const storage = getStorageArea();
        if (storage) {
          try {
            storage.setItem(key, JSON.stringify(next));
          } catch {
            // Ignore quota errors
          }
        }
        return next;
      });
    },
    [key, getStorageArea],
  );

  const resetState = useCallback(() => {
    const defaultValue =
      typeof initialValue === "function" ? (initialValue as () => T)() : initialValue;
    const storage = getStorageArea();
    if (storage) {
      try {
        storage.removeItem(key);
      } catch {
        // Ignore
      }
    }
    setState(defaultValue);
  }, [key, initialValue, getStorageArea]);

  // Effects: Cross-tab sync if local storage
  useEffect(() => {
    if (!syncTabs || storageType !== "local" || typeof window === "undefined") {
      return;
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key === key && event.storageArea === window.localStorage) {
        if (event.newValue === null) {
          const defaultValue =
            typeof initialValue === "function"
              ? (initialValue as () => T)()
              : initialValue;
          setState(defaultValue);
        } else {
          try {
            setState(JSON.parse(event.newValue) as T);
          } catch {
            // Ignore parse errors
          }
        }
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [key, initialValue, syncTabs, storageType]);

  return [state, setPersistedState, resetState];
}

