// src/design-system/stores/types/app-config-store.type.ts

export type AppDateFormat = "dmy" | "mdy" | "ymd";

export type AppConfigStore = {
  dateFormat: AppDateFormat;
  setDateFormat: (dateFormat: AppDateFormat) => void;
};

