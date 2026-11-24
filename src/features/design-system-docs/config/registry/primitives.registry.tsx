// src/features/design-system-docs/config/registry/primitives.registry.tsx

import { Button } from "@/design-system/components/button/button/button";
import { TreeView } from "@/design-system/components/disclosure/tree-view/tree-view";
import type { TreeNodeData } from "@/design-system/components/disclosure/tree-view/tree-view.type";
import { CurrencyInput } from "@/design-system/components/input/currency-input/currency-input";
import { Field } from "@/design-system/components/input/field/field";
import { Box } from "@/design-system/components/layout/box/box";
import { VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { CameraCapture } from "@/design-system/components/media/camera-capture/camera-capture";
import type {
  CameraFrameVariant,
  CapturedMedia,
} from "@/design-system/components/media/camera-capture/camera-capture.type";
import { QrScanner } from "@/design-system/components/media/qr-scanner/qr-scanner";
import type { QrScanResult } from "@/design-system/components/media/qr-scanner/qr-scanner.type";
import { QrCode } from "@/design-system/components/media/qr-code/qr-code";
import { Badge } from "@/design-system/components/typography/badge/badge";
import { P } from "@/design-system/components/typography/p/p";
import { PrintLayout, usePrint } from "@/design-system/components/utilities/print-layout/print-layout";
import type { PrintPageSize } from "@/design-system/components/utilities/print-layout/print-layout.type";
import { useExchangeRate } from "@/design-system/hooks/use-exchange-rate";
import type { ComponentDocSpec } from "@/features/design-system-docs/types/ds-docs-spec.type";
import { useState } from "react";

// -------------------------------------------------------------------------------------
// Demo components
// -------------------------------------------------------------------------------------

const CurrencyInputDemo = (props: { shorthand: boolean; withConversion: boolean; max?: number }) => {
  // Props
  const { shorthand, withConversion, max } = props;

  // States
  const [value, setValue] = useState<number | null>(1500000);

  // Hooks
  const { conversion, isError } = useExchangeRate("IDR", "USD", { enabled: withConversion });

  return (
    <VStack w={"full"} maxW={"360px"} gap={2} align={"stretch"}>
      <Field label={"Harga jual"} helperText={"Coba ketik 1,5jt atau 250rb"}>
        <CurrencyInput
          value={value}
          onValueChange={setValue}
          shorthand={shorthand}
          max={max}
          conversion={withConversion ? conversion : undefined}
        />
      </Field>
      <P fontSize={"xs"} color={"fg.muted"}>
        {`Nilai: ${value === null ? "null" : value}`}
        {withConversion && isError && " · kurs tidak tersedia"}
      </P>
    </VStack>
  );
};

const QrScannerDemo = (props: { mode: "single" | "continuous" }) => {
  // Props
  const { mode } = props;

  // States
  const [scans, setScans] = useState<QrScanResult[]>([]);

  return (
    <VStack w={"full"} maxW={"360px"} gap={3} align={"stretch"}>
      <QrScanner
        key={mode}
        mode={mode}
        validate={(value) =>
          value.trim().length >= 3 ? { ok: true } : { ok: false, message: "Kode terlalu pendek" }
        }
        manualEntry={{ label: "Nomor eartag", placeholder: "TQ-0001" }}
        overlay={<Badge>{`${scans.length} ternak terbaca`}</Badge>}
        onScan={(result) => setScans((current) => [result, ...current].slice(0, 5))}
      />
      {scans.map((scan) => (
        <P key={scan.scannedAt} fontSize={"sm"}>{`${scan.value} · ${scan.format}`}</P>
      ))}
    </VStack>
  );
};

const CameraCaptureDemo = (props: {
  frameVariant: CameraFrameVariant;
  accept: "image" | "video" | "both";
  multiple: boolean;
}) => {
  // Props
  const { frameVariant, accept, multiple } = props;

  // States
  const [items, setItems] = useState<CapturedMedia[]>([]);

  return (
    <VStack w={"full"} maxW={"420px"} gap={2} align={"stretch"}>
      <Field label={"Foto ternak"} helperText={"Kamera dibuka langsung, tanpa galeri"}>
        <CameraCapture
          value={items}
          onChange={setItems}
          frameVariant={frameVariant}
          accept={accept}
          multiple={multiple}
          withHash={true}
        />
      </Field>
      {items.map((item) => (
        <P key={item.id} fontSize={"xs"} color={"fg.muted"} lineClamp={1}>
          {`${item.type} · ${Math.round(item.file.size / 1024)} KB · ${item.hash?.slice(0, 12)}…`}
        </P>
      ))}
    </VStack>
  );
};

const DEMO_EARTAGS = ["TQ-0001", "TQ-0002", "TQ-0003", "TQ-0004", "TQ-0005", "TQ-0006"];

const PrintLayoutDemo = (props: { pageSize: PrintPageSize; columns: number }) => {
  // Props
  const { pageSize, columns } = props;

  // Hooks
  const { print, isPrinting } = usePrint();

  return (
    <VStack w={"full"} gap={3} align={"center"}>
      <Button onClick={() => void print()} loading={isPrinting}>
        {"Cetak"}
      </Button>
      <Box w={"full"} overflowX={"auto"} display={"flex"} justifyContent={"center"} py={2}>
        <PrintLayout pageSize={pageSize} columns={columns} preview={true}>
          {DEMO_EARTAGS.map((eartag) => (
            <VStack key={eartag} gap={1} align={"center"} p={2} border={"1px dashed"} borderColor={"gray.300"}>
              <QrCode value={eartag} size={"sm"} />
              <P fontSize={"xs"} fontWeight={"semibold"}>
                {eartag}
              </P>
            </VStack>
          ))}
        </PrintLayout>
      </Box>
    </VStack>
  );
};

const DEMO_PEDIGREE: TreeNodeData[] = [
  {
    id: "melati",
    label: "Melati",
    description: "Betina · PO · 2023",
    children: [
      {
        id: "bima",
        label: "Bima",
        description: "Pejantan · 2018",
        children: [
          { id: "arjuna", label: "Arjuna", description: "2014" },
          { id: "bima-dam", label: "", unknown: true },
        ],
      },
      {
        id: "sari",
        label: "Sari",
        description: "Induk · 2019",
        children: [
          { id: "gatot", label: "Gatot", description: "2015" },
          { id: "dewi", label: "Dewi", description: "2015", children: [{ id: "kencana", label: "Kencana" }] },
        ],
      },
    ],
  },
];

const DEMO_FOLDERS: TreeNodeData[] = [
  {
    id: "blok-a",
    label: "Blok A",
    description: "3 kandang",
    children: [
      { id: "a1", label: "Kandang A1", description: "12 ekor" },
      { id: "a2", label: "Kandang A2", description: "8 ekor" },
    ],
  },
  { id: "blok-b", label: "Blok B", children: [{ id: "b1", label: "Kandang B1" }] },
];

const TreeViewDemo = (props: { orientation: "vertical" | "horizontal" }) => {
  // Props
  const { orientation } = props;

  // States
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <VStack w={"full"} gap={2} align={"stretch"}>
      <TreeView
        key={orientation}
        orientation={orientation}
        label={orientation === "horizontal" ? "Silsilah Melati" : "Kandang"}
        data={orientation === "horizontal" ? DEMO_PEDIGREE : DEMO_FOLDERS}
        defaultExpandedIds={["blok-a"]}
        selectedId={selected}
        onSelect={(node) => setSelected(node.id)}
      />
      <P fontSize={"xs"} color={"fg.muted"}>{`Dipilih: ${selected ?? "-"}`}</P>
    </VStack>
  );
};

