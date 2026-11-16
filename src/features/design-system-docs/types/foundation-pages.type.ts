// src/features/design-system-docs/types/foundation-pages.type.ts

export type ShadowLevel = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export type ShadowTokenValue = {
  base?: string;
  _dark?: string;
};

export type ShadowGuideItem = {
  level: ShadowLevel;
  components: string[];
  purpose: string;
};

export type BreakpointKey = "sm" | "md" | "lg" | "xl";

export type DeviceGuideline = {
  key: BreakpointKey;
  target: string;
  minWidth: string;
  range: string;
  layoutBehavior: string;
  navigation: string;
  overlayBehavior: string;
};
