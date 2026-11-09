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
      gap={"md"}
      minH={"headerH"}
      py={"xs"}
      px={"md"}
      {...restProps}
    >
      {children}
    </HStack>
  );
};
