// src/features/design-system-docs/components/foundation/pages/elevation-foundation.page.tsx

import { chakraConfig } from "@/design-system/chakra/chakra-system";
import { Box } from "@/design-system/components/layout/box/box";
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { SimpleGrid } from "@/design-system/components/layout/grid/grid";
import { Badge } from "@/design-system/components/typography/badge/badge";
import { Heading } from "@/design-system/components/typography/heading/heading";
import { P } from "@/design-system/components/typography/p/p";
import { FoundationHeader } from "@/features/design-system-docs/components/foundation/foundation-header";
import type {
  ShadowGuideItem,
  ShadowLevel,
  ShadowTokenValue,
} from "@/features/design-system-docs/types/foundation-pages.type";

// Constants
const SHADOW_KEYS: ShadowLevel[] = ["xs", "sm", "md", "lg", "xl", "2xl"];

const SHADOW_GUIDELINES: ShadowGuideItem[] = [
  {
    level: "xs",
    components: ["Subtle Card hover", "Inline toolbar", "Flat status badge"],
    purpose: "Micro-depth for hover states and delicate element separation.",
  },
  {
    level: "sm",
    components: ["Card (Default)", "Input focus dropdown", "List group item"],
    purpose: "Standard resting depth for resting cards and compact interactive widgets.",
  },
  {
    level: "md",
    components: ["Popover", "Floating action menu", "Dropdown menu", "Tooltip panel"],
    purpose: "Mid-level floating panels that sit above regular page content.",
  },
  {
    level: "lg",
    components: ["Drawer / Offcanvas", "Bottom sheet", "Sticky floating header"],
    purpose: "Elevated navigation panels and slide-over containers.",
  },
  {
    level: "xl",
    components: ["Dialog / Standard Modal", "Confirmation alert", "Image lightbox"],
    purpose: "Primary system modals and critical blocking interactions.",
  },
  {
    level: "2xl",
    components: ["Top-level system alerts", "Fullscreen alert modals", "Highest z-index focus"],
    purpose: "Maximum prominence layer for urgent or destructive focus flows.",
  },
];

// Helper to extract clean shadow CSS without !important for readability
const cleanShadowCss = (rawCss: string) => {
  return rawCss.replace(/\s*!important/g, "").trim();
};

