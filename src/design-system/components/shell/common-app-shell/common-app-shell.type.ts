// src/design-system/components/shell/common-app-shell/common-app-shell.type.ts

import type { StackProps } from "@/design-system/components/layout/flex-box/flex-box.type";
import type {
  SnackbarAction,
  SnackbarItem,
} from "@/design-system/components/navigation/snackbar/snackbar.type";
import type { ReactNode } from "react";

/** One destination in the shell. Shown in the sidebar on desktop and in the Snackbar on mobile. */
export type CommonAppShellNavItem = SnackbarItem;

export type CommonAppShellProps = Omit<StackProps, "children"> & {
  navItems?: CommonAppShellNavItem[];
  activeKey?: string;
  onNavigate?: (key: string) => void;
  /** Brand shown in the sidebar header and the mobile header. Defaults to `Logo`. */
  brand?: ReactNode;
  /** Trailing content of the mobile header, e.g. a settings or profile trigger. */
  headerEnd?: ReactNode;
  /** Bottom of the desktop sidebar, e.g. a settings or profile trigger. */
  sidebarFooter?: ReactNode;
  /** Prominent action in the middle of the mobile Snackbar, e.g. Scan. */
  mobileCenterAction?: SnackbarAction;
  /** Page content. Defaults to the router `Outlet`. */
  children?: ReactNode;
};
