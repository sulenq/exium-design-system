// src/design-system/components/typography/badge/badge.tsx

import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import type {
  BadgeProps,
  BadgeStatus,
} from "@/design-system/components/typography/badge/badge.type";
import { Badge as ChakraBadge } from "@chakra-ui/react";
import {
  CircleAlertIcon,
  CircleCheckIcon,
  CircleXIcon,
  InfoIcon,
  LockIcon,
  type LucideIcon,
} from "lucide-react";

const STATUS_PALETTE: Record<BadgeStatus, string> = {
  success: "green",
  warning: "orange",
  danger: "red",
  info: "blue",
  neutral: "gray",
  locked: "gray",
};

const STATUS_ICON: Partial<Record<BadgeStatus, LucideIcon>> = {
  success: CircleCheckIcon,
  warning: CircleAlertIcon,
  danger: CircleXIcon,
  info: InfoIcon,
  locked: LockIcon,
};

export const Badge = (props: BadgeProps) => {
  // Props
  const { status, withStatusIcon = true, children, ...restProps } = props;

  // Derived Values
  const statusIcon = status && withStatusIcon ? STATUS_ICON[status] : undefined;

  return (
    <ChakraBadge
      fontSize={"sm"}
      rounded={`full`}
      colorPalette={status ? STATUS_PALETTE[status] : undefined}
      {...restProps}
    >
      {statusIcon && <AppIcon icon={statusIcon} boxSize={3.5} />}
      {children}
    </ChakraBadge>
  );
};
