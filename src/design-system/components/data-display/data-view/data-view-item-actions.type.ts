// src/design-system/components/data-display/types/data-view-item-actions.type.ts

export type {
  DataViewItemActionsGenerator,
  DataViewItemActionsTriggerProps,
} from "@/design-system/components/data-display/data-view/data-view.type";

export type DataViewItemActionsMenuContentProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = {
  item: import("@/design-system/components/data-display/data-view/data-view-table.type").FormattedListItem<T>;
  itemActions?: import("@/design-system/components/data-display/data-view/data-view.type").DataViewItemActionsGenerator<T>[];
  onActionClick?: () => void;
};
