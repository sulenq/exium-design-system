import { Url } from "@/design-system/components/typography/url/url";
import { Box } from "@/design-system/components/layout/box/box";
import { Badge } from "@/design-system/components/typography/badge/badge";
import { CountBadge } from "@/design-system/components/typography/count-badge/count-badge";
import { Heading } from "@/design-system/components/typography/heading/heading";
import { Kbd } from "@/design-system/components/typography/kbd/kbd";
import { P } from "@/design-system/components/typography/p/p";
import { RichTextEditorPresetEssential } from "@/design-system/components/typography/rich-text-editor/rich-text-editor.preset";
import { COLOR_PALETTE_OPTIONS } from "@/design-system/constants/colors";
import type { ComponentDocSpec } from "@/features/design-system-docs/types/ds-docs-spec.type";

export const TYPOGRAPHY_DOCS: Record<string, ComponentDocSpec> = {

  typography: {
    key: "typography",
    title: "P",
    category: "Typography",
    description:
      "Komponen teks standard dengan dukungan penyesuaian font size, weight, warna, serta integrasi pemotongan baris (lineClamp) dengan tooltip.",
    importPath:
      'import { P } from "@/design-system/components/typography/p/p";',
    component: P,
    defaultProps: {
      children: "Exium Design System Typography Example",
      fontSize: "md",
      fontWeight: "normal",
      color: "fg.default",
      lineClamp: undefined,
    },
    propsSpec: [
      {
        name: "children",
        type: "ReactNode",
        defaultValue: undefined,
        description: "Konten teks yang dipaparkan.",
        controlKind: "text",
      },
      {
        name: "lineClamp",
        type: "number",
        defaultValue: undefined,
        description:
          "Batas jumlah baris teks. Saat bernilai, teks otomatis terpotong dan dibungkus Tooltip.",
        controlKind: "number",
      },
      {
        name: "fontSize",
        type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
        defaultValue: "md",
        description: "Ukuran font.",
        controlKind: "select",
        options: ["xs", "sm", "md", "lg", "xl", "2xl"],
      },
      {
        name: "fontWeight",
        type: '"normal" | "medium" | "semibold" | "bold"',
        defaultValue: "normal",
        description: "Ketebalan font.",
        controlKind: "select",
        options: ["normal", "medium", "semibold", "bold"],
      },
    ],
    generateCode: (props) => {
      const childrenVal = String(
        props.children || "Exium Design System Typography Example",
      );
      const fsProp =
        props.fontSize && props.fontSize !== "md"
          ? ` fontSize={"${props.fontSize}"}`
          : "";
      const fwProp =
        props.fontWeight && props.fontWeight !== "normal"
          ? ` fontWeight={"${props.fontWeight}"}`
          : "";
      const colorProp =
        props.color && props.color !== "fg.default"
          ? ` color={"${props.color}"}`
          : "";
      const clampProp = props.lineClamp
        ? ` lineClamp={${props.lineClamp}}`
        : "";

      return `<P${fsProp}${fwProp}${colorProp}${clampProp}>\n  {"${childrenVal}"}\n</P>`;
    },
    renderPlayground: (props) => (
      <Box maxW={"300px"}>
        <P
          fontSize={
            (props.fontSize as "xs" | "sm" | "md" | "lg" | "xl" | "2xl") || "md"
          }
          fontWeight={
            (props.fontWeight as "normal" | "medium" | "semibold" | "bold") ||
            "normal"
          }
          color={props.color as string}
          lineClamp={props.lineClamp ? Number(props.lineClamp) : undefined}
        >
          {String(props.children || "Exium Design System Typography Example")}
        </P>
      </Box>
    ),
  },


  badge: {
    key: "badge",
    title: "Badge",
    category: "Typography",
    description: "Label ringkas untuk menunjukkan status, kategori, atau tag.",
    importPath:
      'import { Badge } from "@/design-system/components/typography/badge/badge";',
    component: Badge,
    defaultProps: {
      children: "Badge Label",
      variant: "subtle",
      colorPalette: "blue",
      size: "md",
    },
    propsSpec: [
      {
        name: "children",
        type: "ReactNode",
        defaultValue: undefined,
        description: "Teks atau ikon dalam badge.",
        controlKind: "text",
      },
      {
        name: "variant",
        type: '"solid" | "subtle" | "outline" | "surface"',
        defaultValue: "subtle",
        description: "Gaya tampilan badge.",
        controlKind: "select",
        options: ["solid", "subtle", "outline", "surface"],
      },
      {
        name: "colorPalette",
        type: "string",
        defaultValue: "blue",
        description: "Skema warna.",
        controlKind: "select",
        options: COLOR_PALETTE_OPTIONS,
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        defaultValue: "md",
        description: "Ukuran badge.",
        controlKind: "select",
        options: ["sm", "md", "lg"],
      },
      {
        name: "status",
        type: '"success" | "warning" | "danger" | "info" | "neutral" | "locked"',
        description:
          "Status semantik. Mengatur colorPalette dan icon, sehingga status tidak hanya dibedakan warna. Menimpa colorPalette.",
        controlKind: "select",
        options: [
          "",
          "success",
          "warning",
          "danger",
          "info",
          "neutral",
          "locked",
        ],
      },
      {
        name: "withStatusIcon",
        type: "boolean",
        defaultValue: true,
        description: "Tampilkan icon status.",
        controlKind: "boolean",
      },
    ],
  },


  heading: {
    key: "heading",
    title: "Heading",
    category: "Typography",
    description:
      "Elemen judul semantik dengan styling tegas, line-height teratur, serta dukungan lineClamp dan Tooltip.",
    importPath:
      'import { Heading } from "@/design-system/components/typography/heading/heading";',
    component: Heading,
    defaultProps: {
      children: "Exium Design System Heading",
      fontSize: "xl",
      lineClamp: undefined,
    },
    propsSpec: [
      {
        name: "children",
        type: "ReactNode",
        defaultValue: undefined,
        description: "Teks judul.",
        controlKind: "text",
      },
      {
        name: "lineClamp",
        type: "number",
        defaultValue: undefined,
        description:
          "Batas jumlah baris judul. Saat bernilai, teks otomatis terpotong dan dibungkus Tooltip.",
        controlKind: "number",
      },
      {
        name: "fontSize",
        type: '"md" | "lg" | "xl" | "2xl" | "3xl"',
        defaultValue: "xl",
        description: "Ukuran teks heading.",
        controlKind: "select",
        options: ["md", "lg", "xl", "2xl", "3xl"],
      },
    ],
    generateCode: (props) => {
      const childrenVal = String(
        props.children || "Exium Design System Heading",
      );
      const fsProp =
        props.fontSize && props.fontSize !== "xl"
          ? ` fontSize={"${props.fontSize}"}`
          : "";
      const clampProp = props.lineClamp
        ? ` lineClamp={${props.lineClamp}}`
        : "";

      return `<Heading${fsProp}${clampProp}>\n  {"${childrenVal}"}\n</Heading>`;
    },
    renderPlayground: (props) => (
      <Box maxW={"320px"}>
        <Heading
          fontSize={
            (props.fontSize as "md" | "lg" | "xl" | "2xl" | "3xl") || "xl"
          }
          lineClamp={props.lineClamp ? Number(props.lineClamp) : undefined}
        >
          {String(props.children || "Exium Design System Heading")}
        </Heading>
      </Box>
    ),
  },


  count_badge: {
    key: "count_badge",
    title: "CountBadge",
    category: "Typography",
    description:
      "Badge penghitung angka dengan pemformatan otomatis batas maksimal (misal: 99+).",
    importPath:
      'import { CountBadge } from "@/design-system/components/typography/count-badge/count-badge";',
    component: CountBadge,
    defaultProps: {
      children: 5,
      max: 99,
      size: "xs",
    },
    propsSpec: [
      {
        name: "children",
        type: "number",
        defaultValue: undefined,
        required: true,
        description:
          "Nilai angka yang ditampilkan (wajib number). Nilai di atas max akan diformat max+.",
        controlKind: "number",
      },
      {
        name: "max",
        type: "number",
        defaultValue: 99,
        description: "Batas angka maksimum sebelum format +.",
        controlKind: "number",
      },
      {
        name: "size",
        type: '"xs" | "sm" | "md"',
        defaultValue: "xs",
        description: "Ukuran badge angka.",
        controlKind: "select",
        options: ["xs", "sm", "md"],
      },
    ],
    generateCode: (
      props,
    ) => `<CountBadge max={${Number(props.max) || 99}} size={"${String(props.size || "xs")}"}>
  {${Number(props.children) || 0}}
</CountBadge>`,
    renderPlayground: (props) => (
      <CountBadge
        max={Number(props.max) || 99}
        size={(props.size as "xs" | "sm" | "md") || "xs"}
      >
        {Number(props.children) || 0}
      </CountBadge>
    ),
  },


  kbd: {
    key: "kbd",
    title: "Kbd",
    category: "Typography",
    description: "Elemen penunjuk tombol pintasan keyboard pengguna.",
    importPath:
      'import { Kbd } from "@/design-system/components/typography/kbd/kbd";',
    component: Kbd,
    defaultProps: {
      children: "Ctrl + K",
    },
    propsSpec: [
      {
        name: "children",
        type: "ReactNode",
        defaultValue: undefined,
        description: "Label tombol keyboard.",
        controlKind: "text",
      },
    ],
  },


  rich_text_editor: {
    key: "rich_text_editor",
    title: "RichTextEditor",
    category: "Typography",
    description:
      "Editor teks kaya (WYSIWYG) berbasis TipTap dengan toolbar pemformatan lengkap, heading, list, dan warna.",
    importPath:
      'import { RichTextEditorPresetEssential } from "@/design-system/components/typography/rich-text-editor/rich-text-editor.preset";',
    component: Box,
    defaultProps: {},
    propsSpec: [],
    generateCode: () => `<RichTextEditorPresetEssential />`,
    renderPlayground: () => (
      <Box w={"full"} maxW={"680px"}>
        <RichTextEditorPresetEssential />
      </Box>
    ),
  },


  url: {
    key: "url",
    title: "Url",
    category: "Typography",
    description:
      "Menampilkan URL dengan tombol salin dan tautan keluar. Teks dipotong rapi sesuai lineClamp.",
    importPath:
      'import { Url } from "@/design-system/components/typography/url/url";',
    component: Url,
    defaultProps: { url: "https://ternaqin.com/q/7KX9M2QH", lineClamp: 1 },
    propsSpec: [
      {
        name: "url",
        type: "string | null",
        defaultValue: "https://ternaqin.com/q/7KX9M2QH",
        description: "URL yang ditampilkan.",
        controlKind: "text",
      },
      {
        name: "label",
        type: "string",
        description: "Label tombol salin; default dari i18n.",
      },
      {
        name: "isExternalLink",
        type: "boolean",
        defaultValue: true,
        description: "Tampilkan tombol buka di tab baru.",
        controlKind: "boolean",
      },
      {
        name: "lineClamp",
        type: "number",
        defaultValue: 1,
        description: "Jumlah baris sebelum teks dipotong.",
        controlKind: "number",
      },
    ],
    generateCode: (props) => `<Url
  url={"${String(props.url || "")}"}
  isExternalLink={${props.isExternalLink !== false}}
  lineClamp={${Number(props.lineClamp) || 1}}
/>`,
    renderPlayground: (props) => (
      <Url
        url={String(props.url || "")}
        isExternalLink={props.isExternalLink !== false}
        lineClamp={Number(props.lineClamp) || 1}
      />
    ),
  },

};
