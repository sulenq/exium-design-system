// src/design-system/components/feedback/types/state.welcome.type.ts

import type { StackProps } from "@/design-system/components/layout/flex-box/flex-box.type";

export type StateWelcomeProps = StackProps & {
  title?: string;
  subtitle?: string;
  badgeLabel?: string;
};
