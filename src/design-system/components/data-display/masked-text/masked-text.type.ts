// src/design-system/components/data-display/masked-text/masked-text.type.ts

import type { StackProps } from "@/design-system/components/layout/flex-box/flex-box.type";

export type MaskedTextProps = StackProps & {
  value?: string | null;
  defaultVisible?: boolean;
  maskLength?: number;
  maskChar?: string;
  withCopy?: boolean;
  copyLabel?: string;
  withToggle?: boolean;
  maxW?: StackProps["maxW"];
};
