// src/design-system/components/overlay/tooltip/tooltip.test.tsx

import { Tooltip } from "@/design-system/components/overlay/tooltip/tooltip";
import { renderWithSystem } from "@/test/render";
import { act, fireEvent, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

const touch = { pointerType: "touch", pointerId: 1, isPrimary: true };

describe("Tooltip on touch devices", () => {
  it("opens on long-press, hides itself, and does not trigger the action", async () => {
    const onClick = vi.fn();
    renderWithSystem(
      <Tooltip content={"Pindai QR"}>
        <button onClick={onClick}>{"QR"}</button>
      </Tooltip>,
    );
    const trigger = screen.getByRole("button", { name: "QR" });

    fireEvent.pointerDown(trigger, touch);
    await act(async () => {
      vi.advanceTimersByTime(600);
    });
    expect(screen.getByText("Pindai QR")).toBeInTheDocument();

    fireEvent.pointerUp(trigger, touch);
    fireEvent.click(trigger);
    expect(onClick).not.toHaveBeenCalled();

    await act(async () => {
      vi.advanceTimersByTime(2000);
    });
    expect(trigger).toHaveAttribute("data-state", "closed");
  });

  it("still runs the action on a normal tap", async () => {
    const onClick = vi.fn();
    renderWithSystem(
      <Tooltip content={"Pindai QR"}>
        <button onClick={onClick}>{"QR"}</button>
      </Tooltip>,
    );
    const trigger = screen.getByRole("button", { name: "QR" });

    fireEvent.pointerDown(trigger, touch);
    await act(async () => {
      vi.advanceTimersByTime(100);
    });
    fireEvent.pointerUp(trigger, touch);
    fireEvent.click(trigger);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByText("Pindai QR")).not.toBeInTheDocument();
  });
});
