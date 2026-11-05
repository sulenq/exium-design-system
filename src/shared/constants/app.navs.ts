// src/shared/constants/app.navs.ts

import type { NavItem } from "@/shared/types/nav.type";
import {
  BookOpenIcon,
  CompassIcon,
  LayersIcon,
  PaletteIcon,
  SparklesIcon,
} from "lucide-react";

export const APP_NAVS_MAP = {
  docs: {
    icon: BookOpenIcon,
    title: "Documentation",
    pathname: "/design-system/ui",
  },
  components: {
    icon: LayersIcon,
    title: "Components",
    pathname: "/design-system/ui",
  },
  demo: {
    icon: SparklesIcon,
    title: "Demo Showcase",
    pathname: "/demo",
  },
  theme: {
    icon: PaletteIcon,
    title: "Theme & Tokens",
    pathname: "/design-system/ui",
  },
  explore: {
    icon: CompassIcon,
    title: "Explore",
    pathname: "/demo",
  },
} as const satisfies Record<string, NavItem>;

// Admin / Internal Navigation
export const INTERNAL_APP_NAVS_MAP = {
  docs: {
    icon: BookOpenIcon,
    title: "Documentation",
    pathname: "/design-system/ui",
  },
  components: {
    icon: LayersIcon,
    title: "Components",
    pathname: "/design-system/ui",
  },
  demo: {
    icon: SparklesIcon,
    title: "Demo Showcase",
    pathname: "/demo",
  },
} as const satisfies Record<string, NavItem>;

