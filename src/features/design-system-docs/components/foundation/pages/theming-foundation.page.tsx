// src/features/design-system-docs/components/foundation/pages/theming-foundation.page.tsx

import { Box } from "@/design-system/components/layout/box/box";
import { VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { Heading } from "@/design-system/components/typography/heading/heading";
import { CodeBlock } from "@/features/design-system-docs/components/code-block";
import { FoundationHeader } from "@/features/design-system-docs/components/foundation/foundation-header";

export const ThemingFoundationPage = () => {
  return (
    <VStack gap={"lg"}>
      <FoundationHeader
        title={"Theming & Dark Mode"}
        description={"Zustand-based theme store integrating color palettes, container radii, and dark/light color mode."}
      />

      <Box
        rounded={"lg"}
        border={"1px solid"}
        borderColor={"border.subtle"}
        bg={"bg.body"}
      >
        <VStack gap={"sm"} p={"md"}>
          <Heading size={"sm"} fontWeight={"bold"}>
            {"Theme Store Usage"}
          </Heading>
          <CodeBlock
            code={`import { useThemeStore } from "@/design-system/stores/theme-store";

const { theme, setColorPalette, setRadiusPreset } = useThemeStore();
// theme.colorPalette ('blue', 'orange', etc.)
// theme.radiusPreset ('md', 'lg', etc.)`}
            language={"tsx"}
          />
        </VStack>
      </Box>
    </VStack>
  );
};
