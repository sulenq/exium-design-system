// src/features/design-system-docs/components/foundation/pages/design-tokens-foundation.page.tsx

import { Box } from "@/design-system/components/layout/box/box";
import {
  HStack,
  VStack,
} from "@/design-system/components/layout/flex-box/flex-box";
import { Badge } from "@/design-system/components/typography/badge/badge";
import { Heading } from "@/design-system/components/typography/heading/heading";
import { P } from "@/design-system/components/typography/p/p";
import { CodeBlock } from "@/features/design-system-docs/components/code-block";
import { FoundationHeader } from "@/features/design-system-docs/components/foundation/foundation-header";

export const DesignTokensFoundationPage = () => {
  return (
    <VStack gap={6}>
      <FoundationHeader
        title={"Design Tokens & Chakra System"}
        description={
          "Dokumentasi lengkap seluruh konfigurasi token, semantic tokens, keyframes, layer styles, recipes, struktur key, arti, serta cara pendefinisian dan pengeditan di chakra-system.ts."
        }
      />

      {/* 1. Architecture Overview */}
      <Box
        rounded={"lg"}
        border={"1px solid"}
        borderColor={"border.subtle"}
        bg={"bg.body"}
        p={4}
        w={"full"}
      >
        <VStack gap={3}>
          <Heading size={"sm"} fontWeight={"bold"}>
            {"1. Arsitektur File & Lokasi"}
          </Heading>
          <P fontSize={"sm"} color={"fg.muted"}>
            {
              "Semua konfigurasi token, tema, dan styling system Chakra UI v3 dipusatkan pada satu file utama:"
            }
          </P>
          <CodeBlock
            code={`// Lokasi file:
src/design-system/chakra/chakra-system.ts

// Komponen penyusun:
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
      </Box>

      {/* 2. Top-Level Keys inside chakraConfig */}
      <Box
        rounded={"lg"}
        border={"1px solid"}
        borderColor={"border.subtle"}
        bg={"bg.body"}
        p={4}
        w={"full"}
      >
        <VStack gap={4}>
          <Heading size={"sm"} fontWeight={"bold"}>
            {"2. Daftar Seluruh Top-Level Key di chakra-system"}
          </Heading>
          <P fontSize={"sm"} color={"fg.muted"}>
            {
              "Setiap konfigurasi di dalam `defineConfig` mengendalikan aspek tertentu pada sistem styling aplikasi:"
            }
          </P>

          <VStack gap={3}>
            <Box
              p={3}
              rounded={"md"}
              bg={"bg.subtle"}
              border={"1px solid"}
              borderColor={"border.subtle"}
            >
              <HStack justify={"space-between"} mb={1}>
                <Badge colorPalette={"blue"}>{"globalCss"}</Badge>
                <P fontSize={"xs"} color={"fg.muted"} fontFamily={"mono"}>
                  {"object"}
                </P>
              </HStack>
              <P fontSize={"sm"}>
                {
                  "Mendefinisikan styling global CSS yang diinjeksi ke DOM root (misal `html, body` bg ke `bg.body`, font dasar, dan reset tipografi element)."
                }
              </P>
            </Box>

            <Box
              p={3}
              rounded={"md"}
              bg={"bg.subtle"}
              border={"1px solid"}
              borderColor={"border.subtle"}
            >
              <HStack justify={"space-between"} mb={1}>
                <Badge colorPalette={"purple"}>{"theme.breakpoints"}</Badge>
                <P fontSize={"xs"} color={"fg.muted"} fontFamily={"mono"}>
                  {"sm, md, lg, xl"}
                </P>
              </HStack>
              <P fontSize={"sm"}>
                {
                  "Breakpoint responsive layout: `sm: 350px`, `md: 750px`, `lg: 960px`, `xl: 1200px`."
                }
              </P>
            </Box>

            <Box
              p={3}
              rounded={"md"}
              bg={"bg.subtle"}
              border={"1px solid"}
              borderColor={"border.subtle"}
            >
              <HStack justify={"space-between"} mb={1}>
                <Badge colorPalette={"teal"}>{"theme.keyframes"}</Badge>
                <P fontSize={"xs"} color={"fg.muted"} fontFamily={"mono"}>
                  {"CSS @keyframes"}
                </P>
              </HStack>
              <P fontSize={"sm"}>
                {
                  "Animasi modal & overlay: `scale-up`, `scale-up-from-click-origin`, `scale-up-overshoot`, `scale-down`, `shrink-x`, `ping` menggunakan CSS variable koordinat origin klik."
                }
              </P>
            </Box>

            <Box
              p={3}
              rounded={"md"}
              bg={"bg.subtle"}
              border={"1px solid"}
              borderColor={"border.subtle"}
            >
              <HStack justify={"space-between"} mb={1}>
                <Badge colorPalette={"orange"}>{"theme.tokens"}</Badge>
                <P fontSize={"xs"} color={"fg.muted"} fontFamily={"mono"}>
                  {"Raw Tokens (Non-Contextual)"}
                </P>
              </HStack>
              <P fontSize={"sm"}>
                {
                  "Nilai absolut konstan (raw primitive) yang tidak tergantung tema, seperti palet warna 50–950, font family, font size skala rem, durasi transisi, dan weight."
                }
              </P>
            </Box>

            <Box
              p={3}
              rounded={"md"}
              bg={"bg.subtle"}
              border={"1px solid"}
              borderColor={"border.subtle"}
            >
              <HStack justify={"space-between"} mb={1}>
                <Badge colorPalette={"green"}>{"theme.semanticTokens"}</Badge>
                <P fontSize={"xs"} color={"fg.muted"} fontFamily={"mono"}>
                  {"Contextual & Mode-Aware Tokens"}
                </P>
              </HStack>
              <P fontSize={"sm"}>
                {
                  "Token adaptif terhadap Dark/Light mode (`base` vs `_dark`) dan semantic role (misal `bg.panel`, `bg.subtle`, `border.subtle`, `colorPalette.fg`, `colorPalette.solid`)."
                }
              </P>
            </Box>

            <Box
              p={3}
              rounded={"md"}
              bg={"bg.subtle"}
              border={"1px solid"}
              borderColor={"border.subtle"}
            >
              <HStack justify={"space-between"} mb={1}>
                <Badge colorPalette={"cyan"}>{"theme.layerStyles"}</Badge>
                <P fontSize={"xs"} color={"fg.muted"} fontFamily={"mono"}>
                  {"Compound Visual Presets"}
                </P>
              </HStack>
              <P fontSize={"sm"}>
                {
                  "Kombinasi style siap pakai untuk efek visual kompleks seperti Glassmorphism (`glass`, `glassTop`, `glassBottom`, `frosted`, `frostedInverted`)."
                }
              </P>
            </Box>

            <Box
              p={3}
              rounded={"md"}
              bg={"bg.subtle"}
              border={"1px solid"}
              borderColor={"border.subtle"}
            >
              <HStack justify={"space-between"} mb={1}>
                <Badge colorPalette={"pink"}>
                  {"theme.recipes & slotRecipes"}
                </Badge>
                <P fontSize={"xs"} color={"fg.muted"} fontFamily={"mono"}>
                  {"Component Styling Recipes"}
                </P>
              </HStack>
              <P fontSize={"sm"}>
                {
                  "Recipe tunggal (`button`, `input`) dan Multi-part Slot Recipe (`select`, `checkbox`, `dialog`, `drawer`, `carousel`) untuk komponen Chakra UI v3."
                }
              </P>
            </Box>
          </VStack>
        </VStack>
      </Box>

      {/* 3. Deep Dive: Tokens vs Semantic Tokens */}
      <Box
        rounded={"lg"}
        border={"1px solid"}
        borderColor={"border.subtle"}
        bg={"bg.body"}
        p={4}
        w={"full"}
      >
        <VStack gap={4}>
          <Heading size={"sm"} fontWeight={"bold"}>
            {"3. Rincian Kategori Tokens & Semantic Tokens"}
          </Heading>
          <P fontSize={"sm"} color={"fg.muted"}>
            {
              "Berikut adalah daftar seluruh key kategori di dalam `tokens` dan `semanticTokens` beserta fungsinya:"
            }
          </P>

          <VStack gap={3}>
            {/* Tokens Colors */}
            <Box
              p={3}
              rounded={"md"}
              border={"1px solid"}
              borderColor={"border.subtle"}
            >
              <Heading size={"xs"} mb={1}>
                {"tokens.colors (Primitive HSL & Hex Scales)"}
              </Heading>
              <P fontSize={"xs"} color={"fg.muted"} mb={2}>
                {
                  "Berisi nilai statis mentah. Memuat 31+ palet warna skala 50 hingga 950:"
                }
              </P>
              <P fontSize={"xs"} fontFamily={"mono"} color={"fg.subtle"}>
                {
                  "neutral, grey, cream, caramel, mocha, brown, maroon, red, salmon, pastelOrange, orange, gold, yellow, lime, olive, green, jade, teal, tealBlue, cyan, sky, powderBlue, blue, sapphire, indigo, discord, powderLavender, lavender, purple, bubblegumPink, pink"
                }
              </P>
            </Box>

            {/* Semantic Tokens Colors */}
            <Box
              p={3}
              rounded={"md"}
              border={"1px solid"}
              borderColor={"border.subtle"}
            >
              <Heading size={"xs"} mb={1}>
                {"semanticTokens.colors.bg (Adaptive Backgrounds)"}
              </Heading>
              <P fontSize={"xs"} color={"fg.muted"} mb={2}>
                {
                  "Token background yang otomatis berganti warna antara Light & Dark mode:"
                }
              </P>
              <VStack gap={1} align={"stretch"}>
                <HStack justify={"space-between"}>
                  <P fontSize={"xs"} fontFamily={"mono"}>
                    {"bg.body"}
                  </P>
                  <P fontSize={"xs"} color={"fg.muted"}>
                    {"Background utama konten putih / #1a1b1c"}
                  </P>
                </HStack>
                <HStack justify={"space-between"}>
                  <P fontSize={"xs"} fontFamily={"mono"}>
                    {"bg.canvas"}
                  </P>
                  <P fontSize={"xs"} color={"fg.muted"}>
                    {"Background canvas dasar app / layout #f5f6f8 / #161717"}
                  </P>
                </HStack>
                <HStack justify={"space-between"}>
                  <P fontSize={"xs"} fontFamily={"mono"}>
                    {"bg.panel"}
                  </P>
                  <P fontSize={"xs"} color={"fg.muted"}>
                    {"Panel container, sidebar, atau card"}
                  </P>
                </HStack>
                <HStack justify={"space-between"}>
                  <P fontSize={"xs"} fontFamily={"mono"}>
                    {"bg.subtle"}
                  </P>
                  <P fontSize={"xs"} color={"fg.muted"}>
                    {"Background kontras lembut (hover/list/zebra)"}
                  </P>
                </HStack>
                <HStack justify={"space-between"}>
                  <P fontSize={"xs"} fontFamily={"mono"}>
                    {"bg.muted"}
                  </P>
                  <P fontSize={"xs"} color={"fg.muted"}>
                    {"Background badge subtle, disabled, atau tag"}
                  </P>
                </HStack>
                <HStack justify={"space-between"}>
                  <P fontSize={"xs"} fontFamily={"mono"}>
                    {"bg.emphasized"}
                  </P>
                  <P fontSize={"xs"} color={"fg.muted"}>
                    {"Background aktif / ditekan / selected item"}
                  </P>
                </HStack>
                <HStack justify={"space-between"}>
                  <P fontSize={"xs"} fontFamily={"mono"}>
                    {"bg.bodyAlpha"}
                  </P>
                  <P fontSize={"xs"} color={"fg.muted"}>
                    {"Background transparan untuk overlay / glassmorphism"}
                  </P>
                </HStack>
                <HStack justify={"space-between"}>
                  <P fontSize={"xs"} fontFamily={"mono"}>
                    {"bg.backdrop"}
                  </P>
                  <P fontSize={"xs"} color={"fg.muted"}>
                    {"Backdrop modal atau drawer dialog"}
                  </P>
                </HStack>
              </VStack>
            </Box>

            {/* Semantic Tokens Borders */}
            <Box
              p={3}
              rounded={"md"}
              border={"1px solid"}
              borderColor={"border.subtle"}
            >
              <Heading size={"xs"} mb={1}>
                {"semanticTokens.colors.border (Adaptive Borders)"}
              </Heading>
              <VStack gap={1} align={"stretch"}>
                <HStack justify={"space-between"}>
                  <P fontSize={"xs"} fontFamily={"mono"}>
                    {"border (DEFAULT)"}
                  </P>
                  <P fontSize={"xs"} color={"fg.muted"}>
                    {"Border standar komponen (neutral 200 / 800)"}
                  </P>
                </HStack>
                <HStack justify={"space-between"}>
                  <P fontSize={"xs"} fontFamily={"mono"}>
                    {"border.subtle"}
                  </P>
                  <P fontSize={"xs"} color={"fg.muted"}>
                    {"Border sangat tipis / pemisah section (an1)"}
                  </P>
                </HStack>
                <HStack justify={"space-between"}>
                  <P fontSize={"xs"} fontFamily={"mono"}>
                    {"border.muted"}
                  </P>
                  <P fontSize={"xs"} color={"fg.muted"}>
                    {"Border sekunder / card outline (an2)"}
                  </P>
                </HStack>
                <HStack justify={"space-between"}>
                  <P fontSize={"xs"} fontFamily={"mono"}>
                    {"border.emphasized"}
                  </P>
                  <P fontSize={"xs"} color={"fg.muted"}>
                    {"Border interaktif atau hover state (an3)"}
                  </P>
                </HStack>
              </VStack>
            </Box>

            {/* Semantic Palette Tokens */}
            <Box
              p={3}
              rounded={"md"}
              border={"1px solid"}
              borderColor={"border.subtle"}
            >
              <Heading size={"xs"} mb={1}>
                {"semanticTokens.colors.<palette> (Role-Based Color Scales)"}
              </Heading>
              <P fontSize={"xs"} color={"fg.muted"} mb={2}>
                {
                  "Setiap nama warna (misal `blue`, `green`, `red`, dll) menyediakan semantic slots yang konsisten:"
                }
              </P>
              <VStack gap={1} align={"stretch"}>
                <HStack justify={"space-between"}>
                  <P fontSize={"xs"} fontFamily={"mono"}>
                    {"colorPalette.contrast"}
                  </P>
                  <P fontSize={"xs"} color={"fg.muted"}>
                    {"Warna teks di atas background solid (putih/hitam)"}
                  </P>
                </HStack>
                <HStack justify={"space-between"}>
                  <P fontSize={"xs"} fontFamily={"mono"}>
                    {"colorPalette.fg"}
                  </P>
                  <P fontSize={"xs"} color={"fg.muted"}>
                    {"Warna teks foreground beraksen"}
                  </P>
                </HStack>
                <HStack justify={"space-between"}>
                  <P fontSize={"xs"} fontFamily={"mono"}>
                    {"colorPalette.subtle"}
                  </P>
                  <P fontSize={"xs"} color={"fg.muted"}>
                    {"Warna background badge / tag / alert lembut"}
                  </P>
                </HStack>
                <HStack justify={"space-between"}>
                  <P fontSize={"xs"} fontFamily={"mono"}>
                    {"colorPalette.muted"}
                  </P>
                  <P fontSize={"xs"} color={"fg.muted"}>
                    {"Background aksen sekunder / hover"}
                  </P>
                </HStack>
                <HStack justify={"space-between"}>
                  <P fontSize={"xs"} fontFamily={"mono"}>
                    {"colorPalette.emphasized"}
                  </P>
                  <P fontSize={"xs"} color={"fg.muted"}>
                    {"Background aksen aktif saat diklik / selected"}
                  </P>
                </HStack>
                <HStack justify={"space-between"}>
                  <P fontSize={"xs"} fontFamily={"mono"}>
                    {"colorPalette.solid"}
                  </P>
                  <P fontSize={"xs"} color={"fg.muted"}>
                    {"Background tombol solid primer"}
                  </P>
                </HStack>
                <HStack justify={"space-between"}>
                  <P fontSize={"xs"} fontFamily={"mono"}>
                    {"colorPalette.focusRing"}
                  </P>
                  <P fontSize={"xs"} color={"fg.muted"}>
                    {"Outline ring fokus aksesibilitas input / button"}
                  </P>
                </HStack>
                <HStack justify={"space-between"}>
                  <P fontSize={"xs"} fontFamily={"mono"}>
                    {"colorPalette.border"}
                  </P>
                  <P fontSize={"xs"} color={"fg.muted"}>
                    {"Border untuk variant outline"}
                  </P>
                </HStack>
              </VStack>
            </Box>

            {/* Fonts & Durations */}
            <Box
              p={3}
              rounded={"md"}
              border={"1px solid"}
              borderColor={"border.subtle"}
            >
              <Heading size={"xs"} mb={1}>
                {"tokens.fonts & tokens.durations"}
              </Heading>
              <VStack gap={1} align={"stretch"}>
                <HStack justify={"space-between"}>
                  <P fontSize={"xs"} fontFamily={"mono"}>
                    {"fonts.heading / fonts.body"}
                  </P>
                  <P fontSize={"xs"} color={"fg.muted"}>
                    {"'Plus Jakarta Sans Variable', sans-serif"}
                  </P>
                </HStack>
                <HStack justify={"space-between"}>
                  <P fontSize={"xs"} fontFamily={"mono"}>
                    {"fontSizes (xs - 9xl)"}
                  </P>
                  <P fontSize={"xs"} color={"fg.muted"}>
                    {"0.75rem (12px) s.d. 6.3125rem (101px)"}
                  </P>
                </HStack>
                <HStack justify={"space-between"}>
                  <P fontSize={"xs"} fontFamily={"mono"}>
                    {"fontWeights (normal - black)"}
                  </P>
                  <P fontSize={"xs"} color={"fg.muted"}>
                    {"normal (450), medium (500), semibold (600), bold (700)"}
                  </P>
                </HStack>
                <HStack justify={"space-between"}>
                  <P fontSize={"xs"} fontFamily={"mono"}>
                    {"durations (fastest - slowest)"}
                  </P>
                  <P fontSize={"xs"} color={"fg.muted"}>
                    {"40ms, 75ms, 110ms, 150ms, 225ms, 340ms, 400ms"}
                  </P>
                </HStack>
              </VStack>
            </Box>

            {/* Semantic Sizes, Blurs, Shadows & ZIndex */}
            <Box
              p={3}
              rounded={"md"}
              border={"1px solid"}
              borderColor={"border.subtle"}
            >
              <Heading size={"xs"} mb={1}>
                {"semanticTokens (Sizes, Shadows, Blurs, zIndex)"}
              </Heading>
              <VStack gap={1} align={"stretch"}>
                <HStack justify={"space-between"}>
                  <P fontSize={"xs"} fontFamily={"mono"}>
                    {"sizes.headerH / tableRowH"}
                  </P>
                  <P fontSize={"xs"} color={"fg.muted"}>
                    {"56px (standar tinggi baris tabel & header)"}
                  </P>
                </HStack>
                <HStack justify={"space-between"}>
                  <P fontSize={"xs"} fontFamily={"mono"}>
                    {"sizes.modalControlsW"}
                  </P>
                  <P fontSize={"xs"} color={"fg.muted"}>
                    {"70px (lebar tombol action modal)"}
                  </P>
                </HStack>
                <HStack justify={"space-between"}>
                  <P fontSize={"xs"} fontFamily={"mono"}>
                    {"shadows (xs - 2xl)"}
                  </P>
                  <P fontSize={"xs"} color={"fg.muted"}>
                    {"Elevasi shadow dual-layer adaptif dark mode"}
                  </P>
                </HStack>
                <HStack justify={"space-between"}>
                  <P fontSize={"xs"} fontFamily={"mono"}>
                    {"blurs (sm - xl, backdrop)"}
                  </P>
                  <P fontSize={"xs"} color={"fg.muted"}>
                    {"sm: 4px, md: 10px, lg: 5px, xl: 50px, backdrop: 10px"}
                  </P>
                </HStack>
                <HStack justify={"space-between"}>
                  <P fontSize={"xs"} fontFamily={"mono"}>
                    {"zIndex.modal"}
                  </P>
                  <P fontSize={"xs"} color={"fg.muted"}>
                    {"1400 (stacking context dialog overlay)"}
                  </P>
                </HStack>
              </VStack>
            </Box>
          </VStack>
        </VStack>
      </Box>

      {/* 4. Layer Styles (Glassmorphism) */}
      <Box
        rounded={"lg"}
        border={"1px solid"}
        borderColor={"border.subtle"}
        bg={"bg.body"}
        p={4}
        w={"full"}
      >
        <VStack gap={3}>
          <Heading size={"sm"} fontWeight={"bold"}>
            {"4. Layer Styles (Glass & Frosted Presets)"}
          </Heading>
          <P fontSize={"sm"} color={"fg.muted"}>
            {
              "Didefinisikan di `layerStyles` untuk efek glassmorphism dengan inset highlight dan dark/light borders:"
            }
          </P>
          <VStack gap={1} align={"stretch"}>
            <HStack justify={"space-between"}>
              <P fontSize={"xs"} fontFamily={"mono"}>
                {"glass"}
              </P>
              <P fontSize={"xs"} color={"fg.muted"}>
                {"Efek kaca serba guna dengan blur 5px dan inset border"}
              </P>
            </HStack>
            <HStack justify={"space-between"}>
              <P fontSize={"xs"} fontFamily={"mono"}>
                {"glassTop / glassBottom"}
              </P>
              <P fontSize={"xs"} color={"fg.muted"}>
                {"Glass dengan highlight bayangan searah (atas / bawah)"}
              </P>
            </HStack>
            <HStack justify={"space-between"}>
              <P fontSize={"xs"} fontFamily={"mono"}>
                {"glassTopRight / glassBottomLeft"}
              </P>
              <P fontSize={"xs"} color={"fg.muted"}>
                {"Glass sudut miring directional untuk floating widget"}
              </P>
            </HStack>
            <HStack justify={"space-between"}>
              <P fontSize={"xs"} fontFamily={"mono"}>
                {"frosted / frostedLight / frostedDark"}
              </P>
              <P fontSize={"xs"} color={"fg.muted"}>
                {"Efek buram frosted glass untuk panel popup"}
              </P>
            </HStack>
          </VStack>
          <CodeBlock
            code={`// Contoh pemakaian layerStyle pada Box atau Card:
<Box layerStyle={"glass"} p={4} rounded={"lg"}>
  <P>{"Konten dengan efek Glassmorphism"}</P>
</Box>`}
            language={"tsx"}
          />
        </VStack>
      </Box>

      {/* 5. How to Define & Edit Tokens */}
      <Box
        rounded={"lg"}
        border={"1px solid"}
        borderColor={"border.subtle"}
        bg={"bg.body"}
        p={4}
        w={"full"}
      >
        <VStack gap={4}>
          <Heading size={"sm"} fontWeight={"bold"}>
            {"5. Cara Mendefinisikan & Mengedit Token Baru"}
          </Heading>

          <VStack gap={3}>
            {/* Step 1: Primitive Token */}
            <Box
              p={3}
              rounded={"md"}
              bg={"bg.subtle"}
              border={"1px solid"}
              borderColor={"border.subtle"}
            >
              <Heading size={"xs"} mb={1}>
                {"A. Menambahkan Raw Token (tokens)"}
              </Heading>
              <P fontSize={"xs"} color={"fg.muted"} mb={2}>
                {
                  'Gunakan sintaks `{ value: "..." }` di dalam kategori terkait pada `theme.tokens`:'
                }
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
            </Box>

            {/* Step 2: Semantic Token with Dark Mode */}
            <Box
              p={3}
              rounded={"md"}
              bg={"bg.subtle"}
              border={"1px solid"}
              borderColor={"border.subtle"}
            >
              <Heading size={"xs"} mb={1}>
                {"B. Menambahkan Semantic Token (semanticTokens)"}
              </Heading>
              <P fontSize={"xs"} color={"fg.muted"} mb={2}>
                {
                  'Gunakan alias reference `{colors.x}` dengan object `{ base: "...", _dark: "..." }`:'
                }
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
            </Box>

            {/* Step 3: Usage in UI Code */}
            <Box
              p={3}
              rounded={"md"}
              bg={"bg.subtle"}
              border={"1px solid"}
              borderColor={"border.subtle"}
            >
              <Heading size={"xs"} mb={1}>
                {"C. Cara Penggunaan di Komponen UI"}
              </Heading>
              <P fontSize={"xs"} color={"fg.muted"} mb={2}>
                {
                  "Panggil nama token langsung pada props Chakra UI. Chakra akan menerjemahkannya ke CSS variable otomatis:"
                }
              </P>
              <CodeBlock
                code={`import { Box } from "@/design-system/components/layout/box/box";
import { P } from "@/design-system/components/typography/p/p";

export const CustomCard = () => {
  return (
    // Menggunakan semantic token bg.customCard dan border.subtle
    <Box bg={"bg.customCard"} border={"1px solid"} borderColor={"border.subtle"} p={4} rounded={"md"}>
      <P color={"colorPalette.fg"}>{"Teks otomatis beradaptasi dengan warna aktif"}</P>
    </Box>
  );
};`}
                language={"tsx"}
              />
            </Box>
          </VStack>
        </VStack>
      </Box>
    </VStack>
  );
};
