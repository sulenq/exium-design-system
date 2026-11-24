// src/design-system/components/overlay/modal/modal.tsx

"use client";

import type { IconButtonProps } from "@/design-system/components/button/button/button.type";
import type { DialogRootProps } from "@/design-system/components/overlay/dialog/dialog.type";
import type {
  ModalBackdropProps,
  ModalBodyProps,
  ModalCloseButtonProps,
  ModalCloseTriggerProps,
  ModalContentProps,
  ModalContextValue,
  ModalFooterProps,
  ModalHeaderProps,
  ModalRootProps,
  ModalTitleProps,
  ModalTriggerProps,
} from "@/design-system/components/overlay/modal/modal.type";
import { Dialog } from "@/design-system/components/overlay/dialog/dialog";
import { Drawer } from "@/design-system/components/overlay/drawer/drawer";
import { P } from "@/design-system/components/typography/p/p";
import { useIsSmallViewport } from "@/design-system/hooks/use-is-small-viewport";
import { type DrawerRootProps } from "@chakra-ui/react";
import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

export const ModalContext = createContext<ModalContextValue | null>(null);

export function useModalContext() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModalContext must be used within Modal.Root");
  }

  return context;
}

// ---------------------------------------------------------------------------

const ModalRoot = (props: ModalRootProps) => {
  // Props
  const {
    children,
    modalKey,
    opened = false,
    open,
    close,
    size = "xs",
    dialogClickOriginAnimation = true,
    drawerPlacement = "bottom",
    drawerSwipeToDismiss = true,
    closeOnInteractOutside = true,
    beforeClose,
    trapFocus = true,
    ...restProps
  } = props;

  // Hooks
  const isSmallViewport = useIsSmallViewport();

  // 3a. Freeze viewport mode while open
  // If the modal was opened, keep the mode frozen until it is closed.
  const [prevOpened, setPrevOpened] = useState(opened);
  const [frozenMode, setFrozenMode] = useState(isSmallViewport);

  if (opened !== prevOpened) {
    setPrevOpened(opened);
    if (opened) {
      // Just opened: freeze the mode to current viewport size
      setFrozenMode(isSmallViewport);
    }
  }

  const mode = opened ? frozenMode : isSmallViewport;

  // States
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  // 3b. beforeClose guard
  const isGuardingCloseRef = useRef(false);
  const requestClose = useCallback(async () => {
    if (isGuardingCloseRef.current) return;
    if (beforeClose) {
      try {
        isGuardingCloseRef.current = true;
        const canClose = await beforeClose();
        if (canClose === false) {
          return;
        }
      } finally {
        isGuardingCloseRef.current = false;
      }
    }
    close?.();
  }, [beforeClose, close]);

  const contextValue = useMemo<ModalContextValue>(
    () => ({
      modalKey,
      opened,
      open,
      close: requestClose,
      fullscreen,
      setFullscreen,
      isSmallViewport: mode,
      closeOnInteractOutside,
    }),
    [
      modalKey,
      opened,
      open,
      requestClose,
      fullscreen,
      setFullscreen,
      mode,
      closeOnInteractOutside,
    ],
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {mode ? (
        <Drawer.Root
          modalKey={modalKey}
          opened={opened}
          open={open}
          close={requestClose}
          size={size as DrawerRootProps["size"]}
          swipeToDismiss={drawerSwipeToDismiss}
          closeOnInteractOutside={closeOnInteractOutside}
          trapFocus={trapFocus}
          {...restProps}
          placement={drawerPlacement}
        >
          {children}
        </Drawer.Root>
      ) : (
        <Dialog.Root
          modalKey={modalKey}
          opened={opened}
          open={open}
          close={requestClose}
          clickOriginAnimation={dialogClickOriginAnimation}
          size={size as DialogRootProps["size"]}
          closeOnInteractOutside={closeOnInteractOutside}
          trapFocus={trapFocus}
          {...restProps}
        >
          {children}
        </Dialog.Root>
      )}
    </ModalContext.Provider>
  );
};

const ModalTrigger = (props: ModalTriggerProps) => {
  // Contexts
  const { isSmallViewport } = useModalContext();

  if (isSmallViewport) {
    return <Drawer.Trigger asChild {...props} />;
  }

  return <Dialog.Trigger asChild {...props} />;
};

const ModalBackdrop = (props: ModalBackdropProps) => {
  // Contexts
  const { isSmallViewport } = useModalContext();

  if (isSmallViewport) {
    return <Drawer.Backdrop {...props} />;
  }

  return <Dialog.Backdrop {...props} />;
};

const ModalContent = (props: ModalContentProps) => {
  // Contexts
  const { isSmallViewport } = useModalContext();

  if (isSmallViewport) {
    return <Drawer.Content {...props} />;
  }

  return <Dialog.Content {...props} />;
};

const ModalFullscreenButton = (props: IconButtonProps) => {
  // Contexts
  const { isSmallViewport } = useModalContext();

  if (isSmallViewport) {
    return <Drawer.FullscreenButton {...props} />;
  }

  return <Dialog.FullscreenButton {...props} />;
};

const ModalCloseTrigger = (props: ModalCloseTriggerProps) => {
  // Props
  const { pos, position, ...restProps } = props;

  // Contexts
  const { isSmallViewport } = useModalContext();

  const resolvedPos = pos ?? position;

  if (isSmallViewport) {
    return <Drawer.CloseTrigger asChild pos={resolvedPos} {...restProps} />;
  }

  return <Dialog.CloseTrigger asChild pos={resolvedPos} {...restProps} />;
};

const ModalCloseButton = (props: ModalCloseButtonProps) => {
  // Contexts
  const { isSmallViewport } = useModalContext();

  if (isSmallViewport) {
    return <Drawer.CloseButton {...props} />;
  }
  return <Dialog.CloseButton {...props} />;
};

const ModalHeader = (props: ModalHeaderProps) => {
  // Contexts
  const { isSmallViewport } = useModalContext();

  if (isSmallViewport) {
    return <Drawer.Header {...props} />;
  }

  return <Dialog.Header {...props} />;
};

const ModalBody = (props: ModalBodyProps) => {
  // Contexts
  const { isSmallViewport } = useModalContext();

  if (isSmallViewport) {
    return <Drawer.Body {...props} />;
  }

  return <Dialog.Body {...props} />;
};

const ModalFooter = (props: ModalFooterProps) => {
  // Contexts
  const { isSmallViewport } = useModalContext();

  if (isSmallViewport) {
    return <Drawer.Footer {...props} />;
  }

  return <Dialog.Footer {...props} />;
};

const ModalTitle = (props: ModalTitleProps) => {
  // Props
  const { ...restProps } = props;

  return <P fontWeight={"semibold"} textAlign={"center"} {...restProps} />;
};

export const Modal = {
  Trigger: ModalTrigger,
  Root: ModalRoot,
  Backdrop: ModalBackdrop,
  Content: ModalContent,
  FullscreenButton: ModalFullscreenButton,
  CloseTrigger: ModalCloseTrigger,
  CloseButton: ModalCloseButton,
  Header: ModalHeader,
  Title: ModalTitle,
  Body: ModalBody,
  Footer: ModalFooter,
};
