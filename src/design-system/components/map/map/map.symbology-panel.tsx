// src/design-system/components/map/map/map.symbology-panel.tsx

import { IconButton } from "@/design-system/components/button/button/button";
import { Accordion } from "@/design-system/components/disclosure/accordion/accordion";
import { Presence } from "@/design-system/components/disclosure/presence/presence";
import { Loader } from "@/design-system/components/feedback/loader/loader";
import { StateRetry } from "@/design-system/components/feedback/state-retry/state.retry";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { Box } from "@/design-system/components/layout/box/box";
import { Center } from "@/design-system/components/layout/center/center";
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { useMapLayerStore } from "@/design-system/components/map/stores/map.layer.store";
import type {
  DefaultThematicSwatchProps,
  LayerSymbologyContentProps,
  LegendRuleItemProps,
  LineSwatchProps,
  MapSymbologyPanelProps,
  PointSwatchProps,
  PolygonSwatchProps,
} from "@/design-system/components/map/map/map.symbology.type";
import { fetchLegendGraphic } from "@/design-system/components/map/utils/fetch-legend-graphic";
import { Tooltip } from "@/design-system/components/overlay/tooltip/tooltip";
import { Badge } from "@/design-system/components/typography/badge/badge";
import { P } from "@/design-system/components/typography/p/p";
import { useThemeStore } from "@/design-system/stores/theme-store";
import type { GenericMapLayer } from "@/design-system/components/map/map/map.layer-management.type";
import { useQuery } from "@tanstack/react-query";
import { EyeSlashIcon as EyeOffIcon, StackSimpleIcon as Layers2Icon, XIcon } from "@phosphor-icons/react";
import { memo, useMemo, useState } from "react";
import { t } from "@/shared/libs/i18n";

