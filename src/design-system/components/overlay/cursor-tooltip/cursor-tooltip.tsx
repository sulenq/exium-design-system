// src/design-system/components/overlay/cursor-tooltip/cursor-tooltip.tsx

import type { CursorTooltipProps } from "@/design-system/components/overlay/cursor-tooltip/cursor-tooltip.type";
import { Box } from "@/design-system/components/layout/box/box";
import { Portal } from "@/design-system/components/utilities/portal/portal";
import { useDeviceCapability } from "@/shared/hooks/use-device-capability";
import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useState,
  type ReactElement,
} from "react";

export const CursorTooltip = (props: CursorTooltipProps) => {
  // Props
  const {
    children,
    content,
    disabled = false,
    offset = { x: 12, y: 16 },
  } = props;

  // Hooks
  const { hasPointer } = useDeviceCapability();

  // States
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Handlers
  const handlePointerEnter = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === "touch") return;
      setCoords({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    },
    [],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === "touch") return;
      setCoords({ x: e.clientX, y: e.clientY });
    },
    [],
  );

  const handlePointerLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  // Effects
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

  if (!isValidElement(children)) {
    return children;
  }

  const child = children as ReactElement<{
    onPointerEnter?: (e: React.PointerEvent) => void;
    onPointerMove?: (e: React.PointerEvent) => void;
    onPointerLeave?: (e: React.PointerEvent) => void;
  }>;

  const wrappedChild = cloneElement(child, {
    onPointerEnter: (e: React.PointerEvent) => {
      child.props.onPointerEnter?.(e);
      handlePointerEnter(e);
    },
    onPointerMove: (e: React.PointerEvent) => {
      child.props.onPointerMove?.(e);
      handlePointerMove(e);
    },
    onPointerLeave: (e: React.PointerEvent) => {
      child.props.onPointerLeave?.(e);
      handlePointerLeave();
    },
  });

  const posX = coords.x + offset.x;
  const posY = coords.y + offset.y;

  return (
    <>
      {wrappedChild}

      {shouldRenderTooltip && (
        <Portal>
          <Box
            pos={"fixed"}
            top={0}
            left={0}
            transform={`translate3d(${posX}px, ${posY}px, 0)`}
            zIndex={"tooltip"}
            pointerEvents={"none"}
            bg={"bg.contrast"}
            color={"fg.inverted"}
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
