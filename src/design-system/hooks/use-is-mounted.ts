// src/design-system/hooks/use-is-mounted.ts

import type { UseIsMountedOptions } from "@/design-system/hooks/types/use-is-mounted.type";
import { useEffect, useState } from "react";

export const useIsMounted = (
  options?: number | UseIsMountedOptions,
): boolean => {
  // Resolved Options
  const hasExplicitIsOpen =
    typeof options === "object" && options.isOpen !== undefined;

  const isOpen =
    typeof options === "object" ? (options.isOpen ?? true) : true;

  const mountDelay =
    typeof options === "number" ? options : (options?.mountDelay ?? 50);

  const unmountDelay =
    typeof options === "object" ? (options?.unmountDelay ?? 0) : 0;

  // States
  const [isMounted, setIsMounted] = useState<boolean>(() => {
    if (hasExplicitIsOpen) {
      return Boolean(isOpen);
    }
    return false;
  });

  // Effects
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    if (isOpen) {
      timer = setTimeout(
        () => {
          setIsMounted(true);
        },
        Math.max(0, mountDelay),
      );
    } else {
      timer = setTimeout(
        () => {
          setIsMounted(false);
        },
        Math.max(0, unmountDelay),
      );
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isOpen, mountDelay, unmountDelay]);

  return isMounted;
};

// Deprecated alias for backwards compatibility
export const useMountTimeout = useIsMounted;