export const MapSymbologyPanel = memo((props: MapSymbologyPanelProps) => {
  // Props
  const { layers } = props;

  // Stores
  const { theme } = useThemeStore();
  const enabledSymbologyLayerIds = useMapLayerStore(
    (s) => s.enabledSymbologyLayerIds,
  );
  const toggleSymbologyLayerId = useMapLayerStore(
    (s) => s.toggleSymbologyLayerId,
  );
  const setSymbologyLayerEnabled = useMapLayerStore(
    (s) => s.setSymbologyLayerEnabled,
  );

  // Derived Values
  const activeSymbologyLayers: GenericMapLayer[] = useMemo(() => {
    return layers.filter((l: GenericMapLayer) => Boolean(enabledSymbologyLayerIds[l.id]));
  }, [layers, enabledSymbologyLayerIds]);

  const activeLayerIds = useMemo(() => {
    return activeSymbologyLayers.map((l: GenericMapLayer) => l.id);
  }, [activeSymbologyLayers]);

  // States — open accordion item keys
  const [openValues, setOpenValues] = useState<string[]>(activeLayerIds);
  const [prevActiveIds, setPrevActiveIds] = useState<string[]>(activeLayerIds);

  // Synchronize open values when new layer symbology is enabled (default open)
  if (activeLayerIds !== prevActiveIds) {
    setPrevActiveIds(activeLayerIds);
    const newlyAdded = activeLayerIds.filter(
      (id: string) => !prevActiveIds.includes(id),
    );
    if (newlyAdded.length > 0) {
      setOpenValues((prev) => Array.from(new Set([...prev, ...newlyAdded])));
    }
  }

  // Handlers
  const handleCloseAll = () => {
    for (const layerId of activeLayerIds) {
      setSymbologyLayerEnabled(layerId, false);
    }
  };

  const isVisible = activeSymbologyLayers.length > 0;

  return (
    <Presence
      present={isVisible}
      lazyMount={true}
      unmountOnExit={true}
      animationName={{
        _open: "slide-from-bottom, fade-in",
        _closed: "slide-to-bottom, fade-out",
      }}
      animationDuration={"200ms"}
    >
      <VStack
        w={"340px"}
        maxW={"calc(100vw - 32px)"}
        maxH={"420px"}
        bg={"bg.body"}
        rounded={theme.radii.container}
        shadow={"sm"}
        overflow={"hidden"}
        pointerEvents={"auto"}
        gap={0}
      >
        {/* Header */}
        <HStack
          flexShrink={0}
          gap={3}
          w={"full"}
          h={"48px"}
          px={4}
          pr={2}
          justify={"space-between"}
          align={"center"}
          borderBottom={"1px solid"}
          borderColor={"border.subtle"}
        >
          <HStack gap={2} align={"center"} minW={0} flex={1}>
            <P lineClamp={1} fontWeight={"medium"}>{t["map.symbology_and_legend"]()}</P>

            <Badge colorPalette={"blue"} size={"xs"}>
              {`${activeSymbologyLayers.length}`}
            </Badge>
          </HStack>

          <HStack align={"center"} gap={1} flexShrink={0}>
            <Tooltip content={t["map.close_all_symbology"]()}>
              <IconButton
                size={"xs"}
                variant={"ghost"}
                aria-label={t["map.close_all_symbology"]()}
                onClick={handleCloseAll}
              >
                <AppIcon icon={XIcon} />
              </IconButton>
            </Tooltip>
          </HStack>
        </HStack>

        {/* Content Body — Multi-Open Clean Accordion */}
        <VStack w={"full"} flex={1} overflowY={"auto"} gap={0}>
          <Accordion.Root
            multiple={true}
            value={openValues}
            onValueChange={(details) => setOpenValues(details.value)}
            w={"full"}
          >
            {activeSymbologyLayers.map((layer: GenericMapLayer) => {
              const displayName =
                layer.title ||
                layer.id.split(":")[1] ||
                layer.wfs?.wfsTypeName ||
                layer.id;
              const colorPalette = layer.appearance?.colorPalette ?? "blue";
              const LayerIcon = layer.appearance?.icon ?? Layers2Icon;
              const categoryLabel = layer.appearance?.categoryLabel;

              return (
                <Accordion.Item key={layer.id} value={layer.id}>
                  <Accordion.ItemTrigger
                    px={4}
                    w={"full"}
                    _hover={{
                      bg: "bg.subtle",
                    }}
                    transition={"150ms"}
                  >
                    <HStack gap={3} flex={1} align={"center"} minW={0}>
                      <Center
                        p={2}
                        bg={`${colorPalette}.subtle`}
                        rounded={theme.radii.component}
                        flexShrink={0}
                      >
                        <AppIcon
                          icon={LayerIcon}
                          color={`${colorPalette}.fg`}
                        />
                      </Center>

                      <VStack align={"start"} gap={0} flex={1} minW={0}>
                        <P lineClamp={1} fontWeight={"medium"} lineHeight={"tight"}>
                          {displayName.replace(/_/g, " ")}
                        </P>

                        {categoryLabel && (
                          <P lineClamp={1} fontSize={"sm"} color={"fg.subtle"}>
                            {categoryLabel}
                          </P>
                        )}
                      </VStack>
                    </HStack>

                    <HStack gap={2} align={"center"} flexShrink={0}>
                      <Tooltip content={t["map.hide_symbology"]()}>
                        <IconButton
                          as={"div"}
                          variant={"ghost"}
                          aria-label={t["map.hide_symbology"]()}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSymbologyLayerId(layer.id);
                          }}
                        >
                          <AppIcon icon={EyeOffIcon} />
                        </IconButton>
                      </Tooltip>

                      <Accordion.ItemIndicator />
                    </HStack>
                  </Accordion.ItemTrigger>

                  <Accordion.ItemContent>
                    <Accordion.ItemBody px={4}>
                      <LayerSymbologyContent layer={layer} />
                    </Accordion.ItemBody>
                  </Accordion.ItemContent>
                </Accordion.Item>
              );
            })}
          </Accordion.Root>
        </VStack>
      </VStack>
    </Presence>
  );
});

export const LayerSymbologyContent = memo(
  (props: LayerSymbologyContentProps) => {
    // Props
    const { layer } = props;

    // Queries — Fetch SLD / GetLegendGraphic rules from GeoServer
    const {
      data: rules,
      isLoading,
      isError,
      error,
      refetch,
    } = useQuery({
      queryKey: ["map", "legend-graphic", layer.id],
      queryFn: ({ signal }) => fetchLegendGraphic({ layer, signal }),
      staleTime: 1000 * 60 * 15,
    });

    if (isLoading) {
      return (
        <Center minH={"140px"}>
          <Loader />
        </Center>
      );
    }

    if (isError || !rules || rules.length === 0) {
      return (
        <Center w={"full"} py={2}>
          <StateRetry
            title={t["map.failed_loading_symbology"]()}
            description={
              error instanceof Error
                ? error.message
                : "Tidak dapat memuat aturan SLD dari GeoServer."
            }
            onRetry={() => {
              void refetch();
            }}
          />
        </Center>
      );
    }

    return (
      <VStack w={"full"} gap={2} align={"stretch"} pt={1}>
        {rules.map((rule, idx) => (
          <LegendRuleItem
            key={rule.name ?? idx}
            rule={rule}
            fallbackAppearance={layer.appearance}
          />
        ))}
      </VStack>
    );
  },
);

