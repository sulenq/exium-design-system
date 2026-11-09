// src/design-system/components/feedback/types/confirm-dialog.type.ts

import type { ButtonProps } from "@/design-system/components/button/button/button.type";
import type { EmojiVariant } from "@/design-system/components/emoji/emoji/emoji.type";
import type { ComponentType, ReactNode } from "react";

export type ConfirmDialogOptions = {
  title?: string;
  description?: string;
  desc?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  colorPalette?: string;
  variant?: EmojiVariant;
  icon?: ComponentType | ReactNode;
  confirmButtonProps?: Partial<ButtonProps>;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
};
