// src/design-system/components/layout/ui/constrained-container.tsx

import type { ConstrainedContainerProps } from "@/design-system/components/layout/container/container.type";
import { Box } from "@/design-system/components/layout/box/box";
import { useLayoutStore } from "@/design-system/stores/layout-store";
import { forwardRef } from "react";

export const ConstrainedContainer = forwardRef<
  HTMLDivElement,
  ConstrainedContainerProps
>(function ConstrainedContainer(props, ref) {
  // Props
  const {
    children,
    maxW,
    mx = "auto",
    w = "full",
    useStoreMaxW = true,
    ...restProps
  } = props;

  // Stores
  const { layout } = useLayoutStore();

  // Derived Values
  const resolvedMaxW = maxW ?? (useStoreMaxW ? layout.maxW : "720px");

  return (
    <Box ref={ref} maxW={resolvedMaxW} mx={mx} w={w} {...restProps}>
      {children}
    </Box>
  );
});
