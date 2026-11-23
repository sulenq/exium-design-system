// src/design-system/components/button/ui/button.tsx

"use client";

import type {
  ButtonProps,
  IconButtonProps,
} from "@/design-system/components/button/button/button.type";
import { Tooltip } from "@/design-system/components/overlay/tooltip/tooltip";
import { useThemeStore } from "@/design-system/stores/theme-store";
import { isTextTruncated } from "@/shared/utils/dom/text-truncation.utils";
import type { ButtonProps as ChakraButtonProps } from "@chakra-ui/react";
import {
  Button as ChakraButton,
  IconButton as ChakraIconButton,
  Span,
} from "@chakra-ui/react";
import { Children, forwardRef, useMemo, useRef, useState } from "react";

const AutoTruncatedButtonTooltip = ({
  text,
  children,
}: {
  text: string;
  children: (ref: React.RefObject<HTMLSpanElement | null>) => React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const textRef = useRef<HTMLSpanElement | null>(null);

  return (
    <Tooltip
      content={text}
      open={open}
      onOpenChange={({ open: nextOpen }) =>
        setOpen(nextOpen && isTextTruncated(textRef.current))
      }
    >
      {children(textRef)}
    </Tooltip>
  );
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    // Props
    const {
      primary,
      variant,
      // clicky = true,
      colorPalette,
      lineClamp,
      children,
      minW = 0,
      maxW = "full",
      tooltip,
      ...restProps
    } = props;

    // Stores
    const { theme } = useThemeStore();

    // Derived Values — Combine contiguous text nodes into a single clamped Span
    const formattedChildren = useMemo(() => {
      const childArray = Children.toArray(children);
      const result: React.ReactNode[] = [];
      let currentTextGroup: (string | number)[] = [];

      const flushTextGroup = () => {
        if (currentTextGroup.length > 0) {
          const combinedText = currentTextGroup.join("");
          const hasLineClamp = lineClamp !== undefined && lineClamp !== null;
          const clampVal = hasLineClamp ? Number(lineClamp) : undefined;

          const renderTextNode = (spanRef?: React.Ref<HTMLSpanElement>) => (
            <Span
              ref={spanRef}
              minW={0}
              maxW={"full"}
              overflow={hasLineClamp ? "hidden" : undefined}
              py={"1px"}
              display={"inline-block"}
              fontSize={restProps?.fontSize}
              lineHeight={"normal"}
              lineClamp={clampVal !== undefined && clampVal > 0 ? clampVal : undefined}
              wordBreak={
                hasLineClamp
                  ? clampVal && clampVal > 1
                    ? "break-word"
                    : "break-all"
                  : undefined
              }
            >
              {combinedText}
            </Span>
          );

          if (
            hasLineClamp &&
            !tooltip &&
            typeof combinedText === "string" &&
            combinedText.trim()
          ) {
            result.push(
              <AutoTruncatedButtonTooltip
                key={`button-tooltip-${result.length}`}
                text={combinedText}
              >
                {(textSpanRef) => renderTextNode(textSpanRef)}
              </AutoTruncatedButtonTooltip>,
            );
          } else {
            result.push(
              <span key={`button-text-group-${result.length}`}>
                {renderTextNode()}
              </span>,
            );
          }
          currentTextGroup = [];
        }
      };

      childArray.forEach((child) => {
        if (typeof child === "string" || typeof child === "number") {
          currentTextGroup.push(child);
        } else {
          flushTextGroup();
          result.push(child);
        }
      });

      flushTextGroup();

      return result;
    }, [children, lineClamp, restProps?.fontSize, tooltip]);

    const buttonNode = (
      <ChakraButton
        ref={ref}
        variant={
          (variant ||
            (primary ? "solid" : "ghost")) as ChakraButtonProps["variant"]
        }
        colorPalette={
          colorPalette ?? (primary ? theme.colorPalette : "neutral")
        }
        gap={2}
        rounded={theme.radii.component}
        fontSize={"md"}
        fontWeight={"normal"}
        userSelect={"none"}
        minW={minW}
        maxW={maxW}
        overflow={"hidden"}
        // _active={{
        //   transform: clicky ? "translateY(2px)" : "none",
        // }}
        {...restProps}
      >
        {formattedChildren}
      </ChakraButton>
    );

    if (tooltip) {
      return (
        <Tooltip content={tooltip} w={maxW}>
          {restProps.disabled ? (
            <Span display={"inline-block"} w={maxW} cursor={"not-allowed"}>
              {buttonNode}
            </Span>
          ) : (
            buttonNode
          )}
        </Tooltip>
      );
    }

    return buttonNode;
  },
);

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function Iconbutton(props, ref) {
    // Props
    const { primary, variant, colorPalette, tooltip, ...restProps } = props;

    // Stores
    const { theme } = useThemeStore();

    const buttonNode = (
      <ChakraIconButton
        ref={ref}
        variant={
          (variant ||
            (primary ? "solid" : "ghost")) as ChakraButtonProps["variant"]
        }
        colorPalette={
          colorPalette ?? (primary ? theme.colorPalette : "neutral")
        }
        rounded={theme.radii.component}
        fontWeight={"normal"}
        userSelect={"none"}
        {...restProps}
      />
    );

    if (tooltip) {
      return (
        <Tooltip content={tooltip}>
          {restProps.disabled ? (
            <Span display={"inline-block"} cursor={"not-allowed"}>
              {buttonNode}
            </Span>
          ) : (
            buttonNode
          )}
        </Tooltip>
      );
    }

    return buttonNode;
  },
);
