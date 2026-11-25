// src/design-system/components/data-display/masked-text/masked-text.tsx

import { IconButton } from "@/design-system/components/button/button/button";
import type { MaskedTextProps } from "@/design-system/components/data-display/masked-text/masked-text.type";
import { ClipboardButton } from "@/design-system/components/data-display/clipboard/clipboard-button";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { HStack } from "@/design-system/components/layout/flex-box/flex-box";
import { P } from "@/design-system/components/typography/p/p";
import { EyeIcon, EyeSlashIcon as EyeOffIcon } from "@phosphor-icons/react";
import { memo, useState } from "react";
import { t } from "@/shared/libs/i18n";

export const MaskedText = memo((props: MaskedTextProps) => {
  // Props
  const {
    value,
    defaultVisible = false,
    maskLength = 16,
    maskChar = "•",
    withCopy = true,
    copyLabel = t["masked_text.copy"](),
    withToggle = true,
    ...restProps
  } = props;

  // States
  const [isVisible, setIsVisible] = useState<boolean>(defaultVisible);

  if (!value) {
    return <P color={"fg.subtle"}>{"-"}</P>;
  }

  const maskedString = maskChar.repeat(maskLength);

  return (
    <HStack gap={2} align={"center"} w={"full"} {...restProps}>
      <HStack flex={1} minW={0} overflow={"hidden"}>
        {isVisible ? (
          <P lineClamp={1} flex={1} fontFamily={"mono"} userSelect={"all"}>
            {value}
          </P>
        ) : (
          <P
            fontFamily={"mono"}
            userSelect={"none"}
            whiteSpace={"nowrap"}
            overflow={"hidden"}
            textOverflow={"clip"}
          >
            {maskedString}
          </P>
        )}
      </HStack>

      <HStack gap={1} flexShrink={0}>
        {withToggle && (
          <IconButton
            variant={"plain"}
            size={"sm"}
            aria-label={isVisible ? t["common.hide"]() : t["common.show"]()}
            onClick={() => setIsVisible((prev) => !prev)}
          >
            <AppIcon icon={isVisible ? EyeOffIcon : EyeIcon} />
          </IconButton>
        )}

        {withCopy && (
          <ClipboardButton
            value={value}
            variant={"plain"}
            size={"sm"}
            aria-label={copyLabel}
          />
        )}
      </HStack>
    </HStack>
  );
});
