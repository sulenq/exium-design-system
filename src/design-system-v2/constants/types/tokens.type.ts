// src/design-system-v2/constants/types/tokens.type.ts

export type ColorModeValue = {
  light: string;
  dark: string;
};

export type SemanticColors = {
  background: ColorModeValue;
  foreground: ColorModeValue;
  card: ColorModeValue;
  cardForeground: ColorModeValue;
  popover: ColorModeValue;
  popoverForeground: ColorModeValue;
  primary: ColorModeValue;
  primaryForeground: ColorModeValue;
  secondary: ColorModeValue;
  secondaryForeground: ColorModeValue;
  muted: ColorModeValue;
  mutedForeground: ColorModeValue;
  accent: ColorModeValue;
  accentForeground: ColorModeValue;
  destructive: ColorModeValue;
  destructiveForeground: ColorModeValue;
  border: ColorModeValue;
  input: ColorModeValue;
  ring: ColorModeValue;
};

export type DesignTokens = {
  breakpoints: Record<string, string>;
  colors: SemanticColors;
  radius: string;
};

