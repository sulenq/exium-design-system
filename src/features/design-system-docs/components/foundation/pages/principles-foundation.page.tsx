// src/features/design-system-docs/components/foundation/pages/principles-foundation.page.tsx

import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { Box } from "@/design-system/components/layout/box/box";
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { SimpleGrid } from "@/design-system/components/layout/grid/grid";
import { Heading } from "@/design-system/components/typography/heading/heading";
import { P } from "@/design-system/components/typography/p/p";
import { FoundationHeader } from "@/features/design-system-docs/components/foundation/foundation-header";
import {
  AccessibilityIcon,
  LayersIcon,
  ShieldCheckIcon,
  ZapIcon,
} from "lucide-react";

const PRINCIPLES = [
  {
    title: "Strict Type Safety & Zero Ambiguity",
    description:
      "All components, props, and variants are strictly typed with TypeScript. No bare strings or untyped props. Prop values always use curly brackets: value={\"foo\"}.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Zero Runtime Fallback Surprises",
    description:
      "Never silently mask missing data or broken endpoints. Errors and empty states are surfaced explicitly via designated feedback primitives.",
    icon: ZapIcon,
  },
  {
    title: "Flat Architectural Hierarchy",
    description:
      "Components are organized strictly in atomic flat folders by group: src/design-system/components/<group>/<component>/<component>.tsx with adjacent types.",
    icon: LayersIcon,
  },
  {
    title: "Accessibility by Default",
    description:
      "Full keyboard navigability, WAI-ARIA conformance, high contrast ratios, and screen reader-friendly labelling are built into every component recipe.",
    icon: AccessibilityIcon,
  },
];

export const PrinciplesFoundationPage = () => {
  return (
    <VStack gap={"lg"}>
      <FoundationHeader
        title={"Design Principles"}
        description={"Fundamental guidelines and architectural decisions powering Exium Design System."}
      />

      <SimpleGrid columns={[1, null, 2]} gap={"md"}>
        {PRINCIPLES.map((p) => (
          <Box
            key={p.title}
            rounded={"lg"}
            border={"1px solid"}
            borderColor={"border.subtle"}
            bg={"bg.body"}
          >
            <VStack gap={"xs"} p={"md"}>
              <HStack gap={"sm"} align={"center"} mb={"xs"}>
                <AppIcon icon={p.icon} color={"blue.fg"} size={"lg"} />
                <Heading size={"sm"} fontWeight={"bold"}>
                  {p.title}
                </Heading>
              </HStack>
              <P fontSize={"sm"} color={"fg.muted"}>
                {p.description}
              </P>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

