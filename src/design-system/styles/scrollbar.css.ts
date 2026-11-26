// src/design-system/styles/scrollbar.css.ts

export const minimalScrollbarCss = {
  scrollbarWidth: "thin",
  scrollbarColor: "var(--chakra-colors-border-emphasized) transparent",
  "&::-webkit-scrollbar": {
    width: "5px",
    height: "5px",
  },
  "&::-webkit-scrollbar-track": {
    bg: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    bg: "border.emphasized",
    rounded: "full",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    bg: "fg.subtle",
  },
} as const;
