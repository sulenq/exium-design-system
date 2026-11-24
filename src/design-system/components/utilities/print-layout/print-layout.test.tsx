// src/design-system/components/utilities/print-layout/print-layout.test.tsx

import { PrintLayout, usePrint } from "@/design-system/components/utilities/print-layout/print-layout";
import {
  buildPageCss,
  PRINT_ROOT_ID,
} from "@/design-system/components/utilities/print-layout/print-layout.utils";
import { renderWithSystem } from "@/test/render";
import { act, renderHook, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("buildPageCss", () => {
  it.each([
    ["A4", "portrait", undefined, "@page { size: 210mm 297mm; margin: 10mm; }"],
    ["A4", "landscape", undefined, "@page { size: 297mm 210mm; margin: 10mm; }"],
    ["A6", "portrait", "4mm", "@page { size: 105mm 148mm; margin: 4mm; }"],
    ["label-50x30", "landscape", undefined, "@page { size: 50mm 30mm; margin: 1.5mm; }"],
    ["receipt-58", "portrait", undefined, "@page { size: 58mm auto; margin: 2mm; }"],
    ["receipt-80", "portrait", undefined, "@page { size: 80mm auto; margin: 3mm; }"],
  ] as const)("%s %s", (size, orientation, margin, expected) => {
    expect(buildPageCss(size, orientation, margin)).toBe(expected);
  });
});

describe("PrintLayout", () => {
  it("renders into the print root, sets @page, and cleans up", () => {
    const { unmount } = renderWithSystem(
      <PrintLayout pageSize={"A6"} columns={2}>
        <div>{"TQ-0001"}</div>
        <div>{"TQ-0002"}</div>
      </PrintLayout>,
    );
    const root = document.getElementById(PRINT_ROOT_ID);
    expect(root).not.toBeNull();
    expect(root).toHaveTextContent("TQ-0001");
    expect(document.getElementById("exium-print-page")?.textContent).toContain("105mm 148mm");
    expect(document.getElementById("exium-print-base")?.textContent).toContain("@media print");

    unmount();
    expect(root).not.toHaveTextContent("TQ-0001");
    expect(document.getElementById("exium-print-page")).toBeNull();
  });

  it("shows a paper preview on screen when asked", () => {
    renderWithSystem(
      <PrintLayout pageSize={"receipt-58"} preview={true}>
        <div>{"Struk"}</div>
      </PrintLayout>,
    );
    expect(screen.getByRole("img", { name: "Pratinjau cetak receipt-58" })).toHaveTextContent("Struk");
  });
});

describe("usePrint", () => {
  it("runs onBeforePrint, prints, and calls onAfterPrint", async () => {
    const order: string[] = [];
    const printSpy = vi.spyOn(window, "print").mockImplementation(() => order.push("print"));
    const onBeforePrint = vi.fn(async () => {
      order.push("before");
    });
    const onAfterPrint = vi.fn(() => order.push("after"));
    const { result } = renderHook(() => usePrint({ onBeforePrint, onAfterPrint }));

    await act(async () => {
      await result.current.print();
    });
    expect(printSpy).toHaveBeenCalledTimes(1);
    expect(result.current.isPrinting).toBe(true);

    act(() => {
      window.dispatchEvent(new Event("afterprint"));
    });
    expect(order).toEqual(["before", "print", "after"]);
    expect(result.current.isPrinting).toBe(false);
  });
});
