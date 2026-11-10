// src/features/design-system-docs/constants/ds.navs.ts

import type { NavItem } from "@/shared/types/nav.type";
import {
  ArrowsOutIcon,
  ArrowSquareOutIcon,
  BellIcon,
  CaretDownIcon,
  ChatTextIcon,
  CheckSquareIcon,
  ClockIcon,
  CodeIcon,
  CompassIcon,
  CopyIcon,
  CubeIcon,
  CursorClickIcon,
  DownloadSimpleIcon,
  FileTextIcon,
  FlameIcon,
  FunnelIcon,
  HashIcon,
  ImageIcon,
  InfoIcon,
  KeyIcon,
  ListIcon,
  LockIcon,
  MagnifyingGlassIcon,
  NavigationArrowIcon,
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
    title: "Buttons & Actions",
  },
  cat_typography: {
    icon: TextTIcon,
    title: "Typography & Display",
  },
  cat_inputs: {
    icon: TextboxIcon,
    title: "Form Inputs",
  },
  cat_feedback: {
    icon: SlidersHorizontalIcon,
    title: "Feedback & Status",
  },
  cat_focus_alert: {
    icon: WarningCircleIcon,
    title: "Focus Alert",
  },
  cat_data_display: {
    icon: SquaresFourIcon,
    title: "Data Display",
  },
  cat_disclosure: {
    icon: StackIcon,
    title: "Disclosure & Navigation",
  },
  cat_overlay: {
    icon: ArrowsOutIcon,
    title: "Overlays & Modals",
  },
  cat_layout: {
    icon: CubeIcon,
    title: "Layout & Structure",
  },
  cat_navigation: {
    icon: NavigationArrowIcon,
    title: "Navigation & Shell",
  },
  cat_media: {
    icon: ImageIcon,
    title: "Media & Icons",
  },
  cat_utilities: {
    icon: WrenchIcon,
    title: "Utilities & System",
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
    title: "P & Typography",
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

  // Components - Form Inputs
  input: {
    icon: TextboxIcon,
    title: "Input",
  },
  duration_input: {
    icon: ClockIcon,
    title: "Duration Input",
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
    title: "Field & Fieldset",
  },

  // Components - Feedback & Status
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
  clipboard: {
    icon: CopyIcon,
    title: "Clipboard",
  },
  countdown: {
    icon: ClockIcon,
    title: "Countdown",
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
    title: "Design Tokens & Styles",
  },
  cat_spatial_layout: {
    icon: SquaresFourIcon,
    title: "Layout & Spatial",
  },
  cat_standards: {
    icon: CompassIcon,
    title: "Standards & Behavior",
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
  theming_dark_mode: {
    title: "Theming & Dark Mode",
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

  // Hooks
  use_disclosure: {
    icon: CodeIcon,
    title: "useDisclosure",
  },
  use_pop_disclosure: {
    icon: CodeIcon,
    title: "usePopDisclosure",
  },
  use_color_mode: {
    icon: CodeIcon,
    title: "useColorMode",
  },
  use_is_small_viewport: {
    icon: CodeIcon,
    title: "useIsSmallViewport",
  },
  use_viewport: {
    icon: CodeIcon,
    title: "useViewport",
  },
  use_debounced_value: {
    icon: CodeIcon,
    title: "useDebouncedValue",
  },
  use_click_outside: {
    icon: CodeIcon,
    title: "useClickOutside",
  },
  use_is_mounted: {
    icon: CodeIcon,
    title: "useIsMounted",
  },
  use_focus_search: {
    icon: CodeIcon,
    title: "useFocusSearch",
  },
  use_merged_refs: {
    icon: CodeIcon,
    title: "useMergedRefs",
  },
  use_ref_dimension: {
    icon: CodeIcon,
    title: "useRefDimension",
  },
  use_search_param: {
    icon: CodeIcon,
    title: "useSearchParam",
  },
  use_search_input: {
    icon: CodeIcon,
    title: "useSearchInput",
  },

  // Utils
  formatters: {
    icon: WrenchIcon,
    title: "Formatters",
  },
  a11y_helpers: {
    icon: WrenchIcon,
    title: "A11y Helpers",
  },
  common_zod_schemas: {
    icon: WrenchIcon,
    title: "Common Zod Schemas",
  },
} as const satisfies Record<string, NavItem>;
