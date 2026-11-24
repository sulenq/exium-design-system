// src/design-system/components/data-display/data-view/data-view-pagination.tsx

import { IconButton } from "@/design-system/components/button/button/button";
import type { DataViewPaginationProps } from "@/design-system/components/data-display/data-view/data-view.type";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { HStack } from "@/design-system/components/layout/flex-box/flex-box";
import { P, TNum } from "@/design-system/components/typography/p/p";
import { t } from "@/shared/libs/i18n";
import { formatNumber } from "@/shared/utils/formatter/number.formatter";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export const DataViewPagination = (props: DataViewPaginationProps) => {
  // Props
  const {
    page,
    setPage,
    totalPage,
    hasNextPage,
    prevButtonProps,
    nextButtonProps,
    ...flatProps
  } = props;

  // Strip onClick from flatProps so consumer cannot accidentally overwrite both Prev & Next buttons
  const { onClick: _ignoredOnClick, ...safeFlatProps } = flatProps;

  // Derived Values
  const canGoPrev = page > 1;
  const canGoNext =
    totalPage != null ? page < totalPage : hasNextPage !== false;

  const previousLabel =
    t["pagination.previous"]?.() ?? "Halaman Sebelumnya";
  const nextLabel =
    t["pagination.next"]?.() ?? "Halaman Selanjutnya";

  return (
    <HStack align={"center"} gap={2}>
      <IconButton
        variant={"ghost"}
        disabled={!canGoPrev}
        aria-label={previousLabel}
        title={previousLabel}
        {...safeFlatProps}
        {...prevButtonProps}
        onClick={(e) => {
          setPage?.(page - 1);
          prevButtonProps?.onClick?.(e);
        }}
      >
        <AppIcon icon={ChevronLeftIcon} />
      </IconButton>

      <P whiteSpace={"nowrap"}>
        <TNum>
          {totalPage != null
            ? `${formatNumber(page)} / ${formatNumber(totalPage)}`
            : formatNumber(page)}
        </TNum>
      </P>

      <IconButton
        variant={"ghost"}
        disabled={!canGoNext}
        aria-label={nextLabel}
        title={nextLabel}
        {...safeFlatProps}
        {...nextButtonProps}
        onClick={(e) => {
          setPage?.(page + 1);
          nextButtonProps?.onClick?.(e);
        }}
      >
        <AppIcon icon={ChevronRightIcon} />
      </IconButton>
    </HStack>
  );
};
