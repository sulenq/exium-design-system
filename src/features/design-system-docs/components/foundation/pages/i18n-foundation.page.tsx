// src/features/design-system-docs/components/foundation/pages/i18n-foundation.page.tsx

import { Box } from "@/design-system/components/layout/box/box";
import { VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { Heading } from "@/design-system/components/typography/heading/heading";
import { CodeBlock } from "@/features/design-system-docs/components/code-block";
import { FoundationHeader } from "@/features/design-system-docs/components/foundation/foundation-header";

export const I18nFoundationPage = () => {
  return (
    <VStack gap={"lg"}>
      <FoundationHeader
        title={"Internationalization (i18n)"}
        description={"First-class multi-language support powered by Paraglide JS with Indonesian (id) and English (en)."}
      />

      <Box
        rounded={"lg"}
        border={"1px solid"}
        borderColor={"border.subtle"}
        bg={"bg.body"}
      >
        <VStack gap={"sm"} p={"md"}>
          <Heading size={"sm"} fontWeight={"bold"}>
            {"Using Paraglide Messages"}
          </Heading>
          <CodeBlock
            code={`import * as m from "@/paraglide/messages";
import { getLocale, setLocale } from "@/paraglide/runtime";

// Render message with active locale
<P>{m.common_save()}</P>

// Switch locale dynamically
setLocale("en");`}
            language={"tsx"}
          />
        </VStack>
      </Box>
    </VStack>
  );
};
