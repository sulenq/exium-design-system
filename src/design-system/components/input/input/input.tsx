// src/design-system/components/input/input/input.tsx

import { useFieldContextValue } from "@/design-system/components/input/context/field.context";
import {
  floatingLabelWrapperCss,
  getFloatingPlaceholder,
} from "@/design-system/styles/floating-label.css";
import { FloatingLabel } from "@/design-system/components/input/floating-label/floating-label";
import type { InputProps } from "@/design-system/components/input/input/input.type";
import { Box } from "@/design-system/components/layout/box/box";
import { toast } from "@/design-system/components/toast";
import { useThemeStore } from "@/design-system/stores/theme-store";
import { t } from "@/shared/libs/i18n";
import { mergeRefs } from "@/shared/utils/react/merge-refs";
import {
  Input as ChakraInput,
  InputGroup as ChakraInputGroup,
} from "@chakra-ui/react";
import { forwardRef, useCallback, useRef, useState } from "react";

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  // Props
  const {
    startElement,
    endElement,
    floatingLabel: floatingLabelProp = true,
    ...restProps
  } = props;

  // Refs
  const internalInputRef = useRef<HTMLInputElement>(null);

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

  const inputCore = (
    <ChakraInput
      ref={mergeRefs(internalInputRef, ref)}
      colorPalette={"neutral"}
      fontSize={"md"}
      rounded={theme.radii.component}
      {...restProps}
      {...(isFloatingVariant && {
        placeholder: getFloatingPlaceholder(restProps.placeholder),
        h: "48px",
        pt: floatingLabel ? "22px" : "0px",
        pb: floatingLabel ? "4px" : "0px",
      })}
      onKeyDown={(e) => {
        if (
          restProps.maxLength !== undefined &&
          !e.ctrlKey &&
          !e.metaKey &&
          !e.altKey &&
          e.key.length === 1
        ) {
          const currentVal = e.currentTarget.value;
          const selectionLen =
            (e.currentTarget.selectionEnd ?? 0) -
            (e.currentTarget.selectionStart ?? 0);
          if (selectionLen === 0 && currentVal.length >= restProps.maxLength) {
            toast.warning(
              t["input.max_length_warning"]?.({
                max: restProps.maxLength,
              }) ??
                `Karakter telah mencapai batas maksimal (${restProps.maxLength} karakter).`,
              { id: "input-max-length-warning" },
            );
          }
        }
        restProps.onKeyDown?.(e);
      }}
      onPaste={(e) => {
        if (restProps.maxLength !== undefined) {
          const pastedText = e.clipboardData?.getData("text") ?? "";
          const currentVal = e.currentTarget.value;
          const selectionLen =
            (e.currentTarget.selectionEnd ?? 0) -
            (e.currentTarget.selectionStart ?? 0);
          const projectedLen =
            currentVal.length - selectionLen + pastedText.length;
          if (projectedLen > restProps.maxLength) {
            toast.warning(
              t["input.paste_max_length_warning"]?.({
                max: restProps.maxLength,
              }) ??
                `Teks melebihi batas maksimal (${restProps.maxLength} karakter) dan otomatis dipotong.`,
              { id: "input-max-length-warning" },
            );
          }
        }
        restProps.onPaste?.(e);
      }}
      onChange={(e) => {
        if (
          restProps.maxLength !== undefined &&
          e.currentTarget.value.length >= restProps.maxLength
        ) {
          toast.warning(
            t["input.max_length_warning"]?.({
              max: restProps.maxLength,
            }) ??
              `Karakter telah mencapai batas maksimal (${restProps.maxLength} karakter).`,
            { id: "input-max-length-warning" },
          );
        }
        restProps.onChange?.(e);
      }}
    />
  );

  const inputElement =
    startElement || endElement ? (
      <ChakraInputGroup
        startElement={
          startElement ? (
            <Box ref={startElementRef} display={"inline-flex"}>
              {startElement}
            </Box>
          ) : undefined
        }
        endElement={endElement}
        endElementProps={{ zIndex: 2 }}
        w={"full"}
      >
        {inputCore}
      </ChakraInputGroup>
    ) : (
      inputCore
    );

  if (isFloatingVariant && floatingLabel) {
    const labelLeft = startElement
      ? `${(startElementWidth || 20) + 20}px`
      : "12px";
    const labelRight = endElement ? "44px" : "12px";

    return (
      <Box css={floatingLabelWrapperCss} w={"full"}>
        <FloatingLabel
          label={floatingLabel}
          optional={isOptional}
          left={labelLeft}
          right={labelRight}
        />
        {inputElement}
      </Box>
    );
  }

  return inputElement;
});
