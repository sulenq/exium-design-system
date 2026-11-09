// src/features/auth/components/ui/user-session-actions.tsx

import { Button } from "@/design-system/components/button/button/button";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { SignoutTrigger } from "@/features/auth/components/ui/signout-modal";
import { useSignoutMutation } from "@/features/auth/hooks/use-signout.mutation";
import type { UserSessionActionsProps } from "@/features/auth/types/user-session-card.type";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRightIcon, LogOutIcon } from "lucide-react";

export const UserSessionActions = (props: UserSessionActionsProps) => {
  // Props
  const { user: _user, onEnterDashboard, ...restProps } = props;

  // Hooks
  const navigate = useNavigate();
  const signoutMutation = useSignoutMutation();

  // Handlers
  const handleEnter = () => {
    if (onEnterDashboard) {
      onEnterDashboard();
      return;
    }
    void navigate({ to: "/design-system/ui" });
  };


  return (
    <VStack gap={"xs"} w={"full"} maxW={"300px"} mx={"auto"} {...restProps}>
      <Button primary w={"full"} size={"lg"} onClick={handleEnter}>
        {"Masuk ke Aplikasi"}
        <AppIcon icon={ArrowRightIcon} />
      </Button>

      <SignoutTrigger>
        <Button
          w={"full"}
          colorPalette={"red"}
          size={"lg"}
          loading={signoutMutation.isPending}
        >
          <AppIcon icon={LogOutIcon} />
          {"Ganti Akun / Keluar"}
        </Button>
      </SignoutTrigger>
    </VStack>
  );
};
