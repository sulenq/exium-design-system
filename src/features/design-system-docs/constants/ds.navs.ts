// src/features/design-system-docs/constants/ds.navs.ts

import type { NavItem } from "@/shared/types/nav.type";
import {
  ArrowsOutIcon,
  ArrowSquareOutIcon,
  ArticleIcon,
  BellIcon,
  CalendarDotsIcon,
  CaretDownIcon,
  ChartBarIcon,
  ChatTextIcon,
  CheckSquareIcon,
  ClockIcon,
  CodeIcon,
  CompassIcon,
  CopyIcon,
  CubeIcon,
  CursorClickIcon,
  DownloadSimpleIcon,
  EyeClosedIcon,
  FileArrowUpIcon,
  FileIcon,
  FileTextIcon,
  FlameIcon,
  FunnelIcon,
  GitCommitIcon,
  HashIcon,
  ImageIcon,
  InfoIcon,
  KeyIcon,
  ListIcon,
  LockIcon,
  MagnifyingGlassIcon,
  NavigationArrowIcon,
  PhoneIcon,
  QrCodeIcon,
  QuestionIcon,
  RadioIcon,
  SlidersHorizontalIcon,
  SmileyIcon,
  SparkleIcon,
  SquaresFourIcon,
  StackIcon,
  SwatchesIcon,
  TextAlignLeftIcon,
  TextboxIcon,
  TextHIcon,
  TextTIcon,
  ToggleLeftIcon,
  ToggleRightIcon,
  UserIcon,
  WarningCircleIcon,
  WarningIcon,
  WrenchIcon,
  LinkIcon,
  XCircleIcon,
  CrosshairIcon,
  FrameCornersIcon,
  PushPinIcon,
  HandPointingIcon,
  ArrowsInIcon,
  BrowserIcon,
  ScrollIcon,
  RowsIcon,
  ColumnsIcon,
  SpinnerIcon,
  CircleIcon,
  ListChecksIcon,
  WifiSlashIcon,
  ArrowLeftIcon,
  MoonIcon,
  ListPlusIcon,
  DotsThreeIcon,
  AppWindowIcon,
  LayoutIcon,
  ListBulletsIcon,
  ChartLineIcon,
  MapTrifoldIcon,
  PolygonIcon,
  GpsIcon,
  SelectionIcon,
  ShapesIcon,
  SidebarSimpleIcon,
  GridFourIcon,
  CursorTextIcon,
  ScanIcon,
  CameraIcon,
  CurrencyCircleDollarIcon,
  PrinterIcon,
  TreeStructureIcon,
} from "@phosphor-icons/react";

