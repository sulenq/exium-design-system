// src/design-system/chakra/recipes/button.recipe.ts

import { defineRecipe } from "@chakra-ui/react";

// Minimum touch target on touch devices (WCAG 2.5.8 and field use with gloves).
// The visual size stays as designed; an invisible ::after expands the hit area
// to at least 48 x 48 px and never shrinks buttons that are already larger.
const TOUCH_TARGET_INSET = "min(0px, calc(50% - 24px))";

export const buttonRecipe = defineRecipe({
  base: {
    "@media (pointer: coarse)": {
      _after: {
        content: '""',
        position: "absolute",
        top: TOUCH_TARGET_INSET,
        bottom: TOUCH_TARGET_INSET,
        left: TOUCH_TARGET_INSET,
        right: TOUCH_TARGET_INSET,
      },
    },
  },
  variants: {
    variant: {
      subtle: {
        bg: "colorPalette.subtle",
        color: "colorPalette.fg",
        _hover: {
          bg: "colorPalette.muted",
        },
        _active: {
          bg: "colorPalette.muted",
        },
      },
      blend: {
        bg: "bg.body",
        _hover: {
          // bg: "bg.subtle",
        },
        _active: {
          // bg: "bg.muted",
        },
      },

      adaptive: {
        bg: "an1",
        _hover: {
          bg: "an2",
        },
        _active: {
          bg: "an3",
        },
      },

      filledIcon: {
        color: "fg.muted",
        _hover: {
          color: "fg",
        },
      },

      frosted: {
        bg: "bg.bodyAlpha",
        backdropFilter: `blur(10px)`,
        _hover: {
          bg: "an1",
        },
        _active: {
          bg: "an2",
        },
      },

      glass: {
        position: "relative",
        isolation: "isolate",
        bg: "bg.bodyAlpha",
        border: "1px solid",
        borderColor: "an0 !important",
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        color: "fg",
        transition:
          "background 150ms ease, box-shadow 150ms ease, transform 100ms ease",

        // Top rim highlight
        boxShadow: {
          base: "inset 0 1px 0 0 rgba(255, 255, 255, 0.95)",
          _dark: "inset 0 1px 0 0 rgba(255, 255, 255, 0.2)",
        },
        // Layer 1 (Top glare): ultra-thin & highly transparent linear sheen
        backgroundImage: {
          base: "linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0) 30%)",
          _dark:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.008) 0%, rgba(255, 255, 255, 0) 30%)",
        },
        // Layer 2 (Bottom glare): dedicated radial glare at the bottom edge
        _after: {
          content: '""',
          position: "absolute",
          inset: "0",
          borderRadius: "inherit",
          pointerEvents: "none",
          background: {
            base: "radial-gradient(ellipse 65% 30% at 50% 100%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0) 75%)",
            _dark:
              "radial-gradient(ellipse 80% 45% at 50% 105%, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0) 70%)",
          },
        },

        _hover: {
          bg: {
            base: "rgba(255, 255, 255, 0.28)",
            _dark: "rgba(255, 255, 255, 0.12)",
          },
          boxShadow: {
            base: "inset 0 1px 0 0 #ffffff, 0 2px 8px rgba(0, 0, 0, 0.08)",
            _dark:
              "inset 0 1px 0 0 rgba(255, 255, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.28)",
          },
        },
        _active: {
          bg: {
            base: "rgba(255, 255, 255, 0.42)",
            _dark: "rgba(255, 255, 255, 0.18)",
          },
          transform: "scale(0.98)",
        },
      },

      glassGhost: {
        bg: "transparent",
        color: "fg",
        _hover: {
          bg: {
            base: "rgba(255, 255, 255, 0.35)",
            _dark: "rgba(255, 255, 255, 0.1)",
          },
        },
        _active: {
          bg: {
            base: "rgba(255, 255, 255, 0.55)",
            _dark: "rgba(255, 255, 255, 0.16)",
          },
        },
      },

      whiteAlphaGhost: {
        _hover: {
          bg: "whiteAlpha.100",
        },
        _active: {
          bg: "whiteAlpha.200",
        },
      },
    },
  },
});
