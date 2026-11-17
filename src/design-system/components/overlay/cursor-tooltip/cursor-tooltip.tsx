// src/design-system/components/overlay/cursor-tooltip/cursor-tooltip.tsx

import type { CursorTooltipProps } from "@/design-system/components/overlay/cursor-tooltip/cursor-tooltip.type";
import { Presence } from "@/design-system/components/disclosure/presence/presence";
import { Box } from "@/design-system/components/layout/box/box";
import { Portal } from "@/design-system/components/utilities/portal/portal";
import { useDeviceCapability } from "@/shared/hooks/use-device-capability";
import { useCallback, useEffect, useRef, useState } from "react";

// Singleton controller ensuring only one CursorTooltip can be active across the app at any time
let activeHideCallback: (() => void) | null = null;

export const CursorTooltip = (props: CursorTooltipProps) => {
  // Props
  const {
    children,
    content,
    disabled = false,
    offset = { x: 12, y: 16 },
    openDelay = 300,
    closeDelay = 100,
  } = props;

  // Hooks
  const { hasPointer } = useDeviceCapability();

  // States
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  // Refs
  const timerIds = useRef<{
    open: ReturnType<typeof setTimeout> | null;
    close: ReturnType<typeof setTimeout> | null;
  }>({
    open: null,
    close: null,
  });

  // Handlers
  const hideImmediately = useCallback(() => {
    if (timerIds.current.open) {
      clearTimeout(timerIds.current.open);
      timerIds.current.open = null;
    }
    if (timerIds.current.close) {
      clearTimeout(timerIds.current.close);
      timerIds.current.close = null;
    }
    setIsVisible(false);
  }, []);

  const showTooltip = useCallback(() => {
    if (activeHideCallback && activeHideCallback !== hideImmediately) {
      activeHideCallback();
    }
    activeHideCallback = hideImmediately;
    setIsVisible(true);
  }, [hideImmediately]);

  const handlePointerEnter = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === "touch") return;
      setCoords({ x: e.clientX, y: e.clientY });

      if (timerIds.current.close) {
        clearTimeout(timerIds.current.close);
        timerIds.current.close = null;
      }

      if (openDelay > 0) {
        if (timerIds.current.open) clearTimeout(timerIds.current.open);
        timerIds.current.open = setTimeout(() => {
          showTooltip();
        }, openDelay);
      } else {
        showTooltip();
      }
    },
    [openDelay, showTooltip],
  );

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    setCoords({ x: e.clientX, y: e.clientY });
  }, []);

  const handlePointerLeave = useCallback(() => {
    if (timerIds.current.open) {
      clearTimeout(timerIds.current.open);
      timerIds.current.open = null;
    }

    if (closeDelay > 0) {
      if (timerIds.current.close) clearTimeout(timerIds.current.close);
      timerIds.current.close = setTimeout(() => {
        hideImmediately();
      }, closeDelay);
    } else {
      hideImmediately();
    }
  }, [closeDelay, hideImmediately]);

  // Effects: Clean up timers and singleton on unmount
  useEffect(() => {
    const currentTimers = timerIds.current;
    return () => {
      if (currentTimers.open) clearTimeout(currentTimers.open);
      if (currentTimers.close) clearTimeout(currentTimers.close);
      if (activeHideCallback === hideImmediately) {
        activeHideCallback = null;
      }
    };
  }, [hideImmediately]);

  // Effects: Dismiss on global pointerdown, scroll, window resize, or Escape key
  useEffect(() => {
    if (!isVisible) return;

    const handleGlobalPointerDown = () => {
      hideImmediately();
    };

    const handleScrollOrResize = () => {
      hideImmediately();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        hideImmediately();
      }
    };

    document.addEventListener("pointerdown", handleGlobalPointerDown, true);
    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);
    window.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener(
        "pointerdown",
        handleGlobalPointerDown,
        true,
      );
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [isVisible, hideImmediately]);

  const shouldRenderTooltip = !disabled && hasPointer && Boolean(content);

  const posX = coords.x + offset.x;
  const posY = coords.y + offset.y;

  return (
    <>
      <Box
        asChild
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerDown={hideImmediately}
        onClick={hideImmediately}
        onContextMenu={hideImmediately}
        onBlur={hideImmediately}
      >
        {children}
      </Box>

      {shouldRenderTooltip && (
        <Portal>
          <Presence
            present={isVisible}
            lazyMount={true}
            unmountOnExit={true}
            animationName={{
              _open: "fade-in",
              _closed: "fade-out",
            }}
            animationDuration={"fast"}
            pos={"fixed"}
            top={`${posY}px`}
            left={`${posX}px`}
            zIndex={"tooltip"}
            pointerEvents={"none"}
            bg={"bg.inverted"}
            color={"bg.body"}
            px={2.5}
            py={1}
            rounded={"md"}
            fontSize={"xs"}
            fontWeight={"medium"}
            shadow={"md"}
            whiteSpace={"nowrap"}
            userSelect={"none"}
          >
            {content}
          </Presence>
        </Portal>
      )}
    </>
  );
};
