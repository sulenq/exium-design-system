// src/design-system/components/disclosure/ui/tabs.tsx

"use client";

import type {
  TabsContentGroupProps,
  TabsContentProps,
  TabsContextValue,
  TabsIndicatorProps,
  TabsListProps,
  TabsRootProps,
  TabsTriggerProps,
} from "@/design-system/components/disclosure/tabs/tabs.type";
import { useThemeStore } from "@/design-system/stores/theme-store";
import { Tabs as ChakraTabs } from "@chakra-ui/react";
import { createContext, forwardRef, useContext, useMemo } from "react";

const TabsContext = createContext<TabsContextValue | null>(null);

export function useTabsContext() {
  return useContext(TabsContext);
}

const TabsRoot = forwardRef<HTMLDivElement, TabsRootProps>((props, ref) => {
  // Props
  const { variant, children, ...restProps } = props;

  // Stores
  const { theme } = useThemeStore();

  // Derived Values
  const contextValue = useMemo(() => ({ variant }), [variant]);

  return (
    <TabsContext.Provider value={contextValue}>
      <ChakraTabs.Root
        ref={ref}
        variant={variant}
        colorPalette={theme.colorPalette}
        {...restProps}
      >
        {children}
      </ChakraTabs.Root>
    </TabsContext.Provider>
  );
});

const TabsList = forwardRef<HTMLDivElement, TabsListProps>((props, ref) => {
  // Props
  const { p = 0, px = 0, py = 0, gap = 4, ...restProps } = props;

  return (
    <ChakraTabs.List
      ref={ref}
      flexShrink={0}
      p={p}
      px={px}
      py={py}
      gap={gap}
      {...restProps}
    />
  );
});

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  (props, ref) => {
    // Props
    const { px = 0, ...restProps } = props;

    // Contexts
    const tabsContext = useTabsContext();

    // Stores
    const { theme } = useThemeStore();

    // Derived Values
    const isOutlineVariant = tabsContext?.variant === "outline";

    return (
      <ChakraTabs.Trigger
        ref={ref}
        fontSize={"md"}
        px={isOutlineVariant ? undefined : px}
        roundedTop={isOutlineVariant ? theme.radii.component : undefined}
        {...restProps}
      />
    );
  },
);

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  (props, ref) => {
    return <ChakraTabs.Content ref={ref} {...props} />;
  },
);

const TabsContentGroup = forwardRef<HTMLDivElement, TabsContentGroupProps>(
  (props, ref) => {
    return <ChakraTabs.ContentGroup ref={ref} {...props} />;
  },
);

const TabsIndicator = forwardRef<HTMLDivElement, TabsIndicatorProps>(
  (props, ref) => {
    return <ChakraTabs.Indicator ref={ref} {...props} />;
  },
);

export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
  ContentGroup: TabsContentGroup,
  Indicator: TabsIndicator,
};
