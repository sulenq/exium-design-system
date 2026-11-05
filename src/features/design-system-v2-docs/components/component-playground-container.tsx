// src/features/design-system-v2-docs/components/component-playground-container.tsx

import { Box } from "@/design-system/components/layout/ui/box";
import type { PropsWithChildren } from "react";

export const ComponentPlaygroundContainer = ({ children }: PropsWithChildren) => {
  return (
    <Box
      p={8}
      minH={"180px"}
      rounded={"md"}
      border={"1px solid"}
      borderColor={"border.subtle"}
      bg={"bg.panel"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      position={"relative"}
    >
      {children}
    </Box>
  );
};

