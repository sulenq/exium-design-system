import { FocusAlertPlaygroundDemo } from "@/features/design-system-docs/config/registry/core.demos";
import { Button } from "@/design-system/components/button/button/button";
import { ConfirmationTrigger } from "@/design-system/components/feedback/confirmation-trigger/confirmation-trigger";
import { Alert } from "@/design-system/components/feedback/alert/alert";
import { Progress, ProgressRoot } from "@/design-system/components/feedback/progress/progress";
import { Skeleton } from "@/design-system/components/feedback/skeleton/skeleton";
import { StateNoData } from "@/design-system/components/feedback/state-no-data/state.no-data";
import { Box } from "@/design-system/components/layout/box/box";
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { toast } from "@/design-system/components/toast";
import { P } from "@/design-system/components/typography/p/p";
import { COLOR_PALETTE_OPTIONS } from "@/design-system/constants/colors";
import type { ComponentDocSpec } from "@/features/design-system-docs/types/ds-docs-spec.type";

export const FEEDBACK_CORE_DOCS: Record<string, ComponentDocSpec> = {

  progress: {
    key: "progress",
    title: "Progress",
    category: "Feedback",
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
    generateCode: (props) => {
      const val = Number(props.value) || 0;
      const sizeProp =
        props.size && props.size !== "md" ? ` size={"${props.size}"}` : "";
      const colorProp =
        props.colorPalette && props.colorPalette !== "blue"
          ? ` colorPalette={"${props.colorPalette}"}`
          : "";
      const animProp = props.animated ? ` striped={true} animated={true}` : "";

      return `<Progress.Root value={${val}}${colorProp}${sizeProp}${animProp}>\n  <Progress.Track>\n    <Progress.Range />\n  </Progress.Track>\n</Progress.Root>`;
    },
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
    category: "Feedback",
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
    generateCode: (props) => {
      const isLoaded = Boolean(props.loaded);
      const variant = (props.variant as string) || "shine";
      const variantProp = variant !== "shine" ? ` variant={"${variant}"}` : "";
      const loadedProp = isLoaded ? ` loaded={true}` : ` loaded={false}`;

      return `{/* Mode Standalone Placeholder */}\n<Skeleton w={"full"} h={"60px"} rounded={"md"}${variantProp} />\n\n{/* Mode Loaded Container */}\n<Skeleton${loadedProp}${variantProp} rounded={"md"}>\n  <P>{"Konten data sebenarnya yang tampil saat loaded true"}</P>\n</Skeleton>`;
    },
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

            <VStack align={"stretch"} gap={isLoaded ? 1 : 2} flex={1}>
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


  confirmation_trigger: {
    key: "confirmation_trigger",
    title: "Confirmation Trigger",
    category: "Feedback",
    description:
      "Trigger dialog konfirmasi aksi destruktif atau penting yang otomatis sinkron dengan state overlay URL.",
    importPath:
      'import { ConfirmationTrigger } from "@/design-system/components/feedback/confirmation-trigger/confirmation-trigger";',
    component: ConfirmationTrigger,
    defaultProps: {
      modalKey: "demo-confirmation",
      title: "Hapus Data?",
      description:
        "Tindakan ini tidak dapat dibatalkan. Apakah Anda yakin ingin melanjutkan?",
      confirmLabel: "Ya, Lanjutkan",
      cancelLabel: "Batal",
      colorPalette: "red",
    },
    propsSpec: [
      {
        name: "modalKey",
        type: "string",
        defaultValue: "demo-confirmation",
        description: "Identifier modal key unik untuk URL sync.",
        controlKind: "text",
      },
      {
        name: "title",
        type: "string",
        defaultValue: "Hapus Data?",
        description: "Judul konfirmasi.",
        controlKind: "text",
      },
      {
        name: "description",
        type: "string",
        defaultValue: "Tindakan ini tidak dapat dibatalkan.",
        description: "Keterangan konfirmasi.",
        controlKind: "text",
      },
      {
        name: "confirmLabel",
        type: "string",
        defaultValue: "Ya, Lanjutkan",
        description: "Label tombol konfirmasi.",
        controlKind: "text",
      },
      {
        name: "cancelLabel",
        type: "string",
        defaultValue: "Batal",
        description: "Label tombol batal.",
        controlKind: "text",
      },
      {
        name: "colorPalette",
        type: "string",
        defaultValue: "red",
        description: "Palette warna tombol konfirmasi.",
        controlKind: "select",
        options: ["red", "blue", "green", "orange", "purple", "gray"],
      },
    ],
    generateCode: (props) => {
      const modalKey = (props.modalKey as string) || "demo-confirmation";
      const title = (props.title as string) || "Konfirmasi Tindakan";
      const desc = (props.description as string) || "Apakah Anda yakin?";
      const confirmLabel = (props.confirmLabel as string) || "Konfirmasi";
      const cancelLabel = (props.cancelLabel as string) || "Batal";
      const colorPalette = (props.colorPalette as string) || "red";

      return `<ConfirmationTrigger\n  modalKey={"${modalKey}"}\n  title={"${title}"}\n  description={"${desc}"}\n  confirmLabel={"${confirmLabel}"}\n  cancelLabel={"${cancelLabel}"}\n  colorPalette={"${colorPalette}"}\n  onConfirm={() => console.log("Confirmed!")}\n>\n  <Button colorPalette={"${colorPalette}"} variant={"outline"}>\n    {"Buka Konfirmasi"}\n  </Button>\n</ConfirmationTrigger>`;
    },
    renderPlayground: (props) => (
      <ConfirmationTrigger
        modalKey={(props.modalKey as string) || "demo-confirmation"}
        title={(props.title as string) || "Hapus Data?"}
        description={
          (props.description as string) ||
          "Tindakan ini tidak dapat dibatalkan. Apakah Anda yakin ingin melanjutkan?"
        }
        confirmLabel={(props.confirmLabel as string) || "Ya, Lanjutkan"}
        cancelLabel={(props.cancelLabel as string) || "Batal"}
        colorPalette={(props.colorPalette as string) || "red"}
        onConfirm={() => {
          console.log("Confirmed!");
        }}
      >
        <Button
          colorPalette={(props.colorPalette as string) || "red"}
          variant={"outline"}
        >
          {"Buka Dialog Konfirmasi"}
        </Button>
      </ConfirmationTrigger>
    ),
  },


  alert: {
    key: "alert",
    title: "Alert",
    category: "Feedback",
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
    generateCode: (props) => {
      const status = (props.status as string) || "info";
      return `<Alert.Root status={"${status}"}>\n  <Alert.Indicator />\n  <Alert.Content>\n    <Alert.Title>{"Informasi Sistem"}</Alert.Title>\n    <Alert.Description>\n      {"Operasi berhasil disinkronkan dengan status ${status}."}\n    </Alert.Description>\n  </Alert.Content>\n</Alert.Root>`;
    },
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
    category: "Feedback",
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
    generateCode: (props) => {
      const v = (props.variant as string) || "info";
      return `// Panggil fungsi toast imperatif sesuai level notifikasi\ntoast.${v}("Judul Notifikasi", {\n  description: "Pesan detail pemberitahuan status ${v}.",\n});`;
    },
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
                  : "neutral"
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
    category: "Feedback",
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
    generateCode: (props) => {
      const title = String(props.title || "Tidak Ada Data");
      const desc = String(
        props.description || "Belum ada item atau rekaman data yang tersedia.",
      );
      return `<StateNoData\n  title={"${title}"}\n  description={"${desc}"}\n/>`;
    },
    renderPlayground: (props) => (
      <StateNoData
        title={props.title as string}
        description={props.description as string}
      />
    ),
  },


  focus_alert: {
    key: "focus_alert",
    title: "Focus Alert Modal",
    category: "Feedback",
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
    generateCode: (props) => `<FocusAlert
  modalKey={"docs-focus-alert"}
  title={"${String(props.title || "Konfirmasi")}"}
  description={"${String(props.description || "Apakah Anda yakin?")}"}
/>`,
    renderPlayground: (props) => <FocusAlertPlaygroundDemo {...props} />,
  },

};
