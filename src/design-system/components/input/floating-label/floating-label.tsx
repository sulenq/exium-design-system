// src/design-system/components/input/floating-label/floating-label.tsx

import type { FloatingLabelProps } from "@/design-system/components/input/floating-label/floating-label.type";
import { Box } from "@/design-system/components/layout/box/box";
import { HStack } from "@/design-system/components/layout/flex-box/flex-box";
import { Badge } from "@/design-system/components/typography/badge/badge";
import { Field as ChakraField } from "@chakra-ui/react";
import { t } from "@/shared/libs/i18n";

export const FloatingLabel = (props: FloatingLabelProps) => {
  // Props
  const { label, optional, left = "12px", right = "12px" } = props;

  return (
    <Box
      data-part={"floating-label"}
      position={"absolute"}
      left={left}
      right={right}
      top={"3px"}
      zIndex={1}
      pointerEvents={"none"}
    >
      <HStack align={"center"} gap={2}>
        {/* A real <label> linked to the field's input, so the input has an accessible name */}
        <ChakraField.Label
          data-part={"floating-label-text"}
          display={"block"}
          m={0}
          minW={0}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          whiteSpace={"nowrap"}
          fontWeight={"medium"}
          color={"fg.subtle"}
        >
          {label}
        </ChakraField.Label>

        {optional && (
          <Badge
            size={"xs"}
            fontSize={"2xs"}
            colorPalette={"gray"}
            color={"fg.subtle"}
          >
            {t["common.optional"]()}
          </Badge>
        )}
      </HStack>
    </Box>
  );
};

