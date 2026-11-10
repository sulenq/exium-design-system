// src/features/design-system-docs/components/foundation/pages/z-index-foundation.page.tsx

import { Box } from "@/design-system/components/layout/box/box";
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { Badge } from "@/design-system/components/typography/badge/badge";
import { P } from "@/design-system/components/typography/p/p";
import { FoundationHeader } from "@/features/design-system-docs/components/foundation/foundation-header";

const Z_INDICES = [
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

export const ZIndexFoundationPage = () => {
  return (
    <VStack gap={"lg"}>
      <FoundationHeader
        title={"Z-Index Stacking Order"}
        description={"Predictable elevation z-index tokens preventing stacking collisions across modals and overlays."}
      />

      <VStack gap={"xs"}>
        {Z_INDICES.map((z) => (
          <Box
            key={z.token}
            rounded={"md"}
            border={"1px solid"}
            borderColor={"border.subtle"}
            bg={"bg.body"}
          >
            <HStack
              justify={"space-between"}
              align={"center"}
              p={"xs"}
              px={"sm"}
            >
              <HStack gap={"md"} align={"center"}>
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
          </Box>
        ))}
      </VStack>
    </VStack>
  );
};
