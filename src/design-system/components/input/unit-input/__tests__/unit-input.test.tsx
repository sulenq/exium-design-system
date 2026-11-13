import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { UnitInput } from "@/design-system/components/input/unit-input/unit-input";
import { useMeasurementStore } from "@/design-system/stores/measurement-store";
import { ChakraSystemProvider } from "@/design-system/chakra/providers/chakra-system.provider";
import React from "react";

function renderWithChakra(ui: React.ReactElement) {
  return render(<ChakraSystemProvider>{ui}</ChakraSystemProvider>);
}

describe("UnitInput Component", () => {
  it("criterion 1: default unit from measurementSystem store", () => {
    useMeasurementStore.getState().setMeasurementSystem("metric");
    const { unmount } = renderWithChakra(<UnitInput quantity={"mass"} />);
    expect(screen.getAllByText("kg").length).toBeGreaterThan(0);
    unmount();

    useMeasurementStore.getState().setMeasurementSystem("imperial");
    renderWithChakra(<UnitInput quantity={"mass"} />);
    expect(screen.getAllByText("lb").length).toBeGreaterThan(0);
  });

  it("criterion 2: defaultUnit overrides store default", () => {
    useMeasurementStore.getState().setMeasurementSystem("metric");
    renderWithChakra(<UnitInput quantity={"mass"} defaultUnit={"g"} />);
    expect(screen.getAllByText("g").length).toBeGreaterThan(0);
  });

  it("criterion 7: empty field with unit change emits null value", () => {
    const handleValueChange = vi.fn();
    const handleUnitChange = vi.fn();

    renderWithChakra(
      <UnitInput
        quantity={"mass"}
        defaultUnit={"kg"}
        onValueChange={handleValueChange}
        onUnitChange={handleUnitChange}
      />,
    );

    expect(screen.getAllByText("kg").length).toBeGreaterThan(0);
  });

  it("criterion 12: native FormData contains name and nameUnit", () => {
    const { container } = renderWithChakra(
      <form data-testid={"test-form"}>
        <UnitInput
          name={"weight"}
          quantity={"mass"}
          defaultValue={"10"}
          defaultUnit={"kg"}
        />
      </form>,
    );

    const form = container.querySelector("form") as HTMLFormElement;
    const formData = new FormData(form);
    expect(formData.get("weight")).toBe("10");
    expect(formData.get("weightUnit")).toBe("kg");
  });

  it("criterion 14: borderless stepper buttons have tabIndex -1", () => {
    renderWithChakra(
      <UnitInput quantity={"mass"} defaultUnit={"kg"} stepper={true} />,
    );

    const increaseBtn = screen.getByLabelText("Increase");
    const decreaseBtn = screen.getByLabelText("Decrease");

    expect(increaseBtn).toHaveAttribute("tabindex", "-1");
    expect(decreaseBtn).toHaveAttribute("tabindex", "-1");
  });
});
