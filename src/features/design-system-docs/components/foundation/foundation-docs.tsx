// src/features/design-system-docs/components/foundation/foundation-docs.tsx

import { Button } from "@/design-system/components/button/button/button";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { Box } from "@/design-system/components/layout/box/box";
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { SimpleGrid } from "@/design-system/components/layout/grid/grid";
import { Badge } from "@/design-system/components/typography/badge/badge";
import { P } from "@/design-system/components/typography/p/p";
import { COLOR_PALETTES_LIST } from "@/design-system/constants/colors";
import { ROUNDED_PRESETS_LIST } from "@/design-system/constants/presets";
import { CodeBlock } from "@/features/design-system-docs/components/code-block";
import type { DsNavKey } from "@/features/design-system-docs/types/ds-docs-navs.type";
import {
  AccessibilityIcon,
  CheckIcon,
  CopyIcon,
  LayersIcon,
  ShieldCheckIcon,
  ZapIcon,
} from "lucide-react";
import { useState } from "react";

export const FoundationDocs = ({ navKey }: { navKey: DsNavKey }) => {
  // States
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Handlers
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  if (navKey === "principles") {
    return (
      <VStack align={"stretch"} gap={6} w={"full"}>
        <VStack align={"start"} gap={2}>
          <HStack gap={2} align={"center"}>
            <P fontSize={"3xl"} fontWeight={"bold"}>
              {"Design Principles"}
            </P>
            <Badge variant={"subtle"}>{"Foundation"}</Badge>
          </HStack>
          <P color={"fg.muted"}>
            {"Fundamental guidelines and architectural decisions powering Exium Design System."}
          </P>
        </VStack>

        <SimpleGrid columns={[1, null, 2]} gap={4}>
          <Box p={5} rounded={"lg"} border={"1px solid"} borderColor={"border.subtle"} bg={"bg.body"}>
            <HStack gap={3} mb={3}>
              <AppIcon icon={ShieldCheckIcon} color={"blue.fg"} size={"lg"} />
              <P fontWeight={"bold"} fontSize={"lg"}>
                {"Strict Type Safety & Zero Ambiguity"}
              </P>
            </HStack>
            <P fontSize={"sm"} color={"fg.muted"}>
              {"All components, props, and variants are strictly typed with TypeScript. No bare strings or untyped props. Prop values always use curly brackets: value={\"foo\"}."}
            </P>
          </Box>

          <Box p={5} rounded={"lg"} border={"1px solid"} borderColor={"border.subtle"} bg={"bg.body"}>
            <HStack gap={3} mb={3}>
              <AppIcon icon={ZapIcon} color={"blue.fg"} size={"lg"} />
              <P fontWeight={"bold"} fontSize={"lg"}>
                {"Zero Runtime Fallback Surprises"}
              </P>
            </HStack>
            <P fontSize={"sm"} color={"fg.muted"}>
              {"Never silently mask missing data or broken endpoints. Errors and empty states are surfaced explicitly via designated feedback primitives."}
            </P>
          </Box>

          <Box p={5} rounded={"lg"} border={"1px solid"} borderColor={"border.subtle"} bg={"bg.body"}>
            <HStack gap={3} mb={3}>
              <AppIcon icon={LayersIcon} color={"blue.fg"} size={"lg"} />
              <P fontWeight={"bold"} fontSize={"lg"}>
                {"Flat Architectural Hierarchy"}
              </P>
            </HStack>
            <P fontSize={"sm"} color={"fg.muted"}>
              {"Components are organized strictly in atomic flat folders by group: src/design-system/components/<group>/<component>/<component>.tsx with adjacent types."}
            </P>
          </Box>

          <Box p={5} rounded={"lg"} border={"1px solid"} borderColor={"border.subtle"} bg={"bg.body"}>
            <HStack gap={3} mb={3}>
              <AppIcon icon={AccessibilityIcon} color={"blue.fg"} size={"lg"} />
              <P fontWeight={"bold"} fontSize={"lg"}>
                {"Accessibility by Default"}
              </P>
            </HStack>
            <P fontSize={"sm"} color={"fg.muted"}>
              {"Full keyboard navigability, WAI-ARIA conformance, high contrast ratios, and screen reader-friendly labelling are built into every component recipe."}
            </P>
          </Box>
        </SimpleGrid>
      </VStack>
    );
  }

  if (navKey === "design_tokens") {
    return (
      <VStack align={"stretch"} gap={6} w={"full"}>
        <VStack align={"start"} gap={2}>
          <HStack gap={2} align={"center"}>
            <P fontSize={"3xl"} fontWeight={"bold"}>
              {"Design Tokens"}
            </P>
            <Badge variant={"subtle"}>{"Foundation"}</Badge>
          </HStack>
          <P color={"fg.muted"}>
            {"Semantic tokens unifying colors, spacing, radii, shadows, and z-indices across Chakra UI v3."}
          </P>
        </VStack>

        <Box p={4} rounded={"lg"} border={"1px solid"} borderColor={"border.subtle"} bg={"bg.body"}>
          <P fontWeight={"bold"} mb={2}>
            {"Token Architecture"}
          </P>
          <P fontSize={"sm"} color={"fg.muted"} mb={4}>
            {"Tokens are configured via Chakra's defineConfig and createSystem in @/design-system/chakra/chakra-system.ts. They resolve to native CSS variables dynamically adaptive to light and dark modes."}
          </P>
          <CodeBlock
            code={`import { Box, HStack } from "@/design-system/components/layout/box/box";

// Using semantic tokens in Chakra props
<Box bg={"bg.body"} color={"fg.default"} border={"1px solid"} borderColor={"border.subtle"}>
  <P color={"colorPalette.fg"}>{"Active Accent Content"}</P>
</Box>`}
            language={"tsx"}
          />
        </Box>
      </VStack>
    );
  }

  if (navKey === "colors") {
    return (
      <VStack align={"stretch"} gap={6} w={"full"}>
        <VStack align={"start"} gap={2}>
          <HStack gap={2} align={"center"}>
            <P fontSize={"3xl"} fontWeight={"bold"}>
              {"Colors & Palettes"}
            </P>
            <Badge variant={"subtle"}>{"Foundation"}</Badge>
          </HStack>
          <P color={"fg.muted"}>
            {"Authentic color palettes supported by Exium Design System with light and dark mode scales."}
          </P>
        </VStack>

        <SimpleGrid columns={[2, 3, 4, 6]} gap={3}>
          {COLOR_PALETTES_LIST.map((c) => (
            <Box
              key={c.palette}
              p={3}
              rounded={"lg"}
              border={"1px solid"}
              borderColor={"border.subtle"}
              bg={"bg.body"}
            >
              <Box
                w={"full"}
                h={"48px"}
                rounded={"md"}
                bg={c.primaryHex}
                mb={2}
                border={"1px solid"}
                borderColor={"blackAlpha.100"}
              />
              <P fontSize={"xs"} fontWeight={"bold"}>
                {c.label}
              </P>
              <HStack justify={"space-between"} align={"center"} mt={1}>
                <P fontSize={"2xs"} color={"fg.muted"} fontFamily={"mono"}>
                  {c.primaryHex}
                </P>
                <Button
                  size={"xs"}
                  variant={"ghost"}
                  onClick={() => handleCopy(c.palette, c.palette)}
                >
                  <AppIcon
                    icon={copiedKey === c.palette ? CheckIcon : CopyIcon}
                    size={"xs"}
                  />
                </Button>
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    );
  }

  if (navKey === "typography_foundation") {
    const scales = [
      { name: "xs", size: "12px", sample: "Extra small helper label or caption" },
      { name: "sm", size: "14px", sample: "Secondary small text, table cell data" },
      { name: "md (default)", size: "16px", sample: "Default body text across inputs and standard views" },
      { name: "lg", size: "18px", sample: "Subheadings, emphasis paragraphs, card titles" },
      { name: "xl", size: "20px", sample: "Section headings, modal headers" },
      { name: "2xl", size: "24px", sample: "Primary page content subheaders" },
      { name: "3xl", size: "30px", sample: "Page hero titles and large navigation landmarks" },
    ];

    return (
      <VStack align={"stretch"} gap={6} w={"full"}>
        <VStack align={"start"} gap={2}>
          <HStack gap={2} align={"center"}>
            <P fontSize={"3xl"} fontWeight={"bold"}>
              {"Typography"}
            </P>
            <Badge variant={"subtle"}>{"Foundation"}</Badge>
          </HStack>
          <P color={"fg.muted"}>
            {"Typography hierarchy, font sizes, tabular digits, and text clamping rules."}
          </P>
        </VStack>

        <VStack align={"stretch"} gap={3}>
          {scales.map((s) => (
            <Box
              key={s.name}
              p={4}
              rounded={"lg"}
              border={"1px solid"}
              borderColor={"border.subtle"}
              bg={"bg.body"}
            >
              <HStack justify={"space-between"} mb={1}>
                <Badge variant={"outline"}>{s.name}</Badge>
                <P fontSize={"xs"} color={"fg.muted"} fontFamily={"mono"}>
                  {s.size}
                </P>
              </HStack>
              <P fontSize={s.size} fontWeight={"medium"}>
                {s.sample}
              </P>
            </Box>
          ))}
        </VStack>
      </VStack>
    );
  }

  if (navKey === "spacing_sizing") {
    const spaces = [
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

    return (
      <VStack align={"stretch"} gap={6} w={"full"}>
        <VStack align={"start"} gap={2}>
          <HStack gap={2} align={"center"}>
            <P fontSize={"3xl"} fontWeight={"bold"}>
              {"Spacing & Sizing"}
            </P>
            <Badge variant={"subtle"}>{"Foundation"}</Badge>
          </HStack>
          <P color={"fg.muted"}>
            {"Consistent 4px spacing scale providing rhythmic vertical and horizontal layout flow."}
          </P>
        </VStack>

        <VStack align={"stretch"} gap={2}>
          {spaces.map((sp) => (
            <HStack
              key={sp.token}
              p={3}
              rounded={"md"}
              border={"1px solid"}
              borderColor={"border.subtle"}
              bg={"bg.body"}
              justify={"space-between"}
              align={"center"}
            >
              <HStack gap={3}>
                <Badge variant={"subtle"} minW={"48px"}>
                  {sp.token}
                </Badge>
                <P fontSize={"xs"} color={"fg.muted"} fontFamily={"mono"}>
                  {sp.px}
                </P>
              </HStack>
              <Box h={"16px"} w={sp.px} bg={"blue.solid"} rounded={"xs"} />
            </HStack>
          ))}
        </VStack>
      </VStack>
    );
  }

  if (navKey === "radius_borders") {
    return (
      <VStack align={"stretch"} gap={6} w={"full"}>
        <VStack align={"start"} gap={2}>
          <HStack gap={2} align={"center"}>
            <P fontSize={"3xl"} fontWeight={"bold"}>
              {"Radius & Borders"}
            </P>
            <Badge variant={"subtle"}>{"Foundation"}</Badge>
          </HStack>
          <P color={"fg.muted"}>
            {"Corner radius presets dynamically paired for components and containers."}
          </P>
        </VStack>

        <SimpleGrid columns={[2, 4]} gap={4}>
          {ROUNDED_PRESETS_LIST.map((r) => (
            <Box
              key={r.label}
              p={4}
              rounded={"lg"}
              border={"1px solid"}
              borderColor={"border.subtle"}
              bg={"bg.body"}
              alignItems={"center"}
            >
              <Box
                w={"full"}
                h={"64px"}
                bg={"blue.subtle"}
                border={"2px solid"}
                borderColor={"blue.solid"}
                rounded={r.component}
                mb={3}
              />
              <P fontWeight={"bold"} fontSize={"sm"}>
                {r.label}
              </P>
              <P fontSize={"2xs"} color={"fg.muted"}>
                {"Component: "}{r.component}
              </P>
              <P fontSize={"2xs"} color={"fg.muted"}>
                {"Container: "}{r.container}
              </P>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    );
  }

  if (navKey === "elevation_shadows") {
    const shadows = [
      { name: "2xs", css: "0 1px 2px rgba(0,0,0,0.05)" },
      { name: "xs", css: "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)" },
      { name: "sm", css: "0 2px 4px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)" },
      { name: "md", css: "0 4px 6px -1px rgba(0,0,0,0.1)" },
      { name: "lg", css: "0 10px 15px -3px rgba(0,0,0,0.1)" },
      { name: "xl", css: "0 20px 25px -5px rgba(0,0,0,0.1)" },
    ];

    return (
      <VStack align={"stretch"} gap={6} w={"full"}>
        <VStack align={"start"} gap={2}>
          <HStack gap={2} align={"center"}>
            <P fontSize={"3xl"} fontWeight={"bold"}>
              {"Elevation & Shadows"}
            </P>
            <Badge variant={"subtle"}>{"Foundation"}</Badge>
          </HStack>
          <P color={"fg.muted"}>
            {"Depth layers and elevation levels for popovers, dialogs, drawers, and floating panels."}
          </P>
        </VStack>

        <SimpleGrid columns={[2, 3]} gap={4}>
          {shadows.map((sh) => (
            <Box
              key={sh.name}
              p={5}
              rounded={"lg"}
              bg={"bg.body"}
              boxShadow={sh.name}
              border={"1px solid"}
              borderColor={"border.subtle"}
            >
              <P fontWeight={"bold"}>{sh.name}</P>
              <P fontSize={"2xs"} color={"fg.muted"} fontFamily={"mono"} mt={2}>
                {sh.css}
              </P>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    );
  }

  if (navKey === "z_index") {
    const zIndices = [
      { token: "hide", value: -1, usage: "Hidden background layers" },
      { token: "auto", value: "auto", usage: "Natural DOM stacking order" },
      { token: "base", value: 0, usage: "Base content panels" },
      { token: "docked", value: 10, usage: "Sticky headers, pinned columns" },
      { token: "dropdown", value: 1000, usage: "Select and autocomplete menus" },
      { token: "sticky", value: 1100, usage: "Top floating action bars" },
      { token: "banner", value: 1200, usage: "Global app broadcast banners" },
      { token: "overlay", value: 1300, usage: "Modal and drawer backdrops" },
      { token: "modal", value: 1400, usage: "Dialog, Drawer, and Popover content" },
      { token: "popover", value: 1500, usage: "Nested popovers and dropdown triggers" },
      { token: "toast", value: 1600, usage: "Toaster and snackbar notifications" },
      { token: "tooltip", value: 1700, usage: "Tooltips above all other surfaces" },
    ];

    return (
      <VStack align={"stretch"} gap={6} w={"full"}>
        <VStack align={"start"} gap={2}>
          <HStack gap={2} align={"center"}>
            <P fontSize={"3xl"} fontWeight={"bold"}>
              {"Z-Index Stacking Order"}
            </P>
            <Badge variant={"subtle"}>{"Foundation"}</Badge>
          </HStack>
          <P color={"fg.muted"}>
            {"Predictable elevation z-index tokens preventing stacking collisions across modals and overlays."}
          </P>
        </VStack>

        <VStack align={"stretch"} gap={2}>
          {zIndices.map((z) => (
            <HStack
              key={z.token}
              p={3}
              rounded={"md"}
              border={"1px solid"}
              borderColor={"border.subtle"}
              bg={"bg.body"}
              justify={"space-between"}
              align={"center"}
            >
              <HStack gap={3}>
                <Badge variant={"subtle"} minW={"80px"}>
                  {z.token}
                </Badge>
                <P fontSize={"xs"} fontFamily={"mono"} color={"fg.subtle"}>
                  {String(z.value)}
                </P>
              </HStack>
              <P fontSize={"xs"} color={"fg.muted"}>
                {z.usage}
              </P>
            </HStack>
          ))}
        </VStack>
      </VStack>
    );
  }

  if (navKey === "breakpoints_layout") {
    const bps = [
      { name: "sm", width: "350px", desc: "Small mobile screens" },
      { name: "md", width: "750px", desc: "Tablet portrait and compact split views" },
      { name: "lg", width: "960px", desc: "Tablet landscape and desktop layouts" },
      { name: "xl", width: "1200px", desc: "Large desktop displays" },
    ];

    return (
      <VStack align={"stretch"} gap={6} w={"full"}>
        <VStack align={"start"} gap={2}>
          <HStack gap={2} align={"center"}>
            <P fontSize={"3xl"} fontWeight={"bold"}>
              {"Breakpoints & Responsive Layout"}
            </P>
            <Badge variant={"subtle"}>{"Foundation"}</Badge>
          </HStack>
          <P color={"fg.muted"}>
            {"Custom responsive breakpoint tokens calibrated specifically for Exium applications."}
          </P>
        </VStack>

        <SimpleGrid columns={[1, 2]} gap={4}>
          {bps.map((b) => (
            <Box
              key={b.name}
              p={5}
              rounded={"lg"}
              border={"1px solid"}
              borderColor={"border.subtle"}
              bg={"bg.body"}
            >
              <HStack justify={"space-between"} mb={2}>
                <Badge variant={"subtle"} colorPalette={"blue"}>
                  {b.name}
                </Badge>
                <P fontSize={"xs"} fontFamily={"mono"}>
                  {`min-width: ${b.width}`}
                </P>
              </HStack>
              <P fontSize={"sm"} color={"fg.muted"}>
                {b.desc}
              </P>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    );
  }

  if (navKey === "iconography") {
    return (
      <VStack align={"stretch"} gap={6} w={"full"}>
        <VStack align={"start"} gap={2}>
          <HStack gap={2} align={"center"}>
            <P fontSize={"3xl"} fontWeight={"bold"}>
              {"Iconography"}
            </P>
            <Badge variant={"subtle"}>{"Foundation"}</Badge>
          </HStack>
          <P color={"fg.muted"}>
            {"Unified icon rendering using Lucide (primary), Tabler (fallback), and Phosphor with weight support."}
          </P>
        </VStack>

        <Box p={4} rounded={"lg"} border={"1px solid"} borderColor={"border.subtle"} bg={"bg.body"}>
          <P fontWeight={"bold"} mb={2}>
            {"AppIcon Component Standard"}
          </P>
          <P fontSize={"sm"} color={"fg.muted"} mb={4}>
            {"Always render icons via AppIcon. Never use raw SVG elements or icons without wrapping."}
          </P>
          <CodeBlock
            code={`import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { Sparkle } from "@phosphor-icons/react";
import { CheckIcon } from "lucide-react";

// Lucide icon
<AppIcon icon={CheckIcon} size={"md"} color={"green.fg"} />

// Phosphor icon with weight
<AppIcon icon={Sparkle} size={"md"} weight={"duotone"} color={"blue.fg"} />`}
            language={"tsx"}
          />
        </Box>
      </VStack>
    );
  }

  if (navKey === "motion") {
    return (
      <VStack align={"stretch"} gap={6} w={"full"}>
        <VStack align={"start"} gap={2}>
          <HStack gap={2} align={"center"}>
            <P fontSize={"3xl"} fontWeight={"bold"}>
              {"Motion & Animations"}
            </P>
            <Badge variant={"subtle"}>{"Foundation"}</Badge>
          </HStack>
          <P color={"fg.muted"}>
            {"Pre-configured keyframes for dialog scaling, popover origin expansion, and layout transitions."}
          </P>
        </VStack>

        <SimpleGrid columns={[1, 2]} gap={4}>
          <Box p={4} rounded={"lg"} border={"1px solid"} borderColor={"border.subtle"} bg={"bg.body"}>
            <P fontWeight={"bold"}>{"Dialog & Overlay Scale"}</P>
            <P fontSize={"xs"} color={"fg.muted"} mt={1} mb={3}>
              {"Keyframes scale-up and scale-up-from-click-origin animate modals directly from trigger click coordinates."}
            </P>
            <Badge variant={"subtle"}>{"scale-up / scale-up-overshoot"}</Badge>
          </Box>

          <Box p={4} rounded={"lg"} border={"1px solid"} borderColor={"border.subtle"} bg={"bg.body"}>
            <P fontWeight={"bold"}>{"Alert Attention"}</P>
            <P fontSize={"xs"} color={"fg.muted"} mt={1} mb={3}>
              {"Controlled via useAlertAnimation to shake or highlight on unhandled user form validation errors."}
            </P>
            <Badge variant={"subtle"}>{"shrink-x / ping"}</Badge>
          </Box>
        </SimpleGrid>
      </VStack>
    );
  }

  if (navKey === "theming_dark_mode") {
    return (
      <VStack align={"stretch"} gap={6} w={"full"}>
        <VStack align={"start"} gap={2}>
          <HStack gap={2} align={"center"}>
            <P fontSize={"3xl"} fontWeight={"bold"}>
              {"Theming & Dark Mode"}
            </P>
            <Badge variant={"subtle"}>{"Foundation"}</Badge>
          </HStack>
          <P color={"fg.muted"}>
            {"Zustand-based theme store integrating color palettes, container radii, and dark/light color mode."}
          </P>
        </VStack>

        <Box p={4} rounded={"lg"} border={"1px solid"} borderColor={"border.subtle"} bg={"bg.body"}>
          <P fontWeight={"bold"} mb={2}>
            {"Theme Store Usage"}
          </P>
          <CodeBlock
            code={`import { useThemeStore } from "@/design-system/stores/theme-store";

const { theme, setColorPalette, setRadiusPreset } = useThemeStore();
// theme.colorPalette ('blue', 'orange', etc.)
// theme.radiusPreset ('md', 'lg', etc.)`}
            language={"tsx"}
          />
        </Box>
      </VStack>
    );
  }

  if (navKey === "accessibility") {
    return (
      <VStack align={"stretch"} gap={6} w={"full"}>
        <VStack align={"start"} gap={2}>
          <HStack gap={2} align={"center"}>
            <P fontSize={"3xl"} fontWeight={"bold"}>
              {"Accessibility (A11y)"}
            </P>
            <Badge variant={"subtle"}>{"Foundation"}</Badge>
          </HStack>
          <P color={"fg.muted"}>
            {"WCAG 2.1 AA conformance standards applied across all interactive controls."}
          </P>
        </VStack>

        <SimpleGrid columns={[1, 3]} gap={4}>
          <Box p={4} rounded={"lg"} border={"1px solid"} borderColor={"border.subtle"} bg={"bg.body"}>
            <P fontWeight={"bold"} mb={1}>{"Contrast Ratio"}</P>
            <P fontSize={"sm"} color={"fg.muted"}>
              {"Minimum 4.5:1 for normal text and 3:1 for large headers and actionable icons."}
            </P>
          </Box>

          <Box p={4} rounded={"lg"} border={"1px solid"} borderColor={"border.subtle"} bg={"bg.body"}>
            <P fontWeight={"bold"} mb={1}>{"Keyboard Focus"}</P>
            <P fontSize={"sm"} color={"fg.muted"}>
              {"Never suppress outline focus ring. Clear tab index order is preserved."}
            </P>
          </Box>

          <Box p={4} rounded={"lg"} border={"1px solid"} borderColor={"border.subtle"} bg={"bg.body"}>
            <P fontWeight={"bold"} mb={1}>{"ARIA Labels"}</P>
            <P fontSize={"sm"} color={"fg.muted"}>
              {"All icon-only buttons require an explicit aria-label prop."}
            </P>
          </Box>
        </SimpleGrid>
      </VStack>
    );
  }

  if (navKey === "internationalization") {
    return (
      <VStack align={"stretch"} gap={6} w={"full"}>
        <VStack align={"start"} gap={2}>
          <HStack gap={2} align={"center"}>
            <P fontSize={"3xl"} fontWeight={"bold"}>
              {"Internationalization (i18n)"}
            </P>
            <Badge variant={"subtle"}>{"Foundation"}</Badge>
          </HStack>
          <P color={"fg.muted"}>
            {"First-class multi-language support powered by Paraglide JS with Indonesian (id) and English (en)."}
          </P>
        </VStack>

        <Box p={4} rounded={"lg"} border={"1px solid"} borderColor={"border.subtle"} bg={"bg.body"}>
          <P fontWeight={"bold"} mb={2}>
            {"Using Paraglide Messages"}
          </P>
          <CodeBlock
            code={`import * as m from "@/paraglide/messages";
import { getLocale, setLocale } from "@/paraglide/runtime";

// Render message with active locale
<P>{m.common_save()}</P>

// Switch locale dynamically
setLocale("en");`}
            language={"tsx"}
          />
        </Box>
      </VStack>
    );
  }

  // Fallback
  return (
    <VStack align={"start"} gap={2}>
      <P fontSize={"2xl"} fontWeight={"bold"}>
        {navKey}
      </P>
      <P color={"fg.muted"}>{"Documentation page content."}</P>
    </VStack>
  );
};
