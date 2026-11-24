// src/design-system/components/button/button/button.tsx

"use client";

import type {
  ButtonProps,
  IconButtonProps,
} from "@/design-system/components/button/button/button.type";
import { Tooltip } from "@/design-system/components/overlay/tooltip/tooltip";
import { useBounceDrag } from "@/design-system/hooks/use-bounce-drag";
import { useMergedRefs } from "@/design-system/hooks/use-merge-refs";
import { useThemeStore } from "@/design-system/stores/theme-store";
import { isTextTruncated } from "@/shared/utils/dom/text-truncation.utils";
import { tintLight } from "@/shared/utils/style/color";
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
      bouncy = true,
      colorPalette,
      lineClamp,
      children,
      minW = 0,
      maxW = "full",
      tooltip,
      onPointerDown,
      onPointerUp,
      onPointerCancel,
      ...restProps
    } = props;

    // Hooks
    const {
      ref: bounceRef,
      isHolding,
      handlePointerDown: onBouncePointerDown,
      handlePointerUp: onBouncePointerUp,
    } = useBounceDrag<HTMLButtonElement>({
      maxOffset: 5,
      damping: 0.05,
    });

    const mergedRef = useMergedRefs({
      refs: bouncy ? [ref, bounceRef] : [ref],
    });

    // Stores
    const { theme } = useThemeStore();

    // Derived Values — Combine contiguous text nodes into a single clamped Span
    const resolvedVariant = variant || (primary ? "solid" : "ghost");
    const isSolid = resolvedVariant === "solid";

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
              lineClamp={
                clampVal !== undefined && clampVal > 0 ? clampVal : undefined
              }
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
        ref={mergedRef}
        variant={resolvedVariant as ChakraButtonProps["variant"]}
        colorPalette={
          colorPalette ?? (primary ? theme.colorPalette : "neutral")
        }
        bg={
          isSolid
            ? `linear-gradient(20deg, {colors.colorPalette.solid}, ${tintLight("colorPalette.solid", 20)})`
            : undefined
        }
        gap={2}
        rounded={theme.radii.component}
        fontSize={"md"}
        fontWeight={"normal"}
        userSelect={"none"}
        minW={minW}
        maxW={maxW}
        overflow={"hidden"}
        transform={
          bouncy
            ? "translate(var(--bounce-x, 0px), var(--bounce-y, 0px))"
            : undefined
        }
        transition={
          bouncy
            ? isHolding
              ? "transform 80ms ease-out"
              : "transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)"
            : undefined
        }
        onPointerDown={(e) => {
          if (bouncy) onBouncePointerDown(e);
          onPointerDown?.(e);
        }}
        onPointerUp={(e) => {
          if (bouncy) onBouncePointerUp();
          onPointerUp?.(e);
        }}
        onPointerCancel={(e) => {
          if (bouncy) onBouncePointerUp();
          onPointerCancel?.(e);
        }}
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
    const {
      primary,
      variant,
      bouncy = true,
      colorPalette,
      tooltip,
      onPointerDown,
      onPointerUp,
      onPointerCancel,
      ...restProps
    } = props;

    // Hooks
    const {
      ref: bounceRef,
      isHolding,
      handlePointerDown: onBouncePointerDown,
      handlePointerUp: onBouncePointerUp,
    } = useBounceDrag<HTMLButtonElement>({
      maxOffset: 5,
      damping: 0.05,
    });

    const mergedRef = useMergedRefs({
      refs: bouncy ? [ref, bounceRef] : [ref],
    });

    // Stores
    const { theme } = useThemeStore();

    // Derived Values
    const resolvedVariant = variant || (primary ? "solid" : "ghost");
    const isSolid = resolvedVariant === "solid";

    const buttonNode = (
      <ChakraIconButton
        ref={mergedRef}
        variant={resolvedVariant as ChakraButtonProps["variant"]}
        colorPalette={
          colorPalette ?? (primary ? theme.colorPalette : "neutral")
        }
        bg={
          isSolid
            ? `linear-gradient(35deg, {colors.colorPalette.solid}, ${tintLight("colorPalette.solid", 15)})`
            : undefined
        }
        rounded={theme.radii.component}
        fontWeight={"normal"}
        userSelect={"none"}
        transform={
          bouncy
            ? "translate(var(--bounce-x, 0px), var(--bounce-y, 0px))"
            : undefined
        }
        transition={
          bouncy
            ? isHolding
              ? "transform 80ms ease-out"
              : "transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)"
            : undefined
        }
        onPointerDown={(e) => {
          if (bouncy) onBouncePointerDown(e);
          onPointerDown?.(e);
        }}
        onPointerUp={(e) => {
          if (bouncy) onBouncePointerUp();
          onPointerUp?.(e);
        }}
        onPointerCancel={(e) => {
          if (bouncy) onBouncePointerUp();
          onPointerCancel?.(e);
        }}
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
