// src/design-system/components/utilities/print-layout/print-layout.tsx

"use client";

import { Box } from "@/design-system/components/layout/box/box";
import type {
  PrintLayoutProps,
  UsePrintOptions,
  UsePrintResult,
} from "@/design-system/components/utilities/print-layout/print-layout.type";
import {
  buildPageCss,
  ensurePrintBaseStyle,
  getPrintRoot,
  PRINT_PAGE_SIZES,
  setPageStyle,
} from "@/design-system/components/utilities/print-layout/print-layout.utils";
import { t } from "@/shared/libs/i18n";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

/**
 * Print-only content with a real paper size (CSS @page). The content is rendered into a
 * dedicated print root, so the rest of the screen never prints. Pair it with `usePrint`.
 *
 * @example
 * const { print } = usePrint();
 * <PrintLayout pageSize={"A4"} columns={3}>{eartags.map(...)}</PrintLayout>
 * <Button onClick={print}>Cetak QR</Button>
 */
export const PrintLayout = (props: PrintLayoutProps) => {
  // Props
  const {
    pageSize = "A4",
    orientation = "portrait",
    columns = 1,
    gap = "4mm",
    margin,
    preview = false,
    children,
  } = props;

  // States
  // The print root lives outside React; creating it is idempotent, so the initializer is safe
  const [root] = useState<HTMLElement | null>(() => {
    if (typeof document === "undefined") return null;
    ensurePrintBaseStyle();
    return getPrintRoot();
  });

  // Derived Values
  const spec = PRINT_PAGE_SIZES[pageSize];
  const isLandscape = orientation === "landscape" && spec.heightMm !== null;
  const paperWidthMm = isLandscape ? (spec.heightMm ?? spec.widthMm) : spec.widthMm;
  const paperHeightMm = isLandscape ? spec.widthMm : spec.heightMm;
  const pageMargin = margin ?? `${spec.marginMm}mm`;

  // Effects
  useEffect(
    () => setPageStyle(buildPageCss(pageSize, orientation, margin)),
    [pageSize, orientation, margin],
  );

  const grid = (
    <PrintGrid columns={columns} gap={gap}>
      {children}
    </PrintGrid>
  );

  return (
    <>
      {root && createPortal(grid, root)}
      {preview && (
        <Box
          role={"img"}
          aria-label={t["print_layout.preview_label"]({ size: pageSize })}
          w={`${paperWidthMm}mm`}
          minH={paperHeightMm ? `${paperHeightMm}mm` : undefined}
          maxW={"full"}
          p={pageMargin}
          bg={"white"}
          color={"black"}
          boxShadow={"md"}
          border={"1px solid"}
          borderColor={"border.subtle"}
          overflow={"hidden"}
        >
          {grid}
        </Box>
      )}
    </>
  );
};

const PrintGrid = (props: { columns: number; gap: string; children: ReactNode }) => {
  // Props
  const { columns, gap, children } = props;

  return (
    <Box
      display={"grid"}
      gridTemplateColumns={`repeat(${columns}, minmax(0, 1fr))`}
      gap={gap}
      css={{ "& > *": { breakInside: "avoid", pageBreakInside: "avoid" } }}
    >
      {children}
    </Box>
  );
};

/**
 * Open the print dialog for the mounted PrintLayout. `onBeforePrint` can be async (load
 * data, wait for QR images); `onAfterPrint` runs when the dialog closes.
 */
export function usePrint(options?: UsePrintOptions): UsePrintResult {
  // Props
  const onBeforePrint = options?.onBeforePrint;
  const onAfterPrint = options?.onAfterPrint;

  // States
  const [isPrinting, setIsPrinting] = useState(false);

  // Refs
  const afterRef = useRef(onAfterPrint);

  // Effects
  useEffect(() => {
    afterRef.current = onAfterPrint;
  }, [onAfterPrint]);

  useEffect(() => {
    const handleAfter = () => {
      setIsPrinting(false);
      afterRef.current?.();
    };
    window.addEventListener("afterprint", handleAfter);
    return () => window.removeEventListener("afterprint", handleAfter);
  }, []);

  // Handlers
  const print = useCallback(async () => {
    setIsPrinting(true);
    try {
      await onBeforePrint?.();
      // Let React flush content rendered by onBeforePrint before the snapshot
      await new Promise((resolve) => requestAnimationFrame(() => resolve(undefined)));
      window.print();
    } catch (error) {
      setIsPrinting(false);
      throw error;
    }
  }, [onBeforePrint]);

  return { print, isPrinting };
}
