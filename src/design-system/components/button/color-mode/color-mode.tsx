// src/design-system/components/button/ui/color-mode.tsx

import type { ColorModeToggleButtonProps } from "@/design-system/components/button/button/button.type";
import { IconButton } from "@/design-system/components/button/button/button";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import type { BoxProps } from "@/design-system/components/layout/box/box.type";
import { Box } from "@/design-system/components/layout/box/box";
import { useColorMode } from "@/design-system/hooks/use-color-mode";
import { EclipseIcon, SunIcon } from "lucide-react";

export const ColorModeToggleButton = (props: ColorModeToggleButtonProps) => {
  // Hooks
  const { colorMode } = useColorMode();

  return (
    <ColorModeToggleTrigger>
      <IconButton {...props}>
        <AppIcon icon={colorMode === "light" ? SunIcon : EclipseIcon} />
      </IconButton>
    </ColorModeToggleTrigger>
  );
};

export const ColorModeToggleTrigger = (props: BoxProps) => {
  // Hooks
  const { toggleColorMode } = useColorMode();

  return <Box asChild onClick={toggleColorMode} {...props} />;
};
