// src/features/design-system-docs/components/foundation/pages/spacing-foundation.page.tsx

import { Box } from "@/design-system/components/layout/box/box";
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { Badge } from "@/design-system/components/typography/badge/badge";
import { P } from "@/design-system/components/typography/p/p";
import { FoundationHeader } from "@/features/design-system-docs/components/foundation/foundation-header";

const SPACES = [
  { token: "0", px: "0px" },
  { token: "1", px: "4px" },
  { token: "2", px: "8px" },
  { token: "3", px: "12px" },
  { token: "4", px: "16px" },
  { token: "5", px: "20px" },
  { token: "6", px: "24px" },
  { token: "8", px: "32px" },
  { token: "10", px: "40px" },
  { token: "12", px: "48px" },
  { token: "16", px: "64px" },
];

export const SpacingFoundationPage = () => {
  return (
    <VStack gap={"lg"}>
      <FoundationHeader
        title={"Spacing & Sizing"}
        description={"Consistent 4px spacing scale providing rhythmic vertical and horizontal layout flow."}
      />

      <VStack gap={"xs"}>
        {SPACES.map((sp) => (
          <Box
            key={sp.token}
            rounded={"md"}
            border={"1px solid"}
            borderColor={"border.subtle"}
            bg={"bg.body"}
          >
            <HStack
              justify={"space-between"}
              align={"center"}
              p={"xs"}
              px={"sm"}
            >
              <HStack gap={"md"} align={"center"}>
                <Badge variant={"subtle"} minW={"48px"}>
                  {sp.token}
                </Badge>
                <P fontSize={"xs"} color={"fg.muted"} fontFamily={"mono"}>
                  {sp.px}
                </P>
              </HStack>
              <Box h={"16px"} w={sp.px} bg={"blue.solid"} rounded={"xs"} />
            </HStack>
          </Box>
        ))}
      </VStack>
    </VStack>
  );
};

