// src/design-system/components/input/input/input.type.ts

import type { InputProps as ChakraInputProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

export type InputProps = ChakraInputProps & {
  startElement?: ReactNode;
  endElement?: ReactNode;
  floatingLabel?: boolean;
};
