// src/features/design-system-docs/components/foundation/pages/colors-foundation.page.tsx

import { Box } from "@/design-system/components/layout/box/box";
import { Center } from "@/design-system/components/layout/center/center";
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { toast } from "@/design-system/components/toast";
import { P } from "@/design-system/components/typography/p/p";
import { COLOR_PALETTES_LIST } from "@/design-system/constants/colors";
import { FoundationHeader } from "@/features/design-system-docs/components/foundation/foundation-header";
import { useState } from "react";

const COLOR_STEPS = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "950",
];

export const ColorsFoundationPage = () => {
  // States
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  // Handlers
  const handleCopy = (token: string) => {
    void navigator.clipboard.writeText(token);
    setCopiedToken(token);
    toast.create({
      title: "Token disalin",
      description: token,
      variant: "info",
    });
    setTimeout(() => {
      setCopiedToken(null);
    }, 2000);
  };

  return (
    <VStack gap={"lg"} w={"full"}>
      <FoundationHeader
        title={"Colors & Palettes"}
        description={"Authentic color palettes supported by Exium Design System with light and dark mode scales."}
      />

      <VStack gap={"md"} w={"full"}>
        {COLOR_PALETTES_LIST.map((item) => {
          return (
            <VStack
              key={item.palette}
              gap={"sm"}
              p={"md"}
              rounded={"lg"}
              border={"1px solid"}
              borderColor={"border.subtle"}
              bg={"bg.body"}
              w={"full"}
            >
              <HStack
                justify={"space-between"}
                align={"center"}
                w={"full"}
                wrap={"wrap"}
              >
                <HStack align={"center"} gap={"sm"}>
                  <Box
                    boxSize={4}
                    rounded={"full"}
                    bg={`${item.palette}.500`}
                    border={"1px solid"}
                    borderColor={"border.subtle"}
                  />
                  <P fontWeight={"semibold"} fontSize={"sm"}>
                    {item.label}
                  </P>
                  <P fontSize={"xs"} color={"fg.muted"}>
                    ({item.palette})
                  </P>
                </HStack>
                <P fontSize={"xs"} color={"fg.muted"} fontFamily={"mono"}>
                  {item.primaryHex}
                </P>
              </HStack>

              <HStack
                gap={1}
                w={"full"}
                h={10}
                rounded={"sm"}
                overflow={"hidden"}
              >
                {COLOR_STEPS.map((step) => {
                  const token = `colors.${item.palette}.${step}`;
                  const isCopied = copiedToken === token;
                  return (
                    <Box
                      key={step}
                      flex={1}
                      h={"full"}
                      bg={`${item.palette}.${step}`}
                      position={"relative"}
                      cursor={"pointer"}
                      title={`${token} — Klik untuk salin`}
                      transition={"transform 0.15s ease"}
                      _hover={{
                        transform: "scaleY(1.15)",
                        zIndex: 1,
                      }}
                      onClick={() => handleCopy(token)}
                    >
                      <Center
                        position={"absolute"}
                        inset={0}
                        opacity={0}
                        _hover={{ opacity: 1 }}
                        bg={"blackAlpha.500"}
                        transition={"opacity 0.15s ease"}
                      >
                        <P
                          fontSize={"2xs"}
                          fontWeight={"bold"}
                          color={"white"}
                          userSelect={"none"}
                        >
                          {isCopied ? "✓" : step}
                        </P>
                      </Center>
                    </Box>
                  );
                })}
              </HStack>
            </VStack>
          );
        })}
      </VStack>
    </VStack>
  );
};
