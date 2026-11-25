// src/design-system/components/input/currency-input/currency-input.test.tsx

import { CurrencyInput } from "@/design-system/components/input/currency-input/currency-input";
import { useExchangeRate } from "@/design-system/hooks/use-exchange-rate";
import { renderWithSystem } from "@/test/render";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, renderHook, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";

const AXE_OPTIONS = { rules: { "color-contrast": { enabled: false } } };

function type(input: HTMLElement, text: string) {
  fireEvent.change(input, { target: { value: text, selectionStart: text.length } });
}

describe("CurrencyInput", () => {
  it("shows the Rp symbol and groups digits while typing", () => {
    const onValueChange = vi.fn();
    renderWithSystem(<CurrencyInput aria-label={"Harga"} onValueChange={onValueChange} />);
    const input = screen.getByRole("textbox", { name: "Harga" });

    expect(screen.getByText("Rp")).toBeInTheDocument();
    type(input, "1500000");
    expect(input).toHaveValue("1.500.000");
    expect(onValueChange).toHaveBeenLastCalledWith(1500000);
  });

  it("expands shorthand and clamps to max on blur", () => {
    const onValueChange = vi.fn();
    renderWithSystem(
      <CurrencyInput aria-label={"Harga"} max={2000000} onValueChange={onValueChange} />,
    );
    const input = screen.getByRole("textbox", { name: "Harga" });

    fireEvent.focus(input);
    type(input, "1,5jt");
    expect(onValueChange).toHaveBeenLastCalledWith(1500000);
    fireEvent.blur(input);
    expect(input).toHaveValue("1.500.000");

    fireEvent.focus(input);
    type(input, "5jt");
    fireEvent.blur(input);
    expect(input).toHaveValue("2.000.000");
    expect(onValueChange).toHaveBeenLastCalledWith(2000000);
  });

  it("emits null when cleared", () => {
    const onValueChange = vi.fn();
    renderWithSystem(
      <CurrencyInput aria-label={"Harga"} defaultValue={5000} onValueChange={onValueChange} />,
    );
    const input = screen.getByRole("textbox", { name: "Harga" });
    expect(input).toHaveValue("5.000");
    type(input, "");
    expect(onValueChange).toHaveBeenLastCalledWith(null);
  });

  it("follows the controlled value and shows a conversion", async () => {
    const { container, rerender } = renderWithSystem(
      <CurrencyInput
        aria-label={"Harga"}
        value={1500000}
        conversion={{ to: "USD", rate: 0.000054823, rateDate: "2026-11-24" }}
      />,
    );
    const input = screen.getByRole("textbox", { name: "Harga" });
    expect(input).toHaveValue("1.500.000");
    expect(screen.getByText(/US\$82,23/)).toBeInTheDocument();
    expect(input).toHaveAccessibleDescription(/US\$82,23/);

    rerender(<CurrencyInput aria-label={"Harga"} value={250000} />);
    expect(input).toHaveValue("250.000");
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  });
});

describe("useExchangeRate", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  function wrapper({ children }: { children: ReactNode }) {
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
  }

  it("reads Frankfurter and caches the result", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ date: "2026-11-24", base: "IDR", quote: "USD", rate: 0.000054823 })),
    );
    const { result } = renderHook(() => useExchangeRate("IDR", "USD"), { wrapper });

    await waitFor(() => expect(result.current.conversion).toBeDefined());
    expect(result.current.conversion).toEqual({ to: "USD", rate: 0.000054823, rateDate: "2026-11-24" });
    expect(fetchMock.mock.calls[0][0]).toBe("https://api.frankfurter.dev/v2/rate/idr/usd");
    expect(localStorage.getItem("exium:exchange-rate:IDR-USD")).toContain("0.000054823");
  });

  it("falls back to currency-api when Frankfurter fails", async () => {
    vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(new Response("down", { status: 503 }))
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ date: "2026-11-24", idr: { usd: 0.0000548 } })),
      );
    const { result } = renderHook(() => useExchangeRate("IDR", "USD"), { wrapper });

    await waitFor(() => expect(result.current.conversion?.rate).toBe(0.0000548));
  });

  it("does not fetch for the same currency", () => {
    const fetchMock = vi.spyOn(globalThis, "fetch");
    const { result } = renderHook(() => useExchangeRate("IDR", "idr"), { wrapper });
    expect(result.current.conversion).toBeUndefined();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
