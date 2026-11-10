// src/features/design-system-docs/components/foundation/pages/motion-foundation.page.tsx

import { Box } from "@/design-system/components/layout/box/box";
import { VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { SimpleGrid } from "@/design-system/components/layout/grid/grid";
import { Badge } from "@/design-system/components/typography/badge/badge";
import { Heading } from "@/design-system/components/typography/heading/heading";
import { P } from "@/design-system/components/typography/p/p";
import { FoundationHeader } from "@/features/design-system-docs/components/foundation/foundation-header";

export const MotionFoundationPage = () => {
  return (
    <VStack gap={"lg"}>
      <FoundationHeader
        title={"Motion & Animations"}
        description={"Pre-configured keyframes for dialog scaling, popover origin expansion, and layout transitions."}
      />

      <SimpleGrid columns={[1, 2]} gap={"md"}>
        <Box
          rounded={"lg"}
          border={"1px solid"}
          borderColor={"border.subtle"}
          bg={"bg.body"}
        >
          <VStack gap={"xs"} p={"md"}>
            <Heading size={"sm"} fontWeight={"bold"}>
              {"Dialog & Overlay Scale"}
            </Heading>
            <P fontSize={"sm"} color={"fg.muted"}>
              {"Keyframes scale-up and scale-up-from-click-origin animate modals directly from trigger click coordinates."}
            </P>
            <Box mt={"xs"}>
              <Badge variant={"subtle"}>{"scale-up / scale-up-overshoot"}</Badge>
            </Box>
          </VStack>
        </Box>

        <Box
          rounded={"lg"}
          border={"1px solid"}
          borderColor={"border.subtle"}
          bg={"bg.body"}
        >
          <VStack gap={"xs"} p={"md"}>
            <Heading size={"sm"} fontWeight={"bold"}>
              {"Alert Attention"}
            </Heading>
            <P fontSize={"sm"} color={"fg.muted"}>
              {"Controlled via useAlertAnimation to shake or highlight on unhandled user form validation errors."}
            </P>
            <Box mt={"xs"}>
              <Badge variant={"subtle"}>{"shrink-x / ping"}</Badge>
            </Box>
          </VStack>
        </Box>
      </SimpleGrid>
    </VStack>
  );
};
