// src/design-system/components/data-display/ui/data-view-table.tsx

import { IconButton } from "@/design-system/components/button/button/button";
import {
  DataViewTableContext,
  useDataViewTableContext,
} from "@/design-system/components/data-display/contexts/data-view-table.context";
import { useDataViewSelection } from "@/design-system/components/data-display/hooks/use-data-view-selection";
import { useDataViewSort } from "@/design-system/components/data-display/hooks/use-data-view-sort";
import type {
  DataViewTableContextValue,
  DataViewTableHeaderProps,
  DataViewTableOnSelectedItemChange,
  DataViewTableRootProps,
  DataViewTableRowProps,
  DataViewTableSortIconProps,
  FormattedListItem,
  FormattedTableColumn,
  FormattedTableHeader,
} from "@/design-system/components/data-display/data-view/data-view-table.type";
import type {
  DataViewBatchActionsGenerator,
  DataViewItemActionsGenerator,
} from "@/design-system/components/data-display/data-view/data-view.type";
import {
  DataViewBatchActionBar,
  DataViewBatchActionsTrigger,
} from "@/design-system/components/data-display/data-view/data-view-batch-actions";
import {
  DataListItemActionsTrigger,
  DataViewSpreadActions,
  DataViewStickyActions,
} from "@/design-system/components/data-display/data-view/data-view-item-actions";
import { DataViewRowContextMenu } from "@/design-system/components/data-display/data-view/data-view-row-context-menu";
import { CursorTooltip } from "@/design-system/components/overlay/cursor-tooltip/cursor-tooltip";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { Checkbox } from "@/design-system/components/input/checkbox/checkbox";
import type { StackProps } from "@/design-system/components/layout/flex-box/flex-box.type";
import {
  HStack,
  VStack,
} from "@/design-system/components/layout/flex-box/flex-box";
import { Grid } from "@/design-system/components/layout/grid/grid";
import { P } from "@/design-system/components/typography/p/p";
import { useThemeStore } from "@/design-system/stores/theme-store";
import { useDeviceCapability } from "@/shared/hooks/use-device-capability";
import { t } from "@/shared/libs/i18n";
import { isEmptyArray } from "@/shared/utils/data/array";
import { tintAlpha } from "@/shared/utils/style/color";
import { Box, Center } from "@chakra-ui/react";
import { IconListCheck } from "@tabler/icons-react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ChevronDownIcon, ChevronUpIcon, EllipsisIcon } from "lucide-react";
import {
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

// ---------------------------------------------------------------------------

const DataListTableRootInternal = <
  T extends Record<string, unknown> = Record<string, unknown>,
  N extends number = number,
>(
  props: DataViewTableRootProps<T, N> & {
    ref?: React.ForwardedRef<HTMLDivElement>;
  },
) => {
  // Props
  const {
    children,
    items,
    headers,
    batchActions = [],
    itemActions = [],
    initialSortColumnIndex,
    initialSortOrder = "asc",
    withNumbering = true,
    withStickyMenu = false,
    canBatchSelect = false,
    selectedItems: controlledSelectedItems,
    onSelectedItemChange,
    virtualized = true,
    fixedItemHeight = true,
    renderTdCell,
    page,
    pageSize,
    ref,
    ...restProps
  } = props;

  // Refs & Container State
  const [tableContainerEl, setTableContainerEl] =
    useState<HTMLDivElement | null>(null);
  const tableContainerRef = useRef<HTMLDivElement | null>(null);

  const setTableContainerRef = useCallback(
    (node: HTMLDivElement | null) => {
      tableContainerRef.current = node;
      setTableContainerEl(node);

      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    },
    [ref],
  );

  useImperativeHandle(ref, () => tableContainerRef.current as HTMLDivElement);

  // Stores
  const { theme } = useThemeStore();

  const headersList = headers as unknown as FormattedTableHeader[];
  const itemsList = items as unknown as FormattedListItem[];
  const selectedItemsList = controlledSelectedItems as unknown as
    | FormattedListItem[]
    | undefined;
  const onSelectedItemChangeHandler = onSelectedItemChange as unknown as
    | DataViewTableOnSelectedItemChange
    | undefined;
  const itemActionsList = itemActions as unknown as
    | DataViewItemActionsGenerator[]
    | undefined;
  const renderTdCellHandler = renderTdCell as unknown as
    | ((
        column: FormattedTableColumn,
        item: FormattedListItem,
        columnIndex: number,
      ) => React.ReactNode)
    | undefined;

  // Hooks
  const { sortConfig, toggleSort, sortedItems } = useDataViewSort({
    formattedItems: itemsList,
    initialColumnIndex: initialSortColumnIndex,
    initialDirection: initialSortOrder,
  });
  const {
    isAllItemsSelected,
    selectedItemIds,
    selectedItems,
    selectAllItems,
    clearSelectedItems,
    toggleItemSelection,
  } = useDataViewSelection(
    itemsList,
    selectedItemsList,
    onSelectedItemChangeHandler,
  );
  const [activeItemMenuId, setActiveItemMenuId] = useState<string | null>(null);

  // Resolved Values
  const contextValue = useMemo<DataViewTableContextValue<T>>(
    () => ({
      headers: headersList,
      items: itemsList as unknown as FormattedListItem<T>[],
      page,
      pageSize,
      initialSortColumnIndex,
      initialSortOrder,
      batchActions:
        batchActions as unknown as DataViewBatchActionsGenerator<T>[],
      itemActions:
        itemActionsList as unknown as DataViewItemActionsGenerator<T>[],
      withNumbering,
      withStickyMenu,
      virtualized,
      fixedItemHeight,
      tableContainerRef,
      tableContainerEl,

      sortConfig,
      toggleSort,
      sortedItems: sortedItems as unknown as FormattedListItem<T>[],
      selectedItemIds,
      selectedItems: selectedItems as unknown as FormattedListItem<T>[],
      isAllItemsSelected,
      toggleItemSelection: toggleItemSelection as unknown as (
        item: FormattedListItem<T>,
      ) => void,
      selectAllItems,
      clearSelectedItems,
      canBatchSelect: !isEmptyArray(batchActions) || canBatchSelect,
      activeItemMenuId,
      setActiveItemMenuId,
      renderTdCell: renderTdCellHandler as unknown as (
        column: FormattedTableColumn,
        item: FormattedListItem<T>,
        columnIndex: number,
      ) => React.ReactNode,
    }),
    [
      headersList,
      itemsList,
      page,
      pageSize,
      initialSortColumnIndex,
      initialSortOrder,
      batchActions,
      itemActionsList,
      withNumbering,
      withStickyMenu,
      virtualized,
      fixedItemHeight,
      tableContainerRef,
      tableContainerEl,
      sortConfig,
      toggleSort,
      sortedItems,
      selectedItemIds,
      selectedItems,
      isAllItemsSelected,
      toggleItemSelection,
      selectAllItems,
      clearSelectedItems,
      canBatchSelect,
      activeItemMenuId,
      setActiveItemMenuId,
      renderTdCellHandler,
    ],
  );

  const gridCols = useMemo(() => {
    const cols: string[] = [];

    if (canBatchSelect || !isEmptyArray(batchActions)) {
      cols.push("56px");
    }

    if (withNumbering) {
      cols.push("56px");
    }

    headersList.forEach(() => cols.push("auto"));

    if (!isEmptyArray(itemActionsList)) {
      const actions = itemActionsList ?? [];
      const hasSpreadAction = actions.some(
        (action) =>
          typeof action === "object" &&
          action !== null &&
          !("sticky" in action && action.sticky) &&
          (!("showInRow" in action) || action.showInRow !== false),
      );

      if (hasSpreadAction) {
        // Normal column for spread action buttons
        cols.push("max-content");
      }

      // Sticky column for sticky actions and/or menu trigger
      const stickyActionsCount = actions.filter(
        (action) =>
          typeof action === "object" &&
          action !== null &&
          "sticky" in action &&
          action.sticky,
      ).length;

      const hasStickyActions = stickyActionsCount > 0;

      if (withStickyMenu || hasStickyActions) {
        // withStickyMenu adds 40px trigger button + padding
        const triggerWidth = withStickyMenu ? 40 : 0;
        const stickyActionsWidth = stickyActionsCount * 36;
        const paddingWidth = hasStickyActions && withStickyMenu ? 24 : 16;
        const stickyColWidth = `${Math.max(56, triggerWidth + stickyActionsWidth + paddingWidth)}px`;
        cols.push(stickyColWidth);
      }
    }

    return cols.join(" ");
  }, [
    canBatchSelect,
    batchActions,
    headersList,
    itemActionsList,
    withNumbering,
    withStickyMenu,
  ]);

  return (
    <DataViewTableContext.Provider
      value={contextValue as unknown as DataViewTableContextValue}
    >
      <VStack
        className={"table-container"}
        ref={setTableContainerRef}
        overflowX={"auto"}
        overflowY={"auto"}
        flex={1}
        w={"full"}
        maxH={"full"}
        roundedTop={theme.radii.container}
        bg={"bg.body"}
        {...restProps}
      >
        <Grid
          role={"table"}
          gridTemplateColumns={gridCols}
          w={"full"}
          minW={"max-content"}
        >
          {children}
        </Grid>
      </VStack>

      {!isEmptyArray(batchActions) && (
        <DataViewBatchActionBar
          selectedItemIds={selectedItemIds}
          selectedItems={selectedItems as unknown as FormattedListItem<T>[]}
          clearSelectedItems={clearSelectedItems}
          batchActions={
            batchActions as unknown as DataViewBatchActionsGenerator<T>[]
          }
        />
      )}
    </DataViewTableContext.Provider>
  );
};

const DataListTableRoot = DataListTableRootInternal as <
  T = Record<string, unknown>,
  N extends number = number,
>(
  props: DataViewTableRootProps<T, N> & {
    ref?: React.ForwardedRef<HTMLDivElement>;
  },
) => React.ReactElement;

const DataListTableHeader = (props: DataViewTableHeaderProps) => {
  const {
    canBatchSelect,
    batchActions,
    selectedItemIds,
    selectedItems,
    clearSelectedItems,
    isAllItemsSelected,
    selectAllItems,
    headers,
    itemActions,
    sortConfig,
    toggleSort,
    withNumbering,
    withStickyMenu,
  } = useDataViewTableContext();

  return (
    <Box
      role={"row"}
      display={"grid"}
      gridTemplateColumns={"subgrid"}
      gridColumn={"1 / -1"}
      minW={"full"}
      h={"56px"}
      pos={"sticky"}
      top={0}
      left={0}
      zIndex={10}
      bg={"bg.body"}
      borderBottom={"1px solid"}
      borderColor={"bg.canvas"}
      {...props}
    >
      {canBatchSelect && (
        <DataListTableCell pos={"sticky"} left={0} zIndex={11}>
          <DataViewBatchActionsTrigger
            batchActions={batchActions}
            selectedItemIds={selectedItemIds}
            selectedItems={selectedItems}
            clearSelectedItems={clearSelectedItems}
            isAllItemsSelected={isAllItemsSelected}
            selectAllItems={selectAllItems}
            triggerActionBarMode={true}
          >
            <IconButton variant={"ghost"} size={"xs"}>
              <AppIcon icon={IconListCheck} />
            </IconButton>
          </DataViewBatchActionsTrigger>
        </DataListTableCell>
      )}

      {withNumbering && (
        <DataListTableCell>
          <P color={"fg.subtle"}>#</P>
        </DataListTableCell>
      )}

      {headers.map((header, index) => (
        <DataListTableCell
          key={index}
          justify={header.align}
          cursor={header.sortable ? "pointer" : "auto"}
          onClick={header.sortable ? () => toggleSort(index) : undefined}
          {...header?.cellProps}
        >
          <P fontSize={"sm"} fontWeight={"medium"} color={"fg.subtle"}>
            {header.th}
          </P>

          {header.sortable && (
            <DataListTableSortIcon
              active={sortConfig.columnIndex === index}
              direction={sortConfig.direction}
            />
          )}
        </DataListTableCell>
      ))}

      {!isEmptyArray(itemActions) && (
        <>
          {/* Normal column header for spread action buttons (only if present) */}
          {Boolean(
            itemActions?.some(
              (action) =>
                typeof action === "object" &&
                action !== null &&
                !("sticky" in action && action.sticky) &&
                (!("showInRow" in action) || action.showInRow !== false),
            ),
          ) && (
            <DataListTableCell justify={"center"}>
              <P fontWeight={"semibold"} color={"fg.subtle"}></P>
            </DataListTableCell>
          )}
          {/* Sticky column header for sticky menu & sticky actions */}
          {(() => {
            const hasStickyActions = itemActions?.some(
              (action) =>
                typeof action === "object" &&
                action !== null &&
                "sticky" in action &&
                action.sticky,
            );

            if (!withStickyMenu && !hasStickyActions) return null;

            return (
              <DataListTableCell
                pos={"sticky"}
                top={0}
                right={0}
                zIndex={11}
                bg={"bg.body"}
                px={hasStickyActions ? undefined : 2}
                pl={hasStickyActions ? 4 : undefined}
                pr={hasStickyActions ? 2 : undefined}
              />
            );
          })()}
        </>
      )}
    </Box>
  );
};

const DataListTableRow = memo(
  ({
    item,
    index,
    isItemSelected,
    canBatchSelect,
    withNumbering,
    itemActions = [],
    toggleItemSelection,
    measureRef,
    dataIndex,
    styleProps,
  }: DataViewTableRowProps) => {
    // Contexts & Stores
    const { page, pageSize, renderTdCell, activeItemMenuId, withStickyMenu } =
      useDataViewTableContext();
    const { theme } = useThemeStore();

    // Hooks
    const { inputType } = useDeviceCapability();

    // States
    const [contextMenuPoint, setContextMenuPoint] = useState<{
      x: number;
      y: number;
    } | null>(null);

    // Derived Values
    const hasRowActions = !isEmptyArray(itemActions);
    const actionTooltipText =
      inputType === "dual"
        ? (t["action.row_action_tooltip_dual"]?.() ??
          "Hold atau klik kanan untuk buka aksi")
        : inputType === "touch"
          ? (t["action.row_action_tooltip_touch"]?.() ?? "Hold untuk buka aksi")
          : (t["action.row_action_tooltip_mouse"]?.() ??
            "Klik kanan untuk buka aksi");

    // Refs
    const touchTimerRef = useRef<NodeJS.Timeout | null>(null);
    const touchStartPointRef = useRef<{ x: number; y: number } | null>(null);

    // Handlers
    const handleContextMenu = (e: React.MouseEvent) => {
      if (isEmptyArray(itemActions)) return;
      e.preventDefault();
      setContextMenuPoint({ x: e.clientX, y: e.clientY });
    };

    const handleTouchStart = (e: React.TouchEvent) => {
      if (isEmptyArray(itemActions)) return;
      if (e.touches.length !== 1) return;
      const touch = e.touches[0];
      touchStartPointRef.current = { x: touch.clientX, y: touch.clientY };

      if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
      touchTimerRef.current = setTimeout(() => {
        setContextMenuPoint({ x: touch.clientX, y: touch.clientY });
      }, 500);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
      if (!touchStartPointRef.current || !touchTimerRef.current) return;
      const touch = e.touches[0];
      const deltaX = Math.abs(touch.clientX - touchStartPointRef.current.x);
      const deltaY = Math.abs(touch.clientY - touchStartPointRef.current.y);

      // Cancel long press on movement > 10px
      if (deltaX > 10 || deltaY > 10) {
        clearTimeout(touchTimerRef.current);
        touchTimerRef.current = null;
      }
    };

    const handleTouchEnd = () => {
      if (touchTimerRef.current) {
        clearTimeout(touchTimerRef.current);
        touchTimerRef.current = null;
      }
    };

    const isStickyMenuOpen = activeItemMenuId === item.id;
    const cellBg = isItemSelected
      ? tintAlpha(`${theme.colorPalette}.subtle`, 40)
      : "bg.body";

    const cellHoverBg = hasRowActions
      ? isItemSelected
        ? tintAlpha(`${theme.colorPalette}.subtle`, 60)
        : "bg.subtle"
      : undefined;

    return (
      <>
        <CursorTooltip content={actionTooltipText} disabled={!hasRowActions}>
          <Box
            ref={measureRef}
            data-index={dataIndex}
            role={"row"}
            display={"grid"}
            gridTemplateColumns={"subgrid"}
            gridColumn={"1 / -1"}
            minW={"full"}
            minH={"56px"}
            bg={"bg.body"}
            borderBottom={"1px solid"}
            borderColor={"bg.canvas"}
            transition={"background-color 0.1s ease"}
            className={"group"}
            onContextMenu={handleContextMenu}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            _hover={
              hasRowActions
                ? {
                    bg: isItemSelected
                      ? tintAlpha(`${theme.colorPalette}.subtle`, 50)
                      : "bg.subtle",
                  }
                : undefined
            }
            {...styleProps}
          >
            {canBatchSelect && (
              <Center
                pos={"sticky"}
                left={0}
                bg={"bg.body"}
                cursor={"pointer"}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItemSelection(item);
                }}
              >
                <Center
                  w={"full"}
                  h={"full"}
                  px={2}
                  bg={cellBg}
                  _groupHover={cellHoverBg ? { bg: cellHoverBg } : undefined}
                  transition={"background-color 0.1s ease"}
                >
                  <Checkbox
                    size={"sm"}
                    checked={isItemSelected}
                    variant={"subtle"}
                  />
                </Center>
              </Center>
            )}

            {withNumbering && (
              <DataListTableCell
                bg={cellBg}
                _groupHover={cellHoverBg ? { bg: cellHoverBg } : undefined}
                transition={"background-color 0.1s ease"}
              >
                <P>
                  {page && pageSize
                    ? index + 1 + (page - 1) * pageSize
                    : index + 1}
                </P>
              </DataListTableCell>
            )}

            {/* Main columns */}
            {item.columns.map((col, colIndex) => (
              <HStack
                key={colIndex}
                align={"center"}
                justify={col.align}
                w={"full"}
                h={"full"}
                px={4}
                py={2}
                opacity={item.dim || col.dim ? 0.5 : 1}
                whiteSpace={"nowrap"}
                bg={cellBg}
                _groupHover={cellHoverBg ? { bg: cellHoverBg } : undefined}
                transition={"background-color 0.1s ease"}
                {...col?.cellProps}
              >
                {renderTdCell ? (
                  renderTdCell(col, item, colIndex)
                ) : typeof col.td === "string" || typeof col.td === "number" ? (
                  <P>{col.td}</P>
                ) : (
                  (col.td ?? <P>{String(col.value ?? "-")}</P>)
                )}
              </HStack>
            ))}

            {!isEmptyArray(itemActions) && (
              <>
                {/* Normal column cell for spread action buttons (only if present) */}
                {itemActions.some(
                  (action) =>
                    typeof action === "object" &&
                    action !== null &&
                    !("sticky" in action && action.sticky) &&
                    (!("showInRow" in action) || action.showInRow !== false),
                ) && (
                  <HStack
                    justify={"end"}
                    align={"center"}
                    w={"full"}
                    h={"full"}
                    px={4}
                    bg={cellBg}
                    _groupHover={cellHoverBg ? { bg: cellHoverBg } : undefined}
                    transition={"background-color 0.1s ease"}
                    gap={1}
                  >
                    <DataViewSpreadActions
                      item={item}
                      itemActions={itemActions}
                    />
                  </HStack>
                )}

                {/* Sticky column cell for sticky menu trigger and sticky actions */}
                {(() => {
                  const hasStickyActions = itemActions.some(
                    (action) =>
                      typeof action === "object" &&
                      action !== null &&
                      "sticky" in action &&
                      action.sticky,
                  );

                  if (!withStickyMenu && !hasStickyActions) return null;

                  return (
                    <Center
                      pos={"sticky"}
                      right={0}
                      zIndex={2}
                      minW={hasStickyActions ? "68px" : "56px"}
                      bg={"bg.body"}
                    >
                      <HStack
                        w={"full"}
                        h={"full"}
                        px={hasStickyActions ? undefined : 2}
                        pl={hasStickyActions ? 4 : undefined}
                        pr={hasStickyActions ? 2 : undefined}
                        gap={1}
                        align={"center"}
                        justify={hasStickyActions ? "end" : "center"}
                        bg={cellBg}
                        _groupHover={
                          cellHoverBg ? { bg: cellHoverBg } : undefined
                        }
                        transition={"background-color 0.1s ease"}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <DataViewStickyActions
                          itemActions={itemActions}
                          item={item}
                        />

                        {withStickyMenu && (
                          <DataListItemActionsTrigger
                            itemActions={itemActions}
                            item={item}
                          >
                            <IconButton
                              variant={"ghost"}
                              opacity={isStickyMenuOpen ? 1 : 0}
                              _groupHover={{ opacity: 1 }}
                              _groupActive={{ opacity: 1 }}
                              _focusVisible={{ opacity: 1 }}
                              transition={"opacity 0.15s ease"}
                            >
                              <AppIcon icon={EllipsisIcon} />
                            </IconButton>
                          </DataListItemActionsTrigger>
                        )}
                      </HStack>
                    </Center>
                  );
                })()}
              </>
            )}
          </Box>
        </CursorTooltip>

        <DataViewRowContextMenu
          item={item}
          itemActions={itemActions}
          point={contextMenuPoint}
          onClose={() => setContextMenuPoint(null)}
        />
      </>
    );
  },
);

