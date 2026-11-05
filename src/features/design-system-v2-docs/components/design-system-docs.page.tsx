// src/features/design-system-v2-docs/components/design-system-docs.page.tsx

import { Box } from "@/design-system/components/layout/ui/box";
import { HStack, VStack } from "@/design-system/components/layout/ui/flex-box";
import { P } from "@/design-system/components/typography/ui/p";
import { ComponentPlayground } from "@/features/design-system-v2-docs/components/component-playground";
import { DsDocsSidebar } from "@/features/design-system-v2-docs/components/ds-docs-sidebar";
import { COMPONENTS_V2_REGISTRY } from "@/features/design-system-v2-docs/config/components-registry";
import { useSearch } from "@tanstack/react-router";

export const DesignSystemV2DocsPage = () => {
  const search = useSearch({ from: "/design-system-v2/ui" });
  const activeComponentId = search.component ?? "overview";
  const activeSpec = COMPONENTS_V2_REGISTRY[activeComponentId];

  return (
    <HStack align={"stretch"} h={"100vh"} w={"100vw"} overflow={"hidden"}>
      {/* Sidebar */}
      <DsDocsSidebar activeId={activeComponentId} />

      {/* Main Content */}
      <Box flex={1} h={"full"} overflowY={"auto"} p={8}>
        {activeComponentId === "overview" && (
          <VStack align={"start"} gap={4}>
            <P fontSize={"3xl"} fontWeight={"bold"}>
              {"Exium Design System v2"}
            </P>
            <P color={"fg.muted"}>
              {"Dokumentasi migrasi Chakra UI v3 ke shadcn/ui + Tailwind CSS v4."}
            </P>
          </VStack>
        )}

        {activeComponentId !== "overview" && activeSpec && (
          <ComponentPlayground spec={activeSpec} />
        )}

        {activeComponentId !== "overview" && !activeSpec && (
          <P color={"fg.muted"}>{"Komponen belum terdaftar di registry v2."}</P>
        )}
      </Box>
    </HStack>
  );
};

