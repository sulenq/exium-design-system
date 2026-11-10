// src/features/design-system-docs/components/foundation/foundation-header.tsx

import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { Badge } from "@/design-system/components/typography/badge/badge";
import { Heading } from "@/design-system/components/typography/heading/heading";
import { P } from "@/design-system/components/typography/p/p";
import type { FoundationHeaderProps } from "@/features/design-system-docs/types/foundation-header.type";

export const FoundationHeader = (props: FoundationHeaderProps) => {
  // Props
  const { title, badge = "Foundation", description } = props;

  return (
    <VStack gap={"xs"}>
      <HStack gap={"sm"} align={"center"}>
        <Heading fontSize={"3xl"} fontWeight={"bold"}>
          {title}
        </Heading>
        <Badge variant={"subtle"}>{badge}</Badge>
      </HStack>
      <P color={"fg.muted"}>{description}</P>
    </VStack>
  );
};
