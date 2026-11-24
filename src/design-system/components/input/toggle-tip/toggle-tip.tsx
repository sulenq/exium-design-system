// src/design-system/components/input/toggle-tip/toggle-tip.tsx

import { IconButton } from "@/design-system/components/button/button/button";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import type {
  InfoTipProps,
  ToggleTipProps,
} from "@/design-system/components/input/toggle-tip/toggle-tip.type";
import { Popover } from "@/design-system/components/overlay/popover/popover";
import { InfoIcon } from "lucide-react";
import * as React from "react";
import { t } from "@/shared/libs/i18n";

export const ToggleTip = React.forwardRef<HTMLDivElement, ToggleTipProps>(
  function ToggleTip(props, ref) {
    const {
      showArrow,
      children,
      portalled = true,
      content,
      contentProps,
      portalRef,
      ...rest
    } = props;

    return (
      <Popover.Root {...rest} positioning={{ ...rest.positioning, gutter: 4 }}>
        <Popover.Trigger asChild>{children}</Popover.Trigger>

        <Popover.Content
          portalled={portalled}
          portalRef={portalRef}
          width={"auto"}
          px={"2"}
          py={"1"}
          textStyle={"xs"}
          rounded={"sm"}
          ref={ref}
          {...contentProps}
        >
          {showArrow && (
            <Popover.Arrow>
              <Popover.ArrowTip />
            </Popover.Arrow>
          )}
          {content}
        </Popover.Content>
      </Popover.Root>
    );
  },
);

export const InfoTip = React.forwardRef<HTMLDivElement, InfoTipProps>(
  function InfoTip(props, ref) {
    // Props
    const {
      children,
      iconButtonProps,
      appIconProps,
      variant = "iconButton",
      ...restProps
    } = props;

    return (
      <ToggleTip ref={ref} content={children} {...restProps}>
        {variant === "iconButton" ? (
          <IconButton
            variant={"ghost"}
            aria-label={t["common.more_info"]()}
            size={"2xs"}
            rounded={"full"}
            {...iconButtonProps}
          >
            <AppIcon icon={InfoIcon} {...appIconProps} />
          </IconButton>
        ) : (
          <AppIcon icon={InfoIcon} cursor={"pointer"} {...appIconProps} />
        )}
      </ToggleTip>
    );
  },
);
