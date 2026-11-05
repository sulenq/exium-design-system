// src/shared/constants/app.nav-groups.ts

import type { AdminAppNavKey, AppNavKey } from "@/shared/types/app-navs.type";
import type { NavGroup } from "@/shared/types/nav.type";

export const APP_NAV_GROUPS_LIST: NavGroup<AppNavKey>[] = [
  {
    items: [
      { key: "docs" },
      { key: "components" },
      { key: "demo" },
      { key: "theme" },
    ],
  },
];

export const APP_OTHER_NAV_GROUPS_LIST: NavGroup<AppNavKey>[] = [
  {
    items: [{ key: "explore" }],
  },
];

export const INTERNAL_APP_NAV_GROUPS_LIST: NavGroup<AdminAppNavKey>[] = [
  {
    items: [
      { key: "docs" },
      { key: "components" },
      { key: "demo" },
    ],
  },
];

export const INTERNAL_APP_OTHER_NAV_GROUPS_LIST: NavGroup<AdminAppNavKey>[] = [
  {
    items: [],
  },
];

