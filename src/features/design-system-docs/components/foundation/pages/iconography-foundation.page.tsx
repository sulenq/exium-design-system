// src/features/design-system-docs/components/foundation/pages/iconography-foundation.page.tsx

import { Box } from "@/design-system/components/layout/box/box";
import { VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { Heading } from "@/design-system/components/typography/heading/heading";
import { P } from "@/design-system/components/typography/p/p";
import { CodeBlock } from "@/features/design-system-docs/components/code-block";
import { FoundationHeader } from "@/features/design-system-docs/components/foundation/foundation-header";

export const IconographyFoundationPage = () => {
  return (
    <VStack gap={"lg"}>
      <FoundationHeader
        title={"Iconography"}
        description={"Unified icon rendering using Lucide (primary), Tabler (fallback), and Phosphor with weight support."}
      />

      <Box
        rounded={"lg"}
        border={"1px solid"}
        borderColor={"border.subtle"}
        bg={"bg.body"}
      >
        <VStack gap={"sm"} p={"md"}>
          <Heading size={"sm"} fontWeight={"bold"}>
            {"AppIcon Component Standard"}
          </Heading>
          <P fontSize={"sm"} color={"fg.muted"}>
            {"Always render icons via AppIcon. Never use raw SVG elements or icons without wrapping."}
          </P>
          <CodeBlock
            code={`import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { Sparkle } from "@phosphor-icons/react";
import { CheckIcon } from "lucide-react";

// Lucide icon
<AppIcon icon={CheckIcon} size={"md"} color={"green.fg"} />

// Phosphor icon with weight
<AppIcon icon={Sparkle} size={"md"} weight={"duotone"} color={"blue.fg"} />`}
            language={"tsx"}
          />
        </VStack>
      </Box>
    </VStack>
  );
};

