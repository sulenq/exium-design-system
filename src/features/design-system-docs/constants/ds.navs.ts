// src/features/design-system-docs/constants/ds.navs.ts

import type { NavItem } from "@/shared/types/nav.type";
import {
  AlertCircle,
  Bell,
  Box,
  CheckSquare,
  ChevronDown,
  CircleAlert,
  Clock,
  Code2,
  Compass,
  Copy,
  DownloadIcon,
  ExternalLink,
  FileText,
  Filter,
  Flame,
  FormInput,
  Hash,
  Heading as HeadingIcon,
  HelpCircle,
  Image as ImageIcon,
  Info,
  KeyRound,
  Layers,
  Layout,
  LayoutGrid,
  List,
  LockIcon,
  Maximize2,
  Menu,
  MessageSquare,
  MousePointerClick,
  Navigation,
  Radio,
  SearchIcon,
  Sliders,
  Smile,
  Sparkles,
  SquareDashedText,
  ToggleLeft,
  ToggleRightIcon,
  TriangleAlertIcon,
  Type,
  User,
  Wrench,
} from "lucide-react";

export const DS_NAVS_MAP = {
  overview: {
    icon: Info,
    title: "Overview & Specs",
  },

  // Categories (Parent Nodes)
  cat_branding: {
    icon: Sparkles,
    title: "Branding",
  },
  cat_buttons: {
    icon: MousePointerClick,
    title: "Buttons & Actions",
  },
  cat_typography: {
    icon: Type,
    title: "Typography & Display",
  },
  cat_inputs: {
    icon: FormInput,
    title: "Form Inputs",
  },
  cat_feedback: {
    icon: Sliders,
    title: "Feedback & Status",
  },
  cat_focus_alert: {
    icon: AlertCircle,
    title: "Focus Alert",
  },
  cat_data_display: {
    icon: LayoutGrid,
    title: "Data Display",
  },
  cat_disclosure: {
    icon: Layers,
    title: "Disclosure & Navigation",
  },
  cat_overlay: {
    icon: Maximize2,
    title: "Overlays & Modals",
  },
  cat_layout: {
    icon: Box,
    title: "Layout & Structure",
  },
  cat_navigation: {
    icon: Navigation,
    title: "Navigation & Shell",
  },
  cat_media: {
    icon: ImageIcon,
    title: "Media & Icons",
  },
  cat_utilities: {
    icon: Wrench,
    title: "Utilities & System",
  },

  // Components - Branding
  logo: {
    icon: Sparkles,
    title: "Logo",
  },
  brand_watermark: {
    icon: Flame,
    title: "Brand Watermark",
  },

  // Components - Buttons & Actions
  button: {
    icon: MousePointerClick,
    title: "Button",
  },
  button_group: {
    icon: Layers,
    title: "Button Group",
  },

  // Components - Typography & Display
  typography: {
    icon: Type,
    title: "P & Typography",
  },
  heading: {
    icon: HeadingIcon,
    title: "Heading",
  },
  badge: {
    icon: FileText,
    title: "Badge",
  },
  count_badge: {
    icon: Hash,
    title: "Count Badge",
  },
  kbd: {
    icon: Code2,
    title: "Kbd",
  },

  // Components - Form Inputs
  input: {
    icon: FormInput,
    title: "Input",
  },
  duration_input: {
    icon: Clock,
    title: "Duration Input",
  },
  number_input: {
    icon: Hash,
    title: "Number Input",
  },
  password_input: {
    icon: LockIcon,
    title: "Password Input",
  },
  select: {
    icon: ChevronDown,
    title: "Select Input",
  },
  focus_select: {
    icon: Filter,
    title: "Focus Select Input",
  },
  checkbox: {
    icon: CheckSquare,
    title: "Checkbox",
  },
  switch: {
    icon: ToggleRightIcon,
    title: "Switch",
  },
  radio_input: {
    icon: Radio,
    title: "Radio Input",
  },
  radio_card: {
    icon: LayoutGrid,
    title: "Radio Card",
  },
  segment_group: {
    icon: ToggleLeft,
    title: "Segment Group",
  },
  slider: {
    icon: Sliders,
    title: "Slider",
  },
  pin_input: {
    icon: KeyRound,
    title: "Pin Input",
  },
  search_input: {
    icon: SearchIcon,
    title: "Search Input",
  },
  textarea: {
    icon: SquareDashedText,
    title: "Textarea",
  },
  field: {
    icon: FileText,
    title: "Field & Fieldset",
  },

  // Components - Feedback & Status
  alert: {
    icon: CircleAlert,
    title: "Alert",
  },
  focus_alert: {
    icon: TriangleAlertIcon,
    title: "Focus Alert Modal",
  },

  progress: {
    icon: Sliders,
    title: "Progress & Circle",
  },
  skeleton: {
    icon: Box,
    title: "Skeleton Loader",
  },
  toast: {
    icon: Bell,
    title: "Toast Notification",
  },
  state_display: {
    icon: HelpCircle,
    title: "State Feedback (No Data)",
  },
  emoji: {
    icon: Smile,
    title: "Emoji",
  },

  // Components - Data Display
  data_table: {
    icon: LayoutGrid,
    title: "DataView Table",
  },
  clipboard: {
    icon: Copy,
    title: "Clipboard",
  },
  countdown: {
    icon: Clock,
    title: "Countdown",
  },

  // Components - Disclosure
  accordion: {
    icon: Layers,
    title: "Accordion",
  },
  tabs: {
    icon: Layers,
    title: "Tabs",
  },
  steps: {
    icon: List,
    title: "Steps",
  },
  collapsible: {
    icon: ChevronDown,
    title: "Collapsible",
  },
  breadcrumb: {
    icon: Compass,
    title: "Breadcrumb",
  },
  carousel: {
    icon: ImageIcon,
    title: "Carousel",
  },

  // Components - Overlays & Modals
  dialog: {
    icon: Maximize2,
    title: "Dialog Modal",
  },
  drawer: {
    icon: Layout,
    title: "Drawer",
  },
  popover: {
    icon: MessageSquare,
    title: "Popover",
  },
  tooltip: {
    icon: Info,
    title: "Tooltip",
  },
  menu: {
    icon: Menu,
    title: "Menu",
  },

  // Components - Layout & Structure
  box: {
    icon: Box,
    title: "Box",
  },
  flex_box: {
    icon: Layout,
    title: "HStack / VStack",
  },
  grid: {
    icon: LayoutGrid,
    title: "Simple Grid",
  },
  card: {
    icon: Box,
    title: "Card",
  },
  container: {
    icon: Box,
    title: "Container",
  },
  separator: {
    icon: Code2,
    title: "Separator",
  },

  // Components - Navigation & Shell
  sidebar: {
    icon: Layout,
    title: "Sidebar",
  },
  link: {
    icon: ExternalLink,
    title: "Link",
  },

  // Components - Media & Icons
  avatar: {
    icon: User,
    title: "Avatar",
  },
  image: {
    icon: ImageIcon,
    title: "Image",
  },
  app_icon: {
    icon: Sparkles,
    title: "App Icon",
  },

  // Components - Utilities
  utilities: {
    icon: DownloadIcon,
    title: "Download",
  },

  // Foundation
  principles: {
    icon: Sparkles,
    title: "Principles",
  },
  design_tokens: {
    icon: Code2,
    title: "Design Tokens",
  },
  colors: {
    icon: Sliders,
    title: "Colors",
  },
  typography_foundation: {
    icon: Type,
    title: "Typography",
  },
  spacing_sizing: {
    icon: Layout,
    title: "Spacing & Sizing",
  },
  radius_borders: {
    icon: Box,
    title: "Radius & Borders",
  },
  elevation_shadows: {
    icon: Layers,
    title: "Elevation & Shadows",
  },
  z_index: {
    icon: Layers,
    title: "Z-index",
  },
  breakpoints_layout: {
    icon: LayoutGrid,
    title: "Breakpoints & Layout",
  },
  iconography: {
    icon: Sparkles,
    title: "Iconography",
  },
  motion: {
    icon: Clock,
    title: "Motion",
  },
  theming_dark_mode: {
    icon: ToggleRightIcon,
    title: "Theming & Dark Mode",
  },
  accessibility: {
    icon: HelpCircle,
    title: "Accessibility",
  },
  internationalization: {
    icon: Compass,
    title: "Internationalization",
  },

  // Hooks
  use_disclosure: {
    icon: Code2,
    title: "useDisclosure",
  },
  use_media_query: {
    icon: Code2,
    title: "useMediaQuery",
  },
  use_viewport_mode: {
    icon: Code2,
    title: "useViewportMode",
  },
  use_url_overlay: {
    icon: Code2,
    title: "useUrlOverlay",
  },
  use_master_detail_nav: {
    icon: Code2,
    title: "useMasterDetailNav",
  },
  use_controllable_state: {
    icon: Code2,
    title: "useControllableState",
  },
  use_debounce: {
    icon: Code2,
    title: "useDebounce",
  },
  use_copy_to_clipboard: {
    icon: Code2,
    title: "useCopyToClipboard",
  },
  use_is_mounted: {
    icon: Code2,
    title: "useIsMounted",
  },
  use_event_listener: {
    icon: Code2,
    title: "useEventListener",
  },
  use_hotkeys: {
    icon: Code2,
    title: "useHotkeys",
  },

  // Utils
  formatters: {
    icon: Wrench,
    title: "Formatters",
  },
  a11y_helpers: {
    icon: Wrench,
    title: "A11y Helpers",
  },
  common_zod_schemas: {
    icon: Wrench,
    title: "Common Zod Schemas",
  },
} as const satisfies Record<string, NavItem>;
