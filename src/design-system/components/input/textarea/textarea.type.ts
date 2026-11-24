// src/design-system/components/input/textarea/textarea.type.ts

import type { TextareaProps as ChakraTextareaProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

export type TextareaProps = ChakraTextareaProps & {
  startElement?: ReactNode;
};
