// src/design-system/components/toast/ui/toast.item.tsx

import {
  Button,
  IconButton,
} from "@/design-system/components/button/button/button";
import { ButtonGroup } from "@/design-system/components/button/button-group/button-group";
import { CloseButton } from "@/design-system/components/button/close-button/close-button";
import { Collapsible } from "@/design-system/components/disclosure/collapsible/collapsible";
import { Loader } from "@/design-system/components/feedback/loader/loader";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { getToastConfig } from "@/design-system/components/toast/core/toast.config";
import {
  toast,
  toastTimerControls,
} from "@/design-system/components/toast/core/toast.manager";
import type {
  ToastItemProps,
  ToastItemData,
  ToastVariantMap,
} from "@/design-system/components/toast/toast/toast.type";
import { ToastIcon } from "@/design-system/components/toast/toast/toast.icon";
import { ToastProgressBar } from "@/design-system/components/toast/toast/toast.progress-bar";
import { ClampedP, P } from "@/design-system/components/typography/p/p";
import { useThemeStore } from "@/design-system/stores/theme-store";
import { useFirstMountEffect } from "@/shared/hooks/use-first-mount-effect";
import { isEmptyArray } from "@/shared/utils/data/array";
import { formatRelativeTime } from "@/shared/utils/formatter/date.formatter";
import { useLocale } from "@/shared/libs/i18n/locale-provider";
import { tintDark } from "@/shared/utils/style/color";
import {
  AlertCircleIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  InfoIcon,
  XCircleIcon,
} from "lucide-react";
import { memo, useState } from "react";

export const TOAST_VARIANT_MAP: ToastVariantMap = {
  success: {
    icon: <AppIcon icon={CheckCircleIcon} size={"sm"} />,
    bg: "green.solid",
    color: "bg.body",
  },
  error: {
    icon: <AppIcon icon={XCircleIcon} size={"sm"} />,
    bg: "red.solid",
    color: "bg.body",
  },
  warning: {
    icon: <AppIcon icon={AlertCircleIcon} size={"sm"} />,
    bg: "orange.solid",
    color: "bg.body",
  },
  info: {
    icon: <AppIcon icon={InfoIcon} size={"sm"} />,
    bg: "blue.solid",
    color: "bg.body",
  },
  loading: {
    icon: <Loader size={"xs"} color={"bg.body"} />,
    bg: "neutral.solid",
    color: "bg.body",
  },
  custom: {
    icon: null,
    bg: "transparent",
    color: "transparent",
  },
};

