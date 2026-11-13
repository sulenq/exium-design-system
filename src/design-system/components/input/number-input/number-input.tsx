// src/design-system/components/input/ui/number-input.tsx

import { IconButton } from "@/design-system/components/button/button/button";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { useFieldContextValue } from "@/design-system/components/input/context/field.context";
import type {
  NumberInputProps,
  SteppedNumberInputProps,
} from "@/design-system/components/input/number-input/number-input.type";
import { Box } from "@/design-system/components/layout/box/box";
import { HStack } from "@/design-system/components/layout/flex-box/flex-box";
import { Group } from "@/design-system/components/layout/group/group";
import { Badge } from "@/design-system/components/typography/badge/badge";
import { ClampedP } from "@/design-system/components/typography/p/p";
import { VISUALLY_HIDDEN_INPUT_STYLE } from "@/design-system/constants/css-preset";
import { useThemeStore } from "@/design-system/stores/theme-store";
import { dispatchNativeInputEvent } from "@/shared/utils/dom/dispatch-native-input-event";
import { mergeRefs } from "@/shared/utils/react/merge-refs";
import { NumberInput as ChakraNumberInput } from "@chakra-ui/react";
import { MinusIcon, PlusIcon, ChevronUp, ChevronDown } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// `valueAsNumber` is NaN while the input is empty (Number("") === NaN).
function toSyncValue(valueAsNumber: number): string {
  return Number.isNaN(valueAsNumber) ? "" : String(valueAsNumber);
}

// Convert NaN, "NaN", null, or undefined to "" so that Chakra/Ark does not render "NaN" when empty
function normalizeNumberInputValue(val: unknown): string | undefined {
  if (val === undefined) return undefined;
  if (
    val === null ||
    val === "" ||
    val === "NaN" ||
    (typeof val === "number" && Number.isNaN(val))
  ) {
    return "";
  }
  return String(val);
}

function checkHasValue(val: unknown): boolean {
  return (
    val !== undefined &&
    val !== null &&
    val !== "" &&
    val !== "NaN" &&
    !Number.isNaN(val)
  );
}

