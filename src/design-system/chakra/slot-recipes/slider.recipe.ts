// src/design-system/chakra/slot-recipes/slider.recipe.ts

import { sliderAnatomy } from "@chakra-ui/react/anatomy";
import { defineSlotRecipe } from "@chakra-ui/react";

export const sliderRecipe = defineSlotRecipe({
  slots: sliderAnatomy.keys(),

  base: {
    track: {
      transitionProperty: "height, width",
      transitionDuration: "fast",
      transitionTimingFunction: "ease-out",
      "[data-part=control]:has([data-part=thumb]:is(:active, [data-dragging], [data-focus-visible], [data-focus])) &":
        {
          height: "calc(var(--slider-track-size) + 4px)",
        },
      "&[data-dragging], &[data-focus]": {
        height: "calc(var(--slider-track-size) + 4px)",
      },
    },
    thumb: {
      transitionProperty: "box-shadow, transform",
      transitionDuration: "fast",
      transitionTimingFunction: "ease-out",
      "&:is(:active, [data-dragging], [data-focus-visible])": {
        transform: "scale(1.15)",
      },
    },
  },

  variants: {
    orientation: {
      vertical: {
        track: {
          "[data-part=control]:has([data-part=thumb]:is(:active, [data-dragging], [data-focus-visible], [data-focus])) &":
            {
              width: "calc(var(--slider-track-size) + 4px)",
              height: "100%",
            },
          "&[data-dragging], &[data-focus]": {
            width: "calc(var(--slider-track-size) + 4px)",
            height: "100%",
          },
        },
      },
    },
  },
});

