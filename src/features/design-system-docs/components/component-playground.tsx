// src/features/design-system-docs/components/component-playground.tsx

import { Box } from "@/design-system/components/layout/ui/box";
import { HStack, VStack } from "@/design-system/components/layout/ui/flex-box";
import { Badge } from "@/design-system/components/typography/ui/badge";
import { P } from "@/design-system/components/typography/ui/p";
import { ComponentPlaygroundContainer } from "@/features/design-system-docs/components/component-playground-container";
import type { ComponentDocSpec } from "@/features/design-system-docs/types/ds-docs-spec.type";
import { useState } from "react";

export const ComponentPlayground = ({ spec }: { spec: ComponentDocSpec }) => {
  // States
  const [propsState, setPropsState] = useState<Record<string, unknown>>(
    spec.defaultProps,
  );

  // Handlers
  const handlePropChange = (name: string, value: unknown) => {
    setPropsState((prev) => ({ ...prev, [name]: value }));
  };

  const ComponentToRender = spec.component;

  return (
    <VStack align={"stretch"} gap={6} w={"full"}>
      {/* Overview Header */}
      <VStack align={"start"} gap={2}>
        <HStack gap={2}>
          <P fontSize={"2xl"} fontWeight={"bold"}>
            {spec.title}
          </P>
          <Badge variant={"subtle"}>{spec.category}</Badge>
        </HStack>
        <P color={"fg.muted"}>{spec.description}</P>
      </VStack>

      {/* Import Path Card */}
      <Box
        p={3}
        rounded={"md"}
        bg={"bg.subtle"}
        border={"1px solid"}
        borderColor={"border.subtle"}
      >
        <P fontSize={"xs"} color={"fg.subtle"} mb={1}>
          {"IMPORT PATH"}
        </P>
        <P fontFamily={"mono"} fontSize={"sm"} color={"colorPalette.fg"}>
          {spec.importPath}
        </P>
      </Box>

      {/* Interactive Playground Sandbox */}
      <ComponentPlaygroundContainer>
        {spec.renderPlayground ? (
          spec.renderPlayground(propsState, handlePropChange)
        ) : (
          <ComponentToRender {...propsState} />
        )}
      </ComponentPlaygroundContainer>
    </VStack>
  );
};
