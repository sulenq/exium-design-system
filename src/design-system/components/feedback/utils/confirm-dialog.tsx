// src/design-system/components/feedback/utils/confirm-dialog.tsx

import { Button } from "@/design-system/components/button/button/button";
import type { ConfirmDialogOptions } from "@/design-system/components/feedback/confirm-dialog/confirm-dialog.type";
import { focusAlert } from "@/design-system/components/focus-alert/utils/focus-alert";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { Circle } from "@/design-system/components/layout/box/box";
import { VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { usePopDisclosure } from "@/design-system/components/overlay/hooks/use-pop-disclosure";
import { Modal } from "@/design-system/components/overlay/modal/modal";
import { Heading } from "@/design-system/components/typography/heading/heading";
import { P } from "@/design-system/components/typography/p/p";
import { t } from "@/shared/libs/i18n";
import { WarningIcon as AlertTriangleIcon } from "@phosphor-icons/react";

export const ConfirmDialogModal = (props: {
  modalKey: string;
  options: ConfirmDialogOptions;
}) => {
  // Props
  const { modalKey, options } = props;
  const {
    title,
    desc,
    description,
    confirmLabel,
    cancelLabel,
    colorPalette = "red",
    icon,
    confirmButtonProps,
    onConfirm,
    onCancel,
  } = options;

  // Hooks
  const { isOpen, close } = usePopDisclosure({ modalKey });

  // Resolved Values
  const resolvedTitle = title ?? t["action.confirm"]?.() ?? "Konfirmasi";
  const resolvedDesc =
    description ??
    desc ??
    t["confirm.default_description"]?.() ??
    "Tindakan ini akan diproses pada sistem.";
  const resolvedConfirmLabel =
    confirmLabel ?? t["action.confirm"]?.() ?? "Konfirmasi";
  const resolvedCancelLabel =
    cancelLabel ?? t["action.cancel"]?.() ?? "Batal";

  // Handlers
  const handleCancel = () => {
    close();
    void Promise.resolve(onCancel?.()).catch(console.error);
  };

  const handleConfirm = () => {
    close();
    void Promise.resolve(onConfirm?.()).catch(console.error);
  };

  // Destructive palette check (for initialFocusEl: focus cancel button when destructive)
  const isDestructive = colorPalette === "red" || colorPalette === "danger";

  return (
    <Modal.Root modalKey={modalKey} opened={isOpen} close={handleCancel}>
      <Modal.Content>
        <Modal.Header>
          <Modal.CloseButton />
        </Modal.Header>

        <Modal.Body pt={0} pb={6}>
          <VStack align={"center"} gap={4} textAlign={"center"}>
            <Circle
              size={"48px"}
              bg={`${colorPalette}.subtle`}
              color={`${colorPalette}.fg`}
              mb={1}
            >
              {icon ? (
                typeof icon === "function" ? (
                  <AppIcon
                    icon={icon as typeof AlertTriangleIcon}
                    size={"md"}
                  />
                ) : (
                  icon
                )
              ) : (
                <AppIcon icon={AlertTriangleIcon} size={"md"} />
              )}
            </Circle>

            <Heading size={"md"} fontWeight={"semibold"}>
              {resolvedTitle}
            </Heading>

            <P fontSize={"sm"} color={"fg.muted"} maxW={"320px"}>
              {resolvedDesc}
            </P>
          </VStack>
        </Modal.Body>

        <Modal.Footer>
          <VStack gap={2} w={"full"}>
            <Button
              primary={true}
              bouncy={true}
              variant={"solid"}
              colorPalette={colorPalette}
              onClick={handleConfirm}
              autoFocus={!isDestructive}
              {...confirmButtonProps}
            >
              {resolvedConfirmLabel}
            </Button>

            <Button
              bouncy={true}
              onClick={handleCancel}
              autoFocus={isDestructive}
            >
              {resolvedCancelLabel}
            </Button>
          </VStack>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
};

let confirmDialogCounter = 0;

export function confirmDialog(options: ConfirmDialogOptions) {
  confirmDialogCounter += 1;
  const modalKey = `confirm-dialog-${Date.now()}-${confirmDialogCounter}`;
  focusAlert(modalKey, () => (
    <ConfirmDialogModal modalKey={modalKey} options={options} />
  ));
}
