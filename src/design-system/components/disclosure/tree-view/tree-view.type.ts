// src/design-system/components/disclosure/tree-view/tree-view.type.ts

import type { ComponentType, ReactNode } from "react";

export type TreeNodeData = {
  id: string;
  label: string;
  /** Second line, e.g. "Betina · lahir 2021". */
  description?: string;
  icon?: ComponentType;
  /** Placeholder for a record that does not exist, e.g. an unrecorded dam. */
  unknown?: boolean;
  children?: TreeNodeData[];
};

export type TreeViewProps = {
  /** Root nodes. In `horizontal`, the first node is the subject of the pedigree. */
  data: TreeNodeData[];
  /** Accessible name of the tree. */
  label: string;
  /**
   * `vertical`: an indented tree (folders, categories).
   * `horizontal`: a pedigree, with each generation one column to the right.
   */
  orientation?: "vertical" | "horizontal";
  /** Vertical: branches open at first render. */
  defaultExpandedIds?: string[];
  /** Horizontal: generations open at first render, counting the subject. Default 3. */
  expandDepth?: number;
  selectedId?: string | null;
  onSelect?: (node: TreeNodeData) => void;
  /** Replace the default node content (label, description, icon). */
  renderNode?: (node: TreeNodeData) => ReactNode;
};

export type PedigreeNodeProps = {
  node: TreeNodeData;
  level: number;
  expanded: Set<string>;
  focusedId: string;
  selectedId?: string | null;
  renderNode?: (node: TreeNodeData) => ReactNode;
  onToggle: (id: string) => void;
  onSelect?: (node: TreeNodeData) => void;
  onFocusNode: (id: string) => void;
  registerRef: (id: string, element: HTMLElement | null) => void;
};

export type TreeIndex = {
  byId: Map<string, TreeNodeData>;
  parentOf: Map<string, string | null>;
};
