// src/features/design-system-docs/config/components-registry.tsx

import { BrandWatermark } from "@/design-system/components/branding/brand-watermark/brand-watermark";
import { Logo } from "@/design-system/components/branding/logo/logo";
import { Button } from "@/design-system/components/button/button/button";
import { ButtonGroup } from "@/design-system/components/button/button-group/button-group";
import { Clipboard } from "@/design-system/components/data-display/clipboard/clipboard";
import { Countdown } from "@/design-system/components/data-display/countdown/countdown";
import { FileItem } from "@/design-system/components/data-display/file-item/file-item";
import { MaskedText } from "@/design-system/components/data-display/masked-text/masked-text";
import { StatGrid } from "@/design-system/components/data-display/stat-grid/stat-grid";
import { Timeline } from "@/design-system/components/data-display/timeline/timeline";
import type {
  FormattedListItem,
  FormattedTableHeader,
} from "@/design-system/components/data-display/data-view/data-view-table.type";
import type {
  DataViewBatchActionsGenerator,
  DataViewItemActionsGenerator,
} from "@/design-system/components/data-display/data-view/data-view.type";
import { DataViewFooter } from "@/design-system/components/data-display/data-view/data-view-footer";
import { DataViewTable } from "@/design-system/components/data-display/data-view/data-view-table";
import { Accordion } from "@/design-system/components/disclosure/accordion/accordion";
import { Breadcrumb } from "@/design-system/components/disclosure/breadcrumb/breadcrumb";
import { Carousel } from "@/design-system/components/disclosure/carousel/carousel";
import { Collapsible } from "@/design-system/components/disclosure/collapsible/collapsible";
import { Steps } from "@/design-system/components/disclosure/steps/steps";
import { Tabs } from "@/design-system/components/disclosure/tabs/tabs";
import type { EmojiVariant } from "@/design-system/components/emoji/emoji/emoji.type";
import { Emoji } from "@/design-system/components/emoji/emoji/emoji";
import { EmojiPoker } from "@/design-system/components/emoji/emoji/emoji.poker";
import { ConfirmationTrigger } from "@/design-system/components/feedback/confirmation-trigger/confirmation-trigger";
import { Alert } from "@/design-system/components/feedback/alert/alert";
import {
  Progress,
  ProgressRoot,
} from "@/design-system/components/feedback/progress/progress";
import { Skeleton } from "@/design-system/components/feedback/skeleton/skeleton";
import { StateNoData } from "@/design-system/components/feedback/state-no-data/state.no-data";
import { FocusAlertItem } from "@/design-system/components/focus-alert/focus-alert/focus-alert";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { Checkbox } from "@/design-system/components/input/checkbox/checkbox";
import { DateInput } from "@/design-system/components/input/date-input/date-input";
import { Field } from "@/design-system/components/input/field/field";
import { FileInput } from "@/design-system/components/input/file-input/file-input";
import { FocusSelectInput } from "@/design-system/components/input/focus-select/focus-select";
import { Input } from "@/design-system/components/input/input/input";
import { NumberInput } from "@/design-system/components/input/number-input/number-input";
import { PasswordInput } from "@/design-system/components/input/password-input/password-input";
import { PinInput } from "@/design-system/components/input/pin-input/pin-input";
import { RadioCardInput } from "@/design-system/components/input/radio-card-input/radio-card-input";
import { RadioInput } from "@/design-system/components/input/radio-input/radio-input";
import { SearchInput } from "@/design-system/components/input/search-input/search-input";
import { SegmentGroupInput } from "@/design-system/components/input/segment-group/segment-group-input";
import SelectInput from "@/design-system/components/input/select/select";
import { Slider } from "@/design-system/components/input/slider/slider";
import { Switch } from "@/design-system/components/input/switch/switch";
import { Textarea } from "@/design-system/components/input/textarea/textarea";
import { UnitInput } from "@/design-system/components/input/unit-input/unit-input";
import type { UnitQuantity } from "@/design-system/constants/types/units.type";
import { Box } from "@/design-system/components/layout/box/box";
import { Card } from "@/design-system/components/layout/card/card";
import { Container } from "@/design-system/components/layout/container/container";
import {
  HStack,
  VStack,
} from "@/design-system/components/layout/flex-box/flex-box";
import { SimpleGrid } from "@/design-system/components/layout/grid/grid";
import { Separator } from "@/design-system/components/layout/separator/separator";
import { Avatar } from "@/design-system/components/media/avatar/avatar";
import { Image } from "@/design-system/components/media/image/image";
import { ExternalLink } from "@/design-system/components/navigation/link/link";
import { Sidebar } from "@/design-system/components/navigation/sidebar/sidebar";
import { VNavs } from "@/design-system/components/navigation/v-navs/v-navs";
import { VScrollContainer } from "@/design-system/components/layout/scroll-container/scroll-container";
import { useThemeStore } from "@/design-system/stores/theme-store";
import type { NavGroup, NavItem } from "@/shared/types/nav.type";
import { usePopModal } from "@/design-system/components/overlay/hooks/use-pop-modal";
import { Dialog } from "@/design-system/components/overlay/dialog/dialog";
import { Drawer } from "@/design-system/components/overlay/drawer/drawer";
import { Menu } from "@/design-system/components/overlay/menu/menu";
import { Modal } from "@/design-system/components/overlay/modal/modal";
import { Popover } from "@/design-system/components/overlay/popover/popover";
import { Tooltip } from "@/design-system/components/overlay/tooltip/tooltip";
import { toast } from "@/design-system/components/toast";
import { Badge } from "@/design-system/components/typography/badge/badge";
import { CountBadge } from "@/design-system/components/typography/count-badge/count-badge";
import { Heading } from "@/design-system/components/typography/heading/heading";
import { Kbd } from "@/design-system/components/typography/kbd/kbd";
import { ClampedP, P } from "@/design-system/components/typography/p/p";
import { RichTextEditorPresetEssential } from "@/design-system/components/typography/rich-text-editor/rich-text-editor.preset";
import { Span } from "@/design-system/components/typography/span/span";
import { DownloadTrigger } from "@/design-system/components/utilities/download-trigger/download-trigger";
import { COLOR_PALETTE_OPTIONS } from "@/design-system/constants/colors";
import type {
  ComponentDocSpec,
  TableDemoItem,
} from "@/features/design-system-docs/types/ds-docs-spec.type";
import {
  ChevronDownIcon,
  EditIcon,
  EyeIcon,
  FolderIcon,
  HomeIcon,
  LayersIcon,
  SettingsIcon,
  SparklesIcon,
  Trash2Icon,
  UserIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { Sparkle as PhosphorSparkleIcon } from "@phosphor-icons/react";

export const COMPONENTS_REGISTRY: Record<string, ComponentDocSpec> = {
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
    },
    propsSpec: [
      {
        name: "boxSize",
        type: "number",
        defaultValue: 32,
        description: "Ukuran dimensi logo dalam pixel.",
        controlKind: "number",
      },
    ],
    renderPlayground: (props) => <Logo boxSize={Number(props.boxSize) || 32} />,
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
    renderPlayground: (props) => (
      <BrandWatermark
        textAlign={(props.textAlign as "left" | "center" | "right") || "center"}
        color={String(props.color || "fg.muted")}
      />
    ),
  },

  button: {
    key: "button",
    title: "Button",
    category: "Buttons & Actions",
    description:
      "Komponen interaktif utama untuk aksi pengguna dengan variasi saiz, gaya, dan status loading.",
    importPath:
      'import { Button } from "@/design-system/components/button/button/button";\nimport { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";',
    component: Button,
    defaultProps: {
      label: "Button",
      iconPlacement: "none",
      size: "md",
      colorPalette: "blue",
      loading: false,
      disabled: false,
    },
    propsSpec: [
      {
        name: "label",
        type: "string",
        defaultValue: "Button",
        description: "Teks label tombol.",
        controlKind: "text",
      },
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
      const label = String(props.label || "Button");
      const iconPlacement = (props.iconPlacement as string) || "none";

      if (iconPlacement === "start") {
        return `<Button variant={"solid"}${sizeProp}${colorProp}${loadingProp}${disabledProp}>\n  <AppIcon icon={SparklesIcon} />\n  {"${label}"}\n</Button>`;
      }
      if (iconPlacement === "end") {
        return `<Button variant={"solid"}${sizeProp}${colorProp}${loadingProp}${disabledProp}>\n  {"${label}"}\n  <AppIcon icon={SparklesIcon} />\n</Button>`;
      }
      return `<Button variant={"solid"}${sizeProp}${colorProp}${loadingProp}${disabledProp}>\n  {"${label}"}\n</Button>`;
    },
    renderPlayground: (props) => {
      const variants = ["solid", "subtle", "outline", "ghost"] as const;
      const label = String(props.label || "Button");
      const iconPlacement = (props.iconPlacement as string) || "none";

      const renderChildren = () => {
        if (iconPlacement === "start") {
          return (
            <>
              <AppIcon icon={SparklesIcon} />
              {label}
            </>
          );
        }
        if (iconPlacement === "end") {
          return (
            <>
              {label}
              <AppIcon icon={SparklesIcon} />
            </>
          );
        }
        return label;
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
              {renderChildren()}
            </Button>
          ))}
        </HStack>
      );
    },
  },

  button_group: {
    key: "button_group",
    title: "ButtonGroup",
    category: "Buttons & Actions",
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

  typography: {
    key: "typography",
    title: "Typography (P)",
    category: "Typography & Display",
    description:
      "Komponen teks standard dengan dukungan penyesuaian font size, weight, dan warna.",
    importPath:
      'import { ClampedP, P } from "@/design-system/components/typography/p/p";',
    component: P,
    defaultProps: {
      children: "Exium Design System Typography Example",
      fontSize: "md",
      fontWeight: "normal",
      color: "fg.default",
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
  },

  badge: {
    key: "badge",
    title: "Badge",
    category: "Typography & Display",
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
    ],
  },

  heading: {
    key: "heading",
    title: "Heading",
    category: "Typography & Display",
    description:
      "Elemen judul semantik dengan styling tegas dan line-height teratur.",
    importPath:
      'import { Heading } from "@/design-system/components/typography/heading/heading";',
    component: Heading,
    defaultProps: {
      children: "Exium Design System Heading",
      fontSize: "xl",
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
        name: "fontSize",
        type: '"md" | "lg" | "xl" | "2xl" | "3xl"',
        defaultValue: "xl",
        description: "Ukuran teks heading.",
        controlKind: "select",
        options: ["md", "lg", "xl", "2xl", "3xl"],
      },
    ],
  },

  count_badge: {
    key: "count_badge",
    title: "CountBadge",
    category: "Typography & Display",
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
    category: "Typography & Display",
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
    category: "Typography & Display",
    description:
      "Editor teks kaya (WYSIWYG) berbasis TipTap dengan toolbar pemformatan lengkap, heading, list, dan warna.",
    importPath:
      'import { RichTextEditorPresetEssential } from "@/design-system/components/typography/rich-text-editor/rich-text-editor.preset";',
    component: Box,
    defaultProps: {},
    propsSpec: [],
    renderPlayground: () => (
      <Box w={"full"} maxW={"680px"}>
        <RichTextEditorPresetEssential />
      </Box>
    ),
  },

  input: {
    key: "input",
    title: "Input",
    category: "Form Inputs",
    description:
      "Input teks standar dengan validasi native maxLength dan integrasi toast peringatan.",
    importPath:
      'import { Input } from "@/design-system/components/input/input/input";',
    component: Input,
    defaultProps: {
      placeholder: "Enter text here...",
      size: "md",
      maxLength: 20,
      disabled: false,
    },
    propsSpec: [
      {
        name: "placeholder",
        type: "string",
        defaultValue: undefined,
        description: "Teks placeholder saat input kosong.",
        controlKind: "text",
      },
      {
        name: "size",
        type: '"xs" | "sm" | "md" | "lg"',
        defaultValue: "md",
        description: "Ukuran field input.",
        controlKind: "select",
        options: ["xs", "sm", "md", "lg"],
      },
      {
        name: "maxLength",
        type: "number",
        defaultValue: 20,
        description:
          "Batas karakter maksimal (akan memunculkan toast notifikasi bila dilewati).",
        controlKind: "number",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: false,
        description: "Menonaktifkan input.",
        controlKind: "boolean",
      },
    ],
    renderPlayground: (props) => (
      <Box w={"260px"}>
        <Input
          placeholder={props.placeholder as string}
          size={(props.size as "xs" | "sm" | "md" | "lg") || "md"}
          maxLength={Number(props.maxLength) || 20}
          disabled={Boolean(props.disabled)}
        />
      </Box>
    ),
  },

  unit_input: {
    key: "unit_input",
    title: "UnitInput",
    category: "Form Inputs",
    description:
      "Kontrol formulir terintegrasi untuk memasukkan besaran fisik (angka + satuan unit seperti kg, °C, ha) dengan konversi otomatis, borderless stepper, dan dukungan 15 kuantitas ISO 80000.",
    importPath:
      'import { UnitInput } from "@/design-system/components/input/unit-input/unit-input";',
    component: UnitInput,
    defaultProps: {
      quantity: "mass",
      unitChangeBehavior: "keep",
      defaultValue: "5",
      stepper: true,
      disabled: false,
    },
    propsSpec: [
      {
        name: "quantity",
        type: '"mass" | "length" | "area" | "volume" | "temperature" | "duration" | "speed" | "data" | "pressure" | "energy" | "power" | "angle" | "frequency" | "force" | "count"',
        defaultValue: "mass",
        description: "Besaran fisik yang diukur (kuantitas fisik ISO 80000).",
        controlKind: "select",
        options: [
          "mass",
          "length",
          "area",
          "volume",
          "temperature",
          "duration",
          "speed",
          "data",
          "pressure",
          "energy",
          "power",
          "angle",
          "frequency",
          "force",
          "count",
        ],
      },
      {
        name: "unitChangeBehavior",
        type: '"keep" | "convert"',
        defaultValue: "keep",
        description:
          "Perilaku saat pengguna mengubah unit: keep (angka tetap) atau convert (angka dikonversi secara matematis).",
        controlKind: "select",
        options: ["keep", "convert"],
      },
      {
        name: "defaultValue",
        type: "string",
        defaultValue: "5",
        description: "Nilai awal dalam angka string.",
        controlKind: "text",
      },
      {
        name: "stepper",
        type: "boolean",
        defaultValue: true,
        description: "Tampilkan stepper tombol naik / turun tanpa outline.",
        controlKind: "boolean",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: false,
        description: "Status nonaktif kontrol input.",
        controlKind: "boolean",
      },
    ],
    generateCode: (props) => {
      const q = (props.quantity as string) || "mass";
      const b = (props.unitChangeBehavior as string) || "keep";
      const stepperProp = props.stepper === false ? ` stepper={false}` : "";
      const disabledProp = props.disabled ? ` disabled={true}` : "";
      return `<UnitInput\n  quantity={"${q}"}\n  unitChangeBehavior={"${b}"}\n  defaultValue={"${props.defaultValue || "5"}"}${stepperProp}${disabledProp}\n  onValueChange={(val) => console.log(val)}\n/>`;
    },
    renderPlayground: (props) => (
      <Box w={"280px"}>
        <UnitInput
          quantity={(props.quantity as UnitQuantity) || "mass"}
          unitChangeBehavior={
            (props.unitChangeBehavior as "keep" | "convert") || "keep"
          }
          defaultValue={String(props.defaultValue ?? "5")}
          stepper={props.stepper !== false}
          disabled={Boolean(props.disabled)}
        />
      </Box>
    ),
  },

  number_input: {
    key: "number_input",
    title: "NumberInput",
    category: "Form Inputs",
    description:
      "Input angka terstruktur dengan tombol stepper stepper atas/bawah, min/max limiter, dan format angka.",
    importPath:
      'import { NumberInput } from "@/design-system/components/input/number-input/number-input";',
    component: NumberInput,
    defaultProps: {
      value: 10,
      min: 0,
      max: 100,
      step: 1,
      size: "md",
      disabled: false,
    },
    propsSpec: [
      {
        name: "value",
        type: "number",
        defaultValue: undefined,
        description: "Nilai numerik saat ini.",
        controlKind: "number",
      },
      {
        name: "min",
        type: "number",
        defaultValue: 0,
        description: "Nilai minimum batas input.",
        controlKind: "number",
      },
      {
        name: "max",
        type: "number",
        defaultValue: 100,
        description: "Nilai maksimum batas input.",
        controlKind: "number",
      },
      {
        name: "step",
        type: "number",
        defaultValue: 1,
        description: "Besaran perubahan per klik stepper.",
        controlKind: "number",
      },
      {
        name: "size",
        type: '"xs" | "sm" | "md" | "lg"',
        defaultValue: "md",
        description: "Ukuran visual komponen.",
        controlKind: "select",
        options: ["xs", "sm", "md", "lg"],
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: false,
        description: "Menonaktifkan kontrol number input.",
        controlKind: "boolean",
      },
    ],
    renderPlayground: (props, onPropChange) => (
      <Box w={"260px"}>
        <NumberInput
          value={String(props.value ?? "10")}
          min={Number(props.min) || 0}
          max={Number(props.max) || 100}
          step={Number(props.step) || 1}
          size={(props.size as "xs" | "sm" | "md" | "lg") || "md"}
          disabled={Boolean(props.disabled)}
          onValueChange={(details) => onPropChange?.("value", details.value)}
        />
      </Box>
    ),
  },

  password_input: {
    key: "password_input",
    title: "PasswordInput",
    category: "Form Inputs",
    description:
      "Input kata laluan aman dengan tombol toggle visibilitas show/hide terintegrasi.",
    importPath:
      'import { PasswordInput } from "@/design-system/components/input/password-input/password-input";',
    component: PasswordInput,
    defaultProps: {
      placeholder: "Enter secret password...",
      size: "md",
      disabled: false,
    },
    propsSpec: [
      {
        name: "placeholder",
        type: "string",
        defaultValue: undefined,
        description: "Teks placeholder saat field kosong.",
        controlKind: "text",
      },
      {
        name: "size",
        type: '"xs" | "sm" | "md" | "lg"',
        defaultValue: "md",
        description: "Ukuran field password.",
        controlKind: "select",
        options: ["xs", "sm", "md", "lg"],
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: false,
        description: "Menonaktifkan field password.",
        controlKind: "boolean",
      },
    ],
    renderPlayground: (props) => (
      <Box w={"260px"}>
        <PasswordInput {...props} />
      </Box>
    ),
  },

  select: {
    key: "select",
    title: "Select Input",
    category: "Form Inputs",
    description:
      "Komponen dropdown pilihan tunggal dengan portalling, filter, dan dukungan startElement.",
    importPath:
      'import SelectInput from "@/design-system/components/input/select/select";',
    component: SelectInput,
    defaultProps: {
      placeholder: "Pilih status...",
      size: "md",
      disabled: false,
    },
    propsSpec: [
      {
        name: "placeholder",
        type: "string",
        defaultValue: undefined,
        description: "Placeholder saat belum memilih opsi.",
        controlKind: "text",
      },
      {
        name: "size",
        type: '"xs" | "sm" | "md" | "lg" | "xl"',
        defaultValue: "md",
        description: "Ukuran tombol trigger select.",
        controlKind: "select",
        options: ["xs", "sm", "md", "lg", "xl"],
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: false,
        description: "Menonaktifkan input select.",
        controlKind: "boolean",
      },
    ],
    renderPlayground: (props) => <SelectPlaygroundDemo {...props} />,
  },

  focus_select: {
    key: "focus_select",
    title: "Focus Select Input",
    category: "Form Inputs",
    description:
      "Input pemilihan interaktif modal terfokus dengan search realtime dan dynamic custom option.",
    importPath:
      'import { FocusSelectInput } from "@/design-system/components/input/focus-select/focus-select";',
    component: FocusSelectInput,
    defaultProps: {
      placeholder: "Pilih kategori...",
      size: "md",
      clearable: true,
      disabled: false,
    },
    generateCode: (props) => {
      const propList: string[] = ['modalKey={"kategori-select"}'];
      if (props.placeholder && props.placeholder !== "Pilih kategori...") {
        propList.push(`placeholder={"${props.placeholder}"}`);
      } else {
        propList.push('placeholder={"Pilih kategori..."}');
      }
      if (props.size && props.size !== "md") {
        propList.push(`size={"${props.size}"}`);
      }
      if (props.clearable === false) {
        propList.push("clearable={false}");
      }
      if (props.disabled) {
        propList.push("disabled={true}");
      }
      if (props.isFetching) {
        propList.push("isFetching={true}");
      }
      if (props.isError) {
        propList.push("isError={true}");
      }

      return `<FocusSelectInput
  ${propList.join("\n  ")}
  options={[
    { label: "Bidang Tanah", value: "bidang", description: "Lapisan persil bidang tanah" },
    { label: "Batas Wilayah", value: "wilayah", description: "Batas administrasi daerah" },
    { label: "Zona Nilai Tanah", value: "znt", description: "Pemetaan valuasi spasial" },
  ]}
  onValueChange={(val) => console.log(val)}
/>`;
    },
    propsSpec: [
      {
        name: "placeholder",
        type: "string",
        defaultValue: undefined,
        description: "Placeholder trigger.",
        controlKind: "text",
      },
      {
        name: "size",
        type: '"xs" | "sm" | "md" | "lg" | "xl"',
        defaultValue: "md",
        description: "Ukuran field focus select.",
        controlKind: "select",
        options: ["xs", "sm", "md", "lg", "xl"],
      },
      {
        name: "clearable",
        type: "boolean",
        defaultValue: true,
        description: "Menampilkan tombol hapus pilihan.",
        controlKind: "boolean",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: false,
        description: "Menonaktifkan input.",
        controlKind: "boolean",
      },
      {
        name: "isFetching",
        type: "boolean",
        defaultValue: false,
        description: "Status memuat opsi (loading/fetching).",
        controlKind: "boolean",
      },
      {
        name: "isError",
        type: "boolean",
        defaultValue: false,
        description: "Status gagal memuat opsi, merender StateRetry.",
        controlKind: "boolean",
      },
    ],
    renderPlayground: (props) => <FocusSelectPlaygroundDemo {...props} />,
  },

  checkbox: {
    key: "checkbox",
    title: "Checkbox",
    category: "Form Inputs",
    description: "Elemen kotak pilihan tunggal atau ganda.",
    importPath:
      'import { Checkbox } from "@/design-system/components/input/checkbox/checkbox";',
    component: Checkbox,
    defaultProps: {
      children: "Accept Terms & Conditions",
      colorPalette: "blue",
      disabled: false,
    },
    propsSpec: [
      {
        name: "children",
        type: "ReactNode",
        defaultValue: undefined,
        description: "Label checkbox.",
        controlKind: "text",
      },
      {
        name: "colorPalette",
        type: "string",
        defaultValue: "blue",
        description: "Warna saat ditandai.",
        controlKind: "select",
        options: COLOR_PALETTE_OPTIONS,
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: false,
        description: "Menonaktifkan checkbox.",
        controlKind: "boolean",
      },
    ],
  },

  switch: {
    key: "switch",
    title: "Switch",
    category: "Form Inputs",
    description: "Toggle switch dua status (On/Off).",
    importPath:
      'import { Switch } from "@/design-system/components/input/switch/switch";',
    component: Switch,
    defaultProps: {
      children: "Enable Notifications",
      colorPalette: "blue",
      size: "md",
      disabled: false,
    },
    propsSpec: [
      {
        name: "children",
        type: "ReactNode",
        defaultValue: undefined,
        description: "Label sakelar switch.",
        controlKind: "text",
      },
      {
        name: "colorPalette",
        type: "string",
        defaultValue: "blue",
        description: "Warna saat aktif.",
        controlKind: "select",
        options: COLOR_PALETTE_OPTIONS,
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        defaultValue: "md",
        description: "Ukuran tombol switch.",
        controlKind: "select",
        options: ["sm", "md", "lg"],
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: false,
        description: "Menonaktifkan switch.",
        controlKind: "boolean",
      },
    ],
  },

  textarea: {
    key: "textarea",
    title: "Textarea",
    category: "Form Inputs",
    description:
      "Bidang input teks multi-baris dengan perlindungan gradien floating label dan notifikasi batas karakter.",
    importPath:
      'import { Textarea } from "@/design-system/components/input/textarea/textarea";',
    component: Textarea,
    defaultProps: {
      placeholder: "Tuliskan keterangan di sini...",
      disabled: false,
    },
    propsSpec: [
      {
        name: "placeholder",
        type: "string",
        defaultValue: undefined,
        description: "Placeholder textarea.",
        controlKind: "text",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: false,
        description: "Menonaktifkan textarea.",
        controlKind: "boolean",
      },
    ],
    renderPlayground: (props) => (
      <Box w={"340px"}>
        <Textarea {...props} />
      </Box>
    ),
  },

  radio_input: {
    key: "radio_input",
    title: "Radio Input",
    category: "Form Inputs",
    description: "Pilihan opsi tunggal eksklusif dengan radio group styling.",
    importPath:
      'import { RadioInput } from "@/design-system/components/input/radio-input/radio-input";',
    component: RadioInput,
    defaultProps: {
      defaultValue: "opt1",
      colorPalette: "blue",
      size: "md",
      disabled: false,
    },
    propsSpec: [
      {
        name: "colorPalette",
        type: "string",
        defaultValue: "blue",
        description: "Skema warna radio button saat terpilih.",
        controlKind: "select",
        options: COLOR_PALETTE_OPTIONS,
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        defaultValue: "md",
        description: "Ukuran radio button.",
        controlKind: "select",
        options: ["sm", "md", "lg"],
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: false,
        description: "Menonaktifkan semua opsi radio input.",
        controlKind: "boolean",
      },
    ],
    renderPlayground: (props) => (
      <RadioInput
        defaultValue={"opt1"}
        colorPalette={props.colorPalette as string}
        size={(props.size as "sm" | "md" | "lg") || "md"}
        disabled={Boolean(props.disabled)}
        options={[
          { value: "opt1", label: "Option 1" },
          { value: "opt2", label: "Option 2" },
          { value: "opt3", label: "Option 3" },
        ]}
      />
    ),
  },

  radio_card: {
    key: "radio_card",
    title: "Radio Card",
    category: "Form Inputs",
    description:
      "Pilihan opsi berbentuk kartu interaktif dengan border dan indikator terintegrasi.",
    importPath:
      'import { RadioCardInput } from "@/design-system/components/input/radio-card-input/radio-card-input";',
    component: RadioCardInput.Root,
    defaultProps: {
      defaultValue: "standard",
      colorPalette: "blue",
      size: "md",
      disabled: false,
    },
    propsSpec: [
      {
        name: "colorPalette",
        type: "string",
        defaultValue: "blue",
        description: "Skema warna border dan aksen saat kartu terpilih.",
        controlKind: "select",
        options: COLOR_PALETTE_OPTIONS,
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        defaultValue: "md",
        description: "Ukuran kartu radio card.",
        controlKind: "select",
        options: ["sm", "md", "lg"],
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: false,
        description: "Menonaktifkan kartu radio card.",
        controlKind: "boolean",
      },
    ],
    renderPlayground: (props) => (
      <RadioCardInput.Root
        defaultValue={"standard"}
        colorPalette={props.colorPalette as string}
        size={(props.size as "sm" | "md" | "lg") || "md"}
        disabled={Boolean(props.disabled)}
        maxW={"420px"}
        w={"full"}
      >
        <HStack gap={3} w={"full"}>
          <RadioCardInput.Item value={"standard"} flex={1} p={3}>
            <RadioCardInput.ItemText>
              <P fontWeight={"semibold"} fontSize={"sm"}>
                Standard
              </P>
              <P fontSize={"xs"} color={"fg.muted"}>
                Fitur esensial
              </P>
            </RadioCardInput.ItemText>
          </RadioCardInput.Item>
          <RadioCardInput.Item value={"pro"} flex={1} p={3}>
            <RadioCardInput.ItemText>
              <P fontWeight={"semibold"} fontSize={"sm"}>
                Enterprise
              </P>
              <P fontSize={"xs"} color={"fg.muted"}>
                Akses menyeluruh
              </P>
            </RadioCardInput.ItemText>
          </RadioCardInput.Item>
        </HStack>
      </RadioCardInput.Root>
    ),
  },

  segment_group: {
    key: "segment_group",
    title: "Segment Group",
    category: "Form Inputs",
    description:
      "Kontrol tersegmentasi horizontal bergaya tab switcher untuk pilihan cepat.",
    importPath:
      'import { SegmentGroupInput } from "@/design-system/components/input/segment-group/segment-group-input";',
    component: SegmentGroupInput,
    defaultProps: {
      defaultValue: "grid",
      colorPalette: "blue",
      size: "md",
      disabled: false,
    },
    propsSpec: [
      {
        name: "colorPalette",
        type: "string",
        defaultValue: "blue",
        description: "Skema warna indikator aktif.",
        controlKind: "select",
        options: COLOR_PALETTE_OPTIONS,
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        defaultValue: "md",
        description: "Ukuran tombol segment control.",
        controlKind: "select",
        options: ["sm", "md", "lg"],
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: false,
        description: "Menonaktifkan kontrol segment group.",
        controlKind: "boolean",
      },
    ],
    renderPlayground: (props) => (
      <SegmentGroupInput
        defaultValue={"grid"}
        colorPalette={props.colorPalette as string}
        size={(props.size as "sm" | "md" | "lg") || "md"}
        disabled={Boolean(props.disabled)}
        options={[
          { value: "list", label: "List View" },
          { value: "grid", label: "Grid View" },
          { value: "map", label: "Map View" },
        ]}
      />
    ),
  },

  slider: {
    key: "slider",
    title: "Slider",
    category: "Form Inputs",
    description:
      "Kontrol penggeser numerik dengan thumb interaktif dan rentang nilai presisi.",
    importPath:
      'import { Slider } from "@/design-system/components/input/slider/slider";',
    component: Slider,
    defaultProps: {
      defaultValue: [40],
      min: 0,
      max: 100,
      step: 5,
    },
    propsSpec: [
      {
        name: "min",
        type: "number",
        defaultValue: 0,
        description: "Nilai minimum slider.",
        controlKind: "number",
      },
      {
        name: "max",
        type: "number",
        defaultValue: 100,
        description: "Nilai maksimum slider.",
        controlKind: "number",
      },
    ],
    renderPlayground: (props) => (
      <Box w={"280px"}>
        <Slider
          defaultValue={[40]}
          min={Number(props.min) || 0}
          max={Number(props.max) || 100}
          showValue
          label={"Volume / Ukuran"}
        />
      </Box>
    ),
  },

  pin_input: {
    key: "pin_input",
    title: "Pin Input",
    category: "Form Inputs",
    description:
      "Input digit kode OTP / PIN keamanan dengan fokus otomatis per kotak digit.",
    importPath:
      'import { PinInput } from "@/design-system/components/input/pin-input/pin-input";',
    component: PinInput,
    defaultProps: {
      count: 4,
      mask: false,
    },
    propsSpec: [
      {
        name: "count",
        type: "number",
        defaultValue: 4,
        description: "Jumlah kotak digit input.",
        controlKind: "number",
      },
      {
        name: "mask",
        type: "boolean",
        defaultValue: false,
        description: "Menyembunyikan angka PIN (password mode).",
        controlKind: "boolean",
      },
    ],
    renderPlayground: (props) => (
      <PinInput count={Number(props.count) || 4} mask={Boolean(props.mask)} />
    ),
  },

  search_input: {
    key: "search_input",
    title: "Search Input",
    category: "Form Inputs",
    description:
      "Input pencarian terintegrasi dengan icon kaca pembesar dan tombol reset cepat.",
    importPath:
      'import { SearchInput } from "@/design-system/components/input/search-input/search-input";',
    component: SearchInput,
    defaultProps: {
      placeholder: "Cari data di sini...",
      size: "md",
    },
    propsSpec: [
      {
        name: "placeholder",
        type: "string",
        defaultValue: undefined,
        description: "Teks bantuan pencarian.",
        controlKind: "text",
      },
      {
        name: "size",
        type: '"xs" | "sm" | "md" | "lg"',
        defaultValue: "md",
        description: "Ukuran kotak pencarian.",
        controlKind: "select",
        options: ["xs", "sm", "md", "lg"],
      },
    ],
    renderPlayground: (props) => (
      <Box w={"280px"}>
        <SearchInput
          placeholder={String(props.placeholder || "Cari data di sini...")}
          size={(props.size as "xs" | "sm" | "md" | "lg") || "md"}
        />
      </Box>
    ),
  },

  field: {
    key: "field",
    title: "Field & Fieldset",
    category: "Form Inputs",
    description:
      "Wrapper form terintegrasi dengan label mengambang, helper text, error handling, dan tag optional.",
    importPath:
      'import { Field } from "@/design-system/components/input/field/field";',
    component: Field,
    defaultProps: {
      label: "Nama Lengkap",
      helperText: "Sesuai dengan KTP",
      optional: false,
    },
    propsSpec: [
      {
        name: "label",
        type: "string",
        defaultValue: undefined,
        description: "Label field.",
        controlKind: "text",
      },
      {
        name: "helperText",
        type: "string",
        defaultValue: undefined,
        description: "Pesan pembantu di bawah field.",
        controlKind: "text",
      },
      {
        name: "optional",
        type: "boolean",
        defaultValue: false,
        description: "Tampilkan badge Optional.",
        controlKind: "boolean",
      },
    ],
    renderPlayground: (props) => (
      <Box w={"300px"}>
        <Field
          label={String(props.label || "Label")}
          helperText={String(props.helperText || "")}
          optional={Boolean(props.optional)}
        >
          <Input placeholder={"Ketikkan teks..."} />
        </Field>
      </Box>
    ),
  },

  file_input: {
    key: "file_input",
    title: "FileInput",
    category: "Form Inputs",
    description:
      "Komponen unggah berkas fleksibel dengan mode dropzone area seret-lepas atau tombol trigger.",
    importPath:
      'import { FileInput } from "@/design-system/components/input/file-input/file-input";',
    component: FileInput,
    defaultProps: {
      variant: "dropzone",
      maxFiles: 3,
      disabled: false,
    },
    propsSpec: [
      {
        name: "variant",
        type: '"dropzone" | "button" | "auto"',
        defaultValue: "dropzone",
        description:
          "Bentuk antarmuka input berkas (area seret-lepas atau tombol aksi).",
        controlKind: "select",
        options: ["dropzone", "button", "auto"],
      },
      {
        name: "maxFiles",
        type: "number",
        defaultValue: 3,
        description: "Batas jumlah maksimum berkas yang dapat diunggah.",
        controlKind: "number",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: false,
        description: "Menonaktifkan input berkas.",
        controlKind: "boolean",
      },
    ],
    renderPlayground: (props) => (
      <Box w={"full"} maxW={"420px"}>
        <FileInput
          variant={
            (props.variant as "dropzone" | "button" | "auto") || "dropzone"
          }
          maxFiles={Number(props.maxFiles) || 3}
          disabled={Boolean(props.disabled)}
          accept={[".jpeg", ".jpg", ".png", ".pdf"]}
        />
      </Box>
    ),
  },

  date_input: {
    key: "date_input",
    title: "DateInput",
    category: "Form Inputs",
    description:
      "Bidang input tanggal terintegrasi modal kalender interaktif dengan pemilihan tahun, bulan, dan hari.",
    importPath:
      'import { DateInput } from "@/design-system/components/input/date-input/date-input";',
    component: DateInput,
    defaultProps: {
      datePickerSubtitle: "Pilih tanggal jadwal",
      disabled: false,
    },
    propsSpec: [
      {
        name: "datePickerSubtitle",
        type: "string",
        defaultValue: "Pilih tanggal jadwal",
        description: "Subjudul penjelasan pada modal kalender.",
        controlKind: "text",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: false,
        description: "Menonaktifkan pemilihan tanggal.",
        controlKind: "boolean",
      },
    ],
    renderPlayground: (props) => (
      <Box w={"280px"}>
        <DateInput
          modalKey={"docs-date-input"}
          disabled={Boolean(props.disabled)}
          datePickerSubtitle={String(
            props.datePickerSubtitle || "Pilih tanggal jadwal",
          )}
        />
      </Box>
    ),
  },

  progress: {
    key: "progress",
    title: "Progress",
    category: "Feedback & Status",
    description: "Bar kemajuan untuk indikator proses dan loading.",
    importPath:
      'import { Progress } from "@/design-system/components/feedback/progress/progress";',
    component: ProgressRoot,
    defaultProps: {
      value: 65,
      colorPalette: "blue",
      size: "md",
      animated: false,
    },
    propsSpec: [
      {
        name: "value",
        type: "number",
        defaultValue: undefined,
        description: "Nilai kemajuan (0-100).",
        controlKind: "number",
      },
      {
        name: "colorPalette",
        type: "string",
        defaultValue: "blue",
        description: "Skema warna progress bar.",
        controlKind: "select",
        options: COLOR_PALETTE_OPTIONS,
      },
      {
        name: "size",
        type: '"xs" | "sm" | "md" | "lg"',
        defaultValue: "md",
        description: "Ketebalan progress bar.",
        controlKind: "select",
        options: ["xs", "sm", "md", "lg"],
      },
      {
        name: "animated",
        type: "boolean",
        defaultValue: false,
        description: "Animasi garis bergaris (striped animation).",
        controlKind: "boolean",
      },
    ],
    renderPlayground: (props) => (
      <Box w={"320px"}>
        <Progress.Root
          value={Number(props.value) || 0}
          colorPalette={props.colorPalette as string}
          size={(props.size as "xs" | "sm" | "md" | "lg") || "md"}
          striped={Boolean(props.animated)}
          animated={Boolean(props.animated)}
        >
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>
      </Box>
    ),
  },

  skeleton: {
    key: "skeleton",
    title: "Skeleton",
    category: "Feedback & Status",
    description:
      "Placeholder pemuatan konten visual saat data sedang di-fetch secara asinkron.",
    importPath:
      'import { Skeleton } from "@/design-system/components/feedback/skeleton/skeleton";',
    component: Skeleton,
    defaultProps: {
      loaded: false,
      variant: "shine",
    },
    propsSpec: [
      {
        name: "loaded",
        type: "boolean",
        defaultValue: false,
        description:
          "Status pemuatan. Saat bernilai true, skeleton menghilang dan menampilkan data asli.",
        controlKind: "boolean",
      },
      {
        name: "variant",
        type: '"shine" | "pulse"',
        defaultValue: "shine",
        description: "Gaya animasi shimmer skeleton.",
        controlKind: "select",
        options: ["shine", "pulse"],
      },
    ],
    renderPlayground: (props) => {
      const isLoaded = Boolean(props.loaded);
      const variant = (props.variant as "shine" | "pulse") || "shine";

      return (
        <Box
          w={"340px"}
          p={4}
          rounded={"lg"}
          border={"1px solid"}
          borderColor={"border.subtle"}
        >
          <HStack gap={4} align={"center"}>
            <Skeleton
              w={"48px"}
              h={"48px"}
              rounded={"full"}
              loaded={isLoaded}
              variant={variant}
            >
              <Box
                w={"48px"}
                h={"48px"}
                rounded={"full"}
                bg={"blue.solid"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <P color={"white"} fontWeight={"bold"} fontSize={"sm"}>
                  EX
                </P>
              </Box>
            </Skeleton>

            <VStack align={"stretch"} gap={isLoaded ? "2xs" : "xs"} flex={1}>
              <Skeleton
                h={"16px"}
                w={"70%"}
                rounded={"sm"}
                loaded={isLoaded}
                variant={variant}
              >
                <P fontWeight={"semibold"} fontSize={"sm"}>
                  Exium Senior Member
                </P>
              </Skeleton>

              <Skeleton
                h={"16px"}
                w={"90%"}
                rounded={"sm"}
                loaded={isLoaded}
                variant={variant}
              >
                <P fontSize={"xs"} color={"fg.muted"}>
                  Software Engineer & Architect
                </P>
              </Skeleton>
            </VStack>
          </HStack>

          <Box
            mt={4}
            pt={3}
            borderTop={"1px solid"}
            borderColor={"border.subtle"}
          >
            <Skeleton
              h={"36px"}
              w={"full"}
              rounded={"md"}
              loaded={isLoaded}
              variant={variant}
            >
              <P fontSize={"xs"} color={"fg.subtle"} lineHeight={"tall"}>
                Data pengguna berhasil dimuat secara asynchronous dari server
                API.
              </P>
            </Skeleton>
          </Box>
        </Box>
      );
    },
  },

  alert: {
    key: "alert",
    title: "Alert",
    category: "Feedback & Status",
    description:
      "Komponen pemberitahuan status penting (info, success, warning, error) dengan ikon indikator.",
    importPath:
      'import { Alert } from "@/design-system/components/feedback/alert/alert";',
    component: Alert.Root,
    defaultProps: {
      status: "info",
    },
    propsSpec: [
      {
        name: "status",
        type: '"info" | "success" | "warning" | "error"',
        defaultValue: "info",
        description: "Status jenis peringatan.",
        controlKind: "select",
        options: ["info", "success", "warning", "error"],
      },
    ],
    renderPlayground: (props) => (
      <Box w={"full"} maxW={"420px"}>
        <Alert.Root
          status={
            (props.status as "info" | "success" | "warning" | "error") || "info"
          }
        >
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Informasi Sistem</Alert.Title>
            <Alert.Description>
              Operasi berhasil disinkronkan dengan status{" "}
              {String(props.status || "info")}.
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>
      </Box>
    ),
  },

  toast: {
    key: "toast",
    title: "Toast Notification",
    category: "Feedback & Status",
    description:
      "Notifikasi mengambang dengan timer otomatis, auto-collapse, riwayat toast, dan queue grouping.",
    importPath: 'import { toast } from "@/design-system/components/toast";',
    component: Box,
    defaultProps: {
      variant: "info",
    },
    propsSpec: [
      {
        name: "variant",
        type: '"success" | "error" | "warning" | "info" | "loading"',
        defaultValue: "info",
        description: "Varian status notifikasi toast.",
        controlKind: "select",
        options: ["success", "error", "warning", "info", "loading"],
      },
    ],
    renderPlayground: (props) => (
      <HStack gap={3} wrap={"wrap"}>
        <Button
          size={"sm"}
          colorPalette={
            props.variant === "success"
              ? "green"
              : props.variant === "error"
                ? "red"
                : props.variant === "warning"
                  ? "orange"
                  : "blue"
          }
          onClick={() => {
            const v =
              (props.variant as
                | "success"
                | "error"
                | "warning"
                | "info"
                | "loading") || "info";
            toast[v](`Contoh Toast ${v.toUpperCase()}`, {
              description: `Ini adalah pesan toast dengan status ${v}.`,
            });
          }}
        >
          Tampilkan Toast {String(props.variant || "info").toUpperCase()}
        </Button>
      </HStack>
    ),
  },

  state_display: {
    key: "state_display",
    title: "State Feedback (No Data)",
    category: "Feedback & Status",
    description:
      "Komponen ilustratif untuk halaman data kosong atau kondisi belum ada data.",
    importPath:
      'import { StateNoData } from "@/design-system/components/feedback/state-no-data/state.no-data";',
    component: StateNoData,
    defaultProps: {
      title: "Tidak Ada Data",
      description: "Belum ada item atau rekaman data yang tersedia.",
    },
    propsSpec: [
      {
        name: "title",
        type: "string",
        defaultValue: "Tidak Ada Data",
        description: "Judul teks status kosong.",
        controlKind: "text",
      },
      {
        name: "description",
        type: "string",
        defaultValue: "Belum ada item atau rekaman data yang tersedia.",
        description: "Deskripsi bantuan status kosong.",
        controlKind: "text",
      },
    ],
    renderPlayground: (props) => (
      <StateNoData
        title={props.title as string}
        description={props.description as string}
      />
    ),
  },

  emoji: {
    key: "emoji",
    title: "Emoji",
    category: "Emoji",
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

  focus_alert: {
    key: "focus_alert",
    title: "Focus Alert Modal",
    category: "Focus Alert",
    description:
      "Modal peringatan terpusat prioritas tinggi dengan animasi ikon besar dan aksi konfirmasi.",
    importPath:
      'import { FocusAlertItem } from "@/design-system/components/focus-alert/focus-alert/focus-alert";',
    component: Box,
    defaultProps: {
      variant: "neutral",
    },
    propsSpec: [
      {
        name: "variant",
        type: '"neutral" | "info" | "warning" | "error" | "success"',
        defaultValue: "neutral",
        description: "Varian alert modal.",
        controlKind: "select",
        options: ["neutral", "info", "warning", "error", "success"],
      },
    ],
    renderPlayground: (props) => <FocusAlertPlaygroundDemo {...props} />,
  },

  data_table: {
    key: "data_table",
    title: "DataView Table",
    category: "Data Display",
    description:
      "Tabel data virtualized responsif dengan sorting, pagination, checkbox batch, dan menu aksi baris.",
    importPath:
      'import { DataViewTable } from "@/design-system/components/data-display/data-view/data-view-table";\nimport { DataViewFooter } from "@/design-system/components/data-display/data-view/data-view-footer";',
    component: DataViewTable.Root,
    defaultProps: {
      withNumbering: true,
      canBatchSelect: true,
      fixedItemHeight: true,
      virtualized: true,
      page: 1,
      pageSize: 20,
    },
    propsSpec: [
      {
        name: "headers",
        type: "FormattedTableHeader[]",
        defaultValue: "[]",
        description: "Daftar definisi kolom header tabel (wajib).",
      },
      {
        name: "items",
        type: "FormattedListItem[]",
        defaultValue: "[]",
        description: "Daftar data baris tabel (wajib).",
      },
      {
        name: "itemActions",
        type: "DataViewItemActionsGenerator[]",
        defaultValue: undefined,
        description:
          "Definisi menu aksi per baris data (termasuk modal konfirmasi hapus).",
      },
      {
        name: "batchActions",
        type: "DataViewBatchActionsGenerator[]",
        defaultValue: undefined,
        description:
          "Definisi aksi batch ketika satu atau lebih baris dipilih.",
      },
      {
        name: "children",
        type: "ReactNode",
        defaultValue: undefined,
        description: "Sub-komponen Header dan Body tabel (wajib).",
      },
      {
        name: "withNumbering",
        type: "boolean",
        defaultValue: true,
        description: "Tampilkan kolom nomor urut baris data.",
        controlKind: "boolean",
      },
      {
        name: "canBatchSelect",
        type: "boolean",
        defaultValue: true,
        description: "Aktifkan kotak centang pemilihan batch baris.",
        controlKind: "boolean",
      },
      {
        name: "fixedItemHeight",
        type: "boolean",
        defaultValue: true,
        description: "Kunci tinggi baris data secara konsisten.",
        controlKind: "boolean",
      },
      {
        name: "virtualized",
        type: "boolean",
        defaultValue: true,
        description: "Gunakan rendering virtual DOM untuk data jumlah besar.",
        controlKind: "boolean",
      },
      {
        name: "page",
        type: "number",
        defaultValue: 1,
        description: "Nomor halaman aktif saat ini (minimal 1).",
        controlKind: "number",
      },
      {
        name: "pageSize",
        type: "number",
        defaultValue: 20,
        description: "Jumlah data yang ditampilkan per halaman.",
        controlKind: "select",
        options: [10, 20, 50, 100],
      },
    ],
    renderPlayground: (props, onPropChange) => (
      <DataTablePlaygroundDemo props={props} onPropChange={onPropChange} />
    ),
  },

  clipboard: {
    key: "clipboard",
    title: "Clipboard",
    category: "Buttons & Actions",
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

  countdown: {
    key: "countdown",
    title: "Countdown",
    category: "Data Display",
    description:
      "Penghitung mundur waktu terformat dengan threshold perubahan warna saat mendekati batas akhir.",
    importPath:
      'import { Countdown } from "@/design-system/components/data-display/countdown/countdown";',
    component: Countdown,
    defaultProps: {
      warningThresholdDays: 3,
      warningThresholdHours: 24,
    },
    propsSpec: [
      {
        name: "finishedAt",
        type: "string | Date",
        defaultValue: undefined,
        description: "Target waktu batas akhir countdown (wajib).",
        controlKind: "text",
      },
      {
        name: "warningThresholdDays",
        type: "number",
        defaultValue: 3,
        description:
          "Batas sisa hari sebelum warna berubah menjadi peringatan.",
        controlKind: "number",
      },
      {
        name: "warningThresholdHours",
        type: "number",
        defaultValue: 24,
        description: "Batas sisa jam sebelum warna berubah menjadi peringatan.",
        controlKind: "number",
      },
      {
        name: "finishColor",
        type: "string",
        defaultValue: "fg.error",
        description: "Token warna teks saat waktu countdown habis.",
        controlKind: "select",
        options: [
          "fg.error",
          "fg.warning",
          "fg.muted",
          "red.fg",
          "orange.fg",
          "blue.fg",
          "fg",
        ],
      },
    ],
    renderPlayground: (props) => {
      const tomorrow = new Date(Date.now() + 86400000 * 2).toISOString();
      return (
        <Countdown
          finishedAt={tomorrow}
          warningThresholdDays={Number(props.warningThresholdDays) || 3}
          warningThresholdHours={Number(props.warningThresholdHours) || 24}
          finishColor={String(props.finishColor || "fg.error")}
        />
      );
    },
  },

  stat_grid: {
    key: "stat_grid",
    title: "StatGrid",
    category: "Data Display",
    description:
      "Grid kartu statistik dan KPI metrik ringkas dengan label, nilai numerik terformat, delta badge, dan ikon.",
    importPath:
      'import { StatGrid } from "@/design-system/components/data-display/stat-grid/stat-grid";',
    component: StatGrid.Root,
    defaultProps: {
      columns: 2,
    },
    propsSpec: [
      {
        name: "columns",
        type: "number",
        defaultValue: 2,
        description: "Jumlah kolom kartu statistik dalam grid.",
        controlKind: "select",
        options: [1, 2, 3, 4],
      },
    ],
    renderPlayground: (props) => (
      <Box w={"full"} maxW={"600px"}>
        <StatGrid.Root columns={Number(props.columns) || 2}>
          <StatGrid.Item index={0} columns={Number(props.columns) || 2}>
            <StatGrid.Header>
              <StatGrid.Label>{"Total Pengguna Aktif"}</StatGrid.Label>
              <StatGrid.Icon icon={PhosphorSparkleIcon} />
            </StatGrid.Header>
            <StatGrid.Value value={14250} suffix={"akun"} />
            <StatGrid.Description>
              {"+12.5% dibanding bulan lalu"}
            </StatGrid.Description>
          </StatGrid.Item>
          <StatGrid.Item index={1} columns={Number(props.columns) || 2}>
            <StatGrid.Header>
              <StatGrid.Label>{"Tingkat Keberhasilan"}</StatGrid.Label>
              <StatGrid.Icon icon={PhosphorSparkleIcon} />
            </StatGrid.Header>
            <StatGrid.Value value={"99.8%"} />
            <StatGrid.Description>
              {"Stabil dalam batas aman"}
            </StatGrid.Description>
          </StatGrid.Item>
        </StatGrid.Root>
      </Box>
    ),
  },

  timeline: {
    key: "timeline",
    title: "Timeline",
    category: "Data Display",
    description:
      "Tampilan alur riwayat waktu dan urutan proses bertahap secara vertikal.",
    importPath:
      'import { Timeline } from "@/design-system/components/data-display/timeline/timeline";',
    component: Timeline.Root,
    defaultProps: {
      size: "md",
    },
    propsSpec: [
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        defaultValue: "md",
        description: "Ukuran indikator dan garis penghubung timeline.",
        controlKind: "select",
        options: ["sm", "md", "lg"],
      },
    ],
    renderPlayground: (props) => (
      <Box w={"full"} maxW={"400px"}>
        <Timeline.Root size={(props.size as "sm" | "md" | "lg") || "md"}>
          <Timeline.Item>
            <Timeline.Connector>
              <Timeline.Separator />
              <Timeline.Indicator />
            </Timeline.Connector>
            <Timeline.Content>
              <Timeline.Title>{"Berkas Diterima"}</Timeline.Title>
              <Timeline.Description>
                {"Dokumen permohonan berhasil diunggah"}
              </Timeline.Description>
            </Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Connector>
              <Timeline.Separator />
              <Timeline.Indicator />
            </Timeline.Connector>
            <Timeline.Content>
              <Timeline.Title>{"Verifikasi Lapangan"}</Timeline.Title>
              <Timeline.Description>
                {"Petugas melakukan pengukuran spasial"}
              </Timeline.Description>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline.Root>
      </Box>
    ),
  },

  file_item: {
    key: "file_item",
    title: "FileItem",
    category: "Data Display",
    description:
      "Komponen kartu representasi berkas lampiran dengan ikon jenis berkas, label ukuran, dan aksi.",
    importPath:
      'import { FileItem } from "@/design-system/components/data-display/file-item/file-item";',
    component: FileItem,
    defaultProps: {
      name: "laporan-survei-2026.pdf",
      sizeLabel: "2.4 MB",
      mimeType: "application/pdf",
      disabled: false,
    },
    propsSpec: [
      {
        name: "name",
        type: "string",
        defaultValue: "laporan-survei-2026.pdf",
        description: "Nama berkas yang ditampilkan.",
        controlKind: "text",
      },
      {
        name: "sizeLabel",
        type: "string",
        defaultValue: "2.4 MB",
        description: "Label ukuran berkas (misal: 2.4 MB).",
        controlKind: "text",
      },
      {
        name: "mimeType",
        type: "string",
        defaultValue: "application/pdf",
        description: "Tipe MIME berkas untuk menentukan ikon visual.",
        controlKind: "select",
        options: [
          "application/pdf",
          "image/jpeg",
          "image/png",
          "application/zip",
          "text/csv",
          "text/plain",
        ],
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: false,
        description: "Menonaktifkan interaksi kartu berkas.",
        controlKind: "boolean",
      },
    ],
    renderPlayground: (props) => (
      <Box w={"full"} maxW={"380px"}>
        <FileItem
          name={String(props.name || "dokumen.pdf")}
          sizeLabel={String(props.sizeLabel || "1.2 MB")}
          mimeType={String(props.mimeType || "application/pdf")}
          disabled={Boolean(props.disabled)}
          onDelete={() => {}}
        />
      </Box>
    ),
  },

  masked_text: {
    key: "masked_text",
    title: "MaskedText",
    category: "Data Display",
    description:
      "Tampilan teks data sensitif tersamarkan (masking sensor) dengan tombol toggle intip dan salin teks.",
    importPath:
      'import { MaskedText } from "@/design-system/components/data-display/masked-text/masked-text";',
    component: MaskedText,
    defaultProps: {
      value: "3271041908990001",
      maskLength: 16,
      defaultVisible: false,
      withCopy: true,
      withToggle: true,
    },
    propsSpec: [
      {
        name: "value",
        type: "string",
        defaultValue: "3271041908990001",
        description: "Nilai data sensitif asli yang dimasking.",
        controlKind: "text",
      },
      {
        name: "maskLength",
        type: "number",
        defaultValue: 16,
        description: "Jumlah karakter simbol masker saat tersembunyi.",
        controlKind: "number",
      },
      {
        name: "defaultVisible",
        type: "boolean",
        defaultValue: false,
        description: "Status awal visibilitas teks.",
        controlKind: "boolean",
      },
      {
        name: "withCopy",
        type: "boolean",
        defaultValue: true,
        description: "Tampilkan tombol salin teks ke clipboard.",
        controlKind: "boolean",
      },
      {
        name: "withToggle",
        type: "boolean",
        defaultValue: true,
        description: "Tampilkan tombol intip (eye toggle).",
        controlKind: "boolean",
      },
    ],
    renderPlayground: (props) => (
      <Box w={"full"} maxW={"320px"}>
        <MaskedText
          value={String(props.value || "3271041908990001")}
          maskLength={Number(props.maskLength) || 16}
          defaultVisible={Boolean(props.defaultVisible)}
          withCopy={Boolean(props.withCopy)}
          withToggle={Boolean(props.withToggle)}
        />
      </Box>
    ),
  },

  accordion: {
    key: "accordion",
    title: "Accordion",
    category: "Disclosure & Navigation",
    description:
      "Komponen panel lipat collapsible berlapis untuk menghemat ruang vertikal.",
    importPath:
      'import { Accordion } from "@/design-system/components/disclosure/accordion/accordion";',
    component: Accordion.Root,
    defaultProps: {
      collapsible: true,
      multiple: false,
    },
    propsSpec: [
      {
        name: "collapsible",
        type: "boolean",
        defaultValue: true,
        description: "Izinkan semua panel ditutup secara bersamaan.",
        controlKind: "boolean",
      },
      {
        name: "multiple",
        type: "boolean",
        defaultValue: false,
        description: "Izinkan membuka lebih dari satu panel sekaligus.",
        controlKind: "boolean",
      },
    ],
    renderPlayground: (props) => (
      <Accordion.Root
        collapsible={Boolean(props.collapsible)}
        multiple={Boolean(props.multiple)}
        defaultValue={["item-1"]}
        w={"full"}
        maxW={"380px"}
      >
        <Accordion.Item value={"item-1"}>
          <Accordion.ItemTrigger>
            <Span flex={1}>Informasi Dokumen</Span>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>
              Detail dokumen dan berkas terverifikasi di dalam sistem ATR BPN.
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
        <Accordion.Item value={"item-2"}>
          <Accordion.ItemTrigger>
            <Span flex={1}>Riwayat Sinkronisasi</Span>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>
              Sinkronisasi data layer peta spasial GeoServer terakhir berhasil.
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>
    ),
  },

  tabs: {
    key: "tabs",
    title: "Tabs",
    category: "Disclosure & Navigation",
    description:
      "Navigasi tab switching dengan animasi underline indicator halus.",
    importPath:
      'import { Tabs } from "@/design-system/components/disclosure/tabs/tabs";',
    component: Tabs.Root,
    defaultProps: {
      variant: "line",
      size: "md",
      fitted: false,
      colorPalette: "blue",
    },
    propsSpec: [
      {
        name: "variant",
        type: '"line" | "subtle" | "outline" | "enclosed"',
        defaultValue: "line",
        description: "Gaya visual navigasi tab.",
        controlKind: "select",
        options: ["line", "subtle", "outline", "enclosed"],
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        defaultValue: "md",
        description: "Ukuran tombol tab.",
        controlKind: "select",
        options: ["sm", "md", "lg"],
      },
      {
        name: "fitted",
        type: "boolean",
        defaultValue: false,
        description: "Ratakan lebar tab memenuhi lebar kontainer.",
        controlKind: "boolean",
      },
      {
        name: "colorPalette",
        type: "string",
        defaultValue: "blue",
        description: "Skema warna aksen aktif tab.",
        controlKind: "select",
        options: COLOR_PALETTE_OPTIONS,
      },
    ],
    renderPlayground: (props) => (
      <Tabs.Root
        defaultValue={"overview"}
        variant={
          (props.variant as "line" | "subtle" | "outline" | "enclosed") ||
          "line"
        }
        size={(props.size as "sm" | "md" | "lg") || "md"}
        fitted={Boolean(props.fitted)}
        colorPalette={(props.colorPalette as string) || "blue"}
        w={"full"}
        maxW={"380px"}
      >
        <Tabs.List>
          <Tabs.Trigger value={"overview"}>Overview</Tabs.Trigger>
          <Tabs.Trigger value={"specs"}>Spesifikasi</Tabs.Trigger>
          <Tabs.Trigger value={"history"}>Riwayat</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value={"overview"} pt={3}>
          <P fontSize={"sm"} color={"fg.muted"}>
            Konten tab Overview terpilih.
          </P>
        </Tabs.Content>
        <Tabs.Content value={"specs"} pt={3}>
          <P fontSize={"sm"} color={"fg.muted"}>
            Konten spesifikasi teknis dan rincian.
          </P>
        </Tabs.Content>
        <Tabs.Content value={"history"} pt={3}>
          <P fontSize={"sm"} color={"fg.muted"}>
            Riwayat perubahan data.
          </P>
        </Tabs.Content>
      </Tabs.Root>
    ),
  },

  steps: {
    key: "steps",
    title: "Steps",
    category: "Disclosure & Navigation",
    description: "Indikator alur proses bertahap bertingkat (wizard/stepper).",
    importPath:
      'import { Steps } from "@/design-system/components/disclosure/steps/steps";',
    component: Steps.Root,
    defaultProps: {
      defaultStep: 1,
      count: 3,
      size: "md",
      colorPalette: "blue",
    },
    propsSpec: [
      {
        name: "count",
        type: "number",
        defaultValue: undefined,
        required: true,
        description: "Jumlah total langkah proses (wajib).",
        controlKind: "number",
      },
      {
        name: "defaultStep",
        type: "number",
        defaultValue: 1,
        description: "Langkah aktif awal (0-indexed).",
        controlKind: "number",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        defaultValue: "md",
        description: "Ukuran indikator lingkaran step.",
        controlKind: "select",
        options: ["sm", "md", "lg"],
      },
      {
        name: "colorPalette",
        type: "string",
        defaultValue: "blue",
        description: "Skema warna aksen langkah aktif.",
        controlKind: "select",
        options: COLOR_PALETTE_OPTIONS,
      },
    ],
    renderPlayground: (props) => (
      <Steps.Root
        defaultStep={Number(props.defaultStep) || 1}
        count={Number(props.count) || 3}
        size={(props.size as "sm" | "md" | "lg") || "md"}
        colorPalette={(props.colorPalette as string) || "blue"}
        maxW={"380px"}
        w={"full"}
      >
        <Steps.List>
          <Steps.Item index={0} title={"Langkah 1"}>
            <Steps.Indicator />
            <Steps.Title>Biodata</Steps.Title>
            <Steps.Separator />
          </Steps.Item>
          <Steps.Item index={1} title={"Langkah 2"}>
            <Steps.Indicator />
            <Steps.Title>Berkas</Steps.Title>
            <Steps.Separator />
          </Steps.Item>
          <Steps.Item index={2} title={"Langkah 3"}>
            <Steps.Indicator />
            <Steps.Title>Selesai</Steps.Title>
          </Steps.Item>
        </Steps.List>
      </Steps.Root>
    ),
  },

  collapsible: {
    key: "collapsible",
    title: "Collapsible",
    category: "Disclosure & Navigation",
    description:
      "Elemen ekspansi buka/tutup sederhana dengan animasi transisi.",
    importPath:
      'import { Collapsible } from "@/design-system/components/disclosure/collapsible/collapsible";',
    component: Collapsible.Root,
    defaultProps: {
      defaultOpen: true,
      unmountOnExit: false,
    },
    propsSpec: [
      {
        name: "defaultOpen",
        type: "boolean",
        defaultValue: true,
        description: "Status awal konten dalam keadaan terbuka.",
        controlKind: "boolean",
      },
      {
        name: "unmountOnExit",
        type: "boolean",
        defaultValue: false,
        description: "Unmount elemen DOM saat ditutup.",
        controlKind: "boolean",
      },
    ],
    renderPlayground: (props) => (
      <Collapsible.Root
        defaultOpen={Boolean(props.defaultOpen)}
        unmountOnExit={Boolean(props.unmountOnExit)}
        w={"full"}
        maxW={"320px"}
      >
        <Collapsible.Trigger asChild>
          <Button variant={"outline"} size={"sm"}>
            Toggle Konten Tambahan
          </Button>
        </Collapsible.Trigger>
        <Collapsible.Content pt={3}>
          <Box p={3} rounded={"md"} bg={"bg.subtle"}>
            <P fontSize={"xs"}>
              Ini adalah konten tersembunyi di dalam Collapsible.
            </P>
          </Box>
        </Collapsible.Content>
      </Collapsible.Root>
    ),
  },

  breadcrumb: {
    key: "breadcrumb",
    title: "Breadcrumb",
    category: "Disclosure & Navigation",
    description:
      "Navigasi remah roti untuk menunjukkan hierarki rute halaman pengguna.",
    importPath:
      'import { Breadcrumb } from "@/design-system/components/disclosure/breadcrumb/breadcrumb";',
    component: Breadcrumb.Root,
    defaultProps: {
      separator: "/",
      size: "md",
    },
    propsSpec: [
      {
        name: "separator",
        type: "string",
        defaultValue: "/",
        description: "Karakter pemisah antar tingkatan navigasi.",
        controlKind: "text",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        defaultValue: "md",
        description: "Ukuran teks breadcrumb.",
        controlKind: "select",
        options: ["sm", "md", "lg"],
      },
    ],
    renderPlayground: (props) => (
      <Breadcrumb.Root size={(props.size as "sm" | "md" | "lg") || "md"}>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href={"#"}>Beranda</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator>
            {String(props.separator || "/")}
          </Breadcrumb.Separator>
          <Breadcrumb.Item>
            <Breadcrumb.Link href={"#"}>Manajemen Data</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator>
            {String(props.separator || "/")}
          </Breadcrumb.Separator>
          <Breadcrumb.Item>
            <Breadcrumb.CurrentLink>Spasial</Breadcrumb.CurrentLink>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>
    ),
  },

  carousel: {
    key: "carousel",
    title: "Carousel",
    category: "Disclosure & Navigation",
    description:
      "Slider tayangan bergambar atau konten kartu bergerak dengan navigasi tombol dan indikator titik.",
    importPath:
      'import { Carousel } from "@/design-system/components/disclosure/carousel/carousel";',
    component: Carousel.Root,
    defaultProps: {
      slideCount: 4,
      loop: true,
      autoplay: false,
    },
    propsSpec: [
      {
        name: "slideCount",
        type: "number",
        defaultValue: 4,
        description: "Jumlah total item slide (wajib).",
        controlKind: "number",
      },
      {
        name: "loop",
        type: "boolean",
        defaultValue: true,
        description: "Putar kembali slide dari awal setelah slide terakhir.",
        controlKind: "boolean",
      },
      {
        name: "autoplay",
        type: "boolean",
        defaultValue: false,
        description: "Otomatis berpindah slide secara bergantian.",
        controlKind: "boolean",
      },
    ],
    renderPlayground: (props) => {
      const carouselImages = [
        "https://images.unsplash.com/photo-1656433031375-5042f5afe894?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2371",
        "https://images.unsplash.com/photo-1587466412525-87497b34fc88?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2673",
        "https://images.unsplash.com/photo-1629581688635-5d88654e5bdd?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2831",
        "https://images.unsplash.com/photo-1661030420948-862787de0056?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2370",
      ];
      const count = Math.min(
        Math.max(1, Number(props.slideCount) || 4),
        carouselImages.length,
      );
      const displayImages = carouselImages.slice(0, count);

      return (
        <Carousel.Root
          loop={Boolean(props.loop)}
          autoplay={Boolean(props.autoplay)}
          slideCount={displayImages.length}
          w={"350px"}
          maxW={"350px"}
          pos={"relative"}
        >
          <Carousel.Control>
            <Carousel.ItemGroup width={"full"}>
              {displayImages.map((src, index) => (
                <Carousel.Item key={index} index={index}>
                  <Image
                    src={src}
                    alt={`Slide ${index + 1}`}
                    objectFit={"cover"}
                    aspectRatio={16 / 9}
                    w={"full"}
                    rounded={"md"}
                  />
                </Carousel.Item>
              ))}
            </Carousel.ItemGroup>

            <HStack
              align={"center"}
              justify={"space-between"}
              w={"full"}
              px={2}
              pos={"absolute"}
              top={"50%"}
              transform={"translateY(-50%)"}
            >
              <Carousel.PrevTrigger asChild>
                <Carousel.ActionButton
                  size={"sm"}
                  color={"white"}
                  borderColor={"border.subtle"}
                  bg={"blackAlpha.600"}
                  _hover={{ bg: "blackAlpha.800" }}
                >
                  <LuArrowLeft />
                </Carousel.ActionButton>
              </Carousel.PrevTrigger>

              <Carousel.NextTrigger asChild>
                <Carousel.ActionButton
                  size={"sm"}
                  color={"white"}
                  borderColor={"border.subtle"}
                  bg={"blackAlpha.600"}
                  _hover={{ bg: "blackAlpha.800" }}
                >
                  <LuArrowRight />
                </Carousel.ActionButton>
              </Carousel.NextTrigger>
            </HStack>

            <Box pos={"absolute"} bottom={2} w={"full"}>
              <Carousel.Indicators
                bg={"whiteAlpha.700"}
                boxSize={1.5}
                transition={"200ms"}
                transformOrigin={"center"}
                _current={{
                  width: 5,
                  opacity: 1,
                  bg: "white",
                }}
              />
            </Box>
          </Carousel.Control>
        </Carousel.Root>
      );
    },
  },

  dialog: {
    key: "dialog",
    title: "Dialog Modal",
    category: "Overlays & Modals",
    description:
      "Komponen modal mengambang dengan transisi, backdrop, dan kontrol tombol tutup.",
    importPath:
      'import { Dialog } from "@/design-system/components/overlay/dialog/dialog";',
    component: Dialog.Root,
    defaultProps: {
      size: "xs",
      placement: "center",
      scrollBehavior: "inside",
    },
    propsSpec: [
      {
        name: "size",
        type: '"xs" | "sm" | "md" | "lg" | "xl" | "full"',
        defaultValue: "xs",
        description: "Ukuran lebar modal dialog.",
        controlKind: "select",
        options: ["xs", "sm", "md", "lg", "xl", "full"],
      },
      {
        name: "placement",
        type: '"center" | "top"',
        defaultValue: "center",
        description: "Posisi peletakan dialog pada layar.",
        controlKind: "select",
        options: ["center", "top"],
      },
      {
        name: "scrollBehavior",
        type: '"inside" | "outside"',
        defaultValue: "inside",
        description: "Perilaku scroll konten jika melebihi tinggi layar.",
        controlKind: "select",
        options: ["inside", "outside"],
      },
    ],
    renderPlayground: (props) => <DialogPlaygroundDemo {...props} />,
  },

  drawer: {
    key: "drawer",
    title: "Drawer",
    category: "Overlays & Modals",
    description:
      "Panel geser dari tepi layar untuk form samping, filter, atau menu sekunder.",
    importPath:
      'import { Drawer } from "@/design-system/components/overlay/drawer/drawer";',
    component: Drawer.Root,
    defaultProps: {
      placement: "end",
      size: "xs",
    },
    propsSpec: [
      {
        name: "placement",
        type: '"start" | "end" | "top" | "bottom"',
        defaultValue: "end",
        description: "Sisi tepi layar tempat drawer muncul.",
        controlKind: "select",
        options: ["start", "end", "top", "bottom"],
      },
      {
        name: "size",
        type: '"xs" | "sm" | "md" | "lg" | "xl" | "full"',
        defaultValue: "xs",
        description: "Dimensi ketebalan drawer.",
        controlKind: "select",
        options: ["xs", "sm", "md", "lg", "xl", "full"],
      },
    ],
    renderPlayground: (props) => <DrawerPlaygroundDemo {...props} />,
  },

  popover: {
    key: "popover",
    title: "Popover",
    category: "Overlays & Modals",
    description: "Panel mengambang interaktif terikat pada elemen pemicu.",
    importPath:
      'import { Popover } from "@/design-system/components/overlay/popover/popover";',
    component: Popover.Root,
    defaultProps: {
      modal: false,
      portalled: true,
    },
    propsSpec: [
      {
        name: "modal",
        type: "boolean",
        defaultValue: false,
        description: "Cegah interaksi di luar area popover saat terbuka.",
        controlKind: "boolean",
      },
      {
        name: "portalled",
        type: "boolean",
        defaultValue: true,
        description: "Render popover ke dalam portal body terpisah.",
        controlKind: "boolean",
      },
    ],
    renderPlayground: (props) => (
      <Popover.Root
        modal={Boolean(props.modal)}
        portalled={Boolean(props.portalled)}
      >
        <Popover.Trigger asChild>
          <Button variant={"outline"}>Klik Popover</Button>
        </Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content p={4} maxW={"260px"}>
            <Popover.Header>
              <P fontWeight={"bold"}>Detail Info</P>
            </Popover.Header>
            <Popover.Body>
              <P fontSize={"sm"} color={"fg.muted"}>
                Ini adalah konten informasi di dalam Popover floating box.
              </P>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>
    ),
  },

  tooltip: {
    key: "tooltip",
    title: "Tooltip",
    category: "Overlays & Modals",
    description:
      "Pesan informasi singkat saat pengguna mengarahkan kursor (hover) di atas elemen.",
    importPath:
      'import { Tooltip } from "@/design-system/components/overlay/tooltip/tooltip";',
    component: Tooltip,
    defaultProps: {
      content: "Tooltip info bantuan",
      disabled: false,
      openDelay: 300,
      closeDelay: 200,
    },
    propsSpec: [
      {
        name: "content",
        type: "ReactNode",
        defaultValue: undefined,
        required: true,
        description: "Teks atau konten isi tooltip (wajib).",
        controlKind: "text",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: false,
        description: "Nonaktifkan tampilan tooltip.",
        controlKind: "boolean",
      },
      {
        name: "openDelay",
        type: "number",
        defaultValue: 300,
        description: "Jeda waktu buka tooltip (ms).",
        controlKind: "number",
      },
      {
        name: "closeDelay",
        type: "number",
        defaultValue: 200,
        description: "Jeda waktu tutup tooltip (ms).",
        controlKind: "number",
      },
    ],
    renderPlayground: (props) => (
      <Tooltip
        content={String(props.content || "Tooltip info bantuan")}
        disabled={Boolean(props.disabled)}
        openDelay={Number(props.openDelay) || 300}
        closeDelay={Number(props.closeDelay) || 200}
      >
        <Button variant={"outline"}>Arahkan Mouse ke Sini</Button>
      </Tooltip>
    ),
  },

  menu: {
    key: "menu",
    title: "Menu",
    category: "Overlays & Modals",
    description:
      "Menu dropdown aksi pilihan dengan navigasi keyboard dan pemisahan kategori.",
    importPath:
      'import { Menu } from "@/design-system/components/overlay/menu/menu";',
    component: Menu.Root,
    defaultProps: {
      size: "md",
      variant: "subtle",
    },
    propsSpec: [
      {
        name: "size",
        type: '"sm" | "md"',
        defaultValue: "md",
        description: "Ukuran item menu.",
        controlKind: "select",
        options: ["sm", "md"],
      },
      {
        name: "variant",
        type: '"subtle" | "solid"',
        defaultValue: "subtle",
        description: "Gaya visual latar menu terpilih.",
        controlKind: "select",
        options: ["subtle", "solid"],
      },
    ],
    renderPlayground: (props) => (
      <Menu.Root
        size={(props.size as "sm" | "md") || "md"}
        variant={(props.variant as "subtle" | "solid") || "subtle"}
      >
        <Menu.Trigger asChild>
          <Button variant={"outline"}>
            Buka Menu Pilihan <AppIcon icon={ChevronDownIcon} size={"sm"} />
          </Button>
        </Menu.Trigger>
        <Menu.Content minW={"160px"}>
          <Menu.Item value={"profile"}>Profil Saya</Menu.Item>
          <Menu.Item value={"settings"}>Pengaturan</Menu.Item>
          <Menu.Item value={"logout"} color={"fg.error"}>
            Keluar
          </Menu.Item>
        </Menu.Content>
      </Menu.Root>
    ),
  },

  modal: {
    key: "modal",
    title: "Modal (Adaptive)",
    category: "Overlays & Modals",
    description:
      "Komponen overlay pintar adaptif: otomatis menjadi Dialog pada desktop dan Drawer bawah pada perangkat mobile.",
    importPath:
      'import { Modal } from "@/design-system/components/overlay/modal/modal";',
    component: Modal.Root,
    defaultProps: {
      size: "xs",
    },
    propsSpec: [
      {
        name: "size",
        type: '"xs" | "sm" | "md" | "lg" | "xl" | "full"',
        defaultValue: "xs",
        description:
          "Ukuran lebar modal saat ditampilkan dalam mode dialog desktop.",
        controlKind: "select",
        options: ["xs", "sm", "md", "lg", "xl", "full"],
      },
    ],
    renderPlayground: (props) => (
      <ModalPlaygroundDemo
        size={(props.size as "xs" | "sm" | "md" | "lg" | "xl" | "full") || "xs"}
      />
    ),
  },

  box: {
    key: "box",
    title: "Box",
    category: "Layout & Structure",
    description:
      "Komponen dasar kontainer layout serbaguna dengan dukungan token tema Chakra.",
    importPath:
      'import { Box } from "@/design-system/components/layout/box/box";',
    component: Box,
    defaultProps: {
      p: 4,
      bg: "bg.subtle",
      rounded: "lg",
    },
    propsSpec: [
      {
        name: "p",
        type: "number | string",
        defaultValue: 4,
        description: "Besaran padding kontainer.",
        controlKind: "number",
      },
      {
        name: "bg",
        type: '"bg.subtle" | "bg.muted" | "bg.panel"',
        defaultValue: "bg.subtle",
        description: "Warna latar kontainer.",
        controlKind: "select",
        options: ["bg.subtle", "bg.muted", "bg.panel"],
      },
      {
        name: "rounded",
        type: '"none" | "sm" | "md" | "lg" | "full"',
        defaultValue: "lg",
        description: "Radius sudut border.",
        controlKind: "select",
        options: ["none", "sm", "md", "lg", "full"],
      },
    ],
    renderPlayground: (props) => (
      <Box
        p={Number(props.p) || 4}
        rounded={(props.rounded as "lg") || "lg"}
        bg={String(props.bg || "bg.subtle")}
        border={"1px solid"}
        borderColor={"border.subtle"}
      >
        <P fontWeight={"semibold"}>Exium Layout Box</P>
        <P fontSize={"sm"} color={"fg.muted"}>
          Kontainer layout dasar serbaguna untuk membangun struktur antarmuka.
        </P>
      </Box>
    ),
  },

  flex_box: {
    key: "flex_box",
    title: "HStack / VStack",
    category: "Layout & Structure",
    description:
      "Kontainer susunan fleksibel vertikal (VStack) atau horizontal (HStack) dengan alignment presisi.",
    importPath:
      'import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";',
    component: HStack,
    defaultProps: {
      direction: "horizontal",
      gap: 3,
      align: "center",
      justify: "start",
    },
    propsSpec: [
      {
        name: "direction",
        type: '"horizontal" | "vertical"',
        defaultValue: "horizontal",
        description:
          "Arah orientasi stack (HStack horizontal vs VStack vertikal).",
        controlKind: "select",
        options: ["horizontal", "vertical"],
      },
      {
        name: "gap",
        type: "number | string",
        defaultValue: 3,
        description: "Jarak spasi antar anak elemen.",
        controlKind: "number",
      },
      {
        name: "align",
        type: '"start" | "center" | "end"',
        defaultValue: "center",
        description: "Pensejajaran sumbu silang (cross-axis alignment).",
        controlKind: "select",
        options: ["start", "center", "end"],
      },
      {
        name: "justify",
        type: '"start" | "center" | "end" | "space-between"',
        defaultValue: "start",
        description: "Pensejajaran sumbu utama (main-axis alignment).",
        controlKind: "select",
        options: ["start", "center", "end", "space-between"],
      },
    ],
    renderPlayground: (props) => {
      const isVertical = props.direction === "vertical";
      const StackComp = isVertical ? VStack : HStack;

      return (
        <StackComp
          gap={Number(props.gap) || 3}
          align={(props.align as "center") || "center"}
          justify={(props.justify as "start") || "start"}
          w={"full"}
          maxW={isVertical ? "260px" : "380px"}
          p={3}
          border={"1px dashed"}
          borderColor={"border.subtle"}
          rounded={"md"}
        >
          <Box
            p={3}
            bg={"blue.subtle"}
            rounded={"md"}
            textAlign={"center"}
            w={isVertical ? "full" : "auto"}
          >
            <P fontSize={"xs"} fontWeight={"bold"} color={"blue.fg"}>
              Item 1
            </P>
          </Box>
          <Box
            p={3}
            bg={"teal.subtle"}
            rounded={"md"}
            textAlign={"center"}
            w={isVertical ? "full" : "auto"}
          >
            <P fontSize={"xs"} fontWeight={"bold"} color={"teal.fg"}>
              Item 2
            </P>
          </Box>
          <Box
            p={3}
            bg={"purple.subtle"}
            rounded={"md"}
            textAlign={"center"}
            w={isVertical ? "full" : "auto"}
          >
            <P fontSize={"xs"} fontWeight={"bold"} color={"purple.fg"}>
              Item 3
            </P>
          </Box>
        </StackComp>
      );
    },
  },

  grid: {
    key: "grid",
    title: "SimpleGrid",
    category: "Layout & Structure",
    description:
      "Grid responsif yang mudah digunakan untuk menyusun kartu dan elemen multi-kolom.",
    importPath:
      'import { SimpleGrid } from "@/design-system/components/layout/grid/grid";',
    component: SimpleGrid,
    defaultProps: {
      columns: 3,
      gap: 3,
    },
    propsSpec: [
      {
        name: "columns",
        type: "number",
        defaultValue: 3,
        description: "Jumlah kolom grid.",
        controlKind: "number",
      },
      {
        name: "gap",
        type: "number | string",
        defaultValue: 3,
        description: "Jarak spasi antar item.",
        controlKind: "number",
      },
    ],
    renderPlayground: (props) => (
      <SimpleGrid
        columns={Number(props.columns) || 3}
        gap={Number(props.gap) || 3}
        w={"full"}
        maxW={"400px"}
      >
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Box
            key={item}
            p={3}
            rounded={"md"}
            bg={"bg.muted"}
            textAlign={"center"}
          >
            <P fontSize={"xs"} fontWeight={"bold"}>
              Item {item}
            </P>
          </Box>
        ))}
      </SimpleGrid>
    ),
  },

  card: {
    key: "card",
    title: "Card",
    category: "Layout & Structure",
    description:
      "Kartu presentasi informasi modular dengan container token styling.",
    importPath:
      'import { Card } from "@/design-system/components/layout/card/card";',
    component: Card.Root,
    defaultProps: {
      variant: "outline",
      size: "md",
    },
    propsSpec: [
      {
        name: "variant",
        type: '"outline" | "subtle" | "elevated"',
        defaultValue: "outline",
        description: "Gaya visual tampilan kartu.",
        controlKind: "select",
        options: ["outline", "subtle", "elevated"],
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        defaultValue: "md",
        description: "Ukuran padding dan konten kartu.",
        controlKind: "select",
        options: ["sm", "md", "lg"],
      },
    ],
    renderPlayground: (props) => (
      <Card.Root
        variant={
          (props.variant as "outline" | "subtle" | "elevated") || "outline"
        }
        size={(props.size as "sm" | "md" | "lg") || "md"}
        maxW={"320px"}
        w={"full"}
      >
        <Card.Header>
          <P fontWeight={"bold"}>Exium Card</P>
        </Card.Header>
        <Card.Body>
          <P fontSize={"sm"} color={"fg.muted"}>
            Kartu layout dengan styling border, padding, dan background serasi
            tema.
          </P>
        </Card.Body>
      </Card.Root>
    ),
  },

  container: {
    key: "container",
    title: "Container",
    category: "Layout & Structure",
    description:
      "Kontainer pembungkus halaman dengan header terintegrasi dan responsivitas adaptif.",
    importPath:
      'import { Container } from "@/design-system/components/layout/container/container";',
    component: Container.Root,
    defaultProps: {
      withContext: false,
    },
    propsSpec: [
      {
        name: "withContext",
        type: "boolean",
        defaultValue: false,
        description: "Sediakan konteks dimensi container kepada sub-komponen.",
        controlKind: "boolean",
      },
    ],
    renderPlayground: (props) => (
      <Container.Root
        withContext={Boolean(props.withContext)}
        w={"full"}
        maxW={"380px"}
      >
        <Container.Header title={"Container Title"} />
        <Container.Body p={4}>
          <P fontSize={"sm"} color={"fg.muted"}>
            Isi konten dalam container box.
          </P>
        </Container.Body>
      </Container.Root>
    ),
  },

  separator: {
    key: "separator",
    title: "Separator",
    category: "Layout & Structure",
    description:
      "Garis pemisah visual horizontal atau vertikal antar bagian antarmuka.",
    importPath:
      'import { Separator } from "@/design-system/components/layout/separator/separator";',
    component: Separator,
    defaultProps: {
      orientation: "horizontal",
      size: "sm",
    },
    propsSpec: [
      {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        defaultValue: "horizontal",
        description: "Arah garis pemisah.",
        controlKind: "select",
        options: ["horizontal", "vertical"],
      },
      {
        name: "size",
        type: '"xs" | "sm" | "md" | "lg"',
        defaultValue: "sm",
        description: "Ketebalan garis pemisah.",
        controlKind: "select",
        options: ["xs", "sm", "md", "lg"],
      },
    ],
    renderPlayground: (props) => {
      const isVertical = props.orientation === "vertical";
      const size = (props.size as "xs" | "sm" | "md" | "lg") || "sm";

      if (isVertical) {
        return (
          <HStack
            gap={4}
            h={"70px"}
            align={"center"}
            justify={"center"}
            p={4}
            border={"1px dashed"}
            borderColor={"border.subtle"}
            rounded={"md"}
          >
            <P fontSize={"sm"} fontWeight={"medium"}>
              Sisi Kiri
            </P>
            <Separator orientation={"vertical"} size={size} h={"40px"} />
            <P fontSize={"sm"} fontWeight={"medium"}>
              Sisi Kanan
            </P>
          </HStack>
        );
      }

      return (
        <VStack
          gap={3}
          w={"full"}
          maxW={"300px"}
          p={4}
          border={"1px dashed"}
          borderColor={"border.subtle"}
          rounded={"md"}
        >
          <P fontSize={"sm"} fontWeight={"medium"}>
            Bagian Atas
          </P>
          <Separator orientation={"horizontal"} size={size} w={"full"} />
          <P fontSize={"sm"} fontWeight={"medium"}>
            Bagian Bawah
          </P>
        </VStack>
      );
    },
  },

  sidebar: {
    key: "sidebar",
    title: "Sidebar",
    category: "Navigation & Shell",
    description:
      "Bilah navigasi samping vertikal dengan toggle perluasan (expand/collapse) dan penyimpanan state.",
    importPath:
      'import { Sidebar } from "@/design-system/components/navigation/sidebar/sidebar";',
    component: Sidebar.Root,
    defaultProps: {
      expanded: true,
      expandable: true,
    },
    propsSpec: [
      {
        name: "expanded",
        type: "boolean",
        defaultValue: true,
        description: "Status buka/tutup bilah navigasi sidebar.",
        controlKind: "boolean",
      },
      {
        name: "expandable",
        type: "boolean",
        defaultValue: true,
        description: "Aktifkan kemampuan expand & collapse sidebar.",
        controlKind: "boolean",
      },
      {
        name: "expandedWidth",
        type: "number",
        defaultValue: 240,
        description: "Lebar saat sidebar dalam keadaan expanded.",
        controlKind: "number",
      },
    ],
    generateCode: (props) => {
      const isExpandable = props.expandable !== false;
      const isExpanded = Boolean(props.expanded);
      const expandedW = Number(props.expandedWidth) || 240;

      return `<Sidebar.Root
  sidebarKey={"app-sidebar"}
  expandable={${isExpandable}}
  expanded={${isExpanded}}
  expandedWidth={${expandedW}}
>
  <Sidebar.Header>
    <HStack align={"center"} justify={"space-between"} w={"full"}>
      <HStack align={"center"} gap={2}>
        <Logo boxSize={18} ml={1.5} flexShrink={0} />
        {${isExpanded} && (
          <ClampedP fontSize={"lg"} fontWeight={"semibold"}>
            {"exium"}
          </ClampedP>
        )}
      </HStack>
      {${isExpanded} && (
        <ClampedP mr={1} fontSize={"sm"} color={"fg.subtle"} lineHeight={1}>
          {"v1.0"}
        </ClampedP>
      )}
    </HStack>
  </Sidebar.Header>

  <Sidebar.Body>
    <VScrollContainer>
      <VNavs
        flex={1}
        groups={navGroups}
        navs={navsMap}
        activeKey={activeNavKey}
        expanded={${isExpanded}}
        onNavClick={setActiveNavKey}
        p={3}
      />
    </VScrollContainer>
  </Sidebar.Body>
</Sidebar.Root>`;
    },
    renderPlayground: (props, onPropChange) => {
      const isExpanded = Boolean(props.expanded);
      const isExpandable = Boolean(props.expandable);

      return (
        <SidebarPlaygroundDemo
          expanded={isExpanded}
          expandable={isExpandable}
          expandedWidth={Number(props.expandedWidth) || 240}
          onExpandedChange={(next) => onPropChange?.("expanded", next)}
        />
      );
    },
  },

  v_navs: {
    key: "v_navs",
    title: "VNavs",
    category: "Navigation & Shell",
    description:
      "Navigasi hierarkis vertikal berlapis dengan dukungan pengelompokan (groups), sub-nav collapsible bertingkat, dan mode collapsed/rail.",
    importPath:
      'import { VNavs } from "@/design-system/components/navigation/v-navs/v-navs";',
    component: VNavs,
    defaultProps: {
      expanded: true,
    },
    propsSpec: [
      {
        name: "expanded",
        type: "boolean",
        defaultValue: true,
        description:
          "Status buka/tutup label navigasi (true: full, false: rail).",
        controlKind: "boolean",
      },
    ],
    generateCode: (props) => {
      const isExpanded = Boolean(props.expanded);
      return `<VNavs
  flex={1}
  groups={[
    {
      title: "Menu Utama",
      items: [
        { key: "home" },
        {
          key: "projects",
          children: [{ key: "active_projects" }, { key: "archived_projects" }],
        },
      ],
    },
    {
      title: "Preferensi",
      items: [{ key: "settings" }],
    },
  ]}
  navs={{
    home: { title: "Beranda", icon: HomeIcon },
    projects: { title: "Proyek", icon: FolderIcon },
    active_projects: { title: "Proyek Aktif" },
    archived_projects: { title: "Arsip Proyek" },
    settings: { title: "Pengaturan", icon: SettingsIcon },
  }}
  activeKey={"home"}
  expanded={${isExpanded}}
  onNavClick={(key) => handleSelectNav(key)}
  p={2}
/>`;
    },
    renderPlayground: (props) => {
      const isExpanded = Boolean(props.expanded);
      return <VNavsPlaygroundDemo expanded={isExpanded} />;
    },
  },

  link: {
    key: "link",
    title: "Link",
    category: "Navigation & Shell",
    description:
      "Tautan eksternal dengan target _blank dan styling underline saat di-hover.",
    importPath:
      'import { ExternalLink } from "@/design-system/components/navigation/link/link";',
    component: ExternalLink,
    defaultProps: {
      href: "https://youtube.com",
      children: "Youtube",
    },
    propsSpec: [
      {
        name: "href",
        type: "string",
        defaultValue: undefined,
        required: true,
        description: "Alamat URL tujuan tautan (wajib).",
        controlKind: "text",
      },
      {
        name: "children",
        type: "ReactNode",
        defaultValue: undefined,
        required: true,
        description: "Teks atau elemen anak tautan.",
        controlKind: "text",
      },
      {
        name: "target",
        type: '"_blank" | "_self"',
        defaultValue: "_blank",
        description: "Target pembukaan link browser.",
        controlKind: "select",
        options: ["_blank", "_self"],
      },
    ],
    renderPlayground: (props) => (
      <ExternalLink href={String(props.href || "https://youtube.com")}>
        {String(props.children || "Youtube")}
      </ExternalLink>
    ),
  },

  avatar: {
    key: "avatar",
    title: "Avatar",
    category: "Media & Icons",
    description:
      "Gambar profil pengguna dengan fallback inisial nama otomatis dan status pemuatan.",
    importPath:
      'import { Avatar } from "@/design-system/components/media/avatar/avatar";',
    component: Avatar,
    defaultProps: {
      name: "Sulenq Jolitos",
      size: "lg",
      src: "",
      shape: "full",
    },
    propsSpec: [
      {
        name: "name",
        type: "string",
        defaultValue: undefined,
        description: "Nama pengguna untuk fallback inisial.",
        controlKind: "text",
      },
      {
        name: "size",
        type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
        defaultValue: "lg",
        description: "Ukuran avatar.",
        controlKind: "select",
        options: ["xs", "sm", "md", "lg", "xl", "2xl"],
      },
      {
        name: "src",
        type: "string",
        defaultValue: undefined,
        description: "URL gambar foto profil pengguna.",
        controlKind: "text",
      },
      {
        name: "shape",
        type: '"square" | "rounded" | "full"',
        defaultValue: "full",
        description: "Bentuk bingkai avatar.",
        controlKind: "select",
        options: ["square", "rounded", "full"],
      },
      {
        name: "loading",
        type: '"eager" | "lazy"',
        defaultValue: "lazy",
        description: "Strategi pemuatan gambar.",
        controlKind: "select",
        options: ["eager", "lazy"],
      },
    ],
    renderPlayground: (props) => (
      <Avatar
        name={String(props.name || "Sulenq Jolitos")}
        size={(props.size as "lg") || "lg"}
        src={String(props.src || "")}
        shape={(props.shape as "square" | "rounded" | "full") || "full"}
      />
    ),
  },

  image: {
    key: "image",
    title: "Image",
    category: "Media & Icons",
    description:
      "Komponen gambar responsif dengan penanganan rasio aspek dan border rounded.",
    importPath:
      'import { Image } from "@/design-system/components/media/image/image";',
    component: Image,
    defaultProps: {
      src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80",
      alt: "Contoh Gambar",
      aspectRatio: 1.77,
      withSkeleton: true,
      objectFit: "cover",
    },
    propsSpec: [
      {
        name: "src",
        type: "string",
        defaultValue: undefined,
        required: true,
        description: "URL tautan sumber gambar (wajib).",
        controlKind: "text",
      },
      {
        name: "alt",
        type: "string",
        defaultValue: undefined,
        description: "Teks alternatif deskripsi gambar (wajib).",
        controlKind: "text",
      },
      {
        name: "aspectRatio",
        type: "number",
        defaultValue: 1.77,
        description: "Rasio aspek gambar (lebar / tinggi).",
        controlKind: "number",
      },
      {
        name: "withSkeleton",
        type: "boolean",
        defaultValue: true,
        description: "Tampilkan skeleton saat gambar dalam proses loading.",
        controlKind: "boolean",
      },
      {
        name: "objectFit",
        type: '"cover" | "contain" | "fill"',
        defaultValue: "cover",
        description: "Perilaku penyesuaian gambar dalam kontainer.",
        controlKind: "select",
        options: ["cover", "contain", "fill"],
      },
    ],
    renderPlayground: (props) => (
      <Image
        src={String(
          props.src ||
            "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80",
        )}
        alt={String(props.alt || "Contoh Gambar")}
        aspectRatio={Number(props.aspectRatio) || 1.77}
        withSkeleton={Boolean(props.withSkeleton)}
        objectFit={(props.objectFit as "cover" | "contain" | "fill") || "cover"}
        w={"260px"}
        rounded={"lg"}
      />
    ),
  },

  app_icon: {
    key: "app_icon",
    title: "App Icon",
    category: "Media & Icons",
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

  utilities: {
    key: "utilities",
    title: "Utilities & Downloads",
    category: "Utilities & System",
    description:
      "Utilitas pengunduh berkas otomatis (DownloadTrigger) dan helper ekosistem.",
    importPath:
      'import { DownloadTrigger } from "@/design-system/components/utilities/download-trigger/download-trigger";',
    component: Box,
    defaultProps: {
      fileName: "exium-doc.txt",
      mimeType: "text/plain",
    },
    propsSpec: [
      {
        name: "fileName",
        type: "string",
        defaultValue: "exium-doc.txt",
        description: "Nama file berkas yang akan diunduh (wajib).",
        controlKind: "text",
      },
      {
        name: "mimeType",
        type: "string",
        defaultValue: "text/plain",
        description: "Tipe MIME konten file.",
        controlKind: "select",
        options: [
          "text/plain",
          "application/json",
          "text/csv",
          "application/pdf",
        ],
      },
    ],
    renderPlayground: (props) => (
      <DownloadTrigger
        data={async () =>
          new Blob(["Contoh file download teks Exium DS"], {
            type: String(props.mimeType || "text/plain"),
          })
        }
        fileName={String(props.fileName || "exium-doc.txt")}
        mimeType={String(props.mimeType || "text/plain")}
      >
        <Button variant={"outline"}>
          Download File ({String(props.fileName || "exium-doc.txt")})
        </Button>
      </DownloadTrigger>
    ),
  },
};

