// src/design-system/components/shell/ui/common-app-shell.tsx

"use client";

import { Logo } from "@/design-system/components/branding/logo/logo";
import { Button } from "@/design-system/components/button/button/button";
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { PageContainer } from "@/design-system/components/layout/page-container/page-container";
import type { CommonAppShellProps } from "@/design-system/components/shell/common-app-shell/common-app-shell.type";
import { SettingsTrigger } from "@/features/settings/components/settings";
import { Outlet } from "@tanstack/react-router";

export const CommonAppShell = (props: CommonAppShellProps) => {
  // Props
  const { ...restProps } = props;

  return (
    <PageContainer flexDir={"row"} {...restProps}>
      <SideBar />

      <SettingsTrigger modalKey={"settings"} mt={"auto"}>
        <Button>Settings</Button>
      </SettingsTrigger>
      <Outlet />
    </PageContainer>
  );
};

const SideBar = () => {
  return (
    <VStack>
      <HStack align={"center"}>
        <Logo />
      </HStack>
    </VStack>
  );
};
