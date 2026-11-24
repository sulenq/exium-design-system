// src/design-system/components/branding/logo/logo.type.ts

import type { CenterProps } from "@chakra-ui/react";

export type LogoProps = CenterProps & {
  color?: string;
  boxSize?: number | `${number}px`;
};
