// src/features/design-system-docs/components/design-system-docs.page.tsx

import { IconButton } from "@/design-system/components/button/button/button";
import { ColorModeToggleButton } from "@/design-system/components/button/color-mode/color-mode";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { VScrollContainer } from "@/design-system/components/layout/scroll-container/scroll-container";
import { usePopModal } from "@/design-system/components/overlay/hooks/use-pop-modal";
import { Drawer } from "@/design-system/components/overlay/drawer/drawer";
import { P } from "@/design-system/components/typography/p/p";
import { useIsSmallViewport } from "@/design-system/hooks/use-is-small-viewport";
import { ComponentPlayground } from "@/features/design-system-docs/components/component-playground";
import { DemoPage } from "@/features/design-system-docs/components/demo/demo.page";
import { DsDocsSidebar } from "@/features/design-system-docs/components/ds-docs-sidebar";
import { FoundationDocs } from "@/features/design-system-docs/components/foundation/foundation-docs";
import { HookDocs } from "@/features/design-system-docs/components/foundation/hook-docs";
import { UtilDocs } from "@/features/design-system-docs/components/foundation/util-docs";
import { COMPONENTS_REGISTRY } from "@/features/design-system-docs/config/components-registry";
import type { DsNavKey } from "@/features/design-system-docs/types/ds-docs-navs.type";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { MenuIcon } from "lucide-react";
import { useCallback } from "react";

export const DesignSystemDocsPage = () => {
  // Hooks
  const isSmallViewport = useIsSmallViewport();
  const search = useSearch({ from: "/design-system/ui" });
  const navigate = useNavigate({ from: "/design-system/ui" });
  const mobileDrawer = usePopModal({ modalKey: "ds-docs-mobile-nav" });

  // Derived Values
  const activeNavKey: DsNavKey = (search.component as DsNavKey) || "overview";
  const currentSpec = COMPONENTS_REGISTRY[activeNavKey];

  const isFoundation = [
    "principles",
    "design_tokens",
    "colors",
    "typography_foundation",
    "spacing_sizing",
    "radius_borders",
    "elevation_shadows",
    "z_index",
    "breakpoints_layout",
    "iconography",
    "motion",
    "theming_dark_mode",
    "accessibility",
    "internationalization",
  ].includes(activeNavKey);

  const isHook = activeNavKey.startsWith("use_");
  const isUtil = ["formatters", "a11y_helpers", "common_zod_schemas"].includes(activeNavKey);

  // Callbacks
  const handleSelectNav = useCallback(
    (key: DsNavKey) => {
      // Ignore category container clicks so they only expand/collapse
      if (key.startsWith("cat_")) {
        return;
      }

      // If already active, dismiss mobile drawer if open, otherwise do nothing
      if (key === activeNavKey) {
        if (isSmallViewport && mobileDrawer.isOpen) {
          mobileDrawer.close();
        }
        return;
      }

      navigate({
        search: (prev) => {
          const nextSearch = { ...prev };
          if (key === "overview") {
            delete nextSearch.component;
          } else {
            nextSearch.component = key;
          }
          if (isSmallViewport && mobileDrawer.isOpen) {
            delete nextSearch.overlay;
            delete nextSearch.activeModalKey;
          }
          return nextSearch;
        },
      });
    },
    [activeNavKey, isSmallViewport, mobileDrawer, navigate],
  );

  return (
    <HStack
      pos={"fixed"}
      inset={0}
      w={"full"}
      h={"full"}
      gap={0}
      // bg={"bg.canvas"}
      align={"stretch"}
      overflow={"hidden"}
    >
      {!isSmallViewport && (
        <DsDocsSidebar
          activeNavKey={activeNavKey}
          onSelectNav={handleSelectNav}
        />
      )}

      {isSmallViewport && (
        <Drawer.Root
          modalKey={"ds-docs-mobile-nav"}
          placement={"start"}
          size={"full"}
          opened={mobileDrawer.isOpen}
          open={mobileDrawer.open}
          close={mobileDrawer.close}
        >
          <Drawer.Content p={0}>
            <DsDocsSidebar
              isMobileDrawer
              activeNavKey={activeNavKey}
              onSelectNav={handleSelectNav}
            />
          </Drawer.Content>
        </Drawer.Root>
      )}

      {/* Main Content Area */}
      <VStack
        flex={1}
        h={"full"}
        minW={0}
        minH={0}
        overflow={"hidden"}
        align={"stretch"}
        gap={0}
      >
        {/* Header Bar */}
        <HStack
          flexShrink={0}
          align={"center"}
          justify={"space-between"}
          h={"60px"}
          px={"md"}
        >
          <HStack align={"center"} gap={"sm"}>
            {isSmallViewport && (
              <IconButton
                size={"sm"}
                variant={"ghost"}
                aria-label={"Open Navigation Menu"}
                onClick={() => mobileDrawer.open()}
              >
                <AppIcon icon={MenuIcon} size={"sm"} />
              </IconButton>
            )}

            <P fontWeight={"semibold"}>Exium Design System Documentation</P>
          </HStack>

          <HStack align={"center"} gap={"sm"}>
            <ColorModeToggleButton />
          </HStack>
        </HStack>

        {/* Content Body Scroll Area */}
        <VScrollContainer flex={1} minW={0} minH={0} p={4}>
          {activeNavKey === "overview" && <DemoPage />}
          {isFoundation && <FoundationDocs navKey={activeNavKey} />}
          {isHook && <HookDocs navKey={activeNavKey} />}
          {isUtil && <UtilDocs navKey={activeNavKey} />}
          {!isFoundation && !isHook && !isUtil && activeNavKey !== "overview" && currentSpec && (
            <ComponentPlayground key={currentSpec.key} spec={currentSpec} />
          )}
          {!isFoundation && !isHook && !isUtil && activeNavKey !== "overview" && !currentSpec && (
            <DemoPage />
          )}
        </VScrollContainer>
      </VStack>
    </HStack>
  );
};
