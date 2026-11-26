import type { FormattedListItem, FormattedTableHeader } from "@/design-system/components/data-display/data-view/data-view-table.type";
import type { DataViewBatchActionsGenerator, DataViewItemActionsGenerator } from "@/design-system/components/data-display/data-view/data-view.type";
import { DataViewFooter } from "@/design-system/components/data-display/data-view/data-view-footer";
import { DataViewTable } from "@/design-system/components/data-display/data-view/data-view-table";
import { ConfirmationTrigger } from "@/design-system/components/feedback/confirmation-trigger/confirmation-trigger";
import { Box } from "@/design-system/components/layout/box/box";
import { VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { toast } from "@/design-system/components/toast";
import { Badge } from "@/design-system/components/typography/badge/badge";
import type { TableDemoItem } from "@/features/design-system-docs/types/ds-docs-spec.type";
import { EyeIcon, NotePencilIcon, TrashIcon } from "@phosphor-icons/react";
import { useMemo } from "react";
import { Countdown } from "@/design-system/components/data-display/countdown/countdown";
import { FileItem } from "@/design-system/components/data-display/file-item/file-item";
import { MaskedText } from "@/design-system/components/data-display/masked-text/masked-text";
import { StatGrid } from "@/design-system/components/data-display/stat-grid/stat-grid";
import { Timeline } from "@/design-system/components/data-display/timeline/timeline";
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
  const withStickyMenu =
    props?.withStickyMenu !== undefined ? Boolean(props.withStickyMenu) : false;
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
          icon: NotePencilIcon,
          onClick: (item: TableDemoItem) => {
            toast.info(`Mengedit data ${item.name}`);
          },
        },
        {
          key: "delete",
          label: "Hapus",
          icon: TrashIcon,
          colorPalette: "red",
          modal: {
            triggerComponent: (item: TableDemoItem) => (
              <ConfirmationTrigger
                modalKey={`docs-table-delete-${item.name}`}
                title={"Hapus Data"}
                description={`Data ${item.name} akan dihapus secara permanen dan tidak dapat dibatalkan.`}
                confirmLabel={"hapus"}
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
        withStickyMenu={withStickyMenu}
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

