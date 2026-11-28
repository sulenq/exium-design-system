// src/design-system/components/input/string-array-input/string-array-input.type.ts

export type StringArrayInputProps = {
  label?: string;
  value?: string[];
  onChange?: (nextValue: string[]) => void;
  placeholder?: string;
  addButtonText?: string;
  emptyText?: string;
  itemPrefix?: string;
  maxItems?: number;
};
