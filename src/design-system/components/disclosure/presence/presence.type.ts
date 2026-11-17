// src/design-system/components/disclosure/types/presence.type.ts

import type { PresenceProps as ChakraPresenceProps } from "@chakra-ui/react";
import type { ReactNode, Ref } from "react";

export type PresenceProps = ChakraPresenceProps & {
  children?: ReactNode;
  ref?: Ref<HTMLDivElement | null>;
};
