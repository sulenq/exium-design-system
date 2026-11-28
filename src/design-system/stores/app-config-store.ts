// src/design-system/stores/app-config-store.ts

import type { AppConfigStore } from "@/design-system/stores/types/app-config-store.type";
import { create } from "zustand";

export const useAppConfigStore = create<AppConfigStore>((set) => ({
  dateFormat: "dmy",
  setDateFormat: (dateFormat) => set({ dateFormat }),
}));
