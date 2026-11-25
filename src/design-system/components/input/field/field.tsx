// src/design-system/components/input/field/field.tsx

import { FieldContext } from "@/design-system/components/input/context/field.context";
import type { FieldProps } from "@/design-system/components/input/field/field.type";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { HStack } from "@/design-system/components/layout/flex-box/flex-box";
import { Badge } from "@/design-system/components/typography/badge/badge";
import { P } from "@/design-system/components/typography/p/p";
import { Field as ChakraField } from "@chakra-ui/react";
import { LockIcon } from "@phosphor-icons/react";
import {
  Children,
  forwardRef,
  isValidElement,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { t } from "@/shared/libs/i18n";

export const Field = forwardRef<HTMLDivElement, FieldProps>(
  function Field(props, ref) {
    // Props
    const {
      label,
      labelProps,
      children,
      helperText,
      errorText,
      optional,
      locked = false,
      lockedText,
      variant = "floating",
      hasValue: hasValueProp,
      isFloating: isFloatingProp,
      ...restProps
    } = props;

    // Derived Values
    // @deprecated Inspect children props recursively to resolve hasValue - kept only for DurationInput; remove together with it.
    const childHasValue = useMemo(() => {
      let found = false;
      const scan = (nodes: ReactNode) => {
        Children.forEach(nodes, (child) => {
          if (found || !isValidElement(child)) return;
          const childProps = child.props as Record<string, unknown>;
          if (
            (childProps.value !== undefined &&
              childProps.value !== null &&
              childProps.value !== "") ||
            (childProps.defaultValue !== undefined &&
              childProps.defaultValue !== null &&
              childProps.defaultValue !== "") ||
            childProps["data-has-value"] === "true" ||
            childProps.hasValue === true
          ) {
            found = true;
            return;
          }
          if (childProps.children) {
            scan(childProps.children as ReactNode);
          }
        });
      };
      scan(children);
      return found;
    }, [children]);

    // States
    // How many FloatingLabels are rendering this field's label
    const [floatingClaims, setFloatingClaims] = useState(0);

    // Handlers
    const claimFloatingLabel = useCallback(() => {
      setFloatingClaims((count) => count + 1);
      return () => setFloatingClaims((count) => count - 1);
    }, []);

    const resolvedHasValue =
      hasValueProp !== undefined ? hasValueProp : childHasValue;
    const isFloating =
      isFloatingProp !== undefined ? isFloatingProp : resolvedHasValue;
    const staticLabel = label && (
      <ChakraField.Label fontSize={"md"} {...labelProps}>
        <P fontSize={"xs"} fontWeight={"medium"} color={"fg.subtle"}>
          {label}
        </P>

        {optional && (
          <Badge fontSize={"2xs"} colorPalette={"gray"} color={"fg.subtle"}>
            {t["common.optional"]()}
          </Badge>
        )}
      </ChakraField.Label>
    );
    const lockedNotice = locked && (
      <HStack gap={1} color={"fg.muted"}>
        <AppIcon icon={LockIcon} boxSize={3.5} />
        <P fontSize={"xs"}>{lockedText ?? t["common.locked"]()}</P>
      </HStack>
    );

    if (variant === "floating") {
      return (
        <ChakraField.Root
          ref={ref}
          gap={1}
          readOnly={locked || undefined}
          data-locked={locked || undefined}
          {...restProps}
        >
          <FieldContext.Provider
            value={{
              variant,
              isFloating,
              hasValue: resolvedHasValue,
              label,
              optional,
              labelProps,
              claimFloatingLabel,
            }}
          >
            {/* Children that do not float the label (FileInput, Checkbox…) still get one */}
            {floatingClaims === 0 && staticLabel}
            {children}
          </FieldContext.Provider>

          {helperText && (
            <ChakraField.HelperText
              fontSize={"xs"}
              mt={"2px"}
              color={"fg.subtle"}
            >
              {helperText}
            </ChakraField.HelperText>
          )}

          {lockedNotice}

          {errorText && (
            <ChakraField.ErrorText>{errorText}</ChakraField.ErrorText>
          )}
        </ChakraField.Root>
      );
    }

    return (
      <ChakraField.Root
          ref={ref}
          gap={1}
          readOnly={locked || undefined}
          data-locked={locked || undefined}
          {...restProps}
        >
        {staticLabel}

        <FieldContext.Provider
          value={{
            variant,
            isFloating: false,
            hasValue: Boolean(hasValueProp),
          }}
        >
          {children}
        </FieldContext.Provider>

        {helperText && (
          <ChakraField.HelperText fontSize={"xs"} mt={"2px"}>
            {helperText}
          </ChakraField.HelperText>
        )}

        {lockedNotice}

        {errorText && (
          <ChakraField.ErrorText>{errorText}</ChakraField.ErrorText>
        )}
      </ChakraField.Root>
    );
  },
);
