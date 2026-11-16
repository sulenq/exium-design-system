// src/features/design-system-docs/components/foundation/pages/breakpoints-foundation.page.tsx

import { chakraConfig } from "@/design-system/chakra/chakra-system";
import { Box } from "@/design-system/components/layout/box/box";
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { SimpleGrid } from "@/design-system/components/layout/grid/grid";
import { Badge } from "@/design-system/components/typography/badge/badge";
import { Heading } from "@/design-system/components/typography/heading/heading";
import { P } from "@/design-system/components/typography/p/p";
import { CodeBlock } from "@/features/design-system-docs/components/code-block";
import { FoundationHeader } from "@/features/design-system-docs/components/foundation/foundation-header";
import type {
  BreakpointKey,
  DeviceGuideline,
} from "@/features/design-system-docs/types/foundation-pages.type";

// Constants
const DEVICE_GUIDELINES: DeviceGuideline[] = [
  {
    key: "sm",
    target: "Mobile devices (Portrait)",
    minWidth: "350px",
    range: "350px – 749px",
    layoutBehavior: "Single-column stacked flows, full-width cards and data lists.",
    navigation: "Collapsible drawer trigger (hamburger menu) or fixed bottom bar.",
    overlayBehavior: "Full-width bottom drawers or full-screen dialog sheets.",
  },
  {
    key: "md",
    target: "Tablets (Portrait) & Split views",
    minWidth: "750px",
    range: "750px – 959px",
    layoutBehavior: "2-column grid systems, side-by-side master/detail cards.",
    navigation: "Collapsible compact sidebar or condensed header nav.",
    overlayBehavior: "Standard centered modals with padding, partial-width drawers.",
  },
  {
    key: "lg",
    target: "Tablets (Landscape) & Desktops",
    minWidth: "960px",
    range: "960px – 1199px",
    layoutBehavior: "3-column grid layouts, persistent sidebars alongside content panes.",
    navigation: "Expanded persistent sidebar with full navigation tree.",
    overlayBehavior: "Standard desktop dialog modals with max-width limits (md/lg/xl).",
  },
  {
    key: "xl",
    target: "Large desktop & Widescreen",
    minWidth: "1200px",
    range: "≥ 1200px",
    layoutBehavior: "4-column analytics grids, full multi-pane workflows with fixed containers.",
    navigation: "Fully expanded sidebar with secondary action inspector panels.",
    overlayBehavior: "Large dialogs and rich multi-step floating wizards.",
  },
];

const CODE_EXAMPLE_OBJECT = `// 1. Responsive Object Syntax (Recommended)
<Box
  w={"full"}
  display={{ base: "none", md: "flex" }}
  p={{ base: 3, md: 4, lg: 6 }}
>
  <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={4}>
    <Card />
  </SimpleGrid>
</Box>`;

const CODE_EXAMPLE_HOOK = `// 2. Responsive Viewport Hooks
import { useIsSmallViewport } from "@/design-system/hooks/use-is-small-viewport";
import { useViewport } from "@/design-system/hooks/use-viewport";

const MyResponsiveComponent = () => {
  const isSmallViewport = useIsSmallViewport(); // < 720px
  const { width } = useViewport();

  return isSmallViewport ? <MobileDrawer /> : <DesktopSidebar />;
};`;

