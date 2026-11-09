// src/design-system/components/disclosure/ui/presence.tsx

import type { PresenceProps } from "@/design-system/components/disclosure/presence/presence.type";
import { Presence as ChakraPresence } from "@chakra-ui/react";

export const Presence = (props: PresenceProps) => {
  // Props
  const { children, ...restProps } = props;

  return <ChakraPresence {...restProps}>{children}</ChakraPresence>;
};
