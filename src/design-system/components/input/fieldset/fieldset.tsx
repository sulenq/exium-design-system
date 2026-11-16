// src/design-system/components/input/ui/fieldset.tsx

import { forwardRef } from "react";
import { Fieldset as ChakraFieldset } from "@chakra-ui/react";
import type { FieldsetProps } from "@/design-system/components/input/fieldset/fieldset.type";
import { VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { useThemeStore } from "@/design-system/stores/theme-store";

export const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
  function Fieldset(props, ref) {
    // Props
    const { children, legend, containeredContent, ...restProps } = props;

    // Stores
    const { theme } = useThemeStore();

    return (
      <ChakraFieldset.Root ref={ref} w={"full"} minW={0} {...restProps}>
        <VStack gap={3} w={"full"}>
          {legend && (
            <ChakraFieldset.Legend fontWeight={"semibold"}>
              {legend}
            </ChakraFieldset.Legend>
          )}

          <ChakraFieldset.Content w={"full"} minW={0}>
            {containeredContent && (
              <VStack
                w={"full"}
                p={4}
                border={"1px solid"}
                borderColor={"border"}
                rounded={theme.radii.container}
              >
                {children}
              </VStack>
            )}

            {!containeredContent && children}
          </ChakraFieldset.Content>
        </VStack>
      </ChakraFieldset.Root>
    );
  },
);

Fieldset.displayName = "Fieldset";
