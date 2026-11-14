// src/features/design-system-docs/components/foundation/pages/dark-mode-foundation.page.tsx

import { ColorModeToggleButton } from "@/design-system/components/button/color-mode/color-mode";
import { Box } from "@/design-system/components/layout/box/box";
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { Badge } from "@/design-system/components/typography/badge/badge";
import { Heading } from "@/design-system/components/typography/heading/heading";
import { P } from "@/design-system/components/typography/p/p";
import { useColorMode, useColorModeValue } from "@/design-system/hooks/use-color-mode";
import { CodeBlock } from "@/features/design-system-docs/components/code-block";
import { FoundationHeader } from "@/features/design-system-docs/components/foundation/foundation-header";

export const DarkModeFoundationPage = () => {
  // Hooks
  const { colorMode, toggleColorMode, setColorMode } = useColorMode();
  const sampleColor = useColorModeValue("#1471EB", "#26D968");
  const sampleText = useColorModeValue("Mode Terang Aktif (Light)", "Mode Gelap Aktif (Dark)");

  return (
    <VStack gap={6}>
      <FoundationHeader
        title={"Dark Mode Foundation"}
        description={"Integrasi Next-Themes dengan Chakra UI v3, hooks pengontrol tema warna (`useColorMode`, `useColorModeValue`), dan tombol trigger interaktif."}
      />

      {/* 1. Architecture Overview */}
      <VStack gap={3} w={"full"}>
        <Heading size={"sm"} fontWeight={"bold"}>
          {"1. Arsitektur Color Mode"}
        </Heading>
        <P fontSize={"sm"} color={"fg.muted"}>
          {"Color mode di Exium Design System ditenagai oleh next-themes via ColorModeProvider yang menginjeksi atribut class dark pada elemen html root. Token semantik Chakra UI v3 otomatis beralih menggunakan pseudo-selector _dark."}
        </P>
        <VStack gap={0.5} align={"start"}>
          <P fontSize={"xs"} fontFamily={"mono"} color={"fg.subtle"}>
            {"Provider: src/design-system/chakra/providers/color-mode-provider.tsx"}
          </P>
          <P fontSize={"xs"} fontFamily={"mono"} color={"fg.subtle"}>
            {"Hooks: src/design-system/hooks/use-color-mode.ts"}
          </P>
          <P fontSize={"xs"} fontFamily={"mono"} color={"fg.subtle"}>
            {"Trigger: src/design-system/components/button/color-mode/color-mode.tsx"}
          </P>
        </VStack>
      </VStack>

      {/* 2. Hooks Documentation */}
      <VStack gap={4} w={"full"}>
        <Heading size={"sm"} fontWeight={"bold"}>
          {"2. Hooks Pengontrol Color Mode"}
        </Heading>

        <VStack gap={3} w={"full"}>
          {/* useColorMode */}
          <Box p={3} rounded={"md"} bg={"bg.subtle"} w={"full"}>
            <HStack justify={"space-between"} mb={1}>
              <Badge colorPalette={"blue"}>{"useColorMode()"}</Badge>
              <Badge variant={"outline"}>{"Aktif: " + colorMode}</Badge>
            </HStack>
            <P fontSize={"sm"} mb={2}>
              {"Hook utama untuk membaca mode aktif (`colorMode`), mengubah mode secara langsung (`setColorMode`), atau toggle bolak-balik (`toggleColorMode`)."}
            </P>
            <CodeBlock
              code={`import { useColorMode } from "@/design-system/hooks/use-color-mode";

const { colorMode, setColorMode, toggleColorMode } = useColorMode();

// colorMode: "light" | "dark"
// toggleColorMode(): membalik mode aktif
// setColorMode("dark" | "light" | "system"): set mode spesifik`}
              language={"tsx"}
            />
          </Box>

          {/* useColorModeValue */}
          <Box p={3} rounded={"md"} bg={"bg.subtle"} w={"full"}>
            <HStack justify={"space-between"} mb={1}>
              <Badge colorPalette={"purple"}>{"useColorModeValue(lightVal, darkVal)"}</Badge>
              <P fontSize={"xs"} color={"fg.muted"} fontFamily={"mono"}>{"Helper function"}</P>
            </HStack>
            <P fontSize={"sm"} mb={2}>
              {"Mengembalikan nilai secara kondisional berdasarkan mode saat ini. Sangat berguna untuk library grafik (seperti Chart.js atau MapLibre) yang membutuhkan raw string/hex berbeda antar tema."}
            </P>
            <CodeBlock
              code={`import { useColorModeValue } from "@/design-system/hooks/use-color-mode";

const chartLineColor = useColorModeValue("#1471EB", "#26D968");`}
              language={"tsx"}
            />
          </Box>
        </VStack>
      </VStack>

      {/* 3. Triggers & Interactive Demo */}
      <VStack gap={4} w={"full"}>
        <Heading size={"sm"} fontWeight={"bold"}>
          {"3. Komponen Trigger & Uji Langsung"}
        </Heading>
        <P fontSize={"sm"} color={"fg.muted"}>
          {"Komponen bawaan siap pakai untuk toggle mode pada navbar atau toolbar:"}
        </P>

        <HStack gap={4} p={4} rounded={"md"} bg={"bg.subtle"} justify={"space-between"} w={"full"}>
          <VStack align={"start"} gap={1}>
            <P fontWeight={"semibold"}>{sampleText}</P>
            <HStack gap={2}>
              <Box w={"12px"} h={"12px"} rounded={"full"} bg={sampleColor} />
              <P fontSize={"xs"} color={"fg.muted"}>{"useColorModeValue: " + sampleColor}</P>
            </HStack>
          </VStack>

          <HStack gap={2}>
            <Box
              as={"button"}
              onClick={() => setColorMode("light")}
              px={3}
              py={1}
              rounded={"sm"}
              bg={colorMode === "light" ? "colorPalette.subtle" : "bg.body"}
              cursor={"pointer"}
            >
              <P fontSize={"xs"}>{"Set Light"}</P>
            </Box>

            <Box
              as={"button"}
              onClick={() => setColorMode("dark")}
              px={3}
              py={1}
              rounded={"sm"}
              bg={colorMode === "dark" ? "colorPalette.subtle" : "bg.body"}
              cursor={"pointer"}
            >
              <P fontSize={"xs"}>{"Set Dark"}</P>
            </Box>

            <Box
              as={"button"}
              onClick={toggleColorMode}
              px={3}
              py={1}
              rounded={"sm"}
              bg={"bg.body"}
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

