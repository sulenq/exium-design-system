// src/design-system/hooks/types/use-bounce-drag.type.ts

import type { PointerEvent as ReactPointerEvent, RefObject } from "react";

export type UseBounceDragDirections = {
  left?: boolean;
  right?: boolean;
  up?: boolean;
  down?: boolean;
};

export type UseBounceDragOptions<T extends HTMLElement = HTMLElement> = {
  ref?: RefObject<T | null>;
  directions?: UseBounceDragDirections;
  maxOffset?: number;
  damping?: number;
  onHold?: (isHolding: boolean) => void;
};

export type UseBounceDragReturn<T extends HTMLElement = HTMLElement> = {
  ref: RefObject<T | null>;
  isHolding: boolean;
  isActive: boolean;
  handlePointerDown: (e: ReactPointerEvent<HTMLElement>) => void;
  handlePointerUp: () => void;
};
