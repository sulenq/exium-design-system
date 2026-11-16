// src/design-system/components/overlay/checklist-modal/checklist-modal.tsx

import { Button } from "@/design-system/components/button/button/button";
import { Checkbox } from "@/design-system/components/input/checkbox/checkbox";
import { Box } from "@/design-system/components/layout/box/box";
import { VStack } from "@/design-system/components/layout/flex-box/flex-box";
import type {
  ChecklistModalPanelProps,
  ChecklistModalProps,
} from "@/design-system/components/overlay/checklist-modal/checklist-modal.type";
import { usePopDisclosure } from "@/design-system/components/overlay/hooks/use-pop-disclosure";
import { Modal } from "@/design-system/components/overlay/modal/modal";
import { Badge } from "@/design-system/components/typography/badge/badge";
import { P } from "@/design-system/components/typography/p/p";
import { useThemeStore } from "@/design-system/stores/theme-store";
import { t } from "@/shared/libs/i18n";
import { useState } from "react";

// -------------------------------------------------------------------------------------
// ChecklistModalPanel — mounted only while the modal is open, so ticks reset
// to `defaultCheckedIds` on every open.
// -------------------------------------------------------------------------------------

const ChecklistModalPanel = (props: ChecklistModalPanelProps) => {
  // Props
  const {
    description,
    items,
    defaultCheckedIds = [],
    confirmLabel,
    cancelLabel,
    confirmLoading = false,
    onConfirm,
    onClose,
  } = props;

  // Stores
  const { theme } = useThemeStore();

  // States
  const [checkedIds, setCheckedIds] = useState<string[]>(defaultCheckedIds);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Derived Values
  const checkedCount = items.filter((item) =>
    checkedIds.includes(item.id),
  ).length;
  const isComplete = items.every(
    (item) => item.optional || checkedIds.includes(item.id),
  );
  const isBusy = confirmLoading || isSubmitting;

  // Handlers
  const handleToggle = (itemId: string, checked: boolean) => {
    setCheckedIds((prev) => {
      const withoutItem = prev.filter((id) => id !== itemId);
      if (!checked) return withoutItem;
      return [...withoutItem, itemId];
    });
  };

  const handleConfirm = async () => {
    if (!isComplete || isBusy) return;

    // Report ids in the order the items are listed, not the order ticked
    const orderedIds = items
      .map((item) => item.id)
      .filter((id) => checkedIds.includes(id));

    setIsSubmitting(true);
    try {
      await onConfirm(orderedIds);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Modal.Body pt={0}>
        <VStack gap={4}>
          {description && <P color={"fg.muted"}>{description}</P>}

          <VStack as={"ul"} gap={2} listStyleType={"none"}>
            {items.map((item) => {
              const isChecked = checkedIds.includes(item.id);

              return (
                <Box
                  as={"li"}
                  key={item.id}
                  p={3}
                  border={"1px solid"}
                  borderColor={"border.muted"}
                  rounded={theme.radii.component}
                >
                  <Checkbox
                    checked={isChecked}
                    alignItems={"flex-start"}
                    w={"full"}
                    onCheckedChange={(e) =>
                      handleToggle(item.id, Boolean(e.checked))
                    }
                  >
                    <VStack gap={1} flex={1} minW={0}>
                      <P fontWeight={"medium"}>
                        {item.label}
                        {item.optional && (
                          <Badge ml={2} colorPalette={"gray"}>
                            {"Optional"}
                          </Badge>
                        )}
                      </P>

                      {item.description && (
                        <P fontSize={"sm"} color={"fg.muted"}>
                          {item.description}
                        </P>
                      )}
                    </VStack>
                  </Checkbox>
                </Box>
              );
            })}
          </VStack>

          <P fontSize={"sm"} color={"fg.muted"} aria-live={"polite"}>
            {t["common.checklist_progress"]({
              checked: checkedCount,
              total: items.length,
            })}
          </P>
        </VStack>
      </Modal.Body>

      <Modal.Footer>
        <Button variant={"outline"} disabled={isBusy} onClick={onClose}>
          {cancelLabel ?? t["action.cancel"]()}
        </Button>

        <Button
          primary={true}
          disabled={!isComplete}
          loading={isBusy}
          onClick={handleConfirm}
        >
          {confirmLabel ?? t["action.confirm"]()}
        </Button>
      </Modal.Footer>
    </>
  );
};

// -------------------------------------------------------------------------------------
// ChecklistModal (public)
// -------------------------------------------------------------------------------------

export const ChecklistModal = (props: ChecklistModalProps) => {
  // Props
  const {
    modalKey: propsModalKey,
    children,
    title,
    size = "sm",
    ...panelProps
  } = props;

  // Hooks
  const { modalKey, isOpen, open, close } = usePopDisclosure({
    modalKey: propsModalKey,
  });

  return (
    <Modal.Root
      modalKey={modalKey}
      opened={isOpen}
      open={open}
      close={close}
      size={size}
    >
      <Modal.Trigger>{children}</Modal.Trigger>

      <Modal.Content>
        <Modal.Header>
          <Modal.Title mx={"auto"}>{title}</Modal.Title>
          <Modal.CloseButton mb={"auto"} />
        </Modal.Header>

        <ChecklistModalPanel {...panelProps} onClose={close} />
      </Modal.Content>
    </Modal.Root>
  );
};
