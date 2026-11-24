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
          { key: "theming" },
          { key: "dark_mode" },
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
        children: [
          { key: "button" },
          { key: "button_group" },
          { key: "close_button" },
          { key: "back_button" },
          { key: "color_mode" },
          { key: "clipboard" },
        ],
      },
      {
        key: "cat_typography",
        children: [
          { key: "typography" },
          { key: "heading" },
          { key: "badge" },
          { key: "count_badge" },
          { key: "kbd" },
          { key: "list" },
          { key: "url" },
          { key: "rich_text_editor" },
        ],
      },
      {
        key: "cat_inputs",
        children: [
          { key: "input" },
          { key: "unit_input" },
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
          { key: "focus_search" },
          { key: "textarea" },
          { key: "field" },
          { key: "fieldset" },
          { key: "file_input" },
          { key: "date_input" },
          { key: "date_picker" },
          { key: "time_input" },
          { key: "phone_input" },
          { key: "string_array_input" },
          { key: "version_input" },
        ],
      },
      {
        key: "cat_feedback",
        children: [
          { key: "confirmation_trigger" },
          { key: "alert" },
          { key: "focus_alert" },
          { key: "progress" },
          { key: "skeleton" },
          { key: "loader" },
          { key: "top_bar_loader" },
          { key: "indicator" },
          { key: "toast" },
          { key: "state_display" },
          { key: "feedback_state" },
          { key: "offline_alert" },
          { key: "not_found_page" },
        ],
      },
      {
        key: "cat_data_display",
        children: [
          { key: "data_table" },
          { key: "stat_grid" },
          { key: "timeline" },
          { key: "file_item" },
          { key: "masked_text" },
          { key: "countdown" },
          { key: "chart_tooltip" },
        ],
      },
      {
        key: "cat_disclosure",
        children: [
          { key: "accordion" },
          { key: "tabs" },
          { key: "steps" },
          { key: "collapsible" },
          { key: "carousel" },
        ],
      },
      {
        key: "cat_overlay",
        children: [
          { key: "modal" },
          { key: "dialog" },
          { key: "drawer" },
          { key: "popover" },
          { key: "tooltip" },
          { key: "toggle_tip" },
          { key: "cursor_tooltip" },
          { key: "menu" },
          { key: "action_bar" },
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
          { key: "center" },
          { key: "aspect_ratio" },
          { key: "float" },
          { key: "group" },
          { key: "page_container" },
          { key: "constrained_container" },
          { key: "clickable_container" },
          { key: "scroll_container" },
          { key: "action_header_scroll_container" },
          { key: "masked_container" },
          { key: "splitter" },
        ],
      },
      {
        key: "cat_navigation",
        children: [
          { key: "sidebar" },
          { key: "v_navs" },
          { key: "h_navs" },
          { key: "nav" },
          { key: "snackbar" },
          { key: "breadcrumb" },
          { key: "link" },
        ],
      },
      {
        key: "cat_shell",
        children: [
          { key: "common_app_shell" },
          { key: "gis_app_shell" },
          { key: "app_nav_title" },
          { key: "header_container" },
        ],
      },
      {
        key: "cat_map",
        children: [
          { key: "map" },
          { key: "map_overlay" },
          { key: "map_basemap" },
          { key: "map_controls" },
          { key: "map_layer_management" },
          { key: "map_symbology_panel" },
          { key: "map_feature_info_panel" },
          { key: "map_draw_controls" },
          { key: "map_search" },
          { key: "map_coordinates" },
        ],
      },
      {
        key: "cat_media",
        children: [
          { key: "avatar" },
          { key: "image" },
          { key: "qr_code" },
        ],
      },
      {
        key: "cat_icons",
        children: [
          { key: "app_icon" },
        ],
      },
      {
        key: "cat_decorative",
        children: [
          { key: "emoji" },
          { key: "outline_contour_perspective" },
        ],
      },
      {
        key: "cat_utilities",
        children: [
          { key: "utilities" },
          { key: "format_number" },
          { key: "download_trigger" },
        ],
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
          { key: "use_locale" },
          { key: "use_is_mounted" },
          { key: "use_persisted_state" },
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
