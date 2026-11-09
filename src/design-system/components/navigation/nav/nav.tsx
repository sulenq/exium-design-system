// src/design-system/components/navigation/ui/nav.tsx

import { Button } from "@/design-system/components/button/button/button";
import type { NavButtonProps } from "@/design-system/components/navigation/nav/nav.type";
import { forwardRef } from "react";

export const NavButton = forwardRef<HTMLButtonElement, NavButtonProps>(
  function NavButton(props, ref) {
    // Props
    const { children, clicky = false, ...restProps } = props;

    return (
      <Button
        ref={ref}
        clicky={clicky}
        justifyContent={"start"}
        textAlign={"start"}
        gap={3}
        px={2}
        {...restProps}
      >
        {children}
      </Button>
    );
  },
);
