// src/design-system/chakra/providers/color-mode-provider.tsx

"use client";

import { ThemeProvider } from "@/design-system-v2/theme/theme-provider";
import type { ThemeProviderProps } from "@/design-system-v2/hooks/types/use-theme.type";

export function ColorModeProvider(props: ThemeProviderProps) {
  const { children, ...restProps } = props;
  return (
    <ThemeProvider defaultTheme={"light"} {...restProps}>
      {children}
    </ThemeProvider>
  );
}
