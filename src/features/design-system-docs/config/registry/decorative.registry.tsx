import type { EmojiVariant } from "@/design-system/components/emoji/emoji/emoji.type";
import { Emoji } from "@/design-system/components/emoji/emoji/emoji";
import { EmojiPoker } from "@/design-system/components/emoji/emoji/emoji.poker";
import { COLOR_PALETTE_OPTIONS } from "@/design-system/constants/colors";
import type { ComponentDocSpec } from "@/features/design-system-docs/types/ds-docs-spec.type";

export const DECORATIVE_DOCS: Record<string, ComponentDocSpec> = {

  emoji: {
    key: "emoji",
    title: "Emoji",
    category: "Feedback",
    description:
      "Komponen Emoji berpotongan (sliced SVG) dengan penyesuaian dinamis colorPalette (solid, emphasized, muted, subtle).",
    importPath:
      'import { EmojiSmile, EmojiHappy, EmojiAngry, EmojiCry, EmojiSurprised, EmojiThinking } from "@/design-system/components/emoji";',
    component: EmojiPoker,
    defaultProps: {
      variant: "poker",
      colorPalette: "neutral",
      boxSize: 80,
    },
    propsSpec: [
      {
        name: "variant",
        type: "EmojiVariant",
        defaultValue: "poker",
        description: "Varian sliced emoji SVG.",
        controlKind: "select",
        options: [
          "shout",
          "wicked",
          "angry",
          "funny",
          "speechless",
          "love",
          "cool",
          "laugh",
          "embarassed",
          "rollingEyes",
          "poker",
          "cry",
          "happy",
          "sulk",
          "thinking",
          "thumbUp",
          "scream",
          "surprised",
          "sad",
        ],
      },
      {
        name: "colorPalette",
        type: "string",
        defaultValue: "neutral",
        description:
          "Color palette theme (neutral, blue, red, teal, green, amber, purple, etc.).",
        controlKind: "select",
        options: COLOR_PALETTE_OPTIONS,
      },
      {
        name: "boxSize",
        type: "number",
        defaultValue: 24,
        description: "Box size emoji.",
        controlKind: "number",
      },
    ],
    generateCode: (props) => `<Emoji
  variant={"${String(props.variant || "poker")}"}
  boxSize={${Number(props.boxSize) || 24}}
  colorPalette={"${String(props.colorPalette || "neutral")}"}
/>`,
    renderPlayground: (props) => {
      const colorPalette = (props.colorPalette as string) || "neutral";
      const boxSize = (props.boxSize as number) || 24;
      const variant = (props.variant as EmojiVariant) || "poker";

      return (
        <Emoji
          variant={variant}
          boxSize={boxSize}
          colorPalette={colorPalette}
        />
      );
    },
  },

};
