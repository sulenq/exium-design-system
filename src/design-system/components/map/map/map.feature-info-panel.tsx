// src/design-system/components/map/map/map.feature-info-panel.tsx

import { IconButton } from "@/design-system/components/button/button/button";
import { HeaderCloseButton } from "@/design-system/components/button/close-button/close-button";
import { Presence } from "@/design-system/components/disclosure/presence/presence";
import { Skeleton } from "@/design-system/components/feedback/skeleton/skeleton";
import { StateNoData } from "@/design-system/components/feedback/state-no-data/state.no-data";
import { StateNoResult } from "@/design-system/components/feedback/state-no-result/state.no-result";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { SearchInput } from "@/design-system/components/input/search-input/search-input";
import { Box } from "@/design-system/components/layout/box/box";
import { Center } from "@/design-system/components/layout/center/center";
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { Separator } from "@/design-system/components/layout/separator/separator";
import { useMapFeatureInfoStore } from "@/design-system/components/map/stores/map.feature-info.store";
import { useMapInstanceStore } from "@/design-system/components/map/stores/map.instance.store";
import type { MapFeatureInfoItem } from "@/design-system/components/map/map/map.feature-info.type";
import { zoomToFeatureSafe } from "@/design-system/components/map/utils/map-camera";
import { Tooltip } from "@/design-system/components/overlay/tooltip/tooltip";
import { toast } from "@/design-system/components/toast";
import { P } from "@/design-system/components/typography/p/p";
import { useIsSmallViewport } from "@/design-system/hooks/use-is-small-viewport";
import { useThemeStore } from "@/design-system/stores/theme-store";
import { isEmptyArray } from "@/shared/utils/data/array";
import { FocusIcon, Layers2Icon } from "lucide-react";
import { useMemo, useState } from "react";
import { t } from "@/shared/libs/i18n";

