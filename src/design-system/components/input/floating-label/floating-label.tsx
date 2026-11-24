// src/design-system/components/input/floating-label/floating-label.tsx

import type { FloatingLabelProps } from "@/design-system/components/input/floating-label/floating-label.type";
import { Box } from "@/design-system/components/layout/box/box";
import { HStack } from "@/design-system/components/layout/flex-box/flex-box";
import { Badge } from "@/design-system/components/typography/badge/badge";
import { P } from "@/design-system/components/typography/p/p";
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
      top={"7px"}
      zIndex={1}
      pointerEvents={"none"}
    >
      <HStack align={"center"} gap={2}>
        <P
          data-part={"floating-label-text"}
          lineClamp={1}
          fontWeight={"medium"}
          color={"fg.subtle"}
        >
          {label}
        </P>

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

