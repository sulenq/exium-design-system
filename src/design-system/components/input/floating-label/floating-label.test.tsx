// src/design-system/components/input/floating-label/floating-label.test.tsx

import { Field } from "@/design-system/components/input/field/field";
import { Input } from "@/design-system/components/input/input/input";
import { NumberInput } from "@/design-system/components/input/number-input/number-input";
import { PasswordInput } from "@/design-system/components/input/password-input/password-input";
import { Textarea } from "@/design-system/components/input/textarea/textarea";
import { renderWithSystem } from "@/test/render";
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

const AXE_OPTIONS = { rules: { "color-contrast": { enabled: false } } };

describe("floating label", () => {
  it.each([
    ["Input", <Input key={"i"} />, "textbox"],
    ["Textarea", <Textarea key={"t"} />, "textbox"],
    ["NumberInput", <NumberInput key={"n"} />, "spinbutton"],
  ] as const)("gives %s an accessible name", async (_name, control, role) => {
    const { container } = renderWithSystem(
      <Field label={"Berat badan"} variant={"floating"}>
        {control}
      </Field>,
    );
    expect(screen.getByRole(role, { name: "Berat badan" })).toBeInTheDocument();
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  });

  it("gives PasswordInput an accessible name", () => {
    const { container } = renderWithSystem(
      <Field label={"Kata sandi"} variant={"floating"}>
        <PasswordInput />
      </Field>,
    );
    const input = container.querySelector("input[type=password]");
    expect(input).not.toBeNull();
    expect(screen.getByLabelText("Kata sandi")).toBe(input);
  });
});
