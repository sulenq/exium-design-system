// src/design-system-v2/constants/tokens.ts

import type { DesignTokens } from "@/design-system-v2/constants/types/tokens.type";

export const designTokens: DesignTokens = {
  breakpoints: {
    sm: "350px",
    md: "750px",
    lg: "960px",
    xl: "1200px",
  },
  radius: "0.5rem",
  colors: {
    // Canvas & Body background
    background: {
      light: "#ffffff",
      dark: "#1a1b1c",
    },
    foreground: {
      light: "#363639", // neutral.800
      dark: "#f4f4f6", // neutral.100
    },

    // Card / Panel
    card: {
      light: "#ffffff",
      dark: "#1f1f20", // neutral.950
    },
    cardForeground: {
      light: "#363639",
      dark: "#f4f4f6",
    },

    // Popover / Menu / Dialog
    popover: {
      light: "#ffffff",
      dark: "#1f1f20",
    },
    popoverForeground: {
      light: "#363639",
      dark: "#f4f4f6",
    },

    // Primary
    primary: {
      light: "#1860a9", // blue
      dark: "#4b8fd6",
    },
    primaryForeground: {
      light: "#ffffff",
      dark: "#ffffff",
    },

    // Secondary / Subtle
    secondary: {
      light: "#f4f4f6", // neutral.100
      dark: "#2b2b2e", // neutral.900
    },
    secondaryForeground: {
      light: "#363639",
      dark: "#f4f4f6",
    },

    // Muted
    muted: {
      light: "#f8f8fa", // neutral.50
      dark: "#2b2b2e", // neutral.900
    },
    mutedForeground: {
      light: "#7e7e84", // neutral.500
      dark: "#9b9ba1", // neutral.400
    },

    // Accent
    accent: {
      light: "#f4f4f6",
      dark: "#2b2b2e",
    },
    accentForeground: {
      light: "#1860a9",
      dark: "#f4f4f6",
    },

    // Destructive / Error
    destructive: {
      light: "#ef4444", // red
      dark: "#f87171",
    },
    destructiveForeground: {
      light: "#ffffff",
      dark: "#ffffff",
    },

    // Border & Input
    border: {
      light: "#e4e4e8", // neutral.200
      dark: "#404044", // neutral.700
    },
    input: {
      light: "#e4e4e8",
      dark: "#404044",
    },

    // Focus Ring
    ring: {
      light: "#1860a9",
      dark: "#4b8fd6",
    },
  },
};

