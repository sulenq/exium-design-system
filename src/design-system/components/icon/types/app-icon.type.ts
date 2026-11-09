// src/design-system/components/icon/types/app-icon.type.ts

import type { IconProps } from "@chakra-ui/react";
import type { ComponentType } from "react";

export type AppIconSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl";

export type PhosphorIconWeight =
  | "thin"
  | "light"
  | "regular"
  | "bold"
  | "fill"
  | "duotone";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppIconComponent = ComponentType<any>;

export type AppIconProps = IconProps & {
  icon?: AppIconComponent;
  size?: AppIconSize;
  weight?: PhosphorIconWeight;
};
