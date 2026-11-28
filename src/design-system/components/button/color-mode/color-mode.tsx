// src/design-system/components/button/color-mode/color-mode.tsx

import type { ColorModeToggleButtonProps } from "@/design-system/components/button/button/button.type";
import { IconButton } from "@/design-system/components/button/button/button";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import type { BoxProps } from "@/design-system/components/layout/box/box.type";
import { Box } from "@/design-system/components/layout/box/box";
import { useColorMode } from "@/design-system/hooks/use-color-mode";
import { CircleHalfIcon as EclipseIcon, SunIcon } from "@phosphor-icons/react";
import { keyframes } from "@emotion/react";
import type { MouseEvent } from "react";
import { useState } from "react";
import { createPortal } from "react-dom";

const GROW_DURATION_MS = 380;
const FADE_OUT_DURATION_MS = 220;

const growCircle = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const fadeOutCircle = keyframes`
  from {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1);
  }
`;

export const ColorModeToggleButton = (props: ColorModeToggleButtonProps) => {
  // Hooks
  const { colorMode } = useColorMode();

  return (
    <ColorModeToggleTrigger>
      <IconButton {...props}>
        <AppIcon icon={colorMode === "light" ? SunIcon : EclipseIcon} />
      </IconButton>
    </ColorModeToggleTrigger>
  );
};

export const ColorModeToggleTrigger = (props: BoxProps) => {
  // Hooks
  const { colorMode, toggleColorMode } = useColorMode();

  // States (FSM: idle -> growing -> fading-out -> idle)
  const [transition, setTransition] = useState<{
    phase: "growing" | "fading-out";
    x: number;
    y: number;
    radius: number;
    nextBg: string;
  } | null>(null);

  const isTransitioning = transition !== null;

  // Handlers
  function handleClick(e: MouseEvent<HTMLDivElement>) {
    if (isTransitioning) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX || rect.left + rect.width / 2;
    const y = e.clientY || rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );
    const nextBg = colorMode === "light" ? "#09090b" : "#ffffff";

    setTransition({ phase: "growing", x, y, radius, nextBg });
  }

  function handleTransitionComplete() {
    if (!transition) return;
    if (transition.phase === "growing") {
      toggleColorMode();
      setTransition((prev) =>
        prev ? { ...prev, phase: "fading-out" } : null,
      );
      return;
    }
    setTransition(null);
  }

  return (
    <>
      <Box asChild onClick={handleClick} {...props} />

      {transition &&
        createPortal(
          <Box
            position={"fixed"}
            left={`${transition.x}px`}
            top={`${transition.y}px`}
            w={`${transition.radius * 2}px`}
            h={`${transition.radius * 2}px`}
            rounded={"full"}
            bg={transition.nextBg}
            pointerEvents={"none"}
            zIndex={99999}
            animation={
              transition.phase === "growing"
                ? `${growCircle} ${GROW_DURATION_MS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`
                : `${fadeOutCircle} ${FADE_OUT_DURATION_MS}ms ease-out forwards`
            }
            onAnimationEnd={handleTransitionComplete}
          />,
          document.body,
        )}
    </>
  );
};
