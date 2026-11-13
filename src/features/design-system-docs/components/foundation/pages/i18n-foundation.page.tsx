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
            {"Using Translation (t)"}
          </Heading>
          <CodeBlock
            code={`import { t, getLocale, setLocale } from "@/shared/libs/i18n";

// Render message with active locale (dot or underscore notation supported)
<P>{t.common_save()}</P>
<P>{t["common.save"]()}</P>

// Check or switch locale dynamically
const current = getLocale();
setLocale("en");`}
            language={"tsx"}
          />
        </VStack>
      </Box>
    </VStack>
  );
};

