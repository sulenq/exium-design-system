// src/design-system/components/toast/core/toast.manager.test.ts

import { toast, toastTimerControls } from "@/design-system/components/toast/core/toast.manager";
import { useToastVisibleStore } from "@/design-system/components/toast/stores/toast-visible.store";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const find = (id: string) => useToastVisibleStore.getState().find(id);

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  toast.removeAll();
  vi.useRealTimers();
});

describe("variant durations", () => {
  it("gives error, warning and success their own default duration", () => {
    expect(find(toast.error("x"))?.duration).toBe(10000);
    expect(find(toast.warning("x"))?.duration).toBe(8000);
    expect(find(toast.success("x"))?.duration).toBe(4000);
    expect(find(toast.info("x"))?.duration).toBe(5000);
    expect(find(toast.loading("x"))?.duration).toBeNull();
  });

  it("lets an explicit duration win", () => {
    expect(find(toast.error("x", { duration: 1000 }))?.duration).toBe(1000);
  });
});

describe("update", () => {
  it("recreates a toast that was already removed", () => {
    const id = toast.loading("Menyimpan…");
    toast.remove(id);
    toast.update(id, { variant: "success", title: "Tersimpan" });
    expect(find(id)?.variant).toBe("success");
  });

  it("revives a toast that is mid-exit", () => {
    const id = toast.info("x");
    toast.close(id);
    expect(find(id)?.status).toBe("leaving");
    toast.update(id, { title: "y" });
    vi.advanceTimersByTime(1000);
    expect(find(id)?.status).not.toBe("leaving");
    expect(find(id)).toBeDefined();
  });

  it("keeps a paused toast paused", () => {
    const id = toast.info("x");
    toastTimerControls.pauseTimer(id);
    toast.update(id, { title: "y" });
    expect(find(id)?.paused).toBe(true);
    vi.advanceTimersByTime(60000);
    expect(find(id)).toBeDefined();
  });
});

describe("callback isolation", () => {
  it("does not let a throwing onShow block the toast", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const id = toast.info("x", {
      onShow: () => {
        throw new Error("boom");
      },
    });
    expect(find(id)).toBeDefined();
    spy.mockRestore();
  });

  it("still removes the toast when onClose throws", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const id = toast.info("x", {
      onClose: () => {
        throw new Error("boom");
      },
    });
    toast.close(id);
    vi.advanceTimersByTime(1000);
    expect(find(id)).toBeUndefined();
    spy.mockRestore();
  });
});
