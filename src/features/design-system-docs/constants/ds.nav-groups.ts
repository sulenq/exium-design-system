// src/features/design-system-docs/constants/ds.nav-groups.ts

import type { DsNavKey } from "@/features/design-system-docs/types/ds-docs-navs.type";
import type { NavGroup } from "@/shared/types/nav.type";

export const DS_NAV_GROUPS_LIST: NavGroup<DsNavKey>[] = [
  {
    title: "Getting Started",
    items: [
      {
        key: "overview",
      },
    ],
  },
  {
    title: "Foundation",
    items: [
      {
        key: "cat_design_tokens",
        children: [
          { key: "colors" },
          { key: "dark_mode" },
          { key: "design_tokens" },
          { key: "iconography" },
          { key: "principles" },
          { key: "theming" },
          { key: "typography_foundation" },
        ],
      },
      {
        key: "cat_spatial_layout",
        children: [
          { key: "breakpoints_layout" },
          { key: "elevation_shadows" },
          { key: "radius_borders" },
          { key: "spacing_sizing" },
          { key: "z_index" },
        ],
      },
      {
        key: "cat_standards",
        children: [
          { key: "accessibility" },
          { key: "internationalization" },
          { key: "motion" },
        ],
      },
    ],
  },
  {
    title: "Components",
    items: [
      {
        key: "cat_branding",
        children: [
          { key: "brand_watermark" },
          { key: "logo" },
        ],
      },
      {
        key: "cat_buttons",
        children: [
          { key: "back_button" },
          { key: "button" },
          { key: "button_group" },
          { key: "clipboard" },
          { key: "close_button" },
          { key: "color_mode" },
        ],
      },
      {
        key: "cat_chart",
        children: [
          { key: "area_chart" },
          { key: "bar_chart" },
          { key: "bar_list" },
          { key: "chart_tooltip" },
          { key: "donut_chart" },
          { key: "line_chart" },
          { key: "pie_chart" },
          { key: "radar_chart" },
          { key: "scatter_chart" },
          { key: "sparkline" },
        ],
      },
      {
        key: "cat_data_display",
        children: [
          { key: "countdown" },
          { key: "data_table" },
          { key: "file_item" },
          { key: "masked_text" },
          { key: "stat_grid" },
          { key: "timeline" },
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
        key: "cat_disclosure",
        children: [
          { key: "accordion" },
          { key: "carousel" },
          { key: "collapsible" },
          { key: "steps" },
          { key: "tabs" },
        ],
      },
      {
        key: "cat_feedback",
        children: [
          { key: "alert" },
          { key: "confirmation_trigger" },
          { key: "feedback_state" },
          { key: "focus_alert" },
          { key: "indicator" },
          { key: "loader" },
          { key: "not_found_page" },
          { key: "offline_alert" },
          { key: "progress" },
          { key: "skeleton" },
          { key: "state_display" },
          { key: "toast" },
          { key: "top_bar_loader" },
        ],
      },
      {
        key: "cat_icons",
        children: [
          { key: "app_icon" },
        ],
      },
      {
        key: "cat_inputs",
        children: [
          { key: "checkbox" },
          { key: "date_input" },
          { key: "date_picker" },
          { key: "field" },
          { key: "fieldset" },
          { key: "file_input" },
          { key: "focus_select" },
          { key: "focus_search" },
          { key: "input" },
          { key: "number_input" },
          { key: "password_input" },
          { key: "phone_input" },
          { key: "pin_input" },
          { key: "radio_card" },
          { key: "radio_input" },
          { key: "search_input" },
          { key: "segment_group" },
          { key: "select" },
          { key: "slider" },
          { key: "string_array_input" },
          { key: "switch" },
          { key: "textarea" },
          { key: "time_input" },
          { key: "unit_input" },
          { key: "version_input" },
        ],
      },
      {
        key: "cat_layout",
        children: [
          { key: "action_header_scroll_container" },
          { key: "aspect_ratio" },
          { key: "box" },
          { key: "card" },
          { key: "center" },
          { key: "clickable_container" },
          { key: "constrained_container" },
          { key: "container" },
          { key: "float" },
          { key: "group" },
          { key: "flex_box" },
          { key: "masked_container" },
          { key: "page_container" },
          { key: "scroll_container" },
          { key: "separator" },
          { key: "grid" },
          { key: "splitter" },
        ],
      },
      {
        key: "cat_map",
        children: [
          { key: "map" },
          { key: "map_basemap" },
          { key: "map_controls" },
          { key: "map_coordinates" },
          { key: "map_draw_controls" },
          { key: "map_feature_info_panel" },
          { key: "map_layer_management" },
          { key: "map_overlay" },
          { key: "map_search" },
          { key: "map_symbology_panel" },
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
        key: "cat_navigation",
        children: [
          { key: "breadcrumb" },
          { key: "h_navs" },
          { key: "link" },
          { key: "nav" },
          { key: "sidebar" },
          { key: "snackbar" },
          { key: "v_navs" },
        ],
      },
      {
        key: "cat_overlay",
        children: [
          { key: "action_bar" },
          { key: "cursor_tooltip" },
          { key: "dialog" },
          { key: "drawer" },
          { key: "menu" },
          { key: "modal" },
          { key: "popover" },
          { key: "toggle_tip" },
          { key: "tooltip" },
        ],
      },
      {
        key: "cat_shell",
        children: [
          { key: "app_nav_title" },
          { key: "common_app_shell" },
          { key: "gis_app_shell" },
          { key: "header_container" },
        ],
      },
      {
        key: "cat_typography",
        children: [
          { key: "badge" },
          { key: "count_badge" },
          { key: "heading" },
          { key: "kbd" },
          { key: "list" },
          { key: "typography" },
          { key: "rich_text_editor" },
          { key: "url" },
        ],
      },
      {
        key: "cat_utilities",
        children: [
          { key: "utilities" },
          { key: "download_trigger" },
          { key: "format_number" },
        ],
      },
    ],
  },
  {
    title: "Hooks",
    items: [
      {
        key: "cat_viewport_dom_hooks",
        children: [
          { key: "use_click_outside" },
          { key: "use_is_small_viewport" },
          { key: "use_merged_refs" },
          { key: "use_ref_dimension" },
          { key: "use_viewport" },
        ],
      },
      {
        key: "cat_inputs_search_hooks",
        children: [
          { key: "use_debounced_value" },
          { key: "use_focus_search" },
          { key: "use_search_input" },
          { key: "use_search_param" },
        ],
      },
      {
        key: "cat_state_disclosure_hooks",
        children: [
          { key: "use_color_mode" },
          { key: "use_disclosure" },
          { key: "use_is_mounted" },
          { key: "use_locale" },
          { key: "use_persisted_state" },
          { key: "use_pop_disclosure" },
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
          { key: "a11y_helpers" },
          { key: "common_zod_schemas" },
          { key: "formatters" },
        ],
      },
    ],
  },
];
