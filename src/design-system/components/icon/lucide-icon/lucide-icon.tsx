// src/design-system/components/icon/lucide-icon/lucide-icon.tsx

"use client";

import type { LucideIconProps } from "@/design-system/components/icon/icon/icon.type";

/**
 * @internal Building block of `AppIcon`. In app code use `AppIcon` so size,
 * stroke and color stay consistent across the design system.
 */
export function LucideIcon(props: LucideIconProps) {
  // Props
  const {
    icon: LucideIcon,
    size = 24,
    strokeWidth = 1.75,
    ...restProps
  } = props;

  return (
    LucideIcon && (
      <LucideIcon size={size} strokeWidth={strokeWidth} {...restProps} />
    )
  );
}
