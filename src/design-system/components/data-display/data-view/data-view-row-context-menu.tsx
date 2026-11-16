// src/design-system/components/data-display/data-view/data-view-row-context-menu.tsx

import type {
  DataViewDeclarativeItemAction,
  DataViewItemActionsGenerator,
} from "@/design-system/components/data-display/data-view/data-view.type";
import type { DataViewRowContextMenuProps } from "@/design-system/components/data-display/data-view/data-view-row-context-menu.type";
import {
  executeItemAction,
  renderIcon,
  resolveBoolean,
  resolveColorPalette,
  resolveDisabledMessage,
  resolveHref,
  resolveIcon,
  resolveLabel,
  resolveLoading,
  resolveTooltip,
  resolveTriggerElement,
} from "@/design-system/components/data-display/data-view/data-view-item-actions";
import { Loader } from "@/design-system/components/feedback/loader/loader";
import { Box } from "@/design-system/components/layout/box/box";
import { VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { Tooltip } from "@/design-system/components/overlay/tooltip/tooltip";
import { updateClickOrigin } from "@/design-system/components/overlay/stores/dialog-animation-store";
import { Portal } from "@/design-system/components/utilities/portal/portal";
import { useThemeStore } from "@/design-system/stores/theme-store";
import { t } from "@/shared/libs/i18n";
import { isEmptyArray } from "@/shared/utils/data/array";
import { useNavigate } from "@tanstack/react-router";
import {
  cloneElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactElement,
} from "react";

function isDeclarativeAction<T = Record<string, unknown>>(
  action: DataViewItemActionsGenerator<T>,
): action is DataViewDeclarativeItemAction<T> {
  return typeof action === "object" && action !== null && "label" in action;
}

export const DataViewRowContextMenu = <
  T extends Record<string, unknown> = Record<string, unknown>,
>(
  props: DataViewRowContextMenuProps<T>,
) => {
  // Props
  const { item, itemActions = [], point, onClose } = props;

  // Stores
  const { theme } = useThemeStore();

  // Hooks
  const navigate = useNavigate();

  // Refs
  const menuRef = useRef<HTMLDivElement | null>(null);

  // States
  const [isOpen, setIsOpen] = useState(true);
  const [adjustedPos, setAdjustedPos] = useState<{ top: number; left: number }>({
    top: point.y,
    left: point.x,
  });

  // Handlers
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleAnimationEnd = () => {
    if (!isOpen) {
      onClose();
    }
  };

  // Derived Values
  const visibleActions = itemActions.filter((action) => {
    if (isDeclarativeAction(action)) {
      if (action.showInMenu === false) return false;
      if (resolveBoolean(action.hidden, item.data, item)) return false;
      return true;
    }
    return true;
  });

  // Effects: Viewport collision detection (flip/shift)
  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const padding = 8;

    let left = point.x;
    let top = point.y;

    // Horizontal collision
    if (left + rect.width > vw - padding) {
      left = Math.max(padding, left - rect.width);
    }

    // Vertical collision
    if (top + rect.height > vh - padding) {
      top = Math.max(padding, top - rect.height);
    }

    setAdjustedPos({ top, left });
  }, [point]);

  // Effects: Dismiss on click outside or Escape
  useEffect(() => {
    const handlePointerDownOutside = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    const handleScrollOrResize = () => {
      handleClose();
    };

    document.addEventListener("pointerdown", handlePointerDownOutside, true);
    document.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDownOutside, true);
      document.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [handleClose]);

  return (
    <Portal>
      <Box
        ref={menuRef}
        pos={"fixed"}
        top={`${adjustedPos.top}px`}
        left={`${adjustedPos.left}px`}
        zIndex={"popover"}
        minW={"160px"}
        p={1}
        bg={"bg.body"}
        rounded={theme.radii.container}
        border={"1px solid"}
        borderColor={"border.subtle"}
        shadow={"lg"}
        role={"menu"}
        aria-orientation={"vertical"}
        animationName={isOpen ? "scale-up" : "scale-down"}
        animationDuration={"fast"}
        animationFillMode={"forwards"}
        onAnimationEnd={handleAnimationEnd}
        css={{
          animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          transformOrigin: "top left",
        }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <VStack gap={1} align={"stretch"}>
          {isEmptyArray(visibleActions) && (
            <Box
              px={3}
              py={2}
              fontSize={"md"}
              color={"fg.muted"}
              userSelect={"none"}
            >
              {t["action.no_actions"]?.() ?? "Tidak ada aksi"}
            </Box>
          )}

          {!isEmptyArray(visibleActions) &&
            visibleActions.map((action, index) => {
              if (isDeclarativeAction(action)) {
                const key = action.key ?? `context-action-${index}`;
                const isLoading = resolveLoading(
                  action.loading,
                  item.data,
                  item,
                );
                const isDisabled =
                  isLoading || resolveBoolean(action.disabled, item.data, item);
                const disabledMessage = resolveDisabledMessage(
                  action.disabledMessage,
                  item.data,
                  item,
                );
                const resolvedLabel = resolveLabel(action.label, item.data);
                const baseTooltip = action.tooltip
                  ? resolveTooltip(action.tooltip, item.data, resolvedLabel)
                  : resolvedLabel;
                const menuTooltipContent =
                  isDisabled && disabledMessage ? disabledMessage : baseTooltip;
                const resolvedIcon = resolveIcon(action.icon, item.data);
                const resolvedColorPalette = resolveColorPalette(
                  action.colorPalette,
                  item.data,
                );
                const resolvedHref = resolveHref(action.href, item.data, item);
                const iconNode = renderIcon(resolvedIcon);
                const triggerElement = resolveTriggerElement(
                  action.modal,
                  item,
                );
                const shouldMountModalInMenu =
                  Boolean(triggerElement) && action.showInRow === false;

                const menuItemContent = (
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    gap={2}
                    w={"full"}
                    h={"full"}
                  >
                    {isLoading ? <Loader /> : iconNode}

                    {resolvedLabel}
                  </Box>
                );

                let rawMenuItemNode: ReactElement;

                if (resolvedHref) {
                  rawMenuItemNode = (
                    <Box
                      asChild
                      role={"menuitem"}
                      aria-disabled={isDisabled}
                      h={"40px"}
                      px={3}
                      display={"flex"}
                      alignItems={"center"}
                      rounded={theme.radii.component}
                      fontSize={"md"}
                      cursor={isDisabled ? "not-allowed" : "pointer"}
                      opacity={isDisabled ? 0.5 : 1}
                      pointerEvents={isDisabled ? "none" : "auto"}
                      userSelect={"none"}
                      transition={"200ms"}
                      color={
                        resolvedColorPalette
                          ? `${resolvedColorPalette}.fg`
                          : undefined
                      }
                      _hover={{
                        bg: isDisabled ? undefined : "bg.subtle",
                      }}
                    >
                      <a
                        href={resolvedHref}
                        target={action.target ?? "_blank"}
                        rel={action.rel ?? "noopener noreferrer"}
                        onClick={(e) => {
                          if (isDisabled) {
                            e.preventDefault();
                            return;
                          }
                          onClose();
                          void action.onClick?.(item.data, item);
                        }}
                      >
                        {menuItemContent}
                      </a>
                    </Box>
                  );
                } else {
                  rawMenuItemNode = (
                    <Box
                      role={"menuitem"}
                      aria-disabled={isDisabled}
                      h={"40px"}
                      px={3}
                      display={"flex"}
                      alignItems={"center"}
                      rounded={theme.radii.component}
                      fontSize={"md"}
                      cursor={isDisabled ? "not-allowed" : "pointer"}
                      opacity={isDisabled ? 0.5 : 1}
                      userSelect={"none"}
                      transition={"200ms"}
                      color={
                        resolvedColorPalette
                          ? `${resolvedColorPalette}.fg`
                          : undefined
                      }
                      _hover={{
                        bg: isDisabled ? undefined : "bg.subtle",
                      }}
                      onPointerDown={(e) => {
                        const triggerProps = triggerElement?.props as
                          | { modalKey?: string }
                          | undefined;
                        if (triggerProps?.modalKey) {
                          updateClickOrigin(triggerProps.modalKey, {
                            x: e.clientX,
                            y: e.clientY,
                          });
                        }
                      }}
                      onClick={
                        triggerElement
                          ? () => {
                              if (isDisabled) return;
                              onClose();
                              const triggerProps = triggerElement.props as {
                                modalKey?: string;
                              };
                              const targetKey =
                                triggerProps?.modalKey ??
                                (action.key
                                  ? `${action.key}-${item.id}`
                                  : undefined);
                              if (targetKey) {
                                navigate({
                                  to: ".",
                                  resetScroll: false,
                                  search: (old: Record<string, unknown>) => ({
                                    ...old,
                                    overlay: targetKey,
                                  }),
                                });
                              }
                            }
                          : () => {
                              if (isDisabled) return;
                              onClose();
                              executeItemAction(action, item);
                            }
                      }
                    >
                      {menuItemContent}
                    </Box>
                  );
                }

                let menuItemNode = rawMenuItemNode;
                if (menuTooltipContent) {
                  menuItemNode = (
                    <Tooltip
                      content={menuTooltipContent}
                      positioning={{ placement: "right" }}
                    >
                      <Box
                        w={"full"}
                        cursor={isDisabled ? "not-allowed" : undefined}
                      >
                        {rawMenuItemNode}
                      </Box>
                    </Tooltip>
                  );
                }

                if (shouldMountModalInMenu && triggerElement) {
                  return cloneElement(triggerElement, { key }, menuItemNode);
                }

                return <span key={key}>{menuItemNode}</span>;
              }

              // Legacy functional generator fallback
              const node = action(item, index);
              if (!node) return null;

              return (
                <span
                  key={index}
                  onClick={() => onClose()}
                >
                  {node}
                </span>
              );
            })}
        </VStack>
      </Box>
    </Portal>
  );
};

