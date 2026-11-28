// src/design-system/components/input/textarea/textarea.tsx

import { useFieldContextValue } from "@/design-system/components/input/context/field.context";
import {
  floatingLabelWrapperCss,
  getFloatingPlaceholder,
} from "@/design-system/styles/floating-label.css";
import { FloatingLabel } from "@/design-system/components/input/floating-label/floating-label";
import type { TextareaProps } from "@/design-system/components/input/textarea/textarea.type";
import { Box } from "@/design-system/components/layout/box/box";
import { toast } from "@/design-system/components/toast";
import { useThemeStore } from "@/design-system/stores/theme-store";
import { t } from "@/shared/libs/i18n";
import { mergeRefs } from "@/shared/utils/react/merge-refs";
import { Textarea as ChakraTextarea } from "@chakra-ui/react";
import * as React from "react";
import { useCallback, useRef, useState } from "react";

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(props, ref) {
    // Props
    const {
      startElement,
      floatingLabel: floatingLabelProp = true,
      ...restProps
    } = props;

    // Refs
    const internalTextareaRef = useRef<HTMLTextAreaElement>(null);

    // States
    const [startElementWidth, setStartElementWidth] = useState<number>(0);

    const startElementRef = useCallback((node: HTMLDivElement | null) => {
      if (node) {
        setStartElementWidth(node.offsetWidth);
      } else {
        setStartElementWidth(0);
      }
    }, []);

    // Contexts
    const fieldContext = useFieldContextValue();
    const isFloatingVariant =
      floatingLabelProp && fieldContext?.variant === "floating";
    const floatingLabel = isFloatingVariant ? fieldContext?.label : undefined;
    const isOptional = fieldContext?.optional;

    // Stores
    const { theme } = useThemeStore();

    const textareaElement = (
      <ChakraTextarea
        className={"noScrollbar"}
        ref={mergeRefs(internalTextareaRef, ref)}
        rounded={theme.radii.component}
        fontSize={"md"}
        minH={"135px"}
        {...restProps}
        {...(isFloatingVariant && {
          placeholder: getFloatingPlaceholder(restProps.placeholder),
          h: "48px",
          pt: floatingLabel ? "28px" : "8px",
          pb: "md",
        })}
        onKeyDown={(e) => {
          if (
            props.maxLength !== undefined &&
            !e.ctrlKey &&
            !e.metaKey &&
            !e.altKey &&
            e.key.length === 1
          ) {
            const currentVal = e.currentTarget.value;
            const selectionLen =
              (e.currentTarget.selectionEnd ?? 0) -
              (e.currentTarget.selectionStart ?? 0);
            if (selectionLen === 0 && currentVal.length >= props.maxLength) {
              toast.warning(
                t["input.max_length_warning"]?.({
                  max: props.maxLength,
                }) ??
                  `Karakter telah mencapai batas maksimal (${props.maxLength} karakter).`,
                { id: "input-max-length-warning" },
              );
            }
          }
          props.onKeyDown?.(e);
        }}
        onPaste={(e) => {
          if (props.maxLength !== undefined) {
            const pastedText = e.clipboardData?.getData("text") ?? "";
            const currentVal = e.currentTarget.value;
            const selectionLen =
              (e.currentTarget.selectionEnd ?? 0) -
              (e.currentTarget.selectionStart ?? 0);
            const projectedLen =
              currentVal.length - selectionLen + pastedText.length;
            if (projectedLen > props.maxLength) {
              toast.warning(
                t["input.paste_max_length_warning"]?.({
                  max: props.maxLength,
                }) ??
                  `Teks melebihi batas maksimal (${props.maxLength} karakter) dan otomatis dipotong.`,
                { id: "input-max-length-warning" },
              );
            }
          }
          props.onPaste?.(e);
        }}
        onChange={(e) => {
          if (
            props.maxLength !== undefined &&
            e.currentTarget.value.length >= props.maxLength
          ) {
            toast.warning(
              t["input.max_length_warning"]?.({
                max: props.maxLength,
              }) ??
                `Karakter telah mencapai batas maksimal (${props.maxLength} karakter).`,
              { id: "input-max-length-warning" },
            );
          }
          props.onChange?.(e);
        }}
        pb={4}
        {...(startElement && {
          ps: `${(startElementWidth || 20) + 20}px`,
        })}
      />
    );

    const textareaWrapper = (
      <Box position={"relative"} w={"full"}>
        {startElement && (
          <Box
            ref={startElementRef}
            position={"absolute"}
            left={"12px"}
            top={isFloatingVariant ? "28px" : "12px"}
            zIndex={2}
            display={"inline-flex"}
            alignItems={"center"}
            pointerEvents={"none"}
          >
            {startElement}
          </Box>
        )}
        {textareaElement}
      </Box>
    );

    if (isFloatingVariant && floatingLabel) {
      const labelLeft = startElement
        ? `${(startElementWidth || 20) + 20}px`
        : "12px";

      return (
        <Box css={floatingLabelWrapperCss} w={"full"}>
          <Box
            data-part={"floating-textarea-gradient"}
            position={"absolute"}
            top={"1px"}
            left={"1px"}
            right={"1px"}
            h={"40px"}
            zIndex={1}
            pointerEvents={"none"}
            roundedTop={theme.radii.component}
            bg={
              "linear-gradient(to bottom, {colors.bg.body} 20%,transparent 100%)"
            }
          />

          <FloatingLabel
            label={floatingLabel}
            optional={isOptional}
            left={labelLeft}
            right={"12px"}
          />

          {textareaWrapper}
        </Box>
      );
    }

    return textareaWrapper;
  },
);
