// src/design-system/components/input/checkbox/checkbox.type.ts

import { Checkbox as ChakraCheckbox } from "@chakra-ui/react";
import type { ReactNode } from "react";

export type CheckboxContextValue = {
  isSubtleVariant: boolean;
};

export type CheckboxRootProps = ChakraCheckbox.RootProps;

export type CheckboxControlProps = ChakraCheckbox.ControlProps;

export type CheckboxProps = CheckboxRootProps & {
  children?: ReactNode;
  controlProps?: ChakraCheckbox.ControlProps;
};
