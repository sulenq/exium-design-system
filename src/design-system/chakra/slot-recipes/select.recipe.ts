// src/design-system/chakra/slot-recipes/select.recipe.ts

import { defineSlotRecipe } from "@chakra-ui/react";
import { selectAnatomy } from "@chakra-ui/react/anatomy";

export const selectRecipe = defineSlotRecipe({
  slots: selectAnatomy.keys(),

  base: {
    trigger: {
      fontSize: "md",
    },
    valueText: {
      fontSize: "md",
    },
    content: {
      fontSize: "md",
    },
    item: {
      fontSize: "md",
    },
  },

  variants: {
    variant: {
      outline: {
        trigger: {
          borderColor: "neutral.muted",
        },
      },
    },
    size: {
      md: {
        trigger: {
          fontSize: "md",
        },
        valueText: {
          fontSize: "md",
        },
        content: {
          fontSize: "md",
        },
        item: {
          fontSize: "md",
        },
      },
    },
  },
});
