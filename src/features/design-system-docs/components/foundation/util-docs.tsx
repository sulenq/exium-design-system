// src/features/design-system-docs/components/foundation/util-docs.tsx

import { Box } from "@/design-system/components/layout/box/box";
import { VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { Heading } from "@/design-system/components/typography/heading/heading";
import { P } from "@/design-system/components/typography/p/p";
import { CodeBlock } from "@/features/design-system-docs/components/code-block";
import { FoundationHeader } from "@/features/design-system-docs/components/foundation/foundation-header";
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
    <VStack gap={"lg"}>
      <FoundationHeader
        title={spec.title}
        badge={"Util"}
        description={spec.description}
      />

      <Box
        rounded={"lg"}
        border={"1px solid"}
        borderColor={"border.subtle"}
        bg={"bg.body"}
      >
        <VStack gap={"sm"} p={"md"}>
          <Heading size={"sm"} fontWeight={"bold"}>
            {"Usage Example"}
          </Heading>
          <CodeBlock code={spec.usage} language={"tsx"} />
        </VStack>
      </Box>

      <Box
        rounded={"lg"}
        border={"1px solid"}
        borderColor={"border.subtle"}
        bg={"bg.body"}
      >
        <VStack gap={"xs"} p={"md"}>
          <Heading size={"sm"} fontWeight={"bold"}>
            {"Architectural Note"}
          </Heading>
          <P fontSize={"sm"} color={"fg.muted"}>
            {spec.note}
          </P>
        </VStack>
      </Box>
    </VStack>
  );
};