export const NumberInput = (props: NumberInputProps) => {
  // Props
  const {
    placeholder,
    inputProps,
    startElement,
    endElement,
    endElementPlacement = "before-stepper",
    stepper = true,
    stepperVariant = "default",
    value,
    defaultValue,
    ...restProps
  } = props;

  // Contexts
  const fieldContext = useFieldContextValue();
  const isFloatingVariant = fieldContext?.variant === "floating";
  const floatingLabel = isFloatingVariant ? fieldContext?.label : undefined;
  const isOptional = fieldContext?.optional;

  // Stores
  const { theme } = useThemeStore();

  const size = restProps.size ?? "md";

  // Adaptive stepper sizing based on input size
  const stepperConfig = {
    "2xs": { width: 18, inset: 2, gap: 0, iconSize: 10, peExtra: 26 },
    xs: { width: 20, inset: 2, gap: 0, iconSize: 11, peExtra: 28 },
    sm: { width: 24, inset: 3, gap: 0.5, iconSize: 12, peExtra: 34 },
    md: { width: 28, inset: 4, gap: 1, iconSize: 14, peExtra: 40 },
    lg: { width: 32, inset: 4, gap: 1, iconSize: 16, peExtra: 46 },
    xl: { width: 36, inset: 5, gap: 1.5, iconSize: 18, peExtra: 52 },
    "2xl": { width: 40, inset: 6, gap: 2, iconSize: 20, peExtra: 58 },
  }[size as "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"] ?? {
    width: 28,
    inset: 4,
    gap: 1,
    iconSize: 14,
    peExtra: 40,
  };

  // Refs
  // Dedicated node for RHF — decoupled from the visible input, so whatever
  // Ark renders there (raw digits or a formatOptions-formatted string like
  // "€45.00") never touches what register()/getValues() reads. Must be
  // type="text" (visually hidden), NOT type="hidden" — React doesn't wire up
  // its synthetic event/value-tracking system the same way for type="hidden".
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const visibleInputRef = useRef<HTMLInputElement>(null);

  // States
  const [startElementWidth, setStartElementWidth] = useState<number>(0);
  const [endElementWidth, setEndElementWidth] = useState<number>(0);

  const startElementRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      setStartElementWidth(node.offsetWidth);
    } else {
      setStartElementWidth(0);
    }
  }, []);

  const endElementRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      setEndElementWidth(node.offsetWidth);
    } else {
      setEndElementWidth(0);
    }
  }, []);

  const normalizedValue = normalizeNumberInputValue(value);
  const normalizedDefaultValue = normalizeNumberInputValue(defaultValue);

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [hasValueState, setHasValueState] = useState<boolean>(
    checkHasValue(normalizedValue) ||
      checkHasValue(normalizedDefaultValue) ||
      checkHasValue(inputProps?.value) ||
      checkHasValue(inputProps?.defaultValue),
  );
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Effects
  useEffect(() => {
    if (visibleInputRef.current) {
      const domHasValue = Boolean(visibleInputRef.current.value);
      if (domHasValue !== hasValueState) {
        setHasValueState(domHasValue);
      }
    }
    setIsMounted(true);
  }, [hasValueState, normalizedValue, normalizedDefaultValue]);

  // Derived Values
  const hasValue =
    hasValueState ||
    checkHasValue(normalizedValue) ||
    checkHasValue(normalizedDefaultValue) ||
    checkHasValue(inputProps?.value) ||
    checkHasValue(inputProps?.defaultValue) ||
    Boolean(fieldContext?.hasValue);
  const isLabelFloating = isFocused || hasValue;

  const numberInputCore = (
    <ChakraNumberInput.Root
      {...restProps}
      {...(normalizedValue !== undefined && { value: normalizedValue })}
      {...(normalizedDefaultValue !== undefined && {
        defaultValue: normalizedDefaultValue,
      })}
      onValueChange={(details) => {
        setHasValueState(details.value !== "");
        restProps.onValueChange?.({
          value: details.valueAsNumber,
          formattedValue: details.value,
        });
        if (hiddenInputRef.current) {
          dispatchNativeInputEvent(
            hiddenInputRef.current,
            toSyncValue(details.valueAsNumber),
          );
        }
      }}
    >
      <input
        type={"text"}
        style={VISUALLY_HIDDEN_INPUT_STYLE}
        tabIndex={-1}
        aria-hidden
        defaultValue={
          inputProps?.defaultValue ??
          (normalizedDefaultValue !== undefined
            ? normalizedDefaultValue
            : undefined)
        }
        {...inputProps}
        ref={mergeRefs(hiddenInputRef, inputProps?.ref)}
      />
      <Box position={"relative"} w={"full"}>
        {startElement && (
          <Box
            ref={startElementRef}
            position={"absolute"}
            left={"12px"}
            top={"50%"}
            transform={"translateY(-50%)"}
            zIndex={2}
            display={"inline-flex"}
            alignItems={"center"}
            pointerEvents={"none"}
          >
            {startElement}
          </Box>
        )}
        <ChakraNumberInput.Input
          ref={visibleInputRef}
          placeholder={placeholder}
          fontSize={"md"}
          rounded={theme.radii.component}
          {...(startElement && {
            ps: `${(startElementWidth || 20) + 20}px`,
          })}
          {...(endElement
            ? {
                pe: `${(endElementWidth || 0) + (stepper ? stepperConfig.peExtra : 12)}px`,
              }
            : stepper
              ? { pe: `${stepperConfig.peExtra}px` }
              : {})}
          onFocusCapture={() => {
            setIsFocused(true);
          }}
          onBlurCapture={(e) => {
            setIsFocused(false);
            setHasValueState(Boolean(e.currentTarget.value));
          }}
          {...(isFloatingVariant && {
            h: "60px",
            pt: floatingLabel ? "22px" : "0px",
            pb: floatingLabel ? "4px" : "0px",
            _placeholder: {
              color: "transparent",
            },
          })}
        />

        {endElement && (
          <Box
            ref={endElementRef}
            position={"absolute"}
            right={
              endElementPlacement === "after-stepper"
                ? "0px"
                : stepper
                  ? `${stepperConfig.width + stepperConfig.inset + 1}px`
                  : "1px"
            }
            top={"50%"}
            transform={"translateY(-50%)"}
            h={"full"}
            zIndex={2}
            display={"inline-flex"}
            alignItems={"center"}
            pointerEvents={"auto"}
          >
            {endElement}
          </Box>
        )}
      </Box>

      {stepper && (
        <ChakraNumberInput.Control
          outline={"none !important"}
          border={"none !important"}
          borderStartWidth={"0 !important"}
          divideY={"0 !important"}
          position={"absolute"}
          top={`${stepperConfig.inset}px`}
          bottom={`${stepperConfig.inset}px`}
          insetEnd={
            endElementPlacement === "after-stepper" && endElementWidth
              ? `${endElementWidth + stepperConfig.inset}px`
              : `${stepperConfig.inset}px`
          }
          width={`${stepperConfig.width}px`}
          height={`calc(100% - ${stepperConfig.inset * 2}px)`}
          margin={"0 !important"}
          gap={stepperConfig.gap}
          zIndex={1}
        >
          <ChakraNumberInput.IncrementTrigger
            aria-label={"Increase"}
            tabIndex={-1}
            border={"none !important"}
            borderBottomWidth={"0 !important"}
            outline={"none !important"}
            boxShadow={"none !important"}
            bg={"transparent"}
            color={"fg.muted"}
            rounded={"sm"}
            _hover={{ bg: "bg.muted" }}
            _active={{ bg: "bg.emphasized" }}
            _disabled={{ opacity: "0.5", bg: "transparent" }}
          >
            {stepperVariant === "borderless" ? (
              <ChevronUp size={stepperConfig.iconSize} />
            ) : undefined}
          </ChakraNumberInput.IncrementTrigger>

          <ChakraNumberInput.DecrementTrigger
            aria-label={"Decrease"}
            tabIndex={-1}
            border={"none !important"}
            borderTopWidth={"0 !important"}
            outline={"none !important"}
            boxShadow={"none !important"}
            bg={"transparent"}
            color={"fg.muted"}
            rounded={"sm"}
            _hover={{ bg: "bg.muted" }}
            _active={{ bg: "bg.emphasized" }}
            _disabled={{ opacity: "0.5", bg: "transparent" }}
          >
            {stepperVariant === "borderless" ? (
              <ChevronDown size={stepperConfig.iconSize} />
            ) : undefined}
          </ChakraNumberInput.DecrementTrigger>
        </ChakraNumberInput.Control>
      )}
    </ChakraNumberInput.Root>
  );

  if (isFloatingVariant && floatingLabel) {
    const labelLeft = startElement
      ? `${(startElementWidth || 20) + 20}px`
      : "12px";

    return (
      <Box position={"relative"} w={restProps.w || "full"}>
        <Box
          position={"absolute"}
          left={labelLeft}
          top={"7px"}
          zIndex={1}
          pointerEvents={"none"}
          transform={isLabelFloating ? "translateY(0)" : "translateY(12px)"}
          transition={
            isMounted
              ? "transform 0.18s cubic-bezier(0.4, 0, 0.2, 1), font-size 0.18s cubic-bezier(0.4, 0, 0.2, 1), color 0.18s ease"
              : "none"
          }
        >
          <HStack align={"center"} gap={2}>
            <ClampedP
              fontSize={isLabelFloating ? "xs" : "md"}
              fontWeight={"medium"}
              color={"fg.subtle"}
              transition={
                isMounted
                  ? "font-size 0.18s cubic-bezier(0.4, 0, 0.2, 1)"
                  : "none"
              }
            >
              {floatingLabel}
            </ClampedP>

            {isOptional && (
              <Badge
                size={"xs"}
                fontSize={"2xs"}
                colorPalette={"gray"}
                color={"fg.subtle"}
              >
                Optional
              </Badge>
            )}
          </HStack>
        </Box>

        {numberInputCore}
      </Box>
    );
  }

  return numberInputCore;
};

