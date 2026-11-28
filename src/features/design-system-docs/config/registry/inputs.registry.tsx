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
import { FocusSelectInput } from "@/design-system/components/input/focus-select/focus-select";
import SelectInput from "@/design-system/components/input/select/select";
import { Box } from "@/design-system/components/layout/box/box";
import { HStack } from "@/design-system/components/layout/flex-box/flex-box";
import { DatePicker } from "@/design-system/components/input/date-picker/date-picker";
import { Checkbox } from "@/design-system/components/input/checkbox/checkbox";
import { DateInput } from "@/design-system/components/input/date-input/date-input";
import { PhoneInput } from "@/design-system/components/input/phone-input/phone-input";
import { TimeInput } from "@/design-system/components/input/time-input/time-input";
import { FileInput } from "@/design-system/components/input/file-input/file-input";
import { NumberInput } from "@/design-system/components/input/number-input/number-input";
import { PasswordInput } from "@/design-system/components/input/password-input/password-input";
import { PinInput } from "@/design-system/components/input/pin-input/pin-input";
import { RadioCardInput } from "@/design-system/components/input/radio-card-input/radio-card-input";
import { RadioInput } from "@/design-system/components/input/radio-input/radio-input";
import { SearchInput } from "@/design-system/components/input/search-input/search-input";
import { SegmentGroupInput } from "@/design-system/components/input/segment-group/segment-group-input";
import { Slider } from "@/design-system/components/input/slider/slider";
import { Switch } from "@/design-system/components/input/switch/switch";
import { Textarea } from "@/design-system/components/input/textarea/textarea";
import { UnitInput } from "@/design-system/components/input/unit-input/unit-input";
import type { UnitQuantity } from "@/design-system/constants/types/units.type";
import { COLOR_PALETTE_OPTIONS } from "@/design-system/constants/colors";

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

