// src/features/design-system-docs/constants/ds.nav-groups.ts

import type { DsNavKey } from "@/features/design-system-docs/types/ds-docs-navs.type";
import type { NavGroup } from "@/shared/types/nav.type";

export const DS_NAV_GROUPS_LIST: NavGroup<DsNavKey>[] = [
  {
    title: "Getting Started",
    items: [{ key: "overview" }],
  },
  {
    title: "Foundation",
    items: [
      {
        key: "cat_design_tokens",
        children: [
          { key: "principles" },
          { key: "design_tokens" },
          { key: "theming_dark_mode" },
          { key: "colors" },
          { key: "typography_foundation" },
          { key: "iconography" },
        ],
      },
      {
        key: "cat_spatial_layout",
        children: [
          { key: "spacing_sizing" },
          { key: "radius_borders" },
          { key: "elevation_shadows" },
          { key: "z_index" },
          { key: "breakpoints_layout" },
        ],
      },
      {
        key: "cat_standards",
        children: [
          { key: "motion" },
          { key: "accessibility" },
          { key: "internationalization" },
        ],
      },
    ],
  },
  {
    title: "Components",
    items: [
      {
        key: "cat_branding",
        children: [{ key: "logo" }, { key: "brand_watermark" }],
      },
      {
        key: "cat_buttons",
        children: [{ key: "button" }, { key: "button_group" }],
      },
      {
        key: "cat_typography",
        children: [
          { key: "typography" },
          { key: "heading" },
          { key: "badge" },
          { key: "count_badge" },
          { key: "kbd" },
        ],
      },
      {
        key: "cat_inputs",
        children: [
          { key: "input" },
          { key: "duration_input" },
          { key: "number_input" },
          { key: "password_input" },
          { key: "select" },
          { key: "focus_select" },
          { key: "checkbox" },
          { key: "switch" },
          { key: "radio_input" },
          { key: "radio_card" },
          { key: "segment_group" },
          { key: "slider" },
          { key: "pin_input" },
          { key: "search_input" },
          { key: "textarea" },
          { key: "field" },
        ],
      },
      {
        key: "cat_feedback",
        children: [
          { key: "alert" },
          { key: "focus_alert" },
          { key: "progress" },
          { key: "skeleton" },
          { key: "toast" },
          { key: "state_display" },
          { key: "emoji" },
        ],
      },
      {
        key: "cat_data_display",
        children: [
          { key: "data_table" },
          { key: "clipboard" },
          { key: "countdown" },
        ],
      },
      {
        key: "cat_disclosure",
        children: [
          { key: "accordion" },
          { key: "tabs" },
          { key: "steps" },
          { key: "collapsible" },
          { key: "breadcrumb" },
          { key: "carousel" },
        ],
      },
      {
        key: "cat_overlay",
        children: [
          { key: "dialog" },
          { key: "drawer" },
          { key: "popover" },
          { key: "tooltip" },
          { key: "menu" },
        ],
      },
      {
        key: "cat_layout",
        children: [
          { key: "box" },
          { key: "flex_box" },
          { key: "grid" },
          { key: "card" },
          { key: "container" },
          { key: "separator" },
        ],
      },
      {
        key: "cat_navigation",
        children: [{ key: "sidebar" }, { key: "link" }],
      },
      {
        key: "cat_media",
        children: [{ key: "avatar" }, { key: "image" }, { key: "app_icon" }],
      },
      {
        key: "cat_utilities",
        children: [{ key: "utilities" }],
      },
    ],
  },
  {
    title: "Hooks",
    items: [
      {
        key: "cat_state_disclosure_hooks",
        children: [
          { key: "use_disclosure" },
          { key: "use_pop_disclosure" },
          { key: "use_color_mode" },
          { key: "use_is_mounted" },
        ],
      },
      {
        key: "cat_viewport_dom_hooks",
        children: [
          { key: "use_is_small_viewport" },
          { key: "use_viewport" },
          { key: "use_ref_dimension" },
          { key: "use_click_outside" },
          { key: "use_merged_refs" },
        ],
      },
      {
        key: "cat_inputs_search_hooks",
        children: [
          { key: "use_debounced_value" },
          { key: "use_focus_search" },
          { key: "use_search_param" },
          { key: "use_search_input" },
        ],
      },
    ],
  },
  {
    title: "Utils",
    items: [
      {
        key: "cat_core_utils",
        children: [
          { key: "formatters" },
          { key: "a11y_helpers" },
          { key: "common_zod_schemas" },
        ],
      },
    ],
  },
];
