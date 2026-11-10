---
trigger: always_on
---

# Design System Reference

Panduan komponen, hooks, konstanta, dan pola kode di `@/design-system/`.

Semua aturan di Bagian 1 bersifat wajib. Jika sebuah contoh kode bertentangan dengan aturan, aturan yang berlaku.

---

## 1. Aturan Wajib

### 1.1 Gaya kode

- Semua nilai prop dibungkus curly bracket, apa pun tipenya: `value={"foo"}`, `primary={true}`. Bukan `value="foo"` atau `primary`.
- Import di dalam `src/` memakai alias `@/`.
- Beri komentar section di komponen: `// Contexts`, `// States`, `// Derived Values`, `// Hooks (Queries & Mutations)`, dan seterusnya.
- Cek array kosong dengan `isEmptyArray(arr)` dari `@/shared/utils/data/array`. Dilarang memakai `.length === 0`.
- Jangan menulis prop yang nilainya sama dengan default komponen. Contoh: `VStack` dan `HStack` sudah default `align={"stretch"}` dan `gap={0}`. Sebelum memakai atau me-refactor komponen, baca implementasinya di `@/design-system/` untuk mengetahui default-nya.

### 1.2 Render kondisional

- Di dalam JSX hanya boleh `&&` atau early return. Ternary (`? :`) dilarang untuk merender elemen.
- Ternary hanya boleh untuk menentukan nilai variabel atau prop primitif di luar JSX.

```tsx
// Boleh: nilai variabel
const color = isKawasan ? "orange" : "blue";

// Boleh: logical AND
{
  isLoading && <Skeleton />;
}
{
  !isLoading && isEmpty && <NoDataState />;
}
{
  !isLoading && !isEmpty && <DataView />;
}

// Boleh: early return
if (isLoading) return <Skeleton />;
```

### 1.3 Ukuran dan tipografi

- Jangan mengecilkan `size` (`xs` atau `sm`) pada `Button`, `IconButton`, `AppIcon`, dan `Badge` kecuali diinstruksikan eksplisit. Pakai ukuran default.
- Teks biasa memakai `fontSize` default (`md`), jadi jangan menulis `fontSize={"md"}`. `sm` hanya bila perlu untuk hierarki tertentu, `xs` sangat jarang.
- Sel atau kolom yang berisi `Badge` memakai alignment default (`"start"`), jangan di-center.
- Semua input (`Input`, `NumberInput`, `SearchInput`, `Select`, `Field`, dan sejenisnya) selalu `w={"full"}` di dalam container atau form.
- **Spacing (`gap`, `p`, `px`, `py`, `m`, dll)**: Wajib angka (*Numeric Scale* 4px: `1`, `2`, `3`, `4`, `6`, `8`, dst). Dilarang string semantic seperti `"xs"`, `"sm"`, `"md"`. Ukuran string t-shirt hanya sah untuk prop `size` komponen.

### 1.4 Teks dan placeholder

- Jangan pakai prop `truncate`. Pakai `ClampedP` untuk memotong teks satu atau banyak baris.
- Jangan beri prefix "contoh:" di `placeholder` maupun `helperText`. Tulis nilainya langsung: `placeholder={"admin_spatial"}`.

```tsx
import { ClampedP } from "@/design-system/components/typography/ui/p";
```

### 1.5 Form

- Semua form memakai React Hook Form dan Zod (`@hookform/resolvers/zod`), dengan pola uncontrolled `{...register("field")}`. Dilarang memakai banyak `useState` terpisah untuk field form.
- Submit lewat semantic form: `<VStack as={"form"} onSubmit={form.handleSubmit(onSubmit)}>` dengan `<Button type={"submit"}>`. Dengan begitu `Enter` otomatis men-submit tanpa `onKeyDown` manual.
- PinInput, OTP, dan TOTP: saat semua digit terisi (`onValueComplete`), panggil `form.handleSubmit(onSubmit)()`. Jika verifikasi gagal, user cukup menekan `Enter` untuk submit ulang.

### 1.6 Overlay & `modalKey` Hierarchy (Aturan Mutlak)

- `Modal`, `Dialog`, `Drawer`, `FocusAlert`, dan overlay lain mengontrol open/close lewat `usePopDisclosure` (atau `usePopModal` sebagai alias legacy). Hook ini menyinkronkan state dengan URL search param **`overlay`** (`?overlay=...`) sehingga tombol back browser menutup overlay dan mendukung deep-linking. Dilarang mengontrol modal hanya dengan `useState` lokal.
- **Uniqueness Modal Key**:
  - Di layar atau tabel dengan baris banyak, setiap trigger modal WAJIB memiliki `modalKey` unik (misal: `modalKey={`layer-edit-${item.id}`}`). Dilarang memakai key statis tanpa ID karena akan memicu tabrakan state.
