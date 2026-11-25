// src/design-system/components/toast/toast/toast.stack.tsx

import { IconButton } from "@/design-system/components/button/button/button";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { DEFAULT_TOAST_GROUP } from "@/design-system/components/toast/core/toast.config";
import { toastTimerControls } from "@/design-system/components/toast/core/toast.manager";
import type { ToastStackProps } from "@/design-system/components/toast/toast/toast.type";
import { Badge } from "@/design-system/components/typography/badge/badge";
import { P } from "@/design-system/components/typography/p/p";
import { useThemeStore } from "@/design-system/stores/theme-store";
import { useFirstMountEffect } from "@/shared/hooks/use-first-mount-effect";
import { t } from "@/shared/libs/i18n";
import { isEmptyArray } from "@/shared/utils/data/array";
import { Box } from "@chakra-ui/react";
import { CaretUpIcon as ChevronUpIcon, TrashIcon as Trash2Icon } from "@phosphor-icons/react";
import { useEffect, useMemo, useRef, useState } from "react";

export function ToastStack<TItem>({
  groupLabel,
  items: itemsProp,
  getId,
  maxVisible,
  renderItem,
  isItemLeaving,
  getPriority,
  onCloseAll,
  onClickOutside,
}: ToastStackProps<TItem>) {
  // Derived Values — stable sort so errors and warnings surface first
  const items = useMemo(() => {
    if (!getPriority) return itemsProp;
    return itemsProp
      .map((item, index) => ({ item, index, priority: getPriority(item) }))
      .sort((a, b) => b.priority - a.priority || a.index - b.index)
      .map(({ item }) => item);
  }, [itemsProp, getPriority]);

  // Stores
  const { theme } = useThemeStore();

  // Hooks
  // const { maxVisiblePerGroup } = getToastConfig();

  // States
  const [expanded, setExpanded] = useState(false);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);

  // Collapse stack if no items
  useFirstMountEffect(
    {
      onUpdate: () => {
        if (isEmptyArray(items)) {
          setExpanded(false);
        }
      },
    },
    [items],
  );

  // Click outside to collapse
  useEffect(() => {
    if (!expanded) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setExpanded(false);
        if (onClickOutside) {
          onClickOutside(event);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [expanded, onClickOutside]);

  // Resolved Values — "+N" badge shows how many toasts hide behind the top card
  const activeCount = items.filter((item) => !isItemLeaving?.(item)).length;
  const hiddenCount = activeCount - 1;

  return (
    <VStack
      ref={containerRef}
      data-state={expanded ? "expanded" : "collapsed"}
      flexShrink={0}
      gap={expanded ? 2 : 0}
      pointerEvents={"auto"}
      onPointerEnter={() => toastTimerControls.pauseAll()}
      onPointerLeave={() => toastTimerControls.resumeAll()}
      onFocus={() => toastTimerControls.pauseAll()}
      onBlur={() => toastTimerControls.resumeAll()}
    >
      {/* Header (expanded) */}
      <HStack
        justifyContent={"space-between"}
        align={"center"}
        h={"26px"}
        // px={3}
        mt={expanded ? 0 : "-26px"}
        visibility={expanded ? "visible" : "hidden"}
        opacity={expanded ? 1 : 0}
        transition={"200ms"}
      >
        <P fontWeight={"semibold"}>
          {groupLabel === DEFAULT_TOAST_GROUP
            ? t["common.system"]()
            : groupLabel}
        </P>

        <HStack align={"center"} gap={2}>
          {onCloseAll && (
            <IconButton
              aria-label={t["action.clear_all"]()}
              size={"2xs"}
              variant={"blend"}
              rounded={"full"}
              onClick={(event) => {
                event.stopPropagation();
                setExpanded(false);
                onCloseAll();
              }}
            >
              <AppIcon icon={Trash2Icon} size={"sm"} />
            </IconButton>
          )}

          <IconButton
            aria-label={t["action.collapse"]()}
            size={"2xs"}
            variant={"blend"}
            rounded={"full"}
            onClick={(event) => {
              event.stopPropagation();
              setExpanded(false);
            }}
          >
            <AppIcon icon={ChevronUpIcon} size={"sm"} />
          </IconButton>
        </HStack>
      </HStack>

      {/* Items */}
      <VStack
        pos={"relative"}
        w={"full"}
        cursor={!expanded ? "pointer" : undefined}
        rounded={theme.radii.container}
        onClick={
          !expanded
            ? () => {
                const selection =
                  typeof window !== "undefined" ? window.getSelection() : null;
                if (selection && selection.toString().length > 0) return;
                setExpanded(true);
              }
            : undefined
        }
      >
        {(() => {
          let nonLeavingCount = 0;
          const visualIndexes = items.map((item) => {
            if (isItemLeaving?.(item)) return -1;
            return nonLeavingCount++;
          });

          const hasVisibleItems = nonLeavingCount > 0;
          const isCollapsed = !expanded;
          // Buffer threshold: keep up to 6 cards mounted in collapsed state so expand transition is smooth without DOM bloat
          const maxCollapsedRenderCount = Math.max(maxVisible + 3, 6);

          return items.map((item, index) => {
            const visualIndex = visualIndexes[index];
            const isLeaving = visualIndex === -1;
            const isStackedVisible =
              visualIndex > -1 && visualIndex < maxVisible;
            const isRelative =
              (!hasVisibleItems && index === 0) || visualIndex === 0;
            const isFirstVisual = visualIndex === 0;

            // When collapsed, skip rendering items beyond buffer threshold to keep DOM light
            if (isCollapsed && visualIndex >= maxCollapsedRenderCount) {
              return null;
            }

            // Stack transform calculations for cards in collapsed state
            const collapsedTranslateY = isStackedVisible
              ? visualIndex * 8
              : maxVisible * 8;
            const collapsedScale = isStackedVisible
              ? 1 - visualIndex * 0.05
              : 1 - maxVisible * 0.05;

            return (
              <Box
                key={getId(item)}
                display={"grid"}
                gridTemplateRows={isLeaving ? "0fr" : "1fr"}
                w={"full"}
                minW={0}
                data-stack-state={
                  expanded
                    ? "expanded"
                    : isStackedVisible
                      ? "stacked"
                      : "hidden"
                }
                pos={isCollapsed && !isRelative ? "absolute" : "relative"}
                top={isCollapsed && !isRelative ? 0 : undefined}
                right={isCollapsed && !isRelative ? 0 : undefined}
                bottom={isCollapsed && !isRelative ? 0 : undefined}
                left={isCollapsed && !isRelative ? 0 : undefined}
                overflow={
                  isCollapsed && !isRelative && !isLeaving ? "clip" : "visible"
                }
                rounded={theme.radii.container}
                zIndex={items.length - index}
                mt={expanded && index > 0 && !isLeaving ? 2 : 0}
                opacity={!expanded && !isStackedVisible && !isLeaving ? 0 : 1}
                transformOrigin={"bottom"}
                transform={
                  isCollapsed && !isFirstVisual && !isLeaving
                    ? `scale(${collapsedScale}) translateY(${collapsedTranslateY}px)`
                    : "scale(1)"
                }
                transition={
                  "transform 250ms cubic-bezier(0.2, 0, 0, 1), margin-top 250ms cubic-bezier(0.2, 0, 0, 1), opacity 250ms ease"
                }
                pointerEvents={expanded || isFirstVisual ? "auto" : "none"}
                willChange={isCollapsed ? "transform, opacity" : undefined}
              >
                <Box w={"full"} minW={0} minH={"0px"} overflow={"visible"}>
                  {renderItem({
                    item,
                    index,
                    stackExpanded: expanded,
                    setStackExpanded: setExpanded,
                  })}
                </Box>
              </Box>
            );
          });
        })()}
      </VStack>

      {!expanded && hiddenCount > 0 && (
        <Box pos={"relative"} h={0} w={"full"} pointerEvents={"none"}>
          <Badge
            variant={"solid"}
            colorPalette={"gray"}
            pos={"absolute"}
            right={2}
            bottom={"calc(100% - 10px)"}
            zIndex={items.length + 1}
            aria-label={t["toast.more_count"]({ count: String(hiddenCount) })}
          >
            {`+${hiddenCount}`}
          </Badge>
        </Box>
      )}

      {/* Stack additional item count */}
      {/* {!expanded && overflowCount > 0 ? (
        <Text fontSize={"xs"} color={"fg.muted"} mt={3} textAlign={"center"}>
          {`+${overflowCount} more in ${groupLabel}`}
        </Text>
      ) : null} */}
    </VStack>
  );
}
