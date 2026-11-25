// src/features/design-system-docs/config/components-registry.tsx

import { ACTIONS_DOCS } from "@/features/design-system-docs/config/registry/actions.registry";
import { CHART_DOCS } from "@/features/design-system-docs/config/registry/chart.registry";
import { DISPLAY_DOCS } from "@/features/design-system-docs/config/registry/display.registry";
import { FEEDBACK_DOCS } from "@/features/design-system-docs/config/registry/feedback.registry";
import { INPUTS_DOCS } from "@/features/design-system-docs/config/registry/inputs.registry";
import { LAYOUT_DOCS } from "@/features/design-system-docs/config/registry/layout.registry";
import { MAP_DOCS } from "@/features/design-system-docs/config/registry/map.registry";
import { NAVIGATION_DOCS } from "@/features/design-system-docs/config/registry/navigation.registry";
import { BRANDING_DOCS } from "@/features/design-system-docs/config/registry/branding.registry";
import { BUTTONS_DOCS } from "@/features/design-system-docs/config/registry/buttons.registry";
import { DATA_DISPLAY_DOCS } from "@/features/design-system-docs/config/registry/data-display.registry";
import { DECORATIVE_DOCS } from "@/features/design-system-docs/config/registry/decorative.registry";
import { DISCLOSURE_DOCS } from "@/features/design-system-docs/config/registry/disclosure.registry";
import { FEEDBACK_CORE_DOCS } from "@/features/design-system-docs/config/registry/feedback-core.registry";
import { ICONS_DOCS } from "@/features/design-system-docs/config/registry/icons.registry";
import { INPUTS_CORE_DOCS } from "@/features/design-system-docs/config/registry/inputs-core.registry";
import { LAYOUT_CORE_DOCS } from "@/features/design-system-docs/config/registry/layout-core.registry";
import { MEDIA_DOCS } from "@/features/design-system-docs/config/registry/media.registry";
import { NAVIGATION_CORE_DOCS } from "@/features/design-system-docs/config/registry/navigation-core.registry";
import { OVERLAY_DOCS } from "@/features/design-system-docs/config/registry/overlay.registry";
import { TYPOGRAPHY_DOCS } from "@/features/design-system-docs/config/registry/typography.registry";
import { UTILITIES_DOCS } from "@/features/design-system-docs/config/registry/utilities.registry";
import type { ComponentDocSpec } from "@/features/design-system-docs/types/ds-docs-spec.type";

export const COMPONENTS_REGISTRY: Record<string, ComponentDocSpec> = {
  ...BRANDING_DOCS,
  ...BUTTONS_DOCS,
  ...TYPOGRAPHY_DOCS,
  ...INPUTS_CORE_DOCS,
  ...FEEDBACK_CORE_DOCS,
  ...DECORATIVE_DOCS,
  ...DATA_DISPLAY_DOCS,
  ...OVERLAY_DOCS,
  ...UTILITIES_DOCS,
  ...NAVIGATION_CORE_DOCS,
  ...DISCLOSURE_DOCS,
  ...LAYOUT_CORE_DOCS,
  ...MEDIA_DOCS,
  ...ICONS_DOCS,
  ...LAYOUT_DOCS,
  ...FEEDBACK_DOCS,
  ...ACTIONS_DOCS,
  ...INPUTS_DOCS,
  ...NAVIGATION_DOCS,
  ...CHART_DOCS,
  ...DISPLAY_DOCS,
  ...MAP_DOCS,
};
