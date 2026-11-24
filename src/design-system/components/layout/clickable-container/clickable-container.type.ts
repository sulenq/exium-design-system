// src/design-system/components/layout/clickable-container/clickable-container.type.ts

import type { StackProps } from "@/design-system/components/layout/flex-box/flex-box.type";

export type ClickableContainerProps = StackProps & {
  children: React.ReactNode;
  targetRef?: React.RefObject<HTMLInputElement>;
  asLabel?: boolean;
};
