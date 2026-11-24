// src/design-system/components/shell/common-app-shell/common-app-shell.test.tsx

import { CommonAppShell } from "@/design-system/components/shell/common-app-shell/common-app-shell";
import { renderWithSystem } from "@/test/render";
import { fireEvent, screen } from "@testing-library/react";
import { HomeIcon, ListIcon, ScanLineIcon } from "lucide-react";
import { afterEach, describe, expect, it, vi } from "vitest";

const NAV_ITEMS = [
  { key: "home", label: "Beranda", icon: HomeIcon },
  { key: "livestock", label: "Ternak", icon: ListIcon, badge: 3 },
];

function setViewportWidth(width: number) {
  Object.defineProperty(window, "innerWidth", { configurable: true, value: width });
  window.dispatchEvent(new Event("resize"));
}

afterEach(() => {
  setViewportWidth(1024);
});

describe("CommonAppShell", () => {
  it("renders a sidebar navigation on desktop", () => {
    setViewportWidth(1280);
    const onNavigate = vi.fn();
    renderWithSystem(
      <CommonAppShell
        navItems={NAV_ITEMS}
        activeKey={"home"}
        onNavigate={onNavigate}
        sidebarFooter={<span>{"footer"}</span>}
      >
        <p>{"isi halaman"}</p>
      </CommonAppShell>,
    );

    expect(screen.getByRole("button", { name: /Beranda/ })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByText("footer")).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveTextContent("isi halaman");
    fireEvent.click(screen.getByRole("button", { name: /Ternak/ }));
    expect(onNavigate).toHaveBeenCalledWith("livestock");
  });

  it("renders a header and Snackbar on mobile", () => {
    setViewportWidth(375);
    const onScan = vi.fn();
    renderWithSystem(
      <CommonAppShell
        navItems={NAV_ITEMS}
        activeKey={"livestock"}
        headerEnd={<span>{"profil"}</span>}
        mobileCenterAction={{ icon: ScanLineIcon, label: "Scan", onClick: onScan }}
      >
        <p>{"isi halaman"}</p>
      </CommonAppShell>,
    );

    expect(screen.getByRole("banner")).toHaveTextContent("profil");
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Ternak/ })).toHaveAttribute(
      "aria-current",
      "page",
    );
    fireEvent.click(screen.getByRole("button", { name: "Scan" }));
    expect(onScan).toHaveBeenCalledTimes(1);
  });
});
