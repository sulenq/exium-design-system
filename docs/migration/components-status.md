# Audit & Migration Progress: Exium Design System

Status per komponen per **24 November 2026**.

**Ringkasan:**
- ✅ **Done:** 22
- 🛠️ **Need Fixing:** 3 (`Toast engine / toast.manager`, `ToastStack`, `ToastItem`)
- ⏳ **Pending:** 130
- **Total Komponen:** 155

---

## 1. Komponen dengan Status Need Fixing (Fokus Saat Ini)

| Komponen | Status | Catatan Audit & Target Perbaikan |
| :--- | :---: | :--- |
| **Toast engine (toast.manager)** | 🛠️ Need Fixing | Handle recreation di `toast.update()` jika ID sudah tertutup; batalkan `leaving` timeout; durasi varian terpisah (`error`: 10s, `warning`: 8s, `success`: 4s); preserve `paused` state saat hover; urutan stack varian error/warning naik ke atas; proteksi exception callback/event-bus agar toast tidak stuck di `entering`. |
| **ToastStack** | 🛠️ Need Fixing | Aktifkan badge overflow (`+N`) saat collapsed & items > 1; urutan render memprioritaskan warning & error ke posisi teratas/terlihat. |
| **ToastItem** | 🛠️ Need Fixing | Pindahkan string hardcode `"Close notification"` dan `"Removed from history"` ke i18n (`toast.close`, `toast.removed_from_history`). |

---

## 2. Tabel Status Seluruh Komponen (155 Baris)

