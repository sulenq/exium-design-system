import { Button } from "@/design-system/components/button/button/button";
import { FormatNumber } from "@/design-system/components/utilities/format-number/format-number";
import { Box } from "@/design-system/components/layout/box/box";
import { DownloadTrigger } from "@/design-system/components/utilities/download-trigger/download-trigger";
import type { ComponentDocSpec } from "@/features/design-system-docs/types/ds-docs-spec.type";

export const UTILITIES_DOCS: Record<string, ComponentDocSpec> = {

  format_number: {
    key: "format_number",
    title: "FormatNumber",
    category: "Utilities",
    description:
      "Format angka, mata uang, dan persen mengikuti locale aktif lewat Intl.NumberFormat.",
    importPath:
      'import { FormatNumber } from "@/design-system/components/utilities/format-number/format-number";',
    component: FormatNumber,
    defaultProps: { value: 1500000, style: "currency" },
    propsSpec: [
      {
        name: "value",
        type: "number",
        defaultValue: 1500000,
        description: "Angka yang diformat.",
        controlKind: "number",
      },
      {
        name: "style",
        type: "string",
        defaultValue: "currency",
        description: "Gaya format Intl.",
        controlKind: "select",
        options: ["decimal", "currency", "percent", "unit"],
      },
    ],
    generateCode: (props) => {
      const style = String(props.style || "currency");
      const currencyProp =
        style === "currency"
          ? '\n  currency={"IDR"}\n  maximumFractionDigits={0}'
          : "";
      return `<FormatNumber
  value={${Number(props.value) || 0}}
  style={"${style}"}${currencyProp}
/>`;
    },
    renderPlayground: (props) => {
      const style = String(props.style || "currency");
      return (
        <FormatNumber
          value={Number(props.value) || 0}
          style={style as "currency"}
          currency={style === "currency" ? "IDR" : undefined}
          maximumFractionDigits={style === "currency" ? 0 : undefined}
          unit={style === "unit" ? "kilogram" : undefined}
        />
      );
    },
  },


  utilities: {
    key: "utilities",
    title: "Utilities & Downloads",
    category: "Utilities",
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


