// src/design-system/components/map/map/map.controls/map.layer-management-item.tsx

import { IconButton } from "@/design-system/components/button/button/button";
import { Collapsible } from "@/design-system/components/disclosure/collapsible/collapsible";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { Slider } from "@/design-system/components/input/slider/slider";
import { Switch } from "@/design-system/components/input/switch/switch";
import { Box } from "@/design-system/components/layout/box/box";
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import type {
  GenericMapLayer,
  MapLayerManagementItemProps,
} from "@/design-system/components/map/map/map.layer-management.type";
import { LayerSymbologyContent } from "@/design-system/components/map/map/map.symbology-panel";
import { Popover } from "@/design-system/components/overlay/popover/popover";
import { Tooltip } from "@/design-system/components/overlay/tooltip/tooltip";
import { P } from "@/design-system/components/typography/p/p";
import { useThemeStore } from "@/design-system/stores/theme-store";
import { Badge } from "@/design-system/components/typography/badge/badge";
import { useFlyToLayer } from "@/design-system/components/map/hooks/use-fly-to-layer";
import {
  attachClosestEdge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import type { Edge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/dist/types/types";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import {
  FocusIcon,
  GripVerticalIcon,
  SquareDashedIcon,
  SwatchBookIcon,
} from "lucide-react";
import React, { memo, useEffect, useRef, useState } from "react";
import { t } from "@/shared/libs/i18n";

function MapLayerManagementItemComponent<
  T extends GenericMapLayer = GenericMapLayer,
>(props: MapLayerManagementItemProps<T>) {
  // Props
  const {
    layer,
    index,
    isEnabled,
    isSymbologyEnabled,
    showSymbology = true,
    opacity,
    onToggle,
    onToggleSymbology,
    onOpacityChange,
    onReorder,
    onFlyTo,
    ...restProps
  } = props;

  // Stores
  const { theme } = useThemeStore();
  const { flyTo } = useFlyToLayer();

  // Refs
  const itemRef = useRef<HTMLDivElement | null>(null);
  const dragHandleRef = useRef<HTMLButtonElement | null>(null);

  // States
  const [isSymbologyOpen, setIsSymbologyOpen] = useState<boolean>(
    Boolean(isSymbologyEnabled),
  );
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [closestEdge, setClosestEdge] = useState<Edge | null>(null);

  // Effects — Pragmatic Drag and Drop
  useEffect(() => {
    const element = itemRef.current;
    const dragHandle = dragHandleRef.current;
    if (!element || !dragHandle) return;

    return combine(
      draggable({
        element,
        dragHandle,
        getInitialData: () => ({ id: layer.id, index }),
        onDragStart: () => setIsDragging(true),
        onDrop: () => setIsDragging(false),
      }),
      dropTargetForElements({
        element,
        canDrop: ({ source }) => {
          return source.data.id !== layer.id;
        },
        getData: ({ input, element }) => {
          const data = { id: layer.id, index };
          return attachClosestEdge(data, {
            input,
            element,
            allowedEdges: ["top", "bottom"],
          });
        },
        onDragEnter: (args) => {
          const edge = extractClosestEdge(args.self.data);
          setClosestEdge(edge);
        },
        onDrag: (args) => {
          const edge = extractClosestEdge(args.self.data);
          setClosestEdge(edge);
        },
        onDragLeave: () => {
          setClosestEdge(null);
        },
        onDrop: (args) => {
          setClosestEdge(null);
          const sourceIndex = args.source.data.index as number | undefined;
          if (sourceIndex === undefined || sourceIndex === index) return;

          const edge = extractClosestEdge(args.self.data);
          let targetIndex = index;
          if (edge === "bottom" && sourceIndex < index) {
            targetIndex = index;
          } else if (edge === "bottom" && sourceIndex > index) {
            targetIndex = index + 1;
          } else if (edge === "top" && sourceIndex < index) {
            targetIndex = index - 1;
          } else if (edge === "top" && sourceIndex > index) {
            targetIndex = index;
          }

          onReorder(sourceIndex, targetIndex);
        },
      }),
    );
  }, [layer.id, index, onReorder]);

  // Handlers
  const handleToggle = () => {
    onToggle(layer.id);
  };

  const handleFlyTo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onFlyTo) {
      onFlyTo(layer);
    } else if (layer.bbox) {
      void flyTo({
        bbox: layer.bbox,
      });
    }
  };

  const handleToggleSymbology = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSymbologyOpen((prev) => !prev);
    onToggleSymbology?.(layer.id);
  };

  // Derived Values
  const displayName =
    layer.title || layer.id.split(":")[1] || layer.wfs?.wfsTypeName || layer.id;
  const colorPalette = layer.appearance?.colorPalette ?? "blue";

  return (
    <VStack align={"stretch"} w={"full"} position={"relative"} {...restProps}>
      <VStack
        ref={itemRef}
        gap={1}
        position={"relative"}
        opacity={isDragging ? 0.4 : 1}
        transition={"opacity 0.15s ease"}
      >
        {closestEdge === "top" && (
          <Box
            position={"absolute"}
            top={"-8px"}
            left={0}
            right={0}
            height={"2px"}
            bg={"blue.solid"}
            rounded={"full"}
            zIndex={10}
            pointerEvents={"none"}
          />
        )}
        {closestEdge === "bottom" && (
          <Box
            position={"absolute"}
            bottom={"-8px"}
            left={0}
            right={0}
            height={"2px"}
            bg={"blue.solid"}
            rounded={"full"}
            zIndex={10}
            pointerEvents={"none"}
          />
        )}

        <HStack
          align={"center"}
          gap={4}
          colorPalette={colorPalette}
          rounded={theme.radii.component}
          cursor={"pointer"}
          onClick={handleToggle}
          w={"full"}
        >
          <HStack flex={1} align={"center"} gap={2}>
            <Tooltip content={t["map.drag_to_reorder"]()}>
              <IconButton
                ref={dragHandleRef}
                aria-label={t["map.reorder_layer"]()}
                variant={"plain"}
                size={"2xs"}
                px={0}
                cursor={"grab"}
                onClick={(e) => e.stopPropagation()}
                color={"fg.subtle"}
                _hover={{ color: "fg" }}
                _active={{ cursor: "grabbing" }}
              >
                <AppIcon icon={GripVerticalIcon} size={"sm"} />
              </IconButton>
            </Tooltip>

            <P lineClamp={1}
              fontWeight={"medium"}
              color={isEnabled ? `fg` : "fg.subtle"}
            >
              {displayName.replace(/_/g, " ")}
            </P>
          </HStack>

          <HStack align={"center"} gap={2} mr={1}>
            <Switch size={"sm"} checked={isEnabled} pointerEvents={"none"} />
          </HStack>
        </HStack>

        <HStack
          align={"center"}
          justify={"space-between"}
          gap={4}
          pl={"28px"}
        >
          <Box>
            {layer.appearance?.categoryLabel && (
              <Badge
                colorPalette={isEnabled ? colorPalette : "gray"}
                variant={"subtle"}
                opacity={isEnabled ? 1 : 0.5}
              >
                {layer.appearance.categoryLabel}
              </Badge>
            )}
          </Box>

          <HStack align={"center"} gap={1}>
            <Popover.Root
              positioning={{
                placement: "left",
                offset: { mainAxis: 8 },
              }}
              portalled={true}
            >
              <Popover.Trigger>
                <Tooltip content={t["map.set_opacity"]()}>
                  <IconButton
                    size={"xs"}
                    variant={"ghost"}
                    aria-label={t["map.set_opacity"]()}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <AppIcon icon={SquareDashedIcon} />
                  </IconButton>
                </Tooltip>
              </Popover.Trigger>

              <Popover.Content
                w={"220px"}
                p={3}
                onClick={(e) => e.stopPropagation()}
              >
                <VStack gap={2} align={"stretch"} w={"full"}>
                  <HStack justify={"space-between"} w={"full"}>
                    <P fontSize={"sm"} fontWeight={"medium"}>
                      {"Opasitas Layer"}
                    </P>

                    <P
                      fontSize={"sm"}
                      fontWeight={"semibold"}
                      color={"fg.muted"}
                    >
                      {`${Math.round(opacity * 100)}%`}
                    </P>
                  </HStack>

                  <Slider
                    value={[Math.round(opacity * 100)]}
                    min={0}
                    max={100}
                    step={1}
                    showValue={false}
                    onValueChange={(details) =>
                      onOpacityChange(layer.id, details.value[0] / 100)
                    }
                  />
                </VStack>
              </Popover.Content>
            </Popover.Root>

            <Tooltip content={t["map.zoom_to_layer"]()}>
              <IconButton
                size={"xs"}
                variant={"ghost"}
                aria-label={t["map.zoom_to_layer"]()}
                onClick={handleFlyTo}
              >
                <AppIcon icon={FocusIcon} />
              </IconButton>
            </Tooltip>

            {showSymbology && (
              <Tooltip
                content={
                  isSymbologyOpen
                    ? "Sembunyikan Simbologi"
                    : "Tampilkan Simbologi"
                }
              >
                <IconButton
                  size={"xs"}
                  variant={"ghost"}
                  aria-label={t["map.symbology"]()}
                  onClick={handleToggleSymbology}
                >
                  <AppIcon
                    icon={SwatchBookIcon}
                    color={isSymbologyOpen ? "blue.fg" : undefined}
                  />
                </IconButton>
              </Tooltip>
            )}
          </HStack>
        </HStack>
      </VStack>

      {showSymbology && (
        <Collapsible.Root opened={isSymbologyOpen}>
          <Collapsible.Content mt={2}>
            <VStack
              gap={2}
              p={3}
              bg={"bg.subtle"}
              rounded={theme.radii.component}
              onClick={(e) => e.stopPropagation()}
              onDragStart={(e) => e.stopPropagation()}
              align={"stretch"}
              w={"full"}
            >
              <HStack justify={"space-between"} align={"center"} w={"full"}>
                <P fontSize={"xs"} fontWeight={"semibold"} color={"fg.muted"}>
                  {"Simbologi"}
                </P>
              </HStack>

              <LayerSymbologyContent layer={layer} />
            </VStack>
          </Collapsible.Content>
        </Collapsible.Root>
      )}
    </VStack>
  );
}

export const MapLayerManagementItem = memo(MapLayerManagementItemComponent) as <
  T extends GenericMapLayer = GenericMapLayer,
>(
  props: MapLayerManagementItemProps<T>,
) => React.ReactElement;