const SelectPlaygroundDemo = (props: Record<string, unknown>) => {
  return (
    <Box w={"260px"}>
      <SelectInput
        placeholder={String(props.placeholder || "Pilih status...")}
        size={(props.size as "sm" | "md" | "lg") || "md"}
        disabled={Boolean(props.disabled)}
        options={[
          { label: "Aktif", value: "active" },
          { label: "Menunggu", value: "pending" },
          { label: "Ditangguhkan", value: "suspended" },
        ]}
      />
    </Box>
  );
};

const FocusSelectPlaygroundDemo = (props: Record<string, unknown>) => {
  return (
    <Box w={"260px"}>
      <FocusSelectInput
        modalKey={"docs-focus-select-demo"}
        placeholder={String(props.placeholder || "Pilih kategori...")}
        size={(props.size as "sm" | "md" | "lg") || "md"}
        clearable={Boolean(props.clearable)}
        disabled={Boolean(props.disabled)}
        isFetching={Boolean(props.isFetching)}
        isError={Boolean(props.isError)}
        options={[
          {
            label: "Bidang Tanah",
            value: "bidang",
            description: "Lapisan persil bidang tanah",
          },
          {
            label: "Batas Wilayah",
            value: "wilayah",
            description: "Batas administrasi daerah",
          },
          {
            label: "Zona Nilai Tanah",
            value: "znt",
            description: "Pemetaan valuasi spasial",
          },
        ]}
      />
    </Box>
  );
};