export const ElevationFoundationPage = () => {
  // Derived Values
  const shadowTokens = chakraConfig.theme?.tokens?.shadows ?? {};

  const shadows = SHADOW_KEYS.map((key) => {
    const tokenVal = shadowTokens[key]?.value as ShadowTokenValue | undefined;
    const baseValue = tokenVal?.base ?? "";
    const darkValue = tokenVal?._dark ?? "";

    return {
      name: key,
      baseCss: cleanShadowCss(baseValue),
      darkCss: cleanShadowCss(darkValue),
    };
  });

  return (
    <VStack gap={8} align={"stretch"} w={"full"}>
      <FoundationHeader
        title={"Elevation & Shadows"}
        description={"Depth layers and elevation levels for cards, popovers, drawers, and modal dialogs, calibrated with dedicated dark mode contrasts."}
      />

      {/* Shadow Levels Visual Preview */}
      <VStack gap={4} align={"stretch"}>
        <VStack gap={1} align={"start"}>
          <Heading size={"md"} fontWeight={"bold"}>
            {"Shadow Tokens"}
          </Heading>
          <P color={"fg.muted"} fontSize={"sm"}>
            {"Each elevation level is configured with balanced light and dark values read directly from the theme tokens."}
          </P>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
          {shadows.map((sh) => (
            <Box
              key={sh.name}
              rounded={"lg"}
              bg={"bg.subtle"}
              border={"1px solid"}
              borderColor={"border.subtle"}
              p={4}
            >
              <VStack gap={4} align={"stretch"}>
                <HStack justify={"space-between"} align={"center"}>
                  <Badge variant={"subtle"} colorPalette={"blue"}>
                    {sh.name}
                  </Badge>
                  <P fontSize={"xs"} color={"fg.muted"} fontFamily={"mono"}>
                    {`shadow="${sh.name}"`}
                  </P>
                </HStack>

                {/* Light preview card */}
                <Box
                  rounded={"md"}
                  bg={"#ffffff"}
                  color={"#1a202c"}
                  p={4}
                  boxShadow={sh.name}
                  border={"1px solid"}
                  borderColor={"rgba(0,0,0,0.06)"}
                >
                  <VStack gap={1} align={"start"}>
                    <HStack justify={"space-between"} w={"full"}>
                      <P fontSize={"xs"} fontWeight={"bold"} color={"#1a202c"}>
                        {"Light Preview"}
                      </P>
                      <Badge size={"xs"} variant={"outline"} colorPalette={"gray"}>
                        {"base"}
                      </Badge>
                    </HStack>
                    <P fontSize={"2xs"} color={"#718096"} fontFamily={"mono"} lineClamp={2}>
                      {sh.baseCss}
                    </P>
                  </VStack>
                </Box>

                {/* Dark preview card */}
                <Box
                  rounded={"md"}
                  bg={"#1a202c"}
                  color={"#f7fafc"}
                  p={4}
                  boxShadow={sh.darkCss}
                  border={"1px solid"}
                  borderColor={"rgba(255,255,255,0.08)"}
                >
                  <VStack gap={1} align={"start"}>
                    <HStack justify={"space-between"} w={"full"}>
                      <P fontSize={"xs"} fontWeight={"bold"} color={"#f7fafc"}>
                        {"Dark Preview"}
                      </P>
                      <Badge size={"xs"} variant={"solid"} colorPalette={"purple"}>
                        {"_dark"}
                      </Badge>
                    </HStack>
                    <P fontSize={"2xs"} color={"#a0aec0"} fontFamily={"mono"} lineClamp={2}>
                      {sh.darkCss}
                    </P>
                  </VStack>
                </Box>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>

      {/* Usage Guidelines */}
      <VStack gap={4} align={"stretch"}>
        <VStack gap={1} align={"start"}>
          <Heading size={"md"} fontWeight={"bold"}>
            {"Elevation Usage Guidelines"}
          </Heading>
          <P color={"fg.muted"} fontSize={"sm"}>
            {"Recommended elevation levels mapped to UI patterns and overlays in Exium applications."}
          </P>
        </VStack>

        <Box
          w={"full"}
          overflowX={"auto"}
          rounded={"lg"}
          border={"1px solid"}
          borderColor={"border.subtle"}
          bg={"bg.subtle"}
        >
          <Box as={"table"} w={"full"} fontSize={"sm"}>
            <Box as={"thead"} borderBottom={"1px solid"} borderColor={"border.subtle"}>
              <Box as={"tr"}>
                <Box as={"th"} p={3} textAlign={"left"} fontWeight={"semibold"}>
                  {"Level"}
                </Box>
                <Box as={"th"} p={3} textAlign={"left"} fontWeight={"semibold"}>
                  {"Recommended Components"}
                </Box>
                <Box as={"th"} p={3} textAlign={"left"} fontWeight={"semibold"}>
                  {"Purpose & Depth"}
                </Box>
              </Box>
            </Box>
            <Box as={"tbody"}>
              {SHADOW_GUIDELINES.map((item) => (
                <Box
                  as={"tr"}
                  key={item.level}
                  borderBottom={"1px solid"}
                  borderColor={"border.subtle"}
                >
                  <Box as={"td"} p={3} verticalAlign={"top"}>
                    <Badge variant={"subtle"} colorPalette={"blue"}>
                      {item.level}
                    </Badge>
                  </Box>
                  <Box as={"td"} p={3} verticalAlign={"top"}>
                    <HStack gap={1} wrap={"wrap"}>
                      {item.components.map((comp) => (
                        <Badge key={comp} size={"xs"} variant={"outline"} colorPalette={"gray"}>
                          {comp}
                        </Badge>
                      ))}
                    </HStack>
                  </Box>
                  <Box as={"td"} p={3} verticalAlign={"top"} color={"fg.muted"}>
                    {item.purpose}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </VStack>
    </VStack>
  );
};