export const SteppedNumberInput = (props: SteppedNumberInputProps) => {
  // Props
  const {
    placeholder,
    size,
    hiddenInputProps,
    buttonVariant = "outline",
    value,
    defaultValue,
    ...restProps
  } = props;

  // Stores
  const { theme } = useThemeStore();

  // Refs
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const normalizedValue = normalizeNumberInputValue(value);
  const normalizedDefaultValue = normalizeNumberInputValue(defaultValue);

  return (
    <ChakraNumberInput.Root
      size={size}
      w={"min"}
      {...restProps}
      {...(normalizedValue !== undefined && { value: normalizedValue })}
      {...(normalizedDefaultValue !== undefined && {
        defaultValue: normalizedDefaultValue,
      })}
      onValueChange={(details) => {
        restProps.onValueChange?.({
          value: details.valueAsNumber,
          formattedValue: details.value,
        });
        if (hiddenInputRef.current) {
          dispatchNativeInputEvent(
            hiddenInputRef.current,
            toSyncValue(details.valueAsNumber),
          );
        }
      }}
    >
      <input
        type={"text"}
        style={VISUALLY_HIDDEN_INPUT_STYLE}
        tabIndex={-1}
        aria-hidden
        {...hiddenInputProps}
        ref={mergeRefs(hiddenInputRef, hiddenInputProps?.ref)}
      />

      <Group attached align={"center"}>
        <ChakraNumberInput.DecrementTrigger asChild>
          <IconButton flex={0} variant={buttonVariant} size={size}>
            <AppIcon icon={MinusIcon} />
          </IconButton>
        </ChakraNumberInput.DecrementTrigger>

        <ChakraNumberInput.Input
          placeholder={placeholder}
          flex={1}
          minW={"calc(24px + 3ch)"}
          rounded={theme.radii.component}
          textAlign={"center"}
          fontSize={"md"}
        />

        <ChakraNumberInput.IncrementTrigger asChild>
          <IconButton flex={0} variant={buttonVariant} size={size}>
            <AppIcon icon={PlusIcon} />
          </IconButton>
        </ChakraNumberInput.IncrementTrigger>
      </Group>
    </ChakraNumberInput.Root>
  );
};
