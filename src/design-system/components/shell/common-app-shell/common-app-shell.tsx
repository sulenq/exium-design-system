// src/design-system/components/shell/common-app-shell/common-app-shell.tsx

"use client";

import { Logo } from "@/design-system/components/branding/logo/logo";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { Box } from "@/design-system/components/layout/box/box";
import { HStack } from "@/design-system/components/layout/flex-box/flex-box";
import { PageContainer } from "@/design-system/components/layout/page-container/page-container";
import { NavButton } from "@/design-system/components/navigation/nav/nav";
import { Sidebar } from "@/design-system/components/navigation/sidebar/sidebar";
import { Snackbar } from "@/design-system/components/navigation/snackbar/snackbar";
import type {
  CommonAppShellNavItem,
  CommonAppShellProps,
} from "@/design-system/components/shell/common-app-shell/common-app-shell.type";
import { CountBadge } from "@/design-system/components/typography/count-badge/count-badge";
import { useIsSmallViewport } from "@/design-system/hooks/use-is-small-viewport";
import { useThemeStore } from "@/design-system/stores/theme-store";
import { isEmptyArray } from "@/shared/utils/data/array";
import { Outlet } from "@tanstack/react-router";
import type { ReactNode } from "react";

/**
 * Generic app shell. Desktop: sidebar with brand, navigation and a footer slot.
 * Mobile (< 720 px): header with brand and a trailing slot, scrollable content, and a
 * Snackbar bottom navigation built from the same `navItems`.
 */
export const CommonAppShell = (props: CommonAppShellProps) => {
  // Props
  const {
    navItems = [],
    activeKey,
    onNavigate,
    brand,
    headerEnd,
    sidebarFooter,
    mobileCenterAction,
    children,
    ...restProps
  } = props;

  // Hooks
  const isSmallViewport = useIsSmallViewport();

  // Derived Values
  const resolvedBrand = brand ?? (
    <Logo boxSize={18} ml={1.5} flexShrink={0} />
  );
  const content = children ?? <Outlet />;
  const hasNav = !isEmptyArray(navItems);

  if (isSmallViewport) {
    return (
      <PageContainer flexDir={"column"} h={"100dvh"} overflow={"hidden"} {...restProps}>
        <HStack
          as={"header"}
          align={"center"}
          justify={"space-between"}
          gap={3}
          px={4}
          pt={"calc(env(safe-area-inset-top) + 8px)"}
          pb={2}
          minH={14}
          flexShrink={0}
          borderBottom={"1px solid"}
          borderColor={"border.subtle"}
        >
          {resolvedBrand}
          {headerEnd}
        </HStack>

        <Box as={"main"} flex={1} minH={0} overflowY={"auto"}>
          {content}
        </Box>

        {hasNav && (
          <Snackbar
            items={navItems}
            activeKey={activeKey}
            onSelect={(key: string) => onNavigate?.(key)}
            centerAction={mobileCenterAction}
          />
        )}
      </PageContainer>
    );
  }

  return (
    <PageContainer flexDir={"row"} h={"100dvh"} overflow={"hidden"} {...restProps}>
      <Sidebar>
        <Sidebar.Header>
          <HStack align={"center"} px={4} py={3}>
            {resolvedBrand}
          </HStack>
        </Sidebar.Header>

        <Sidebar.Separator />

        <Sidebar.Body as={"nav"} flex={1} p={3} gap={1}>
          {navItems.map((item) => (
            <ShellNavButton
              key={item.key}
              item={item}
              isActive={item.key === activeKey}
              onSelect={onNavigate}
            />
          ))}
        </Sidebar.Body>

        {sidebarFooter && (
          <>
            <Sidebar.Separator />
            <Sidebar.Footer p={3}>{sidebarFooter}</Sidebar.Footer>
          </>
        )}
      </Sidebar>

      <Box as={"main"} flex={1} minW={0} overflowY={"auto"}>
        {content}
      </Box>
    </PageContainer>
  );
};

// -------------------------------------------------------------------------------------
// Sidebar navigation item
// -------------------------------------------------------------------------------------

const ShellNavButton = (props: {
  item: CommonAppShellNavItem;
  isActive: boolean;
  onSelect?: (key: string) => void;
}): ReactNode => {
  // Props
  const { item, isActive, onSelect } = props;

  // Stores
  const { theme } = useThemeStore();

  return (
    <NavButton
      variant={isActive ? "subtle" : "ghost"}
      colorPalette={isActive ? theme.colorPalette : undefined}
      w={"full"}
      aria-current={isActive ? "page" : undefined}
      onClick={() => onSelect?.(item.key)}
    >
      <AppIcon icon={item.icon} />
      <Box flex={1} textAlign={"start"}>
        {item.label}
      </Box>
      {item.badge !== undefined && item.badge > 0 && <CountBadge>{item.badge}</CountBadge>}
    </NavButton>
  );
};