const FocusAlertPlaygroundDemo = (props: Record<string, unknown>) => {
  const { modalKey, open } = usePopModal({ modalKey: "docs-focus-alert-demo" });
  return (
    <VStack gap={3}>
      <Button variant={"outline"} onClick={() => open()}>
        Buka Focus Alert
      </Button>

      <FocusAlertItem
        modalKey={modalKey}
        variant={(props.variant as "neutral") || "neutral"}
        title={"Perhatian Penting"}
        description={
          "Tindakan ini memerlukan perhatian khusus dan konfirmasi pengguna."
        }
      />
    </VStack>
  );
};

const ALL_DEMO_ITEMS: FormattedListItem<TableDemoItem>[] = [
  {
    id: "1",
    data: { name: "Ahmad Dahlan", role: "Surveyor", status: "Aktif" },
    columns: [
      { value: "Ahmad Dahlan", td: "Ahmad Dahlan" },
      { value: "Surveyor", td: "Surveyor" },
      {
        value: "Aktif",
        td: <Badge colorPalette={"green"}>Aktif</Badge>,
      },
    ],
  },
  {
    id: "2",
    data: { name: "Budi Santoso", role: "Verifikator", status: "Pending" },
    columns: [
      { value: "Budi Santoso", td: "Budi Santoso" },
      { value: "Verifikator", td: "Verifikator" },
      {
        value: "Pending",
        td: <Badge colorPalette={"orange"}>Pending</Badge>,
      },
    ],
  },
  {
    id: "3",
    data: { name: "Citra Lestari", role: "Administrator", status: "Nonaktif" },
    columns: [
      { value: "Citra Lestari", td: "Citra Lestari" },
      { value: "Administrator", td: "Administrator" },
      {
        value: "Nonaktif",
        td: <Badge colorPalette={"gray"}>Nonaktif</Badge>,
      },
    ],
  },
  {
    id: "4",
    data: { name: "Dedi Supriadi", role: "Petugas Ukur", status: "Aktif" },
    columns: [
      { value: "Dedi Supriadi", td: "Dedi Supriadi" },
      { value: "Petugas Ukur", td: "Petugas Ukur" },
      {
        value: "Aktif",
        td: <Badge colorPalette={"green"}>Aktif</Badge>,
      },
    ],
  },
  {
    id: "5",
    data: { name: "Eka Wulandari", role: "Validator", status: "Pending" },
    columns: [
      { value: "Eka Wulandari", td: "Eka Wulandari" },
      { value: "Validator", td: "Validator" },
      {
        value: "Pending",
        td: <Badge colorPalette={"orange"}>Pending</Badge>,
      },
    ],
  },
  {
    id: "6",
    data: { name: "Fajar Pratama", role: "Surveyor", status: "Nonaktif" },
    columns: [
      { value: "Fajar Pratama", td: "Fajar Pratama" },
      { value: "Surveyor", td: "Surveyor" },
      {
        value: "Nonaktif",
        td: <Badge colorPalette={"gray"}>Nonaktif</Badge>,
      },
    ],
  },
  {
    id: "7",
    data: { name: "Gita Permata", role: "Verifikator", status: "Aktif" },
    columns: [
      { value: "Gita Permata", td: "Gita Permata" },
      { value: "Verifikator", td: "Verifikator" },
      {
        value: "Aktif",
        td: <Badge colorPalette={"green"}>Aktif</Badge>,
      },
    ],
  },
  {
    id: "8",
    data: { name: "Hadi Kusuma", role: "Administrator", status: "Pending" },
    columns: [
      { value: "Hadi Kusuma", td: "Hadi Kusuma" },
      { value: "Administrator", td: "Administrator" },
      {
        value: "Pending",
        td: <Badge colorPalette={"orange"}>Pending</Badge>,
      },
    ],
  },
  {
    id: "9",
    data: { name: "Indra Wijaya", role: "Petugas Ukur", status: "Nonaktif" },
    columns: [
      { value: "Indra Wijaya", td: "Indra Wijaya" },
      { value: "Petugas Ukur", td: "Petugas Ukur" },
      {
        value: "Nonaktif",
        td: <Badge colorPalette={"gray"}>Nonaktif</Badge>,
      },
    ],
  },
  {
    id: "10",
    data: { name: "Joko Susilo", role: "Validator", status: "Aktif" },
    columns: [
      { value: "Joko Susilo", td: "Joko Susilo" },
      { value: "Validator", td: "Validator" },
      {
        value: "Aktif",
        td: <Badge colorPalette={"green"}>Aktif</Badge>,
      },
    ],
  },
  {
    id: "11",
    data: { name: "Kartika Sari", role: "Surveyor", status: "Pending" },
    columns: [
      { value: "Kartika Sari", td: "Kartika Sari" },
      { value: "Surveyor", td: "Surveyor" },
      {
        value: "Pending",
        td: <Badge colorPalette={"orange"}>Pending</Badge>,
      },
    ],
  },
  {
    id: "12",
    data: { name: "Lukman Hakim", role: "Verifikator", status: "Nonaktif" },
    columns: [
      { value: "Lukman Hakim", td: "Lukman Hakim" },
      { value: "Verifikator", td: "Verifikator" },
      {
        value: "Nonaktif",
        td: <Badge colorPalette={"gray"}>Nonaktif</Badge>,
      },
    ],
  },
  {
    id: "13",
    data: { name: "Maya Anggraini", role: "Administrator", status: "Aktif" },
    columns: [
      { value: "Maya Anggraini", td: "Maya Anggraini" },
      { value: "Administrator", td: "Administrator" },
      {
        value: "Aktif",
        td: <Badge colorPalette={"green"}>Aktif</Badge>,
      },
    ],
  },
  {
    id: "14",
    data: { name: "Nanda Pratama", role: "Petugas Ukur", status: "Pending" },
    columns: [
      { value: "Nanda Pratama", td: "Nanda Pratama" },
      { value: "Petugas Ukur", td: "Petugas Ukur" },
      {
        value: "Pending",
        td: <Badge colorPalette={"orange"}>Pending</Badge>,
      },
    ],
  },
  {
    id: "15",
    data: { name: "Oki Setiawan", role: "Validator", status: "Nonaktif" },
    columns: [
      { value: "Oki Setiawan", td: "Oki Setiawan" },
      { value: "Validator", td: "Validator" },
      {
        value: "Nonaktif",
        td: <Badge colorPalette={"gray"}>Nonaktif</Badge>,
      },
    ],
  },
  {
    id: "16",
    data: { name: "Putri Rahayu", role: "Surveyor", status: "Aktif" },
    columns: [
      { value: "Putri Rahayu", td: "Putri Rahayu" },
      { value: "Surveyor", td: "Surveyor" },
      {
        value: "Aktif",
        td: <Badge colorPalette={"green"}>Aktif</Badge>,
      },
    ],
  },
  {
    id: "17",
    data: { name: "Qori Fadilah", role: "Verifikator", status: "Pending" },
    columns: [
      { value: "Qori Fadilah", td: "Qori Fadilah" },
      { value: "Verifikator", td: "Verifikator" },
      {
        value: "Pending",
        td: <Badge colorPalette={"orange"}>Pending</Badge>,
      },
    ],
  },
  {
    id: "18",
    data: { name: "Rian Hidayat", role: "Administrator", status: "Nonaktif" },
    columns: [
      { value: "Rian Hidayat", td: "Rian Hidayat" },
      { value: "Administrator", td: "Administrator" },
      {
        value: "Nonaktif",
        td: <Badge colorPalette={"gray"}>Nonaktif</Badge>,
      },
    ],
  },
  {
    id: "19",
    data: { name: "Siti Nurhaliza", role: "Petugas Ukur", status: "Aktif" },
    columns: [
      { value: "Siti Nurhaliza", td: "Siti Nurhaliza" },
      { value: "Petugas Ukur", td: "Petugas Ukur" },
      {
        value: "Aktif",
        td: <Badge colorPalette={"green"}>Aktif</Badge>,
      },
    ],
  },
  {
    id: "20",
    data: { name: "Teguh Wibowo", role: "Validator", status: "Pending" },
    columns: [
      { value: "Teguh Wibowo", td: "Teguh Wibowo" },
      { value: "Validator", td: "Validator" },
      {
        value: "Pending",
        td: <Badge colorPalette={"orange"}>Pending</Badge>,
      },
    ],
  },
  {
    id: "21",
    data: { name: "Umar Said", role: "Surveyor", status: "Nonaktif" },
    columns: [
      { value: "Umar Said", td: "Umar Said" },
      { value: "Surveyor", td: "Surveyor" },
      {
        value: "Nonaktif",
        td: <Badge colorPalette={"gray"}>Nonaktif</Badge>,
      },
    ],
  },
  {
    id: "22",
    data: { name: "Vina Panduwinata", role: "Verifikator", status: "Aktif" },
    columns: [
      { value: "Vina Panduwinata", td: "Vina Panduwinata" },
      { value: "Verifikator", td: "Verifikator" },
      {
        value: "Aktif",
        td: <Badge colorPalette={"green"}>Aktif</Badge>,
      },
    ],
  },
  {
    id: "23",
    data: { name: "Wahyu Nugroho", role: "Administrator", status: "Pending" },
    columns: [
      { value: "Wahyu Nugroho", td: "Wahyu Nugroho" },
      { value: "Administrator", td: "Administrator" },
      {
        value: "Pending",
        td: <Badge colorPalette={"orange"}>Pending</Badge>,
      },
    ],
  },
  {
    id: "24",
    data: { name: "Xavier Pratama", role: "Petugas Ukur", status: "Nonaktif" },
    columns: [
      { value: "Xavier Pratama", td: "Xavier Pratama" },
      { value: "Petugas Ukur", td: "Petugas Ukur" },
      {
        value: "Nonaktif",
        td: <Badge colorPalette={"gray"}>Nonaktif</Badge>,
      },
    ],
  },
  {
    id: "25",
    data: { name: "Yusuf Mansur", role: "Validator", status: "Aktif" },
    columns: [
      { value: "Yusuf Mansur", td: "Yusuf Mansur" },
      { value: "Validator", td: "Validator" },
      {
        value: "Aktif",
        td: <Badge colorPalette={"green"}>Aktif</Badge>,
      },
    ],
  },
  {
    id: "26",
    data: { name: "Zainal Arifin", role: "Surveyor", status: "Pending" },
    columns: [
      { value: "Zainal Arifin", td: "Zainal Arifin" },
      { value: "Surveyor", td: "Surveyor" },
      {
        value: "Pending",
        td: <Badge colorPalette={"orange"}>Pending</Badge>,
      },
    ],
  },
  {
    id: "27",
    data: { name: "Agus Setiawan", role: "Verifikator", status: "Nonaktif" },
    columns: [
      { value: "Agus Setiawan", td: "Agus Setiawan" },
      { value: "Verifikator", td: "Verifikator" },
      {
        value: "Nonaktif",
        td: <Badge colorPalette={"gray"}>Nonaktif</Badge>,
      },
    ],
  },
  {
    id: "28",
    data: { name: "Bayu Wicaksono", role: "Administrator", status: "Aktif" },
    columns: [
      { value: "Bayu Wicaksono", td: "Bayu Wicaksono" },
      { value: "Administrator", td: "Administrator" },
      {
        value: "Aktif",
        td: <Badge colorPalette={"green"}>Aktif</Badge>,
      },
    ],
  },
  {
    id: "29",
    data: { name: "Cindy Claudia", role: "Petugas Ukur", status: "Pending" },
    columns: [
      { value: "Cindy Claudia", td: "Cindy Claudia" },
      { value: "Petugas Ukur", td: "Petugas Ukur" },
      {
        value: "Pending",
        td: <Badge colorPalette={"orange"}>Pending</Badge>,
      },
    ],
  },
  {
    id: "30",
    data: { name: "Doni Salmanan", role: "Validator", status: "Nonaktif" },
    columns: [
      { value: "Doni Salmanan", td: "Doni Salmanan" },
      { value: "Validator", td: "Validator" },
      {
        value: "Nonaktif",
        td: <Badge colorPalette={"gray"}>Nonaktif</Badge>,
      },
    ],
  },
  {
    id: "31",
    data: { name: "Endang Suherman", role: "Surveyor", status: "Aktif" },
    columns: [
      { value: "Endang Suherman", td: "Endang Suherman" },
      { value: "Surveyor", td: "Surveyor" },
      {
        value: "Aktif",
        td: <Badge colorPalette={"green"}>Aktif</Badge>,
      },
    ],
  },
  {
    id: "32",
    data: { name: "Firman Utina", role: "Verifikator", status: "Pending" },
    columns: [
      { value: "Firman Utina", td: "Firman Utina" },
      { value: "Verifikator", td: "Verifikator" },
      {
        value: "Pending",
        td: <Badge colorPalette={"orange"}>Pending</Badge>,
      },
    ],
  },
  {
    id: "33",
    data: { name: "Guntur Triyoga", role: "Administrator", status: "Nonaktif" },
    columns: [
      { value: "Guntur Triyoga", td: "Guntur Triyoga" },
      { value: "Administrator", td: "Administrator" },
      {
        value: "Nonaktif",
        td: <Badge colorPalette={"gray"}>Nonaktif</Badge>,
      },
    ],
  },
  {
    id: "34",
    data: { name: "Hesti Purwadinata", role: "Petugas Ukur", status: "Aktif" },
    columns: [
      { value: "Hesti Purwadinata", td: "Hesti Purwadinata" },
      { value: "Petugas Ukur", td: "Petugas Ukur" },
      {
        value: "Aktif",
        td: <Badge colorPalette={"green"}>Aktif</Badge>,
      },
    ],
  },
  {
    id: "35",
    data: { name: "Iman Santoso", role: "Validator", status: "Pending" },
    columns: [
      { value: "Iman Santoso", td: "Iman Santoso" },
      { value: "Validator", td: "Validator" },
      {
        value: "Pending",
        td: <Badge colorPalette={"orange"}>Pending</Badge>,
      },
    ],
  },
  {
    id: "36",
    data: { name: "Julia Perez", role: "Surveyor", status: "Nonaktif" },
    columns: [
      { value: "Julia Perez", td: "Julia Perez" },
      { value: "Surveyor", td: "Surveyor" },
      {
        value: "Nonaktif",
        td: <Badge colorPalette={"gray"}>Nonaktif</Badge>,
      },
    ],
  },
  {
    id: "37",
    data: { name: "Kevin Sanjaya", role: "Verifikator", status: "Aktif" },
    columns: [
      { value: "Kevin Sanjaya", td: "Kevin Sanjaya" },
      { value: "Verifikator", td: "Verifikator" },
      {
        value: "Aktif",
        td: <Badge colorPalette={"green"}>Aktif</Badge>,
      },
    ],
  },
  {
    id: "38",
    data: { name: "Lilis Karlina", role: "Administrator", status: "Pending" },
    columns: [
      { value: "Lilis Karlina", td: "Lilis Karlina" },
      { value: "Administrator", td: "Administrator" },
      {
        value: "Pending",
        td: <Badge colorPalette={"orange"}>Pending</Badge>,
      },
    ],
  },
  {
    id: "39",
    data: { name: "Mirza Ghulam", role: "Petugas Ukur", status: "Nonaktif" },
    columns: [
      { value: "Mirza Ghulam", td: "Mirza Ghulam" },
      { value: "Petugas Ukur", td: "Petugas Ukur" },
      {
        value: "Nonaktif",
        td: <Badge colorPalette={"gray"}>Nonaktif</Badge>,
      },
    ],
  },
  {
    id: "40",
    data: { name: "Nadia Vega", role: "Validator", status: "Aktif" },
    columns: [
      { value: "Nadia Vega", td: "Nadia Vega" },
      { value: "Validator", td: "Validator" },
      {
        value: "Aktif",
        td: <Badge colorPalette={"green"}>Aktif</Badge>,
      },
    ],
  },
  {
    id: "41",
    data: { name: "Onky Alexander", role: "Surveyor", status: "Pending" },
    columns: [
      { value: "Onky Alexander", td: "Onky Alexander" },
      { value: "Surveyor", td: "Surveyor" },
      {
        value: "Pending",
        td: <Badge colorPalette={"orange"}>Pending</Badge>,
      },
    ],
  },
  {
    id: "42",
    data: {
      name: "Panji Trihatmodjo",
      role: "Verifikator",
      status: "Nonaktif",
    },
    columns: [
      { value: "Panji Trihatmodjo", td: "Panji Trihatmodjo" },
      { value: "Verifikator", td: "Verifikator" },
      {
        value: "Nonaktif",
        td: <Badge colorPalette={"gray"}>Nonaktif</Badge>,
      },
    ],
  },
  {
    id: "43",
    data: { name: "Queen Latifah", role: "Administrator", status: "Aktif" },
    columns: [
      { value: "Queen Latifah", td: "Queen Latifah" },
      { value: "Administrator", td: "Administrator" },
      {
        value: "Aktif",
        td: <Badge colorPalette={"green"}>Aktif</Badge>,
      },
    ],
  },
  {
    id: "44",
    data: { name: "Raffi Ahmad", role: "Petugas Ukur", status: "Pending" },
    columns: [
      { value: "Raffi Ahmad", td: "Raffi Ahmad" },
      { value: "Petugas Ukur", td: "Petugas Ukur" },
      {
        value: "Pending",
        td: <Badge colorPalette={"orange"}>Pending</Badge>,
      },
    ],
  },
  {
    id: "45",
    data: { name: "Sule Prikitiew", role: "Validator", status: "Nonaktif" },
    columns: [
      { value: "Sule Prikitiew", td: "Sule Prikitiew" },
      { value: "Validator", td: "Validator" },
      {
        value: "Nonaktif",
        td: <Badge colorPalette={"gray"}>Nonaktif</Badge>,
      },
    ],
  },
  {
    id: "46",
    data: { name: "Taufik Hidayat", role: "Surveyor", status: "Aktif" },
    columns: [
      { value: "Taufik Hidayat", td: "Taufik Hidayat" },
      { value: "Surveyor", td: "Surveyor" },
      {
        value: "Aktif",
        td: <Badge colorPalette={"green"}>Aktif</Badge>,
      },
    ],
  },
  {
    id: "47",
    data: { name: "Uut Permatasari", role: "Verifikator", status: "Pending" },
    columns: [
      { value: "Uut Permatasari", td: "Uut Permatasari" },
      { value: "Verifikator", td: "Verifikator" },
      {
        value: "Pending",
        td: <Badge colorPalette={"orange"}>Pending</Badge>,
      },
    ],
  },
  {
    id: "48",
    data: { name: "Vicky Prasetyo", role: "Administrator", status: "Nonaktif" },
    columns: [
      { value: "Vicky Prasetyo", td: "Vicky Prasetyo" },
      { value: "Administrator", td: "Administrator" },
      {
        value: "Nonaktif",
        td: <Badge colorPalette={"gray"}>Nonaktif</Badge>,
      },
    ],
  },
  {
    id: "49",
    data: { name: "Wulan Guritno", role: "Petugas Ukur", status: "Aktif" },
    columns: [
      { value: "Wulan Guritno", td: "Wulan Guritno" },
      { value: "Petugas Ukur", td: "Petugas Ukur" },
      {
        value: "Aktif",
        td: <Badge colorPalette={"green"}>Aktif</Badge>,
      },
    ],
  },
  {
    id: "50",
    data: { name: "Yayan Ruhian", role: "Validator", status: "Pending" },
    columns: [
      { value: "Yayan Ruhian", td: "Yayan Ruhian" },
      { value: "Validator", td: "Validator" },
      {
        value: "Pending",
        td: <Badge colorPalette={"orange"}>Pending</Badge>,
      },
    ],
  },
];

