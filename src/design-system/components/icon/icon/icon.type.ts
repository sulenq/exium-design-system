// src/design-system/components/icon/icon/icon.type.ts

import type { IconProps as ChakraIconProps } from "@chakra-ui/react";
import type { Icon as LucideIcon, IconProps as LucideProps } from "@phosphor-icons/react";

export type IconProps = ChakraIconProps;

export type LucideIconProps = LucideProps & {
  icon?: LucideIcon;
};
