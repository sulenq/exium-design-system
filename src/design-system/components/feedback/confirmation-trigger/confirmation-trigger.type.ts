// src/design-system/components/feedback/types/confirmation-trigger.type.ts

import type { ButtonProps } from "@/design-system/components/button/button/button.type";
import type { ComponentType, ReactNode } from "react";

export type ConfirmationTriggerProps = {
  children?: ReactNode;
  icon?: ComponentType | ReactNode;
  title?: string;
  desc?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  colorPalette?: string;
  modalKey: string;
  /**
   * Props passed to the confirm button. Note: `loading` is ignored/deprecated as the dialog closes immediately upon confirmation.
   */
  confirmButtonProps?: Partial<ButtonProps>;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
};
