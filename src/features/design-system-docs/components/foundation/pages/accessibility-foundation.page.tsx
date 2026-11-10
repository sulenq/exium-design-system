// src/features/design-system-docs/components/foundation/pages/accessibility-foundation.page.tsx

import { Box } from "@/design-system/components/layout/box/box";
import { VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { SimpleGrid } from "@/design-system/components/layout/grid/grid";
import { Heading } from "@/design-system/components/typography/heading/heading";
import { P } from "@/design-system/components/typography/p/p";
import { FoundationHeader } from "@/features/design-system-docs/components/foundation/foundation-header";

export const AccessibilityFoundationPage = () => {
  return (
    <VStack gap={"lg"}>
      <FoundationHeader
        title={"Accessibility (A11y)"}
        description={"WCAG 2.1 AA conformance standards applied across all interactive controls."}
      />

      <SimpleGrid columns={[1, 3]} gap={"md"}>
        <Box
          rounded={"lg"}
          border={"1px solid"}
          borderColor={"border.subtle"}
          bg={"bg.body"}
        >
          <VStack gap={"xs"} p={"md"}>
            <Heading size={"sm"} fontWeight={"bold"}>
              {"Contrast Ratio"}
            </Heading>
            <P fontSize={"sm"} color={"fg.muted"}>
              {"Minimum 4.5:1 for normal text and 3:1 for large headers and actionable icons."}
            </P>
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
              {"Keyboard Focus"}
            </Heading>
            <P fontSize={"sm"} color={"fg.muted"}>
              {"Never suppress outline focus ring. Clear tab index order is preserved."}
            </P>
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
              {"ARIA Labels"}
            </Heading>
            <P fontSize={"sm"} color={"fg.muted"}>
              {"All icon-only buttons require an explicit aria-label prop."}
            </P>
          </VStack>
        </Box>
      </SimpleGrid>
    </VStack>
  );
};
