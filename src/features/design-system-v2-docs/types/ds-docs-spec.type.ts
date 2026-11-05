// src/features/design-system-v2-docs/types/ds-docs-spec.type.ts

import type { ReactNode } from "react";

export type PropControlKind =
  | "text"
  | "number"
  | "boolean"
  | "select"
  | "colorPalette";

export type ComponentPropSpec = {
  name: string;
  type: string;
  description: string;
  defaultValue?: unknown;
  required?: boolean;
  controlKind?: PropControlKind;
  options?: readonly (string | number)[];
};

export type A11yGuidelineSpec = {
  keyboardNav?: { key: string; action: string }[];
  ariaGuidelines?: { attribute: string; description: string }[];
  notes?: string;
};

export type ComponentDocSpec = {
  id: string;
  title: string;
  description: string;
  category: string;
  importPath: string;
  component: React.ComponentType<Record<string, unknown>>;
  defaultProps: Record<string, unknown>;
  propsSpec: ComponentPropSpec[];
  a11y?: A11yGuidelineSpec;
  renderPlayground?: (
    propsState: Record<string, unknown>,
    onPropChange: (name: string, value: unknown) => void,
  ) => ReactNode;
};

