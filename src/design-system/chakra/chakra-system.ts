// src/design-system/chakra/chakra-system.ts

import { buttonRecipe } from "@/design-system/chakra/recipes/button.recipe";
import { inputRecipe } from "@/design-system/chakra/recipes/input.recipe";
import { carouselRecipe } from "@/design-system/chakra/slot-recipes/carousel.recipe";
import { checkboxRecipe } from "@/design-system/chakra/slot-recipes/checkbox.recipe";
import { dialogRecipe } from "@/design-system/chakra/slot-recipes/dialog.recipe";
import { drawerRecipe } from "@/design-system/chakra/slot-recipes/drawer.recipe";
import { selectRecipe } from "@/design-system/chakra/slot-recipes/select.recipe";
import { stepsRecipe } from "@/design-system/chakra/slot-recipes/steps.recipe";
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
    // Respect OS-level "reduce motion". Durations are shortened instead of removed
    // so `animationend` / `transitionend` still fire for Presence and overlay exit flows.
    "*, *::before, *::after": {
      "@media (prefers-reduced-motion: reduce)": {
        animationDuration: "0.01ms !important",
        animationIterationCount: "1 !important",
        transitionDuration: "0.01ms !important",
        scrollBehavior: "auto !important",
      },
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

        bodyLight: { value: "#f4f4f5" },
        bodyDark: { value: "#171717" },

        bodyLightAlpha: { value: "#f4f4f5bf" },
        bodyDarkAlpha: { value: "#1a1b1cbf" },

        an0: { value: "#6b72800f" },
        an1: { value: "#6b72801f" },
        an2: { value: "#6b72802f" },
        an3: { value: "#6b72803f" },
        an4: { value: "#6b72804f" },
        placeholder: { value: "#9ca3af91" },

        neutral: {
          50: { value: "#ededef" },
          100: { value: "#e4e4e7" },
          200: { value: "#d4d4d8" },
          300: { value: "#c2c2c2" },
          400: { value: "#a3a3a3" },
          500: { value: "#808080" },
          600: { value: "#6b6b6b" },
          700: { value: "#545454" },
          800: { value: "#3b3b3b" },
          900: { value: "#292929" },
          950: { value: "#1f1f1f" },
        },

        grey: {
          50: { value: "#f7f7f8" },
          100: { value: "#ebedef" },
          200: { value: "#d7dbdf" },
          300: { value: "#bbc1c9" },
          400: { value: "#98a1ae" },
          500: { value: "#707d8f" },
          600: { value: "#5e6978" },
          700: { value: "#4b535d" },
          800: { value: "#353a40" },
          900: { value: "#242629" },
          950: { value: "#161718" },
        },

        darkAlpha: {
          50: { value: "#1212120a" },
          100: { value: "#1212120f" },
          200: { value: "#12121214" },
          300: { value: "#12121229" },
          400: { value: "#1212123d" },
          500: { value: "#1212125c" },
          600: { value: "#1212127a" },
          700: { value: "#121212a3" },
          800: { value: "#121212cc" },
          900: { value: "#121212eb" },
          950: { value: "#121212f5" },
        },

        cream: {
          50: { value: "#faf8f4" },
          100: { value: "#f5efe6" },
          200: { value: "#ebdfcc" },
          300: { value: "#dec9a6" },
          400: { value: "#ceaf78" },
          500: { value: "#bd9042" },
          600: { value: "#9d7939" },
          700: { value: "#795e2f" },
          800: { value: "#504026" },
          900: { value: "#30291c" },
          950: { value: "#1b1813" },
        },

        caramel: {
          50: { value: "#fcf8f3" },
          100: { value: "#f8eee2" },
          200: { value: "#f2ddc5" },
          300: { value: "#eac49a" },
          400: { value: "#e1a766" },
          500: { value: "#d68529" },
          600: { value: "#b37023" },
          700: { value: "#89581f" },
          800: { value: "#593d1d" },
          900: { value: "#342718" },
          950: { value: "#1d1711" },
        },

        mocha: {
          50: { value: "#d7a584" },
          100: { value: "#f4ebe7" },
          200: { value: "#e9d8cd" },
          300: { value: "#dabba9" },
          400: { value: "#c9997e" },
          500: { value: "#b5714a" },
          600: { value: "#975f3f" },
          700: { value: "#754b33" },
          800: { value: "#4d3628" },
          900: { value: "#2f241d" },
          950: { value: "#1b1613" },
        },

        brown: {
          50: { value: "#f9f6f5" },
          100: { value: "#f2ebe8" },
          200: { value: "#e6d6d1" },
          300: { value: "#d4b9af" },
          400: { value: "#c09687" },
          500: { value: "#a86c57" },
          600: { value: "#8c5c4a" },
          700: { value: "#6d493c" },
          800: { value: "#49342d" },
          900: { value: "#2d231f" },
          950: { value: "#1a1614" },
        },

        maroon: {
          50: { value: "#fcf3f5" },
          100: { value: "#f7e3e6" },
          200: { value: "#f1c6cd" },
          300: { value: "#e89ca9" },
          400: { value: "#de687c" },
          500: { value: "#d22d48" },
          600: { value: "#b0273d" },
          700: { value: "#872232" },
          800: { value: "#571e27" },
          900: { value: "#34181d" },
          950: { value: "#1d1113" },
        },

        red: {
          50: { value: "#fdf2f2" },
          100: { value: "#fae0e0" },
          200: { value: "#f7c0c0" },
          300: { value: "#f39191" },
          400: { value: "#ee5858ff" },
          500: { value: "#d92828ff" },
          600: { value: "#c31313ff" },
          700: { value: "#951313" },
          800: { value: "#601616" },
          900: { value: "#381515" },
          950: { value: "#1f0f0f" },
        },

        salmon: {
          50: { value: "#fdf4f2" },
          100: { value: "#fbe4e0" },
          200: { value: "#f8c8bf" },
          300: { value: "#f4a090" },
          400: { value: "#f07056" },
          500: { value: "#ed3612" },
          600: { value: "#c52f11" },
          700: { value: "#972812" },
          800: { value: "#602215" },
          900: { value: "#381a14" },
          950: { value: "#1f120f" },
        },

        pastelOrange: {
          50: { value: "#fdf5f2" },
          100: { value: "#fbe8df" },
          200: { value: "#f9cfbe" },
          300: { value: "#f6ad8d" },
          400: { value: "#f48352" },
          500: { value: "#f2520d" },
          600: { value: "#c9450d" },
          700: { value: "#9a380e" },
          800: { value: "#632b13" },
          900: { value: "#391f13" },
          950: { value: "#1f140f" },
        },

        orange: {
          50: { value: "#fef7f1" },
          100: { value: "#fcedde" },
          200: { value: "#fadbbc" },
          300: { value: "#f9c28b" },
          400: { value: "#f9a34e" },
          500: { value: "#f98006" },
          600: { value: "#cf6b07" },
          700: { value: "#9d540b" },
          800: { value: "#643b11" },
          900: { value: "#3a2612" },
          950: { value: "#20170e" },
        },

        gold: {
          50: { value: "#fdfaf2" },
          100: { value: "#fbf3df" },
          200: { value: "#f9e7be" },
          300: { value: "#f6d78d" },
          400: { value: "#f4c452" },
          500: { value: "#f2ad0d" },
          600: { value: "#c9910d" },
          700: { value: "#9a700e" },
          800: { value: "#634b13" },
          900: { value: "#392e13" },
          950: { value: "#1f1a0f" },
        },

        yellow: {
          50: { value: "#fefbf1" },
          100: { value: "#fcf6de" },
          200: { value: "#fbeebc" },
          300: { value: "#f9e38a" },
          400: { value: "#f9d74d" },
          500: { value: "#fac905" },
          600: { value: "#d0a806" },
          700: { value: "#9e810a" },
          800: { value: "#655410" },
          900: { value: "#3b3212" },
          950: { value: "#201c0e" },
        },

        lime: {
          50: { value: "#fbfcf3" },
          100: { value: "#f5f8e2" },
          200: { value: "#edf3c4" },
          300: { value: "#e0eb98" },
          400: { value: "#d3e462" },
          500: { value: "#c3db24" },
          600: { value: "#a3b71f" },
          700: { value: "#7d8c1d" },
          800: { value: "#525a1b" },
          900: { value: "#313617" },
          950: { value: "#1c1e10" },
        },

        olive: {
          50: { value: "#f8fbf4" },
          100: { value: "#f0f5e5" },
          200: { value: "#e1ecca" },
          300: { value: "#cce0a4" },
          400: { value: "#b3d274" },
          500: { value: "#96c23d" },
          600: { value: "#7da234" },
          700: { value: "#627d2c" },
          800: { value: "#425224" },
          900: { value: "#2a311b" },
          950: { value: "#191c12" },
        },

        green: {
          50: { value: "#f3fcf6" },
          100: { value: "#e2f8ea" },
          200: { value: "#c4f2d5" },
          300: { value: "#99eab7" },
          400: { value: "#64e392" },
          500: { value: "#26d968" },
          600: { value: "#21b557" },
          700: { value: "#1e8a46" },
          800: { value: "#1c5933" },
          900: { value: "#183522" },
          950: { value: "#111d15" },
        },

        jade: {
          50: { value: "#f2fcf9" },
          100: { value: "#e1f9f2" },
          200: { value: "#c2f4e5" },
          300: { value: "#96eed3" },
          400: { value: "#5fe7be" },
          500: { value: "#1fe0a6" },
          600: { value: "#1cba8b" },
          700: { value: "#198f6c" },
          800: { value: "#195c48" },
          900: { value: "#16362d" },
          950: { value: "#101e1a" },
        },

        teal: {
          50: { value: "#f2fdfc" },
          100: { value: "#e1faf7" },
          200: { value: "#c1f6f0" },
          300: { value: "#93f0e7" },
          400: { value: "#5cebdc" },
          500: { value: "#19e6d1" },
          600: { value: "#18bfae" },
          700: { value: "#169286" },
          800: { value: "#175e57" },
          900: { value: "#153734" },
          950: { value: "#101e1d" },
        },

        tealBlue: {
          50: { value: "#f2fcfc" },
          100: { value: "#e1f8f9" },
          200: { value: "#c2f3f4" },
          300: { value: "#96ebee" },
          400: { value: "#5fe3e7" },
          500: { value: "#1fdae0" },
          600: { value: "#1cb5ba" },
          700: { value: "#198b8f" },
          800: { value: "#195a5c" },
          900: { value: "#163536" },
          950: { value: "#101d1e" },
        },

        cyan: {
          50: { value: "#f2fbfd" },
          100: { value: "#dff7fb" },
          200: { value: "#beeff9" },
          300: { value: "#8de5f6" },
          400: { value: "#52d9f4" },
          500: { value: "#0dccf2" },
          600: { value: "#0daac9" },
          700: { value: "#0e839a" },
          800: { value: "#135563" },
          900: { value: "#133339" },
          950: { value: "#0f1c1f" },
        },

        sky: {
          50: { value: "#f2f9fd" },
          100: { value: "#dff2fb" },
          200: { value: "#bee5f9" },
          300: { value: "#8dd3f6" },
          400: { value: "#52bef4" },
          500: { value: "#0da6f2" },
          600: { value: "#0d8bc9" },
          700: { value: "#0e6b9a" },
          800: { value: "#134863" },
          900: { value: "#132d39" },
          950: { value: "#0f1a1f" },
        },

        powderBlue: {
          50: { value: "#f4f7fa" },
          100: { value: "#e6edf5" },
          200: { value: "#ccdbeb" },
          300: { value: "#a6c2de" },
          400: { value: "#78a3ce" },
          500: { value: "#4280bd" },
          600: { value: "#396b9d" },
          700: { value: "#2f5479" },
          800: { value: "#263b50" },
          900: { value: "#1c2630" },
          950: { value: "#13171b" },
        },

        blue: {
          50: { value: "#f2f7fd" },
          100: { value: "#e0ebfa" },
          200: { value: "#c0d8f7" },
          300: { value: "#91bbf3" },
          400: { value: "#5899ee" },
          500: { value: "#1471eb" },
          600: { value: "#135fc3" },
          700: { value: "#134c95" },
          800: { value: "#163660" },
          900: { value: "#152438" },
          950: { value: "#0f161f" },
        },

        sapphire: {
          50: { value: "#f2f4fc" },
          100: { value: "#e1e6f9" },
          200: { value: "#c2ccf5" },
          300: { value: "#95a7ef" },
          400: { value: "#5d79e9" },
          500: { value: "#1c44e3" },
          600: { value: "#1a3abc" },
          700: { value: "#183091" },
          800: { value: "#19265d" },
          900: { value: "#161c37" },
          950: { value: "#10131e" },
        },

        indigo: {
          50: { value: "#f4f4fb" },
          100: { value: "#e5e6f6" },
          200: { value: "#c9cdee" },
          300: { value: "#a2a8e2" },
          400: { value: "#727cd5" },
          500: { value: "#3947c6" },
          600: { value: "#313da5" },
          700: { value: "#29327f" },
          800: { value: "#232753" },
          900: { value: "#1b1d32" },
          950: { value: "#12131c" },
        },

        discord: {
          50: { value: "#f2f3fd" },
          100: { value: "#e0e2fb" },
          200: { value: "#bfc4f8" },
          300: { value: "#9098f4" },
          400: { value: "#5663f0" },
          500: { value: "#1224ed" },
          600: { value: "#1120c5" },
          700: { value: "#121d97" },
          800: { value: "#151b60" },
          900: { value: "#141738" },
          950: { value: "#0f101f" },
        },

        powderLavender: {
          50: { value: "#f5f4fb" },
          100: { value: "#e6e5f5" },
          200: { value: "#cdcaec" },
          300: { value: "#a9a4e0" },
          400: { value: "#7c74d2" },
          500: { value: "#483dc2" },
          600: { value: "#3e34a2" },
          700: { value: "#322c7d" },
          800: { value: "#282452" },
          900: { value: "#1d1b31" },
          950: { value: "#13121c" },
        },

        lavender: {
          50: { value: "#f5f2fd" },
          100: { value: "#e8dffb" },
          200: { value: "#d0bef8" },
          300: { value: "#ad8ef5" },
          400: { value: "#8454f2" },
          500: { value: "#530ff0" },
          600: { value: "#460fc7" },
          700: { value: "#391098" },
          800: { value: "#2b1461" },
          900: { value: "#1f1439" },
          950: { value: "#140f1f" },
        },

        purple: {
          50: { value: "#f9f2fc" },
          100: { value: "#f1e1f9" },
          200: { value: "#e4c3f4" },
          300: { value: "#d096ed" },
          400: { value: "#ba5fe7" },
          500: { value: "#9f20df" },
          600: { value: "#861cba" },
          700: { value: "#681a8e" },
          800: { value: "#461a5b" },
          900: { value: "#2b1736" },
          950: { value: "#19101e" },
        },

        bubblegumPink: {
          50: { value: "#fdf2fa" },
          100: { value: "#fbdff3" },
          200: { value: "#f9bee7" },
          300: { value: "#f68dd7" },
          400: { value: "#f452c4" },
          500: { value: "#f20dad" },
          600: { value: "#c90d91" },
          700: { value: "#9a0e70" },
          800: { value: "#63134b" },
          900: { value: "#39132e" },
          950: { value: "#1f0f1a" },
        },

        pink: {
          50: { value: "#fdf2f7" },
          100: { value: "#fae0ed" },
          200: { value: "#f6c1db" },
          300: { value: "#f292c2" },
          400: { value: "#ed5aa3" },
          500: { value: "#e81780" },
          600: { value: "#c1156b" },
          700: { value: "#931554" },
          800: { value: "#5f163b" },
          900: { value: "#371526" },
          950: { value: "#1f0f17" },
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
        // Foreground text tokens tuned for WCAG 2.2 AA (>= 4.5:1 on bg.body and bg.canvas).
        fg: {
          muted: {
            value: {
              base: "{colors.gray.600} !important",
              _dark: "{colors.gray.300} !important",
            },
          },
          subtle: {
            value: {
              base: "{colors.neutral.600} !important",
              _dark: "{colors.neutral.400} !important",
            },
          },
          error: {
            value: {
              base: "{colors.red.600} !important",
              _dark: "{colors.red.300} !important",
            },
          },
          warning: {
            value: {
              base: "{colors.orange.700} !important",
              _dark: "{colors.orange.300} !important",
            },
          },
          success: {
            value: {
              base: "{colors.green.800} !important",
              _dark: "{colors.green.300} !important",
            },
          },
          info: {
            value: {
              base: "{colors.blue.600} !important",
              _dark: "{colors.blue.400} !important",
            },
          },
        },
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
              base: "{colors.red.50} !important",
              _dark: "{colors.red.100} !important",
            },
          },
          fg: {
            value: {
              base: "{colors.red.600} !important",
              _dark: "{colors.red.300} !important",
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
              base: "{colors.red.600}  !important",
              _dark: "{colors.red.600} !important",
            },
          },
          focusRing: {
            value: {
              base: "{colors.red.500} !important",
              _dark: "{colors.red.700} !important",
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
              base: "{colors.orange.950} !important",
              _dark: "{colors.orange.100} !important",
            },
          },
          fg: {
            value: {
              base: "{colors.orange.700} !important",
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
              base: "{colors.green.950} !important",
              _dark: "{colors.green.950} !important",
            },
          },
          fg: {
            value: {
              base: "{colors.green.800} !important",
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
              base: "{colors.blue.600} !important",
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
              base: "{colors.blue.600} !important",
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
          position: "relative",
          isolation: "isolate",
          bg: "bg.bodyAlpha",
          border: "1px solid",
          borderColor: {
            base: "rgba(255, 255, 255, 0.85) !important",
            _dark: "an0 !important",
          },
          backdropFilter: "blur(10px) saturate(160%)",
          WebkitBackdropFilter: "blur(10px) saturate(160%)",
          boxShadow: {
            base: "inset 0 1px 0 0 #ffffff, 0 1px 3px rgba(0, 0, 0, 0.04)",
            _dark: "inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
          },
          backgroundImage: {
            base: "linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0) 30%)",
            _dark:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.008) 0%, rgba(255, 255, 255, 0) 30%)",
          },
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
      steps: stepsRecipe,
    },
  },
});

export const chakraSystem = createSystem(defaultConfig, chakraConfig);

export default chakraSystem;