const LegendRuleItem = memo((props: LegendRuleItemProps) => {
  // Props
  const { rule, fallbackAppearance } = props;

  // Derived Values
  const ruleTitle = rule.title || rule.name || t["map.default_feature"]();
  const symbolizers = rule.symbolizers ?? [];

  return (
    <HStack
      w={"full"}
      justify={"space-between"}
      align={"center"}
      gap={3}
      py={1}
    >
      <HStack gap={3} align={"center"} flex={1} minW={0}>
        {symbolizers.map((symb, idx) => {
          if (symb.Polygon) {
            return <PolygonSwatch key={idx} polygon={symb.Polygon} />;
          }
          if (symb.Line) {
            return <LineSwatch key={idx} line={symb.Line} />;
          }
          if (symb.Point) {
            return <PointSwatch key={idx} point={symb.Point} />;
          }
          return <DefaultThematicSwatch key={idx} appearance={fallbackAppearance} />;
        })}
        {symbolizers.length === 0 && (
          <DefaultThematicSwatch appearance={fallbackAppearance} />
        )}

        <P lineClamp={1}
          fontSize={"sm"}
          color={"fg"}
          flex={1}
          wordBreak={"break-word"}
        >
          {ruleTitle}
        </P>
      </HStack>
    </HStack>
  );
});

const PolygonSwatch = memo((props: PolygonSwatchProps) => {
  // Props
  const { polygon } = props;

  // Derived Values
  const fillColor = polygon.fill ?? "#3b82f6";
  const fillOpacity = polygon["fill-opacity"]
    ? Number(polygon["fill-opacity"])
    : 0.4;
  const strokeColor = polygon.stroke ?? "#1d4ed8";
  const strokeWidth = polygon["stroke-width"]
    ? Math.min(3, Number(polygon["stroke-width"]))
    : 1.5;

  return (
    <Box
      w={"20px"}
      h={"16px"}
      rounded={"2px"}
      bg={fillColor}
      opacity={fillOpacity}
      border={`${strokeWidth}px solid ${strokeColor}`}
      flexShrink={0}
    />
  );
});

const LineSwatch = memo((props: LineSwatchProps) => {
  // Props
  const { line } = props;

  // Derived Values
  const strokeColor = line.stroke ?? "#2563eb";
  const strokeWidth = line["stroke-width"]
    ? Math.min(4, Number(line["stroke-width"]))
    : 2.5;

  return (
    <Box
      w={"20px"}
      h={`${strokeWidth}px`}
      bg={strokeColor}
      rounded={"1px"}
      flexShrink={0}
    />
  );
});

const PointSwatch = memo((props: PointSwatchProps) => {
  // Props
  const { point } = props;

  // Derived Values
  const graphicMark = point.graphics?.[0];
  const fillColor = graphicMark?.fill ?? "#2563eb";
  const strokeColor = graphicMark?.stroke ?? "#ffffff";

  return (
    <Box
      w={"14px"}
      h={"14px"}
      rounded={"full"}
      bg={fillColor}
      border={`1.5px solid ${strokeColor}`}
      flexShrink={0}
    />
  );
});

const DefaultThematicSwatch = memo((props: DefaultThematicSwatchProps) => {
  // Props
  const { appearance } = props;

  // Derived Values
  const colorPalette = appearance?.colorPalette ?? "blue";
  const fillColor = `${colorPalette}.subtle`;
  const strokeColor = `${colorPalette}.emphasized`;
  const label = appearance?.categoryLabel ?? t["map.default_feature"]();

  return (
    <HStack gap={3} align={"center"}>
      <Box
        w={"20px"}
        h={"16px"}
        rounded={"2px"}
        bg={fillColor}
        border={"1.5px solid"}
        borderColor={strokeColor}
        flexShrink={0}
      />
      <P lineClamp={1} fontSize={"sm"} color={"fg"}>
        {label}
      </P>
    </HStack>
  );
});
