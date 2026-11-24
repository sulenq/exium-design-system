// src/design-system/components/typography/badge/badge.type.ts

import type { BadgeProps as ChakraBadgeProps } from "@chakra-ui/react";

export type BadgeStatus =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral"
  | "locked";

export type BadgeProps = ChakraBadgeProps & {
  /**
   * Semantic status. Sets the color palette and, unless `withStatusIcon` is false,
   * a leading icon so the status is not conveyed by color alone (WCAG 1.4.1).
   */
  status?: BadgeStatus;
  withStatusIcon?: boolean;
};
