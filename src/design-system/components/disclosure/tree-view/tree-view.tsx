// src/design-system/components/disclosure/tree-view/tree-view.tsx

"use client";

import { IconButton } from "@/design-system/components/button/button/button";
import type {
  PedigreeNodeProps,
  TreeNodeData,
  TreeViewProps,
} from "@/design-system/components/disclosure/tree-view/tree-view.type";
import {
  buildTreeIndex,
  getPedigreeFocusTarget,
  idsUpToDepth,
} from "@/design-system/components/disclosure/tree-view/tree-view.utils";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { Box } from "@/design-system/components/layout/box/box";
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { P } from "@/design-system/components/typography/p/p";
import { useThemeStore } from "@/design-system/stores/theme-store";
import { t } from "@/shared/libs/i18n";
import { TreeView as ChakraTreeView, createTreeCollection } from "@chakra-ui/react";
import { ChevronRightIcon, CircleHelpIcon, MinusIcon, PlusIcon } from "lucide-react";
import { useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

const ROOT_ID = "__exium_tree_root__";
const CONNECTOR = "24px";

/**
 * Tree in two orientations.
 *
 * - `vertical`: Chakra/Ark TreeView (indented branches, full keyboard support).
 * - `horizontal`: a pedigree. The subject is on the left and each generation is one
 *   column to the right, with connector lines, collapse per node and dashed
 *   "Tidak diketahui" nodes for unrecorded parents. Arrow keys move between
 *   generations (left/right) and siblings (up/down); Enter selects.
 */
export const TreeView = (props: TreeViewProps) => {
  // Props
  const { orientation = "vertical", ...restProps } = props;

  if (orientation === "horizontal") return <PedigreeTree {...restProps} />;
  return <VerticalTree {...restProps} />;
};

// -------------------------------------------------------------------------------------
// Shared node content
// -------------------------------------------------------------------------------------

const NodeContent = (props: { node: TreeNodeData; renderNode?: (node: TreeNodeData) => ReactNode }) => {
  // Props
  const { node, renderNode } = props;

  if (renderNode) return <>{renderNode(node)}</>;

  return (
    <HStack gap={2} align={"center"} minW={0}>
      {(node.unknown || node.icon) && (
        <AppIcon icon={node.unknown ? CircleHelpIcon : (node.icon ?? CircleHelpIcon)} color={"fg.muted"} />
      )}
      <VStack gap={0} align={"start"} minW={0}>
        <P
          lineClamp={1}
          fontWeight={"medium"}
          fontStyle={node.unknown ? "italic" : undefined}
          color={node.unknown ? "fg.muted" : undefined}
        >
          {node.unknown && !node.label ? t["tree_view.unknown"]() : node.label}
        </P>
        {node.description && (
          <P lineClamp={1} fontSize={"sm"} color={"fg.muted"}>
            {node.description}
          </P>
        )}
      </VStack>
    </HStack>
  );
};

// -------------------------------------------------------------------------------------
// Vertical: Chakra TreeView
// -------------------------------------------------------------------------------------

const VerticalTree = (props: Omit<TreeViewProps, "orientation">) => {
  // Props
  const { data, label, defaultExpandedIds, selectedId, onSelect, renderNode } = props;

  // Derived Values
  const collection = useMemo(
    () =>
      createTreeCollection<TreeNodeData>({
        nodeToValue: (node) => node.id,
        nodeToString: (node) => node.label,
        rootNode: { id: ROOT_ID, label: "", children: data },
      }),
    [data],
  );
  const index = useMemo(() => buildTreeIndex(data), [data]);

  return (
    <ChakraTreeView.Root
      collection={collection}
      defaultExpandedValue={defaultExpandedIds}
      selectedValue={selectedId ? [selectedId] : selectedId === null ? [] : undefined}
      selectionMode={"single"}
      onSelectionChange={(details) => {
        const node = index.byId.get(details.selectedValue[0] ?? "");
        if (node) onSelect?.(node);
      }}
      w={"full"}
    >
      <ChakraTreeView.Label srOnly>{label}</ChakraTreeView.Label>
      <ChakraTreeView.Tree>
        <ChakraTreeView.Node<TreeNodeData>
          indentGuide={<ChakraTreeView.BranchIndentGuide />}
          render={({ node, nodeState }) => (
            <VerticalTreeNode node={node} isBranch={nodeState.isBranch} renderNode={renderNode} />
          )}
        />
      </ChakraTreeView.Tree>
    </ChakraTreeView.Root>
  );
};

const VerticalTreeNode = (props: {
  node: TreeNodeData;
  isBranch: boolean;
  renderNode?: (node: TreeNodeData) => ReactNode;
}) => {
  // Props
  const { node, isBranch, renderNode } = props;

  if (isBranch) {
    return (
      <ChakraTreeView.BranchControl>
        <ChakraTreeView.BranchIndicator>
          <AppIcon icon={ChevronRightIcon} />
        </ChakraTreeView.BranchIndicator>
        <ChakraTreeView.BranchText>
          <NodeContent node={node} renderNode={renderNode} />
        </ChakraTreeView.BranchText>
      </ChakraTreeView.BranchControl>
    );
  }

  return (
    <ChakraTreeView.Item>
      <ChakraTreeView.ItemText>
        <NodeContent node={node} renderNode={renderNode} />
      </ChakraTreeView.ItemText>
    </ChakraTreeView.Item>
  );
};

// -------------------------------------------------------------------------------------
// Horizontal: pedigree
// -------------------------------------------------------------------------------------

const PedigreeTree = (props: Omit<TreeViewProps, "orientation">) => {
  // Props
  const { data, label, expandDepth = 3, selectedId, onSelect, renderNode } = props;

  // Derived Values
  const subject = data[0];
  const index = useMemo(() => buildTreeIndex(subject ? [subject] : []), [subject]);

  // States
  const [expanded, setExpanded] = useState<Set<string>>(() => idsUpToDepth(subject, expandDepth));
  const [focusedId, setFocusedId] = useState<string>(subject?.id ?? "");

  // Refs
  const nodeRefs = useRef(new Map<string, HTMLElement>());

  // Handlers
  function toggle(id: string) {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function focusNode(id: string) {
    setFocusedId(id);
    nodeRefs.current.get(id)?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Home" && subject) {
      event.preventDefault();
      focusNode(subject.id);
      return;
    }
    const target = getPedigreeFocusTarget(event.key, focusedId, index, expanded);
    if (!target.focus && !target.toggle) return;
    event.preventDefault();
    if (target.toggle) toggle(target.toggle);
    if (target.focus) focusNode(target.focus);
  }

  if (!subject) return null;

  return (
    <Box w={"full"} overflowX={"auto"} py={2}>
      <Box role={"tree"} aria-label={label} aria-orientation={"horizontal"} w={"max-content"} onKeyDown={handleKeyDown}>
        <PedigreeNode
          node={subject}
          level={1}
          expanded={expanded}
          focusedId={focusedId}
          selectedId={selectedId}
          renderNode={renderNode}
          onToggle={toggle}
          onSelect={onSelect}
          onFocusNode={setFocusedId}
          registerRef={(id, element) => {
            if (element) nodeRefs.current.set(id, element);
            else nodeRefs.current.delete(id);
          }}
        />
      </Box>
    </Box>
  );
};

const PedigreeNode = (props: PedigreeNodeProps) => {
  // Props
  const {
    node,
    level,
    expanded,
    focusedId,
    selectedId,
    renderNode,
    onToggle,
    onSelect,
    onFocusNode,
    registerRef,
  } = props;

  // Stores
  const { theme } = useThemeStore();

  // Derived Values
  const children = node.children ?? [];
  const hasChildren = children.length > 0;
  const isExpanded = hasChildren && expanded.has(node.id);
  const isSelected = selectedId === node.id;

  return (
    <HStack align={"center"} gap={0}>
      <HStack
        ref={(element: HTMLDivElement | null) => registerRef(node.id, element)}
        role={"treeitem"}
        aria-level={level}
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-selected={isSelected}
        tabIndex={focusedId === node.id ? 0 : -1}
        data-unknown={node.unknown || undefined}
        gap={1}
        minW={"160px"}
        maxW={"240px"}
        px={3}
        py={2}
        rounded={"md"}
        bg={"bg.panel"}
        border={"1px solid"}
        borderStyle={node.unknown ? "dashed" : "solid"}
        borderColor={isSelected ? `${theme.colorPalette}.solid` : "border.emphasized"}
        boxShadow={isSelected ? "0 0 0 1px var(--chakra-colors-border-emphasized)" : undefined}
        cursor={onSelect ? "pointer" : undefined}
        _focusVisible={{ outline: "2px solid", outlineColor: `${theme.colorPalette}.focusRing`, outlineOffset: "2px" }}
        onFocus={() => onFocusNode(node.id)}
        onClick={() => onSelect?.(node)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onSelect?.(node);
          }
        }}
      >
        <Box flex={1} minW={0}>
          <NodeContent node={node} renderNode={renderNode} />
        </Box>
        {hasChildren && (
          <IconButton
            size={"xs"}
            variant={"ghost"}
            tabIndex={-1}
            aria-label={isExpanded ? t["tree_view.collapse"]() : t["tree_view.expand"]()}
            onClick={(event) => {
              event.stopPropagation();
              onToggle(node.id);
            }}
          >
            <AppIcon icon={isExpanded ? MinusIcon : PlusIcon} />
          </IconButton>
        )}
      </HStack>

      {isExpanded && (
        <>
          {/* Line from this node to its parents' column */}
          <Box w={CONNECTOR} borderTop={"1px solid"} borderColor={"border.emphasized"} aria-hidden />
          <VStack role={"group"} align={"start"} gap={3}>
            {children.map((child, position) => (
              <Box
                key={child.id}
                pos={"relative"}
                pl={CONNECTOR}
                _before={{
                  content: '""',
                  pos: "absolute",
                  left: 0,
                  top: "50%",
                  w: CONNECTOR,
                  borderTop: "1px solid",
                  borderColor: "border.emphasized",
                }}
                _after={
                  children.length > 1
                    ? {
                        content: '""',
                        pos: "absolute",
                        left: 0,
                        top: position === 0 ? "50%" : "-6px",
                        bottom: position === children.length - 1 ? "50%" : "-6px",
                        borderLeft: "1px solid",
                        borderColor: "border.emphasized",
                      }
                    : undefined
                }
              >
                <PedigreeNode {...props} node={child} level={level + 1} />
              </Box>
            ))}
          </VStack>
        </>
      )}
    </HStack>
  );
};
