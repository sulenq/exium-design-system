# Migration Progress: Chakra UI v3 → shadcn/ui

Tracking status migrasi per komponen sesuai roadmap.

Status yang digunakan: `todo` → `in-progress` → `review` → `done`.

---

## Batch 1: Komponen Leaf (Tanpa Overlay)

| Komponen | Batch | Usage (Features) | Status | PR / Commit | Catatan |
|---|:---:|:---:|:---:|---|---|
| **Button / IconButton** | 1 | 21 | todo | - | Variant solid, outline, ghost, subtle + loading |
| **Badge / Tag** | 1 | 13 | todo | - | Color palette mappings |
| **Input / SearchInput / PasswordInput** | 1 | 14 | todo | - | InputGroup komposisi |
| **Textarea** | 1 | 1 | todo | - | - |
| **Label / Field** | 1 | 5 | todo | - | Accessible form error & helper text |
| **Checkbox** | 1 | 2 | todo | - | Radix Checkbox |
| **Radio Group** | 1 | 2 | todo | - | Radix Radio Group |
| **Switch** | 1 | 4 | todo | - | Radix Switch |
| **Separator** | 1 | 6 | todo | - | Radix Separator |
| **Skeleton** | 1 | 4 | todo | - | Shimmer animation parity |
| **Spinner / Loader** | 1 | 2 | todo | - | - |
| **Avatar / Image** | 1 | 6 | todo | - | Radix Avatar |
| **Card** | 1 | 2 | todo | - | - |
| **Alert** | 1 | 1 | todo | - | Parity variant info, warning, error, success |
| **Progress** | 1 | 2 | todo | - | Radix Progress |
| **Link** | 1 | 2 | todo | - | Komposisi TanStack Router Link via asChild |

---

## Batch 2: Overlay & Floating (High A11y Risk)

| Komponen | Batch | Usage (Features) | Status | PR / Commit | Catatan |
|---|:---:|:---:|:---:|---|---|
| **Tooltip** | 2 | 2 | todo | - | Radix Tooltip |
| **Popover** | 2 | 2 | todo | - | Radix Popover |
| **Dialog / Modal** | 2 | 8 | todo | - | Radix Dialog + usePopModal sync |
| **Sheet / Drawer** | 2 | 5 | todo | - | Radix Sheet + direction variants |
| **DropdownMenu / Menu** | 2 | 2 | todo | - | Radix DropdownMenu |
| **ContextMenu** | 2 | 0 | todo | - | Radix ContextMenu |
| **Select / FocusSelectInput** | 2 | 6 | todo | - | Radix Select |
| **Combobox** | 2 | 1 | todo | - | Popover + Command |
| **Tabs** | 2 | 4 | todo | - | Radix Tabs |
| **Accordion** | 2 | 3 | todo | - | Radix Accordion |
| **Collapsible** | 2 | 2 | todo | - | Radix Collapsible |
| **Toast** | 2 | 4 | todo | - | Sonner integration |

---

## Batch 3: Komposit & Form

| Komponen | Batch | Usage (Features) | Status | PR / Commit | Catatan |
|---|:---:|:---:|:---:|---|---|
| **Form** | 5 | 5 | todo | - | RHF + Zod integration |
| **DatePicker** | 5 | 1 | todo | - | Calendar + date-fns |
| **NumberInput** | 5 | 2 | todo | - | Custom stepper accessible |
| **InputOTP / PinInput** | 5 | 6 | todo | - | input-otp parity |
| **ToggleGroup / SegmentedControl** | 5 | 2 | todo | - | Radix ToggleGroup |
| **Table / DataListTable** | 5 | 6 | todo | - | DataList pattern + TanStack Virtual |
| **Pagination** | 5 | 2 | todo | - | Accessible pagination controls |
| **Breadcrumb** | 5 | 3 | todo | - | Radix Breadcrumb |
| **Carousel** | 5 | 4 | todo | - | Embla Carousel |

---

## Batch 4: Layout Primitives (Vertical Slice Per Route)

| Komponen / Route Slice | Batch | Scope | Status | Catatan |
|---|:---:|---|:---:|---|
| **Box, Flex, HStack, VStack, Grid** | 6 | Codebase-wide | todo | Migrasi per-halaman/route slice |
| **P, ClampedP, Heading, Span** | 6 | Codebase-wide | todo | Semantic HTML + typography tokens |

