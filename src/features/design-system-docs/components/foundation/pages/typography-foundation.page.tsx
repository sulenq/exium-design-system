// src/features/design-system-docs/components/foundation/pages/typography-foundation.page.tsx

import { Box } from "@/design-system/components/layout/box/box";
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { Badge } from "@/design-system/components/typography/badge/badge";
import { P } from "@/design-system/components/typography/p/p";
import { FoundationHeader } from "@/features/design-system-docs/components/foundation/foundation-header";

const SCALES = [
  { name: "xs", size: "12px", sample: "Extra small helper label or caption" },
  { name: "sm", size: "14px", sample: "Secondary small text, table cell data" },
  { name: "md (default)", size: "16px", sample: "Default body text across inputs and standard views" },
  { name: "lg", size: "18px", sample: "Subheadings, emphasis paragraphs, card titles" },
  { name: "xl", size: "20px", sample: "Section headings, modal headers" },
  { name: "2xl", size: "24px", sample: "Primary page content subheaders" },
  { name: "3xl", size: "30px", sample: "Page hero titles and large navigation landmarks" },
];

export const TypographyFoundationPage = () => {
  return (
    <VStack gap={"lg"}>
      <FoundationHeader
        title={"Typography"}
        description={"Typography hierarchy, font sizes, tabular digits, and text clamping rules."}
      />

      <VStack gap={"sm"}>
        {SCALES.map((s) => (
          <Box
            key={s.name}
            rounded={"lg"}
            border={"1px solid"}
            borderColor={"border.subtle"}
            bg={"bg.body"}
          >
            <VStack gap={"xs"} p={"sm"}>
              <HStack justify={"space-between"} align={"center"}>
                <Badge variant={"outline"}>{s.name}</Badge>
                <P fontSize={"xs"} color={"fg.muted"} fontFamily={"mono"}>
                  {s.size}
                </P>
              </HStack>
              <P fontSize={s.size} fontWeight={"medium"}>
                {s.sample}
              </P>
            </VStack>
          </Box>
        ))}
      </VStack>
    </VStack>
  );
};

