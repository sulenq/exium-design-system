// src/design-system/components/typography/ui/heading.tsx

import { Tooltip } from "@/design-system/components/overlay/tooltip/tooltip";
import type { HeadingProps } from "@/design-system/components/typography/heading/heading.type";
import { Heading as ChakraHeading } from "@chakra-ui/react";
import { forwardRef } from "react";

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (props, ref) => {
    // Props
    const { children, lineClamp, minW = 0, minWidth, ...restProps } = props;

    const resolvedMinW = minWidth ?? minW;

    const headingElement = (
      <ChakraHeading
        ref={ref}
        fontSize={"lg"}
        fontWeight={"semibold"}
        lineHeight={1.2}
        lineClamp={lineClamp}
        wordBreak={
          lineClamp
            ? Number(lineClamp) > 1
              ? "break-word"
              : "break-all"
            : undefined
        }
        minW={lineClamp ? resolvedMinW : undefined}
        {...restProps}
      >
        {children}
      </ChakraHeading>
    );

    if (lineClamp !== undefined && lineClamp !== null) {
      return (
        <Tooltip
          content={children}
          w={restProps.w ?? restProps.width}
          minW={resolvedMinW}
        >
          {headingElement}
        </Tooltip>
      );
    }

    return headingElement;
  },
);
