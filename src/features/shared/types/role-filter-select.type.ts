// src/features/shared/types/role-filter-select.type.ts

import type { FocusSelectOption } from "@/design-system/components/input/focus-select/focus-select.type";

export type RoleFilterSelectProps = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  options?: FocusSelectOption[];
  placeholder?: string;
  modalKey?: string;
  w?: string | number;
  disabled?: boolean;
  clearable?: boolean;
  isLoading?: boolean;
  isFetching?: boolean;
};
