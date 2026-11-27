import { Logo } from "@/design-system/components/branding/logo/logo";
import { Avatar } from "@/design-system/components/media/avatar/avatar";
import { QrCode } from "@/design-system/components/media/qr-code/qr-code";
import type {
  QrCodeErrorCorrection,
  QrCodeSize,
} from "@/design-system/components/media/qr-code/qr-code.type";
import { Image } from "@/design-system/components/media/image/image";
import { COLOR_PALETTE_OPTIONS } from "@/design-system/constants/colors";
import type { ComponentDocSpec } from "@/features/design-system-docs/types/ds-docs-spec.type";

export const MEDIA_DOCS: Record<string, ComponentDocSpec> = {
  qr_code: {
    key: "qr_code",
    title: "QR Code",
    category: "Media",
    description:
      "Kode QR dari teks atau URL. Selalu dirender gelap di atas putih agar tetap terbaca pemindai pada dark mode.",
    importPath:
      'import { QrCode } from "@/design-system/components/media/qr-code/qr-code";',
    component: QrCode,
    defaultProps: {
      value: "https://exium-docs.vercel.app",
      size: "md",
      errorCorrection: "M",
      withLogo: false,
      colorPalette: "blue",
      downloadable: false,
    },
    propsSpec: [
      {
        name: "value",
        type: "string",
        required: true,
        defaultValue: undefined,
        description: "Teks atau URL yang dikodekan.",
        controlKind: "text",
      },
      {
        name: "size",
        type: '"2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
        defaultValue: "md",
        description: "Ukuran kode QR.",
        controlKind: "select",
        options: ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"],
      },
      {
        name: "withLogo",
        type: "boolean",
        defaultValue: false,
        description: "Tampilkan logo Exium di bagian tengah kode QR.",
        controlKind: "boolean",
      },
      {
        name: "errorCorrection",
        type: '"L" | "M" | "Q" | "H"',
        defaultValue: "M",
        description:
          "Tingkat koreksi error (L 7%, M 15%, Q 25%, H 30%). Otomatis H bila overlay dipakai.",
        controlKind: "select",
        options: ["L", "M", "Q", "H"],
      },
      {
        name: "overlay",
        type: "ReactNode",
        defaultValue: undefined,
        description: "Elemen kecil di tengah kode, misalnya logo.",
      },
      {
        name: "colorPalette",
        type: "string",
        defaultValue: "blue",
        description: "Skema warna kode QR dan logo.",
        controlKind: "select",
        options: COLOR_PALETTE_OPTIONS,
      },
      {
        name: "downloadable",
        type: "boolean",
        defaultValue: false,
        description: "Menampilkan tombol unduh PNG di bawah kode.",
        controlKind: "boolean",
      },
      {
        name: "downloadFileName",
        type: "string",
        defaultValue: "qr-code.png",
        description: "Nama file hasil unduhan.",
      },
    ],
    generateCode: (props) => {
      const val = props.value
        ? ` value={"${props.value}"}`
        : ' value={"https://exium-docs.vercel.app"}';
      const sz =
        props.size && props.size !== "md" ? ` size={"${props.size}"}` : "";
      const dl = props.downloadable ? ` downloadable={true}` : "";
      const clr = `${String(props.colorPalette || "blue")}.solid`;
      if (props.withLogo) {
        return `<QrCode${val}${sz}${dl}\n  color={"${clr}"}\n  overlay={<Logo boxSize={7} color={"${clr}"} />}\n/>`;
      }
      return `<QrCode${val}${sz}${dl} color={"${clr}"} />`;
    },
    renderPlayground: (props) => (
      <QrCode
        value={String(props.value || "https://exium-docs.vercel.app")}
        size={(props.size as QrCodeSize) || "md"}
        errorCorrection={
          (props.errorCorrection as QrCodeErrorCorrection) || "M"
        }
        color={`${String(props.colorPalette || "blue")}.solid`}
        overlay={
          props.withLogo ? (
            <Logo
              boxSize={20}
              color={`${String(props.colorPalette || "blue")}.solid`}
            />
          ) : undefined
        }
        downloadable={Boolean(props.downloadable)}
      />
    ),
  },

  avatar: {
    key: "avatar",
    title: "Avatar",
    category: "Media",
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
    category: "Media",
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
};
