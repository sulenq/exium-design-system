// src/design-system/components/utilities/print-layout/print-layout.type.ts

import type { ReactNode } from "react";

export type PrintPageSize = "A4" | "A6" | "label-50x30" | "receipt-58" | "receipt-80";

export type PrintPageSpec = {
  /** Paper width and height in mm. Receipts have no fixed height. */
  widthMm: number;
  heightMm: number | null;
  /** Default margin in mm. */
  marginMm: number;
};

export type PrintLayoutProps = {
  /** Paper size, applied with CSS @page. Default "A4". */
  pageSize?: PrintPageSize;
  /** A4 and A6 only. Default "portrait". */
  orientation?: "portrait" | "landscape";
  /** Grid columns, e.g. 3 for a sheet of QR labels. Default 1. */
  columns?: number;
  /** Gap between grid cells, CSS length. Default "4mm". */
  gap?: string;
  /** Page margin, CSS length. Default per paper size. */
  margin?: string;
  /** Also show the content on screen as a paper preview. Default false. */
  preview?: boolean;
  children: ReactNode;
};

export type UsePrintOptions = {
  /** Runs before the print dialog opens; wait for data or images here. */
  onBeforePrint?: () => void | Promise<void>;
  /** Runs after the print dialog closes, printed or cancelled. */
  onAfterPrint?: () => void;
};

export type UsePrintResult = {
  print: () => Promise<void>;
  isPrinting: boolean;
};