- **Hierarki Nested Overlay (Aturan Titik `.`)**:
  - Jika sebuah Modal/Dialog/Drawer memiliki child overlay di dalamnya (misal: `FocusSelect`, `ConfirmationTrigger`, dialog konfirmasi, atau step sub-modal), **child `modalKey` WAJIB meng-include / mewarisi parent `modalKey` dengan pemisah titik (`.`)**:
    ```tsx
    // Parent:
    const { modalKey, open } = usePopDisclosure({ modalKey: "layer-edit" });

    // Child di dalam parent modal:
    <ConfirmationTrigger modalKey={`${modalKey}.confirm-delete`} />
    ```
  - **DILARANG KERAS** menggunakan `modalKey` anak yang berdiri sendiri (tanpa prefix parent) di dalam modal yang sedang terbuka. Jika anak tidak menyertakan parent (`modalKey="confirm-delete"`), URL `?overlay=` akan berganti ke key anak dan menyebabkan parent langsung unmount / tertutup seketika.

```tsx
import { usePopDisclosure } from "@/design-system/components/overlay/hooks/use-pop-disclosure";
```

### 1.7 Data dan API

- Service dan query memakai response asli dari backend selama endpoint tersedia.
- Dummy data hanya boleh jadi fallback jika endpoint belum ada atau mengembalikan 404 DAN `VITE_ENABLE_DUMMY_RESPONSE_FALLBACK=true` (dicek lewat `isDummyDataEnabled()`). Jangan menimpa data valid dari backend dengan dummy.
- URL proxy WMS dibangun dengan `buildWmsProxyUrl()` dari `@/shared/utils/url/wms-proxy.utils`, yang mengacu ke `VITE_API_BASE_WMS_PROXY_URL`.

### 1.8 Perlindungan UI user

- Jangan menyentuh, merombak, atau mengubah JSX, layout, dan styling UI yang sudah dibuat user. Boleh hanya jika user secara eksplisit meminta dibuatkan page atau komponen tertentu, atau meminta refactor UI.

---

## 2. Design Tokens dan Theme

Sistem spacing di Exium menggunakan **Numeric Scale (Harmonic 4px Scale)** bawaan Chakra UI:
- `1` = 4px, `2` = 8px, `3` = 12px, `4` = 16px, `5` = 20px, `6` = 24px, `8` = 32px, `10` = 40px, `12` = 48px, `16` = 64px.
- **DILARANG** menggunakan semantic t-shirt string (`"xs"`, `"sm"`, `"md"`, `"lg"`) untuk spacing (`p`, `px`, `py`, `m`, `gap`). Selalu gunakan numeric scale: `p={4}`, `gap={2}`.
- T-shirt size (`size={"xs"}`, `size={"sm"}`) HANYA digunakan untuk prop `size` komponen (seperti `Button`, `Dialog`, `Drawer`, `Badge`, `Input`).

Theme store:

```tsx
import { useThemeStore } from "@/design-system/stores/theme-store";

const { theme } = useThemeStore();
// Properti: theme.radii.container, theme.colorPalette, dll.
```

---

## 3. Komponen

### 3.1 Typography (`@/design-system/components/typography/ui/*`)

`P` menerima seluruh Chakra `TextProps`.

```tsx
import { P } from "@/design-system/components/typography/ui/p";

<P color={"fg.subtle"} fontWeight={"medium"}>
  {"Teks"}
</P>;
```

`Badge` menerima `BadgeProps` (`colorPalette`, `variant`: `"subtle"` | `"outline"` | `"solid"`).

```tsx
import { Badge } from "@/design-system/components/typography/ui/badge";

<Badge colorPalette={"blue"} variant={"subtle"}>
  {"Bidang"}
</Badge>;
```

### 3.2 Layout (`@/design-system/components/layout/ui/*`)

`Box`, `HStack`, `VStack`, `Flex`, `Separator`, `Grid`, `Card`.

```tsx
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { Box } from "@/design-system/components/layout/box/box";
import { Separator } from "@/design-system/components/layout/separator/separator";

<VStack flex={1} gap={4}>
  <HStack justify={"space-between"}>
    <Box>{"Kiri"}</Box>
  </HStack>
  <Separator borderColor={"border.subtle"} />
</VStack>;
```

`Container` dan `useContainerContext()`:

```tsx
import {
  Container,
  useContainerContext,
} from "@/design-system/components/layout/ui/container";

// Parent page
<Container.Root flex={1} overflowY={"auto"} withContext={true}>
  <ChildComponent />
</Container.Root>;

// Child component
const ChildComponent = () => {
  const { isSmContainer } = useContainerContext();
  return <Container.Body flex={1}>...</Container.Body>;
};
```

### 3.3 Button dan Input

Sumber: `@/design-system/components/button/ui/*` dan `@/design-system/components/input/ui/*`. Aturan ukuran ada di 1.3.

