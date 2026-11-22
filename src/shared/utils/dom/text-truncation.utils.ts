// src/shared/utils/dom/text-truncation.utils.ts

/**
 * Checks whether an element's text content is truncated (overflowed).
 */
export function isTextTruncated(element: HTMLElement | null): boolean {
  if (!element) return false;
  return (
    element.scrollWidth > element.clientWidth ||
    element.scrollHeight > element.clientHeight
  );
}

