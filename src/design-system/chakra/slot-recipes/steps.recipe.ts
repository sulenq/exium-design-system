// src/design-system/chakra/slot-recipes/steps.recipe.ts

import { stepsAnatomy } from "@chakra-ui/react/anatomy";
import { defineSlotRecipe } from "@chakra-ui/react";

export const stepsRecipe = defineSlotRecipe({
  slots: stepsAnatomy.keys(),

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
        },
      },
    },
  },
});
