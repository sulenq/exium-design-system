// src/design-system/components/overlay/cursor-tooltip/cursor-tooltip.tsx

import type { CursorTooltipProps } from "@/design-system/components/overlay/cursor-tooltip/cursor-tooltip.type";
import { Box } from "@/design-system/components/layout/box/box";
import { Portal } from "@/design-system/components/utilities/portal/portal";
import { useDeviceCapability } from "@/shared/hooks/use-device-capability";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

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
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Refs
  const timerIds = useRef<{
    open: ReturnType<typeof setTimeout> | null;
    close: ReturnType<typeof setTimeout> | null;
  }>({
    open: null,
    close: null,
  });

  // Handlers
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
          setIsVisible(true);
        }, openDelay);
      } else {
        setIsVisible(true);
      }
    },
    [openDelay],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === "touch") return;
      setCoords({ x: e.clientX, y: e.clientY });
    },
    [],
  );

  const handlePointerLeave = useCallback(() => {
    if (timerIds.current.open) {
      clearTimeout(timerIds.current.open);
      timerIds.current.open = null;
    }

    if (closeDelay > 0) {
      if (timerIds.current.close) clearTimeout(timerIds.current.close);
      timerIds.current.close = setTimeout(() => {
        setIsVisible(false);
      }, closeDelay);
    } else {
      setIsVisible(false);
    }
  }, [closeDelay]);

  // Effects
  useEffect(() => {
    const currentTimers = timerIds.current;
    return () => {
      if (currentTimers.open) clearTimeout(currentTimers.open);
      if (currentTimers.close) clearTimeout(currentTimers.close);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const handleScrollOrResize = () => {
      setIsVisible(false);
    };

    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [isVisible]);

  const shouldRenderTooltip = !disabled && hasPointer && Boolean(content) && isVisible;

  const posX = coords.x + offset.x;
  const posY = coords.y + offset.y;

  return (
    <>
      <Box
        asChild
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {children}
      </Box>

      {shouldRenderTooltip && (
        <Portal>
          <Box
            pos={"fixed"}
            top={0}
            left={0}
            transform={`translate3d(${posX}px, ${posY}px, 0)`}
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
            willChange={"transform"}
            transition={"opacity 0.1s ease"}
          >
            {content}
          </Box>
        </Portal>
      )}
    </>
  );
};
