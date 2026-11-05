// src/features/design-system-v2-docs/constants/ds.nav-groups.ts

import { DS_V2_NAVS } from "@/features/design-system-v2-docs/constants/ds.navs";
import type { DsDocNavGroup } from "@/features/design-system-v2-docs/types/ds-docs-navs.type";

export const DS_V2_NAV_GROUPS: DsDocNavGroup[] = [
  {
    category: "Getting Started",
    items: DS_V2_NAVS.filter((n) => n.category === "Getting Started"),
  },
  {
    category: "General",
    items: DS_V2_NAVS.filter((n) => n.category === "General"),
  },
];