| Komponen | Status | Catatan / Changelog |
| :--- | :---: | :--- |
| BrandWatermark | ⏳ Pending | |
| Logo | ⏳ Pending | |
| BackButton | ⏳ Pending | |
| ButtonGroup | ⏳ Pending | |
| **Button / IconButton** | ✅ Done | No default clamp (`undefined`). Tooltip otomatis hanya aktif jika ada prop `lineClamp` eksplisit DAN teks terpotong di DOM. |
| CloseButton | ⏳ Pending | |
| ColorMode | ⏳ Pending | |
| DownloadTrigger (button) | ⏳ Pending | |
| DownloadTrigger (utilities) | ⏳ Pending | |
| ChartTooltip | ⏳ Pending | |
| **Clipboard** | ✅ Done | |
| ClipboardButton | ⏳ Pending | |
| **Countdown** | ✅ Done | |
| DataViewBatchActions | ⏳ Pending | |
| **DataViewFooter** | ✅ Done | Reset & recalculate target `page` saat `pageSize` berubah, layout terisolasi. |
| **DataViewItemActions** | ✅ Done | Ekstraksi `DataViewItemActionsMenuContent` bersama, dukungan modal trigger via `modalHost` di level Table Root. |
| **DataViewPageSize** | ✅ Done | Title i18n `"Baris per halaman"` / `"Rows per page"`, suffix i18n `"/halaman"` / `"/page"`. |
| **DataViewPagination** | ✅ Done | Isolasi `prevButtonProps` / `nextButtonProps`, eliminasi event collision, i18n label. |
| **DataViewTable** | ✅ Done | Integrasi context menu tanpa duplikasi modal; keyboard nav & focus trap via Chakra Menu terkontrol; pembatalan scroll & cleanup unmount. |
| **DataViewRowContextMenu** | ✅ Done | Refactor ke Chakra `Menu.Root` terkontrol (`positioning.getAnchorRect`), integrasi satu renderer bersama `DataViewItemActionsMenuContent`. |
| FileItem | ⏳ Pending | |
| MaskedText | ⏳ Pending | |
| StatGrid | ⏳ Pending | |
| Timeline | ⏳ Pending | |
| OutlineContourPerspective | ⏳ Pending | |
| Accordion | ⏳ Pending | |
| Breadcrumb | ⏳ Pending | |
| Carousel | ⏳ Pending | |
| Collapsible | ⏳ Pending | |
| Presence | ⏳ Pending | |
| Steps | ⏳ Pending | |
| Tabs | ⏳ Pending | |
| Emoji (20 varian) | ⏳ Pending | |
| NotFoundPage | ⏳ Pending | |
| Alert | ⏳ Pending | |
| **ConfirmationTrigger** | ✅ Done | Immediate close on confirm (no internal awaiting), async flow didelegasikan ke Toast, terdaftar di docs nav. |
| **confirmDialog** | ✅ Done | Immediate close on confirm, generator `modalKey` anti-collision dengan module-level counter. |
| FeedbackState | ⏳ Pending | |
| Indicator | ⏳ Pending | |
| Loader | ⏳ Pending | |
| Progress | ⏳ Pending | |
| **Skeleton** | ✅ Done | Menggunakan token theme radii, variant `shine` dan `pulse` terstandar. |
| StateAccessDenied | ⏳ Pending | |
| StateNoData | ⏳ Pending | |
| StateNoResult | ⏳ Pending | |
| StateRetry | ⏳ Pending | |
| StateWelcome | ⏳ Pending | |
| TopBarLoader | ⏳ Pending | |
| FocusAlert | ⏳ Pending | |
| FocusAlerter | ⏳ Pending | |
| AppIcon | ⏳ Pending | |
| Icon | ⏳ Pending | |
| LucideIcon | ⏳ Pending | |
| ChakraDatePicker | ⏳ Pending | |
| Checkbox | ⏳ Pending | |
| DateInput | ⏳ Pending | |
| DatePicker | ⏳ Pending | |
| **DurationInput (UnitInput)** | ✅ Done | Telah digantikan penuh oleh `UnitInput` yang modular dan mendukung floating label modern. |
| **Field** | ✅ Done | Mendukung floating label CSS `:has()`, deprecation scanning recursive children props. |
| Fieldset | ⏳ Pending | |
| FileInput | ⏳ Pending | |
| FocusSearch (input) | ⏳ Pending | |
| FocusSelect | ⏳ Pending | |
| InputGroup | ⏳ Pending | |
| **Input** | ✅ Done | Pure CSS floating `:has()`, zero React state overhead, sinkronisasi otomatis dengan `form.reset()` dan browser autofill. |
| **NumberInput** | ✅ Done | Pure CSS floating `:has()`, stepper controls & hidden RHF dispatch terjaga. |
| **PasswordInput** | ✅ Done | Pure CSS floating `:has()`, toggle visibility & password strength meter terjaga. |
| PinInput | ⏳ Pending | |
| RadioCardInput | ⏳ Pending | |
| RadioIndicator | ⏳ Pending | |
| RadioInput | ⏳ Pending | |
| SearchInput | ⏳ Pending | |
| SegmentGroup / SegmentGroupInput | ⏳ Pending | |
| Select | ⏳ Pending | |
| Slider | ⏳ Pending | |
| StringArrayInput | ⏳ Pending | |
| Switch | ⏳ Pending | |
| **Textarea** | ✅ Done | Pure CSS floating `:has()`, dynamic gradient overlay via CSS opacity. |
| ToggleTip | ⏳ Pending | |
| VersionInput | ⏳ Pending | |
| ActionHeaderScrollContainer | ⏳ Pending | |
| AspectRatio | ⏳ Pending | |
| Box | ⏳ Pending | |
| Card | ⏳ Pending | |
| Center | ⏳ Pending | |
| ClickableContainer | ⏳ Pending | |
| ConstrainedContainer | ⏳ Pending | |
| Container | ⏳ Pending | |
| FlexBox (HStack / VStack) | ⏳ Pending | |
| Float | ⏳ Pending | |
| Grid | ⏳ Pending | |
| Group | ⏳ Pending | |
| MaskedContainer | ⏳ Pending | |
| PageContainer | ⏳ Pending | |
| ScrollContainer | ⏳ Pending | |
| Separator | ⏳ Pending | |
| Splitter | ⏳ Pending | |
| Map (core) | ⏳ Pending | |
| MapBasemap / BasemapAttribution | ⏳ Pending | |
| MapControls (Zoom, Compass, Locate, Scale, 3D, BasemapSelect) | ⏳ Pending | |
| MapLayerManagement (Item, Panel, MasterIGT) | ⏳ Pending | |
| MapDrawControls | ⏳ Pending | |
| MapFeatureInfoPanel | ⏳ Pending | |
| MapSearch | ⏳ Pending | |
| MapSymbologyPanel | ⏳ Pending | |
| MapCoordinates | ⏳ Pending | |
| MapOverlay | ⏳ Pending | |
| Avatar | ⏳ Pending | |
| Image | ⏳ Pending | |
| HNavs | ⏳ Pending | |
| Link | ⏳ Pending | |
| Nav | ⏳ Pending | |
| Sidebar | ⏳ Pending | |
| VNavs | ⏳ Pending | |
| ActionBar | ⏳ Pending | |
| **Dialog** | ✅ Done | |
| **Drawer** | ✅ Done | |
| FocusSearch (overlay) | ⏳ Pending | |
| Menu | ⏳ Pending | |
| **Modal** | ✅ Done | Freeze viewport mode saat terbuka (mencegah form reset saat resize/rotate), deep-linking SSOT URL param `?overlay=`. |
| **usePopDisclosure / usePopModal (hook)** | ✅ Done | Single Source of Truth URL search params (`?overlay=...`), navigasi back/forward browser synchronizer. |
| Popover | ⏳ Pending | |
| **Tooltip** | ✅ Done | |
| AppNavTitle | ⏳ Pending | |
| CommonAppShell | ⏳ Pending | |
| GisAppShell | ⏳ Pending | |
| HeaderContainer | ⏳ Pending | |
| NotificationCenter | ⏳ Pending | |
| ToastIcon | ⏳ Pending | |
| **ToastItem** | 🛠️ Need Fixing | |
| ToastProgressBar | ⏳ Pending | |
| **ToastStack** | 🛠️ Need Fixing | |
| **Toast engine (toast.manager)** | 🛠️ Need Fixing | |
| Toaster | ⏳ Pending | |
| Badge | ⏳ Pending | |
| CountBadge | ⏳ Pending | |
| Heading | ⏳ Pending | |
| Kbd | ⏳ Pending | |
| List | ⏳ Pending | |
| P | ⏳ Pending | |
| RichTextEditor | ⏳ Pending | |
| Span | ⏳ Pending | |
| Url | ⏳ Pending | |
| ChakraLocaleProvider | ⏳ Pending | |
| ClickDelegateContainer | ⏳ Pending | |
| DebugMenu | ⏳ Pending | |
| FormatNumber | ⏳ Pending | |
| ModalPurger | ⏳ Pending | |
| OfflineAlert | ⏳ Pending | |
| Portal | ⏳ Pending | |
