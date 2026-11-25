// src/features/design-system-docs/config/registry/inputs.registry.tsx

import { Button } from "@/design-system/components/button/button/button";
import { Field } from "@/design-system/components/input/field/field";
import { Fieldset } from "@/design-system/components/input/fieldset/fieldset";
import { FocusSearchTrigger } from "@/design-system/components/input/focus-search/focus-search";
import { Input } from "@/design-system/components/input/input/input";
import { StringArrayInput } from "@/design-system/components/input/string-array-input/string-array-input";
import { VersionInput } from "@/design-system/components/input/version-input/version-input";
import { VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { P } from "@/design-system/components/typography/p/p";
import type { SearchIndex } from "@/design-system/types/search.type";
import { DS_NAVS_MAP } from "@/features/design-system-docs/constants/ds.navs";
import type { ComponentDocSpec } from "@/features/design-system-docs/types/ds-docs-spec.type";
import { useState } from "react";

// -------------------------------------------------------------------------------------
// Demo components (controlled inputs need their own state)
// -------------------------------------------------------------------------------------

const StringArrayInputDemo = (props: { maxItems?: number }) => {
  // Props
  const { maxItems } = props;

  // States
  const [value, setValue] = useState<string[]>(["Vaksin PMK", "Obat cacing"]);

  return (
    <VStack w={"full"} maxW={"420px"} gap={2} align={"stretch"}>
      <StringArrayInput value={value} onChange={setValue} maxItems={maxItems} />
      <P fontSize={"xs"} color={"fg.muted"}>
        {`Nilai: ${JSON.stringify(value)}`}
      </P>
    </VStack>
  );
};

const VersionInputDemo = (props: { withPrefix: boolean; disabled: boolean }) => {
  // Props
  const { withPrefix, disabled } = props;

  // States
  const [value, setValue] = useState("1.4.0");

  return (
    <VStack w={"full"} maxW={"320px"} gap={2} align={"stretch"}>
      <VersionInput
        label={"Versi aplikasi"}
        value={value}
        onValueChange={setValue}
        withPrefix={withPrefix}
        disabled={disabled}
      />
      <P fontSize={"xs"} color={"fg.muted"}>
        {`Nilai: ${value}`}
      </P>
    </VStack>
  );
};

const FOCUS_SEARCH_DEMO_INDEX: SearchIndex = Object.entries(DS_NAVS_MAP)
  .filter(([key]) => !key.startsWith("cat_"))
  .map(([id, item]) => ({
    id,
    title: item.title,
    description: `Komponen & navigasi ${item.title}`,
    keywords: [id, item.title.toLowerCase()],
  }));

const FocusSearchDemo = () => {
  // States
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <VStack gap={2} align={"center"}>
      <FocusSearchTrigger
        modalKey={"ds-docs-focus-search-demo"}
        queryKey={"ds_docs_focus_search_q"}
        searchIndex={FOCUS_SEARCH_DEMO_INDEX}
        onResultSelect={(result) => setSelected(result.title)}
      >
        <Button variant={"outline"}>{"Cari navigasi & komponen"}</Button>
      </FocusSearchTrigger>
      <P fontSize={"xs"} color={"fg.muted"}>
        {`Dipilih: ${selected ?? "-"}`}
      </P>
    </VStack>
  );
};

// -------------------------------------------------------------------------------------
// Specs
// -------------------------------------------------------------------------------------

