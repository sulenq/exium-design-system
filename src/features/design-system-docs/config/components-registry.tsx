// src/features/design-system-docs/config/components-registry.tsx

import { ACTIONS_DOCS } from "@/features/design-system-docs/config/registry/actions.registry";
import { CHART_DOCS } from "@/features/design-system-docs/config/registry/chart.registry";
import { CORE_DOCS } from "@/features/design-system-docs/config/registry/core.registry";
import { DISPLAY_DOCS } from "@/features/design-system-docs/config/registry/display.registry";
import { FEEDBACK_DOCS } from "@/features/design-system-docs/config/registry/feedback.registry";
import { INPUTS_DOCS } from "@/features/design-system-docs/config/registry/inputs.registry";
import { LAYOUT_DOCS } from "@/features/design-system-docs/config/registry/layout.registry";
import { MAP_DOCS } from "@/features/design-system-docs/config/registry/map.registry";
import { NAVIGATION_DOCS } from "@/features/design-system-docs/config/registry/navigation.registry";
import type { ComponentDocSpec } from "@/features/design-system-docs/types/ds-docs-spec.type";

export const COMPONENTS_REGISTRY: Record<string, ComponentDocSpec> = {
  ...CORE_DOCS,
  ...LAYOUT_DOCS,
  ...FEEDBACK_DOCS,
  ...ACTIONS_DOCS,
  ...INPUTS_DOCS,
  ...NAVIGATION_DOCS,
  ...CHART_DOCS,
  ...DISPLAY_DOCS,
  ...MAP_DOCS,
};
