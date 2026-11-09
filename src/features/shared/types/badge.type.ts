// src/features/shared/types/badge.type.ts

import type { BadgeProps } from "@/design-system/components/typography/badge/badge.type";
import type { UserRole } from "@/shared/types/common-response.type";

export type UserRoleBadgeProps = Omit<BadgeProps, "children"> & {
  children?: UserRole | (string & {});
  showIcon?: boolean;
};

