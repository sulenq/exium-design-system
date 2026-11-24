// src/design-system/components/data-display/data-view/data-view-footer.tsx

import type { DataViewFooterProps } from "@/design-system/components/data-display/data-view/data-view-footer.type";
import { DataViewPageSize } from "@/design-system/components/data-display/data-view/data-view-page-size";
import { DataViewPagination } from "@/design-system/components/data-display/data-view/data-view-pagination";
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { P } from "@/design-system/components/typography/p/p";
import { useThemeStore } from "@/design-system/stores/theme-store";
import { t } from "@/shared/libs/i18n";
import { formatNumber } from "@/shared/utils/formatter/number.formatter";

const formatDataLengthText = (_?: number, totalData?: number) => {
  if (totalData != null) {
    const formatted = formatNumber(totalData);
    return t["pagination.total"]?.({ total: formatted }) ?? `Total ${formatted}`;
  }
  return t["pagination.total_unknown"]?.() ?? "Total ?";
};

export const DataViewFooter = (props: DataViewFooterProps) => {
  // Props
  const {
    currentDataLength,
    totalData,
    pageSize,
    setPageSize,
    page,
    setPage,
    totalPage,
    hasNextPage,
    prevButtonProps,
    nextButtonProps,
    ...restProps
  } = props;

  // Stores
  const { theme } = useThemeStore();

  const dataLengthText = formatDataLengthText(currentDataLength, totalData);

  return (
    <VStack
      justify={"center"}
      gap={2}
      w={"full"}
      p={4}
      zIndex={4}
      bg={"bg.body"}
      roundedBottom={theme.radii.container}
      {...restProps}
    >
      <HStack
        wrap={"wrap"}
        align={"center"}
        justify={"space-between"}
        gapX={4}
        gapY={1}
        w={"full"}
      >
        <HStack align={"start"}>
          <DataViewPageSize
            pageSize={pageSize}
            setPageSize={setPageSize}
            page={page}
            setPage={setPage}
          />
        </HStack>

        <HStack
          align={"center"}
          justify={"center"}
          gapX={3}
        >
          <P color={"fg.subtle"} whiteSpace={"nowrap"} textAlign={"center"}>
            {dataLengthText}
          </P>

          <DataViewPagination
            page={page}
            setPage={setPage}
            totalPage={totalPage}
            hasNextPage={hasNextPage}
            prevButtonProps={prevButtonProps}
            nextButtonProps={nextButtonProps}
          />
        </HStack>
      </HStack>
    </VStack>
  );
};
