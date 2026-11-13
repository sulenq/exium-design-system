// src/design-system/chakra/chakra-system.ts

import { buttonRecipe } from "@/design-system/chakra/recipes/button.recipe";
import { inputRecipe } from "@/design-system/chakra/recipes/input.recipe";
import { carouselRecipe } from "@/design-system/chakra/slot-recipes/carousel.recipe";
import { checkboxRecipe } from "@/design-system/chakra/slot-recipes/checkbox.recipe";
import { dialogRecipe } from "@/design-system/chakra/slot-recipes/dialog.recipe";
import { drawerRecipe } from "@/design-system/chakra/slot-recipes/drawer.recipe";
import { selectRecipe } from "@/design-system/chakra/slot-recipes/select.recipe";
import {
  DIALOG_OFFSET_X_VAR,
  DIALOG_OFFSET_Y_VAR,
} from "@/design-system/components/overlay/stores/dialog-animation-store";
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

export const chakraConfig = defineConfig({
  // conditions: {
  //   hover: "&:is(:hover, [data-hover]):not(:disabled, [data-disabled])",
  // },

  globalCss: {
    "html, body": {
      bg: "bg.body",
      fontWeight: "normal",
    },
    "div, p, button, input, span, section, article, li, ul, ol, a, label, strong, em":
      {
        fontSize: "md",
        fontWeight: "normal",
      },
  },

  // Theme config ---------------------------------------------------

  theme: {
    breakpoints: {
      sm: "350px",
      md: "750px",
      lg: "960px",
      xl: "1200px",
    },

    keyframes: {
      "scale-up": {
        "0%": {
          transform: "scale(0.25)",
          opacity: 0,
        },
        "100%": {
          transform: "scale(1)",
          opacity: 1,
        },
      },

      "scale-up-from-click-origin": {
        "0%": {
          transform: `translate(var(${DIALOG_OFFSET_X_VAR}), var(${DIALOG_OFFSET_Y_VAR})) scale(0)`,
          opacity: 0,
        },
        "100%": {
          transform: "translate(0, 0) scale(1)",
          opacity: 1,
        },
      },

      "scale-up-overshoot": {
        "0%": {
          transform: "scale(0.85)",
          opacity: 0,
        },
        "50%": {
          transform: "scale(1.015)",
          opacity: 1,
        },
        "100%": {
          transform: "scale(1)",
        },
      },

      "scale-up-overshoot-from-click-origin": {
        "0%": {
          transform: `translate(var(${DIALOG_OFFSET_X_VAR}), var(${DIALOG_OFFSET_Y_VAR})) scale(0)`,
          opacity: 0,
        },
        "50%": {
          transform: "translate(0, 0) scale(1.015)",
        },
        "100%": {
          transform: "translate(0, 0) scale(1)",
          opacity: 1,
        },
      },

      "scale-down": {
        "0%": {
          transform: "scale(1)",
          opacity: 1,
        },
        "100%": {
          transform: "scale(0.85)",
          opacity: 0,
        },
      },

      "scale-down-to-click-origin": {
        "0%": {
          transform: "translate(0, 0) scale(1)",
          opacity: 1,
        },
        "100%": {
          transform: `translate(var(${DIALOG_OFFSET_X_VAR}), var(${DIALOG_OFFSET_Y_VAR})) scale(0)`,
          opacity: 0,
        },
      },

      "shrink-x": {
        "0%": {
          transform: "scaleX(1)",
        },
        "100%": {
          transform: `scaleX(0)`,
        },
      },

      ping: {
        "75%, 100%": {
          transform: "scale(2)",
          opacity: 0,
        },
      },
    },

    tokens: {
      colors: {
        canvasLight: { value: "#f5f6f8" },
        canvasDark: { value: "#161717" },

        canvasLightAlpha: { value: "#f9fafcd9" },
        canvasDarkAlpha: { value: "#161717d9" },

        bodyLight: { value: "#ffffff" },
        bodyDark: { value: "#171717" },

        bodyLightAlpha: { value: "#ffffffbf" },
        bodyDarkAlpha: { value: "#1a1b1cbf" },

        an0: { value: "#6b72800f" },
        an1: { value: "#6b72801f" },
        an2: { value: "#6b72802f" },
        an3: { value: "#6b72803f" },
        an4: { value: "#6b72804f" },
        placeholder: { value: "#9ca3af91" },

        neutral: {
          50: { value: "hsl(0, 0%, 97%)" },
          100: { value: "hsl(0, 0%, 95%)" },
          200: { value: "hsl(0, 0%, 86%)" },
          300: { value: "hsl(0, 0%, 76%)" },
          400: { value: "hsl(0, 0%, 64%)" },
          500: { value: "hsl(0, 0%, 50%)" },
          600: { value: "hsl(0, 0%, 39%)" },
          700: { value: "hsl(0, 0%, 28%)" },
          800: { value: "hsl(0, 0%, 18%)" },
          900: { value: "hsl(0, 0%, 15%)" },
          950: { value: "hsl(0, 0%, 11%)" },
        },

        grey: {
          50: { value: "hsl(215, 10%, 97%)" },
          100: { value: "hsl(215, 11%, 93%)" },
          200: { value: "hsl(215, 11%, 86%)" },
          300: { value: "hsl(215, 11%, 76%)" },
          400: { value: "hsl(215, 12%, 64%)" },
          500: { value: "hsl(215, 12%, 50%)" },
          600: { value: "hsl(215, 12%, 42%)" },
          700: { value: "hsl(215, 11%, 33%)" },
          800: { value: "hsl(215, 9%, 23%)" },
          900: { value: "hsl(215, 7%, 15%)" },
          950: { value: "hsl(215, 5%, 9%)" },
        },

        darkAlpha: {
          50: { value: "rgba(18, 18, 18, 0.04)" },
          100: { value: "rgba(18, 18, 18, 0.06)" },
          200: { value: "rgba(18, 18, 18, 0.08)" },
          300: { value: "rgba(18, 18, 18, 0.16)" },
          400: { value: "rgba(18, 18, 18, 0.24)" },
          500: { value: "rgba(18, 18, 18, 0.36)" },
          600: { value: "rgba(18, 18, 18, 0.48)" },
          700: { value: "rgba(18, 18, 18, 0.64)" },
          800: { value: "rgba(18, 18, 18, 0.80)" },
          900: { value: "rgba(18, 18, 18, 0.92)" },
          950: { value: "rgba(18, 18, 18, 0.96)" },
        },

        cream: {
          50: { value: "hsl(38, 41%, 97%)" },
          100: { value: "hsl(38, 42%, 93%)" },
          200: { value: "hsl(38, 44%, 86%)" },
          300: { value: "hsl(38, 46%, 76%)" },
          400: { value: "hsl(38, 47%, 64%)" },
          500: { value: "hsl(38, 48%, 50%)" },
          600: { value: "hsl(38, 47%, 42%)" },
          700: { value: "hsl(38, 44%, 33%)" },
          800: { value: "hsl(38, 36%, 23%)" },
          900: { value: "hsl(38, 26%, 15%)" },
          950: { value: "hsl(38, 19%, 9%)" },
        },

        caramel: {
          50: { value: "hsl(32, 58%, 97%)" },
          100: { value: "hsl(32, 60%, 93%)" },
          200: { value: "hsl(32, 63%, 86%)" },
          300: { value: "hsl(32, 65%, 76%)" },
          400: { value: "hsl(32, 67%, 64%)" },
          500: { value: "hsl(32, 68%, 50%)" },
          600: { value: "hsl(32, 67%, 42%)" },
          700: { value: "hsl(32, 63%, 33%)" },
          800: { value: "hsl(32, 51%, 23%)" },
          900: { value: "hsl(32, 37%, 15%)" },
          950: { value: "hsl(32, 27%, 9%)" },
        },

        mocha: {
          50: { value: "hsla(24, 51%, 68%, 1.00)" },
          100: { value: "hsl(22, 37%, 93%)" },
          200: { value: "hsl(22, 39%, 86%)" },
          300: { value: "hsl(22, 40%, 76%)" },
          400: { value: "hsl(22, 41%, 64%)" },
          500: { value: "hsl(22, 42%, 50%)" },
          600: { value: "hsl(22, 41%, 42%)" },
          700: { value: "hsl(22, 39%, 33%)" },
          800: { value: "hsl(22, 32%, 23%)" },
          900: { value: "hsl(22, 23%, 15%)" },
          950: { value: "hsl(22, 17%, 9%)" },
        },

        brown: {
          50: { value: "hsl(16, 27%, 97%)" },
          100: { value: "hsl(16, 28%, 93%)" },
          200: { value: "hsl(16, 29%, 86%)" },
          300: { value: "hsl(16, 30%, 76%)" },
          400: { value: "hsl(16, 31%, 64%)" },
          500: { value: "hsl(16, 32%, 50%)" },
          600: { value: "hsl(16, 31%, 42%)" },
          700: { value: "hsl(16, 29%, 33%)" },
          800: { value: "hsl(16, 24%, 23%)" },
          900: { value: "hsl(16, 18%, 15%)" },
          950: { value: "hsl(16, 13%, 9%)" },
        },

        maroon: {
          50: { value: "hsl(350, 55%, 97%)" },
          100: { value: "hsl(350, 57%, 93%)" },
          200: { value: "hsl(350, 60%, 86%)" },
          300: { value: "hsl(350, 62%, 76%)" },
          400: { value: "hsl(350, 64%, 64%)" },
          500: { value: "hsl(350, 65%, 50%)" },
          600: { value: "hsl(350, 64%, 42%)" },
          700: { value: "hsl(350, 60%, 33%)" },
          800: { value: "hsl(350, 49%, 23%)" },
          900: { value: "hsl(350, 36%, 15%)" },
          950: { value: "hsl(350, 26%, 9%)" },
        },

        red: {
          50: { value: "hsl(0, 71%, 97%)" },
          100: { value: "hsl(0, 74%, 93%)" },
          200: { value: "hsl(0, 77%, 86%)" },
          300: { value: "hsl(0, 80%, 76%)" },
          400: { value: "hsl(0, 82%, 64%)" },
          500: { value: "hsl(0, 84%, 50%)" },
          600: { value: "hsl(0, 82%, 42%)" },
          700: { value: "hsl(0, 77%, 33%)" },
          800: { value: "hsl(0, 63%, 23%)" },
          900: { value: "hsl(0, 46%, 15%)" },
          950: { value: "hsl(0, 34%, 9%)" },
        },

        salmon: {
          50: { value: "hsl(10, 73%, 97%)" },
          100: { value: "hsl(10, 76%, 93%)" },
          200: { value: "hsl(10, 79%, 86%)" },
          300: { value: "hsl(10, 82%, 76%)" },
          400: { value: "hsl(10, 84%, 64%)" },
          500: { value: "hsl(10, 86%, 50%)" },
          600: { value: "hsl(10, 84%, 42%)" },
          700: { value: "hsl(10, 79%, 33%)" },
          800: { value: "hsl(10, 64%, 23%)" },
          900: { value: "hsl(10, 47%, 15%)" },
          950: { value: "hsl(10, 34%, 9%)" },
        },

        pastelOrange: {
          50: { value: "hsl(18, 76%, 97%)" },
          100: { value: "hsl(18, 79%, 93%)" },
          200: { value: "hsl(18, 83%, 86%)" },
          300: { value: "hsl(18, 86%, 76%)" },
          400: { value: "hsl(18, 88%, 64%)" },
          500: { value: "hsl(18, 90%, 50%)" },
          600: { value: "hsl(18, 88%, 42%)" },
          700: { value: "hsl(18, 83%, 33%)" },
          800: { value: "hsl(18, 68%, 23%)" },
          900: { value: "hsl(18, 50%, 15%)" },
          950: { value: "hsl(18, 36%, 9%)" },
        },

        orange: {
          50: { value: "hsl(30, 81%, 97%)" },
          100: { value: "hsl(30, 84%, 93%)" },
          200: { value: "hsl(30, 87%, 86%)" },
          300: { value: "hsl(30, 90%, 76%)" },
          400: { value: "hsl(30, 93%, 64%)" },
          500: { value: "hsl(30, 95%, 50%)" },
          600: { value: "hsl(30, 93%, 42%)" },
          700: { value: "hsl(30, 87%, 33%)" },
          800: { value: "hsl(30, 71%, 23%)" },
          900: { value: "hsl(30, 52%, 15%)" },
          950: { value: "hsl(30, 38%, 9%)" },
        },

        gold: {
          50: { value: "hsl(42, 76%, 97%)" },
          100: { value: "hsl(42, 79%, 93%)" },
          200: { value: "hsl(42, 83%, 86%)" },
          300: { value: "hsl(42, 86%, 76%)" },
          400: { value: "hsl(42, 88%, 64%)" },
          500: { value: "hsl(42, 90%, 50%)" },
          600: { value: "hsl(42, 88%, 42%)" },
          700: { value: "hsl(42, 83%, 33%)" },
          800: { value: "hsl(42, 68%, 23%)" },
          900: { value: "hsl(42, 50%, 15%)" },
          950: { value: "hsl(42, 36%, 9%)" },
        },

        yellow: {
          50: { value: "hsl(48, 82%, 97%)" },
          100: { value: "hsl(48, 84%, 93%)" },
          200: { value: "hsl(48, 88%, 86%)" },
          300: { value: "hsl(48, 91%, 76%)" },
          400: { value: "hsl(48, 94%, 64%)" },
          500: { value: "hsl(48, 96%, 50%)" },
          600: { value: "hsl(48, 94%, 42%)" },
          700: { value: "hsl(48, 88%, 33%)" },
          800: { value: "hsl(48, 72%, 23%)" },
          900: { value: "hsl(48, 53%, 15%)" },
          950: { value: "hsl(48, 38%, 9%)" },
        },

        lime: {
          50: { value: "hsl(68, 61%, 97%)" },
          100: { value: "hsl(68, 63%, 93%)" },
          200: { value: "hsl(68, 66%, 86%)" },
          300: { value: "hsl(68, 68%, 76%)" },
          400: { value: "hsl(68, 71%, 64%)" },
          500: { value: "hsl(68, 72%, 50%)" },
          600: { value: "hsl(68, 71%, 42%)" },
          700: { value: "hsl(68, 66%, 33%)" },
          800: { value: "hsl(68, 54%, 23%)" },
          900: { value: "hsl(68, 40%, 15%)" },
          950: { value: "hsl(68, 29%, 9%)" },
        },

        olive: {
          50: { value: "hsl(80, 44%, 97%)" },
          100: { value: "hsl(80, 46%, 93%)" },
          200: { value: "hsl(80, 48%, 86%)" },
          300: { value: "hsl(80, 49%, 76%)" },
          400: { value: "hsl(80, 51%, 64%)" },
          500: { value: "hsl(80, 52%, 50%)" },
          600: { value: "hsl(80, 51%, 42%)" },
          700: { value: "hsl(80, 48%, 33%)" },
          800: { value: "hsl(80, 39%, 23%)" },
          900: { value: "hsl(80, 29%, 15%)" },
          950: { value: "hsl(80, 21%, 9%)" },
        },

        green: {
          50: { value: "hsl(142, 60%, 97%)" },
          100: { value: "hsl(142, 62%, 93%)" },
          200: { value: "hsl(142, 64%, 86%)" },
          300: { value: "hsl(142, 66%, 76%)" },
          400: { value: "hsl(142, 69%, 64%)" },
          500: { value: "hsl(142, 70%, 50%)" },
          600: { value: "hsl(142, 69%, 42%)" },
          700: { value: "hsl(142, 64%, 33%)" },
          800: { value: "hsl(142, 52%, 23%)" },
          900: { value: "hsl(142, 38%, 15%)" },
          950: { value: "hsl(142, 28%, 9%)" },
        },

        jade: {
          50: { value: "hsl(162, 65%, 97%)" },
          100: { value: "hsl(162, 67%, 93%)" },
          200: { value: "hsl(162, 70%, 86%)" },
          300: { value: "hsl(162, 72%, 76%)" },
          400: { value: "hsl(162, 74%, 64%)" },
          500: { value: "hsl(162, 76%, 50%)" },
          600: { value: "hsl(162, 74%, 42%)" },
          700: { value: "hsl(162, 70%, 33%)" },
          800: { value: "hsl(162, 57%, 23%)" },
          900: { value: "hsl(162, 42%, 15%)" },
          950: { value: "hsl(162, 30%, 9%)" },
        },

        teal: {
          50: { value: "hsl(174, 68%, 97%)" },
          100: { value: "hsl(174, 70%, 93%)" },
          200: { value: "hsl(174, 74%, 86%)" },
          300: { value: "hsl(174, 76%, 76%)" },
          400: { value: "hsl(174, 78%, 64%)" },
          500: { value: "hsl(174, 80%, 50%)" },
          600: { value: "hsl(174, 78%, 42%)" },
          700: { value: "hsl(174, 74%, 33%)" },
          800: { value: "hsl(174, 60%, 23%)" },
          900: { value: "hsl(174, 44%, 15%)" },
          950: { value: "hsl(174, 32%, 9%)" },
        },

        tealBlue: {
          50: { value: "hsl(182, 65%, 97%)" },
          100: { value: "hsl(182, 67%, 93%)" },
          200: { value: "hsl(182, 70%, 86%)" },
          300: { value: "hsl(182, 72%, 76%)" },
          400: { value: "hsl(182, 74%, 64%)" },
          500: { value: "hsl(182, 76%, 50%)" },
          600: { value: "hsl(182, 74%, 42%)" },
          700: { value: "hsl(182, 70%, 33%)" },
          800: { value: "hsl(182, 57%, 23%)" },
          900: { value: "hsl(182, 42%, 15%)" },
          950: { value: "hsl(182, 30%, 9%)" },
        },

        cyan: {
          50: { value: "hsl(190, 76%, 97%)" },
          100: { value: "hsl(190, 79%, 93%)" },
          200: { value: "hsl(190, 83%, 86%)" },
          300: { value: "hsl(190, 86%, 76%)" },
          400: { value: "hsl(190, 88%, 64%)" },
          500: { value: "hsl(190, 90%, 50%)" },
          600: { value: "hsl(190, 88%, 42%)" },
          700: { value: "hsl(190, 83%, 33%)" },
          800: { value: "hsl(190, 68%, 23%)" },
          900: { value: "hsl(190, 50%, 15%)" },
          950: { value: "hsl(190, 36%, 9%)" },
        },

        sky: {
          50: { value: "hsl(200, 76%, 97%)" },
          100: { value: "hsl(200, 79%, 93%)" },
          200: { value: "hsl(200, 83%, 86%)" },
          300: { value: "hsl(200, 86%, 76%)" },
          400: { value: "hsl(200, 88%, 64%)" },
          500: { value: "hsl(200, 90%, 50%)" },
          600: { value: "hsl(200, 88%, 42%)" },
          700: { value: "hsl(200, 83%, 33%)" },
          800: { value: "hsl(200, 68%, 23%)" },
          900: { value: "hsl(200, 50%, 15%)" },
          950: { value: "hsl(200, 36%, 9%)" },
        },

        powderBlue: {
          50: { value: "hsl(210, 41%, 97%)" },
          100: { value: "hsl(210, 42%, 93%)" },
          200: { value: "hsl(210, 44%, 86%)" },
          300: { value: "hsl(210, 46%, 76%)" },
          400: { value: "hsl(210, 47%, 64%)" },
          500: { value: "hsl(210, 48%, 50%)" },
          600: { value: "hsl(210, 47%, 42%)" },
          700: { value: "hsl(210, 44%, 33%)" },
          800: { value: "hsl(210, 36%, 23%)" },
          900: { value: "hsl(210, 26%, 15%)" },
          950: { value: "hsl(210, 19%, 9%)" },
        },

        blue: {
          50: { value: "hsl(214, 71%, 97%)" },
          100: { value: "hsl(214, 74%, 93%)" },
          200: { value: "hsl(214, 77%, 86%)" },
          300: { value: "hsl(214, 80%, 76%)" },
          400: { value: "hsl(214, 82%, 64%)" },
          500: { value: "hsl(214, 84%, 50%)" },
          600: { value: "hsl(214, 82%, 42%)" },
          700: { value: "hsl(214, 77%, 33%)" },
          800: { value: "hsl(214, 63%, 23%)" },
          900: { value: "hsl(214, 46%, 15%)" },
          950: { value: "hsl(214, 34%, 9%)" },
        },

        sapphire: {
          50: { value: "hsl(228, 66%, 97%)" },
          100: { value: "hsl(228, 69%, 93%)" },
          200: { value: "hsl(228, 72%, 86%)" },
          300: { value: "hsl(228, 74%, 76%)" },
          400: { value: "hsl(228, 76%, 64%)" },
          500: { value: "hsl(228, 78%, 50%)" },
          600: { value: "hsl(228, 76%, 42%)" },
          700: { value: "hsl(228, 72%, 33%)" },
          800: { value: "hsl(228, 58%, 23%)" },
          900: { value: "hsl(228, 43%, 15%)" },
          950: { value: "hsl(228, 31%, 9%)" },
        },

        indigo: {
          50: { value: "hsl(234, 47%, 97%)" },
          100: { value: "hsl(234, 48%, 93%)" },
          200: { value: "hsl(234, 51%, 86%)" },
          300: { value: "hsl(234, 52%, 76%)" },
          400: { value: "hsl(234, 54%, 64%)" },
          500: { value: "hsl(234, 55%, 50%)" },
          600: { value: "hsl(234, 54%, 42%)" },
          700: { value: "hsl(234, 51%, 33%)" },
          800: { value: "hsl(234, 41%, 23%)" },
          900: { value: "hsl(234, 30%, 15%)" },
          950: { value: "hsl(234, 22%, 9%)" },
        },

        discord: {
          50: { value: "hsl(235, 73%, 97%)" },
          100: { value: "hsl(235, 76%, 93%)" },
          200: { value: "hsl(235, 79%, 86%)" },
          300: { value: "hsl(235, 82%, 76%)" },
          400: { value: "hsl(235, 84%, 64%)" },
          500: { value: "hsl(235, 86%, 50%)" },
          600: { value: "hsl(235, 84%, 42%)" },
          700: { value: "hsl(235, 79%, 33%)" },
          800: { value: "hsl(235, 64%, 23%)" },
          900: { value: "hsl(235, 47%, 15%)" },
          950: { value: "hsl(235, 34%, 9%)" },
        },

        powderLavender: {
          50: { value: "hsl(245, 44%, 97%)" },
          100: { value: "hsl(245, 46%, 93%)" },
          200: { value: "hsl(245, 48%, 86%)" },
          300: { value: "hsl(245, 49%, 76%)" },
          400: { value: "hsl(245, 51%, 64%)" },
          500: { value: "hsl(245, 52%, 50%)" },
          600: { value: "hsl(245, 51%, 42%)" },
          700: { value: "hsl(245, 48%, 33%)" },
          800: { value: "hsl(245, 39%, 23%)" },
          900: { value: "hsl(245, 29%, 15%)" },
          950: { value: "hsl(245, 21%, 9%)" },
        },

        lavender: {
          50: { value: "hsl(258, 75%, 97%)" },
          100: { value: "hsl(258, 77%, 93%)" },
          200: { value: "hsl(258, 81%, 86%)" },
          300: { value: "hsl(258, 84%, 76%)" },
          400: { value: "hsl(258, 86%, 64%)" },
          500: { value: "hsl(258, 88%, 50%)" },
          600: { value: "hsl(258, 86%, 42%)" },
          700: { value: "hsl(258, 81%, 33%)" },
          800: { value: "hsl(258, 66%, 23%)" },
          900: { value: "hsl(258, 48%, 15%)" },
          950: { value: "hsl(258, 35%, 9%)" },
        },

        purple: {
          50: { value: "hsl(280, 64%, 97%)" },
          100: { value: "hsl(280, 66%, 93%)" },
          200: { value: "hsl(280, 69%, 86%)" },
          300: { value: "hsl(280, 71%, 76%)" },
          400: { value: "hsl(280, 74%, 64%)" },
          500: { value: "hsl(280, 75%, 50%)" },
          600: { value: "hsl(280, 74%, 42%)" },
          700: { value: "hsl(280, 69%, 33%)" },
          800: { value: "hsl(280, 56%, 23%)" },
          900: { value: "hsl(280, 41%, 15%)" },
          950: { value: "hsl(280, 30%, 9%)" },
        },

        bubblegumPink: {
          50: { value: "hsl(318, 76%, 97%)" },
          100: { value: "hsl(318, 79%, 93%)" },
          200: { value: "hsl(318, 83%, 86%)" },
          300: { value: "hsl(318, 86%, 76%)" },
          400: { value: "hsl(318, 88%, 64%)" },
          500: { value: "hsl(318, 90%, 50%)" },
          600: { value: "hsl(318, 88%, 42%)" },
          700: { value: "hsl(318, 83%, 33%)" },
          800: { value: "hsl(318, 68%, 23%)" },
          900: { value: "hsl(318, 50%, 15%)" },
          950: { value: "hsl(318, 36%, 9%)" },
        },

        pink: {
          50: { value: "hsl(330, 70%, 97%)" },
          100: { value: "hsl(330, 72%, 93%)" },
          200: { value: "hsl(330, 75%, 86%)" },
          300: { value: "hsl(330, 78%, 76%)" },
          400: { value: "hsl(330, 80%, 64%)" },
          500: { value: "hsl(330, 82%, 50%)" },
          600: { value: "hsl(330, 80%, 42%)" },
          700: { value: "hsl(330, 75%, 33%)" },
          800: { value: "hsl(330, 62%, 23%)" },
          900: { value: "hsl(330, 45%, 15%)" },
          950: { value: "hsl(330, 33%, 9%)" },
        },
      },
      gradients: {},

      sizes: {},
      spacing: {},

      fonts: {
        heading: {
          value: "'Plus Jakarta Sans Variable', sans-serif",
        },
        body: {
          value: "'Plus Jakarta Sans Variable', sans-serif",
        },
        number: {
          value: "'Plus Jakarta Sans Variable', sans-serif",
        },

        jakarta: { value: "'Plus Jakarta Sans Variable', sans-serif" },
        figtree: { value: "'Figtree Variable', sans-serif" },
        ubuntu: { value: "'Ubuntu', sans-serif" },
        outfit: { value: "'Outfit Variable', sans-serif" },
        wix: { value: "'Wix Madefor Text Variable', sans-serif" },
        sortsMillGoudy: { value: "'Sorts Mill Goudy', serif" },
      },
      fontSizes: {
        xs: { value: "0.75rem" }, // 12px
        sm: { value: "0.8125rem" }, // 13px
        md: { value: "0.875rem" }, // 14px
        lg: { value: "1rem" }, // 16px
        xl: { value: "1.125rem" }, // 18px
        "2xl": { value: "1.3125rem" }, // 21px
        "3xl": { value: "1.625rem" }, // 26px
        "4xl": { value: "2rem" }, // 32px
        "5xl": { value: "2.5rem" }, // 40px
        "6xl": { value: "3.125rem" }, // 50px
        "7xl": { value: "3.9375rem" }, // 63px
        "8xl": { value: "5rem" }, // 80px
        "9xl": { value: "6.3125rem" }, // 101px
        // xs: { value: "0.6875rem" }, // 11px
        // sm: { value: "0.8125rem" }, // 13px
        // md: { value: "0.9375rem" }, // 15px
        // lg: { value: "1.0625rem" }, // 17px
        // xl: { value: "1.1875rem" }, // 19px
        // "2xl": { value: "1.4375rem" }, // 23px
        // "3xl": { value: "1.8125rem" }, // 29px
        // "4xl": { value: "2.1875rem" }, // 35px
        // "5xl": { value: "2.9375rem" }, // 47px
        // "6xl": { value: "3.6875rem" }, // 59px
        // "7xl": { value: "4.4375rem" }, // 71px
        // "8xl": { value: "5.9375rem" }, // 95px
        // "9xl": { value: "7.9375rem" }, // 127px
      },
      fontWeights: {
        normal: { value: "450" },
        medium: { value: "500" },
        semibold: { value: "600" },
        bold: { value: "700" },
        extrabold: { value: "800" },
        black: { value: "900" },
      },
      letterSpacings: {},
      lineHeights: {},

      radii: {},

      borders: {},
      borderWidths: {},

      shadows: {},

      easings: {},

      opacity: {},

      zIndex: {},

      assets: {},

      durations: {
        fastest: { value: "40ms" },
        faster: { value: "75ms" },
        fast: { value: "110ms" },
        moderate: { value: "150ms" },
        slow: { value: "225ms" },
        slower: { value: "340ms" },
        slowest: { value: "400ms" },
      },

      // Motion preset
      animations: {
        "scale-up-from-click-origin": {
          value: "scale-up-from-click-origin",
        },
        "scale-up-overshoot-from-click-origin": {
          value: "scale-up-overshoot-from-click-origin",
        },
        "scale-up": {
          value: "scale-up cubic-bezier(0.4, 0, 0.2, 1)",
        },
        "scale-up-overshoot": {
          value: "scale-up-overshoot cubic-bezier(0.4, 0, 0.2, 1)",
        },
        "scale-down-to-click-origin": {
          value: "scale-down-to-click-origin",
        },
        "scale-down": {
          value: "scale-down cubic-bezier(0.4, 0, 0.2, 1)",
        },
        "shrink-x": {
          value: "shrink-x",
        },
      },

      aspectRatios: {},
    },

    semanticTokens: {
      colors: {
        bg: {
          panel: {
            value: {
              base: "{colors.neutral.100} !important",
              _dark: "{colors.bodyDark} !important",
            },
          },
          subtle: {
            value: {
              base: "{colors.neutral.50} !important",
              _dark: "{colors.neutral.950} !important",
            },
          },
          muted: {
            value: {
              base: "{colors.neutral.100} !important",
              _dark: "{colors.neutral.900} !important",
            },
          },
          emphasized: {
            value: {
              base: "{colors.neutral.200} !important",
              _dark: "{colors.neutral.800} !important",
            },
          },
          canvas: {
            value: {
              base: "{colors.canvasLight}",
              _dark: "{colors.canvasDark}",
            },
          },
          canvasAlpha: {
            value: {
              base: "{colors.canvasLightAlpha}",
              _dark: "{colors.canvasDarkAlpha}",
            },
          },
          canvasAlphaInverted: {
            value: {
              base: "{colors.canvasDarkAlpha}",
              _dark: "{colors.canvasLightAlpha}",
            },
          },
          body: {
            value: {
              base: "{colors.bodyLight}",
              _dark: "{colors.bodyDark}",
            },
          },
          inverted: {
            value: {
              base: "{colors.bodyDark}",
              _dark: "{colors.bodyLight}",
            },
          },
          bodyAlpha: {
            value: {
              base: "{colors.bodyLightAlpha}",
              _dark: "{colors.bodyDarkAlpha}",
            },
          },
          bodyAlphaInverted: {
            value: {
              base: "{colors.bodyDarkAlpha}",
              _dark: "{colors.bodyLightAlpha}",
            },
          },
          backdrop: {
            value: {
              base: "{colors.blackAlpha.500}",
              _dark: "{colors.blackAlpha.500}",
            },
          },
        },

        border: {
          DEFAULT: {
            value: {
              base: "{colors.neutral.200} !important",
              _dark: "{colors.neutral.800} !important",
            },
          },
          subtle: {
            value: {
              base: "{colors.an1} !important",
              _dark: "{colors.an1} !important",
            },
          },
          muted: {
            value: {
              base: "{colors.an2} !important",
              _dark: "{colors.an2} !important",
            },
          },
          emphasized: {
            value: {
              base: "{colors.an3} !important",
              _dark: "{colors.an3} !important",
            },
          },
        },

        neutral: {
          contrast: {
            value: {
              base: "{colors.bodyLight}",
              _dark: "{colors.bodyDark}",
            },
          },
          fg: {
            value: {
              base: "{colors.neutral.800}",
              _dark: "{colors.neutral.200}",
            },
          },
          subtle: {
            value: {
              base: "{colors.neutral.100}",
              _dark: "{colors.neutral.900}",
            },
          },
          muted: {
            value: {
              base: "{colors.neutral.200}",
              _dark: "{colors.neutral.800}",
            },
          },
          emphasized: {
            value: {
              base: "{colors.neutral.300}",
              _dark: "{colors.neutral.700}",
            },
          },
          solid: {
            value: {
              base: "{colors.bodyDark}",
              _dark: "{colors.neutral.300}",
            },
          },
          focusRing: {
            value: {
              base: "{colors.neutral.500}",
              _dark: "{colors.neutral.700}",
            },
          },
          border: {
            value: {
              base: "{colors.neutral.200}",
              _dark: "{colors.neutral.800}",
            },
          },
        },

        // slight blue tint gray (light mode only, neutral for dark mode)
        grey: {
          contrast: {
            value: {
              base: "{colors.grey.50}",
              _dark: "{colors.neutral.100}",
            },
          },
          fg: {
            value: {
              base: "{colors.grey.600}",
              _dark: "{colors.neutral.200}",
            },
          },
          subtle: {
            value: {
              base: "{colors.grey.50}",
              _dark: "{colors.neutral.950}",
            },
          },
          muted: {
            value: {
              base: "{colors.grey.100}",
              _dark: "{colors.neutral.900}",
            },
          },
          emphasized: {
            value: {
              base: "{colors.grey.200}",
              _dark: "{colors.neutral.800}",
            },
          },
          solid: {
            value: {
              base: "{colors.grey.500}",
              _dark: "{colors.neutral.700}",
            },
          },
          focusRing: {
            value: {
              base: "{colors.grey.500}",
              _dark: "{colors.neutral.700}",
            },
          },
          border: {
            value: {
              base: "{colors.grey.200}",
              _dark: "{colors.neutral.800}",
            },
          },
        },

        cream: {
          contrast: {
            value: {
              base: "{colors.cream.50}",
              _dark: "{colors.cream.100}",
            },
          },
          fg: {
            value: {
              base: "{colors.cream.600}",
              _dark: "{colors.cream.200}",
            },
          },
          subtle: {
            value: {
              base: "{colors.cream.50}",
              _dark: "{colors.cream.950}",
            },
          },
          muted: {
            value: {
              base: "{colors.cream.100}",
              _dark: "{colors.cream.900}",
            },
          },
          emphasized: {
            value: {
              base: "{colors.cream.200}",
              _dark: "{colors.cream.800}",
            },
          },
          solid: {
            value: {
              base: "{colors.cream.500}",
              _dark: "{colors.cream.700}",
            },
          },
          focusRing: {
            value: {
              base: "{colors.cream.500}",
              _dark: "{colors.cream.700}",
            },
          },
          border: {
            value: {
              base: "{colors.cream.200}",
              _dark: "{colors.cream.800}",
            },
          },
        },

        caramel: {
          contrast: {
            value: {
              base: "{colors.caramel.50}",
              _dark: "{colors.caramel.100}",
            },
          },
          fg: {
            value: {
              base: "{colors.caramel.500}",
              _dark: "{colors.caramel.200}",
            },
          },
          subtle: {
            value: {
              base: "{colors.caramel.50}",
              _dark: "{colors.caramel.950}",
            },
          },
          muted: {
            value: {
              base: "{colors.caramel.100}",
              _dark: "{colors.caramel.900}",
            },
          },
          emphasized: {
            value: {
              base: "{colors.caramel.200}",
              _dark: "{colors.caramel.800}",
            },
          },
          solid: {
            value: {
              base: "{colors.caramel.500}",
              _dark: "{colors.caramel.700}",
            },
          },
          focusRing: {
            value: {
              base: "{colors.caramel.500}",
              _dark: "{colors.caramel.700}",
            },
          },
          border: {
            value: {
              base: "{colors.caramel.200}",
              _dark: "{colors.caramel.800}",
            },
          },
        },

        mocha: {
          contrast: {
            value: { base: "{colors.mocha.50}", _dark: "{colors.mocha.100}" },
          },
          fg: {
            value: {
              base: "{colors.mocha.500}",
              _dark: "{colors.mocha.200}",
            },
          },
          subtle: {
            value: {
              base: "{colors.mocha.50}",
              _dark: "{colors.mocha.950}",
            },
          },
          muted: {
            value: {
              base: "{colors.mocha.100}",
              _dark: "{colors.mocha.900}",
            },
          },
          emphasized: {
            value: {
              base: "{colors.mocha.200}",
              _dark: "{colors.mocha.800}",
            },
          },
          solid: {
            value: {
              base: "{colors.mocha.500}",
              _dark: "{colors.mocha.700}",
            },
          },
          focusRing: {
            value: {
              base: "{colors.mocha.500}",
              _dark: "{colors.mocha.700}",
            },
          },
          border: {
            value: {
              base: "{colors.mocha.200}",
              _dark: "{colors.mocha.800}",
            },
          },
        },

        brown: {
          contrast: {
            value: { base: "{colors.brown.50}", _dark: "{colors.brown.100}" },
          },
          fg: {
            value: {
              base: "{colors.brown.500}",
              _dark: "{colors.brown.200}",
            },
          },
          subtle: {
            value: {
              base: "{colors.brown.50}",
              _dark: "{colors.brown.950}",
            },
          },
          muted: {
            value: {
              base: "{colors.brown.100}",
              _dark: "{colors.brown.900}",
            },
          },
          emphasized: {
            value: {
              base: "{colors.brown.200}",
              _dark: "{colors.brown.800}",
            },
          },
          solid: {
            value: {
              base: "{colors.brown.500}",
              _dark: "{colors.brown.700}",
            },
          },
          focusRing: {
            value: {
              base: "{colors.brown.500}",
              _dark: "{colors.brown.700}",
            },
          },
          border: {
            value: {
              base: "{colors.brown.200}",
              _dark: "{colors.brown.800}",
            },
          },
        },

        maroon: {
          contrast: {
            value: {
              base: "{colors.maroon.50}",
              _dark: "{colors.maroon.100}",
            },
          },
          fg: {
            value: {
              base: "{colors.maroon.500}",
              _dark: "{colors.maroon.200}",
            },
          },
          subtle: {
            value: {
              base: "{colors.maroon.50}",
              _dark: "{colors.maroon.950}",
            },
          },
          muted: {
            value: {
              base: "{colors.maroon.100}",
              _dark: "{colors.maroon.900}",
            },
          },
          emphasized: {
            value: {
              base: "{colors.maroon.200}",
              _dark: "{colors.maroon.800}",
            },
          },
          solid: {
            value: {
              base: "{colors.maroon.500}",
              _dark: "{colors.maroon.500}",
            },
          },
          focusRing: {
            value: {
              base: "{colors.maroon.500}",
              _dark: "{colors.maroon.700}",
            },
          },
          border: {
            value: {
              base: "{colors.maroon.200}",
              _dark: "{colors.maroon.800}",
            },
          },
        },

        red: {
          contrast: {
            value: {
              base: "{colors.red.50}",
              _dark: "{colors.red.100}",
            },
          },
          fg: {
            value: {
              base: "{colors.red.500}",
              _dark: "{colors.red.300}",
            },
          },
          subtle: {
            value: {
              base: "{colors.red.50} !important",
              _dark: "{colors.red.950} !important",
            },
          },
          muted: {
            value: {
              base: "{colors.red.100} !important",
              _dark: "{colors.red.900} !important",
            },
          },
          emphasized: {
            value: {
              base: "{colors.red.200} !important",
              _dark: "{colors.red.800} !important",
            },
          },
          solid: {
            value: {
              base: "{colors.red.500}",
              _dark: "{colors.red.500}",
            },
          },
          focusRing: {
            value: {
              base: "{colors.red.500}",
              _dark: "{colors.red.700}",
            },
          },
          border: {
            value: {
              base: "{colors.red.200} !important",
              _dark: "{colors.red.800} !important",
            },
          },
        },

        salmon: {
          contrast: {
            value: {
              base: "{colors.salmon.50}",
              _dark: "{colors.salmon.100}",
            },
          },
          fg: {
            value: {
              base: "{colors.salmon.500}",
              _dark: "{colors.salmon.200}",
            },
          },
          subtle: {
            value: {
              base: "{colors.salmon.50}",
              _dark: "{colors.salmon.950}",
            },
          },
          muted: {
            value: {
              base: "{colors.salmon.100}",
              _dark: "{colors.salmon.900}",
            },
          },
          emphasized: {
            value: {
              base: "{colors.salmon.200}",
              _dark: "{colors.salmon.800}",
            },
          },
          solid: {
            value: {
              base: "{colors.salmon.500}",
              _dark: "{colors.salmon.700}",
            },
          },
          focusRing: {
            value: {
              base: "{colors.salmon.500}",
              _dark: "{colors.salmon.700}",
            },
          },
          border: {
            value: {
              base: "{colors.salmon.200}",
              _dark: "{colors.salmon.800}",
            },
          },
        },

        pastelOrange: {
          contrast: {
            value: {
              base: "{colors.pastelOrange.50}",
              _dark: "{colors.pastelOrange.100}",
            },
          },
          fg: {
            value: {
              base: "{colors.pastelOrange.600}",
              _dark: "{colors.pastelOrange.400}",
            },
          },
          subtle: {
            value: {
              base: "{colors.pastelOrange.50}",
              _dark: "{colors.pastelOrange.950}",
            },
          },
          muted: {
            value: {
              base: "{colors.pastelOrange.100}",
              _dark: "{colors.pastelOrange.900}",
            },
          },
          emphasized: {
            value: {
              base: "{colors.pastelOrange.200}",
              _dark: "{colors.pastelOrange.800}",
            },
          },
          solid: {
            value: {
              base: "{colors.pastelOrange.500}",
              _dark: "{colors.pastelOrange.700}",
            },
          },
          focusRing: {
            value: {
              base: "{colors.pastelOrange.500}",
              _dark: "{colors.pastelOrange.700}",
            },
          },
          border: {
            value: {
              base: "{colors.pastelOrange.200}",
              _dark: "{colors.pastelOrange.800}",
            },
          },
        },

        orange: {
          contrast: {
            value: {
              base: "{colors.orange.50} !important",
              _dark: "{colors.orange.100} !important",
            },
          },
          fg: {
            value: {
              base: "{colors.orange.500} !important",
              _dark: "{colors.orange.400} !important",
            },
          },
          subtle: {
            value: {
              base: "{colors.orange.50} !important",
              _dark: "{colors.orange.950} !important",
            },
          },
          muted: {
            value: {
              base: "{colors.orange.100} !important",
              _dark: "{colors.orange.900} !important",
            },
          },
          emphasized: {
            value: {
              base: "{colors.orange.200} !important",
              _dark: "{colors.orange.800} !important",
            },
          },
          solid: {
            value: {
              base: "{colors.orange.500} !important",
              _dark: "{colors.orange.700} !important",
            },
          },
          focusRing: {
            value: {
              base: "{colors.orange.500}",
              _dark: "{colors.orange.700}",
            },
          },
          border: {
            value: {
              base: "{colors.orange.200} !important",
              _dark: "{colors.orange.800} !important",
            },
          },
        },

        gold: {
          contrast: {
            value: {
              base: "{colors.gold.900}",
              _dark: "{colors.gold.900}",
            },
          },
          fg: {
            value: {
              base: "{colors.gold.500}",
              _dark: "{colors.gold.500}",
            },
          },
          subtle: {
            value: {
              base: "{colors.gold.50}",
              _dark: "{colors.gold.950}",
            },
          },
          muted: {
            value: {
              base: "{colors.gold.100}",
              _dark: "{colors.gold.900}",
            },
          },
          emphasized: {
            value: {
              base: "{colors.gold.200}",
              _dark: "{colors.gold.800}",
            },
          },
          solid: {
            value: {
              base: "{colors.gold.500}",
              _dark: "{colors.gold.500}",
            },
          },
          focusRing: {
            value: {
              base: "{colors.gold.500}",
              _dark: "{colors.gold.700}",
            },
          },
          border: {
            value: {
              base: "{colors.gold.200} !important",
              _dark: "{colors.gold.800} !important",
            },
          },
        },

        yellow: {
          contrast: {
            value: {
              base: "{colors.yellow.900} !important",
              _dark: "{colors.yellow.950} !important",
            },
          },
          fg: {
            value: {
              base: "{colors.yellow.600} !important",
              _dark: "{colors.yellow.500} !important",
            },
          },
          subtle: {
            value: {
              base: "{colors.yellow.50} !important",
              _dark: "{colors.yellow.950} !important",
            },
          },
          muted: {
            value: {
              base: "{colors.yellow.100} !important",
              _dark: "{colors.yellow.900} !important",
            },
          },
          emphasized: {
            value: {
              base: "{colors.yellow.200} !important",
              _dark: "{colors.yellow.800} !important",
            },
          },
          solid: {
            value: {
              base: "{colors.yellow.500}",
              _dark: "{colors.yellow.500}",
            },
          },
          focusRing: {
            value: {
              base: "{colors.yellow.500}",
              _dark: "{colors.yellow.700}",
            },
          },
          border: {
            value: {
              base: "{colors.yellow.200} !important",
              _dark: "{colors.yellow.800} !important",
            },
          },
        },

        lime: {
          contrast: {
            value: {
              base: "{colors.lime.800}",
              _dark: "{colors.lime.950}",
            },
          },
          fg: {
            value: {
              base: "{colors.lime.700}",
              _dark: "{colors.lime.300}",
            },
          },
          subtle: {
            value: {
              base: "{colors.lime.50}",
              _dark: "{colors.lime.950}",
            },
          },
          muted: {
            value: {
              base: "{colors.lime.100}",
              _dark: "{colors.lime.900}",
            },
          },
          emphasized: {
            value: {
              base: "{colors.lime.200}",
              _dark: "{colors.lime.800}",
            },
          },
          solid: {
            value: {
              base: "{colors.lime.500}",
              _dark: "{colors.lime.600}",
            },
          },
          focusRing: {
            value: {
              base: "{colors.lime.500}",
              _dark: "{colors.lime.700}",
            },
          },
          border: {
            value: {
              base: "{colors.lime.200}",
              _dark: "{colors.lime.800}",
            },
          },
        },

        olive: {
          contrast: {
            value: {
              base: "{colors.olive.50}",
              _dark: "{colors.olive.50}",
            },
          },
          fg: {
            value: {
              base: "{colors.olive.700}",
              _dark: "{colors.olive.300}",
            },
          },
          subtle: {
            value: {
              base: "{colors.olive.50}",
              _dark: "{colors.olive.950}",
            },
          },
          muted: {
            value: {
              base: "{colors.olive.100}",
              _dark: "{colors.olive.900}",
            },
          },
          emphasized: {
            value: {
              base: "{colors.olive.200}",
              _dark: "{colors.olive.800}",
            },
          },
          solid: {
            value: {
              base: "{colors.olive.500}",
              _dark: "{colors.olive.600}",
            },
          },
          focusRing: {
            value: {
              base: "{colors.olive.500}",
              _dark: "{colors.olive.700}",
            },
          },
          border: {
            value: {
              base: "{colors.olive.200}",
              _dark: "{colors.olive.800}",
            },
          },
        },

        green: {
          contrast: {
            value: {
              base: "{colors.green.50} !important",
              _dark: "{colors.green.950} !important",
            },
          },
          fg: {
            value: {
              base: "{colors.green.600} !important",
              _dark: "{colors.green.300} !important",
            },
          },
          subtle: {
            value: {
              base: "{colors.green.50} !important",
              _dark: "{colors.green.950} !important",
            },
          },
          muted: {
            value: {
              base: "{colors.green.100} !important",
              _dark: "{colors.green.900} !important",
            },
          },
          emphasized: {
            value: {
              base: "{colors.green.200} !important",
              _dark: "{colors.green.800} !important",
            },
          },
          solid: {
            value: {
              base: "{colors.green.600} !important",
              _dark: "{colors.green.600} !important",
            },
          },
          focusRing: {
            value: {
              base: "{colors.green.500}",
              _dark: "{colors.green.500}",
            },
          },
          border: {
            value: {
              base: "{colors.green.200} !important",
              _dark: "{colors.green.800} !important",
            },
          },
        },

        jade: {
          contrast: {
            value: {
              base: "{colors.jade.50}",
              _dark: "{colors.jade.950}",
            },
          },
          fg: {
            value: {
              base: "{colors.jade.600}",
              _dark: "{colors.jade.300}",
            },
          },
          subtle: {
            value: {
              base: "{colors.jade.50}",
              _dark: "{colors.jade.950}",
            },
          },
          muted: {
            value: {
              base: "{colors.jade.100}",
              _dark: "{colors.jade.900}",
            },
          },
          emphasized: {
            value: {
              base: "{colors.jade.200}",
              _dark: "{colors.jade.800}",
            },
          },
          solid: {
            value: {
              base: "{colors.jade.500}",
              _dark: "{colors.jade.500}",
            },
          },
          focusRing: {
            value: {
              base: "{colors.jade.500}",
              _dark: "{colors.jade.500}",
            },
          },
          border: {
            value: {
              base: "{colors.jade.200}",
              _dark: "{colors.jade.800}",
            },
          },
        },

        teal: {
          contrast: {
            value: {
              base: "{colors.teal.50} !important",
              _dark: "{colors.teal.950} !important",
            },
          },
          fg: {
            value: {
              base: "{colors.teal.600} !important",
              _dark: "{colors.teal.300} !important",
            },
          },
          subtle: {
            value: {
              base: "{colors.teal.50} !important",
              _dark: "{colors.teal.950} !important",
            },
          },
          muted: {
            value: {
              base: "{colors.teal.100} !important",
              _dark: "{colors.teal.900} !important",
            },
          },
          emphasized: {
            value: {
              base: "{colors.teal.200} !important",
              _dark: "{colors.teal.800} !important",
            },
          },
          solid: {
            value: {
              base: "{colors.teal.500} !important",
              _dark: "{colors.teal.500} !important",
            },
          },
          focusRing: {
            value: {
              base: "{colors.teal.500}",
              _dark: "{colors.teal.500}",
            },
          },
          border: {
            value: {
              base: "{colors.teal.200} !important",
              _dark: "{colors.teal.800} !important",
            },
          },
        },

        tealBlue: {
          contrast: {
            value: {
              base: "{colors.tealBlue.50}",
              _dark: "{colors.tealBlue.950}",
            },
          },
          fg: {
            value: {
              base: "{colors.tealBlue.600}",
              _dark: "{colors.tealBlue.400}",
            },
          },
          subtle: {
            value: {
              base: "{colors.tealBlue.50}",
              _dark: "{colors.tealBlue.950}",
            },
          },
          muted: {
            value: {
              base: "{colors.tealBlue.100}",
              _dark: "{colors.tealBlue.900}",
            },
          },
          emphasized: {
            value: {
              base: "{colors.tealBlue.200}",
              _dark: "{colors.tealBlue.800}",
            },
          },
          solid: {
            value: {
              base: "{colors.tealBlue.500}",
              _dark: "{colors.tealBlue.500}",
            },
          },
          focusRing: {
            value: {
              base: "{colors.tealBlue.500}",
              _dark: "{colors.tealBlue.500}",
            },
          },
          border: {
            value: {
              base: "{colors.tealBlue.200}",
              _dark: "{colors.tealBlue.800}",
            },
          },
        },

        cyan: {
          contrast: {
            value: {
              base: "{colors.cyan.50} !important",
              _dark: "{colors.cyan.950} !important",
            },
          },
          fg: {
            value: {
              base: "{colors.cyan.600} !important",
              _dark: "{colors.cyan.400} !important",
            },
          },
          subtle: {
            value: {
              base: "{colors.cyan.50} !important",
              _dark: "{colors.cyan.950} !important",
            },
          },
          muted: {
            value: {
              base: "{colors.cyan.100} !important",
              _dark: "{colors.cyan.900} !important",
            },
          },
          emphasized: {
            value: {
              base: "{colors.cyan.200} !important",
              _dark: "{colors.cyan.800} !important",
            },
          },
          solid: {
            value: {
              base: "{colors.cyan.500} !important",
              _dark: "{colors.cyan.500} !important",
            },
          },
          focusRing: {
            value: {
              base: "{colors.cyan.500}",
              _dark: "{colors.cyan.500}",
            },
          },
          border: {
            value: {
              base: "{colors.cyan.200} !important",
              _dark: "{colors.cyan.800} !important",
            },
          },
        },

        sky: {
          contrast: {
            value: { base: "{colors.sky.50}", _dark: "{colors.sky.900}" },
          },
          fg: {
            value: {
              base: "{colors.sky.500}",
              _dark: "{colors.sky.400}",
            },
          },
          subtle: {
            value: {
              base: "{colors.sky.50}",
              _dark: "{colors.sky.950}",
            },
          },
          muted: {
            value: {
              base: "{colors.sky.100}",
              _dark: "{colors.sky.900}",
            },
          },
          emphasized: {
            value: {
              base: "{colors.sky.200}",
              _dark: "{colors.sky.800}",
            },
          },
          solid: {
            value: {
              base: "{colors.sky.500}",
              _dark: "{colors.sky.500}",
            },
          },
          focusRing: {
            value: {
              base: "{colors.sky.500}",
              _dark: "{colors.sky.700}",
            },
          },
          border: {
            value: {
              base: "{colors.sky.200}",
              _dark: "{colors.sky.800}",
            },
          },
        },

        powderBlue: {
          contrast: {
            value: {
              base: "{colors.powderBlue.50}",
              _dark: "{colors.powderBlue.900}",
            },
          },
          fg: {
            value: {
              base: "{colors.powderBlue.500}",
              _dark: "{colors.powderBlue.400}",
            },
          },
          subtle: {
            value: {
              base: "{colors.powderBlue.50}",
              _dark: "{colors.powderBlue.950}",
            },
          },
          muted: {
            value: {
              base: "{colors.powderBlue.100}",
              _dark: "{colors.powderBlue.900}",
            },
          },
          emphasized: {
            value: {
              base: "{colors.powderBlue.200}",
              _dark: "{colors.powderBlue.800}",
            },
          },
          solid: {
            value: {
              base: "{colors.powderBlue.500}",
              _dark: "{colors.powderBlue.500}",
            },
          },
          focusRing: {
            value: {
              base: "{colors.powderBlue.500}",
              _dark: "{colors.powderBlue.700}",
            },
          },
          border: {
            value: {
              base: "{colors.powderBlue.200}",
              _dark: "{colors.powderBlue.800}",
            },
          },
        },

        blue: {
          contrast: {
            value: {
              base: "{colors.blue.50} !important",
              _dark: "{colors.blue.50} !important",
            },
          },
          fg: {
            value: {
              base: "{colors.blue.500} !important",
              _dark: "{colors.blue.400} !important",
            },
          },
          subtle: {
            value: {
              base: "{colors.blue.50} !important",
              _dark: "{colors.blue.900} !important",
            },
          },
          muted: {
            value: {
              base: "{colors.blue.100} !important",
              _dark: "{colors.blue.800} !important",
            },
          },
          emphasized: {
            value: {
              base: "{colors.blue.200} !important",
              _dark: "{colors.blue.700} !important",
            },
          },
          solid: {
            value: {
              base: "{colors.blue.500} !important",
              _dark: "{colors.blue.600} !important",
            },
          },
          focusRing: {
            value: {
              base: "{colors.blue.500} !important",
              _dark: "{colors.blue.500} !important",
            },
          },
          border: {
            value: {
              base: "{colors.blue.200} !important",
              _dark: "{colors.blue.800} !important",
            },
          },
        },

        sapphire: {
          contrast: {
            value: {
              base: "{colors.sapphire.100}",
              _dark: "{colors.sapphire.100}",
            },
          },
          fg: {
            value: {
              base: "{colors.sapphire.500}",
              _dark: "{colors.sapphire.300}",
            },
          },
          subtle: {
            value: {
              base: "{colors.sapphire.50}",
              _dark: "{colors.sapphire.950}",
            },
          },
          muted: {
            value: {
              base: "{colors.sapphire.100}",
              _dark: "{colors.sapphire.900}",
            },
          },
          emphasized: {
            value: {
              base: "{colors.sapphire.200}",
              _dark: "{colors.sapphire.800}",
            },
          },
          solid: {
            value: {
              base: "{colors.sapphire.500}",
              _dark: "{colors.sapphire.600}",
            },
          },
          focusRing: {
            value: {
              base: "{colors.sapphire.500}",
              _dark: "{colors.sapphire.700}",
            },
          },
          border: {
            value: {
              base: "{colors.sapphire.200}",
              _dark: "{colors.sapphire.800}",
            },
          },
        },

        indigo: {
          contrast: {
            value: { base: "{colors.indigo.50}", _dark: "{colors.indigo.50}" },
          },
          fg: {
            value: {
              base: "{colors.indigo.500}",
              _dark: "{colors.indigo.300}",
            },
          },
          subtle: {
            value: {
              base: "{colors.indigo.50}",
              _dark: "{colors.indigo.950}",
            },
          },
          muted: {
            value: {
              base: "{colors.indigo.100}",
              _dark: "{colors.indigo.900}",
            },
          },
          emphasized: {
            value: {
              base: "{colors.indigo.200}",
              _dark: "{colors.indigo.800}",
            },
          },
          solid: {
            value: {
              base: "{colors.indigo.500}",
              _dark: "{colors.indigo.500}",
            },
          },
          focusRing: {
            value: {
              base: "{colors.indigo.500}",
              _dark: "{colors.indigo.700}",
            },
          },
          border: {
            value: {
              base: "{colors.indigo.200}",
              _dark: "{colors.indigo.800}",
            },
          },
        },

        discord: {
          contrast: {
            value: {
              base: "{colors.discord.50}",
              _dark: "{colors.discord.100}",
            },
          },
          fg: {
            value: {
              base: "{colors.discord.500}",
              _dark: "{colors.discord.300}",
            },
          },
          subtle: {
            value: {
              base: "{colors.discord.50}",
              _dark: "{colors.discord.950}",
            },
          },
          muted: {
            value: {
              base: "{colors.discord.100}",
              _dark: "{colors.discord.900}",
            },
          },
          emphasized: {
            value: {
              base: "{colors.discord.200}",
              _dark: "{colors.discord.800}",
            },
          },
          solid: {
            value: {
              base: "{colors.discord.500}",
              _dark: "{colors.discord.500}",
            },
          },
          focusRing: {
            value: {
              base: "{colors.discord.500}",
              _dark: "{colors.discord.700}",
            },
          },
          border: {
            value: {
              base: "{colors.discord.200}",
              _dark: "{colors.discord.800}",
            },
          },
        },

        powderLavender: {
          contrast: {
            value: {
              base: "{colors.powderLavender.50}",
              _dark: "{colors.powderLavender.900}",
            },
          },
          fg: {
            value: {
              base: "{colors.powderLavender.600}",
              _dark: "{colors.powderLavender.400}",
            },
          },
          subtle: {
            value: {
              base: "{colors.powderLavender.50}",
              _dark: "{colors.powderLavender.950}",
            },
          },
          muted: {
            value: {
              base: "{colors.powderLavender.100}",
              _dark: "{colors.powderLavender.900}",
            },
          },
          emphasized: {
            value: {
              base: "{colors.powderLavender.200}",
              _dark: "{colors.powderLavender.800}",
            },
          },
          solid: {
            value: {
              base: "{colors.powderLavender.500}",
              _dark: "{colors.powderLavender.500}",
            },
          },
          focusRing: {
            value: {
              base: "{colors.powderLavender.500}",
              _dark: "{colors.powderLavender.700}",
            },
          },
          border: {
            value: {
              base: "{colors.powderLavender.200}",
              _dark: "{colors.powderLavender.800}",
            },
          },
        },

        lavender: {
          contrast: {
            value: {
              base: "{colors.lavender.50}",
              _dark: "{colors.lavender.100}",
            },
          },
          fg: {
            value: {
              base: "{colors.lavender.500}",
              _dark: "{colors.lavender.300}",
            },
          },
          subtle: {
            value: {
              base: "{colors.lavender.50}",
              _dark: "{colors.lavender.950}",
            },
          },
          muted: {
            value: {
              base: "{colors.lavender.100}",
              _dark: "{colors.lavender.900}",
            },
          },
          emphasized: {
            value: {
              base: "{colors.lavender.200}",
              _dark: "{colors.lavender.800}",
            },
          },
          solid: {
            value: {
              base: "{colors.lavender.500}",
              _dark: "{colors.lavender.600}",
            },
          },
          focusRing: {
            value: {
              base: "{colors.lavender.500}",
              _dark: "{colors.lavender.700}",
            },
          },
          border: {
            value: {
              base: "{colors.lavender.200}",
              _dark: "{colors.lavender.800}",
            },
          },
        },

        purple: {
          contrast: {
            value: {
              base: "{colors.purple.50} !important",
              _dark: "{colors.purple.950} !important",
            },
          },
          fg: {
            value: {
              base: "{colors.purple.500}",
              _dark: "{colors.purple.400}",
            },
          },
          subtle: {
            value: {
              base: "{colors.purple.50}",
              _dark: "{colors.purple.950}",
            },
          },
          muted: {
            value: {
              base: "{colors.purple.100}",
              _dark: "{colors.purple.900}",
            },
          },
          emphasized: {
            value: {
              base: "{colors.purple.200}",
              _dark: "{colors.purple.800}",
            },
          },
          solid: {
            value: {
              base: "{colors.purple.500}",
              _dark: "{colors.purple.600}",
            },
          },
          focusRing: {
            value: {
              base: "{colors.purple.500}",
              _dark: "{colors.purple.700}",
            },
          },
          border: {
            value: {
              base: "{colors.purple.200}",
              _dark: "{colors.purple.800}",
            },
          },
        },

        bubblegumPink: {
          contrast: {
            value: {
              base: "{colors.bubblegumPink.50}",
              _dark: "{colors.bubblegumPink.100}",
            },
          },
          fg: {
            value: {
              base: "{colors.bubblegumPink.500}",
              _dark: "{colors.bubblegumPink.400}",
            },
          },
          subtle: {
            value: {
              base: "{colors.bubblegumPink.50}",
              _dark: "{colors.bubblegumPink.950}",
            },
          },
          muted: {
            value: {
              base: "{colors.bubblegumPink.100}",
              _dark: "{colors.bubblegumPink.900}",
            },
          },
          emphasized: {
            value: {
              base: "{colors.bubblegumPink.200}",
              _dark: "{colors.bubblegumPink.800}",
            },
          },
          solid: {
            value: {
              base: "{colors.bubblegumPink.500}",
              _dark: "{colors.bubblegumPink.600}",
            },
          },
          focusRing: {
            value: {
              base: "{colors.bubblegumPink.500}",
              _dark: "{colors.bubblegumPink.700}",
            },
          },
          border: {
            value: {
              base: "{colors.bubblegumPink.200}",
              _dark: "{colors.bubblegumPink.800}",
            },
          },
        },

        pink: {
          contrast: {
            value: {
              base: "{colors.pink.50} !important",
              _dark: "{colors.pink.950} !important",
            },
          },
          fg: {
            value: {
              base: "{colors.pink.500} !important",
              _dark: "{colors.pink.400} !important",
            },
          },
          subtle: {
            value: {
              base: "{colors.pink.50}",
              _dark: "{colors.pink.950}",
            },
          },
          muted: {
            value: {
              base: "{colors.pink.100} !important",
              _dark: "{colors.pink.900} !important",
            },
          },
          emphasized: {
            value: {
              base: "{colors.pink.200} !important",
              _dark: "{colors.pink.800} !important",
            },
          },
          solid: {
            value: {
              base: "{colors.pink.500}",
              _dark: "{colors.pink.600}",
            },
          },
          focusRing: {
            value: {
              base: "{colors.pink.500}",
              _dark: "{colors.pink.700}",
            },
          },
          border: {
            value: {
              base: "{colors.pink.200} !important",
              _dark: "{colors.pink.800} !important",
            },
          },
        },
      },
      gradients: {},
      shadows: {
        xs: {
          value: {
            base: "-0.5px -0.5px 1px rgba(0,0,0,0.02), 0 1px 1px rgba(0,0,0,0.01) !important",
            _dark:
              "-0.5px -0.5px 1px rgba(0,0,0,0.08), 0 1px 1px rgba(0,0,0,0.07) !important",
          },
        },
        sm: {
          value: {
            base: "-1px -1px 3px rgba(0,0,0,0.035), 0 1.5px 3px rgba(0,0,0,0.025) !important",
            _dark:
              "-1px -1px 3px rgba(0,0,0,0.13), 0 1.5px 3px rgba(0,0,0,0.11) !important",
          },
        },
        md: {
          value: {
            base: "-1.5px -1.5px 5px rgba(0,0,0,0.045), 0 2.5px 5px rgba(0,0,0,0.035) !important",
            _dark:
              "-1.5px -1.5px 5px rgba(0,0,0,0.15), 0 2.5px 5px rgba(0,0,0,0.13) !important",
          },
        },
        lg: {
          value: {
            base: "-2px -2px 8px rgba(0,0,0,0.055), 0 3.5px 7px rgba(0,0,0,0.045) !important",
            _dark:
              "-2px -2px 8px rgba(0,0,0,0.17), 0 3.5px 7px rgba(0,0,0,0.15) !important",
          },
        },
        xl: {
          value: {
            base: "-3px -3px 12px rgba(0,0,0,0.065), 0 5px 10px rgba(0,0,0,0.055) !important",
            _dark:
              "-3px -3px 12px rgba(0,0,0,0.19), 0 5px 10px rgba(0,0,0,0.17) !important",
          },
        },
        "2xl": {
          value: {
            base: "-4px -4px 17px rgba(0,0,0,0.075), 0 7px 14px rgba(0,0,0,0.065) !important",
            _dark:
              "-4px -4px 17px rgba(0,0,0,0.22), 0 7px 14px rgba(0,0,0,0.20) !important",
          },
        },
      },
      radii: {},
      borders: {},
      spacing: {
        "2xs": { value: "4px" },
        xs: { value: "8px" },
        sm: { value: "12px" },
        md: { value: "16px" },
        lg: { value: "24px" },
        xl: { value: "32px" },
        "2xl": { value: "48px" },
        "3xl": { value: "64px" },
      },
      sizes: {
        headerH: { value: "56px" },
        tableRowH: { value: "56px" },
        tableCellH: { value: "56px" },
        tableActionsW: { value: "56px" },
        modalControlsW: { value: "70px" },
        feedbackMinH: { value: "240px" },
      },
      zIndex: {
        modal: { value: 1400 },
      },
      blurs: {
        none: { value: "0" },
        sm: { value: "4px" },
        md: { value: "10px" },
        lg: { value: "5px" },
        xl: { value: "50px" },
        backdrop: { value: "10px" },
      },
    },

    textStyles: {},

    layerStyles: {
      glass: {
        value: {
          bg: "bg.bodyAlpha",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          border: "1px solid",
          borderColor: {
            _light: "rgba(255, 255, 255, 0.35)",
            _dark: "rgba(255, 255, 255, 0.08)",
          },
          boxShadow: {
            _light:
              "inset 0 1px 1px 0 rgba(255, 255, 255, 0.45), inset 1px 0 1px 0 rgba(255, 255, 255, 0.35), inset -1px -1px 1px 0 rgba(0, 0, 0, 0.02), inset 0 0 6px 0 rgba(255, 255, 255, 0.12), 0 4px 16px 0 rgba(0, 0, 0, 0.05)",
            _dark:
              "inset 0 1px 1px 0 rgba(255, 255, 255, 0.12), inset 1px 0 1px 0 rgba(255, 255, 255, 0.08), inset -1px -1px 1px 0 rgba(0, 0, 0, 0.15), inset 0 0 6px 0 rgba(255, 255, 255, 0.02), 0 4px 16px 0 rgba(0, 0, 0, 0.2)",
          },
        },
      },
      glassTop: {
        value: {
          bg: "bg.bodyAlpha",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          border: "1px solid",
          borderColor: {
            _light: "rgba(255, 255, 255, 0.35)",
            _dark: "rgba(255, 255, 255, 0.08)",
          },
          boxShadow: {
            _light:
              "inset 0 1px 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.02), inset 0 0 6px 0 rgba(255, 255, 255, 0.1), 0 4px 16px 0 rgba(0, 0, 0, 0.05)",
            _dark:
              "inset 0 1px 1px 0 rgba(255, 255, 255, 0.14), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.15), inset 0 0 6px 0 rgba(255, 255, 255, 0.02), 0 4px 16px 0 rgba(0, 0, 0, 0.2)",
          },
        },
      },
      glassBottom: {
        value: {
          bg: "bg.bodyAlpha",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          border: "1px solid",
          borderColor: {
            _light: "rgba(255, 255, 255, 0.35)",
            _dark: "rgba(255, 255, 255, 0.08)",
          },
          boxShadow: {
            _light:
              "inset 0 -1px 1px 0 rgba(255, 255, 255, 0.45), inset -1px 0 1px 0 rgba(255, 255, 255, 0.35), inset 1px 1px 1px 0 rgba(0, 0, 0, 0.02), inset 0 0 6px 0 rgba(255, 255, 255, 0.12), 0 4px 16px 0 rgba(0, 0, 0, 0.05)",
            _dark:
              "inset 0 -1px 1px 0 rgba(255, 255, 255, 0.12), inset -1px 0 1px 0 rgba(255, 255, 255, 0.08), inset 1px 1px 1px 0 rgba(0, 0, 0, 0.15), inset 0 0 6px 0 rgba(255, 255, 255, 0.02), 0 4px 16px 0 rgba(0, 0, 0, 0.2)",
          },
        },
      },
      glassTopRight: {
        value: {
          bg: "bg.bodyAlpha",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          border: "1px solid",
          borderColor: {
            _light: "rgba(255, 255, 255, 0.35)",
            _dark: "rgba(255, 255, 255, 0.08)",
          },
          boxShadow: {
            _light:
              "inset 0 1px 1px 0 rgba(255, 255, 255, 0.45), inset -1px 0 1px 0 rgba(255, 255, 255, 0.35), inset 1px -1px 1px 0 rgba(0, 0, 0, 0.02), inset 0 0 6px 0 rgba(255, 255, 255, 0.12), 0 4px 16px 0 rgba(0, 0, 0, 0.05)",
            _dark:
              "inset 0 1px 1px 0 rgba(255, 255, 255, 0.12), inset -1px 0 1px 0 rgba(255, 255, 255, 0.08), inset 1px -1px 1px 0 rgba(0, 0, 0, 0.15), inset 0 0 6px 0 rgba(255, 255, 255, 0.02), 0 4px 16px 0 rgba(0, 0, 0, 0.2)",
          },
        },
      },
      glassBottomLeft: {
        value: {
          bg: "bg.bodyAlpha",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          border: "1px solid",
          borderColor: {
            _light: "rgba(255, 255, 255, 0.35)",
            _dark: "rgba(255, 255, 255, 0.08)",
          },
          boxShadow: {
            _light:
              "inset 0 -1px 1px 0 rgba(255, 255, 255, 0.45), inset 1px 0 1px 0 rgba(255, 255, 255, 0.35), inset -1px 1px 1px 0 rgba(0, 0, 0, 0.02), inset 0 0 6px 0 rgba(255, 255, 255, 0.12), 0 4px 16px 0 rgba(0, 0, 0, 0.05)",
            _dark:
              "inset 0 -1px 1px 0 rgba(255, 255, 255, 0.12), inset 1px 0 1px 0 rgba(255, 255, 255, 0.08), inset -1px 1px 1px 0 rgba(0, 0, 0, 0.15), inset 0 0 6px 0 rgba(255, 255, 255, 0.02), 0 4px 16px 0 rgba(0, 0, 0, 0.2)",
          },
        },
      },
      glassTopLeft: {
        value: {
          bg: "bg.bodyAlpha",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          border: "1px solid",
          borderColor: {
            _light: "rgba(255, 255, 255, 0.35)",
            _dark: "rgba(255, 255, 255, 0.08)",
          },
          boxShadow: {
            _light:
              "inset 0 1px 1px 0 rgba(255, 255, 255, 0.45), inset 1px 0 1px 0 rgba(255, 255, 255, 0.35), inset -1px -1px 1px 0 rgba(0, 0, 0, 0.02), inset 0 0 6px 0 rgba(255, 255, 255, 0.12), 0 4px 16px 0 rgba(0, 0, 0, 0.05)",
            _dark:
              "inset 0 1px 1px 0 rgba(255, 255, 255, 0.12), inset 1px 0 1px 0 rgba(255, 255, 255, 0.08), inset -1px -1px 1px 0 rgba(0, 0, 0, 0.15), inset 0 0 6px 0 rgba(255, 255, 255, 0.02), 0 4px 16px 0 rgba(0, 0, 0, 0.2)",
          },
        },
      },
      glassBottomRight: {
        value: {
          bg: "bg.bodyAlpha",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          border: "1px solid",
          borderColor: {
            _light: "rgba(255, 255, 255, 0.35)",
            _dark: "rgba(255, 255, 255, 0.08)",
          },
          boxShadow: {
            _light:
              "inset 0 -1px 1px 0 rgba(255, 255, 255, 0.45), inset -1px 0 1px 0 rgba(255, 255, 255, 0.35), inset 1px 1px 1px 0 rgba(0, 0, 0, 0.02), inset 0 0 6px 0 rgba(255, 255, 255, 0.12), 0 4px 16px 0 rgba(0, 0, 0, 0.05)",
            _dark:
              "inset 0 -1px 1px 0 rgba(255, 255, 255, 0.12), inset -1px 0 1px 0 rgba(255, 255, 255, 0.08), inset 1px 1px 1px 0 rgba(0, 0, 0, 0.15), inset 0 0 6px 0 rgba(255, 255, 255, 0.02), 0 4px 16px 0 rgba(0, 0, 0, 0.2)",
          },
        },
      },
      glassTopBottom: {
        value: {
          bg: "bg.bodyAlpha",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          border: "1px solid",
          borderColor: {
            _light: "rgba(255, 255, 255, 0.35)",
            _dark: "rgba(255, 255, 255, 0.08)",
          },
          boxShadow: {
            _light:
              "inset 0 1px 1px 0 rgba(255, 255, 255, 0.45), inset 0 -1px 1px 0 rgba(255, 255, 255, 0.35), inset 0 0 6px 0 rgba(255, 255, 255, 0.12), 0 4px 16px 0 rgba(0, 0, 0, 0.05)",
            _dark:
              "inset 0 1px 1px 0 rgba(255, 255, 255, 0.12), inset 0 -1px 1px 0 rgba(255, 255, 255, 0.08), inset 0 0 6px 0 rgba(255, 255, 255, 0.02), 0 4px 16px 0 rgba(0, 0, 0, 0.2)",
          },
        },
      },
      glassAll: {
        value: {
          bg: "bg.bodyAlpha",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          border: "1px solid",
          borderColor: {
            _light: "rgba(255, 255, 255, 0.35)",
            _dark: "rgba(255, 255, 255, 0.08)",
          },
          boxShadow: {
            _light:
              "inset 0 1px 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 1px 0 rgba(255, 255, 255, 0.3), inset 1px 0 1px 0 rgba(255, 255, 255, 0.35), inset -1px 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 0 6px 0 rgba(255, 255, 255, 0.12), 0 4px 16px 0 rgba(0, 0, 0, 0.05)",
            _dark:
              "inset 0 1px 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 1px 0 rgba(255, 255, 255, 0.08), inset 1px 0 1px 0 rgba(255, 255, 255, 0.08), inset -1px 0 1px 0 rgba(255, 255, 255, 0.06), inset 0 0 6px 0 rgba(255, 255, 255, 0.02), 0 4px 16px 0 rgba(0, 0, 0, 0.2)",
          },
        },
      },

      frosted: {
        value: {
          bg: "bg.bodyAlpha",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
        },
      },
      frostedInverted: {
        value: {
          bg: "bg.frostedInverted",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
        },
      },
      frostedLight: {
        value: {
          bg: "{colors.frostedLight}",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
        },
      },
      frostedDark: {
        value: {
          bg: "{colors.frostedDark}",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
        },
      },
    },

    animationStyles: {},

    recipes: {
      button: buttonRecipe,
      input: inputRecipe,
    },

    slotRecipes: {
      select: selectRecipe,
      checkbox: checkboxRecipe,
      dialog: dialogRecipe,
      drawer: drawerRecipe,
      carousel: carouselRecipe,
    },
  },
});

export const chakraSystem = createSystem(defaultConfig, chakraConfig);

export default chakraSystem;
