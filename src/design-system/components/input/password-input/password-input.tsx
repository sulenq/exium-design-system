// src/design-system/components/input/password-input/password-input.tsx

import { IconButton } from "@/design-system/components/button/button/button";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { useFieldContextValue } from "@/design-system/components/input/context/field.context";
import {
  floatingLabelWrapperCss,
  getFloatingPlaceholder,
} from "@/design-system/components/input/floating-label/floating-label.css";
import { FloatingLabel } from "@/design-system/components/input/floating-label/floating-label";
import type {
  PasswordInputProps,
  PasswordStrengthMeterProps,
} from "@/design-system/components/input/password-input/password-input.type";
import { Box } from "@/design-system/components/layout/box/box";
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { toast } from "@/design-system/components/toast";
import { useThemeStore } from "@/design-system/stores/theme-store";
import { t } from "@/shared/libs/i18n";
import { mergeRefs } from "@/shared/utils/react/merge-refs";
import {
  Input as ChakraInput,
  InputGroup as ChakraInputGroup,
  useControllableState,
  type ButtonProps,
} from "@chakra-ui/react";
import { passwordStrength, type Options } from "check-password-strength";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import {
  forwardRef,
  useCallback,
  useRef,
  useState,
  type ChangeEvent,
} from "react";

const DEFAULT_STRENGTH_OPTIONS: Options<string> = [
  { id: 1, value: "weak", minDiversity: 0, minLength: 0 },
  { id: 2, value: "medium", minDiversity: 2, minLength: 6 },
  { id: 3, value: "strong", minDiversity: 3, minLength: 8 },
  { id: 4, value: "very-strong", minDiversity: 4, minLength: 10 },
];

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(props, ref) {
    // Props
    const {
      rootProps: _rootProps,
      defaultVisible,
      visible: visibleProp,
      onVisibleChange,
      visibilityIcon = {
        on: <AppIcon icon={EyeIcon} weight={"fill"} />,
        off: <AppIcon icon={EyeSlashIcon} weight={"fill"} />,
      },
      withPasswordStrength = false,
      strengthOptions = DEFAULT_STRENGTH_OPTIONS,
      onChange,
      startElement,
      ...restProps
    } = props;

    // Refs
    const inputRef = useRef<HTMLInputElement>(null);

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
    const isFloatingVariant = fieldContext?.variant === "floating";
    const floatingLabel = isFloatingVariant ? fieldContext?.label : undefined;
    const isOptional = fieldContext?.optional;

    // Stores
    const { theme } = useThemeStore();

    // States
    const [visible, setVisible] = useControllableState({
      value: visibleProp,
      defaultValue: defaultVisible || false,
      onChange: onVisibleChange,
    });
    const [strength, setStrength] = useState(0);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
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
      onChange?.(e);

      if (!withPasswordStrength) return;

      const value = e.currentTarget.value;

      if (!value) {
        setStrength(0);
        return;
      }

      const result = passwordStrength(value, strengthOptions);
      setStrength(result.id);
    }

    const endElementNode = (
      <VisibilityTrigger
        disabled={restProps.disabled}
        variant={"plain"}
        color={"fg.muted"}
        _hover={{ color: "fg" }}
        onPointerDown={(e) => {
          if (restProps.disabled) return;
          if (e.button !== 0) return;
          e.preventDefault();
          setVisible(!visible);
        }}
      >
        {visible ? visibilityIcon.off : visibilityIcon.on}
      </VisibilityTrigger>
    );

    const inputCore = (
      <ChakraInput
        ref={mergeRefs(ref, inputRef)}
        type={visible ? "text" : "password"}
        colorPalette={"neutral"}
        fontSize={"md"}
        rounded={theme.radii.component}
        placeholder={"••••••••"}
        {...restProps}
        {...(isFloatingVariant && {
          placeholder: getFloatingPlaceholder(restProps.placeholder),
          h: "60px",
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
            if (
              selectionLen === 0 &&
              currentVal.length >= restProps.maxLength
            ) {
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
        onChange={handleChange}
      />
    );

    const inputGroupElement = (
      <ChakraInputGroup
        startElement={
          startElement ? (
            <Box ref={startElementRef} display={"inline-flex"}>
              {startElement}
            </Box>
          ) : undefined
        }
        endElement={endElementNode}
        endElementProps={{ zIndex: 2 }}
        w={"full"}
      >
        {inputCore}
      </ChakraInputGroup>
    );

    const labelLeft = startElement
      ? `${(startElementWidth || 20) + 20}px`
      : "12px";

    return (
      <VStack gap={2} w={restProps?.w || "full"}>
        {isFloatingVariant && floatingLabel ? (
          <Box css={floatingLabelWrapperCss} w={"full"}>
            <FloatingLabel
              label={floatingLabel}
              optional={isOptional}
              left={labelLeft}
              right={"44px"}
            />
            {inputGroupElement}
          </Box>
        ) : (
          inputGroupElement
        )}

        {withPasswordStrength && (
          <PasswordStrengthMeter
            max={strengthOptions.length}
            value={strength}
          />
        )}
      </VStack>
    );
  },
);

const VisibilityTrigger = forwardRef<HTMLButtonElement, ButtonProps>(
  function VisibilityTrigger(props, ref) {
    return (
      <IconButton
        tabIndex={-1}
        ref={ref}
        size={"xs"}
        variant={"ghost"}
        aspectRatio={"square"}
        mr={-2}
        position={"relative"}
        zIndex={10}
        aria-label={t["common.toggle_password_visibility"]()}
        {...props}
      />
    );
  },
);

export const PasswordStrengthMeter = forwardRef<
  HTMLDivElement,
  PasswordStrengthMeterProps
>(function PasswordStrengthMeter(props, ref) {
  const { max = 4, value, ...rest } = props;

  const percent = (value / max) * 100;
  const { colorPalette } = getColorPalette(percent);

  return (
    <VStack align={"end"} gap={1} ref={ref} {...rest}>
      <HStack gap={1} w={"full"} {...rest}>
        {Array.from({ length: max }).map((_, index) => (
          <Box
            key={index}
            height={1}
            flex={1}
            rounded={"sm"}
            data-selected={index < value ? "" : undefined}
            layerStyle={"fill.subtle"}
            colorPalette={"neutral"}
            _selected={{
              colorPalette,
              layerStyle: "fill.solid",
            }}
          />
        ))}
      </HStack>
      {/* {label && <HStack textStyle="xs">{label}</HStack>} */}
    </VStack>
  );
});

function getColorPalette(percent: number) {
  switch (true) {
    case percent < 33:
      return { label: "Low", colorPalette: "red" };
    case percent < 66:
      return { label: "Medium", colorPalette: "orange" };
    default:
      return { label: "High", colorPalette: "green" };
  }
}