const DataTablePlaygroundDemo = ({
  props,
  onPropChange,
}: {
  props?: Record<string, unknown>;
  onPropChange?: (name: string, value: unknown) => void;
}) => {
  // Props
  const withNumbering =
    props?.withNumbering !== undefined ? Boolean(props.withNumbering) : true;
  const canBatchSelect =
    props?.canBatchSelect !== undefined ? Boolean(props.canBatchSelect) : true;
  const fixedItemHeight =
    props?.fixedItemHeight !== undefined
      ? Boolean(props.fixedItemHeight)
      : true;
  const rawPage = Number(props?.page) || 1;
  const page = Math.max(1, rawPage);
  const pageSize = Math.max(1, Number(props?.pageSize) || 20);

  // Handlers (sync page / pageSize back to playground knobs)
  const setPage = (nextPage: number) => {
    const validPage = Math.max(1, nextPage);
    onPropChange?.("page", validPage);
  };

  const setPageSize = (nextSize: number) => {
    onPropChange?.("pageSize", nextSize);
    onPropChange?.("page", 1);
  };

  // Pagination Slice
  const startIndex = (page - 1) * pageSize;
  const paginatedItems = ALL_DEMO_ITEMS.slice(
    startIndex,
    startIndex + pageSize,
  );
  const totalPage = Math.ceil(ALL_DEMO_ITEMS.length / pageSize);

  // Derived Values — Single useMemo for DataList Table Pattern
  const dataList = useMemo(
    () => ({
      headers: [
        { th: "Nama", sortable: true },
        { th: "Peran", sortable: true },
        { th: "Status", sortable: false },
      ] as FormattedTableHeader[],
      items: paginatedItems,
      batchActions: [] as DataViewBatchActionsGenerator<TableDemoItem>[],
      itemActions: [
        {
          key: "view",
          label: "Lihat Detail",
          icon: EyeIcon,
          onClick: (item: TableDemoItem) => {
            toast.info(`Melihat data ${item.name}`);
          },
        },
        {
          key: "edit",
          label: "Edit Data",
          icon: EditIcon,
          onClick: (item: TableDemoItem) => {
            toast.info(`Mengedit data ${item.name}`);
          },
        },
        {
          key: "delete",
          label: "Hapus",
          icon: Trash2Icon,
          colorPalette: "red",
          modal: {
            triggerComponent: (item: TableDemoItem) => (
              <ConfirmationTrigger
                modalKey={`docs-table-delete-${item.name}`}
                title={"Hapus Data"}
                description={`Data ${item.name} akan dihapus secara permanen dan tidak dapat dibatalkan.`}
                confirmLabel={"Hapus"}
                colorPalette={"red"}
                onConfirm={() => {
                  toast.success(`Data ${item.name} berhasil dihapus.`);
                }}
              />
            ),
          },
        },
      ] as DataViewItemActionsGenerator<TableDemoItem>[],
    }),
    [paginatedItems],
  );

  return (
    <VStack w={"full"} maxW={"650px"} gap={0} align={"stretch"}>
      <DataViewTable.Root
        headers={dataList.headers}
        items={dataList.items}
        itemActions={dataList.itemActions}
        batchActions={dataList.batchActions}
        withNumbering={withNumbering}
        canBatchSelect={canBatchSelect}
        fixedItemHeight={fixedItemHeight}
        page={page}
        pageSize={pageSize}
      >
        <DataViewTable.Header />
        <DataViewTable.Body />
      </DataViewTable.Root>

      <DataViewFooter
        currentDataLength={dataList.items.length}
        totalData={ALL_DEMO_ITEMS.length}
        totalPage={totalPage}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </VStack>
  );
};

