// src/design-system/components/input/field/field.type.ts

import { Field as ChakraField } from "@chakra-ui/react";
import type { ReactNode } from "react";

export type FieldVariant = "default" | "floating";

export type FieldProps = Omit<
  ChakraField.RootProps,
  "label" | "required" | "variant"
> & {
  label?: ReactNode;
  labelProps?: ChakraField.LabelProps;
  helperText?: ReactNode;
  errorText?: ReactNode;
  optional?: boolean;
  /**
   * Locked state: the value stays readable but cannot be edited, e.g. after a record is
   * handed over. Sets `readOnly` on the field and shows a lock icon with `lockedText`.
   */
  locked?: boolean;
  lockedText?: ReactNode;
  variant?: FieldVariant;
  /** @deprecated Kept only for DurationInput; remove together with it. */
  hasValue?: boolean;
  /** @deprecated Kept only for DurationInput; remove together with it. */
  isFloating?: boolean;
};
