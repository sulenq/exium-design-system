// src/design-system/components/overlay/hooks/use-pop-disclosure.ts

import type {
  UsePopDisclosureOptions,
  UsePopDisclosureReturn,
} from "@/design-system/components/overlay/modal/modal.type";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef } from "react";

export const MODAL_SEARCH_PARAM_KEY = "activeModalKey";

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

  // Select only activeModalKey — component re-renders only when this specific
  // param changes, not on any other search param mutation
  const activeModalKey = useSearch({
    strict: false,
    select: (s) =>
      (s as Record<string, unknown>)?.activeModalKey as string | undefined,
  });

  const navigate = useNavigate();

  // Manage body scroll/pointer cleanup when modal is unmounted
  useEffect(() => {
    if (!activeModalKey) {
      document.body.style.overflow = "";
      document.body.style.pointerEvents = "";
    }
  }, [activeModalKey]);

  // Matches either exact key OR nested child key (separated by dot '.')
  const isOpen = useMemo(() => {
    if (typeof activeModalKey !== "string") return false;

    return (
      activeModalKey === modalKey || activeModalKey.startsWith(`${modalKey}.`)
    );
  }, [modalKey, activeModalKey]);

  // Helper function to check if any specific key is currently active
  const isKeyOpen = useCallback(
    (checkKey: string): boolean => {
      if (typeof activeModalKey !== "string") return false;
      return (
        activeModalKey === checkKey || activeModalKey.startsWith(`${checkKey}.`)
      );
    },
    [activeModalKey],
  );

  const open = useCallback(
    (subKey?: string) => {
      const targetKey = subKey
        ? `${modalKeyRef.current}.${subKey}`
        : modalKeyRef.current;
      navigate({
        to: ".",
        resetScroll: false,
        search: (old) => ({ ...old, activeModalKey: targetKey }),
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
    activeKey: activeModalKey,
    open,
    toggle,
    close,
    isKeyOpen,
    depth,
  };
}

// Deprecated alias for backwards compatibility
export const usePopModal = usePopDisclosure;
