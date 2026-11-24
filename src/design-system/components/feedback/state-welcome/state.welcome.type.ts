// src/design-system/components/feedback/state-welcome/state.welcome.type.ts

import type { StackProps } from "@/design-system/components/layout/flex-box/flex-box.type";

export type StateWelcomeProps = StackProps & {
  title?: string;
  subtitle?: string;
  badgeLabel?: string;
  /** Nav keys suggested when there is not enough recent history. Default: none. */
  fallbackNavKeys?: string[];
};