export const DS_NAVS_MAP = {
  overview: {
    icon: InfoIcon,
    title: "Overview & Specs",
  },

  // Categories (Parent Nodes)
  cat_branding: {
    icon: SparkleIcon,
    title: "Branding",
  },
  cat_buttons: {
    icon: CursorClickIcon,
    title: "Buttons",
  },
  cat_chart: {
    icon: ChartBarIcon,
    title: "Chart",
  },
  cat_typography: {
    icon: TextTIcon,
    title: "Typography",
  },
  cat_inputs: {
    icon: TextboxIcon,
    title: "Inputs",
  },
  cat_feedback: {
    icon: SlidersHorizontalIcon,
    title: "Feedback",
  },
  cat_data_display: {
    icon: SquaresFourIcon,
    title: "Data Display",
  },
  cat_disclosure: {
    icon: StackIcon,
    title: "Disclosure",
  },
  cat_overlay: {
    icon: ArrowsOutIcon,
    title: "Overlay",
  },
  cat_layout: {
    icon: CubeIcon,
    title: "Layout",
  },
  cat_navigation: {
    icon: NavigationArrowIcon,
    title: "Navigation",
  },
  cat_media: {
    icon: ImageIcon,
    title: "Media",
  },
  cat_shell: {
    icon: SidebarSimpleIcon,
    title: "Shell",
  },
  cat_map: {
    icon: MapTrifoldIcon,
    title: "Map",
  },
  cat_icons: {
    icon: ShapesIcon,
    title: "Icons",
  },
  cat_decorative: {
    icon: SparkleIcon,
    title: "Decorative",
  },
  cat_utilities: {
    icon: WrenchIcon,
    title: "Utilities",
  },

  // Components - Branding
  logo: {
    icon: SparkleIcon,
    title: "Logo",
  },
  brand_watermark: {
    icon: FlameIcon,
    title: "Brand Watermark",
  },

  // Components - Buttons & Actions
  button: {
    icon: CursorClickIcon,
    title: "Button",
  },
  button_group: {
    icon: StackIcon,
    title: "Button Group",
  },

  // Components - Typography & Display
  typography: {
    icon: TextTIcon,
    title: "P",
  },
  heading: {
    icon: TextHIcon,
    title: "Heading",
  },
  badge: {
    icon: FileTextIcon,
    title: "Badge",
  },
  count_badge: {
    icon: HashIcon,
    title: "Count Badge",
  },
  kbd: {
    icon: CodeIcon,
    title: "Kbd",
  },
  rich_text_editor: {
    icon: ArticleIcon,
    title: "Rich Text Editor",
  },

  // Components - Form Inputs
  input: {
    icon: TextboxIcon,
    title: "Input",
  },
  unit_input: {
    icon: HashIcon,
    title: "Unit Input",
  },
  number_input: {
    icon: HashIcon,
    title: "Number Input",
  },
  password_input: {
    icon: LockIcon,
    title: "Password Input",
  },
  select: {
    icon: CaretDownIcon,
    title: "Select Input",
  },
  focus_select: {
    icon: FunnelIcon,
    title: "Focus Select Input",
  },
  checkbox: {
    icon: CheckSquareIcon,
    title: "Checkbox",
  },
  switch: {
    icon: ToggleRightIcon,
    title: "Switch",
  },
  radio_input: {
    icon: RadioIcon,
    title: "Radio Input",
  },
  radio_card: {
    icon: SquaresFourIcon,
    title: "Radio Card",
  },
  segment_group: {
    icon: ToggleLeftIcon,
    title: "Segment Group",
  },
  slider: {
    icon: SlidersHorizontalIcon,
    title: "Slider",
  },
  pin_input: {
    icon: KeyIcon,
    title: "Pin Input",
  },
  search_input: {
    icon: MagnifyingGlassIcon,
    title: "Search Input",
  },
  textarea: {
    icon: TextAlignLeftIcon,
    title: "Textarea",
  },
  field: {
    icon: FileTextIcon,
    title: "Field",
  },
  file_input: {
    icon: FileArrowUpIcon,
    title: "File Input",
  },
  date_input: {
    icon: CalendarDotsIcon,
    title: "Date Input",
  },
  phone_input: {
    icon: PhoneIcon,
    title: "Phone Input",
  },
  time_input: {
    icon: ClockIcon,
    title: "Time Input",
  },

  // Components - Feedback & Status
  confirmation_trigger: {
    icon: WarningCircleIcon,
    title: "Confirmation Trigger",
  },
  alert: {
    icon: WarningCircleIcon,
    title: "Alert",
  },
  focus_alert: {
    icon: WarningIcon,
    title: "Focus Alert Modal",
  },

  progress: {
    icon: SlidersHorizontalIcon,
    title: "Progress & Circle",
  },
  skeleton: {
    icon: CubeIcon,
    title: "Skeleton Loader",
  },
  toast: {
    icon: BellIcon,
    title: "Toast Notification",
  },
  state_display: {
    icon: QuestionIcon,
    title: "State Feedback (No Data)",
  },
  emoji: {
    icon: SmileyIcon,
    title: "Emoji",
  },

  // Components - Data Display
  data_table: {
    icon: SquaresFourIcon,
    title: "DataView Table",
  },
  stat_grid: {
    icon: ChartBarIcon,
    title: "Stat Grid",
  },
  timeline: {
    icon: GitCommitIcon,
    title: "Timeline",
  },
  file_item: {
    icon: FileIcon,
    title: "File Item",
  },
  masked_text: {
    icon: EyeClosedIcon,
    title: "Masked Text",
  },
  countdown: {
    icon: ClockIcon,
    title: "Countdown",
  },
  date_picker: {
    icon: CalendarDotsIcon,
    title: "DatePicker",
  },
  close_button: {
    icon: XCircleIcon,
    title: "CloseButton",
  },
  toggle_tip: {
    icon: InfoIcon,
    title: "ToggleTip",
  },
  url: {
    icon: LinkIcon,
    title: "Url",
  },
  // QC follow-up pages
  center: {
    icon: CrosshairIcon,
    title: "Center",
  },
  aspect_ratio: {
    icon: FrameCornersIcon,
    title: "AspectRatio",
  },
  float: {
    icon: PushPinIcon,
    title: "Float",
  },
  group: {
    icon: GridFourIcon,
    title: "Group",
  },
  clickable_container: {
    icon: HandPointingIcon,
    title: "ClickableContainer",
  },
  constrained_container: {
    icon: ArrowsInIcon,
    title: "ConstrainedContainer",
  },
  page_container: {
    icon: BrowserIcon,
    title: "PageContainer",
  },
  scroll_container: {
    icon: ScrollIcon,
    title: "ScrollContainer",
  },
  action_header_scroll_container: {
    icon: RowsIcon,
    title: "ActionHeaderScrollContainer",
  },
  masked_container: {
    icon: SelectionIcon,
    title: "MaskedContainer",
  },
  splitter: {
    icon: ColumnsIcon,
    title: "Splitter",
  },
  loader: {
    icon: SpinnerIcon,
    title: "Loader",
  },
  indicator: {
    icon: CircleIcon,
    title: "Indicator",
  },
  top_bar_loader: {
    icon: SpinnerIcon,
    title: "TopBarLoader",
  },
  feedback_state: {
    icon: ListChecksIcon,
    title: "FeedbackState",
  },
  offline_alert: {
    icon: WifiSlashIcon,
    title: "OfflineAlert",
  },
  back_button: {
    icon: ArrowLeftIcon,
    title: "BackButton",
  },
  color_mode: {
    icon: MoonIcon,
    title: "ColorMode",
  },
  download_trigger: {
    icon: DownloadSimpleIcon,
    title: "DownloadTrigger",
  },
  fieldset: {
    icon: TextboxIcon,
    title: "Fieldset",
  },
  string_array_input: {
    icon: ListPlusIcon,
    title: "StringArrayInput",
  },
  version_input: {
    icon: GitCommitIcon,
    title: "VersionInput",
  },
  focus_search: {
    icon: MagnifyingGlassIcon,
    title: "FocusSearch",
  },
  h_navs: {
    icon: DotsThreeIcon,
    title: "HNavs",
  },
  nav: {
    icon: NavigationArrowIcon,
    title: "NavButton",
  },
  common_app_shell: {
    icon: AppWindowIcon,
    title: "CommonAppShell",
  },
  gis_app_shell: {
    icon: MapTrifoldIcon,
    title: "GisAppShell",
  },
  app_nav_title: {
    icon: TextHIcon,
    title: "AppNavTitle",
  },
  header_container: {
    icon: LayoutIcon,
    title: "HeaderContainer",
  },
  list: {
    icon: ListBulletsIcon,
    title: "List",
  },
  area_chart: {
    icon: ChartLineIcon,
    title: "Area Chart",
  },
  bar_chart: {
    icon: ChartBarIcon,
    title: "Bar Chart",
  },
  bar_list: {
    icon: ListBulletsIcon,
    title: "Bar List",
  },
  chart_tooltip: {
    icon: ChartLineIcon,
    title: "ChartTooltip",
  },
  donut_chart: {
    icon: CircleIcon,
    title: "Donut Chart",
  },
  line_chart: {
    icon: ChartLineIcon,
    title: "Line Chart",
  },
  pie_chart: {
    icon: CircleIcon,
    title: "Pie Chart",
  },
  radar_chart: {
    icon: PolygonIcon,
    title: "Radar Chart",
  },
  scatter_chart: {
    icon: DotsThreeIcon,
    title: "Scatter Chart",
  },
  sparkline: {
    icon: ChartLineIcon,
    title: "Sparkline",
  },
  action_bar: {
    icon: SlidersHorizontalIcon,
    title: "ActionBar",
  },
  cursor_tooltip: {
    icon: CursorTextIcon,
    title: "CursorTooltip",
  },
  map: {
    icon: MapTrifoldIcon,
    title: "Map",
  },
  map_basemap: {
    icon: StackIcon,
    title: "MapBasemap",
  },
  map_controls: {
    icon: SlidersHorizontalIcon,
    title: "MapControls",
  },
  map_layer_management: {
    icon: StackIcon,
    title: "MapLayerManagement",
  },
  map_draw_controls: {
    icon: PolygonIcon,
    title: "MapDrawControls",
  },
  map_feature_info_panel: {
    icon: InfoIcon,
    title: "MapFeatureInfoPanel",
  },
  map_search: {
    icon: MagnifyingGlassIcon,
    title: "MapSearch",
  },
  map_symbology_panel: {
    icon: SwatchesIcon,
    title: "MapSymbologyPanel",
  },
  map_coordinates: {
    icon: GpsIcon,
    title: "MapCoordinates",
  },
  map_overlay: {
    icon: LayoutIcon,
    title: "MapOverlay",
  },
  // New primitives
  currency_input: {
    icon: CurrencyCircleDollarIcon,
    title: "CurrencyInput",
  },
  qr_scanner: {
    icon: ScanIcon,
    title: "QrScanner",
  },
  camera_capture: {
    icon: CameraIcon,
    title: "CameraCapture",
  },
  print_layout: {
    icon: PrinterIcon,
    title: "PrintLayout",
  },
  tree_view: {
    icon: TreeStructureIcon,
    title: "TreeView",
  },
  format_number: {
    icon: HashIcon,
    title: "FormatNumber",
  },
  snackbar: {
    icon: SquaresFourIcon,
    title: "Snackbar",
  },
  clipboard: {
    icon: CopyIcon,
    title: "Clipboard",
  },

  // Components - Disclosure
  accordion: {
    icon: StackIcon,
    title: "Accordion",
  },
  tabs: {
    icon: StackIcon,
    title: "Tabs",
  },
  steps: {
    icon: ListIcon,
    title: "Steps",
  },
  collapsible: {
    icon: CaretDownIcon,
    title: "Collapsible",
  },
  breadcrumb: {
    icon: CompassIcon,
    title: "Breadcrumb",
  },
  carousel: {
    icon: ImageIcon,
    title: "Carousel",
  },

  // Components - Overlays & Modals
  modal: {
    icon: ArrowsOutIcon,
    title: "Modal (Adaptive)",
  },
  dialog: {
    icon: ArrowsOutIcon,
    title: "Dialog Modal",
  },
  drawer: {
    icon: SquaresFourIcon,
    title: "Drawer",
  },
  popover: {
    icon: ChatTextIcon,
    title: "Popover",
  },
  tooltip: {
    icon: InfoIcon,
    title: "Tooltip",
  },
  menu: {
    icon: ListIcon,
    title: "Menu",
  },

  // Components - Layout & Structure
  box: {
    icon: CubeIcon,
    title: "Box",
  },
  flex_box: {
    icon: SquaresFourIcon,
    title: "HStack / VStack",
  },
  grid: {
    icon: SquaresFourIcon,
    title: "Simple Grid",
  },
  card: {
    icon: CubeIcon,
    title: "Card",
  },
  container: {
    icon: CubeIcon,
    title: "Container",
  },
  separator: {
    icon: CodeIcon,
    title: "Separator",
  },

  // Components - Navigation & Shell
  sidebar: {
    icon: SquaresFourIcon,
    title: "Sidebar",
  },
  v_navs: {
    icon: ListIcon,
    title: "VNavs",
  },
  link: {
    icon: ArrowSquareOutIcon,
    title: "Link",
  },

  // Components - Media & Icons
  avatar: {
    icon: UserIcon,
    title: "Avatar",
  },
  image: {
    icon: ImageIcon,
    title: "Image",
  },
  qr_code: {
    icon: QrCodeIcon,
    title: "QR Code",
  },
  app_icon: {
    icon: SparkleIcon,
    title: "App Icon",
  },

  // Components - Utilities
  utilities: {
    icon: DownloadSimpleIcon,
    title: "Download",
  },

  // Foundation Categories
  cat_design_tokens: {
    icon: SwatchesIcon,
    title: "Design Tokens",
  },
  cat_spatial_layout: {
    icon: SquaresFourIcon,
    title: "Spatial",
  },
  cat_standards: {
    icon: CompassIcon,
    title: "Standards",
  },

  // Foundation - Items
  principles: {
    title: "Principles",
  },
  design_tokens: {
    title: "Design Tokens",
  },
  colors: {
    title: "Colors",
  },
  typography_foundation: {
    title: "Typography",
  },
  theming: {
    title: "Theme",
  },
  dark_mode: {
    title: "Dark Mode",
  },
  iconography: {
    title: "Iconography",
  },
  spacing_sizing: {
    title: "Spacing & Sizing",
  },
  radius_borders: {
    title: "Radius & Borders",
  },
  elevation_shadows: {
    title: "Elevation & Shadows",
  },
  z_index: {
    title: "Z-index",
  },
  breakpoints_layout: {
    title: "Breakpoints & Layout",
  },
  motion: {
    title: "Motion",
  },
  accessibility: {
    title: "Accessibility",
  },
  internationalization: {
    title: "Internationalization",
  },

  // Hooks Categories
  cat_state_disclosure_hooks: {
    icon: CodeIcon,
    title: "State",
  },
  cat_viewport_dom_hooks: {
    icon: SquaresFourIcon,
    title: "DOM",
  },
  cat_inputs_search_hooks: {
    icon: TextboxIcon,
    title: "Search",
  },

  // Hooks - Items
  use_disclosure: {
    title: "useDisclosure",
  },
  use_pop_disclosure: {
    title: "usePopDisclosure",
  },
  use_color_mode: {
    title: "useColorMode",
  },
  use_is_small_viewport: {
    title: "useIsSmallViewport",
  },
  use_viewport: {
    title: "useViewport",
  },
  use_debounced_value: {
    title: "useDebouncedValue",
  },
  use_click_outside: {
    title: "useClickOutside",
  },
  use_is_mounted: {
    title: "useIsMounted",
  },
  use_focus_search: {
    title: "useFocusSearch",
  },
  use_merged_refs: {
    title: "useMergedRefs",
  },
  use_ref_dimension: {
    title: "useRefDimension",
  },
  use_search_param: {
    title: "useSearchParam",
  },
  use_search_input: {
    title: "useSearchInput",
  },
  use_persisted_state: {
    title: "usePersistedState",
  },
  use_locale: {
    title: "useLocale",
  },

  // Utils Categories
  cat_core_utils: {
    icon: WrenchIcon,
    title: "Core",
  },

  // Utils - Items
  formatters: {
    title: "Formatters",
  },
  a11y_helpers: {
    title: "A11y Helpers",
  },
  common_zod_schemas: {
    title: "Common Zod Schemas",
  },
} as const satisfies Record<string, NavItem>;
