// src/design-system/hooks/use-bounce-drag.ts

import type {
  UseBounceDragOptions,
  UseBounceDragReturn,
} from "@/design-system/hooks/types/use-bounce-drag.type";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

export function useBounceDrag<T extends HTMLElement = HTMLElement>(
  options: UseBounceDragOptions<T> = {},
): UseBounceDragReturn<T> {
  const {
    ref: externalRef,
    directions = {},
    maxOffset = 4,
    damping = 0.04,
    onHold,
  } = options;

  const { left = true, right = true, up = true, down = true } = directions;

  // Refs
  const internalRef = useRef<T | null>(null);
  const targetRef = externalRef ?? internalRef;
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);

  // States
  const [isHolding, setIsHolding] = useState(false);

  // Derived Values
  const isActive = isHolding;

  // Reset CSS Variables Helper
  const resetVars = useCallback(() => {
    const el = targetRef.current;
    if (!el) return;
    el.style.setProperty("--bounce-x", "0px");
    el.style.setProperty("--bounce-y", "0px");
  }, [targetRef]);

  // Handlers
  const handlePointerDown = useCallback(
    (e: ReactPointerEvent<HTMLElement>) => {
      if (e.button !== 0) return;
      pointerStartRef.current = { x: e.clientX, y: e.clientY };
      setIsHolding(true);
      onHold?.(true);
    },
    [onHold],
  );

  const handlePointerUp = useCallback(() => {
    pointerStartRef.current = null;
    setIsHolding(false);
    resetVars();
    onHold?.(false);
  }, [onHold, resetVars]);

  // Effects
  useEffect(() => {
    if (!isHolding) return;

    const handleGlobalPointerMove = (e: globalThis.PointerEvent) => {
      if (!pointerStartRef.current) return;
      const el = targetRef.current;
      if (!el) return;

      const rawDiffX = (e.clientX - pointerStartRef.current.x) * damping;
      const rawDiffY = (e.clientY - pointerStartRef.current.y) * damping;

      let clampedX = 0;
      if (rawDiffX > 0 && right) {
        clampedX = Math.min(maxOffset, rawDiffX);
      } else if (rawDiffX < 0 && left) {
        clampedX = Math.max(-maxOffset, rawDiffX);
      }

      let clampedY = 0;
      if (rawDiffY > 0 && down) {
        clampedY = Math.min(maxOffset, rawDiffY);
      } else if (rawDiffY < 0 && up) {
        clampedY = Math.max(-maxOffset, rawDiffY);
      }

      el.style.setProperty("--bounce-x", `${clampedX}px`);
      el.style.setProperty("--bounce-y", `${clampedY}px`);
    };

    const handleGlobalPointerUp = () => {
      pointerStartRef.current = null;
      setIsHolding(false);
      resetVars();
      onHold?.(false);
    };

    window.addEventListener("pointermove", handleGlobalPointerMove);
    window.addEventListener("pointerup", handleGlobalPointerUp);
    window.addEventListener("pointercancel", handleGlobalPointerUp);

    return () => {
      window.removeEventListener("pointermove", handleGlobalPointerMove);
      window.removeEventListener("pointerup", handleGlobalPointerUp);
      window.removeEventListener("pointercancel", handleGlobalPointerUp);
    };
  }, [
    isHolding,
    left,
    right,
    up,
    down,
    maxOffset,
    damping,
    targetRef,
    resetVars,
    onHold,
  ]);

  return {
    ref: targetRef,
    isHolding,
    isActive,
    handlePointerDown,
    handlePointerUp,
  };
}
