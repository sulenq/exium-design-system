// src/design-system/components/overlay/hooks/use-pop-disclosure.ts

import type {
  UsePopDisclosureOptions,
  UsePopDisclosureReturn,
} from "@/design-system/components/overlay/modal/modal.type";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef } from "react";

export const OVERLAY_SEARCH_PARAM_KEY = "overlay";
/**
 * @deprecated Use OVERLAY_SEARCH_PARAM_KEY ("overlay") instead.
 */
export const MODAL_SEARCH_PARAM_KEY = OVERLAY_SEARCH_PARAM_KEY;

export function usePopDisclosure(
  options: UsePopDisclosureOptions,
): UsePopDisclosureReturn {
  // Options
  const { modalKey, depth } = options;

  // Refs — stable references so callbacks have zero unstable dependencies
  const modalKeyRef = useRef(modalKey);
  const depthRef = useRef(depth);
  const lastCloseAtRef = useRef(0);

  useEffect(() => {
    modalKeyRef.current = modalKey;
    depthRef.current = depth;
  }, [modalKey, depth]);

  // Select only overlay (with activeModalKey fallback for legacy links)
  const activeOverlayKey = useSearch({
    strict: false,
    select: (s) => {
      const state = s as Record<string, unknown> | undefined;
      return (state?.overlay ?? state?.activeModalKey) as string | undefined;
    },
  });

  const navigate = useNavigate();

  // Manage body scroll/pointer cleanup when overlay is closed
  useEffect(() => {
    if (!activeOverlayKey) {
      document.body.style.overflow = "";
      document.body.style.pointerEvents = "";
    }
  }, [activeOverlayKey]);

  // Matches either exact key OR nested child key (separated by dot '.')
  const isOpen = useMemo(() => {
    if (typeof activeOverlayKey !== "string") return false;

    return (
      activeOverlayKey === modalKey || activeOverlayKey.startsWith(`${modalKey}.`)
    );
  }, [modalKey, activeOverlayKey]);

  // Helper function to check if any specific key is currently active
  const isKeyOpen = useCallback(
    (checkKey: string): boolean => {
      if (typeof activeOverlayKey !== "string") return false;
      return (
        activeOverlayKey === checkKey ||
        activeOverlayKey.startsWith(`${checkKey}.`)
      );
    },
    [activeOverlayKey],
  );

  const open = useCallback(
    (subKey?: string) => {
      const targetKey = subKey
        ? `${modalKeyRef.current}.${subKey}`
        : modalKeyRef.current;
      navigate({
        to: ".",
        resetScroll: false,
        search: (old) => {
          const next = { ...old, [OVERLAY_SEARCH_PARAM_KEY]: targetKey };
          delete (next as Record<string, unknown>).activeModalKey;
          return next;
        },
      });
    },
    [navigate],
  );

  const close = useCallback(() => {
    const now = Date.now();

    if (now - lastCloseAtRef.current < 200) {
      return;
    }

    lastCloseAtRef.current = now;

    const d = depthRef.current;
    if (d && d > 1) {
      window.history.go(-d);
    } else {
      window.history.back();
    }
  }, []);

  const toggle = useCallback(() => {
    if (isOpen) {
      close();
      return;
    }
    open();
  }, [isOpen, close, open]);

  return {
    modalKey,
    isOpen,
    activeKey: activeOverlayKey,
    open,
    toggle,
    close,
    isKeyOpen,
    depth,
  };
}

// Deprecated alias for backwards compatibility
export const usePopModal = usePopDisclosure;