const DataListTableBody = () => {
  // Hooks
  const {
    canBatchSelect,
    sortedItems,
    itemActions,
    selectedItemIds,
    toggleItemSelection,
    withNumbering,
    virtualized = true,
    fixedItemHeight = true,
    tableContainerRef,
    tableContainerEl,
  } = useDataViewTableContext();

  const rowHeight = useMemo(() => parseInt("56px", 10), []);
  const rowGap = useMemo(() => 0, []);

  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: sortedItems.length,
    getScrollElement: () => tableContainerEl ?? tableContainerRef.current,
    estimateSize: () => rowHeight,
    gap: rowGap,
    overscan: 10,
  });

  const virtualItems = virtualizer.getVirtualItems();

  // Fallback to direct rendering if virtualized is false or if virtualizer returned no items despite items existing
  if (!virtualized || (isEmptyArray(virtualItems) && sortedItems.length > 0)) {
    return (
      <>
        {sortedItems.map((item, index) => {
          const isItemSelected = selectedItemIds.includes(item.id);

          return (
            <DataListTableRow
              key={item.id}
              item={item}
              index={index}
              isItemSelected={isItemSelected}
              canBatchSelect={canBatchSelect}
              withNumbering={Boolean(withNumbering)}
              itemActions={itemActions}
              toggleItemSelection={toggleItemSelection}
            />
          );
        })}
      </>
    );
  }

  const paddingTop = virtualItems.length > 0 ? virtualItems[0].start : 0;
  const totalSize = virtualizer.getTotalSize();
  const paddingBottom =
    virtualItems.length > 0
      ? totalSize - virtualItems[virtualItems.length - 1].end
      : 0;

  return (
    <>
      {paddingTop > 0 && (
        <Box gridColumn={"1 / -1"} h={`${paddingTop}px`} aria-hidden={"true"} />
      )}

      {virtualItems.map((virtualRow) => {
        const item = sortedItems[virtualRow.index];
        const index = virtualRow.index;
        const isItemSelected = selectedItemIds.includes(item.id);

        return (
          <DataListTableRow
            key={item.id}
            item={item}
            index={index}
            isItemSelected={isItemSelected}
            canBatchSelect={canBatchSelect}
            withNumbering={Boolean(withNumbering)}
            itemActions={itemActions}
            toggleItemSelection={toggleItemSelection}
            measureRef={
              fixedItemHeight ? undefined : virtualizer.measureElement
            }
            dataIndex={fixedItemHeight ? undefined : virtualRow.index}
          />
        );
      })}

      {paddingBottom > 0 && (
        <Box
          gridColumn={"1 / -1"}
          h={`${paddingBottom}px`}
          aria-hidden={"true"}
        />
      )}
    </>
  );
};

