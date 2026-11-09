// src/design-system/components/navigation/types/v-navs.type.ts

import type { AppIconProps } from "@/design-system/components/icon/app-icon/app-icon.type";
import type { StackProps } from "@/design-system/components/layout/flex-box/flex-box.type";
import type { NavButtonProps } from "@/design-system/components/navigation/nav/nav.type";
import type { NavGroup, NavItem, NavNode } from "@/shared/types/nav.type";

export type VNavsProps<TNavKey extends string = string> = StackProps & {
  groups: NavGroup<TNavKey>[];
  navs: Record<TNavKey, NavItem>;
  activeKey?: TNavKey;
  expanded?: boolean;
  onNavClick?: (key: TNavKey) => void;
  navNodeProps?:
    | NavButtonProps
    | ((node: NavNode<TNavKey>, nav: NavItem) => NavButtonProps);
};

export type VNavNodeProps<TNavKey extends string> = {
  node: NavNode<TNavKey>;
  navs: Record<TNavKey, NavItem>;
  activeKey?: TNavKey;
  activePathKeys: Set<TNavKey>;
  expanded: boolean;
  onNavClick?: (key: TNavKey) => void;
  depth?: number;
  isLastChild?: boolean;
  navNodeProps?:
    | NavButtonProps
    | ((node: NavNode<TNavKey>, nav: NavItem) => NavButtonProps);
};

export type VNavIconProps = AppIconProps & {
  nav: NavItem;
};
