// src/features/design-system-docs/components/foundation/util-docs.tsx

import { Box } from "@/design-system/components/layout/box/box";
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { Badge } from "@/design-system/components/typography/badge/badge";
import { P } from "@/design-system/components/typography/p/p";
import { CodeBlock } from "@/features/design-system-docs/components/code-block";
import type { DsNavKey } from "@/features/design-system-docs/types/ds-docs-navs.type";

const UTILS_SPECS_MAP: Record<
  string,
  { title: string; description: string; usage: string; note: string }
> = {
  formatters: {
    title: "Formatters",
    description: "Standardized text, numeric, date, and byte formatting utilities.",
    usage: `import { formatByte } from "@/shared/utils/formatter/byte.formatter";
import { formatDate } from "@/shared/utils/formatter/date.formatter";
import { formatNumber } from "@/shared/utils/formatter/number.formatter";

formatByte(1048576); // "1 MB"
formatNumber(1500000); // "1,500,000"`,
    note: "Consistent formatting across all tables, badges, and user displays.",
  },
  a11y_helpers: {
    title: "A11y Helpers",
    description: "Accessibility helper utilities and DOM focus management.",
    usage: `import { dispatchNativeInputEvent } from "@/shared/utils/dom/dispatch-native-input-event";

dispatchNativeInputEvent(inputElement, "updated");`,
    note: "Dispatches native events triggering React Hook Form watchers seamlessly.",
  },
  common_zod_schemas: {
    title: "Common Zod Schemas",
    description: "Reusable validation schemas with Zod for auth, settings, and spatial forms.",
    usage: `import { z } from "zod";

export const emailSchema = z.string().email("Invalid email address");
export const passwordSchema = z.string().min(8, "Minimum 8 characters");`,
    note: "All forms in Exium must be validated via Zod + React Hook Form.",
  },
};

export const UtilDocs = ({ navKey }: { navKey: DsNavKey }) => {
  const spec = UTILS_SPECS_MAP[navKey] ?? {
    title: navKey,
    description: "Utility documentation reference.",
    usage: `// Utility: ${navKey}`,
    note: "Standard utility.",
  };

  return (
    <VStack align={"stretch"} gap={6} w={"full"}>
      <VStack align={"start"} gap={2}>
        <HStack gap={2} align={"center"}>
          <P fontSize={"3xl"} fontWeight={"bold"}>
            {spec.title}
          </P>
          <Badge variant={"subtle"}>{"Util"}</Badge>
        </HStack>
        <P color={"fg.muted"}>{spec.description}</P>
      </VStack>

      <Box p={4} rounded={"lg"} border={"1px solid"} borderColor={"border.subtle"} bg={"bg.body"}>
        <P fontWeight={"bold"} mb={2}>
          {"Usage Example"}
        </P>
        <CodeBlock code={spec.usage} language={"tsx"} />
      </Box>

      <Box p={4} rounded={"lg"} border={"1px solid"} borderColor={"border.subtle"} bg={"bg.body"}>
        <P fontWeight={"bold"} mb={1}>
          {"Architectural Note"}
        </P>
        <P fontSize={"sm"} color={"fg.muted"}>
          {spec.note}
        </P>
      </Box>
    </VStack>
  );
};

