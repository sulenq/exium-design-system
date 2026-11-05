# Migration Inventory: Chakra UI v3 → shadcn/ui

Dokumen ini mendokumentasikan hasil audit Phase 0 terhadap seluruh pemakaian `@chakra-ui/react`, hooks, tokens, recipes, dan custom wrappers di codebase.

---

## 1. Decision Log (Phase 0)

| # | Keputusan | Pilihan | Catatan / Status |
|---|---|---|---|
| **D1** | Primitive dasar shadcn | **Radix UI** | Paling matang dan teruji dalam ekosistem shadcn |
| **D2** | Tempat dokumentasi & tes | **Storybook (Vite) + addon a11y** | Menjamin kepatuhan a11y WCAG 2.2 AA dan isolasi komponen |
| **D3** | Skala Breakpoint | **Parity Chakra** | `sm: 350px`, `md: 750px`, `lg: 960px`, `xl: 1200px` (sesuai `chakra-system.ts`) |
| **D4** | Test runner & a11y | **Vitest + RTL + vitest-axe** | Pengujian unit, interaksi, dan aksesibilitas otomatis |
| **D5** | Gaya variants | **cva** | Standar shadcn; tailwind-variants hanya jika multi-slot kompleks |
| **D6** | Dark mode strategy | **In-house ThemeProvider & hook** | Manipulasi class `.dark` di `<html>`, zero 3rd-party overhead, sinkron aman |

---

## 2. Inventaris Theme Chakra (`src/design-system/chakra/chakra-system.ts`)

- **Breakpoints**:
  - `sm`: `350px`
  - `md`: `750px`
  - `lg`: `960px`
  - `xl`: `1200px`
- **Global CSS & Reset**:
  - CSS variables palette & semantic tokens (`bg.canvas`, `bg.subtle`, `bg.muted`, `fg`, `fg.muted`, `fg.subtle`, `border`, dsb.).
  - Custom keyframes (animasi drawer, dialog, pulse, accordion).
- **Recipes & Slot Recipes**:
  - Single recipes: `button.recipe.ts`, `input.recipe.ts`.
  - Slot recipes: `select.recipe.ts`, `drawer.recipe.ts`, `dialog.recipe.ts`, `checkbox.recipe.ts`, `carousel.recipe.ts`.

---

## 3. Inventaris Direct Imports `@chakra-ui/react`

Sebanyak **110 file** di codebase mengimpor langsung `@chakra-ui/react`. Mayoritas berlokasi di `src/design-system/` sebagai wrapper components dan theme definitions:

| Kategori | Simbol Chakra yang Diimpor |
|---|---|
| **Layout Primitives** | `Box`, `HStack`, `VStack`, `Center`, `Circle`, `Portal`, `StackSeparator`, `chakra` |
| **Typography** | `Span`, `Heading`, `Badge` |
| **Form & Inputs** | `Input`, `InputGroup`, `NumberInput`, `PinInput`, `Switch`, `Checkbox`, `SegmentGroup`, `Field`, `Fieldset`, `Slider`, `RadioGroup`, `RadioCard` |
| **Overlay & Floating** | `Dialog`, `Drawer`, `Menu`, `Popover`, `Tooltip`, `ActionBar` |
| **Disclosure & Data** | `Accordion`, `Collapsible`, `Carousel`, `Progress`, `ProgressCircle`, `Presence`, `FormatNumber`, `LocaleProvider` |
| **Theme / System Tools** | `defineRecipe`, `defineSlotRecipe`, `defineStyle`, `createSystem`, `defaultConfig` |

---

## 4. Pemetaan Komponen & Frekuensi Usage di Aplikasi (`src/features/`)

Komponen design system yang aktif dikonsumsi oleh fitur aplikasi:

| Komponen | Batch Target | Usage di `features/` | Target shadcn / Tailwind |
|---|:---:|:---:|---|
| **Button / IconButton** | 1 | 21 | `button.tsx` (cva variants) |
| **Badge / Tag** | 1 | 13 | `badge.tsx` (cva variants) |
| **Input / SearchInput / PasswordInput** | 1 | 14 | `input.tsx` |
| **Field** | 1 | 5 | `field.tsx` (shadcn Form/Field) |
| **Switch** | 1 | 4 | `switch.tsx` (Radix Switch) |
| **Separator** | 1 | 6 | `separator.tsx` (Radix Separator) |
| **Skeleton** | 1 | 4 | `skeleton.tsx` |
| **Image / Avatar** | 1 | 6 | `avatar.tsx` / `image.tsx` |
| **Drawer (Sheet)** | 2 | 5 | `sheet.tsx` (Radix Dialog) |
| **Dialog / Modal** | 2 | 8 | `dialog.tsx` (Radix Dialog) |
| **Tabs** | 2 | 4 | `tabs.tsx` (Radix Tabs) |
| **Accordion** | 2 | 3 | `accordion.tsx` (Radix Accordion) |
| **Toast** | 2 | 4 | `sonner.tsx` |
| **PinInput (OTP)** | 5 | 6 | `input-otp.tsx` |
| **Breadcrumb** | 5 | 3 | `breadcrumb.tsx` |
| **DataViewTable / DataListTable** | 5 | 6 | `table.tsx` + TanStack |
| **Carousel** | 5 | 4 | `carousel.tsx` (Embla) |
| **HStack / VStack / Box / SimpleGrid** | 6 | 66+ | Semantic HTML (`div`, `flex`, `grid`) + Tailwind |
| **P / ClampedP / Heading** | 6 | 19+ | Semantic HTML (`p`, `h1`-`h6`) + Tailwind |

