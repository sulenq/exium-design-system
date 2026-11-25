// src/design-system/components/map/map/map.overlay.tsx

import type { StackProps } from "@/design-system/components/layout/flex-box/flex-box.type";
import { Box } from "@/design-system/components/layout/box/box";
import { HStack } from "@/design-system/components/layout/flex-box/flex-box";
import type { MapOverlayProps } from "@/design-system/components/map/map/map.type";
import { MapAttribution } from "@/design-system/components/map/map/map.basemap-attribution";
import { MapControls } from "@/design-system/components/map/map/map.controls";
import { MapCoordinates } from "@/design-system/components/map/map/map.coordinates";
import { MapFeatureInfoPanel } from "@/design-system/components/map/map/map.feature-info-panel";
import { MapSearch } from "@/design-system/components/map/map/map.search";
import { useIsSmallViewport } from "@/design-system/hooks/use-is-small-viewport";
import { useThemeStore } from "@/design-system/stores/theme-store";

export const MapOverlay = (props: MapOverlayProps) => {
  // Props
  const { layerManagement } = props;

  // Hooks
  const isSmallViewport = useIsSmallViewport();

  return (
    <Box
      position={"absolute"}
      top={0}
      left={0}
      w={"full"}
      h={"full"}
      minW={isSmallViewport ? 0 : "fit-content"}
      overflow={"hidden"}
      pointerEvents={"none"}
    >
      {/* Top Header Bar (Search on Left, Layer Select on Right) */}
      <HStack
        position={"absolute"}
        top={4}
        left={0}
        right={0}
        px={4}
        justify={"space-between"}
        align={"start"}
        gap={4}
        minW={isSmallViewport ? 0 : "480px"}
        pointerEvents={"none"}
      >
        <Box pointerEvents={"none"} flexShrink={0}>
          <MapSearch />
        </Box>

        <HStack align={"center"} gap={2} pointerEvents={"none"} flexShrink={0}>
          {layerManagement}
          <MapAttribution />
        </HStack>
      </HStack>

      {/* Floating: Feature Info Panel (Top-Right under actions) */}
      <Box
        position={"absolute"}
        top={"60px"}
        right={4}
        pointerEvents={"none"}
        zIndex={10}
      >
        <MapFeatureInfoPanel />
      </Box>

      {/* Center Coordinates Indicator */}
      <MapCoordinates />

      {/* Bottom Controls Bar */}
      <Box
        position={"absolute"}
        bottom={0}
        left={0}
        right={0}
        minW={isSmallViewport ? 0 : "480px"}
        pointerEvents={"none"}
      >
        <MapControls px={4} pb={4} />
      </Box>
    </Box>
  );
};

export const MapOverlayContainer = (props: StackProps) => {
  // Stores
  const { theme } = useThemeStore();

  return (
    <HStack
      position={"relative"}
      isolation={"isolate"}
      align={"center"}
      bg={"bg.bodyAlpha"}
      border={"1px solid"}
      borderColor={"an0 !important"}
      backdropFilter={"blur(16px) saturate(180%)"}
      boxShadow={{
        base: "inset 0 1px 0 0 rgba(255, 255, 255, 0.95)",
        _dark: "inset 0 1px 0 0 rgba(255, 255, 255, 0.2)",
      }}
      backgroundImage={{
        base: "linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0) 30%)",
        _dark:
          "linear-gradient(180deg, rgba(255, 255, 255, 0.008) 0%, rgba(255, 255, 255, 0) 30%)",
      }}
      _after={{
        content: '""',
        position: "absolute",
        inset: "0",
        borderRadius: "inherit",
        pointerEvents: "none",
        background: {
          base: "radial-gradient(ellipse 80% 45% at 50% 105%, rgba(161, 161, 170, 0.28) 0%, rgba(161, 161, 170, 0) 70%)",
          _dark:
            "radial-gradient(ellipse 80% 45% at 50% 105%, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0) 70%)",
        },
      }}
      rounded={theme.radii.component}
      pointerEvents={"auto"}
      {...props}
    />
  );
};
