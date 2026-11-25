import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { P } from "@/design-system/components/typography/p/p";
import type { ComponentDocSpec } from "@/features/design-system-docs/types/ds-docs-spec.type";
import { Sparkle as PhosphorSparkleIcon } from "@phosphor-icons/react";

export const ICONS_DOCS: Record<string, ComponentDocSpec> = {

  app_icon: {
    key: "app_icon",
    title: "App Icon",
    category: "Icons",
    description:
      "Komponen ikon serbaguna pembungkus Phosphor, Lucide, & Tabler Icons dengan token saiz dan weight seragam.",
    importPath:
      'import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";',
    component: AppIcon,
    defaultProps: {
      size: "xl",
      color: "blue.fg",
    },
    propsSpec: [
      {
        name: "icon",
        type: "ComponentType",
        defaultValue: "PhosphorSparkleIcon",
        description:
          "Komponen SVG Icon dari Phosphor Icons, Lucide, atau Tabler Icons (wajib).",
      },
      {
        name: "size",
        type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
        defaultValue: "xl",
        description: "Ukuran ikon.",
        controlKind: "select",
        options: ["xs", "sm", "md", "lg", "xl", "2xl"],
      },
      {
        name: "color",
        type: "string",
        defaultValue: "blue.fg",
        description:
          "Warna token teks/ikon (contoh: blue.fg, fg.muted, red.solid).",
        controlKind: "select",
        options: [
          "blue.fg",
          "green.fg",
          "red.fg",
          "orange.fg",
          "purple.fg",
          "fg",
          "fg.muted",
          "fg.subtle",
        ],
      },
      {
        name: "weight",
        type: '"thin" | "light" | "regular" | "bold" | "fill" | "duotone"',
        defaultValue: "regular",
        description: "Ketebalan/varian ikon khusus Phosphor Icons.",
      },
    ],
    renderPlayground: (props) => {
      const selectedColor = (props.color as string) || "blue.fg";
      const selectedSize = (props.size as "xl") || "xl";

      return (
        <HStack gap={6}>
          <VStack gap={1} align={"center"}>
            <AppIcon
              icon={PhosphorSparkleIcon}
              weight={"regular"}
              size={selectedSize}
              color={selectedColor}
            />
            <P fontSize={"xs"} color={"fg.muted"}>
              {"regular"}
            </P>
          </VStack>

          <VStack gap={1} align={"center"}>
            <AppIcon
              icon={PhosphorSparkleIcon}
              weight={"fill"}
              size={selectedSize}
              color={selectedColor}
            />
            <P fontSize={"xs"} color={"fg.muted"}>
              {"fill"}
            </P>
          </VStack>

          <VStack gap={1} align={"center"}>
            <AppIcon
              icon={PhosphorSparkleIcon}
              weight={"duotone"}
              size={selectedSize}
              color={selectedColor}
            />
            <P fontSize={"xs"} color={"fg.muted"}>
              {"duotone"}
            </P>
          </VStack>
        </HStack>
      );
    },
  },

};
