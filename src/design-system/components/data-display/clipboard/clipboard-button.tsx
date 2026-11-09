// src/design-system/components/data-display/ui/clipboard-button.tsx

import type { ClipboardButtonProps } from "@/design-system/components/data-display/clipboard/clipboard.type";
import {
  Button,
  IconButton,
} from "@/design-system/components/button/button/button";
import { Clipboard } from "@/design-system/components/data-display/clipboard/clipboard";

export const ClipboardButton = (props: ClipboardButtonProps) => {
  // Props
  const { value, isIconButton = true, ...restProps } = props;

  return (
    <>
      {isIconButton && (
        <Clipboard.Root value={value}>
          <Clipboard.Trigger asChild>
            <IconButton {...restProps}>
              <Clipboard.Indicator />
            </IconButton>
          </Clipboard.Trigger>
        </Clipboard.Root>
      )}

      {!isIconButton && (
        <Clipboard.Root value={value}>
          <Clipboard.Trigger asChild>
            <Button {...restProps}>
              <Clipboard.Indicator />
              <Clipboard.CopyText />
            </Button>
          </Clipboard.Trigger>
        </Clipboard.Root>
      )}
    </>
  );
};
