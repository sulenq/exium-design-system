// src/design-system/components/typography/types/count-badge.type.ts

import type { FloatProps } from "@/design-system/components/layout/float/float.type";
import type { BadgeProps } from "@/design-system/components/typography/badge/badge.type";

export type CountBadgeProps = Omit<BadgeProps, "children"> & {
  /** The numerical value to display. Values greater than max (default 99) will render as "99+". */
  children: number;
  /** Maximum displayable count before showing "+" suffix. Defaults to 99. */
  max?: number;
  /** Whether to wrap the badge inside the <Float> component for floating positioning. Defaults to false. */
  floating?: boolean;
  /** Props forwarded to the <Float> wrapper component when floating is true. */
  floatProps?: FloatProps;
};
