// src/design-system/hooks/use-ref-dimension.ts

import type { UseContainerDimensionOptions } from "@/design-system/hooks/types/use-ref-dimension.type";
import { useEffect, useRef, useState } from "react";

export function useRefDimension(
  ref: React.RefObject<HTMLElement | null>,
  options?: UseContainerDimensionOptions,
) {
  // Options
  const { active = true } = options ?? {};

  // States
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  // Refs
  const rafId = useRef<number | null>(null);

  // Effects
  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return;

    const updateDimensions = () => {
      const rect = el.getBoundingClientRect();
      setDimensions((prev) => {
        if (prev.width === rect.width && prev.height === rect.height) {
          return prev;
        }
        return {
          width: rect.width,
          height: rect.height,
        };
      });
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
      rafId.current = requestAnimationFrame(updateDimensions);
    });

    resizeObserver.observe(el);

    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
      resizeObserver.disconnect();
    };
  }, [ref, active]);

  return dimensions;
}