// -------------------------------------------------------------------------------------
// Specs
// -------------------------------------------------------------------------------------

export const PRIMITIVES_DOCS: Record<string, ComponentDocSpec> = {
  currency_input: {
    key: "currency_input",
    title: "CurrencyInput",
    category: "Inputs",
    description:
      "Input uang: Rp1.500.000 tanpa desimal untuk IDR, angka dikelompokkan saat diketik, shorthand \"1,5jt\" dan \"250rb\", clamp ke min/max saat blur, dan nilai berupa number. Konversi kurs hanya untuk display dan diambil dengan `useExchangeRate` (Frankfurter, fallback currency-api, cache 24 jam).",
    importPath:
      'import { CurrencyInput } from "@/design-system/components/input/currency-input/currency-input";\nimport { useExchangeRate } from "@/design-system/hooks/use-exchange-rate";',
    component: CurrencyInput,
    defaultProps: { shorthand: true, withConversion: true, max: 0 },
    propsSpec: [
      { name: "value / onValueChange", type: "number | null", description: "Nilai numerik tanpa format. Pakai `Controller` untuk react-hook-form." },
      { name: "currency", type: "string", defaultValue: "IDR", description: "Kode ISO 4217." },
      { name: "locale", type: "string", defaultValue: "id-ID", description: "Format tampilan." },
      { name: "fractionDigits", type: "number", description: "Default per mata uang: IDR 0, USD 2." },
      { name: "min / max", type: "number", description: "Di-clamp saat blur. Demo: 0 berarti tanpa batas.", controlKind: "number" },
      { name: "shorthand", type: "boolean", defaultValue: true, description: "Terima rb, ribu, k, jt, juta, m (miliar).", controlKind: "boolean" },
      { name: "conversion", type: "{ to, rate, rateDate }", description: "Konversi display-only di bawah input." },
      { name: "withConversion", type: "boolean", defaultValue: true, description: "Demo: ambil kurs IDR→USD dengan useExchangeRate.", controlKind: "boolean" },
    ],
    a11y: {
      notes:
        "`inputMode=\"decimal\"` membuka keypad angka di HP. Shorthand membutuhkan huruf, jadi set `inputMode=\"text\"` bila pengguna perlu mengetik \"jt\" di HP. Teks konversi terhubung lewat `aria-describedby`.",
    },
    renderPlayground: (props) => (
      <CurrencyInputDemo
        shorthand={Boolean(props.shorthand)}
        withConversion={Boolean(props.withConversion)}
        max={Number(props.max) > 0 ? Number(props.max) : undefined}
      />
    ),
  },

  qr_scanner: {
    key: "qr_scanner",
    title: "QrScanner",
    category: "Media",
    description:
      "Scan QR eartag dari kamera. Mode `single` berhenti setelah berhasil; `continuous` langsung siap scan berikutnya. `validate` menentukan success atau rejected beserta pesannya. Getar dan nada berbeda untuk tiap hasil, cooldown mencegah QR yang sama terbaca dua kali, dan tersedia fallback ketik manual. Butuh HTTPS dan izin kamera.",
    importPath:
      'import { QrScanner } from "@/design-system/components/media/qr-scanner/qr-scanner";',
    component: QrScanner,
    defaultProps: { mode: "continuous" },
    propsSpec: [
      { name: "onScan", type: "(r: { value, format, scannedAt }) => void", required: true, description: "Scan yang diterima, dengan timestamp untuk rule scan beruntun." },
      { name: "onReject", type: "(r, message) => void", description: "Scan yang ditolak `validate`." },
      { name: "mode", type: "\"single\" | \"continuous\"", defaultValue: "single", description: "Berhenti atau lanjut setelah scan berhasil.", controlKind: "select", options: ["single", "continuous"] },
      { name: "validate", type: "(value) => { ok } | Promise<{ ok }>", description: "Tentukan success atau rejected dan pesannya." },
      { name: "cooldownMs", type: "number", defaultValue: 1500, description: "Abaikan nilai yang sama selama durasi ini." },
      { name: "formats", type: "string[]", defaultValue: "[\"qr_code\"]", description: "Format BarcodeDetector." },
      { name: "torch", type: "boolean", defaultValue: true, description: "Tombol senter bila perangkat mendukung." },
      { name: "manualEntry", type: "{ label, placeholder?, pattern? }", description: "Fallback ketik manual." },
      { name: "facingMode / paused", type: "\"environment\" | \"user\" / boolean", description: "Kamera dan jeda decoding." },
      { name: "haptic / sound", type: "boolean", defaultValue: true, description: "Umpan balik getar dan nada." },
      { name: "overlay", type: "ReactNode", description: "Slot di atas kamera, misalnya penghitung." },
    ],
    a11y: {
      role: "region",
      notes:
        "Hasil dibacakan lewat `role=\"status\"`. Tombol senter memakai `aria-pressed`. Saat izin ditolak, tampil langkah membuka izin dan input manual tetap bisa dipakai.",
    },
    renderPlayground: (props) => (
      <QrScannerDemo mode={(props.mode as "single" | "continuous") || "continuous"} />
    ),
  },

  camera_capture: {
    key: "camera_capture",
    title: "CameraCapture",
    category: "Media",
    description:
      "File input khusus kamera, tanpa galeri: kamera fullscreen dengan panduan `frameVariant`, foto dan video, ulangi atau hapus per item, lalu Selesai. Menutup kamera saat ada foto baru akan menanyakan dulu sebelum membuangnya. Opsional GPS dan hash SHA-256 untuk rule foto dipakai ulang. Butuh HTTPS dan izin kamera.",
    importPath:
      'import { CameraCapture } from "@/design-system/components/media/camera-capture/camera-capture";',
    component: CameraCapture,
    defaultProps: { frameVariant: "livestock", accept: "image", multiple: true },
    propsSpec: [
      { name: "value / onChange", type: "CapturedMedia[]", description: "`{ id, file, type, capturedAt, previewUrl, location?, hash? }`." },
      { name: "frameVariant", type: "string", defaultValue: "none", description: "Panduan overlay, dengan rasio aslinya.", controlKind: "select", options: ["none", "ktp", "selfie", "selfie-ktp", "document", "livestock", "scale"] },
      { name: "accept", type: "\"image\" | \"video\" | \"both\"", defaultValue: "image", description: "Jenis media.", controlKind: "select", options: ["image", "video", "both"] },
      { name: "multiple / maxFiles", type: "boolean / number", defaultValue: false, description: "Banyak item dalam satu sesi; single mengganti foto.", controlKind: "boolean" },
      { name: "maxVideoDurationSec", type: "number", defaultValue: 15, description: "Batas rekam, dengan timer." },
      { name: "facingMode / allowSwitchCamera", type: "\"environment\" | \"user\" / boolean", description: "Default dari frameVariant: selfie memakai kamera depan." },
      { name: "compress", type: "{ maxWidth, quality }", defaultValue: "{ 1600, 0.8 }", description: "Kompresi foto." },
      { name: "withLocation / withHash", type: "boolean", description: "GPS dan SHA-256 per item." },
      { name: "label / disabled / invalid", type: "string / boolean", description: "Membaca state invalid dan disabled dari Field." },
    ],
    a11y: {
      role: "dialog",
      notes:
        "Kamera dibuka sebagai dialog modal; Escape menutup. Fokus pindah ke tombol shutter. Tiap item punya tombol Ulangi dan Hapus berlabel. Timer rekam memakai `role=\"timer\"`.",
    },
    renderPlayground: (props) => (
      <CameraCaptureDemo
        frameVariant={(props.frameVariant as CameraFrameVariant) || "livestock"}
        accept={(props.accept as "image") || "image"}
        multiple={Boolean(props.multiple)}
      />
    ),
  },

  print_layout: {
    key: "print_layout",
    title: "PrintLayout",
    category: "Utilities",
    description:
      "Cetak dengan ukuran kertas asli lewat CSS @page: A4, A6, label 50×30 mm, dan struk thermal 58/80 mm. Konten dirender ke root khusus cetak, jadi layar aplikasi tidak ikut tercetak. `columns` membuat grid untuk lembar QR. Pakai bersama `usePrint`.",
    importPath:
      'import { PrintLayout, usePrint } from "@/design-system/components/utilities/print-layout/print-layout";',
    component: PrintLayout,
    defaultProps: { pageSize: "A6", columns: 3 },
    propsSpec: [
      { name: "pageSize", type: "string", defaultValue: "A4", description: "Ukuran kertas.", controlKind: "select", options: ["A4", "A6", "label-50x30", "receipt-58", "receipt-80"] },
      { name: "orientation", type: "\"portrait\" | \"landscape\"", defaultValue: "portrait", description: "Untuk A4 dan A6." },
      { name: "columns", type: "number", defaultValue: 1, description: "Kolom grid.", controlKind: "number" },
      { name: "gap / margin", type: "string", description: "Jarak antar sel dan margin halaman." },
      { name: "preview", type: "boolean", defaultValue: false, description: "Tampilkan pratinjau kertas di layar." },
      { name: "usePrint({ onBeforePrint, onAfterPrint })", type: "{ print, isPrinting }", description: "`onBeforePrint` boleh async, misalnya menunggu gambar QR." },
    ],
    renderPlayground: (props) => (
      <PrintLayoutDemo
        pageSize={(props.pageSize as PrintPageSize) || "A6"}
        columns={Number(props.columns) || 1}
      />
    ),
  },

  tree_view: {
    key: "tree_view",
    title: "TreeView",
    category: "Disclosure",
    description:
      "Pohon data dalam dua orientasi. `vertical` untuk struktur bertingkat (blok dan kandang). `horizontal` untuk silsilah: ternak di kiri, setiap generasi satu kolom ke kanan, bisa di-collapse per node, dan induk yang tidak tercatat tampil sebagai node \"Tidak diketahui\".",
    importPath:
      'import { TreeView } from "@/design-system/components/disclosure/tree-view/tree-view";',
    component: TreeView,
    defaultProps: { orientation: "horizontal" },
    propsSpec: [
      { name: "data", type: "TreeNodeData[]", required: true, description: "`{ id, label, description?, icon?, unknown?, children? }`." },
      { name: "label", type: "string", required: true, description: "Nama aksesibel pohon." },
      { name: "orientation", type: "\"vertical\" | \"horizontal\"", defaultValue: "vertical", description: "Pohon biasa atau silsilah.", controlKind: "select", options: ["vertical", "horizontal"] },
      { name: "expandDepth", type: "number", defaultValue: 3, description: "Horizontal: generasi yang terbuka di awal." },
      { name: "defaultExpandedIds", type: "string[]", description: "Vertical: cabang yang terbuka di awal." },
      { name: "selectedId / onSelect", type: "string | null / (node) => void", description: "Node yang dipilih." },
      { name: "renderNode", type: "(node) => ReactNode", description: "Ganti isi node." },
    ],
    a11y: {
      role: "tree",
      keyboardNav: [
        { key: "ArrowRight", action: "Horizontal: buka node, lalu pindah ke generasi berikutnya." },
        { key: "ArrowLeft", action: "Horizontal: kembali ke generasi sebelumnya." },
        { key: "ArrowUp / ArrowDown", action: "Pindah antar saudara." },
        { key: "Home", action: "Kembali ke ternak utama." },
        { key: "Enter / Space", action: "Pilih node." },
      ],
    },
    renderPlayground: (props) => (
      <TreeViewDemo orientation={(props.orientation as "horizontal") || "horizontal"} />
    ),
  },
};
