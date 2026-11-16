// src/design-system/components/overlay/checklist-modal/checklist-modal.type.ts

import type { ReactNode } from "react";

export type ChecklistModalItem = {
  id: string;
  label: string;
  description?: string;
  /** Optional items do not block the confirm button. Default false. */
  optional?: boolean;
};

export type ChecklistModalProps = {
  /** Unique key that syncs the modal with the `overlay` URL param. */
  modalKey: string;
  /** Trigger element that opens the modal. */
  children: ReactNode;

  title: string;
  description?: string;
  items: ChecklistModalItem[];
  /** Item ids ticked when the modal opens. */
  defaultCheckedIds?: string[];

  /** Default: localized "Confirm". */
  confirmLabel?: string;
  /** Default: localized "Cancel". */
  cancelLabel?: string;
  /** Shows the confirm button as loading and keeps the modal open. */
  confirmLoading?: boolean;
  /**
   * Called with the ticked ids once every required item is ticked. The modal
   * closes when this resolves; throw (or reject) to keep it open.
   */
  onConfirm: (checkedIds: string[]) => void | Promise<void>;

  size?: "xs" | "sm" | "md" | "lg";
};

export type ChecklistModalPanelProps = Pick<
  ChecklistModalProps,
  | "description"
  | "items"
  | "defaultCheckedIds"
  | "confirmLabel"
  | "cancelLabel"
  | "confirmLoading"
  | "onConfirm"
> & {
  onClose: () => void;
};
