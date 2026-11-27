// src/design-system/components/input/checkbox/checkbox.tsx

import type {
  CheckboxContextValue,
  CheckboxControlProps,
  CheckboxProps,
  CheckboxRootProps,
} from "@/design-system/components/input/checkbox/checkbox.type";
import { useThemeStore } from "@/design-system/stores/theme-store";
import { Checkbox as ChakraCheckbox } from "@chakra-ui/react";
import { createContext, useContext } from "react";

const CheckboxContext = createContext<CheckboxContextValue>({
  isSubtleVariant: true,
});

export const CheckboxRoot = (props: CheckboxRootProps) => {
  // Props
  const { children, variant = "subtle", ...restProps } = props;

  // Stores
  const { theme } = useThemeStore();

  // Derived Values
  const isSubtleVariant = variant === "subtle";

  return (
    <CheckboxContext.Provider value={{ isSubtleVariant }}>
      <ChakraCheckbox.Root
        colorPalette={theme.colorPalette}
        variant={variant}
        {...restProps}
      >
        <ChakraCheckbox.HiddenInput />
        {children}
      </ChakraCheckbox.Root>
    </CheckboxContext.Provider>
  );
};

export const CheckboxControl = (props: CheckboxControlProps) => {
  // Contexts
  const { isSubtleVariant } = useContext(CheckboxContext);

  // Stores
  const { theme } = useThemeStore();

  return (
    <ChakraCheckbox.Control
      cursor={"pointer"}
      bg={isSubtleVariant ? "bg.muted" : undefined}
      _checked={
        isSubtleVariant
          ? {
              bg: `${theme.colorPalette}.solid`,
            }
          : undefined
      }
      {...props}
    />
  );
};

const CheckboxBase = (props: CheckboxProps) => {
  // Props
  const { children, controlProps, ...restProps } = props;

  return (
    <CheckboxRoot {...restProps}>
      <CheckboxControl {...controlProps} />
      {children}
    </CheckboxRoot>
  );
};

export const Checkbox = Object.assign(CheckboxBase, {
  Root: CheckboxRoot,
  Control: CheckboxControl,
});