export const MapFeatureInfoPanel = () => {
  // Stores
  const { theme } = useThemeStore();
  const map = useMapInstanceStore((s) => s.map);
  const selectedFeature = useMapFeatureInfoStore((s) => s.selectedFeature);
  const isLoading = useMapFeatureInfoStore((s) => s.isLoading);
  const clearFeatureInfo = useMapFeatureInfoStore((s) => s.clearFeatureInfo);

  // Hooks
  const isSmallViewport = useIsSmallViewport();

  // States
  const [prevFeature, setPrevFeature] = useState<MapFeatureInfoItem | null>(
    selectedFeature,
  );
  const [cachedFeature, setCachedFeature] = useState<MapFeatureInfoItem | null>(
    selectedFeature,
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Adjust state during render when selectedFeature changes (React standard pattern)
  if (selectedFeature !== prevFeature) {
    setPrevFeature(selectedFeature);
    if (selectedFeature !== null) {
      setCachedFeature(selectedFeature);
    }
  }

  // Derived Values
  const isOpen = Boolean(selectedFeature || isLoading);
  const displayFeature = selectedFeature ?? cachedFeature;
  const appearance = displayFeature?.appearance;
  const colorPalette = appearance?.colorPalette ?? "gray";
  const LayerIcon = appearance?.icon ?? Layers2Icon;
  const categoryLabel = appearance?.categoryLabel ?? t["map.layer"]();

  const properties = useMemo(
    () => displayFeature?.properties ?? {},
    [displayFeature],
  );

  const allEntries = useMemo(() => {
    return Object.entries(properties).filter(
      ([key]) =>
        key !== "geom" &&
        key !== "the_geom" &&
        key !== "geometry" &&
        key !== "bbox",
    );
  }, [properties]);

  const filteredEntries = useMemo(() => {
    if (!searchQuery.trim()) return allEntries;
    const q = searchQuery.toLowerCase();
    return allEntries.filter(
      ([k, v]) =>
        k.toLowerCase().includes(q) || String(v).toLowerCase().includes(q),
    );
  }, [allEntries, searchQuery]);

  // Handlers
  const handleExitComplete = () => {
    setCachedFeature(null);
    setSearchQuery("");
  };

  const handleZoomToFeature = () => {
    const geom = selectedFeature?.geometry ?? displayFeature?.geometry;
    const coord = selectedFeature?.coordinate ?? displayFeature?.coordinate;
    if (!map) return;
    try {
      zoomToFeatureSafe(map, geom, coord, isSmallViewport);
    } catch {
      toast.error(t["map.zoom_to_feature_failed"]());
    }
  };

  return (
    <Presence
      present={isOpen}
      onExitComplete={handleExitComplete}
      lazyMount={true}
      unmountOnExit={true}
      animationName={{
        _open: "slide-from-top, fade-in",
        _closed: "slide-to-top, fade-out",
      }}
      animationDuration={"200ms"}
    >
      <VStack
        w={isSmallViewport ? "280px" : "340px"}
        maxW={isSmallViewport ? "calc(100vw - 24px)" : "calc(100vw - 32px)"}
        maxH={isSmallViewport ? "360px" : "460px"}
        bg={"bg.body"}
        border={"1px solid"}
        borderColor={"border.subtle"}
        rounded={theme.radii.container}
        shadow={"md"}
        overflow={"hidden"}
        pointerEvents={"auto"}
        gap={0}
      >
        {/* Header */}
        <HStack align={"center"} justify={"space-between"} p={4}>
          <P fontWeight={"medium"}>{t["map.properties"]()}</P>

          <Tooltip content={t["common.close"]()}>
            <HeaderCloseButton
              aria-label={t["common.close"]()}
              onClick={clearFeatureInfo}
            />
          </Tooltip>
        </HStack>

        <Separator borderColor={"bg.canvas"} />

        <HStack
          flexShrink={0}
          align={"center"}
          justify={"space-between"}
          gap={4}
          w={"full"}
          h={"auto"}
          minH={"48px"}
          p={3}
          borderBottom={"1px solid"}
          borderColor={"bg.canvas"}
        >
          <HStack gap={4} align={"center"} flex={1} minW={0}>
            <Center
              p={2}
              bg={`${colorPalette}.subtle`}
              rounded={theme.radii.component}
              flexShrink={0}
            >
              <AppIcon icon={LayerIcon} color={`${colorPalette}.fg`} />
            </Center>

            <VStack flex={1} align={"start"}>
              <P lineClamp={1} fontWeight={"medium"} lineHeight={"tight"}>
                {displayFeature?.title ??
                  displayFeature?.layerTitle ??
                  t["map.feature_info"]()}
              </P>

              <P lineClamp={1} fontSize={"sm"} color={"fg.subtle"}>
                {categoryLabel}
              </P>
            </VStack>
          </HStack>

          <HStack align={"center"} gap={1} flexShrink={0}>
            {(selectedFeature?.geometry || displayFeature?.geometry) && (
              <Tooltip content={t["map.zoom_to_feature"]()}>
                <IconButton
                  size={"sm"}
                  aria-label={t["map.zoom_to_feature"]()}
                  onClick={handleZoomToFeature}
                >
                  <AppIcon icon={FocusIcon} />
                </IconButton>
              </Tooltip>
            )}
          </HStack>
        </HStack>

        {/* Content */}
        {isLoading && !displayFeature && (
          <VStack w={"full"} p={4} gap={3}>
            <Skeleton h={"28px"} w={"full"} />
            <Skeleton h={"18px"} w={"75%"} />
            <Skeleton h={"18px"} w={"60%"} />
            <Skeleton h={"18px"} w={"90%"} />
          </VStack>
        )}

        {(!isLoading || Boolean(displayFeature)) &&
          isEmptyArray(allEntries) && (
            <VStack w={"full"} p={6} align={"center"} justify={"center"}>
              <StateNoData description={"Tidak ada atribut fitur"} />
            </VStack>
          )}

        {(!isLoading || Boolean(displayFeature)) &&
          !isEmptyArray(allEntries) && (
            <VStack w={"full"} flex={1} gap={0} overflowY={"auto"}>
              {allEntries.length > 5 && (
                <Box p={3} w={"full"}>
                  <SearchInput
                    placeholder={t["map.search_attributes"]()}
                    value={searchQuery}
                    onValueChange={(val) => setSearchQuery(val)}
                    w={"full"}
                  />
                </Box>
              )}

              <VStack w={"full"} flex={1} p={3} gap={2}>
                {isEmptyArray(filteredEntries) && (
                  <VStack
                    w={"full"}
                    py={4}
                    align={"center"}
                    justify={"center"}
                  >
                    <StateNoResult query={searchQuery || "..."} />
                  </VStack>
                )}

                {!isEmptyArray(filteredEntries) &&
                  filteredEntries.map(([key, value], idx) => {
                    const stringVal =
                      value === null || value === undefined
                        ? "-"
                        : typeof value === "object"
                          ? JSON.stringify(value)
                          : String(value);

                    return (
                      <VStack key={key} w={"full"} gap={2}>
                        {idx > 0 && <Separator borderColor={"border.subtle"} />}
                        {isSmallViewport && (
                          <VStack
                            w={"full"}
                            align={"start"}
                            gap={1}
                            py={1}
                          >
                            <P
                              fontSize={"sm"}
                              color={"fg.muted"}
                              lineHeight={"tight"}
                              wordBreak={"break-word"}
                            >
                              {key}
                            </P>

                            <P
                              fontWeight={"medium"}
                              lineHeight={"snug"}
                              wordBreak={"break-word"}
                            >
                              {stringVal}
                            </P>
                          </VStack>
                        )}
                        {!isSmallViewport && (
                          <HStack
                            w={"full"}
                            justify={"space-between"}
                            align={"start"}
                            gap={3}
                            py={1}
                          >
                            <P
                              fontSize={"sm"}
                              color={"fg.muted"}
                              w={"40%"}
                              wordBreak={"break-word"}
                            >
                              {key}
                            </P>

                            <P
                              fontWeight={"medium"}
                              w={"60%"}
                              textAlign={"right"}
                              wordBreak={"break-word"}
                            >
                              {stringVal}
                            </P>
                          </HStack>
                        )}
                      </VStack>
                    );
                  })}
              </VStack>
            </VStack>
          )}
      </VStack>
    </Presence>
  );
};
