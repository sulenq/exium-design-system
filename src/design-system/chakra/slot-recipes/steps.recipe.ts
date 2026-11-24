// src/design-system/chakra/slot-recipes/steps.recipe.ts

import { stepsAnatomy } from "@chakra-ui/react/anatomy";
import { defineSlotRecipe } from "@chakra-ui/react";

export const stepsRecipe = defineSlotRecipe({
  slots: stepsAnatomy.keys(),

  base: {},

  variants: {
    orientation: {
      horizontal: {
        list: {
          alignItems: "flex-start",
        },
        item: {
          alignItems: "flex-start",
        },
        trigger: {
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 1.5,
        },
        separator: {
          marginTop: "calc(var(--steps-size) / 2)",
          minW: "4",
        },
      },
      vertical: {
        list: {
          alignItems: "stretch",
          "--steps-gutter": "spacing.1",
        },
        item: {
          minH: "16",
          alignItems: "flex-start",
        },
        separator: {
          position: "absolute",
          width: "var(--steps-thickness)",
          height: "auto",
          maxHeight: "none",
          minH: "4px",
          top: "calc(var(--steps-size) + var(--steps-gutter))",
          bottom: "var(--steps-gutter)",
          insetStart: "calc(var(--steps-size) / 2 - var(--steps-thickness) / 2)",
        },
      },
    },
  },
});