// -------------------------------------------------------------------------------------

const DataListTableCell = (props: StackProps) => {
  return (
    <HStack
      className="table-cell"
      align={"center"}
      justify={"center"}
      gap={2}
      px={4}
      py={2}
      bg={"bg.body"}
      whiteSpace={"nowrap"}
      userSelect={"none"}
      {...props}
    />
  );
};

const DataListTableSortIcon = ({
  active,
  direction,
}: DataViewTableSortIconProps) => {
  // Stores
  const { theme } = useThemeStore();

  // Derived Values
  const primaryFg = `${theme.colorPalette}.fg`;
  const isAscActive = active && direction === "asc";
  const isDescActive = active && direction === "desc";

  return (
    <VStack align={"center"} gap={0}>
      <AppIcon
        icon={ChevronUpIcon}
        boxSize={"12px"}
        strokeWidth={2.5}
        color={isAscActive ? primaryFg : "an3"}
        mb={"-6px"}
      />
      <AppIcon
        icon={ChevronDownIcon}
        boxSize={"12px"}
        strokeWidth={2.5}
        color={isDescActive ? primaryFg : "an3"}
      />
    </VStack>
  );
};

// -------------------------------------------------------------------------------------

export const DataViewTable = {
  Root: DataListTableRoot,
  Header: DataListTableHeader,
  Body: DataListTableBody,
};

// export const DataView = {
//   Table: DataViewTableInternal,
// };