const DrawerPlaygroundDemo = (props?: Record<string, unknown>) => {
  const placement =
    (props?.placement as "start" | "end" | "top" | "bottom") || "end";
  const size =
    (props?.size as "xs" | "sm" | "md" | "lg" | "xl" | "full") || "xs";

  const { modalKey, isOpen, open, close } = usePopModal({
    modalKey: "docs-drawer",
  });
  return (
    <Drawer.Root
      modalKey={modalKey}
      opened={isOpen}
      open={open}
      close={close}
      placement={placement}
      size={size}
    >
      <Drawer.Trigger asChild>
        <Button variant={"outline"}>Buka Drawer Samping</Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <P fontWeight={"bold"} fontSize={"lg"}>
            Drawer Exium
          </P>
        </Drawer.Header>
        <Drawer.Body>
          <VStack gap={"md"}>
            <P color={"fg.muted"}>
              Panel geser samping untuk form, filter detail, atau konfigurasi
              sekunder aplikasi.
            </P>
            <P color={"fg.muted"}>
              Desain sistem Exium menyediakan drawer dengan adaptasi responsif,
              gesture swipe to dismiss pada mobile, dan integrasi riwayat URL.
            </P>
            <P color={"fg.muted"}>
              Konten panjang ini disiapkan untuk mendemonstrasikan scroll
              container di dalam body drawer, menjaga header dan footer tetap
              terpasang rapi (fixed).
            </P>
            <P color={"fg.muted"}>
              Baris tambahan 1: Navigasi URL otomatis menyinkronkan query param
              overlay sehingga tombol back pada peramban berfungsi secara
              native.
            </P>
            <P color={"fg.muted"}>
              Baris tambahan 2: Ukuran default menggunakan token xs yang kompak,
              elegan, dan proporsional untuk formulir data entri.
            </P>
            <P color={"fg.muted"}>
              Baris tambahan 3: Tombol aksi pada footer diatur full-width agar
              mudah dijangkau oleh pengguna baik di desktop maupun layar sentuh.
            </P>
          </VStack>
        </Drawer.Body>
        <Drawer.Footer>
          <Button w={"full"} variant={"outline"} onClick={close}>
            Tutup Drawer
          </Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer.Root>
  );
};

