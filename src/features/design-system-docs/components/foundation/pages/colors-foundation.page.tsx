// src/features/design-system-docs/components/foundation/pages/colors-foundation.page.tsx

import { IconButton } from "@/design-system/components/button/button/button";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { Box } from "@/design-system/components/layout/box/box";
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { SimpleGrid } from "@/design-system/components/layout/grid/grid";
import { P } from "@/design-system/components/typography/p/p";
import { COLOR_PALETTES_LIST } from "@/design-system/constants/colors";
import { FoundationHeader } from "@/features/design-system-docs/components/foundation/foundation-header";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

export const ColorsFoundationPage = () => {
  // States
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Handlers
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <VStack gap={"lg"}>
      <FoundationHeader
        title={"Colors & Palettes"}
        description={"Authentic color palettes supported by Exium Design System with light and dark mode scales."}
      />

      <SimpleGrid columns={[2, 3, 4, 6]} gap={"sm"}>
        {COLOR_PALETTES_LIST.map((c) => (
          <Box
            key={c.palette}
            rounded={"lg"}
            border={"1px solid"}
            borderColor={"border.subtle"}
            bg={"bg.body"}
          >
            <VStack gap={"sm"} p={"xs"}>
              <Box
                w={"full"}
                h={"48px"}
                rounded={"md"}
                bg={c.primaryHex}
                border={"1px solid"}
                borderColor={"blackAlpha.100"}
              />

              <P fontSize={"xs"} fontWeight={"bold"}>
                {c.label}
              </P>
            </VStack>

            <HStack
              justify={"space-between"}
              align={"center"}
              p={"2xs"}
              pl={"sm"}
            >
              <P fontSize={"sm"} color={"fg.muted"} fontFamily={"mono"}>
                {c.primaryHex}
              </P>

              <IconButton
                size={"xs"}
                variant={"ghost"}
                aria-label={`Copy ${c.label} hex`}
                onClick={() => handleCopy(c.palette, c.palette)}
              >
                <AppIcon
                  icon={copiedKey === c.palette ? CheckIcon : CopyIcon}
                  size={"xs"}
                />
              </IconButton>
            </HStack>
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

