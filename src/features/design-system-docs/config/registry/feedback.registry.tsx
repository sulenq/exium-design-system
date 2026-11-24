// src/features/design-system-docs/config/registry/feedback.registry.tsx

import { Button } from "@/design-system/components/button/button/button";
import { NotFoundPage } from "@/design-system/components/error-boundary/not-found/not-found.page";
import FeedbackState from "@/design-system/components/feedback/feedback-state/feedback-state";
import {
  CheckIndicator,
  DotIndicator,
  RadioIndicator,
} from "@/design-system/components/feedback/indicator/indicator";
import { Loader } from "@/design-system/components/feedback/loader/loader";
import { TopBarLoader } from "@/design-system/components/feedback/top-bar-loader/top-bar-loader";
import { Box } from "@/design-system/components/layout/box/box";
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { P } from "@/design-system/components/typography/p/p";
import { OfflineAlert } from "@/design-system/components/utilities/offline-alert/offline-alert";
import type { ComponentDocSpec } from "@/features/design-system-docs/types/ds-docs-spec.type";
import { WifiOffIcon } from "lucide-react";

export const FEEDBACK_DOCS: Record<string, ComponentDocSpec> = {
  loader: {
    key: "loader",
    title: "Loader",
    category: "Feedback",
    description:
      "Spinner untuk proses singkat di dalam komponen (tombol, kartu, panel). Untuk konten yang sedang dimuat, pakai Skeleton agar layout tidak meloncat.",
    importPath:
      'import { Loader } from "@/design-system/components/feedback/loader/loader";',
    component: Loader,
    defaultProps: { size: "sm" },
    propsSpec: [
      {
        name: "size",
        type: "string",
        defaultValue: "sm",
        description: "Ukuran spinner.",
        controlKind: "select",
        options: ["xs", "sm", "md", "lg", "xl"],
      },
      {
        name: "color",
        type: "string",
        description: "Warna spinner, misalnya `fg.muted`.",
      },
    ],
    a11y: {
      notes:
        "Saat Loader menggantikan konten, beri teks `srOnly` atau `aria-busy` pada container supaya screen reader tahu ada proses.",
    },
    renderPlayground: (props) => (
      <Loader size={(props.size as "sm") || "sm"} />
    ),
  },

  indicator: {
    key: "indicator",
    title: "Indicator",
    category: "Feedback",
    description:
      "Penanda status terpilih: DotIndicator (titik), CheckIndicator (centang), dan RadioIndicator (lingkaran radio). Dipakai di dalam item list atau kartu pilihan.",
    importPath:
      'import { CheckIndicator, DotIndicator, RadioIndicator } from "@/design-system/components/feedback/indicator/indicator";',
    component: DotIndicator,
    defaultProps: { checked: true },
    propsSpec: [
      {
        name: "checked",
        type: "boolean",
        defaultValue: true,
        description: "Status terpilih.",
        controlKind: "boolean",
      },
      {
        name: "size",
        type: "string",
        description: "Ukuran RadioIndicator.",
        options: ["xs", "sm", "md", "lg", "xl"],
      },
    ],
    a11y: {
      notes:
        "Indicator hanya visual. Status terpilih tetap harus disampaikan lewat elemen interaktifnya, misalnya `aria-checked` atau `aria-selected`.",
    },
    renderPlayground: (props) => (
      <HStack gap={6} align={"center"}>
        <VStack gap={1} align={"center"}>
          <DotIndicator checked={Boolean(props.checked)} />
          <P fontSize={"xs"} color={"fg.muted"}>
            {"Dot"}
          </P>
        </VStack>
        <VStack gap={1} align={"center"}>
          <CheckIndicator checked={Boolean(props.checked)} />
          <P fontSize={"xs"} color={"fg.muted"}>
            {"Check"}
          </P>
        </VStack>
        <VStack gap={1} align={"center"}>
          <RadioIndicator checked={Boolean(props.checked)} />
          <P fontSize={"xs"} color={"fg.muted"}>
            {"Radio"}
          </P>
        </VStack>
      </HStack>
    ),
  },

  top_bar_loader: {
    key: "top_bar_loader",
    title: "TopBarLoader",
    category: "Feedback",
    description:
      "Progress bar tipis di bagian atas layar untuk navigasi atau fetch di latar belakang. Bergerak bertahap lalu menghilang setelah selesai.",
    importPath:
      'import { TopBarLoader } from "@/design-system/components/feedback/top-bar-loader/top-bar-loader";',
    component: TopBarLoader,
    defaultProps: { isFetching: false },
    propsSpec: [
      {
        name: "isFetching",
        type: "boolean",
        defaultValue: false,
        description: "Nyalakan untuk menampilkan bar. Lihat bagian paling atas layar.",
        controlKind: "boolean",
      },
    ],
    renderPlayground: (props) => (
      <VStack gap={2} align={"center"}>
        <TopBarLoader isFetching={Boolean(props.isFetching)} />
        <P fontSize={"sm"} color={"fg.muted"}>
          {"Aktifkan isFetching, lalu lihat bagian paling atas layar."}
        </P>
      </VStack>
    ),
  },

  feedback_state: {
    key: "feedback_state",
    title: "FeedbackState",
    category: "Feedback",
    description:
      "Kerangka dasar untuk state kosong, error, dan hasil tidak ditemukan: ikon, judul, deskripsi, dan aksi. StateNoData, StateNoResult, dan StateRetry dibangun di atasnya.",
    importPath:
      'import FeedbackState from "@/design-system/components/feedback/feedback-state/feedback-state";',
    component: FeedbackState,
    defaultProps: {
      title: "Sedang offline",
      description: "Data akan dikirim otomatis saat koneksi kembali.",
      withAction: true,
    },
    propsSpec: [
      {
        name: "title",
        type: "string",
        defaultValue: "Sedang offline",
        description: "Judul state.",
        controlKind: "text",
      },
      {
        name: "description",
        type: "string",
        defaultValue: "Data akan dikirim otomatis saat koneksi kembali.",
        description: "Penjelasan singkat apa yang terjadi dan langkah berikutnya.",
        controlKind: "text",
      },
      {
        name: "withAction",
        type: "boolean",
        defaultValue: true,
        description: "Demo: tampilkan tombol aksi sebagai children.",
        controlKind: "boolean",
      },
      {
        name: "icon",
        type: "ComponentType",
        description: "Ikon di atas judul.",
      },
    ],
    renderPlayground: (props) => (
      <FeedbackState
        icon={WifiOffIcon}
        title={String(props.title ?? "")}
        description={String(props.description ?? "")}
      >
        {Boolean(props.withAction) && <Button variant={"outline"}>{"Coba lagi"}</Button>}
      </FeedbackState>
    ),
  },

  not_found_page: {
    key: "not_found_page",
    title: "NotFoundPage",
    category: "Feedback",
    description:
      "Halaman 404 siap pakai untuk route yang tidak ditemukan, dengan aksi kembali dan ke halaman utama. Pasang sebagai `notFoundComponent` di router.",
    importPath:
      'import { NotFoundPage } from "@/design-system/components/error-boundary/not-found/not-found.page";',
    component: NotFoundPage,
    defaultProps: {},
    propsSpec: [],
    renderPlayground: () => (
      <Box w={"full"} h={"360px"} overflow={"hidden"} border={"1px solid"} borderColor={"border.subtle"} rounded={"md"}>
        <NotFoundPage />
      </Box>
    ),
  },

  offline_alert: {
    key: "offline_alert",
    title: "OfflineAlert",
    category: "Feedback",
    description:
      "Pemberitahuan saat perangkat offline. Dengan `persistent`, pill status tetap tampil selama offline, sehingga petugas lapangan selalu tahu data belum terkirim.",
    importPath:
      'import { OfflineAlert } from "@/design-system/components/utilities/offline-alert/offline-alert";',
    component: OfflineAlert,
    defaultProps: { persistent: true },
    propsSpec: [
      {
        name: "persistent",
        type: "boolean",
        defaultValue: true,
        description: "Pertahankan pill status selama perangkat offline.",
        controlKind: "boolean",
      },
    ],
    a11y: {
      role: "status",
      notes: "Pill memakai `role=\"status\"` sehingga perubahan koneksi dibacakan screen reader.",
    },
    renderPlayground: (props) => (
      <VStack gap={3} align={"center"}>
        <OfflineAlert persistent={Boolean(props.persistent)} />
        <HStack gap={2}>
          <Button
            variant={"outline"}
            onClick={() => window.dispatchEvent(new Event("app:network-offline"))}
          >
            {"Simulasikan offline"}
          </Button>
          <Button
            variant={"outline"}
            onClick={() => window.dispatchEvent(new Event("online"))}
          >
            {"Simulasikan online"}
          </Button>
        </HStack>
      </VStack>
    ),
  },
};
