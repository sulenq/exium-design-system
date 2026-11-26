// src/test/components.a11y.test.tsx

import { Button } from "@/design-system/components/button/button/button";
import { DatePicker } from "@/design-system/components/input/date-picker/date-picker";
import { Input } from "@/design-system/components/input/input/input";
import { Field } from "@/design-system/components/input/field/field";
import { PinInput } from "@/design-system/components/input/pin-input/pin-input";
import { Snackbar } from "@/design-system/components/navigation/snackbar/snackbar";
import { Badge } from "@/design-system/components/typography/badge/badge";
import { renderWithSystem } from "@/test/render";
import { fireEvent, screen } from "@testing-library/react";
import { HouseIcon, ListIcon, ScanIcon, UserIcon } from "@phosphor-icons/react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";

// axe's color-contrast rule needs real layout, which jsdom does not have
const AXE_OPTIONS = { rules: { "color-contrast": { enabled: false } } };

describe("Button", () => {
  it("has no axe violations", async () => {
    const { container } = renderWithSystem(<Button>{"Simpan"}</Button>);
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  });
});

describe("Badge status", () => {
  it("renders the status icon by default and hides it on request", () => {
    const { container, rerender } = renderWithSystem(
      <Badge status={"locked"}>{"Terkunci"}</Badge>,
    );
    expect(container.querySelector("svg")).not.toBeNull();
    rerender(
      <Badge status={"locked"} withStatusIcon={false}>
        {"Terkunci"}
      </Badge>,
    );
    expect(container.querySelector("svg")).toBeNull();
  });
});

describe("Field locked", () => {
  it("marks the field read-only and shows the lock notice", async () => {
    const { container } = renderWithSystem(
      <Field label={"NIK"} locked={true} variant={"default"}>
        <Input defaultValue={"3374"} />
      </Field>,
    );
    expect(container.querySelector("[data-locked]")).not.toBeNull();
    expect(screen.getByRole("textbox")).toHaveAttribute("readonly");
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  });
});

describe("PinInput", () => {
  it("uses one-time-code autocomplete unless masked", () => {
    const { container, rerender } = renderWithSystem(<PinInput count={4} />);
    const first = () => container.querySelector("[data-part=input]");
    expect(first()).toHaveAttribute("autocomplete", "one-time-code");
    rerender(<PinInput count={4} mask={true} />);
    expect(first()).not.toHaveAttribute("autocomplete", "one-time-code");
  });

  it("announces the real number of slots", () => {
    const { container } = renderWithSystem(<PinInput count={6} />);
    expect(container.querySelector("[data-part=input]")).toHaveAttribute(
      "aria-label",
      expect.stringContaining("6"),
    );
  });
});

describe("Snackbar", () => {
  const items = [
    { key: "home", label: "Beranda", icon: HouseIcon },
    { key: "list", label: "Ternak", icon: ListIcon },
    { key: "profile", label: "Profil", icon: UserIcon },
  ];

  it("is a labelled nav that marks the active item and selects on click", async () => {
    const onSelect = vi.fn();
    const { container } = renderWithSystem(
      <Snackbar
        items={items}
        activeKey={"home"}
        onSelect={onSelect}
        centerAction={{ icon: ScanIcon, label: "Scan", onClick: () => {} }}
      />,
    );
    expect(screen.getByRole("navigation")).toHaveAccessibleName();
    expect(screen.getByRole("button", { name: /Beranda/ })).toHaveAttribute(
      "aria-current",
      "page",
    );
    fireEvent.click(screen.getByRole("button", { name: /Ternak/ }));
    expect(onSelect).toHaveBeenCalledWith("list");
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  });
});

describe("DatePicker", () => {
  it("moves focus with the arrow keys and skips nothing inside the month", () => {
    const { container } = renderWithSystem(
      <DatePicker defaultValue={"2026-12-10"} />,
    );
    const day = (iso: string) =>
      container.querySelector<HTMLElement>(`[data-iso="${iso}"]`);
    const start = day("2026-12-10");
    expect(start).toHaveAttribute("tabindex", "0");
    start?.focus();
    fireEvent.keyDown(start as HTMLElement, { key: "ArrowRight" });
    expect(document.activeElement).toBe(day("2026-12-11"));
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: "ArrowDown" });
    expect(document.activeElement).toBe(day("2026-12-18"));
  });

  it("disables days outside availableDates", () => {
    const { container } = renderWithSystem(
      <DatePicker
        defaultValue={"2026-12-10"}
        availableDates={{ start: "2026-12-05", end: "2026-12-20" }}
      />,
    );
    expect(container.querySelector('[data-iso="2026-12-04"]')).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    expect(
      container.querySelector('[data-iso="2026-12-12"]'),
    ).not.toHaveAttribute("aria-disabled", "true");
  });
});
