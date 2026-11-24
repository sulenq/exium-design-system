// src/design-system/components/icon/icon/icon.tsx

"use client";

import type { IconProps } from "@/design-system/components/icon/icon/icon.type";
import { Icon as ChakraIcon } from "@chakra-ui/react";

/**
 * @internal Building block of `AppIcon`. In app code use `AppIcon` so size,
 * stroke and color stay consistent across the design system.
 */
export const Icon = (props: IconProps) => {
  // Props
  const { ...restProps } = props;

  return <ChakraIcon {...restProps} />;
};