```tsx
import { Button } from "@/design-system/components/button/ui/button";
import { AppIcon } from "@/design-system/components/icon/ui/app-icon";
import { Trash2Icon } from "lucide-react";

<Button primary={true} onClick={handleAction}>
  {"Simpan"}
</Button>

<Button variant={"outline"} colorPalette={"red"}>
  <AppIcon icon={Trash2Icon} />
  {"Hapus"}
</Button>
```

`IconButton` diimpor dari file yang sama dengan `Button`.

`SearchInput`:

```tsx
import { SearchInput } from "@/design-system/components/input/ui/search-input";

<SearchInput
  value={searchValue}
  onChange={(e) => onSearchChange(e.target.value)}
  placeholder={"Cari data..."}
/>;
```

### 3.4 Icons dan Shell

- Ikon: Lucide sebagai pilihan utama, Tabler sebagai fallback, lewat `<AppIcon icon={IconComponent} />`.
- `AppNavTitle` adalah judul navigasi header.

```tsx
import { AppIcon } from "@/design-system/components/icon/ui/app-icon";
import { AppNavTitle } from "@/design-system/components/shell/ui/app-nav-title";
import { APP_NAVS_MAP } from "@/shared/constants/app.navs";
import { MapPinIcon } from "lucide-react";

<AppNavTitle navsMap={APP_NAVS_MAP} />
<AppIcon icon={MapPinIcon} boxSize={5} />
```

---

## 4. Pola DataList Table

Semua DataList atau tabel memakai satu object literal di `useMemo` dengan implicit return (tanpa block body `{}` dan tanpa `return`), berisi `headers`, `items`, `batchActions`, dan `itemActions`.

```tsx
import type {
  DataListBatchActionsGenerator,
  DataListItemActionsGenerator,
} from "@/design-system/components/data-display/types/data-list.type";
import type { FormattedListItem } from "@/design-system/components/data-display/types/data-list-table.type";
import { DataListTable } from "@/design-system/components/data-display/ui/data-list-table";
import { Trash2Icon } from "lucide-react";

const dataList = useMemo(
  () => ({
    headers: [
      { th: "ID Bidang", sortable: true },
      { th: "Tema IGT-PR" },
      { th: "Basis IGT-PR", sortable: true },
      { th: "Deskripsi", cellProps: { minW: "200px" } },
    ],

    items: itemsData.map((item) => ({
      id: String(item.id),
      data: item,
      columns: [
        {
          value: item.id,
          td: <P>{item.id}</P>,
          align: "start" as const,
        },
        {
          value: item.basis,
          td: <Badge colorPalette={"blue"}>{item.basis}</Badge>,
          align: "start" as const,
        },
      ],
    })),

    batchActions: [
      ({ selectedItemIds, clearSelectedItems }) => (
        <Button
          key={"remove-selected"}
          variant={"outline"}
          colorPalette={"red"}
          onClick={() => {
            onRemoveItems?.(selectedItemIds);
            clearSelectedItems();
          }}
        >
          <AppIcon icon={Trash2Icon} />
          {"Hapus Terpilih"} ({selectedItemIds.length})
        </Button>
      ),
    ] as DataListBatchActionsGenerator[],

    itemActions: [
      (item) => (
        <Menu.Item key={"action"} value={"action"}>
          {"Aksi"}
        </Menu.Item>
      ),
    ] as DataListItemActionsGenerator[],
  }),
  [itemsData, onRemoveItems],
);

return (
  <DataListTable.Root
    headers={dataList.headers}
    items={dataList.items}
    batchActions={dataList.batchActions}
    itemActions={dataList.itemActions}
    withNumbering={false}
    canBatchSelect={true}
    selectedItems={selectedItems}
    onSelectedItemChange={onSelectedItemChange}
  >
    <DataListTable.Header />
    <DataListTable.Body />
  </DataListTable.Root>
);
```

---

## 5. Loading State

- `isLoading` (fetch pertama, belum ada data): tampilkan `Skeleton` full-width dengan tinggi tetap.
- `isFetching` (refetch, search, atau pagination): tabel tetap tampil dengan overlay loader (`bg={"bg.canvas/50"}`).

```tsx
import { Skeleton } from "@/design-system/components/feedback/ui/skeleton";
import { Loader } from "@/design-system/components/feedback/ui/loader";

{
  isLoading && <Skeleton />;
}

{
  !isLoading && (
    <Box w={"full"} position={"relative"}>
      <DataListTable.Root headers={dataList.headers} items={dataList.items} />

      {isFetching && (
        <Box
          position={"absolute"}
          inset={0}
          bg={"bg.canvas/50"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          zIndex={10}
        >
          <Loader size={"md"} />
        </Box>
      )}
    </Box>
  );
}
```
