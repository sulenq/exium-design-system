// src/features/design-system-docs/components/foundation/pages/theming-foundation.page.tsx

import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { COLOR_PALETTES_LIST } from "@/design-system/constants/colors";
import { ROUNDED_PRESETS_LIST } from "@/design-system/constants/presets";
import { Box } from "@/design-system/components/layout/box/box";
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { Badge } from "@/design-system/components/typography/badge/badge";
import { Heading } from "@/design-system/components/typography/heading/heading";
import { P } from "@/design-system/components/typography/p/p";
import { useThemeStore } from "@/design-system/stores/theme-store";
import { CodeBlock } from "@/features/design-system-docs/components/code-block";
import { FoundationHeader } from "@/features/design-system-docs/components/foundation/foundation-header";
import { CheckIcon } from "lucide-react";

export const ThemingFoundationPage = () => {
  // Stores
  const { theme, setTheme } = useThemeStore();

  const THEME_SPECS = [
    {
      name: "theme.colorPalette",
      type: "string",
      activeValue: theme.colorPalette,
      defaultValue: "blue",
      description: "Menentukan warna aksen aktif untuk seluruh komponen Chakra UI yang mendukung prop colorPalette (31 varian warna).",
    },
    {
      name: "theme.primaryColor",
      type: "string",
      activeValue: theme.primaryColor,
      defaultValue: "blue.solid",
      description: "Token semantik Chakra untuk warna background solid komponen aksi utama.",
    },
    {
      name: "theme.primaryColorHex",
      type: "string",
      activeValue: theme.primaryColorHex,
      defaultValue: "#1471EB",
      description: "Kode HEX asli warna primer untuk integrasi library pihak ketiga (misal MapLibre atau Chart.js).",
    },
    {
      name: "theme.radii",
      type: "{ label: string; component: string; container: string }",
      activeValue: `${theme.radii.label} (comp: ${theme.radii.component}, cont: ${theme.radii.container})`,
      defaultValue: "Lg (8px / 12px)",
      description: "Kelengkungan sudut terpusat untuk elemen berukuran kecil/komponen (radii.component) dan container/card besar (radii.container).",
    },
    {
      name: "theme.ambienceColor",
      type: "boolean",
      activeValue: theme.ambienceColor ? "true" : "false",
      defaultValue: "false",
      description: "Flag toggle untuk mengaktifkan efek ambient glow atau subtle backlight pada container/sidebar utama.",
    },
  ];

  return (
    <VStack gap={6} align={"stretch"} w={"full"}>
      <FoundationHeader
        title={"Theme Foundation"}
        description={"Dokumentasi spesifikasi lengkap Theme Store (Zustand) yang mengatur Color Palette aktif, Primary Color, Radii Preset, Ambience Color, dan sinkronisasi LocalStorage."}
      />

      {/* 1. Architecture & Usage */}
      <VStack gap={3} align={"stretch"} w={"full"}>
        <Heading size={"sm"} fontWeight={"bold"}>
          {"1. Arsitektur & Penggunaan Theme Store"}
        </Heading>
        <P fontSize={"sm"} color={"fg.muted"}>
          {"Theme store dikelola menggunakan Zustand dengan middleware `persist` ke LocalStorage (`theme-config`). File sumber:"}
        </P>
        <VStack gap={0.5} align={"start"}>
          <P fontSize={"xs"} fontFamily={"mono"} color={"fg.subtle"}>
            {"Store: src/design-system/stores/theme-store.ts"}
          </P>
          <P fontSize={"xs"} fontFamily={"mono"} color={"fg.subtle"}>
            {"Types: src/design-system/stores/types/theme-store.type.ts"}
          </P>
        </VStack>
        <CodeBlock
          code={`import { useThemeStore } from "@/design-system/stores/theme-store";

// Mengambil state dan method mutasi
const { theme, setTheme } = useThemeStore();

// Mengubah spesifikasi tema
setTheme({ colorPalette: "orange" });`}
          language={"tsx"}
        />
      </VStack>

      {/* 2. ThemeStore Properties Specs Table */}
      <VStack gap={3} align={"stretch"} w={"full"}>
        <Heading size={"sm"} fontWeight={"bold"}>
          {"2. Theme Store Specs"}
        </Heading>
        <P fontSize={"sm"} color={"fg.muted"}>
          {"Spesifikasi teknis, tipe data, nilai default, dan status aktif saat ini dari setiap properti `theme`:"}
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
                <th style={{ padding: "10px 8px" }}>{"Property"}</th>
                <th style={{ padding: "10px 8px" }}>{"Type"}</th>
                <th style={{ padding: "10px 8px" }}>{"Current Active"}</th>
                <th style={{ padding: "10px 8px" }}>{"Default"}</th>
                <th style={{ padding: "10px 8px" }}>{"Description"}</th>
              </tr>
            </thead>
            <tbody>
              {THEME_SPECS.map((spec) => (
                <tr
                  key={spec.name}
                  style={{
                    borderBottom: "1px solid var(--chakra-colors-border-subtle)",
                  }}
                >
                  <td style={{ padding: "10px 8px", fontWeight: "600", fontFamily: "monospace" }}>
                    {spec.name}
                  </td>
                  <td
                    style={{
                      padding: "10px 8px",
                      fontFamily: "monospace",
                      color: "var(--chakra-colors-fg-muted)",
                    }}
                  >
                    {spec.type}
                  </td>
                  <td style={{ padding: "10px 8px" }}>
                    <Badge variant={"subtle"} size={"sm"}>
                      {spec.activeValue}
                    </Badge>
                  </td>
                  <td style={{ padding: "10px 8px", fontFamily: "monospace", color: "var(--chakra-colors-fg-muted)" }}>
                    {spec.defaultValue}
                  </td>
                  <td style={{ padding: "10px 8px", color: "var(--chakra-colors-fg-muted)" }}>
                    {spec.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </VStack>

      {/* 3. Interactive Theme Live Presets */}
      <VStack gap={4} align={"stretch"} w={"full"}>
        <Heading size={"sm"} fontWeight={"bold"}>
          {"3. Live Preset Playground"}
        </Heading>
        <P fontSize={"sm"} color={"fg.muted"}>
          {"Uji langsung perubahan state pada Theme Store secara realtime:"}
        </P>

        {/* Color Palettes Picker */}
        <VStack gap={2} align={"stretch"} w={"full"}>
          <P fontSize={"xs"} fontWeight={"semibold"}>{"Pilih Color Palette:"}</P>
          <HStack gap={2} wrap={"wrap"} align={"center"}>
            {COLOR_PALETTES_LIST.map((item) => {
              const isActive = theme.colorPalette === item.palette;
              return (
                <Box
                  key={item.palette}
                  as={"button"}
                  onClick={() => setTheme({ colorPalette: item.palette, primaryColorHex: item.primaryHex })}
                  p={1}
                  px={2}
                  rounded={"sm"}
                  bg={isActive ? "colorPalette.subtle" : "bg.subtle"}
                  color={isActive ? "colorPalette.fg" : "fg.default"}
                  cursor={"pointer"}
                >
                  <HStack gap={2} align={"center"}>
                    <Box w={"10px"} h={"10px"} rounded={"full"} bg={item.primaryHex} flexShrink={0} />
                    <P fontSize={"xs"} fontWeight={isActive ? "semibold" : "normal"}>{item.label}</P>
                    {isActive && (
                      <AppIcon icon={CheckIcon} size={"xs"} color={"colorPalette.fg"} />
                    )}
                  </HStack>
                </Box>
              );
            })}
          </HStack>
        </VStack>

        {/* Radii Preset Picker */}
        <VStack gap={2} align={"stretch"} w={"full"}>
          <P fontSize={"xs"} fontWeight={"semibold"}>{"Pilih Radii Preset:"}</P>
          <HStack gap={2} wrap={"wrap"} align={"center"}>
            {ROUNDED_PRESETS_LIST.map((preset) => {
              const isActive = theme.radii.label === preset.label;
              return (
                <Box
                  key={preset.label}
                  as={"button"}
                  onClick={() => setTheme({ radii: preset })}
                  p={1}
                  px={3}
                  rounded={"sm"}
                  bg={isActive ? "colorPalette.subtle" : "bg.subtle"}
                  color={isActive ? "colorPalette.fg" : "fg.default"}
                  cursor={"pointer"}
                >
                  <HStack gap={1.5} align={"center"}>
                    <P fontSize={"xs"} fontWeight={isActive ? "semibold" : "normal"}>
                      {preset.label + " (" + preset.component + ")"}
                    </P>
                    {isActive && (
                      <AppIcon icon={CheckIcon} size={"xs"} color={"colorPalette.fg"} />
                    )}
                  </HStack>
                </Box>
              );
            })}
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
};
