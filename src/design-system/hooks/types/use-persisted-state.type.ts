// src/design-system/hooks/types/use-persisted-state.type.ts

export type PersistStorageType = "local" | "session";

export type UsePersistedStateOptions = {
  storageType?: PersistStorageType;
  syncTabs?: boolean;
};

export type PersistedStateUpdater<T> = T | ((prevState: T) => T);

