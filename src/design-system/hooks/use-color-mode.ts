// src/design-system/hooks/use-color-mode.ts

import { useTheme } from "@/hooks/use-theme";
import type {
  ColorMode,
  UseColorMode,
} from "@/design-system/hooks/types/use-color-mode.type";

export function useColorMode(): UseColorMode {
  const { colorMode, setColorMode, toggleColorMode } = useTheme();
  return {
    colorMode: colorMode as ColorMode,
    setColorMode,
    toggleColorMode,
  };
}

export function useColorModeValue<TLight, TDark>(
  lightValue: TLight,
  darkValue: TDark,
): TLight | TDark {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? darkValue : lightValue;
}
