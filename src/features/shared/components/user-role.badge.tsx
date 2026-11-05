// src/features/shared/components/user-role.badge.tsx

import { AppIcon } from "@/design-system/components/icon/ui/app-icon";
import { Badge } from "@/design-system/components/typography/ui/badge";
import type { UserRoleBadgeProps } from "@/features/shared/types/badge.type";
import type { UserRole } from "@/shared/types/common-response.type";
import { ShieldCheckIcon, UserIcon } from "lucide-react";

export const USER_ROLE_MAP = {
  internal: {
    label: "Admin",
    colorPalette: "purple",
    icon: ShieldCheckIcon,
  },
  mitra: {
    label: "User",
    colorPalette: "blue",
    icon: UserIcon,
  },
} as const;

export const UserRoleBadge = (props: UserRoleBadgeProps) => {
  // Props
  const {
    children,
    showIcon = false,
    variant = "subtle",
    ...restProps
  } = props;

  // Derived Values
  const roleKey = (children ?? "") as UserRole;
  const config = USER_ROLE_MAP[roleKey];

  return (
    <Badge
      colorPalette={config?.colorPalette ?? "gray"}
      variant={variant}
      {...restProps}
    >
      {showIcon && config?.icon && <AppIcon icon={config.icon} size={"xs"} />}

      {config?.label ?? children ?? "-"}
    </Badge>
  );
};

