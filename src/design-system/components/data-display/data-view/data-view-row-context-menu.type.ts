// src/design-system/components/data-display/data-view/data-view-row-context-menu.type.ts

import type { DataViewItemActionsGenerator } from "@/design-system/components/data-display/data-view/data-view.type";
import type { FormattedListItem } from "@/design-system/components/data-display/data-view/data-view-table.type";

export type DataViewRowContextMenuProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = {
  item: FormattedListItem<T>;
  itemActions?: DataViewItemActionsGenerator<T>[];
  point: { x: number; y: number } | null;
  onClose: () => void;
};