const VersionInputDemo = (props: {
  withPrefix: boolean;
  disabled: boolean;
}) => {
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
    defaultProps: {
      legend: "Identitas pemilik",
      containeredContent: true,
      disabled: false,
    },
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
      notes:
        "`<fieldset>` dan `<legend>` membuat screen reader membacakan judul kelompok saat fokus masuk ke field pertama.",
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
            <Field label={"Kata sandi"}>
              <PasswordInput />
            </Field>
            <Field label={"Nominal"}>
              <NumberInput />
            </Field>
            <Field label={"Berat"}>
              <UnitInput quantity={"mass"} />
            </Field>
            <Field label={"Nomor telepon"}>
              <PhoneInput modalKey={"fieldset-phone-input"} />
            </Field>
            <Field label={"Tanggal"}>
              <DateInput modalKey={"fieldset-date-input"} />
            </Field>
            <Field label={"Waktu"}>
              <TimeInput modalKey={"fieldset-time-input"} />
            </Field>
            <Field label={"PIN"}>
              <PinInput />
            </Field>
            <Field label={"Versi"}>
              <VersionInput />
            </Field>
            <Field label={"Daftar item"}>
              <StringArrayInput />
            </Field>
            <Field label={"Select"}>
              <SelectInput
                options={[
                  { label: "Opsi A", value: "a" },
                  { label: "Opsi B", value: "b" },
                  { label: "Opsi C", value: "c" },
                ]}
              />
            </Field>
            <Field label={"Focus Select"}>
              <FocusSelectInput
                options={[
                  { label: "Opsi A", value: "a" },
                  { label: "Opsi B", value: "b" },
                  { label: "Opsi C", value: "c" },
                ]}
              />
            </Field>
            <Field label={"Catatan"}>
              <Textarea />
            </Field>
            <Field label={"Lampiran dokumen"} variant={"default"}>
              <FileInput />
            </Field>
            <Field label={"Persetujuan"} variant={"default"}>
              <Checkbox>{"Saya setuju dengan ketentuan"}</Checkbox>
            </Field>
            <Field label={"Pilihan radio"} variant={"default"}>
              <RadioInput
                options={[
                  { label: "Opsi A", value: "a" },
                  { label: "Opsi B", value: "b" },
                ]}
              />
            </Field>
            <Field label={"Kartu pilihan"} variant={"default"}>
              <RadioCardInput.Root defaultValue={"a"} w={"full"}>
                <HStack gap={2} w={"full"}>
                  <RadioCardInput.Item value={"a"} flex={1}>
                    <RadioCardInput.ItemControl>
                      <RadioCardInput.ItemText>{"Opsi A"}</RadioCardInput.ItemText>
                      <RadioCardInput.ItemIndicator />
                    </RadioCardInput.ItemControl>
                  </RadioCardInput.Item>
                  <RadioCardInput.Item value={"b"} flex={1}>
                    <RadioCardInput.ItemControl>
                      <RadioCardInput.ItemText>{"Opsi B"}</RadioCardInput.ItemText>
                      <RadioCardInput.ItemIndicator />
                    </RadioCardInput.ItemControl>
                  </RadioCardInput.Item>
                </HStack>
              </RadioCardInput.Root>
            </Field>
            <Field label={"Segmen"} variant={"default"}>
              <SegmentGroupInput
                options={[
                  { label: "Opsi A", value: "a" },
                  { label: "Opsi B", value: "b" },
                ]}
              />
            </Field>
            <Field label={"Slider"} variant={"default"}>
              <Slider defaultValue={[50]} />
            </Field>
            <Field label={"Notifikasi"} variant={"default"}>
              <Switch label={"Aktifkan notifikasi"} />
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
        {
          key: "ArrowLeft / ArrowRight",
          action: "Pindah ke segmen sebelumnya atau berikutnya.",
        },
        {
          key: "ArrowUp / ArrowDown",
          action: "Naikkan atau turunkan angka segmen.",
        },
        {
          key: "Backspace",
          action: "Kembali ke segmen sebelumnya saat segmen kosong.",
        },
      ],
    },
    generateCode: (props) => {
      const prefixProp =
        props.withPrefix === false ? "\n  withPrefix={false}" : "";
      const disabledProp = props.disabled ? "\n  disabled={true}" : "";
      return `<VersionInput
  label={"Versi aplikasi"}
  value={value}
  onValueChange={setValue}${prefixProp}${disabledProp}
/>`;
    },
    renderPlayground: (props) => (
      <VersionInputDemo
        withPrefix={Boolean(props.withPrefix)}
        disabled={Boolean(props.disabled)}
      />
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
        description:
          "Daftar item yang bisa dicari: `id`, `title`, `description`, `keywords`.",
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

  input: {
    key: "input",
    title: "Input",
    category: "Inputs",
    description:
      "Input teks standar dengan validasi native maxLength dan integrasi toast peringatan.",
    importPath:
      'import { Input } from "@/design-system/components/input/input/input";',
    component: Input,
    defaultProps: {
      placeholder: "Masukkan teks...",
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
    generateCode: (props) => {
      const phProp = props.placeholder
        ? ` placeholder={"${props.placeholder}"}`
        : ' placeholder={"Masukkan teks..."}';
      const szProp =
        props.size && props.size !== "md" ? ` size={"${props.size}"}` : "";
      const mlProp =
        props.maxLength && props.maxLength !== 20
          ? ` maxLength={${props.maxLength}}`
          : "";
      const disProp = props.disabled ? ` disabled={true}` : "";
      return `<Input${phProp}${szProp}${mlProp}${disProp} />`;
    },
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
    category: "Inputs",
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
    category: "Inputs",
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
    generateCode: (props) => {
      const val = props.value !== undefined ? props.value : 10;
      const minProp =
        props.min !== undefined && props.min !== 0 ? ` min={${props.min}}` : "";
      const maxProp =
        props.max !== undefined && props.max !== 100
          ? ` max={${props.max}}`
          : "";
      const stepProp =
        props.step !== undefined && props.step !== 1
          ? ` step={${props.step}}`
          : "";
      const szProp =
        props.size && props.size !== "md" ? ` size={"${props.size}"}` : "";
      const disProp = props.disabled ? ` disabled={true}` : "";
      return `<NumberInput\n  value={"${val}"}${minProp}${maxProp}${stepProp}${szProp}${disProp}\n  onValueChange={(details) => console.log(details.value)}\n/>`;
    },
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
    category: "Inputs",
    description:
      "Input kata sandi aman dengan tombol toggle visibilitas show/hide terintegrasi.",
    importPath:
      'import { PasswordInput } from "@/design-system/components/input/password-input/password-input";',
    component: PasswordInput,
    defaultProps: {
      placeholder: "Masukkan kata sandi...",
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
    generateCode: (props) => {
      const phProp = props.placeholder
        ? ` placeholder={"${props.placeholder}"}`
        : ' placeholder={"Masukkan kata sandi..."}';
      const szProp =
        props.size && props.size !== "md" ? ` size={"${props.size}"}` : "";
      const disProp = props.disabled ? ` disabled={true}` : "";
      return `<PasswordInput${phProp}${szProp}${disProp} />`;
    },
    renderPlayground: (props) => (
      <Box w={"260px"}>
        <PasswordInput {...props} />
      </Box>
    ),
  },

  select: {
    key: "select",
    title: "Select Input",
    category: "Inputs",
    description:
      "Komponen dropdown pilihan tunggal dengan portalling, filter, dan dukungan startElement.",
    importPath:
      'import SelectInput from "@/design-system/components/input/select/select";',
    component: SelectInput,
    defaultProps: {
      placeholder: "Pilih opsi...",
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
    generateCode: (props) => {
      const phProp = props.placeholder
        ? ` placeholder={"${props.placeholder}"}`
        : ' placeholder={"Pilih opsi..."}';
      const szProp =
        props.size && props.size !== "md" ? ` size={"${props.size}"}` : "";
      const disProp = props.disabled ? ` disabled={true}` : "";
      return `<SelectInput${phProp}${szProp}${disProp}\n  options={[\n    { label: "Opsi 1", value: "opt1" },\n    { label: "Opsi 2", value: "opt2" },\n    { label: "Opsi 3", value: "opt3" },\n  ]}\n  onValueChange={(val) => console.log(val)}\n/>`;
    },
    renderPlayground: (props) => <SelectPlaygroundDemo {...props} />,
  },

  focus_select: {
    key: "focus_select",
    title: "Focus Select Input",
    category: "Inputs",
    description:
      "Input pemilihan interaktif modal terfokus dengan search realtime dan dynamic custom option.",
    importPath:
      'import { FocusSelectInput } from "@/design-system/components/input/focus-select/focus-select";',
    component: FocusSelectInput,
    defaultProps: {
      placeholder: "Pilih opsi...",
      size: "md",
      clearable: true,
      disabled: false,
    },
    generateCode: (props) => {
      const propList: string[] = ['modalKey={"opsi-select"}'];
      if (props.placeholder && props.placeholder !== "Pilih opsi...") {
        propList.push(`placeholder={"${props.placeholder}"}`);
      } else {
        propList.push('placeholder={"Pilih opsi..."}');
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
    { label: "Opsi 1", value: "opt1", description: "Deskripsi opsi pertama" },
    { label: "Opsi 2", value: "opt2", description: "Deskripsi opsi kedua" },
    { label: "Opsi 3", value: "opt3", description: "Deskripsi opsi ketiga" },
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
    category: "Inputs",
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
    generateCode: (props) => {
      const label = props.children || "Accept Terms & Conditions";
      const cpProp =
        props.colorPalette && props.colorPalette !== "blue"
          ? ` colorPalette={"${props.colorPalette}"}`
          : "";
      const disProp = props.disabled ? ` disabled={true}` : "";
      return `<Checkbox${cpProp}${disProp}>\n  {"${label}"}\n</Checkbox>`;
    },
    renderPlayground: (props) => <Checkbox {...props} />,
  },

  switch: {
    key: "switch",
    title: "Switch",
    category: "Inputs",
    description: "Toggle switch dua status (On/Off).",
    importPath:
      'import { Switch } from "@/design-system/components/input/switch/switch";',
    component: Switch,
    renderPlayground: (props) => <Switch {...props} />,
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
    generateCode: (props) => {
      const label = props.children || "Enable Notifications";
      const cpProp =
        props.colorPalette && props.colorPalette !== "blue"
          ? ` colorPalette={"${props.colorPalette}"}`
          : "";
      const szProp =
        props.size && props.size !== "md" ? ` size={"${props.size}"}` : "";
      const disProp = props.disabled ? ` disabled={true}` : "";
      return `<Switch${cpProp}${szProp}${disProp}>\n  {"${label}"}\n</Switch>`;
    },
  },

  textarea: {
    key: "textarea",
    title: "Textarea",
    category: "Inputs",
    description:
      "Bidang input teks multi-baris dengan perlindungan gradien floating label dan notifikasi batas karakter.",
    importPath:
      'import { Textarea } from "@/design-system/components/input/textarea/textarea";',
    component: Textarea,
    defaultProps: {
      placeholder: "Masukkan keterangan...",
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
    generateCode: (props) => {
      const phProp = props.placeholder
        ? ` placeholder={"${props.placeholder}"}`
        : ' placeholder={"Masukkan keterangan..."}';
      const disProp = props.disabled ? ` disabled={true}` : "";
      return `<Textarea${phProp}${disProp} />`;
    },
    renderPlayground: (props) => (
      <Box w={"340px"}>
        <Textarea {...props} />
      </Box>
    ),
  },

  radio_input: {
    key: "radio_input",
    title: "Radio Input",
    category: "Inputs",
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
    generateCode: (props) => {
      const cpProp =
        props.colorPalette && props.colorPalette !== "blue"
          ? ` colorPalette={"${props.colorPalette}"}`
          : "";
      const szProp =
        props.size && props.size !== "md" ? ` size={"${props.size}"}` : "";
      const disProp = props.disabled ? ` disabled={true}` : "";
      return `<RadioInput\n  defaultValue={"opt1"}${cpProp}${szProp}${disProp}\n  options={[\n    { value: "opt1", label: "Option 1" },\n    { value: "opt2", label: "Option 2" },\n    { value: "opt3", label: "Option 3" },\n  ]}\n  onValueChange={(details) => console.log(details.value)}\n/>`;
    },
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
    category: "Inputs",
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
    generateCode: (props) => {
      const cpProp =
        props.colorPalette && props.colorPalette !== "blue"
          ? ` colorPalette={"${props.colorPalette}"}`
          : "";
      const szProp =
        props.size && props.size !== "md" ? ` size={"${props.size}"}` : "";
      const disProp = props.disabled ? ` disabled={true}` : "";
      return `<RadioCardInput.Root defaultValue={"standard"}${cpProp}${szProp}${disProp} w={"full"}>\n  <HStack gap={3} w={"full"}>\n    <RadioCardInput.Item value={"standard"} flex={1}>\n      <RadioCardInput.ItemControl p={4} justifyContent={"space-between"}>\n        <RadioCardInput.ItemText>\n          <P fontWeight={"semibold"} fontSize={"sm"}>{"Standard"}</P>\n          <P fontSize={"xs"} color={"fg.muted"}>{"Fitur esensial"}</P>\n        </RadioCardInput.ItemText>\n        <RadioCardInput.ItemIndicator />\n      </RadioCardInput.ItemControl>\n    </RadioCardInput.Item>\n    <RadioCardInput.Item value={"pro"} flex={1}>\n      <RadioCardInput.ItemControl p={4} justifyContent={"space-between"}>\n        <RadioCardInput.ItemText>\n          <P fontWeight={"semibold"} fontSize={"sm"}>{"Enterprise"}</P>\n          <P fontSize={"xs"} color={"fg.muted"}>{"Akses menyeluruh"}</P>\n        </RadioCardInput.ItemText>\n        <RadioCardInput.ItemIndicator />\n      </RadioCardInput.ItemControl>\n    </RadioCardInput.Item>\n  </HStack>\n</RadioCardInput.Root>`;
    },
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
          <RadioCardInput.Item value={"standard"} flex={1}>
            <RadioCardInput.ItemControl p={4} justifyContent={"space-between"}>
              <RadioCardInput.ItemText>
                <P fontWeight={"semibold"} fontSize={"sm"}>
                  {"Standard"}
                </P>
                <P fontSize={"xs"} color={"fg.muted"}>
                  {"Fitur esensial"}
                </P>
              </RadioCardInput.ItemText>
              <RadioCardInput.ItemIndicator />
            </RadioCardInput.ItemControl>
          </RadioCardInput.Item>
          <RadioCardInput.Item value={"pro"} flex={1}>
            <RadioCardInput.ItemControl p={4} justifyContent={"space-between"}>
              <RadioCardInput.ItemText>
                <P fontWeight={"semibold"} fontSize={"sm"}>
                  {"Enterprise"}
                </P>
                <P fontSize={"xs"} color={"fg.muted"}>
                  {"Akses menyeluruh"}
                </P>
              </RadioCardInput.ItemText>
              <RadioCardInput.ItemIndicator />
            </RadioCardInput.ItemControl>
          </RadioCardInput.Item>
        </HStack>
      </RadioCardInput.Root>
    ),
  },

  segment_group: {
    key: "segment_group",
    title: "Segment Group",
    category: "Inputs",
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
    generateCode: (props) => {
      const cpProp =
        props.colorPalette && props.colorPalette !== "blue"
          ? ` colorPalette={"${props.colorPalette}"}`
          : "";
      const szProp =
        props.size && props.size !== "md" ? ` size={"${props.size}"}` : "";
      const disProp = props.disabled ? ` disabled={true}` : "";
      return `<SegmentGroupInput\n  defaultValue={"grid"}${cpProp}${szProp}${disProp}\n  options={[\n    { value: "list", label: "List View" },\n    { value: "grid", label: "Grid View" },\n    { value: "map", label: "Map View" },\n  ]}\n  onValueChange={(details) => console.log(details.value)}\n/>`;
    },
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
    category: "Inputs",
    description:
      "Kontrol penggeser numerik dengan thumb interaktif dan rentang nilai presisi.",
    importPath:
      'import { Slider } from "@/design-system/components/input/slider/slider";',
    component: Slider,
    defaultProps: {
      defaultValue: [40],
      max: 100,
      step: 5,
    },
    propsSpec: [
      {
        name: "max",
        type: "number",
        defaultValue: 100,
        description: "Nilai maksimum slider.",
        controlKind: "number",
      },
    ],
    generateCode: (props) => {
      const maxProp =
        props.max !== undefined && props.max !== 100
          ? ` max={${props.max}}`
          : "";
      return `<Slider\n  defaultValue={[40]}${maxProp}\n  showValue={true}\n  label={"Volume / Ukuran"}\n/>`;
    },
    renderPlayground: (props) => (
      <Box w={"280px"}>
        <Slider
          defaultValue={[40]}
          max={Number(props.max) || 100}
          showValue={true}
          label={"Volume / Ukuran"}
        />
      </Box>
    ),
  },

  pin_input: {
    key: "pin_input",
    title: "Pin Input",
    category: "Inputs",
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
    generateCode: (props) => {
      const count = props.count || 4;
      const maskProp = props.mask ? ` mask={true}` : "";
      return `<PinInput count={${count}}${maskProp} onValueComplete={(e) => console.log(e.valueAsString)} />`;
    },
    renderPlayground: (props) => (
      <PinInput count={Number(props.count) || 4} mask={Boolean(props.mask)} />
    ),
  },

  search_input: {
    key: "search_input",
    title: "Search Input",
    category: "Inputs",
    description:
      "Input pencarian terintegrasi dengan icon kaca pembesar dan tombol reset cepat.",
    importPath:
      'import { SearchInput } from "@/design-system/components/input/search-input/search-input";',
    component: SearchInput,
    defaultProps: {
      placeholder: "Cari...",
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
    generateCode: (props) => {
      const phProp = props.placeholder
        ? ` placeholder={"${props.placeholder}"}`
        : ' placeholder={"Cari..."}';
      const szProp =
        props.size && props.size !== "md" ? ` size={"${props.size}"}` : "";
      return `<SearchInput${phProp}${szProp} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />`;
    },
    renderPlayground: (props) => (
      <Box w={"280px"}>
        <SearchInput
          placeholder={String(props.placeholder || "Cari...")}
          size={(props.size as "xs" | "sm" | "md" | "lg") || "md"}
        />
      </Box>
    ),
  },

  field: {
    key: "field",
    title: "Field",
    category: "Inputs",
    description:
      "Wrapper form terintegrasi dengan label mengambang, helper text, error handling, dan tag optional.",
    importPath:
      'import { Field } from "@/design-system/components/input/field/field";',
    component: Field,
    defaultProps: {
      label: "Label",
      helperText: "Keterangan bantuan",
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
    generateCode: (props) => {
      const lbl = props.label
        ? ` label={"${props.label}"}`
        : ' label={"Label"}';
      const ht = props.helperText ? ` helperText={"${props.helperText}"}` : "";
      const opt = props.optional ? ` optional={true}` : "";
      return `<Field${lbl}${ht}${opt}>\n  <Input placeholder={"Masukkan teks..."} />\n</Field>`;
    },
    renderPlayground: (props) => (
      <Box w={"300px"}>
        <Field
          label={String(props.label || "Label")}
          helperText={String(props.helperText || "")}
          optional={Boolean(props.optional)}
        >
          <Input />
        </Field>
      </Box>
    ),
  },

  file_input: {
    key: "file_input",
    title: "FileInput",
    category: "Inputs",
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
    generateCode: (props) => {
      const vProp =
        props.variant && props.variant !== "dropzone"
          ? ` variant={"${props.variant}"}`
          : "";
      const mfProp =
        props.maxFiles && props.maxFiles !== 3
          ? ` maxFiles={${props.maxFiles}}`
          : "";
      const disProp = props.disabled ? ` disabled={true}` : "";
      return `<FileInput${vProp}${mfProp}${disProp} accept={[".jpeg", ".jpg", ".png", ".pdf"]} onFileChange={(files) => console.log(files)} />`;
    },
    renderPlayground: (props) => (
      <Box w={"full"} maxW={"420px"}>
        <Field label={"Lampiran dokumen"} variant={"default"}>
          <FileInput
            variant={
              (props.variant as "dropzone" | "button" | "auto") || "dropzone"
            }
            maxFiles={Number(props.maxFiles) || 3}
            disabled={Boolean(props.disabled)}
            accept={[".jpeg", ".jpg", ".png", ".pdf"]}
          />
        </Field>
      </Box>
    ),
  },

  date_input: {
    key: "date_input",
    title: "DateInput",
    category: "Inputs",
    description:
      "Bidang input tanggal terintegrasi modal kalender interaktif dengan pemilihan tahun, bulan, dan hari.",
    importPath:
      'import { DateInput } from "@/design-system/components/input/date-input/date-input";',
    component: DateInput,
    defaultProps: {
      datePickerSubtitle: "",
      disabled: false,
    },
    propsSpec: [
      {
        name: "datePickerSubtitle",
        type: "string",
        defaultValue: "",
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
    generateCode: (props) => {
      const subProp = props.datePickerSubtitle
        ? ` datePickerSubtitle={"${props.datePickerSubtitle}"}`
        : "";
      const disProp = props.disabled ? ` disabled={true}` : "";
      return `<DateInput modalKey={"pilih-tanggal"}${subProp}${disProp} onValueChange={(val) => console.log(val)} />`;
    },
    renderPlayground: (props) => (
      <Box w={"280px"}>
        <DateInput
          modalKey={"docs-date-input"}
          disabled={Boolean(props.disabled)}
          datePickerSubtitle={
            props.datePickerSubtitle
              ? String(props.datePickerSubtitle)
              : undefined
          }
        />
      </Box>
    ),
  },

  phone_input: {
    key: "phone_input",
    title: "Phone Input",
    category: "Inputs",
    description:
      "Input nomor telepon dengan prefix kode negara yang terkunci. Nilai yang dihasilkan selalu berformat E.164 (+628123456789).",
    importPath:
      'import { PhoneInput } from "@/design-system/components/input/phone-input/phone-input";',
    component: PhoneInput,
    defaultProps: {
      defaultCountry: "ID",
      countryLocked: false,
      stripLeadingZero: true,
      disabled: false,
    },
    propsSpec: [
      {
        name: "country",
        type: "string",
        defaultValue: undefined,
        description:
          "Negara terkontrol (ISO alpha-2), menentukan prefix kode negara. Pasangkan dengan onCountryChange.",
      },
      {
        name: "defaultCountry",
        type: "string",
        defaultValue: "ID",
        description: "Negara awal (ISO alpha-2) untuk mode uncontrolled.",
        controlKind: "select",
        options: ["ID", "MY", "SG", "US", "GB", "JP"],
      },
      {
        name: "countries",
        type: "string[]",
        defaultValue: undefined,
        description: "Whitelist dan urutan negara yang bisa dipilih.",
      },
      {
        name: "countryLocked",
        type: "boolean",
        defaultValue: false,
        description:
          "Menampilkan negara sebagai prefix statis tanpa pemilih negara.",
        controlKind: "boolean",
      },
      {
        name: "stripLeadingZero",
        type: "boolean",
        defaultValue: true,
        description: "Membuang angka 0 di depan nomor (0812 menjadi 812).",
        controlKind: "boolean",
      },
      {
        name: "value / defaultValue",
        type: "string",
        defaultValue: undefined,
        description: "Nilai E.164. String kosong bila nomor belum diisi.",
      },
      {
        name: "onValueChange",
        type: "(details: { value, country, dialCode, nationalNumber }) => void",
        defaultValue: undefined,
        description: "Dipanggil setiap nomor atau negara berubah.",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: false,
        description: "Menonaktifkan input dan pemilih negara.",
        controlKind: "boolean",
      },
    ],
    a11y: {
      keyboardNav: [
        { key: "Tab", action: "Pindah dari pemilih negara ke kolom nomor." },
        {
          key: "Enter / Space",
          action: "Membuka daftar negara saat fokus di pemilih negara.",
        },
      ],
      notes:
        "Prefix kode negara bukan bagian dari teks yang bisa diedit, sehingga tidak bisa terhapus. Menempel nomor internasional lengkap (+62...) otomatis memisahkan kode negaranya.",
    },
    generateCode: (props) => {
      const country = String(props.defaultCountry || "ID");
      const lockedProp = props.countryLocked ? "\n  countryLocked={true}" : "";
      const stripProp = props.stripLeadingZero
        ? "\n  stripLeadingZero={true}"
        : "";
      return `<PhoneInput
  modalKey={"docs-phone-input"}
  defaultCountry={"${country}"}${lockedProp}${stripProp}
/>`;
    },
    renderPlayground: (props) => (
      <Box w={"320px"}>
        <PhoneInput
          key={String(props.defaultCountry)}
          modalKey={"docs-phone-input"}
          defaultCountry={String(props.defaultCountry || "ID")}
          countryLocked={Boolean(props.countryLocked)}
          stripLeadingZero={Boolean(props.stripLeadingZero)}
          disabled={Boolean(props.disabled)}
          placeholder={"8123456789"}
        />
      </Box>
    ),
  },

  time_input: {
    key: "time_input",
    title: "Time Input",
    category: "Inputs",
    description:
      "Input waktu 24 jam. Trigger membuka modal berisi roda angka vertikal untuk jam, menit, dan detik; nilai baru tersimpan setelah dikonfirmasi.",
    importPath:
      'import { TimeInput } from "@/design-system/components/input/time-input/time-input";',
    component: TimeInput,
    defaultProps: {
      withSeconds: true,
      minuteStep: 1,
      secondStep: 1,
      disabled: false,
    },
    propsSpec: [
      {
        name: "modalKey",
        type: "string",
        required: true,
        defaultValue: undefined,
        description: "Key unik modal, tersinkron dengan URL param overlay.",
      },
      {
        name: "value / defaultValue",
        type: "string | null",
        defaultValue: undefined,
        description: 'Waktu berformat "HH:mm:ss" (atau "HH:mm" tanpa detik).',
      },
      {
        name: "onValueChange",
        type: "(value: string | null) => void",
        defaultValue: undefined,
        description: "Dipanggil saat pengguna menekan tombol konfirmasi.",
      },
      {
        name: "withSeconds",
        type: "boolean",
        defaultValue: true,
        description: "Menampilkan kolom detik.",
        controlKind: "boolean",
      },
      {
        name: "minuteStep",
        type: "number",
        defaultValue: 1,
        description: "Interval pilihan menit.",
        controlKind: "select",
        options: [1, 5, 10, 15, 30],
      },
      {
        name: "secondStep",
        type: "number",
        defaultValue: 1,
        description: "Interval pilihan detik.",
        controlKind: "select",
        options: [1, 5, 10, 15, 30],
      },
      {
        name: "children",
        type: "ReactNode",
        defaultValue: undefined,
        description: "Trigger kustom pengganti trigger bawaan.",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: false,
        description: "Menonaktifkan trigger.",
        controlKind: "boolean",
      },
    ],
    a11y: {
      role: "spinbutton (tiap kolom)",
      keyboardNav: [
        { key: "ArrowUp / ArrowDown", action: "Mengubah nilai satu langkah." },
        { key: "PageUp / PageDown", action: "Mengubah nilai lima langkah." },
        { key: "Home / End", action: "Lompat ke nilai pertama atau terakhir." },
        {
          key: "0-9",
          action: "Mengetik angka untuk lompat ke nilai terdekat.",
        },
        { key: "Tab", action: "Pindah antar kolom lalu ke tombol footer." },
      ],
      notes:
        "Menutup modal tanpa konfirmasi (Batal, Esc, klik luar) membuang perubahan.",
    },
    generateCode: (props) => {
      const secProp = props.withSeconds ? "\n  withSeconds={true}" : "";
      const minStep = Number(props.minuteStep) || 1;
      const secStep = Number(props.secondStep) || 1;
      const minProp = minStep !== 1 ? `\n  minuteStep={${minStep}}` : "";
      const secStepProp = secStep !== 1 ? `\n  secondStep={${secStep}}` : "";
      const disProp = props.disabled ? "\n  disabled={true}" : "";
      return `<TimeInput
  modalKey={"docs-time-input"}
  defaultValue={"09:30:00"}${secProp}${minProp}${secStepProp}${disProp}
/>`;
    },
    renderPlayground: (props) => (
      <Box w={"280px"}>
        <TimeInput
          modalKey={"docs-time-input"}
          defaultValue={"09:30:00"}
          withSeconds={Boolean(props.withSeconds)}
          minuteStep={Number(props.minuteStep) || 1}
          secondStep={Number(props.secondStep) || 1}
          disabled={Boolean(props.disabled)}
        />
      </Box>
    ),
  },

  date_picker: {
    key: "date_picker",
    title: "DatePicker",
    category: "Inputs",
    description:
      "Kalender inline dengan batas min, max, blacklist, dan whitelist tanggal. Mendukung navigasi keyboard penuh dan label tanggal sesuai locale aktif.",
    importPath:
      'import { DatePicker } from "@/design-system/components/input/date-picker/date-picker";',
    component: DatePicker,
    defaultProps: { availableMode: "range" },
    propsSpec: [
      {
        name: "value / defaultValue",
        type: "string | null",
        description: "Tanggal terpilih dalam format ISO YYYY-MM-DD.",
      },
      {
        name: "min / max",
        type: "string",
        description: "Batas luar tanggal yang bisa dipilih.",
      },
      {
        name: "disabledDates",
        type: "string[]",
        description: "Blacklist tanggal yang tidak bisa dipilih.",
      },
      {
        name: "availableDates",
        type: "{ start: string; end: string } | string[]",
        description:
          "Whitelist tanggal. Object untuk range, array untuk tanggal spesifik. Satu tanggal di array langsung terpilih bila uncontrolled.",
      },
      {
        name: "availableMode",
        type: "string",
        defaultValue: "range",
        description: "Hanya untuk playground: contoh range atau array tanggal.",
        controlKind: "select",
        options: ["range", "array", "today-only"],
      },
      {
        name: "timezone",
        type: "string",
        description: "IANA timezone, misalnya Asia/Jakarta.",
      },
    ],
    a11y: {
      role: "group",
      keyboardNav: [
        { key: "Arrow keys", action: "Pindah satu hari atau satu minggu" },
        { key: "Home / End", action: "Awal atau akhir minggu" },
        {
          key: "PageUp / PageDown",
          action: "Bulan sebelumnya atau berikutnya",
        },
        { key: "Enter / Space", action: "Pilih tanggal" },
      ],
      notes:
        "Hanya satu tanggal yang ada di tab order (roving tabindex). Tanggal di luar whitelist tetap bisa difokus dengan aria-disabled.",
    },
    generateCode: () => `<DatePicker
  value={date}
  onChange={setDate}
/>`,
    renderPlayground: (props) => {
      const today = new Date();
      const iso = (offset: number) =>
        new Date(today.getTime() + offset * 86400000)
          .toISOString()
          .slice(0, 10);
      const mode = String(props.availableMode || "range");
      const availableDates =
        mode === "array"
          ? [iso(1), iso(3), iso(8), iso(10)]
          : mode === "today-only"
            ? [iso(0)]
            : { start: iso(0), end: iso(30) };
      return (
        <DatePicker key={mode} availableDates={availableDates} maxW={"360px"} />
      );
    },
  },
};

const SelectPlaygroundDemo = (props: Record<string, unknown>) => {
  return (
    <Box w={"260px"}>
      <SelectInput
        placeholder={String(props.placeholder || "Pilih opsi...")}
        size={(props.size as "sm" | "md" | "lg") || "md"}
        disabled={Boolean(props.disabled)}
        options={[
          { label: "Opsi 1", value: "opt1" },
          { label: "Opsi 2", value: "opt2" },
          { label: "Opsi 3", value: "opt3" },
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
        placeholder={String(props.placeholder || "Pilih opsi...")}
        size={(props.size as "sm" | "md" | "lg") || "md"}
        clearable={Boolean(props.clearable)}
        disabled={Boolean(props.disabled)}
        isFetching={Boolean(props.isFetching)}
        isError={Boolean(props.isError)}
        options={[
          {
            label: "Opsi 1",
            value: "opt1",
            description: "Deskripsi opsi pertama",
          },
          {
            label: "Opsi 2",
            value: "opt2",
            description: "Deskripsi opsi kedua",
          },
          {
            label: "Opsi 3",
            value: "opt3",
            description: "Deskripsi opsi ketiga",
          },
        ]}
      />
    </Box>
  );
};
