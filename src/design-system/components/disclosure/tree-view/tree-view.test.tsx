// src/design-system/components/disclosure/tree-view/tree-view.test.tsx

import { TreeView } from "@/design-system/components/disclosure/tree-view/tree-view";
import type { TreeNodeData } from "@/design-system/components/disclosure/tree-view/tree-view.type";
import { renderWithSystem } from "@/test/render";
import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";

const AXE_OPTIONS = { rules: { "color-contrast": { enabled: false } } };

const PEDIGREE: TreeNodeData[] = [
  {
    id: "melati",
    label: "Melati",
    description: "Betina · 2023",
    children: [
      {
        id: "bima",
        label: "Bima",
        description: "Pejantan",
        children: [
          { id: "arjuna", label: "Arjuna" },
          { id: "unknown-dam-bima", label: "", unknown: true },
        ],
      },
      {
        id: "sari",
        label: "Sari",
        description: "Induk",
        children: [{ id: "dewi", label: "Dewi", children: [{ id: "kencana", label: "Kencana" }] }],
      },
    ],
  },
];

describe("TreeView horizontal (pedigree)", () => {
  it("opens generations up to expandDepth and shows unknown parents", async () => {
    const { container } = renderWithSystem(
      <TreeView orientation={"horizontal"} label={"Silsilah Melati"} data={PEDIGREE} />,
    );
    const tree = screen.getByRole("tree", { name: "Silsilah Melati" });

    expect(within(tree).getByRole("treeitem", { name: /Melati/ })).toHaveAttribute("aria-expanded", "true");
    expect(within(tree).getByText("Arjuna")).toBeInTheDocument();
    expect(within(tree).getByText("Tidak diketahui")).toBeInTheDocument();
    // Generation 4 (Kencana) is collapsed by default
    expect(within(tree).queryByText("Kencana")).not.toBeInTheDocument();
    expect(within(tree).getByRole("treeitem", { name: /Dewi/ })).toHaveAttribute("aria-expanded", "false");
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  });

  it("collapses and expands a node", () => {
    renderWithSystem(<TreeView orientation={"horizontal"} label={"Silsilah"} data={PEDIGREE} />);
    const bima = screen.getByRole("treeitem", { name: /Bima/ });
    fireEvent.click(within(bima).getByRole("button", { name: "Sembunyikan induk" }));
    expect(screen.queryByText("Arjuna")).not.toBeInTheDocument();
    fireEvent.click(within(bima).getByRole("button", { name: "Tampilkan induk" }));
    expect(screen.getByText("Arjuna")).toBeInTheDocument();
  });

  it("moves focus with arrow keys and selects with Enter", () => {
    const onSelect = vi.fn();
    renderWithSystem(
      <TreeView orientation={"horizontal"} label={"Silsilah"} data={PEDIGREE} onSelect={onSelect} />,
    );
    const melati = screen.getByRole("treeitem", { name: /Melati/ });
    expect(melati).toHaveAttribute("tabindex", "0");
    melati.focus();

    fireEvent.keyDown(melati, { key: "ArrowRight" });
    const bima = screen.getByRole("treeitem", { name: /Bima/ });
    expect(document.activeElement).toBe(bima);

    fireEvent.keyDown(bima, { key: "ArrowDown" });
    const sari = screen.getByRole("treeitem", { name: /Sari/ });
    expect(document.activeElement).toBe(sari);

    fireEvent.keyDown(sari, { key: "ArrowLeft" });
    expect(document.activeElement).toBe(melati);

    fireEvent.keyDown(melati, { key: "Enter" });
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "melati" }));
  });

  it("expands a collapsed node with ArrowRight before moving into it", () => {
    renderWithSystem(
      <TreeView orientation={"horizontal"} label={"Silsilah"} data={PEDIGREE} expandDepth={1} />,
    );
    const melati = screen.getByRole("treeitem", { name: /Melati/ });
    melati.focus();
    expect(screen.queryByText("Bima")).not.toBeInTheDocument();
    fireEvent.keyDown(melati, { key: "ArrowRight" });
    expect(screen.getByText("Bima")).toBeInTheDocument();
    expect(document.activeElement).toBe(melati);
  });
});

describe("TreeView vertical", () => {
  it("renders an accessible tree and reports selection", async () => {
    const onSelect = vi.fn();
    renderWithSystem(
      <TreeView
        label={"Kandang"}
        defaultExpandedIds={["blok-a"]}
        onSelect={onSelect}
        data={[
          { id: "blok-a", label: "Blok A", children: [{ id: "a1", label: "Kandang A1" }] },
          { id: "blok-b", label: "Blok B" },
        ]}
      />,
    );
    const tree = screen.getByRole("tree");
    expect(tree).toHaveAccessibleName("Kandang");
    const item = within(tree).getByRole("treeitem", { name: "Kandang A1" });
    fireEvent.click(item);
    // Ark applies selection asynchronously
    await waitFor(() => expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "a1" })));
    await waitFor(() => expect(item).toHaveAttribute("aria-selected", "true"));
  });
});
