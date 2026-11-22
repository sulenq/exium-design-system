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

// Module-level tracking for overlays opened through open() in this session
const openedByApp = new Set<string>();
// Per-key guard to prevent duplicate rapid closing of the same key
const keysCurrentlyClosing = new Set<string>();

export function usePopDisclosure(
  options: UsePopDisclosureOptions,
): UsePopDisclosureReturn {
  // Options
  const { modalKey, depth } = options;

  // Refs — stable references so callbacks have zero unstable dependencies
  const modalKeyRef = useRef(modalKey);
  const depthRef = useRef(depth);

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

  // Item 4: Manage body scroll/pointer cleanup safely per-instance
  const wasOpenRef = useRef(false);

  // Matches either exact key OR nested child key (separated by dot '.')
  const isOpen = useMemo(() => {
    if (typeof activeOverlayKey !== "string") return false;

    return (
      activeOverlayKey === modalKey || activeOverlayKey.startsWith(`${modalKey}.`)
    );
  }, [modalKey, activeOverlayKey]);

  useEffect(() => {
    if (wasOpenRef.current && !isOpen) {
      document.body.style.overflow = "";
      document.body.style.pointerEvents = "";
    }
    wasOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (wasOpenRef.current) {
        document.body.style.overflow = "";
        document.body.style.pointerEvents = "";
      }
    };
  }, []);

  // Clear keysCurrentlyClosing on activeOverlayKey change
  useEffect(() => {
    keysCurrentlyClosing.clear();
  }, [activeOverlayKey]);

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

      openedByApp.add(targetKey);

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
    const currentKey = modalKeyRef.current;
    if (keysCurrentlyClosing.has(currentKey)) {
      return;
    }

    keysCurrentlyClosing.add(currentKey);

    const d = depthRef.current;
    const effectiveDepth = d && d > 1 ? d : 1;

    // Check if every key being closed is tracked in openedByApp
    // If activeOverlayKey matches currentKey or is a child of currentKey
    const targetKey = activeOverlayKey;
    const isTargetOpenedByApp =
      typeof targetKey === "string" && openedByApp.has(targetKey);

    if (isTargetOpenedByApp) {
      if (typeof targetKey === "string") {
        openedByApp.delete(targetKey);
      }
      if (effectiveDepth > 1) {
        window.history.go(-effectiveDepth);
      } else {
        window.history.back();
      }
      return;
    }

    // Otherwise (deep link, refresh, direct URL, or not opened via open()):
    // Navigate with overlay param removed (or reduced to parent key if nested)
    let nextOverlayKey: string | undefined;
    if (typeof activeOverlayKey === "string") {
      openedByApp.delete(activeOverlayKey);
      if (activeOverlayKey.startsWith(`${currentKey}.`)) {
        // We are closing currentKey while active is a child, or currentKey itself is being closed
        nextOverlayKey = undefined;
      } else if (currentKey.includes(".")) {
        // currentKey is a child (e.g. parent.child)
        const lastDot = currentKey.lastIndexOf(".");
        nextOverlayKey = currentKey.substring(0, lastDot);
      } else {
        nextOverlayKey = undefined;
      }
    }

    void navigate({
      to: ".",
      replace: true,
      resetScroll: false,
      search: (old) => {
        const next = { ...old };
        if (nextOverlayKey) {
          next[OVERLAY_SEARCH_PARAM_KEY] = nextOverlayKey;
        } else {
          delete (next as Record<string, unknown>)[OVERLAY_SEARCH_PARAM_KEY];
        }
        delete (next as Record<string, unknown>).activeModalKey;
        return next;
      },
    }).finally(() => {
      keysCurrentlyClosing.delete(currentKey);
    });
  }, [activeOverlayKey, navigate]);

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
