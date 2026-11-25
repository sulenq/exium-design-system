import { Button } from "@/design-system/components/button/button/button";
import { ButtonGroup } from "@/design-system/components/button/button-group/button-group";
import { Clipboard } from "@/design-system/components/data-display/clipboard/clipboard";
import { CloseButton } from "@/design-system/components/button/close-button/close-button";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { HStack } from "@/design-system/components/layout/flex-box/flex-box";
import { COLOR_PALETTE_OPTIONS } from "@/design-system/constants/colors";
import type { ComponentDocSpec } from "@/features/design-system-docs/types/ds-docs-spec.type";
import { SparklesIcon } from "lucide-react";

export const BUTTONS_DOCS: Record<string, ComponentDocSpec> = {

  button: {
    key: "button",
    title: "Button",
    category: "Buttons",
    description:
      "Komponen interaktif utama untuk aksi pengguna dengan variasi saiz, gaya, dan status loading.",
    importPath:
      'import { Button } from "@/design-system/components/button/button/button";\nimport { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";',
    component: Button,
    defaultProps: {
      iconPlacement: "none",
      size: "md",
      colorPalette: "blue",
      loading: false,
      disabled: false,
    },
    propsSpec: [
      {
        name: "iconPlacement",
        type: '"none" | "start" | "end"',
        defaultValue: "none",
        description: "Komposisi ikon di dalam children tombol (awal / akhir).",
        controlKind: "select",
        options: ["none", "start", "end"],
      },
      {
        name: "size",
        type: '"xs" | "sm" | "md" | "lg" | "xl"',
        defaultValue: "md",
        description: "Ukuran button.",
        controlKind: "select",
        options: ["xs", "sm", "md", "lg", "xl"],
      },
      {
        name: "colorPalette",
        type: "string",
        defaultValue: "blue",
        description: "Skema warna UI komponen.",
        controlKind: "select",
        options: COLOR_PALETTE_OPTIONS,
      },
      {
        name: "loading",
        type: "boolean",
        defaultValue: false,
        description: "Menunjukkan status pemuatan (spinner).",
        controlKind: "boolean",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: false,
        description: "Menonaktifkan interaksi button.",
        controlKind: "boolean",
      },
    ],
    generateCode: (props) => {
      const sizeProp =
        props.size && props.size !== "md" ? ` size={"${props.size}"}` : "";
      const colorProp =
        props.colorPalette && props.colorPalette !== "blue"
          ? ` colorPalette={"${props.colorPalette}"}`
          : "";
      const loadingProp = props.loading ? " loading={true}" : "";
      const disabledProp = props.disabled ? " disabled={true}" : "";
      const iconPlacement = (props.iconPlacement as string) || "none";

      if (iconPlacement === "start") {
        return `<Button variant={"solid"}${sizeProp}${colorProp}${loadingProp}${disabledProp}>\n  <AppIcon icon={SparklesIcon} />\n  {"Button"}\n</Button>`;
      }
      if (iconPlacement === "end") {
        return `<Button variant={"solid"}${sizeProp}${colorProp}${loadingProp}${disabledProp}>\n  {"Button"}\n  <AppIcon icon={SparklesIcon} />\n</Button>`;
      }
      return `<Button variant={"solid"}${sizeProp}${colorProp}${loadingProp}${disabledProp}>\n  {"Button"}\n</Button>`;
    },
    renderPlayground: (props) => {
      const variants = [
        "solid",
        "subtle",
        "outline",
        "ghost",
        "glass",
        "frosted",
        "blend",
      ] as const;
      const iconPlacement = (props.iconPlacement as string) || "none";

      const renderChildren = (variantLabel: string) => {
        if (iconPlacement === "start") {
          return (
            <>
              <AppIcon icon={SparklesIcon} />
              {variantLabel}
            </>
          );
        }
        if (iconPlacement === "end") {
          return (
            <>
              {variantLabel}
              <AppIcon icon={SparklesIcon} />
            </>
          );
        }
        return variantLabel;
      };

      return (
        <HStack gap={3} wrap={"wrap"} justify={"center"}>
          {variants.map((variant) => (
            <Button
              key={variant}
              variant={variant}
              size={(props.size as "xs" | "sm" | "md" | "lg" | "xl") || "md"}
              colorPalette={String(props.colorPalette || "blue")}
              loading={Boolean(props.loading)}
              disabled={Boolean(props.disabled)}
            >
              {renderChildren(variant)}
            </Button>
          ))}
        </HStack>
      );
    },
  },


  button_group: {
    key: "button_group",
    title: "ButtonGroup",
    category: "Buttons",
    description: "Membungkus sekumpulan Button agar menyatu secara visual.",
    importPath:
      'import { ButtonGroup } from "@/design-system/components/button/button-group/button-group";\nimport { Button } from "@/design-system/components/button/button/button";',
    component: ButtonGroup,
    defaultProps: {
      attached: true,
      size: "md",
    },
    propsSpec: [
      {
        name: "attached",
        type: "boolean",
        defaultValue: true,
        description: "Menyatukan border sudut tombol yang berdekatan.",
        controlKind: "boolean",
      },
      {
        name: "size",
        type: '"xs" | "sm" | "md" | "lg"',
        defaultValue: "md",
        description: "Ukuran untuk semua tombol di dalam grup.",
        controlKind: "select",
        options: ["xs", "sm", "md", "lg"],
      },
    ],
    generateCode: (props) => {
      const sizeProp =
        props.size && props.size !== "md" ? ` size={"${props.size}"}` : "";
      const attachedProp =
        props.attached === false ? ` attached={false}` : " attached={true}";
      return `<ButtonGroup${attachedProp}${sizeProp}>\n  <Button variant={"outline"}>{"First"}</Button>\n  <Button variant={"outline"}>{"Second"}</Button>\n  <Button variant={"outline"}>{"Third"}</Button>\n</ButtonGroup>`;
    },
    renderPlayground: (props) => (
      <ButtonGroup
        attached={Boolean(props.attached)}
        size={(props.size as "xs" | "sm" | "md" | "lg") || "md"}
      >
        <Button variant={"outline"}>First</Button>
        <Button variant={"outline"}>Second</Button>
        <Button variant={"outline"}>Third</Button>
      </ButtonGroup>
    ),
  },


  clipboard: {
    key: "clipboard",
    title: "Clipboard",
    category: "Buttons",
    description:
      "Komponen aksi salin teks satu klik ke papan klip dengan status umpan balik instan.",
    importPath:
      'import { Clipboard } from "@/design-system/components/data-display/clipboard/clipboard";',
    component: Clipboard.Root,
    defaultProps: {
      value: "https://exium.id",
      timeout: 2000,
    },
    propsSpec: [
      {
        name: "value",
        type: "string",
        defaultValue: "https://exium.id",
        required: true,
        description: "Nilai string yang akan disalin (wajib).",
        controlKind: "text",
      },
      {
        name: "timeout",
        type: "number",
        defaultValue: 2000,
        description: "Durasi status tersalin aktif dalam milidetik.",
        controlKind: "number",
      },
    ],
    generateCode: (props) => {
      const val = String(props.value || "https://exium.id");
      const timeout = Number(props.timeout) || 2000;
      const timeoutProp = timeout !== 2000 ? ` timeout={${timeout}}` : "";
      return `<Clipboard.Root value={"${val}"}${timeoutProp}>\n  <HStack gap={2}>\n    <Clipboard.Input />\n    <Clipboard.Trigger asChild>\n      <Button size={"sm"} variant={"outline"}>\n        <Clipboard.Indicator />\n        <Clipboard.CopyText />\n      </Button>\n    </Clipboard.Trigger>\n  </HStack>\n</Clipboard.Root>`;
    },
    renderPlayground: (props) => (
      <Clipboard.Root
        value={String(props.value || "https://exium.id")}
        timeout={Number(props.timeout) || 2000}
      >
        <HStack gap={2}>
          <Clipboard.Input />
          <Clipboard.Trigger asChild>
            <Button size={"sm"} variant={"outline"}>
              <Clipboard.Indicator />
              <Clipboard.CopyText />
            </Button>
          </Clipboard.Trigger>
        </HStack>
      </Clipboard.Root>
    ),
  },


  close_button: {
    key: "close_button",
    title: "CloseButton",
    category: "Buttons",
    description:
      "Tombol tutup untuk overlay dan notifikasi. Di layar sentuh, hit area otomatis minimal 48 × 48 px tanpa mengubah ukuran visual.",
    importPath:
      'import { CloseButton } from "@/design-system/components/button/close-button/close-button";',
    component: CloseButton,
    defaultProps: { size: "md" },
    propsSpec: [
      {
        name: "size",
        type: "string",
        defaultValue: "md",
        description: "Ukuran visual tombol.",
        controlKind: "select",
        options: ["2xs", "xs", "sm", "md", "lg"],
      },
      {
        name: "aria-label",
        type: "string",
        description: "Label untuk screen reader; default dari i18n.",
      },
    ],
    generateCode: (props) =>
      `<CloseButton size={"${String(props.size || "md")}"} />`,
    renderPlayground: (props) => (
      <CloseButton size={(props.size as "md") || "md"} />
    ),
  },

};