const DialogPlaygroundDemo = (props?: Record<string, unknown>) => {
  const size =
    (props?.size as "xs" | "sm" | "md" | "lg" | "xl" | "full") || "xs";
  const placement = (props?.placement as "center" | "top") || "center";
  const scrollBehavior =
    (props?.scrollBehavior as "inside" | "outside") || "inside";

  const { modalKey, isOpen, open, close } = usePopModal({
    modalKey: "docs-dialog",
  });

  return (
    <Dialog.Root
      modalKey={modalKey}
      opened={isOpen}
      open={open}
      close={close}
      size={size}
      placement={placement}
      scrollBehavior={scrollBehavior}
    >
      <Dialog.Trigger asChild>
        <Button variant={"outline"}>Buka Dialog Preview</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <P fontSize={"lg"} fontWeight={"bold"} textAlign={"center"}>
            Exium Dialog Title
          </P>
        </Dialog.Header>
        <Dialog.Body>
          <VStack gap={"md"}>
            <P color={"fg.muted"}>
              Ini adalah contoh dialog modal terpusat dari Exium Design System
              dengan animasi origin klik halus dan backdrop blur.
            </P>
            <P color={"fg.muted"}>
              Dengan opsi scrollBehavior={scrollBehavior}, jika konten di dalam
              body melebihi batas ketinggian viewport, scroll container internal
              akan aktif secara otomatis tanpa merusak tata letak dialog.
            </P>
            <P color={"fg.muted"}>
              Scroll test paragraf 1: Exium Design System mengutamakan
              konsistensi UX pada overlay dengan menyinkronkan state ke query
              param URL ?overlay=.
            </P>
            <P color={"fg.muted"}>
              Scroll test paragraf 2: Setiap modal anak yang bersarang (nested)
              mewarisi prefix induk dengan notasi titik (.childKey) agar tidak
              memicu unmount pada dialog induk.
            </P>
            <P color={"fg.muted"}>
              Scroll test paragraf 3: Ukuran modal standar kini menggunakan
              default xs untuk tampilan yang ringkas, bersih, dan fokus pada
              konten esensial.
            </P>
            <P color={"fg.muted"}>
              Scroll test paragraf 4: Tombol aksi utama maupun pembatalan di
              area footer menggunakan lebar penuh (full width) untuk ergonomi
              klik maksimal.
            </P>
          </VStack>
        </Dialog.Body>
        <Dialog.Footer>
          <Button w={"full"} variant={"outline"} onClick={close}>
            Tutup Dialog
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
};

const ModalPlaygroundDemo = ({
  size = "xs",
}: {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
}) => {
  const { modalKey, isOpen, open, close } = usePopModal({
    modalKey: "docs-modal",
  });

  return (
    <Modal.Root
      modalKey={modalKey}
      opened={isOpen}
      open={open}
      close={close}
      size={size}
    >
      <Modal.Trigger asChild>
        <Button variant={"outline"}>Buka Modal Adaptif</Button>
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title textAlign={"center"} fontWeight={"bold"} fontSize={"lg"}>
            Exium Adaptive Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <VStack gap={"md"}>
            <P color={"fg.muted"}>
              Modal adaptif Exium secara cerdas merender komponen Dialog
              mengambang pada layar desktop, dan otomatis bertransformasi
              menjadi Drawer geser bawah pada layar ponsel.
            </P>
            <P color={"fg.muted"}>
              Perubahan ukuran viewport langsung mengadaptasi layout modal
              secara mulus tanpa kehilangan data form atau memicu reload status
              URL.
            </P>
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button w={"full"} variant={"outline"} onClick={close}>
            Tutup Modal
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
};

const DEMO_NAV_GROUPS: NavGroup[] = [
  {
    title: "Menu Utama",
    items: [
      { key: "home" },
      {
        key: "projects",
        children: [{ key: "active_projects" }, { key: "archived_projects" }],
      },
    ],
  },
  {
    title: "Sistem",
    items: [
      {
        key: "organization",
        children: [{ key: "members" }, { key: "roles" }],
      },
      { key: "settings" },
    ],
  },
];

const DEMO_NAVS_MAP: Record<string, NavItem> = {
  home: {
    title: "Beranda",
    icon: HomeIcon,
  },
  projects: {
    title: "Proyek",
    icon: FolderIcon,
  },
  active_projects: {
    title: "Proyek Aktif",
  },
  archived_projects: {
    title: "Arsip Proyek",
  },
  organization: {
    title: "Organisasi",
    icon: LayersIcon,
  },
  members: {
    title: "Anggota",
    icon: UserIcon,
  },
  roles: {
    title: "Peran Akses",
  },
  settings: {
    title: "Pengaturan",
    icon: SettingsIcon,
  },
};

const SidebarPlaygroundDemo = ({
  expanded,
  expandable,
  expandedWidth,
  onExpandedChange,
}: {
  expanded: boolean;
  expandable: boolean;
  expandedWidth: number;
  onExpandedChange?: (next: boolean) => void;
}) => {
  const [activeNavKey, setActiveNavKey] = useState("home");
  const { theme } = useThemeStore();

  return (
    <Box
      w={"full"}
      h={"360px"}
      border={"1px solid"}
      borderColor={"border.subtle"}
      rounded={"md"}
      bg={"bg.canvas"}
      display={"flex"}
      alignItems={"stretch"}
      justifyContent={"start"}
      overflow={"hidden"}
      pos={"relative"}
    >
      <Sidebar.Root
        sidebarKey={"demo-playground-sidebar"}
        expandable={expandable}
        expanded={expanded}
        onExpandedChange={onExpandedChange}
        expandedWidth={expandedWidth}
        h={"full"}
      >
        <Sidebar.Header>
          <HStack align={"center"} justify={"space-between"} w={"full"}>
            <HStack align={"center"} gap={2}>
              <Logo boxSize={18} ml={1.5} flexShrink={0} />

              <ClampedP
                w={expanded ? "" : 0}
                fontSize={"lg"}
                fontWeight={"semibold"}
                color={`${theme.colorPalette}.fg`}
                mb={"3px"}
              >
                {"exium"}
              </ClampedP>
            </HStack>

            <ClampedP
              w={expanded ? "" : 0}
              mr={1}
              fontSize={"sm"}
              transition={"200ms"}
              color={"fg.subtle"}
              lineHeight={1}
            >
              {"v1.0"}
            </ClampedP>
          </HStack>
        </Sidebar.Header>

        <Sidebar.Body>
          <VScrollContainer>
            <VNavs
              flex={1}
              groups={DEMO_NAV_GROUPS}
              navs={DEMO_NAVS_MAP}
              activeKey={activeNavKey}
              expanded={expanded}
              onNavClick={setActiveNavKey}
              p={3}
            />
          </VScrollContainer>
        </Sidebar.Body>
      </Sidebar.Root>

      {/* Simulated content area */}
      <Box
        flex={1}
        p={6}
        bg={"bg.subtle"}
        display={"flex"}
        flexDirection={"column"}
        gap={4}
      >
        <HStack justify={"space-between"} align={"center"}>
          <P fontWeight={"semibold"} fontSize={"md"}>
            {"Area Konten Utama"}
          </P>
          <Badge colorPalette={"blue"} variant={"subtle"}>
            {`Navigasi Aktif: ${DEMO_NAVS_MAP[activeNavKey]?.title ?? activeNavKey}`}
          </Badge>
        </HStack>
        <P fontSize={"sm"} color={"fg.muted"}>
          {
            "Sidebar dan VNavs memiliki proporsi padding (p={3}), header default, logo branding, serta pemisah yang identik dengan navigasi dokumentasi sistem."
          }
        </P>
      </Box>
    </Box>
  );
};

const VNavsPlaygroundDemo = ({ expanded }: { expanded: boolean }) => {
  const [activeNavKey, setActiveNavKey] = useState("home");

  return (
    <Box
      w={"full"}
      maxW={"300px"}
      h={"360px"}
      border={"1px solid"}
      borderColor={"border.subtle"}
      rounded={"md"}
      bg={"bg.body"}
      overflow={"hidden"}
    >
      <VScrollContainer>
        <VNavs
          flex={1}
          groups={DEMO_NAV_GROUPS}
          navs={DEMO_NAVS_MAP}
          activeKey={activeNavKey}
          expanded={expanded}
          onNavClick={setActiveNavKey}
          p={3}
        />
      </VScrollContainer>
    </Box>
  );
};
