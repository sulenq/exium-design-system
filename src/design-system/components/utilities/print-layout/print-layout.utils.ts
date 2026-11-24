// src/design-system/components/utilities/print-layout/print-layout.utils.ts

import type {
  PrintPageSize,
  PrintPageSpec,
} from "@/design-system/components/utilities/print-layout/print-layout.type";

export const PRINT_PAGE_SIZES: Record<PrintPageSize, PrintPageSpec> = {
  A4: { widthMm: 210, heightMm: 297, marginMm: 10 },
  A6: { widthMm: 105, heightMm: 148, marginMm: 6 },
  "label-50x30": { widthMm: 50, heightMm: 30, marginMm: 1.5 },
  // Thermal receipts: continuous paper, so no fixed height
  "receipt-58": { widthMm: 58, heightMm: null, marginMm: 2 },
  "receipt-80": { widthMm: 80, heightMm: null, marginMm: 3 },
};

export const PRINT_ROOT_ID = "exium-print-root";
const PRINT_BASE_STYLE_ID = "exium-print-base";
const PRINT_PAGE_STYLE_ID = "exium-print-page";

/** CSS for `@page`, e.g. "@page { size: 297mm 210mm; margin: 10mm; }". */
export function buildPageCss(
  pageSize: PrintPageSize,
  orientation: "portrait" | "landscape",
  margin?: string,
): string {
  const spec = PRINT_PAGE_SIZES[pageSize];
  const isFixed = spec.heightMm !== null && (pageSize === "A4" || pageSize === "A6");
  const rotate = isFixed && orientation === "landscape";
  const width = rotate ? spec.heightMm : spec.widthMm;
  const height = rotate ? spec.widthMm : spec.heightMm;
  const size = height === null ? `${width}mm auto` : `${width}mm ${height}mm`;
  return `@page { size: ${size}; margin: ${margin ?? `${spec.marginMm}mm`}; }`;
}

/** Hide the app and show only the print root while printing. Installed once. */
export function ensurePrintBaseStyle() {
  if (document.getElementById(PRINT_BASE_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = PRINT_BASE_STYLE_ID;
  style.textContent = `
@media screen { #${PRINT_ROOT_ID} { display: none !important; } }
@media print {
  body > *:not(#${PRINT_ROOT_ID}) { display: none !important; }
  #${PRINT_ROOT_ID} { display: block !important; }
  #${PRINT_ROOT_ID} * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}`;
  document.head.appendChild(style);
}

export function getPrintRoot(): HTMLElement {
  let root = document.getElementById(PRINT_ROOT_ID);
  if (!root) {
    root = document.createElement("div");
    root.id = PRINT_ROOT_ID;
    document.body.appendChild(root);
  }
  return root;
}

/** Set the active @page rule; returns a cleanup that removes it. */
export function setPageStyle(css: string): () => void {
  let style = document.getElementById(PRINT_PAGE_STYLE_ID) as HTMLStyleElement | null;
  if (!style) {
    style = document.createElement("style");
    style.id = PRINT_PAGE_STYLE_ID;
    document.head.appendChild(style);
  }
  style.textContent = css;
  const owned = style;
  return () => {
    if (owned.textContent === css) owned.remove();
  };
}
