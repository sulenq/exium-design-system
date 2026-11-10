// src/features/design-system-docs/components/foundation/pages/breakpoints-foundation.page.tsx

import { Box } from "@/design-system/components/layout/box/box";
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { SimpleGrid } from "@/design-system/components/layout/grid/grid";
import { Badge } from "@/design-system/components/typography/badge/badge";
import { Heading } from "@/design-system/components/typography/heading/heading";
import { P } from "@/design-system/components/typography/p/p";
import { FoundationHeader } from "@/features/design-system-docs/components/foundation/foundation-header";

const BREAKPOINTS = [
  { name: "sm", width: "350px", desc: "Small mobile screens" },
  { name: "md", width: "750px", desc: "Tablet portrait and compact split views" },
  { name: "lg", width: "960px", desc: "Tablet landscape and desktop layouts" },
  { name: "xl", width: "1200px", desc: "Large desktop displays" },
];

export const BreakpointsFoundationPage = () => {
  return (
    <VStack gap={"lg"}>
      <FoundationHeader
        title={"Breakpoints & Responsive Layout"}
        description={"Custom responsive breakpoint tokens calibrated specifically for Exium applications."}
      />

      <SimpleGrid columns={[1, 2]} gap={"md"}>
        {BREAKPOINTS.map((b) => (
          <Box
            key={b.name}
            rounded={"lg"}
            border={"1px solid"}
            borderColor={"border.subtle"}
            bg={"bg.body"}
          >
            <VStack gap={"xs"} p={"md"}>
              <HStack justify={"space-between"} align={"center"} mb={"2xs"}>
                <Badge variant={"subtle"} colorPalette={"blue"}>
                  {b.name}
                </Badge>
                <Heading size={"xs"} fontFamily={"mono"}>
                  {`min-width: ${b.width}`}
                </Heading>
              </HStack>
              <P fontSize={"sm"} color={"fg.muted"}>
                {b.desc}
              </P>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  );
};
