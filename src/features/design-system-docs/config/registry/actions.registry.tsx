// src/features/design-system-docs/config/registry/actions.registry.tsx

import { BackButton } from "@/design-system/components/button/back-button/back-button";
import { Button } from "@/design-system/components/button/button/button";
import {
  ColorModeToggleButton,
  ColorModeToggleTrigger,
} from "@/design-system/components/button/color-mode/color-mode";
import { HStack } from "@/design-system/components/layout/flex-box/flex-box";
import { DownloadTrigger } from "@/design-system/components/utilities/download-trigger/download-trigger";
import type { ComponentDocSpec } from "@/features/design-system-docs/types/ds-docs-spec.type";

const DEMO_CSV = "eartag,jenis,berat_kg\nTQ-0001,Sapi,412\nTQ-0002,Kambing,38\n";

export const ACTIONS_DOCS: Record<string, ComponentDocSpec> = {
  back_button: {
    key: "back_button",
    title: "BackButton",
    category: "Buttons",
    description:
      "Tombol kembali ke halaman sebelumnya lewat history browser. Default berupa IconButton dengan tooltip; set `isIconButton={false}` untuk tombol berlabel.",
    importPath:
      'import { BackButton } from "@/design-system/components/button/back-button/back-button";',
    component: BackButton,
    defaultProps: { isIconButton: true, preventNativeBack: true },
    propsSpec: [
      {
        name: "isIconButton",
        type: "boolean",
        defaultValue: true,
        description: "Tampilkan sebagai IconButton (dengan tooltip) atau Button berlabel.",
        controlKind: "boolean",
      },
      {
        name: "preventNativeBack",
        type: "boolean",
        defaultValue: false,
        description:
          "Jangan panggil `history.back()`; pakai saat navigasi ditangani sendiri lewat `onClick`. Di demo ini aktif supaya halaman docs tidak berpindah.",
        controlKind: "boolean",
      },
      {
        name: "icon",
        type: "ComponentType",
        description: "Ganti ikon panah default.",
      },
    ],
    renderPlayground: (props) => (
      <BackButton
        isIconButton={Boolean(props.isIconButton)}
        preventNativeBack={Boolean(props.preventNativeBack)}
      />
    ),
  },

  color_mode: {
    key: "color_mode",
    title: "ColorMode",
    category: "Buttons",
    description:
      "ColorModeToggleButton mengganti mode terang dan gelap. ColorModeToggleTrigger membungkus elemen apa pun (misalnya item menu) agar berfungsi sebagai toggle.",
    importPath:
      'import { ColorModeToggleButton, ColorModeToggleTrigger } from "@/design-system/components/button/color-mode/color-mode";',
    component: ColorModeToggleButton,
    defaultProps: {},
    propsSpec: [
      {
        name: "...IconButtonProps",
        type: "IconButtonProps",
        description: "ColorModeToggleButton menerima semua props IconButton.",
      },
    ],
    renderPlayground: () => (
      <HStack gap={3}>
        <ColorModeToggleButton />
        <ColorModeToggleTrigger>
          <Button variant={"outline"}>{"Ganti tema"}</Button>
        </ColorModeToggleTrigger>
      </HStack>
    ),
  },

  download_trigger: {
    key: "download_trigger",
    title: "DownloadTrigger",
    category: "Utilities",
    description:
      "Mengunduh data dari memori (string, Blob, atau fungsi async) sebagai file saat child-nya diklik, tanpa membuat URL atau anchor sendiri.",
    importPath:
      'import { DownloadTrigger } from "@/design-system/components/utilities/download-trigger/download-trigger";',
    component: DownloadTrigger,
    defaultProps: { fileName: "data-ternak.csv" },
    propsSpec: [
      {
        name: "data",
        type: "string | Blob | (() => Promise<string | Blob>)",
        required: true,
        description: "Isi file. Fungsi async dipanggil saat diklik, cocok untuk ekspor dari API.",
      },
      {
        name: "fileName",
        type: "string",
        required: true,
        defaultValue: "data-ternak.csv",
        description: "Nama file hasil unduhan.",
        controlKind: "text",
      },
      {
        name: "mimeType",
        type: "string",
        required: true,
        description: "MIME type file, misalnya `text/csv`.",
      },
    ],
    renderPlayground: (props) => (
      <DownloadTrigger
        data={DEMO_CSV}
        fileName={String(props.fileName || "data-ternak.csv")}
        mimeType={"text/csv"}
      >
        <Button variant={"outline"}>{"Unduh CSV"}</Button>
      </DownloadTrigger>
    ),
  },
};
