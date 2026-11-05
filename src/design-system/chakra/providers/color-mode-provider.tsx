// src/design-system/chakra/providers/color-mode-provider.tsx

"use client";

import { ThemeProvider } from "@/components/theme/theme-provider";
import type { ThemeProviderProps } from "@/hooks/types/use-theme.type";

export function ColorModeProvider(props: ThemeProviderProps) {
  const { children, ...restProps } = props;
  return (
    <ThemeProvider defaultTheme={"light"} {...restProps}>
      {children}
    </ThemeProvider>
  );
}
