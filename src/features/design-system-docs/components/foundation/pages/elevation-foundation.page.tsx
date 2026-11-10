// src/features/design-system-docs/components/foundation/pages/elevation-foundation.page.tsx

import { Box } from "@/design-system/components/layout/box/box";
import { VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { SimpleGrid } from "@/design-system/components/layout/grid/grid";
import { Heading } from "@/design-system/components/typography/heading/heading";
import { P } from "@/design-system/components/typography/p/p";
import { FoundationHeader } from "@/features/design-system-docs/components/foundation/foundation-header";

const SHADOWS = [
  { name: "2xs", css: "0 1px 2px rgba(0,0,0,0.05)" },
  { name: "xs", css: "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)" },
  { name: "sm", css: "0 2px 4px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)" },
  { name: "md", css: "0 4px 6px -1px rgba(0,0,0,0.1)" },
  { name: "lg", css: "0 10px 15px -3px rgba(0,0,0,0.1)" },
  { name: "xl", css: "0 20px 25px -5px rgba(0,0,0,0.1)" },
];

export const ElevationFoundationPage = () => {
  return (
    <VStack gap={"lg"}>
      <FoundationHeader
        title={"Elevation & Shadows"}
        description={"Depth layers and elevation levels for popovers, dialogs, drawers, and floating panels."}
      />

      <SimpleGrid columns={[2, 3]} gap={"md"}>
        {SHADOWS.map((sh) => (
          <Box
            key={sh.name}
            rounded={"lg"}
            bg={"bg.body"}
            boxShadow={sh.name}
            border={"1px solid"}
            borderColor={"border.subtle"}
          >
            <VStack gap={"xs"} p={"md"}>
              <Heading size={"sm"} fontWeight={"bold"}>
                {sh.name}
              </Heading>
              <P fontSize={"2xs"} color={"fg.muted"} fontFamily={"mono"}>
                {sh.css}
              </P>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

