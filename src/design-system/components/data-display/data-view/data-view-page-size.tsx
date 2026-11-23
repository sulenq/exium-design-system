// src/design-system/components/data-display/ui/data-view-page-size.tsx

import type { DataViewPageSizeProps } from "@/design-system/components/data-display/data-view/data-view.type";
import Select from "@/design-system/components/input/select/select";
import { Span } from "@/design-system/components/typography/span/span";
import { t } from "@/shared/libs/i18n";

export const DEFAULT_PAGE_SIZE_OPTIONS = [20, 40, 60, 100];

export const DataViewPageSize = (props: DataViewPageSizeProps) => {
  // Props
  const {
    pageSize,
    setPageSize,
    page,
    setPage,
    options = DEFAULT_PAGE_SIZE_OPTIONS,
    title = t["pagination.page_size_title"]?.() ?? "Baris per halaman",
    ...restProps
  } = props;

  const selectOptions = options.map((option) => {
    return {
      label: `${option}`,
      value: String(option),
    };
  });

  return (
    <Select
      value={String(pageSize)}
      options={selectOptions}
      onValueChange={(val) => {
        const nextSize = parseInt(val, 10);
        if (Number.isNaN(nextSize)) return;

        setPageSize?.(nextSize);

        if (setPage && page) {
          // Keep first visible item in view
          const nextTargetPage =
            Math.floor(((page - 1) * pageSize) / nextSize) + 1;
          setPage(nextTargetPage);
        }
      }}
      clearable={false}
      suffixLabel={
        <Span ml={1}>
          {t["pagination.page_size_suffix"]?.() ?? "/halaman"}
        </Span>
      }
      variant={"ghost"}
      title={title}
      minW={"130px"}
      w={"130px"}
      fontSize={"md"}
      {...restProps}
    />
  );
};
