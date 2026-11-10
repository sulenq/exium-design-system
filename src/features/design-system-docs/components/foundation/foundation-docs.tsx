// src/features/design-system-docs/components/foundation/foundation-docs.tsx

import { AccessibilityFoundationPage } from "@/features/design-system-docs/components/foundation/pages/accessibility-foundation.page";
import { BreakpointsFoundationPage } from "@/features/design-system-docs/components/foundation/pages/breakpoints-foundation.page";
import { ColorsFoundationPage } from "@/features/design-system-docs/components/foundation/pages/colors-foundation.page";
import { DesignTokensFoundationPage } from "@/features/design-system-docs/components/foundation/pages/design-tokens-foundation.page";
import { ElevationFoundationPage } from "@/features/design-system-docs/components/foundation/pages/elevation-foundation.page";
import { I18nFoundationPage } from "@/features/design-system-docs/components/foundation/pages/i18n-foundation.page";
import { IconographyFoundationPage } from "@/features/design-system-docs/components/foundation/pages/iconography-foundation.page";
import { MotionFoundationPage } from "@/features/design-system-docs/components/foundation/pages/motion-foundation.page";
import { PrinciplesFoundationPage } from "@/features/design-system-docs/components/foundation/pages/principles-foundation.page";
import { RadiusFoundationPage } from "@/features/design-system-docs/components/foundation/pages/radius-foundation.page";
import { SpacingFoundationPage } from "@/features/design-system-docs/components/foundation/pages/spacing-foundation.page";
import { ThemingFoundationPage } from "@/features/design-system-docs/components/foundation/pages/theming-foundation.page";
import { TypographyFoundationPage } from "@/features/design-system-docs/components/foundation/pages/typography-foundation.page";
import { ZIndexFoundationPage } from "@/features/design-system-docs/components/foundation/pages/z-index-foundation.page";
import type { DsNavKey } from "@/features/design-system-docs/types/ds-docs-navs.type";
import type { ComponentType } from "react";

const FOUNDATION_PAGE_REGISTRY: Partial<Record<DsNavKey, ComponentType>> = {
  principles: PrinciplesFoundationPage,
  design_tokens: DesignTokensFoundationPage,
  colors: ColorsFoundationPage,
  typography_foundation: TypographyFoundationPage,
  spacing_sizing: SpacingFoundationPage,
  radius_borders: RadiusFoundationPage,
  elevation_shadows: ElevationFoundationPage,
  z_index: ZIndexFoundationPage,
  breakpoints_layout: BreakpointsFoundationPage,
  iconography: IconographyFoundationPage,
  motion: MotionFoundationPage,
  theming_dark_mode: ThemingFoundationPage,
  accessibility: AccessibilityFoundationPage,
  internationalization: I18nFoundationPage,
};

export const FoundationDocs = ({ navKey }: { navKey: DsNavKey }) => {
  const Component = FOUNDATION_PAGE_REGISTRY[navKey];

  if (!Component) {
    return null;
  }

  return <Component />;
};
