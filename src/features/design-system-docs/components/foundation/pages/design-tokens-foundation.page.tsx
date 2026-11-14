// src/features/design-system-docs/components/foundation/pages/design-tokens-foundation.page.tsx

import { Box } from "@/design-system/components/layout/box/box";
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { Badge } from "@/design-system/components/typography/badge/badge";
import { Heading } from "@/design-system/components/typography/heading/heading";
import { P } from "@/design-system/components/typography/p/p";
import { CodeBlock } from "@/features/design-system-docs/components/code-block";
import { FoundationHeader } from "@/features/design-system-docs/components/foundation/foundation-header";

export const DesignTokensFoundationPage = () => {
  const TOP_LEVEL_SPECS = [
    {
      key: "globalCss",
      type: "object",
      description: "Styling global CSS yang diinjeksi ke DOM root (html, body bg.body, font dasar, dan reset tipografi element).",
    },
    {
      key: "theme.breakpoints",
      type: "sm (350px), md (750px), lg (960px), xl (1200px)",
      description: "Skala responsive layout untuk seluruh komponen antarmuka.",
    },
    {
      key: "theme.keyframes",
      type: "CSS @keyframes",
      description: "Animasi modal & overlay: scale-up, scale-up-from-click-origin, scale-up-overshoot, scale-down, shrink-x, ping.",
    },
    {
      key: "theme.tokens",
      type: "Raw Primitive Tokens",
      description: "Nilai absolut konstan non-kontekstual: palet warna 50–950, font family, font size skala rem, durasi transisi ms, dan weight.",
    },
    {
      key: "theme.semanticTokens",
      type: "Contextual Tokens (Light/Dark)",
      description: "Token semantik adaptif (base vs _dark): bg.*, border.*, dan seluruh slot role colorPalette.*.",
    },
    {
      key: "theme.layerStyles",
      type: "Compound Visual Presets",
      description: "Kombinasi style siap pakai untuk efek visual kompleks seperti Glassmorphism (glass, glassTop, glassBottom, frosted, dll).",
    },
    {
      key: "theme.recipes & slotRecipes",
      type: "Component Styling Recipes",
      description: "Single recipe (button, input) dan multi-part slot recipe (select, checkbox, dialog, drawer, carousel).",
    },
  ];

  const BG_SEMANTIC_SPECS = [
    { token: "bg.body", target: "Konten halaman", description: "Background utama konten: putih (#ffffff) / dark (#1a1b1c)" },
    { token: "bg.canvas", target: "Dasar aplikasi", description: "Background kanvas dasar layout: #f5f6f8 / #161717" },
    { token: "bg.panel", target: "Sidebar & Card", description: "Background panel penampung dan sidebar" },
    { token: "bg.subtle", target: "Hover & Table Zebra", description: "Background kontras lembut untuk hover baris dan zebra table" },
    { token: "bg.muted", target: "Badge & Tag", description: "Background elemen sekunder, tag netral, dan input disabled" },
    { token: "bg.emphasized", target: "Selected State", description: "Background aktif / ditekan / baris terpilih" },
    { token: "bg.bodyAlpha", target: "Glass & Overlay", description: "Background transparan dengan alpha channel untuk efek blur" },
    { token: "bg.backdrop", target: "Modal Backdrop", description: "Backdrop dialog overlay modal atau drawer" },
  ];

  const BORDER_SEMANTIC_SPECS = [
    { token: "border (DEFAULT)", target: "Input & Card", description: "Border standar komponen form dan container (neutral 200 / 800)" },
    { token: "border.subtle", target: "Separator", description: "Border pemisah section sangat tipis (an1)" },
    { token: "border.muted", target: "Secondary Card", description: "Border outline sekunder (an2)" },
    { token: "border.emphasized", target: "Interactive", description: "Border interaktif dan status hover fokus (an3)" },
  ];

  const PALETTE_SLOT_SPECS = [
    { slot: "colorPalette.contrast", usage: "Teks di atas solid", description: "Warna teks kontras tinggi (putih/hitam) saat tombol solid aktif" },
    { slot: "colorPalette.fg", usage: "Teks beraksen", description: "Warna foreground teks aksen primer" },
    { slot: "colorPalette.subtle", usage: "Badge lembut", description: "Warna background badge dan alert aksen" },
    { slot: "colorPalette.muted", usage: "Hover aksen", description: "Background hover sekunder aksen" },
    { slot: "colorPalette.emphasized", usage: "Active aksen", description: "Background aksen saat diklik / selected" },
    { slot: "colorPalette.solid", usage: "Tombol solid", description: "Background tombol utama berkontras solid" },
    { slot: "colorPalette.focusRing", usage: "Focus outline", description: "Ring fokus aksesibilitas navigasi keyboard" },
    { slot: "colorPalette.border", usage: "Outline aksen", description: "Border warna untuk varian outline" },
  ];

  return (
    <VStack gap={6} align={"stretch"} w={"full"}>
      <FoundationHeader
        title={"Design Tokens & Chakra System"}
        description={"Spesifikasi teknis arsitektur token, semantic tokens, layer styles, recipes, struktur konfigurasi, serta cara pendefinisian di chakra-system.ts."}
      />

      {/* 1. Architecture Overview */}
      <VStack gap={3} align={"stretch"} w={"full"}>
        <Heading size={"sm"} fontWeight={"bold"}>
          {"1. Arsitektur File & Lokasi"}
        </Heading>
        <P fontSize={"sm"} color={"fg.muted"}>
          {"Semua konfigurasi token, tema, dan styling system Chakra UI v3 dipusatkan pada satu file utama:"}
        </P>
        <P fontSize={"xs"} fontFamily={"mono"} color={"fg.subtle"}>
          {"src/design-system/chakra/chakra-system.ts"}
        </P>
        <CodeBlock
          code={`// src/design-system/chakra/chakra-system.ts
export const chakraConfig = defineConfig({
  globalCss: { ... },
  theme: {
    breakpoints: { ... },
    keyframes: { ... },
    tokens: { ... },
    semanticTokens: { ... },
    textStyles: { ... },
    layerStyles: { ... },
    animationStyles: { ... },
    recipes: { ... },
    slotRecipes: { ... },
  },
});

export const chakraSystem = createSystem(defaultConfig, chakraConfig);
export default chakraSystem;`}
          language={"tsx"}
        />
      </VStack>

      {/* 2. Top-Level Keys Table */}
      <VStack gap={3} align={"stretch"} w={"full"}>
        <Heading size={"sm"} fontWeight={"bold"}>
          {"2. Top-Level Config Specs"}
        </Heading>
        <P fontSize={"sm"} color={"fg.muted"}>
          {"Daftar konfigurasi utama di dalam chakraConfig beserta tanggung jawab teknisnya:"}
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
              <tr style={{ borderBottom: "1px solid var(--chakra-colors-border-subtle)" }}>
                <th style={{ padding: "10px 8px" }}>{"Configuration Key"}</th>
                <th style={{ padding: "10px 8px" }}>{"Target / Format"}</th>
                <th style={{ padding: "10px 8px" }}>{"Description"}</th>
              </tr>
            </thead>
            <tbody>
              {TOP_LEVEL_SPECS.map((item) => (
                <tr key={item.key} style={{ borderBottom: "1px solid var(--chakra-colors-border-subtle)" }}>
                  <td style={{ padding: "10px 8px", fontWeight: "600", fontFamily: "monospace" }}>
                    {item.key}
                  </td>
                  <td style={{ padding: "10px 8px", fontFamily: "monospace", color: "var(--chakra-colors-fg-muted)" }}>
                    {item.type}
                  </td>
                  <td style={{ padding: "10px 8px", color: "var(--chakra-colors-fg-muted)" }}>
                    {item.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </VStack>

      {/* 3. Semantic Tokens: Backgrounds & Borders Table */}
      <VStack gap={3} align={"stretch"} w={"full"}>
        <Heading size={"sm"} fontWeight={"bold"}>
          {"3. Semantic Tokens: Backgrounds & Borders"}
        </Heading>
        <P fontSize={"sm"} color={"fg.muted"}>
          {"Token semantik adaptif otomatis berganti antara Light dan Dark mode:"}
        </P>

        {/* Background Table */}
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
              <tr style={{ borderBottom: "1px solid var(--chakra-colors-border-subtle)" }}>
                <th style={{ padding: "10px 8px" }}>{"Background Token"}</th>
                <th style={{ padding: "10px 8px" }}>{"Target Peruntukan"}</th>
                <th style={{ padding: "10px 8px" }}>{"Description"}</th>
              </tr>
            </thead>
            <tbody>
              {BG_SEMANTIC_SPECS.map((item) => (
                <tr key={item.token} style={{ borderBottom: "1px solid var(--chakra-colors-border-subtle)" }}>
                  <td style={{ padding: "10px 8px", fontWeight: "600", fontFamily: "monospace" }}>
                    {item.token}
                  </td>
                  <td style={{ padding: "10px 8px", color: "var(--chakra-colors-fg-muted)" }}>
                    {item.target}
                  </td>
                  <td style={{ padding: "10px 8px", color: "var(--chakra-colors-fg-muted)" }}>
                    {item.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>

        {/* Border Table */}
        <Box overflowX={"auto"} w={"full"} mt={2}>
          <table
            style={{
              width: "100%",
              textAlign: "left",
              borderCollapse: "collapse",
              fontSize: "13px",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid var(--chakra-colors-border-subtle)" }}>
                <th style={{ padding: "10px 8px" }}>{"Border Token"}</th>
                <th style={{ padding: "10px 8px" }}>{"Target Peruntukan"}</th>
                <th style={{ padding: "10px 8px" }}>{"Description"}</th>
              </tr>
            </thead>
            <tbody>
              {BORDER_SEMANTIC_SPECS.map((item) => (
                <tr key={item.token} style={{ borderBottom: "1px solid var(--chakra-colors-border-subtle)" }}>
                  <td style={{ padding: "10px 8px", fontWeight: "600", fontFamily: "monospace" }}>
                    {item.token}
                  </td>
                  <td style={{ padding: "10px 8px", color: "var(--chakra-colors-fg-muted)" }}>
                    {item.target}
                  </td>
                  <td style={{ padding: "10px 8px", color: "var(--chakra-colors-fg-muted)" }}>
                    {item.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </VStack>

      {/* 4. Semantic Palette Slots Table */}
      <VStack gap={3} align={"stretch"} w={"full"}>
        <Heading size={"sm"} fontWeight={"bold"}>
          {"4. Semantic Color Palette Slots"}
        </Heading>
        <P fontSize={"sm"} color={"fg.muted"}>
          {"Setiap palet warna (31 warna terdaftar) menyediakan 8 semantic slots yang konsisten:"}
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
              <tr style={{ borderBottom: "1px solid var(--chakra-colors-border-subtle)" }}>
                <th style={{ padding: "10px 8px" }}>{"Color Palette Slot"}</th>
                <th style={{ padding: "10px 8px" }}>{"Usage"}</th>
                <th style={{ padding: "10px 8px" }}>{"Description"}</th>
              </tr>
            </thead>
            <tbody>
              {PALETTE_SLOT_SPECS.map((item) => (
                <tr key={item.slot} style={{ borderBottom: "1px solid var(--chakra-colors-border-subtle)" }}>
                  <td style={{ padding: "10px 8px", fontWeight: "600", fontFamily: "monospace" }}>
                    {item.slot}
                  </td>
                  <td style={{ padding: "10px 8px", color: "var(--chakra-colors-fg-muted)" }}>
                    {item.usage}
                  </td>
                  <td style={{ padding: "10px 8px", color: "var(--chakra-colors-fg-muted)" }}>
                    {item.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </VStack>

      {/* 5. Typography, Sizing & Motion Specs */}
      <VStack gap={3} align={"stretch"} w={"full"}>
        <Heading size={"sm"} fontWeight={"bold"}>
          {"5. Typography, Motion & Sizing Specs"}
        </Heading>
        <P fontSize={"sm"} color={"fg.muted"}>
          {"Token konstan primitif font, durasi transisi, dan dimensi komponen terstandarisasi:"}
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
              <tr style={{ borderBottom: "1px solid var(--chakra-colors-border-subtle)" }}>
                <th style={{ padding: "10px 8px" }}>{"Category"}</th>
                <th style={{ padding: "10px 8px" }}>{"Tokens / Range"}</th>
                <th style={{ padding: "10px 8px" }}>{"Value"}</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--chakra-colors-border-subtle)" }}>
                <td style={{ padding: "10px 8px", fontWeight: "600", fontFamily: "monospace" }}>{"fonts"}</td>
                <td style={{ padding: "10px 8px", fontFamily: "monospace", color: "var(--chakra-colors-fg-muted)" }}>{"heading / body / number"}</td>
                <td style={{ padding: "10px 8px", color: "var(--chakra-colors-fg-muted)" }}>{"'Plus Jakarta Sans Variable', sans-serif"}</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--chakra-colors-border-subtle)" }}>
                <td style={{ padding: "10px 8px", fontWeight: "600", fontFamily: "monospace" }}>{"fontSizes"}</td>
                <td style={{ padding: "10px 8px", fontFamily: "monospace", color: "var(--chakra-colors-fg-muted)" }}>{"xs s.d. 9xl"}</td>
                <td style={{ padding: "10px 8px", color: "var(--chakra-colors-fg-muted)" }}>{"0.75rem (12px) s.d. 6.3125rem (101px)"}</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--chakra-colors-border-subtle)" }}>
                <td style={{ padding: "10px 8px", fontWeight: "600", fontFamily: "monospace" }}>{"fontWeights"}</td>
                <td style={{ padding: "10px 8px", fontFamily: "monospace", color: "var(--chakra-colors-fg-muted)" }}>{"normal, medium, semibold, bold"}</td>
                <td style={{ padding: "10px 8px", color: "var(--chakra-colors-fg-muted)" }}>{"450, 500, 600, 700"}</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--chakra-colors-border-subtle)" }}>
                <td style={{ padding: "10px 8px", fontWeight: "600", fontFamily: "monospace" }}>{"durations"}</td>
                <td style={{ padding: "10px 8px", fontFamily: "monospace", color: "var(--chakra-colors-fg-muted)" }}>{"fastest s.d. slowest"}</td>
                <td style={{ padding: "10px 8px", color: "var(--chakra-colors-fg-muted)" }}>{"40ms, 75ms, 110ms, 150ms, 225ms, 340ms, 400ms"}</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--chakra-colors-border-subtle)" }}>
                <td style={{ padding: "10px 8px", fontWeight: "600", fontFamily: "monospace" }}>{"sizes"}</td>
                <td style={{ padding: "10px 8px", fontFamily: "monospace", color: "var(--chakra-colors-fg-muted)" }}>{"headerH, tableRowH, modalControlsW"}</td>
                <td style={{ padding: "10px 8px", color: "var(--chakra-colors-fg-muted)" }}>{"56px, 56px, 70px"}</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--chakra-colors-border-subtle)" }}>
                <td style={{ padding: "10px 8px", fontWeight: "600", fontFamily: "monospace" }}>{"zIndex"}</td>
                <td style={{ padding: "10px 8px", fontFamily: "monospace", color: "var(--chakra-colors-fg-muted)" }}>{"modal"}</td>
                <td style={{ padding: "10px 8px", color: "var(--chakra-colors-fg-muted)" }}>{"1400 (stacking context dialog overlay)"}</td>
              </tr>
            </tbody>
          </table>
        </Box>
      </VStack>

      {/* 6. Layer Styles */}
      <VStack gap={3} align={"stretch"} w={"full"}>
        <Heading size={"sm"} fontWeight={"bold"}>
          {"6. Layer Styles (Glassmorphism Presets)"}
        </Heading>
        <P fontSize={"sm"} color={"fg.muted"}>
          {"Compound visual presets untuk efek visual kaca adaptif dark mode:"}
        </P>
        <HStack gap={2} wrap={"wrap"}>
          {["glass", "glassTop", "glassBottom", "glassTopRight", "glassBottomLeft", "frosted", "frostedLight", "frostedDark"].map((name) => (
            <Badge key={name} variant={"subtle"} size={"sm"}>
              {name}
            </Badge>
          ))}
        </HStack>
        <CodeBlock
          code={`// Menggunakan layerStyle pada Box atau Card:
<Box layerStyle={"glass"} p={4} rounded={"lg"}>
  <P>{"Konten dengan efek Glassmorphism"}</P>
</Box>`}
          language={"tsx"}
        />
      </VStack>

      {/* 7. How to Define & Edit Tokens */}
      <VStack gap={3} align={"stretch"} w={"full"}>
        <Heading size={"sm"} fontWeight={"bold"}>
          {"7. Cara Menambah & Mengedit Token"}
        </Heading>
        <P fontSize={"sm"} color={"fg.muted"}>
          {"Panduan sintaks penambahan raw token dan semantic token di chakra-system.ts:"}
        </P>

        <VStack gap={3} align={"stretch"}>
          <VStack gap={1} align={"stretch"}>
            <P fontSize={"xs"} fontWeight={"semibold"}>{"A. Menambahkan Raw Token (theme.tokens):"}</P>
            <CodeBlock
              code={`// Di src/design-system/chakra/chakra-system.ts -> tokens:
tokens: {
  colors: {
    brandPrimary: { value: "#3b82f6" },
  },
  durations: {
    instant: { value: "20ms" },
  },
}`}
              language={"typescript"}
            />
          </VStack>

          <VStack gap={1} align={"stretch"}>
            <P fontSize={"xs"} fontWeight={"semibold"}>{"B. Menambahkan Semantic Token (theme.semanticTokens):"}</P>
            <CodeBlock
              code={`// Di src/design-system/chakra/chakra-system.ts -> semanticTokens:
semanticTokens: {
  colors: {
    bg: {
      customCard: {
        value: {
          base: "{colors.neutral.100}", // Light mode
          _dark: "{colors.neutral.900}", // Dark mode
        },
      },
    },
  },
}`}
              language={"typescript"}
            />
          </VStack>

          <VStack gap={1} align={"stretch"}>
            <P fontSize={"xs"} fontWeight={"semibold"}>{"C. Penggunaan pada Komponen UI:"}</P>
            <CodeBlock
              code={`import { Box } from "@/design-system/components/layout/box/box";
import { P } from "@/design-system/components/typography/p/p";

export const CustomCard = () => {
  return (
    <Box bg={"bg.customCard"} border={"1px solid"} borderColor={"border.subtle"} p={4} rounded={"md"}>
      <P color={"colorPalette.fg"}>{"Teks otomatis beradaptasi dengan tema"}</P>
    </Box>
  );
};`}
              language={"tsx"}
            />
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  );
};
