// src/shared/constants/styles.ts

export const CLICKY_STYLE_PROPS = {
  transition: "scale 120ms cubic-bezier(0.22, 1, 0.36, 1)",
  _active: {
    scale: "var(--clicky-scale, 0.95)",
  },
} as const;

export function applyClickyScale(el: HTMLElement, clicky = true) {
  if (!clicky) return;
  const width = el.offsetWidth;
  if (width <= 0) return;
  const scale = Math.max(0.95, 1 - 3 / width);
  el.style.setProperty("--clicky-scale", scale.toFixed(4));
}
