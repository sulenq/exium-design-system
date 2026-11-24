// src/design-system/components/overlay/tooltip/tooltip.tsx

import type { TooltipProps } from "@/design-system/components/overlay/tooltip/tooltip.type";
import { Tooltip as ChakraTooltip, Portal } from "@chakra-ui/react";
import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
} from "react";

const LONG_PRESS_MS = 500;
const TOUCH_VISIBLE_MS = 1500;

/**
 * Opens on hover and focus. On touch devices it opens on long-press (500 ms) and
 * hides itself after 1.5 s; a normal tap still triggers the element's action.
 * For information people must read on mobile without discovering a gesture,
 * use `ToggleTip` instead.
 */
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  function Tooltip(props, ref) {
    // Props
    const {
      showArrow,
      children,
      disabled,
      portalled = true,
      content,
      contentProps,
      portalRef,
      w,
      width,
      minW,
      minWidth,
      openDelay = 300,
      open: openProp,
      onOpenChange,
      ...restProps
    } = props;

    // States
    const [internalOpen, setInternalOpen] = useState(false);

    // Refs
    const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const suppressClick = useRef(false);

    // Utils
    function clearTimers() {
      if (longPressTimer.current) clearTimeout(longPressTimer.current);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      longPressTimer.current = null;
      hideTimer.current = null;
    }

    // Handlers
    function handleOpenChange(details: { open: boolean }) {
      setInternalOpen(details.open);
      onOpenChange?.(details);
    }

    function handlePointerDown(event: PointerEvent) {
      if (event.pointerType !== "touch") return;
      clearTimers();
      longPressTimer.current = setTimeout(() => {
        suppressClick.current = true;
        handleOpenChange({ open: true });
        hideTimer.current = setTimeout(
          () => handleOpenChange({ open: false }),
          TOUCH_VISIBLE_MS,
        );
      }, LONG_PRESS_MS);
    }

    function handlePointerEnd(event: PointerEvent) {
      if (event.pointerType !== "touch") return;
      if (longPressTimer.current) clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }

    function handleClickCapture(event: MouseEvent) {
      if (!suppressClick.current) return;
      // The long-press only revealed the tooltip; do not also trigger the action
      suppressClick.current = false;
      event.preventDefault();
      event.stopPropagation();
    }

    function handleContextMenu(event: MouseEvent) {
      // Long-press on mobile opens the native context menu; the tooltip replaces it
      if (suppressClick.current || longPressTimer.current) event.preventDefault();
    }

    // Effects
    useEffect(() => clearTimers, []);

    if (disabled) return children;

    // Constants
    const rootPropKeys = new Set([
      "open",
      "defaultOpen",
      "onOpenChange",
      "openDelay",
      "closeDelay",
      "closeOnPointerDown",
      "closeOnScroll",
      "closeOnClick",
      "closeOnEscape",
      "interactive",
      "positioning",
      "id",
      "ids",
      "lazyMount",
      "unmountOnExit",
      "present",
      "navigate",
    ]);

    const rootProps: Record<string, unknown> = {
      openDelay,
      open: openProp ?? internalOpen,
      onOpenChange: handleOpenChange,
    };
    const triggerProps: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(restProps)) {
      if (rootPropKeys.has(key)) {
        rootProps[key] = value;
      } else {
        triggerProps[key] = value;
      }
    }

    return (
      <ChakraTooltip.Root
        {...rootProps}
      >
        <ChakraTooltip.Trigger
          asChild
          w={w ?? width}
          minW={minW ?? minWidth}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          onPointerLeave={handlePointerEnd}
          onClickCapture={handleClickCapture}
          onContextMenu={handleContextMenu}
          {...triggerProps}
        >
          {children}
        </ChakraTooltip.Trigger>

        <Portal disabled={!portalled} container={portalRef}>
          <ChakraTooltip.Positioner zIndex={9999}>
            <ChakraTooltip.Content
              ref={ref}
              bg={"bg.contrast"}
              zIndex={9999}
              {...contentProps}
            >
              {showArrow && (
                <ChakraTooltip.Arrow>
                  <ChakraTooltip.ArrowTip />
                </ChakraTooltip.Arrow>
              )}
              {content}
            </ChakraTooltip.Content>
          </ChakraTooltip.Positioner>
        </Portal>
      </ChakraTooltip.Root>
    );
  },
);
