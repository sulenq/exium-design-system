// src/design-system/components/shell/ui/header-container.tsx

import type { StackProps } from "@/design-system/components/layout/flex-box/flex-box.type";
import { HStack } from "@/design-system/components/layout/flex-box/flex-box";

export const HeaderContainer = (props: StackProps) => {
  // Props
  const { children, ...restProps } = props;

  return (
    <HStack
      flexShrink={0}
      align={"center"}
      justify={"space-between"}
      gap={4}
      minH={"headerH"}
      py={2}
      px={4}
      {...restProps}
    >
      {children}
    </HStack>
  );
};
