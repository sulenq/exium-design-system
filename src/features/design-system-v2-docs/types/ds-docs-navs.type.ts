// src/features/design-system-v2-docs/types/ds-docs-navs.type.ts

export type DsDocsSearchParams = {
  component?: string;
};

export type DsDocNav = {
  id: string;
  label: string;
  category: string;
};

export type DsDocNavGroup = {
  category: string;
  items: DsDocNav[];
};

