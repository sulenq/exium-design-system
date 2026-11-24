// src/design-system/components/navigation/snackbar/snackbar.type.ts

import type { StackProps } from "@/design-system/components/layout/flex-box/flex-box.type";
import type { ComponentType, ReactNode } from "react";

export type SnackbarItem = {
  key: string;
  label: string;
  icon: ComponentType;
  /** Unread or pending count shown on the item. */
  badge?: number;
};

export type SnackbarAction = {
  icon: ComponentType;
  label: string;
  onClick: () => void;
};

export type SnackbarContainerProps = StackProps & {
  /** Pad the bottom with `env(safe-area-inset-bottom)` for iPhone home indicators. Defaults to `true`. */
  safeArea?: boolean;
  /** Hide while the on-screen keyboard is open so it does not cover inputs. Defaults to `true`. */
  hideOnKeyboard?: boolean;
};

export type SnackbarProps = Omit<SnackbarContainerProps, "onSelect"> & {
  /** 3 to 5 items. Items beyond 5 move into a "More" menu as the last slot. */
  items: SnackbarItem[];
  activeKey?: string;
  onSelect: (key: string) => void;
  /** Prominent action in the middle, e.g. Scan. */
  centerAction?: SnackbarAction;
  /** Trailing slot, e.g. a profile trigger. */
  endSlot?: ReactNode;
};
