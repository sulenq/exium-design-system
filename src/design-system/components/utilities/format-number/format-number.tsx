// src/design-system/components/utilities/format-number/format-number.tsx

import type { FormatNumberProps } from "@/design-system/components/utilities/format-number/format-number.type";
import { FormatNumber as ChakraFormatNumber } from "@chakra-ui/react";

export const FormatNumber = (props: FormatNumberProps) => {
  // Props
  const { ...restProps } = props;

  return <ChakraFormatNumber {...restProps} />;
};
