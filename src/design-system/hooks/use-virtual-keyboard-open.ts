// src/design-system/hooks/use-virtual-keyboard-open.ts

import { useEffect, useState } from "react";

// A visual viewport shorter than the layout viewport by more than this is treated
// as an open on-screen keyboard (browser toolbars stay well below this).
const KEYBOARD_THRESHOLD_PX = 150;

/** Whether the on-screen keyboard is likely open, based on the Visual Viewport API. */
export function useVirtualKeyboardOpen(): boolean {
  // States
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const viewport = typeof window !== "undefined" ? window.visualViewport : null;
    if (!viewport) return;

    const handleResize = () => {
      setIsOpen(window.innerHeight - viewport.height > KEYBOARD_THRESHOLD_PX);
    };

    handleResize();
    viewport.addEventListener("resize", handleResize);
    return () => viewport.removeEventListener("resize", handleResize);
  }, []);

  return isOpen;
}
