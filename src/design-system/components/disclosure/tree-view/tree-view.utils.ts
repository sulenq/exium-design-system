// src/design-system/components/disclosure/tree-view/tree-view.utils.ts

import type {
  TreeIndex,
  TreeNodeData,
} from "@/design-system/components/disclosure/tree-view/tree-view.type";

export function buildTreeIndex(roots: TreeNodeData[]): TreeIndex {
  const byId = new Map<string, TreeNodeData>();
  const parentOf = new Map<string, string | null>();
  const visit = (node: TreeNodeData, parent: string | null) => {
    byId.set(node.id, node);
    parentOf.set(node.id, parent);
    node.children?.forEach((child) => visit(child, node.id));
  };
  roots.forEach((root) => visit(root, null));
  return { byId, parentOf };
}

/** Ids of every node whose depth (subject = 1) is below `depth`, i.e. open generations. */
export function idsUpToDepth(root: TreeNodeData | undefined, depth: number): Set<string> {
  const ids = new Set<string>();
  const visit = (node: TreeNodeData, level: number) => {
    if (level >= depth || !node.children?.length) return;
    ids.add(node.id);
    node.children.forEach((child) => visit(child, level + 1));
  };
  if (root) visit(root, 1);
  return ids;
}

/** The next focus target for an arrow key in the horizontal (pedigree) tree. */
export function getPedigreeFocusTarget(
  key: string,
  currentId: string,
  index: TreeIndex,
  expanded: Set<string>,
): { focus?: string; toggle?: string } {
  const node = index.byId.get(currentId);
  if (!node) return {};
  const parentId = index.parentOf.get(currentId) ?? null;
  const siblings = parentId ? (index.byId.get(parentId)?.children ?? []) : [node];
  const position = siblings.findIndex((sibling) => sibling.id === currentId);
  const hasChildren = Boolean(node.children?.length);

  switch (key) {
    case "ArrowRight":
      if (!hasChildren) return {};
      if (!expanded.has(currentId)) return { toggle: currentId };
      return { focus: node.children?.[0]?.id };
    case "ArrowLeft":
      return parentId ? { focus: parentId } : {};
    case "ArrowDown":
      return position < siblings.length - 1 ? { focus: siblings[position + 1].id } : {};
    case "ArrowUp":
      return position > 0 ? { focus: siblings[position - 1].id } : {};
    default:
      return {};
  }
}
