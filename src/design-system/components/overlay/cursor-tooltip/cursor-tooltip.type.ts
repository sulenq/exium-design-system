// src/design-system/components/overlay/cursor-tooltip/cursor-tooltip.type.ts

import type { ReactNode } from "react";

export type CursorTooltipProps = {
  children: ReactNode;
  content?: ReactNode;
  disabled?: boolean;
  offset?: { x: number; y: number };
};
