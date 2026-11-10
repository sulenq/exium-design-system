// src/features/design-system-docs/components/foundation/pages/radius-foundation.page.tsx

import { Box } from "@/design-system/components/layout/box/box";
import { VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { SimpleGrid } from "@/design-system/components/layout/grid/grid";
import { Heading } from "@/design-system/components/typography/heading/heading";
import { P } from "@/design-system/components/typography/p/p";
import { ROUNDED_PRESETS_LIST } from "@/design-system/constants/presets";
import { FoundationHeader } from "@/features/design-system-docs/components/foundation/foundation-header";

export const RadiusFoundationPage = () => {
  return (
    <VStack gap={"lg"}>
      <FoundationHeader
        title={"Radius & Borders"}
        description={"Corner radius presets dynamically paired for components and containers."}
      />

      <SimpleGrid columns={[2, 4]} gap={"sm"}>
        {ROUNDED_PRESETS_LIST.map((r) => (
          <Box
            key={r.label}
            rounded={"lg"}
            border={"1px solid"}
            borderColor={"border.subtle"}
            bg={"bg.body"}
          >
            <VStack gap={"xs"} p={"sm"}>
              <Box
                w={"full"}
                h={"64px"}
                bg={"blue.subtle"}
                border={"2px solid"}
                borderColor={"blue.solid"}
                rounded={r.component}
                mb={"2xs"}
              />
              <Heading size={"xs"} fontWeight={"bold"}>
                {r.label}
              </Heading>
              <P fontSize={"2xs"} color={"fg.muted"}>
                {"Component: "}{r.component}
              </P>
              <P fontSize={"2xs"} color={"fg.muted"}>
                {"Container: "}{r.container}
              </P>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

