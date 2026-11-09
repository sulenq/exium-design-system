// src/design-system/components/typography/ui/span.tsx

import { Span as ChakraSpan } from "@chakra-ui/react";
import { forwardRef } from "react";
import type { SpanProps } from "@/design-system/components/typography/span/span.type";

export const Span = forwardRef<HTMLSpanElement, SpanProps>((props, ref) => {
  return <ChakraSpan ref={ref} {...props} />;
});