export const ToastItem = memo(function ToastItem(
  props: ToastItemProps & {
    stackExpanded?: boolean;
    onRequestExpand?: () => void;
    onClose?: (toast: ToastItemData) => void;
  },
) {
  // Props
  const {
    toast: toastData,
    index,
    stackExpanded,
    showTimestamp,
    onRequestExpand,
    onClose,
    ...restProps
  } = props;

  // Stores
  const { theme } = useThemeStore();

  // Hooks
  const { showDeletedFromHistoryIndicator, showProgressBar } = getToastConfig();
  const { locale } = useLocale();

  // States
  const [toastItemExpanded, setToastItemExpanded] = useState<boolean>(false);

  // Derived Values
  const isFirstIndex = index === 0;
  const hasExpandableContent = Boolean(
    toastData.description ||
    (toastData.actions && !isEmptyArray(toastData.actions)),
  );

  // Collapse item when stack is collapsed
  useFirstMountEffect(
    {
      onUpdate: () => {
        if (stackExpanded === false) setToastItemExpanded(false);
      },
    },
    [stackExpanded],
  );

  if (toastData.variant === "custom" && toastData.renderer) {
    return <>{toastData.renderer(toastData)}</>;
  }

  return (
    <VStack
      data-state={toastData.status}
      aria-live={toastData.variant === "error" ? "assertive" : "polite"}
      role={toastData.variant === "error" ? "alert" : "status"}
      pos={"relative"}
      overflow={"clip"}
      py={3}
      w={"full"}
      maxW={"full"}
      minW={0}
      bg={stackExpanded ? "bg.body" : tintDark("bg.body", index * 2)}
      border={"1px solid"}
      borderColor={"border.subtle"}
      rounded={theme.radii.container}
      shadow={"sm"}
      opacity={toastData.status === "visible" ? 1 : 0}
      tabIndex={0}
      userSelect={"text"}
      cursor={!stackExpanded || hasExpandableContent ? "pointer" : "auto"}
      transform={
        toastData.status === "visible" ? "translateY(0)" : "translateY(-20px)"
      }
      transition={"transform 300ms, opacity 300ms"}
      onPointerEnter={() => toastTimerControls.pauseAll()}
      onPointerLeave={() => toastTimerControls.resumeAll()}
      onFocus={() => toastTimerControls.pauseAll()}
      onBlur={() => toastTimerControls.resumeAll()}
      onKeyDown={(event) => {
        if (event.key === "Escape") toast.close(toastData.id);
      }}
      onClick={() => {
        const selection =
          typeof window !== "undefined" ? window.getSelection() : null;
        if (selection && selection.toString().length > 0) return;
        if (!hasExpandableContent) return;
        if (!stackExpanded) {
          onRequestExpand?.();
          setToastItemExpanded(true);
        } else {
          setToastItemExpanded((prev) => !prev);
        }
      }}
      {...restProps}
    >
      <HStack gap={3} px={3} w={"full"} minW={0} align={"start"}>
        <ToastIcon
          toast={toastData}
          icon={TOAST_VARIANT_MAP[toastData.variant].icon}
          bg={TOAST_VARIANT_MAP[toastData.variant].bg}
          color={TOAST_VARIANT_MAP[toastData.variant].color}
        />

        <VStack flex={1} minW={0} w={"full"}>
          {/* Header */}
          <HStack align={"start"} gap={2} w={"full"} minW={0}>
            {/* Title */}
            {toastData.title && (
              <ClampedP
                flex={"0 1 auto"}
                minW={0}
                mr={toastData.description ? 0 : 1}
                fontWeight={"medium"}
                lineClamp={
                  (stackExpanded && !toastData.description) || toastItemExpanded
                    ? 0
                    : 1
                }
                w={
                  stackExpanded || toastItemExpanded || !toastData.description
                    ? "fit"
                    : "140px"
                }
                wordBreak={
                  stackExpanded || toastItemExpanded
                    ? "break-word"
                    : "break-all"
                }
              >
                {toastData.title}
              </ClampedP>
            )}

            {/* Description */}
            {toastData.description && !showTimestamp && (
              <P
                flex={"0 1 auto"}
                flexShrink={99}
                minW={0}
                overflow={"hidden"}
                lineClamp={1}
                textOverflow={"ellipsis"}
                mx={1}
                mt={"1px"}
                fontSize={"sm"}
                color={"fg.subtle"}
                display={toastItemExpanded ? "none" : undefined}
                transition={"200ms"}
              >
                {toastData.description}
              </P>
            )}

            {/* Timestamp */}
            {showTimestamp && toastData.createdAt ? (
              <P
                fontSize={"sm"}
                color={"fg.subtle"}
                whiteSpace={"nowrap"}
                ml={"auto"}
                mr={1}
                mt={"2px"}
              >
                {formatRelativeTime(toastData.createdAt, locale)}
              </P>
            ) : null}

            {/* Actions */}
            <HStack
              align={"center"}
              gap={1}
              ml={showTimestamp ? 0 : "auto"}
              flexShrink={0}
            >
              {toastData.quickAction && (
                <Button
                  variant={"subtle"}
                  size={"2xs"}
                  rounded={"full"}
                  fontSize={"sm"}
                  onClick={(event) => {
                    event.stopPropagation();
                    toastData?.quickAction?.onClick(toastData.id);
                  }}
                >
                  {toastData.quickAction.content}
                </Button>
              )}

              {hasExpandableContent && (
                <IconButton
                  variant={"subtle"}
                  size={"2xs"}
                  rounded={"full"}
                  onClick={(event) => {
                    event.stopPropagation();
                    if (!stackExpanded) {
                      onRequestExpand?.();
                      setToastItemExpanded(true);
                    } else {
                      setToastItemExpanded((prev) => !prev);
                    }
                  }}
                >
                  <AppIcon
                    icon={ChevronDownIcon}
                    size={"sm"}
                    transform={
                      toastItemExpanded ? "rotate(180deg)" : "rotate(0deg)"
                    }
                    transition={"transform 200ms"}
                  />
                </IconButton>
              )}

              <CloseButton
                aria-label={"Close notification"}
                variant={"subtle"}
                size={"2xs"}
                rounded={"full"}
                boxSize={3.5}
                onClick={(event: React.MouseEvent) => {
                  event.stopPropagation();
                  if (onClose) {
                    onClose(toastData);
                  } else {
                    toast.close(toastData.id);
                  }
                }}
              />
            </HStack>
          </HStack>

          {/* Content */}
          <VStack
            w={"full"}
            minW={0}
            mt={toastItemExpanded ? 1 : 0}
            display={stackExpanded || isFirstIndex ? "flex" : "none"}
            opacity={stackExpanded || isFirstIndex ? 1 : 0}
            pointerEvents={stackExpanded || isFirstIndex ? "auto" : "none"}
            transition={"opacity 200ms"}
          >
            <Collapsible.Root opened={toastItemExpanded}>
              <Collapsible.Content>
                {/* Description */}
                {toastData.description && stackExpanded && (
                  <P
                    color={"fg.muted"}
                    fontSize={"sm"}
                    lineClamp={toastItemExpanded ? undefined : 1}
                  >
                    {toastData.description}
                  </P>
                )}

                {/* Actions */}
                {toastData.actions && !isEmptyArray(toastData.actions) && (
                  <ButtonGroup gap={2} mt={toastData.description ? 3 : 0}>
                    {toastData.actions.map((action, index) => (
                      <Button
                        key={index}
                        variant={"subtle"}
                        size={"2xs"}
                        rounded={"full"}
                        fontSize={"sm"}
                        onClick={(event) => {
                          event.stopPropagation();
                          action.onClick(toastData.id);
                        }}
                      >
                        {action.content}
                      </Button>
                    ))}
                  </ButtonGroup>
                )}
              </Collapsible.Content>
            </Collapsible.Root>

            {/* Removed from history flag */}
            {showDeletedFromHistoryIndicator &&
              toastData.isDeletedFromHistory && (
                <P fontSize={"xs"} color={"fg.muted"} mt={1}>
                  {"Removed from history"}
                </P>
              )}
          </VStack>
        </VStack>
      </HStack>

      {showProgressBar && <ToastProgressBar toast={toastData} />}
    </VStack>
  );
});
