// src/design-system/components/data-display/data-view/data-view-row-context-menu.tsx

import { DataViewItemActionsMenuContent } from "@/design-system/components/data-display/data-view/data-view-item-actions";
import type { DataViewRowContextMenuProps } from "@/design-system/components/data-display/data-view/data-view-row-context-menu.type";
import { Menu } from "@/design-system/components/overlay/menu/menu";
import { useMemo } from "react";

export const DataViewRowContextMenu = <
  T extends Record<string, unknown> = Record<string, unknown>,
>(
  props: DataViewRowContextMenuProps<T>,
) => {
  // Props
  const { item, itemActions = [], point, onClose } = props;

  const isOpen = Boolean(point);

  const positioning = useMemo(() => {
    if (!point) return undefined;
    return {
      getAnchorRect: () => ({
        x: point.x,
        y: point.y,
        width: 0,
        height: 0,
      }),
      gutter: 2,
      shift: 8,
      flip: true,
      hideWhenDetached: true,
    };
  }, [point]);

  return (
    <Menu.Root
      lazyMount
      open={isOpen}
      onOpenChange={(details) => {
        if (!details.open) {
          onClose();
        }
      }}
      positioning={positioning}
      closeOnSelect={true}
    >
      <DataViewItemActionsMenuContent
        item={item}
        itemActions={itemActions}
        onActionClick={onClose}
      />
    </Menu.Root>
  );
};
