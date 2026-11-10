// src/features/design-system-docs/components/foundation/pages/design-tokens-foundation.page.tsx

import { Box } from "@/design-system/components/layout/box/box";
import { VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { Heading } from "@/design-system/components/typography/heading/heading";
import { P } from "@/design-system/components/typography/p/p";
import { CodeBlock } from "@/features/design-system-docs/components/code-block";
import { FoundationHeader } from "@/features/design-system-docs/components/foundation/foundation-header";

export const DesignTokensFoundationPage = () => {
  return (
    <VStack gap={"lg"}>
      <FoundationHeader
        title={"Design Tokens"}
        description={"Semantic tokens unifying colors, spacing, radii, shadows, and z-indices across Chakra UI v3."}
      />

      <Box
        rounded={"lg"}
        border={"1px solid"}
        borderColor={"border.subtle"}
        bg={"bg.body"}
      >
        <VStack gap={"sm"} p={"md"}>
          <Heading size={"sm"} fontWeight={"bold"}>
            {"Token Architecture"}
          </Heading>
          <P fontSize={"sm"} color={"fg.muted"}>
            {"Tokens are configured via Chakra's defineConfig and createSystem in @/design-system/chakra/chakra-system.ts. They resolve to native CSS variables dynamically adaptive to light and dark modes."}
          </P>
          <CodeBlock
            code={`import { Box, HStack } from "@/design-system/components/layout/box/box";

// Using semantic tokens in Chakra props
<Box bg={"bg.body"} color={"fg.default"} border={"1px solid"} borderColor={"border.subtle"}>
  <P color={"colorPalette.fg"}>{"Active Accent Content"}</P>
</Box>`}
            language={"tsx"}
          />
        </VStack>
      </Box>
    </VStack>
  );
};
