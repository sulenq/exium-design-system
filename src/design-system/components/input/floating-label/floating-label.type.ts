// src/design-system/components/input/floating-label/floating-label.type.ts

import type { ReactNode } from "react";

export type FloatingLabelProps = {
  label: ReactNode;
  optional?: boolean;
  left?: string;
  right?: string;
};

