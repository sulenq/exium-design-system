// src/design-system/components/typography/url/url.tsx

import { ClipboardButton } from "@/design-system/components/data-display/clipboard/clipboard-button";
import { HStack } from "@/design-system/components/layout/flex-box/flex-box";
import { P } from "@/design-system/components/typography/p/p";
import type { UrlProps } from "@/design-system/components/typography/url/url.type";
import { memo } from "react";
import { t } from "@/shared/libs/i18n";

export const Url = memo((props: UrlProps) => {
  // Props
  const {
    url,
    label = t["url.copy_url"](),
    isExternalLink = true,
    maxW = "280px",
    lineClamp = 1,
    ...restProps
  } = props;

  if (!url) {
    return <P color={"fg.subtle"}>{"-"}</P>;
  }

  return (
    <HStack gap={2} align={"center"} maxW={maxW} w={"full"} {...restProps}>
      <P
        as={isExternalLink ? "a" : "p"}
        href={isExternalLink ? url : undefined}
        target={isExternalLink ? "_blank" : undefined}
        rel={isExternalLink ? "noopener noreferrer" : undefined}
        fontFamily={"mono"}
        color={"fg.muted"}
        flex={1}
        lineClamp={lineClamp}
        wordBreak={"break-all"}
        _hover={
          isExternalLink
            ? {
                color: "fg",
                textDecoration: "underline",
              }
            : undefined
        }
      >
        {url}
      </P>

      <ClipboardButton
        value={url}
        aria-label={label}
        flexShrink={0}
      />
    </HStack>
  );
});
