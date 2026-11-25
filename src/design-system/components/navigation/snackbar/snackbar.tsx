// src/design-system/components/navigation/snackbar/snackbar.tsx

import { Button, IconButton } from "@/design-system/components/button/button/button";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { Box } from "@/design-system/components/layout/box/box";
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import type {
  SnackbarContainerProps,
  SnackbarItem,
  SnackbarProps,
} from "@/design-system/components/navigation/snackbar/snackbar.type";
import { Menu } from "@/design-system/components/overlay/menu/menu";
import { CountBadge } from "@/design-system/components/typography/count-badge/count-badge";
import { P } from "@/design-system/components/typography/p/p";
import { useVirtualKeyboardOpen } from "@/design-system/hooks/use-virtual-keyboard-open";
import { useThemeStore } from "@/design-system/stores/theme-store";
import { t } from "@/shared/libs/i18n";
import { DotsThreeIcon as EllipsisIcon } from "@phosphor-icons/react";

const MAX_INLINE_ITEMS = 5;

/**
 * Bottom navigation bar for mobile ("Snackbar" in Exium; not a transient message like
 * Material's snackbar — use Toast for that). Container only: safe area and keyboard handling.
 */
export const SnackbarContainer = (props: SnackbarContainerProps) => {
  // Props
  const { safeArea = true, hideOnKeyboard = true, children, ...restProps } = props;

  // Hooks
  const isKeyboardOpen = useVirtualKeyboardOpen();

  if (hideOnKeyboard && isKeyboardOpen) return null;

  return (
    <HStack
      as={"nav"}
      aria-label={t["snackbar.label"]()}
      w={"full"}
      bg={"bg.body"}
      borderTop={"1px solid"}
      borderColor={"border.subtle"}
      pt={3}
      pb={safeArea ? "calc(env(safe-area-inset-bottom) + 16px)" : 4}
      align={"center"}
      zIndex={2}
      flexShrink={0}
      {...restProps}
    >
      {children}
    </HStack>
  );
};

const SnackbarButton = (props: {
  item: SnackbarItem;
  isActive: boolean;
  onSelect: (key: string) => void;
}) => {
  // Props
  const { item, isActive, onSelect } = props;

  // Stores
  const { theme } = useThemeStore();

  // Derived Values
  const color = isActive ? `${theme.colorPalette}.fg` : "fg.muted";

  return (
    <Button
      variant={"ghost"}
      flex={1}
      minW={0}
      h={"auto"}
      minH={12}
      px={1}
      py={2}
      aria-current={isActive ? "page" : undefined}
      onClick={() => onSelect(item.key)}
    >
      <VStack align={"center"} gap={1} minW={0}>
        <Box pos={"relative"}>
          <AppIcon icon={item.icon} color={color} />
          {item.badge !== undefined && item.badge > 0 && (
            <CountBadge floating={true}>{item.badge}</CountBadge>
          )}
        </Box>

        <P
          lineClamp={1}
          fontSize={"2xs"}
          fontWeight={isActive ? "semibold" : "medium"}
          color={color}
          textAlign={"center"}
          lineHeight={"normal"}
        >
          {item.label}
        </P>
      </VStack>
    </Button>
  );
};

export const Snackbar = (props: SnackbarProps) => {
  // Props
  const { items, activeKey, onSelect, centerAction, endSlot, ...restProps } =
    props;

  // Derived Values
  const hasOverflow = items.length > MAX_INLINE_ITEMS;
  const inlineItems = hasOverflow ? items.slice(0, MAX_INLINE_ITEMS - 1) : items;
  const overflowItems = hasOverflow ? items.slice(MAX_INLINE_ITEMS - 1) : [];
  const isOverflowActive = overflowItems.some((item) => item.key === activeKey);
  const centerIndex = Math.ceil(inlineItems.length / 2);

  return (
    <SnackbarContainer px={2} gap={1} {...restProps}>
      {inlineItems.map((item, index) => (
        <HStack key={item.key} flex={1} minW={0} gap={1}>
          {centerAction && index === centerIndex && (
            <IconButton
              aria-label={centerAction.label}
              rounded={"full"}
              size={"xl"}
              primary={true}
              flexShrink={0}
              onClick={centerAction.onClick}
            >
              <AppIcon icon={centerAction.icon} />
            </IconButton>
          )}

          <SnackbarButton
            item={item}
            isActive={item.key === activeKey}
            onSelect={onSelect}
          />
        </HStack>
      ))}

      {hasOverflow && (
        <Menu.Root>
          <Menu.Trigger>
            <Button
              variant={"ghost"}
              flex={1}
              minW={0}
              h={"auto"}
              minH={12}
              px={1}
              py={2}
              aria-current={isOverflowActive ? "page" : undefined}
            >
              <VStack align={"center"} gap={1}>
                <AppIcon icon={EllipsisIcon} color={"fg.muted"} />
                <P fontSize={"2xs"} fontWeight={"medium"} color={"fg.muted"}>
                  {t["common.more"]()}
                </P>
              </VStack>
            </Button>
          </Menu.Trigger>

          <Menu.Content>
            {overflowItems.map((item) => (
              <Menu.Item
                key={item.key}
                value={item.key}
                onClick={() => onSelect(item.key)}
              >
                <AppIcon icon={item.icon} />
                {item.label}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Root>
      )}

      {endSlot}
    </SnackbarContainer>
  );
};
