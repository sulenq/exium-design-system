import { BrandWatermark } from "@/design-system/components/branding/brand-watermark/brand-watermark";
import { Logo } from "@/design-system/components/branding/logo/logo";
import { COLOR_PALETTE_OPTIONS } from "@/design-system/constants/colors";
import type { ComponentDocSpec } from "@/features/design-system-docs/types/ds-docs-spec.type";

export const BRANDING_DOCS: Record<string, ComponentDocSpec> = {

  logo: {
    key: "logo",
    title: "Logo",
    category: "Branding",
    description:
      "Identitas visual resmi aplikasi Exium / ATR BPN dengan adaptasi tema warna.",
    importPath:
      'import { Logo } from "@/design-system/components/branding/logo/logo";',
    component: Logo,
    defaultProps: {
      boxSize: 32,
      color: "blue",
    },
    propsSpec: [
      {
        name: "boxSize",
        type: "number",
        defaultValue: 32,
        description: "Ukuran dimensi logo dalam pixel.",
        controlKind: "number",
      },
      {
        name: "color",
        type: "string",
        defaultValue: "blue",
        description: "Warna logo.",
        controlKind: "select",
        options: COLOR_PALETTE_OPTIONS,
      },
    ],
    generateCode: (props) =>
      `<Logo boxSize={${Number(props.boxSize) || 32}} color={"${String(props.color || "blue")}.solid"} />`,
    renderPlayground: (props) => (
      <Logo
        boxSize={Number(props.boxSize) || 32}
        color={`${String(props.color || "blue")}.solid`}
      />
    ),
  },


  brand_watermark: {
    key: "brand_watermark",
    title: "Brand Watermark",
    category: "Branding",
    description: "Teks watermark hak cipta resmi dengan tautan terintegrasi.",
    importPath:
      'import { BrandWatermark } from "@/design-system/components/branding/brand-watermark/brand-watermark";',
    component: BrandWatermark,
    defaultProps: {
      textAlign: "center",
      color: "fg.muted",
    },
    propsSpec: [
      {
        name: "textAlign",
        type: '"left" | "center" | "right"',
        defaultValue: "center",
        description: "Pensejajaran horizontal teks watermark.",
        controlKind: "select",
        options: ["left", "center", "right"],
      },
      {
        name: "color",
        type: "string",
        defaultValue: "fg.muted",
        description: "Token warna teks watermark.",
        controlKind: "select",
        options: [
          "fg.muted",
          "fg.subtle",
          "fg",
          "blue.fg",
          "green.fg",
          "red.fg",
          "orange.fg",
          "purple.fg",
        ],
      },
    ],
    generateCode: (props) => {
      const align = String(props.textAlign || "center");
      const color = String(props.color || "fg.muted");
      return `<BrandWatermark textAlign={"${align}"} color={"${color}"} />`;
    },
    renderPlayground: (props) => (
      <BrandWatermark
        textAlign={(props.textAlign as "left" | "center" | "right") || "center"}
        color={String(props.color || "fg.muted")}
      />
    ),
  },

};
