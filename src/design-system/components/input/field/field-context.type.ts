// src/design-system/components/input/field/field-context.type.ts

import type { FieldVariant } from "@/design-system/components/input/field/field.type";
import type { Field as ChakraField } from "@chakra-ui/react";
import type { ReactNode } from "react";

export type FieldContextValue = {
  variant?: FieldVariant;
  isFloating?: boolean;
  hasValue?: boolean;
  label?: ReactNode;
  optional?: boolean;
  labelProps?: ChakraField.LabelProps;
  /**
   * Called by FloatingLabel while mounted. When nothing claims the label (FileInput,
   * Checkbox, CameraCapture…), the floating Field renders a static label instead, so
   * the label never disappears. Returns the release function.
   */
  claimFloatingLabel?: () => () => void;
};
