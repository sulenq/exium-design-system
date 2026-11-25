import { DataTablePlaygroundDemo } from "@/features/design-system-docs/config/registry/core.demos";
import { Countdown } from "@/design-system/components/data-display/countdown/countdown";
import { FileItem } from "@/design-system/components/data-display/file-item/file-item";
import { MaskedText } from "@/design-system/components/data-display/masked-text/masked-text";
import { StatGrid } from "@/design-system/components/data-display/stat-grid/stat-grid";
import { Timeline } from "@/design-system/components/data-display/timeline/timeline";
import { DataViewTable } from "@/design-system/components/data-display/data-view/data-view-table";
import { Box } from "@/design-system/components/layout/box/box";
import type { ComponentDocSpec } from "@/features/design-system-docs/types/ds-docs-spec.type";
import { Sparkle as PhosphorSparkleIcon } from "@phosphor-icons/react";

export const DATA_DISPLAY_DOCS: Record<string, ComponentDocSpec> = {

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
      withStickyMenu: false,
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
        name: "withStickyMenu",
        type: "boolean",
        defaultValue: false,
        description:
          "Tampilkan tombol menu titik tiga (sticky) di sebelah kanan baris.",
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
    generateCode: () => `<DataListTable.Root
  headers={dataList.headers}
  items={dataList.items}
  batchActions={dataList.batchActions}
  itemActions={dataList.itemActions}
>
  <DataListTable.Header />
  <DataListTable.Body />
</DataListTable.Root>`,
    renderPlayground: (props, onPropChange) => (
      <DataTablePlaygroundDemo props={props} onPropChange={onPropChange} />
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
      {
        name: "clockOffsetMs",
        type: "number",
        defaultValue: 0,
        description:
          "Selisih server time dengan device time (ms) dari sync terakhir. Deadline dari server tetap benar walau jam perangkat diubah.",
        controlKind: "number",
      },
      {
        name: "onFinish",
        type: "() => void",
        description: "Dipanggil sekali saat waktu habis.",
      },
      {
        name: "onThresholdChange",
        type: '(level: "normal" | "warning" | "danger" | "finished") => void',
        description:
          "Dipanggil setiap kali level berubah, misalnya untuk memunculkan reminder.",
      },
    ],
    generateCode: (props) => `<Countdown
  finishedAt={targetIsoDate}
  warningThresholdDays={${Number(props.warningThresholdDays) || 3}}
  warningThresholdHours={${Number(props.warningThresholdHours) || 24}}
/>`,
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
    generateCode: (
      props,
    ) => `<StatGrid.Root columns={${Number(props.columns) || 2}}>
  <StatGrid.Item index={0} columns={${Number(props.columns) || 2}}>
    <StatGrid.Header>
      <StatGrid.Label>{"Total Pengguna Aktif"}</StatGrid.Label>
    </StatGrid.Header>
    <StatGrid.Value>{"1,248"}</StatGrid.Value>
  </StatGrid.Item>
</StatGrid.Root>`,
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
    generateCode: (
      props,
    ) => `<Timeline.Root size={"${String(props.size || "md")}"}>
  <Timeline.Item>
    <Timeline.Connector>
      <Timeline.Separator />
      <Timeline.Indicator />
    </Timeline.Connector>
    <Timeline.Content>
      <Timeline.Title>{"Data Dibuat"}</Timeline.Title>
      <Timeline.Description>{"10 menit lalu"}</Timeline.Description>
    </Timeline.Content>
  </Timeline.Item>
</Timeline.Root>`,
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
    generateCode: (props) => {
      const disProp = props.disabled ? "\n  disabled={true}" : "";
      return `<FileItem
  name={"${String(props.name || "dokumen.pdf")}"}
  sizeLabel={"${String(props.sizeLabel || "1.2 MB")}"}
  mimeType={"${String(props.mimeType || "application/pdf")}"}${disProp}
  onDelete={() => {}}
/>`;
    },
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
    generateCode: (props) => `<MaskedText
  value={"${String(props.value || "3271041908990001")}"}
  maskLength={${Number(props.maskLength) || 16}}
  defaultVisible={${Boolean(props.defaultVisible)}}
  withCopy={${Boolean(props.withCopy)}}
  withToggle={${Boolean(props.withToggle)}}
/>`,
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

};
