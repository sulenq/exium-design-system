import "@testing-library/jest-dom/vitest";
import * as axeMatchers from "vitest-axe/matchers";
import { expect } from "vitest";

expect.extend(axeMatchers);


// -------------------------------------------------------------------------------------
// jsdom gaps that Chakra / Ark UI rely on
// -------------------------------------------------------------------------------------

if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
}

if (!globalThis.ResizeObserver) {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
}

if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {};
}

// jsdom has no PointerEvent: without it, fireEvent.pointerDown drops pointerType
if (!globalThis.PointerEvent) {
  class PointerEventPolyfill extends MouseEvent {
    pointerType: string;
    pointerId: number;
    isPrimary: boolean;
    constructor(type: string, init: PointerEventInit = {}) {
      super(type, init);
      this.pointerType = init.pointerType ?? "mouse";
      this.pointerId = init.pointerId ?? 0;
      this.isPrimary = init.isPrimary ?? true;
    }
  }
  globalThis.PointerEvent = PointerEventPolyfill as unknown as typeof PointerEvent;
}
