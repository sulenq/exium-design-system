// src/features/design-system-docs/components/foundation/pages/design-tokens-foundation.page.tsx

import { Box } from "@/design-system/components/layout/box/box";
import { VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { Heading } from "@/design-system/components/typography/heading/heading";
import { P } from "@/design-system/components/typography/p/p";
import { CodeBlock } from "@/features/design-system-docs/components/code-block";
import { FoundationHeader } from "@/features/design-system-docs/components/foundation/foundation-header";

export const DesignTokensFoundationPage = () => {
  const THEME_KEYS_SPECS = [
    {
      key: "theme.breakpoints",
      childKeys: "sm, md, lg, xl",
      description:
        "Ukuran breakpoint media queries responsive layout (sm: 350px, md: 750px, lg: 960px, xl: 1200px).",
    },
    {
      key: "theme.keyframes",
      childKeys:
        "scale-up, scale-up-from-click-origin, scale-up-overshoot, scale-down, shrink-x, ping",
      description:
        "CSS keyframe animations untuk modal, drawer, dan transform dinamis berbasis koordinat klik origin.",
    },
    {
      key: "theme.tokens",
      childKeys:
        "colors, fonts, fontSizes, fontWeights, letterSpacings, lineHeights, radii, borders, borderWidths, shadows, easings, opacity, zIndex, durations, animations",
      description:
        "Nilai absolut konstan primitif yang tidak berubah antar tema/mode (raw values: px, rem, ms, hsl, hex).",
    },
    {
      key: "theme.semanticTokens",
      childKeys:
        "colors (bg, border, 31 palet), gradients, shadows, radii, borders, spacing, sizes, zIndex, blurs",
      description:
        "Token semantik kontekstual berbasis mode ({ base, _dark }) yang otomatis beradaptasi saat tema berubah.",
    },
    {
      key: "theme.textStyles",
      childKeys: "(object)",
      description:
        "Preset tipografi gabungan (fontSize, lineHeight, fontWeight, letterSpacing) untuk judul dan teks konten.",
    },
    {
      key: "theme.layerStyles",
      childKeys:
        "glass, glassTop, glassBottom, glassTopRight, glassBottomLeft, frosted, frostedLight, frostedDark",
      description:
        "Preset visual compound untuk glassmorphism, blur filter, border translucent, dan inset highlight.",
    },
    {
      key: "theme.animationStyles",
      childKeys: "(object)",
      description:
        "Kombinasi animasi CSS terkonfigurasi siap pakai langsung pada prop animationStyle Chakra UI.",
    },
    {
      key: "theme.recipes",
      childKeys: "button, input",
      description:
        "Single-part component styling recipe mendefinisikan base style, visual variants, dan sizes.",
    },
    {
      key: "theme.slotRecipes",
      childKeys: "select, checkbox, dialog, drawer, carousel",
      description:
        "Multi-part component recipe untuk komponen berslot banyak (trigger, content, item, backdrop, closeTrigger).",
    },
  ];

  const TOKENS_SUBKEYS_SPECS = [
    {
      subkey: "tokens.colors",
      format: "Hex / HSL Scale",
      description:
        "31+ palet warna skala 50–950 (neutral, grey, blue, orange, red, green, dll) dan raw alpha.",
    },
    {
      subkey: "tokens.fonts",
      format: "Font Family",
      description:
        "Font primer heading, body, dan number ('Plus Jakarta Sans Variable', sans-serif).",
    },
    {
      subkey: "tokens.fontSizes",
      format: "0.75rem – 6.3125rem",
      description:
        "Skala ukuran teks konsisten: xs (12px), sm (13px), md (14px), lg (16px), xl (18px) hingga 9xl (101px).",
    },
    {
      subkey: "tokens.fontWeights",
      format: "Numeric String",
      description:
        "Ketebalan font terstandardisasi: normal (450), medium (500), semibold (600), bold (700), extrabold (800), black (900).",
    },
    {
      subkey: "tokens.durations",
      format: "Milliseconds",
      description:
        "Durasi animasi: fastest (40ms), faster (75ms), fast (110ms), moderate (150ms), slow (225ms), slower (340ms), slowest (400ms).",
    },
    {
      subkey: "tokens.animations",
      format: "Keyframe + Easing",
      description:
        "Pemetaan shorthand animation string menghubungkan @keyframes dengan timing function cubic-bezier.",
    },
  ];

  const SEMANTIC_SUBKEYS_SPECS = [
    {
      subkey: "semanticTokens.colors.bg",
      slots:
        "body, canvas, panel, subtle, muted, emphasized, bodyAlpha, backdrop",
      description:
        "Token warna latar belakang adaptif light/dark mode untuk berbagai hierarki permukaan.",
    },
    {
      subkey: "semanticTokens.colors.border",
      slots: "DEFAULT, subtle, muted, emphasized",
      description:
        "Token garis batas adaptif (neutral 200/800, an1, an2, an3) untuk kontras proporsional.",
    },
    {
      subkey: "semanticTokens.colors.<palette>",
      slots:
        "contrast, fg, subtle, muted, emphasized, solid, focusRing, border",
      description:
        "8 role slots per palet warna (31 palet) menjamin konsistensi fungsi warna di seluruh komponen.",
    },
    {
      subkey: "semanticTokens.shadows",
      slots: "xs, sm, md, lg, xl, 2xl",
      description:
        "Elevasi bayangan dual-layer yang secara otomatis menyesuaikan intensitas opacity di dark mode.",
    },
    {
      subkey: "semanticTokens.sizes",
      slots:
        "headerH, tableRowH, tableCellH, tableActionsW, modalControlsW, feedbackMinH",
      description:
        "Ukuran dimensi layout terpadu (misal 56px untuk baris tabel dan header antarmuka).",
    },
    {
      subkey: "semanticTokens.blurs",
      slots:
        "none (0), sm (4px), md (10px), lg (5px), xl (50px), backdrop (10px)",
      description:
        "Derajat keburaman backdropFilter untuk efek glassmorphism dan modal overlay.",
    },
    {
      subkey: "semanticTokens.zIndex",
      slots: "modal (1400)",
      description:
        "Stacking context terkontrol untuk hierarki z-axis overlay dialog dan dropdown.",
    },
  ];

  return (
    <VStack gap={6} align={"stretch"} w={"full"}>
      <FoundationHeader
        title={"Design Tokens & Chakra System"}
        description={
          "Spesifikasi teknis arsitektur token, semantic tokens, layer styles, recipes, struktur konfigurasi, serta cara pendefinisian di chakra-system.ts."
        }
      />

      {/* 1. Full Object Structure */}
      <VStack gap={3} align={"stretch"} w={"full"}>
        <Heading size={"sm"} fontWeight={"bold"}>
          {"1. Full Object Structure chakraConfig"}
        </Heading>
        <P fontSize={"sm"} color={"fg.muted"}>
          {
            "Struktur hierarki lengkap seluruh key dan subkey konfigurasi sistem pada `src/design-system/chakra/chakra-system.ts`:"
          }
        </P>
        <CodeBlock
          code={`// Struktur lengkap defineConfig({ ... }) di chakra-system.ts
export const chakraConfig = defineConfig({
  globalCss: {
    "html, body": { bg: "bg.body", fontWeight: "normal" },
    "div, p, button, input, ...": { fontSize: "md", fontWeight: "normal" },
  },

  theme: {
    // 1. Breakpoints media queries
    breakpoints: {
      sm: "350px",
      md: "750px",
      lg: "960px",
      xl: "1200px",
    },

    // 2. CSS @keyframes animations
    keyframes: {
      "scale-up": { ... },
      "scale-up-from-click-origin": { ... },
      "scale-up-overshoot": { ... },
      "scale-down": { ... },
      "scale-down-to-click-origin": { ... },
      "shrink-x": { ... },
      ping: { ... },
    },

    // 3. Raw Non-Contextual Primitive Tokens
    tokens: {
      colors: {
        canvasLight: { value: "#f5f6f8" },
        canvasDark: { value: "#161717" },
        neutral: { 50: { value: "hsl(0, 0%, 97%)" }, ... 950: { ... } },
        grey: { ... }, cream: { ... }, blue: { ... }, // 31+ palet warna 50-950
      },
      fonts: {
        heading: { value: "'Plus Jakarta Sans Variable', sans-serif" },
        body: { value: "'Plus Jakarta Sans Variable', sans-serif" },
        number: { value: "'Plus Jakarta Sans Variable', sans-serif" },
      },
      fontSizes: { xs: { value: "0.75rem" }, sm: { ... }, md: { ... }, ... 9xl: { ... } },
      fontWeights: { normal: { value: "450" }, medium: { value: "500" }, semibold: { value: "600" }, bold: { value: "700" } },
      durations: { fastest: { value: "40ms" }, faster: { ... }, moderate: { ... }, slowest: { value: "400ms" } },
      animations: {
        "scale-up-from-click-origin": { value: "scale-up-from-click-origin" },
        "scale-up": { value: "scale-up cubic-bezier(0.4, 0, 0.2, 1)" },
        "scale-down": { value: "scale-down cubic-bezier(0.4, 0, 0.2, 1)" },
        "shrink-x": { value: "shrink-x" },
      },
      letterSpacings: {}, lineHeights: {}, radii: {}, borders: {}, borderWidths: {}, shadows: {}, easings: {}, opacity: {}, zIndex: {}, assets: {}, aspectRatios: {},
    },

    // 4. Contextual Semantic Tokens (Dark & Light Mode aware)
    semanticTokens: {
      colors: {
        bg: {
          body: { value: { base: "#ffffff", _dark: "#1a1b1c" } },
          canvas: { value: { base: "{colors.canvasLight}", _dark: "{colors.canvasDark}" } },
          panel: { value: { base: "{colors.neutral.100}", _dark: "{colors.bodyDark}" } },
          subtle: { value: { base: "{colors.neutral.50}", _dark: "{colors.neutral.950}" } },
          muted: { value: { base: "{colors.neutral.100}", _dark: "{colors.neutral.900}" } },
          emphasized: { value: { base: "{colors.neutral.200}", _dark: "{colors.neutral.800}" } },
          bodyAlpha: { value: { base: "#ffffffbf", _dark: "#1a1b1cbf" } },
          backdrop: { value: { base: "#12121273", _dark: "#1212128c" } },
        },
        border: {
          DEFAULT: { value: { base: "{colors.neutral.200}", _dark: "{colors.neutral.800}" } },
          subtle: { value: { base: "{colors.an1}", _dark: "{colors.an1}" } },
          muted: { value: { base: "{colors.an2}", _dark: "{colors.an2}" } },
          emphasized: { value: { base: "{colors.an3}", _dark: "{colors.an3}" } },
        },
        // 31 Palet Warna dengan 8 role slot konsisten:
        neutral: { contrast: { ... }, fg: { ... }, subtle: { ... }, muted: { ... }, emphasized: { ... }, solid: { ... }, focusRing: { ... }, border: { ... } },
        blue: { contrast: { ... }, fg: { ... }, subtle: { ... }, muted: { ... }, emphasized: { ... }, solid: { ... }, focusRing: { ... }, border: { ... } },
        // ... (orange, red, green, purple, dst.)
      },
      shadows: {
        xs: { value: { base: "0 1px 2px rgba(0,0,0,0.05)", _dark: "0 1px 2px rgba(0,0,0,0.15)" } },
        sm: { ... }, md: { ... }, lg: { ... }, xl: { ... }, "2xl": { ... },
      },
      sizes: {
        headerH: { value: "56px" },
        tableRowH: { value: "56px" },
        tableCellH: { value: "56px" },
        tableActionsW: { value: "56px" },
        modalControlsW: { value: "70px" },
        feedbackMinH: { value: "240px" },
      },
      blurs: {
        sm: { value: "4px" }, md: { value: "10px" }, lg: { value: "5px" }, xl: { value: "50px" }, backdrop: { value: "10px" },
      },
      zIndex: {
        modal: { value: 1400 },
      },
      gradients: {}, radii: {}, borders: {}, spacing: {},
    },

    // 5. Typography compound presets
    textStyles: {},

    // 6. Compound visual presets (Glassmorphism)
    layerStyles: {
      glass: { value: { bg: "bg.bodyAlpha", backdropFilter: "blur(5px)", border: "1px solid", borderColor: { ... }, boxShadow: { ... } } },
      glassTop: { value: { ... } },
      glassBottom: { value: { ... } },
      frosted: { value: { ... } },
      frostedLight: { value: { ... } },
      frostedDark: { value: { ... } },
    },

    // 7. Motion animation styles
    animationStyles: {},

    // 8. Single-part component styling recipes
    recipes: {
      button: buttonRecipe,
      input: inputRecipe,
    },

    // 9. Multi-part slot component recipes
    slotRecipes: {
      select: selectRecipe,
      checkbox: checkboxRecipe,
      dialog: dialogRecipe,
      drawer: drawerRecipe,
      carousel: carouselRecipe,
    },
  },
});`}
          language={"tsx"}
        />
      </VStack>

      {/* 2. Top-Level Theme Keys Breakdown */}
      <VStack gap={3} align={"stretch"} w={"full"}>
        <Heading size={"sm"} fontWeight={"bold"}>
          {"2. Rincian Semua Key di theme"}
        </Heading>
        <P fontSize={"sm"} color={"fg.muted"}>
          {"Penjelasan teknis setiap key di dalam objek `theme`:"}
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
                <th style={{ padding: "10px 8px" }}>{"Key"}</th>
                <th style={{ padding: "10px 8px" }}>
                  {"Child / Subkey Terdaftar"}
                </th>
                <th style={{ padding: "10px 8px" }}>{"Penjelasan Teknis"}</th>
              </tr>
            </thead>
            <tbody>
              {THEME_KEYS_SPECS.map((item) => (
                <tr
                  key={item.key}
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
                    {item.key}
                  </td>
                  <td
                    style={{
                      padding: "10px 8px",
                      fontFamily: "monospace",
                      color: "var(--chakra-colors-fg-muted)",
                    }}
                  >
                    {item.childKeys}
                  </td>
                  <td
                    style={{
                      padding: "10px 8px",
                      color: "var(--chakra-colors-fg-muted)",
                    }}
                  >
                    {item.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </VStack>

      {/* 3. Nested Keys di tokens (Raw Primitive) */}
      <VStack gap={3} align={"stretch"} w={"full"}>
        <Heading size={"sm"} fontWeight={"bold"}>
          {"3. Rincian Subkey di theme.tokens"}
        </Heading>
        <P fontSize={"sm"} color={"fg.muted"}>
          {
            "Subkey pada `tokens` memuat nilai konstan absolut primitif yang tidak berubah antar mode:"
          }
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
                <th style={{ padding: "10px 8px" }}>{"Subkey"}</th>
                <th style={{ padding: "10px 8px" }}>{"Format Nilai"}</th>
                <th style={{ padding: "10px 8px" }}>{"Penjelasan Teknis"}</th>
              </tr>
            </thead>
            <tbody>
              {TOKENS_SUBKEYS_SPECS.map((item) => (
                <tr
                  key={item.subkey}
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
                    {item.subkey}
                  </td>
                  <td
                    style={{
                      padding: "10px 8px",
                      fontFamily: "monospace",
                      color: "var(--chakra-colors-fg-muted)",
                    }}
                  >
                    {item.format}
                  </td>
                  <td
                    style={{
                      padding: "10px 8px",
                      color: "var(--chakra-colors-fg-muted)",
                    }}
                  >
                    {item.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </VStack>

      {/* 4. Nested Keys di semanticTokens */}
      <VStack gap={3} align={"stretch"} w={"full"}>
        <Heading size={"sm"} fontWeight={"bold"}>
          {"4. Rincian Subkey di theme.semanticTokens"}
        </Heading>
        <P fontSize={"sm"} color={"fg.muted"}>
          {
            "Subkey pada `semanticTokens` memuat token kontekstual adaptif Light & Dark mode ({ base, _dark }):"
          }
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
                <th style={{ padding: "10px 8px" }}>{"Subkey"}</th>
                <th style={{ padding: "10px 8px" }}>
                  {"Slot / Token Terdaftar"}
                </th>
                <th style={{ padding: "10px 8px" }}>{"Penjelasan Teknis"}</th>
              </tr>
            </thead>
            <tbody>
              {SEMANTIC_SUBKEYS_SPECS.map((item) => (
                <tr
                  key={item.subkey}
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
                    {item.subkey}
                  </td>
                  <td
                    style={{
                      padding: "10px 8px",
                      fontFamily: "monospace",
                      color: "var(--chakra-colors-fg-muted)",
                    }}
                  >
                    {item.slots}
                  </td>
                  <td
                    style={{
                      padding: "10px 8px",
                      color: "var(--chakra-colors-fg-muted)",
                    }}
                  >
                    {item.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </VStack>

      {/* 5. Recipes vs SlotRecipes */}
      <VStack gap={3} align={"stretch"} w={"full"}>
        <Heading size={"sm"} fontWeight={"bold"}>
          {"5. Perbedaan recipes & slotRecipes"}
        </Heading>
        <P fontSize={"sm"} color={"fg.muted"}>
          {
            "Komponen styling di Chakra UI v3 dibagi menjadi dua kategori arsitektur recipe:"
          }
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
                <th style={{ padding: "10px 8px" }}>{"Kategori"}</th>
                <th style={{ padding: "10px 8px" }}>{"Komponen"}</th>
                <th style={{ padding: "10px 8px" }}>
                  {"Karakteristik & Anatomi"}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                style={{
                  borderBottom: "1px solid var(--chakra-colors-border-subtle)",
                }}
              >
                <td
                  style={{
                    padding: "10px 8px",
                    fontWeight: "600",
                    fontFamily: "monospace",
                  }}
                >
                  {"recipes"}
                </td>
                <td
                  style={{
                    padding: "10px 8px",
                    fontFamily: "monospace",
                    color: "var(--chakra-colors-fg-muted)",
                  }}
                >
                  {"button, input"}
                </td>
                <td
                  style={{
                    padding: "10px 8px",
                    color: "var(--chakra-colors-fg-muted)",
                  }}
                >
                  {
                    "Single DOM element tanpa bagian internal independen. Memiliki baseStyle, variants, dan defaultVariants."
                  }
                </td>
              </tr>
              <tr
                style={{
                  borderBottom: "1px solid var(--chakra-colors-border-subtle)",
                }}
              >
                <td
                  style={{
                    padding: "10px 8px",
                    fontWeight: "600",
                    fontFamily: "monospace",
                  }}
                >
                  {"slotRecipes"}
                </td>
                <td
                  style={{
                    padding: "10px 8px",
                    fontFamily: "monospace",
                    color: "var(--chakra-colors-fg-muted)",
                  }}
                >
                  {"select, checkbox, dialog, drawer, carousel"}
                </td>
                <td
                  style={{
                    padding: "10px 8px",
                    color: "var(--chakra-colors-fg-muted)",
                  }}
                >
                  {
                    "Multi-part component dengan slots array (misal dialog: root, backdrop, positioner, content, header, body, footer, closeTrigger). Setiap slot dapat di-style tersendiri per variant."
                  }
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
      </VStack>

      {/* 6. How to Define & Edit Tokens */}
      <VStack gap={3} align={"stretch"} w={"full"}>
        <Heading size={"sm"} fontWeight={"bold"}>
          {"6. Cara Menambah & Mengedit Token"}
        </Heading>
        <P fontSize={"sm"} color={"fg.muted"}>
          {
            "Panduan sintaks penambahan raw token dan semantic token di chakra-system.ts:"
          }
        </P>

        <VStack gap={3} align={"stretch"}>
          <VStack gap={1} align={"stretch"}>
            <P fontWeight={"semibold"}>
              {"A. Menambahkan Raw Token (theme.tokens):"}
            </P>
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
            <P fontWeight={"semibold"}>
              {"B. Menambahkan Semantic Token (theme.semanticTokens):"}
            </P>
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
            <P fontWeight={"semibold"}>{"C. Penggunaan pada Komponen UI:"}</P>
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
