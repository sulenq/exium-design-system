// src/features/design-system-docs/components/foundation/pages/dark-mode-foundation.page.tsx

import { ColorModeToggleButton } from "@/design-system/components/button/color-mode/color-mode";
import { Box } from "@/design-system/components/layout/box/box";
import {
  HStack,
  VStack,
} from "@/design-system/components/layout/flex-box/flex-box";
import { Badge } from "@/design-system/components/typography/badge/badge";
import { Heading } from "@/design-system/components/typography/heading/heading";
import { P } from "@/design-system/components/typography/p/p";
import {
  useColorMode,
  useColorModeValue,
} from "@/design-system/hooks/use-color-mode";
import { CodeBlock } from "@/features/design-system-docs/components/code-block";
import { FoundationHeader } from "@/features/design-system-docs/components/foundation/foundation-header";

export const DarkModeFoundationPage = () => {
  // Hooks
  const { colorMode, toggleColorMode, setColorMode } = useColorMode();
  const sampleColor = useColorModeValue("#1471EB", "#26D968");
  const sampleText = useColorModeValue(
    "Mode Terang Aktif (Light)",
    "Mode Gelap Aktif (Dark)",
  );

  const HOOK_SPECS = [
    {
      name: "useColorMode()",
      returnType: "{ colorMode, setColorMode, toggleColorMode }",
      activeValue: colorMode,
      description:
        "Hook utama untuk membaca status tema aktif (light | dark), membalik tema, atau menetapkan mode spesifik.",
    },
    {
      name: "useColorModeValue(lightVal, darkVal)",
      returnType: "TLight | TDark",
      activeValue: sampleColor,
      description:
        "Helper fungsi pengembali nilai kondisional berdasarkan tema. Digunakan untuk raw canvas atau library pihak ketiga.",
    },
  ];

  return (
    <VStack gap={6} align={"stretch"} w={"full"}>
      <FoundationHeader
        title={"Dark Mode Foundation"}
        description={
          "Integrasi Next-Themes dengan Chakra UI v3, hooks pengontrol tema warna (`useColorMode`, `useColorModeValue`), dan tombol trigger interaktif."
        }
      />

      {/* 1. Architecture Overview */}
      <VStack gap={3} align={"stretch"} w={"full"}>
        <Heading size={"sm"} fontWeight={"bold"}>
          {"1. Arsitektur Color Mode"}
        </Heading>
        <P fontSize={"sm"} color={"fg.muted"}>
          {
            "Color mode di Exium Design System ditenagai oleh next-themes via ColorModeProvider yang menginjeksi atribut class dark pada elemen html root. Token semantik Chakra UI v3 otomatis beralih menggunakan pseudo-selector _dark."
          }
        </P>
        <VStack gap={0.5} align={"start"}>
          <P fontSize={"xs"} fontFamily={"mono"} color={"fg.subtle"}>
            {
              "Provider: src/design-system/chakra/providers/color-mode-provider.tsx"
            }
          </P>
          <P fontSize={"xs"} fontFamily={"mono"} color={"fg.subtle"}>
            {"Hooks: src/design-system/hooks/use-color-mode.ts"}
          </P>
          <P fontSize={"xs"} fontFamily={"mono"} color={"fg.subtle"}>
            {
              "Trigger: src/design-system/components/button/color-mode/color-mode.tsx"
            }
          </P>
        </VStack>
      </VStack>

      {/* 2. Hooks Specs Table */}
      <VStack gap={3} align={"stretch"} w={"full"}>
        <Heading size={"sm"} fontWeight={"bold"}>
          {"2. Hooks Specs"}
        </Heading>
        <P fontSize={"sm"} color={"fg.muted"}>
          {"Spesifikasi teknis hook pengontrol tema tampilan:"}
        </P>

        <Box overflowX={"auto"} w={"full"}>
          <table
            style={{
              width: "100%",
              textAlign: "left",
              borderCollapse: "collapse",
              fontSize: "13px",
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid var(--chakra-colors-border-subtle)",
                }}
              >
                <th style={{ padding: "10px 8px" }}>{"Hook"}</th>
                <th style={{ padding: "10px 8px" }}>{"Return Type"}</th>
                <th style={{ padding: "10px 8px" }}>{"Current Value"}</th>
                <th style={{ padding: "10px 8px" }}>{"Description"}</th>
              </tr>
            </thead>
            <tbody>
              {HOOK_SPECS.map((spec) => (
                <tr
                  key={spec.name}
                  style={{
                    borderBottom:
                      "1px solid var(--chakra-colors-border-subtle)",
                  }}
                >
                  <td
                    style={{
                      padding: "10px 8px",
                      fontWeight: "600",
                      fontFamily: "monospace",
                    }}
                  >
                    {spec.name}
                  </td>
                  <td
                    style={{
                      padding: "10px 8px",
                      fontFamily: "monospace",
                      color: "var(--chakra-colors-fg-muted)",
                    }}
                  >
                    {spec.returnType}
                  </td>
                  <td style={{ padding: "10px 8px" }}>
                    <Badge variant={"subtle"} size={"sm"}>
                      {spec.activeValue}
                    </Badge>
                  </td>
                  <td
                    style={{
                      padding: "10px 8px",
                      color: "var(--chakra-colors-fg-muted)",
                    }}
                  >
                    {spec.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
        <CodeBlock
          code={`import { useColorMode, useColorModeValue } from "@/design-system/hooks/use-color-mode";

const { colorMode, toggleColorMode, setColorMode } = useColorMode();
const chartLineColor = useColorModeValue("#1471EB", "#26D968");`}
          language={"tsx"}
        />
      </VStack>

      {/* 3. Triggers & Interactive Demo */}
      <VStack gap={4} align={"stretch"} w={"full"}>
        <Heading size={"sm"} fontWeight={"bold"}>
          {"3. Live Trigger Playground"}
        </Heading>
        <P fontSize={"sm"} color={"fg.muted"}>
          {"Uji langsung perubahan mode tampilan menggunakan tombol trigger:"}
        </P>

        <HStack
          gap={4}
          py={2}
          justify={"space-between"}
          align={"center"}
          w={"full"}
          wrap={"wrap"}
        >
          <VStack align={"start"} gap={1}>
            <P fontSize={"sm"} fontWeight={"medium"}>
              {sampleText}
            </P>
            <HStack gap={2} align={"center"}>
              <Box
                w={"10px"}
                h={"10px"}
                rounded={"full"}
                bg={sampleColor}
                flexShrink={0}
              />
              <P fontSize={"xs"} color={"fg.muted"}>
                {"useColorModeValue: " + sampleColor}
              </P>
            </HStack>
          </VStack>

          <HStack gap={2} align={"center"}>
            <Box
              as={"button"}
              onClick={() => setColorMode("light")}
              px={3}
              py={1.5}
              rounded={"sm"}
              bg={colorMode === "light" ? "bg.muted" : "transparent"}
              color={colorMode === "light" ? "fg.default" : "fg.muted"}
              cursor={"pointer"}
            >
              <P
                fontSize={"xs"}
                fontWeight={colorMode === "light" ? "semibold" : "normal"}
              >
                {"Light"}
              </P>
            </Box>

            <Box
              as={"button"}
              onClick={() => setColorMode("dark")}
              px={3}
              py={1.5}
              rounded={"sm"}
              bg={colorMode === "dark" ? "bg.muted" : "transparent"}
              color={colorMode === "dark" ? "fg.default" : "fg.muted"}
              cursor={"pointer"}
            >
              <P
                fontSize={"xs"}
                fontWeight={colorMode === "dark" ? "semibold" : "normal"}
              >
                {"Dark"}
              </P>
            </Box>

            <Box
              as={"button"}
              onClick={toggleColorMode}
              px={3}
              py={1.5}
              rounded={"sm"}
              bg={"transparent"}
              color={"fg.muted"}
              cursor={"pointer"}
            >
              <P fontSize={"xs"}>{"Toggle Mode"}</P>
            </Box>

            <ColorModeToggleButton aria-label={"Toggle theme mode"} />
          </HStack>
        </HStack>

        <CodeBlock
          code={`import { ColorModeToggleButton } from "@/design-system/components/button/color-mode/color-mode";

// Render di header/navbar:
<ColorModeToggleButton aria-label={"Ganti tema tampilan"} />`}
          language={"tsx"}
        />
      </VStack>
    </VStack>
  );
};