export const INPUTS_DOCS: Record<string, ComponentDocSpec> = {
  fieldset: {
    key: "fieldset",
    title: "Fieldset",
    category: "Inputs",
    description:
      "Mengelompokkan beberapa field yang saling terkait di bawah satu judul (`legend`), misalnya data identitas pemilik. `disabled` menonaktifkan semua field di dalamnya sekaligus.",
    importPath:
      'import { Fieldset } from "@/design-system/components/input/fieldset/fieldset";',
    component: Fieldset,
    defaultProps: { legend: "Identitas pemilik", containeredContent: true, disabled: false },
    propsSpec: [
      {
        name: "legend",
        type: "ReactNode",
        defaultValue: "Identitas pemilik",
        description: "Judul kelompok field.",
        controlKind: "text",
      },
      {
        name: "containeredContent",
        type: "boolean",
        defaultValue: true,
        description: "Bungkus isi dengan border dan padding.",
        controlKind: "boolean",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: false,
        description: "Nonaktifkan semua field di dalamnya.",
        controlKind: "boolean",
      },
    ],
    a11y: {
      role: "group",
      notes: "`<fieldset>` dan `<legend>` membuat screen reader membacakan judul kelompok saat fokus masuk ke field pertama.",
    },
    generateCode: (props) => {
      const containeredProp = props.containeredContent
        ? "\n  containeredContent={true}"
        : "";
      const disabledProp = props.disabled ? "\n  disabled={true}" : "";
      return `<Fieldset
  legend={"${String(props.legend ?? "")}"}${containeredProp}${disabledProp}
>
  <Field label={"Nama"} required={true}>
    <Input placeholder={"Sapi Perah #01"} />
  </Field>
</Fieldset>`;
    },
    renderPlayground: (props) => (
      <VStack w={"full"} maxW={"420px"}>
        <Fieldset
          legend={String(props.legend ?? "")}
          containeredContent={Boolean(props.containeredContent)}
          disabled={Boolean(props.disabled)}
        >
          <VStack gap={4} w={"full"}>
            <Field label={"Nama lengkap"}>
              <Input />
            </Field>
            <Field label={"Nomor HP"}>
              <Input inputMode={"tel"} />
            </Field>
          </VStack>
        </Fieldset>
      </VStack>
    ),
  },

  string_array_input: {
    key: "string_array_input",
    title: "StringArrayInput",
    category: "Inputs",
    description:
      "Input untuk daftar teks yang bisa ditambah dan dihapus satu per satu, misalnya riwayat pengobatan atau tag.",
    importPath:
      'import { StringArrayInput } from "@/design-system/components/input/string-array-input/string-array-input";',
    component: StringArrayInput,
    defaultProps: { maxItems: 5 },
    propsSpec: [
      {
        name: "value",
        type: "string[]",
        description: "Daftar nilai (controlled).",
      },
      {
        name: "onChange",
        type: "(nextValue: string[]) => void",
        description: "Dipanggil setiap item ditambah, diubah, atau dihapus.",
      },
      {
        name: "maxItems",
        type: "number",
        defaultValue: 5,
        description: "Batas jumlah item.",
        controlKind: "number",
      },
      {
        name: "placeholder / addButtonText / emptyText",
        type: "string",
        description: "Teks yang tampil; default dari i18n.",
      },
    ],
    generateCode: (props) => {
      const maxProp = Number(props.maxItems)
        ? `\n  maxItems={${Number(props.maxItems)}}`
        : "";
      return `<StringArrayInput
  value={value}
  onChange={setValue}${maxProp}
/>`;
    },
    renderPlayground: (props) => (
      <StringArrayInputDemo maxItems={Number(props.maxItems) || undefined} />
    ),
  },

  version_input: {
    key: "version_input",
    title: "VersionInput",
    category: "Inputs",
    description:
      "Input versi semantik (major.minor.patch) dengan tiga segmen. Fokus pindah otomatis antar segmen, Arrow kiri-kanan untuk berpindah, Arrow atas-bawah untuk menaikkan atau menurunkan angka.",
    importPath:
      'import { VersionInput } from "@/design-system/components/input/version-input/version-input";',
    component: VersionInput,
    defaultProps: { withPrefix: true, disabled: false },
    propsSpec: [
      {
        name: "value",
        type: "string",
        description: "Versi dalam format `1.4.0` (controlled).",
      },
      {
        name: "onValueChange",
        type: "(value: string) => void",
        description: "Dipanggil dengan versi lengkap setiap segmen berubah.",
      },
      {
        name: "withPrefix",
        type: "boolean",
        defaultValue: true,
        description: "Tampilkan awalan `v`.",
        controlKind: "boolean",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: false,
        description: "Nonaktifkan input.",
        controlKind: "boolean",
      },
      {
        name: "min / max",
        type: "number",
        description: "Batas angka tiap segmen.",
      },
    ],
    a11y: {
      keyboardNav: [
        { key: "ArrowLeft / ArrowRight", action: "Pindah ke segmen sebelumnya atau berikutnya." },
        { key: "ArrowUp / ArrowDown", action: "Naikkan atau turunkan angka segmen." },
        { key: "Backspace", action: "Kembali ke segmen sebelumnya saat segmen kosong." },
      ],
    },
    generateCode: (props) => {
      const prefixProp = props.withPrefix === false ? "\n  withPrefix={false}" : "";
      const disabledProp = props.disabled ? "\n  disabled={true}" : "";
      return `<VersionInput
  label={"Versi aplikasi"}
  value={value}
  onValueChange={setValue}${prefixProp}${disabledProp}
/>`;
    },
    renderPlayground: (props) => (
      <VersionInputDemo withPrefix={Boolean(props.withPrefix)} disabled={Boolean(props.disabled)} />
    ),
  },

  focus_search: {
    key: "focus_search",
    title: "FocusSearch",
    category: "Inputs",
    description:
      "Command palette: membuka modal pencarian dari child-nya, mencari di `searchIndex` secara lokal, dan memanggil `onResultSelect`. Query tersimpan di URL lewat `queryKey`.",
    importPath:
      'import { FocusSearchTrigger } from "@/design-system/components/input/focus-search/focus-search";',
    component: FocusSearchTrigger,
    defaultProps: {},
    propsSpec: [
      {
        name: "searchIndex",
        type: "SearchIndex<T>",
        required: true,
        description: "Daftar item yang bisa dicari: `id`, `title`, `description`, `keywords`.",
      },
      {
        name: "modalKey",
        type: "string",
        required: true,
        description: "Key modal unik (lihat aturan `modalKey`).",
      },
      {
        name: "queryKey",
        type: "string",
        required: true,
        description: "Nama search param URL untuk query.",
      },
      {
        name: "onResultSelect",
        type: "(result: SearchIndexItem<T>) => void",
        description: "Dipanggil saat hasil dipilih.",
      },
    ],
    a11y: {
      keyboardNav: [
        { key: "ArrowUp / ArrowDown", action: "Pindah antar hasil." },
        { key: "Enter", action: "Pilih hasil yang aktif." },
        { key: "Escape", action: "Tutup modal." },
      ],
    },
    generateCode: () => `<FocusSearchTrigger
  modalKey={"ds-docs-focus-search-demo"}
  queryKey={"ds_docs_focus_search_q"}
  searchIndex={FOCUS_SEARCH_DEMO_INDEX}
  onResultSelect={(result) => setSelected(result.title)}
>
  <Button variant={"outline"}>{"Cari navigasi & komponen"}</Button>
</FocusSearchTrigger>`,
    renderPlayground: () => <FocusSearchDemo />,
  },
};