export const BreakpointsFoundationPage = () => {
  // Derived Values
  const configBreakpoints = chakraConfig.theme?.breakpoints ?? {};

  const breakpointsList = (Object.keys(configBreakpoints) as BreakpointKey[]).map((key) => {
    const minWidth = configBreakpoints[key] ?? "";
    const guideline = DEVICE_GUIDELINES.find((g) => g.key === key);

    return {
      key,
      minWidth,
      target: guideline?.target ?? "Device layout",
      range: guideline?.range ?? minWidth,
      layoutBehavior: guideline?.layoutBehavior ?? "",
      navigation: guideline?.navigation ?? "",
      overlayBehavior: guideline?.overlayBehavior ?? "",
    };
  });

  return (
    <VStack gap={8} align={"stretch"} w={"full"}>
      <FoundationHeader
        title={"Breakpoints & Responsive Layout"}
        description={"Custom responsive breakpoint tokens calibrated specifically for Exium applications, paired with device layout patterns."}
      />

      {/* Breakpoint Tokens */}
      <VStack gap={4} align={"stretch"}>
        <VStack gap={1} align={"start"}>
          <Heading size={"md"} fontWeight={"bold"}>
            {"Breakpoint Tokens"}
          </Heading>
          <P color={"fg.muted"} fontSize={"sm"}>
            {"Values are read directly from `chakraConfig.theme.breakpoints`."}
          </P>
        </VStack>

        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={4}>
          {breakpointsList.map((b) => (
            <Box
              key={b.key}
              rounded={"lg"}
              border={"1px solid"}
              borderColor={"border.subtle"}
              bg={"bg.subtle"}
              p={4}
            >
              <VStack gap={3} align={"stretch"}>
                <HStack justify={"space-between"} align={"center"}>
                  <Badge variant={"subtle"} colorPalette={"blue"}>
                    {b.key}
                  </Badge>
                  <P fontSize={"xs"} fontFamily={"mono"} color={"fg.muted"}>
                    {`≥ ${b.minWidth}`}
                  </P>
                </HStack>

                <VStack gap={1} align={"start"}>
                  <Heading size={"xs"} fontWeight={"bold"}>
                    {b.target}
                  </Heading>
                  <P fontSize={"xs"} color={"fg.muted"}>
                    {`Range: ${b.range}`}
                  </P>
                </VStack>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>

      {/* Device Layout Guidelines */}
      <VStack gap={4} align={"stretch"}>
        <VStack gap={1} align={"start"}>
          <Heading size={"md"} fontWeight={"bold"}>
            {"Device Layout Guidelines"}
          </Heading>
          <P color={"fg.muted"} fontSize={"sm"}>
            {"Design patterns, navigation structures, and modal strategies optimized for mobile, tablet, and desktop."}
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
                  {"Breakpoint"}
                </Box>
                <Box as={"th"} p={3} textAlign={"left"} fontWeight={"semibold"}>
                  {"Layout Behavior"}
                </Box>
                <Box as={"th"} p={3} textAlign={"left"} fontWeight={"semibold"}>
                  {"Navigation Strategy"}
                </Box>
                <Box as={"th"} p={3} textAlign={"left"} fontWeight={"semibold"}>
                  {"Overlay Behavior"}
                </Box>
              </Box>
            </Box>
            <Box as={"tbody"}>
              {breakpointsList.map((item) => (
                <Box
                  as={"tr"}
                  key={item.key}
                  borderBottom={"1px solid"}
                  borderColor={"border.subtle"}
                >
                  <Box as={"td"} p={3} verticalAlign={"top"}>
                    <VStack gap={1} align={"start"}>
                      <Badge variant={"subtle"} colorPalette={"blue"}>
                        {item.key}
                      </Badge>
                      <P fontSize={"2xs"} color={"fg.muted"} fontFamily={"mono"}>
                        {item.minWidth}
                      </P>
                    </VStack>
                  </Box>
                  <Box as={"td"} p={3} verticalAlign={"top"}>
                    <P fontSize={"sm"}>{item.layoutBehavior}</P>
                  </Box>
                  <Box as={"td"} p={3} verticalAlign={"top"} color={"fg.muted"}>
                    <P fontSize={"sm"}>{item.navigation}</P>
                  </Box>
                  <Box as={"td"} p={3} verticalAlign={"top"} color={"fg.muted"}>
                    <P fontSize={"sm"}>{item.overlayBehavior}</P>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </VStack>

      {/* Responsive Patterns & Code Examples */}
      <VStack gap={4} align={"stretch"}>
        <VStack gap={1} align={"start"}>
          <Heading size={"md"} fontWeight={"bold"}>
            {"Responsive Code Patterns"}
          </Heading>
          <P color={"fg.muted"} fontSize={"sm"}>
            {"Standard conventions for writing responsive layouts in Exium components."}
          </P>
        </VStack>

        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={4}>
          <Box
            p={4}
            rounded={"lg"}
            border={"1px solid"}
            borderColor={"border.subtle"}
            bg={"bg.subtle"}
          >
            <VStack gap={3} align={"stretch"}>
              <Heading size={"xs"} fontWeight={"bold"}>
                {"Chakra Responsive Object Props"}
              </Heading>
              <CodeBlock code={CODE_EXAMPLE_OBJECT} language={"tsx"} />
            </VStack>
          </Box>

          <Box
            p={4}
            rounded={"lg"}
            border={"1px solid"}
            borderColor={"border.subtle"}
            bg={"bg.subtle"}
          >
            <VStack gap={3} align={"stretch"}>
              <Heading size={"xs"} fontWeight={"bold"}>
                {"Programmatic Viewport Hooks"}
              </Heading>
              <CodeBlock code={CODE_EXAMPLE_HOOK} language={"tsx"} />
            </VStack>
          </Box>
        </SimpleGrid>
      </VStack>
    </VStack>
  );
};
