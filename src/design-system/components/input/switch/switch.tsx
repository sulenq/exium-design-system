// src/design-system/components/input/switch/switch.tsx

import { tintLight } from "@/shared/utils/style/color";

import type {
  SwitchContextValue,
  SwitchControlProps,
  SwitchProps,
  SwitchRootProps,
  SwitchSizeKey,
} from "@/design-system/components/input/switch/switch.type";
import { Circle } from "@/design-system/components/layout/box/box";
import { Tooltip } from "@/design-system/components/overlay/tooltip/tooltip";
import { useThemeStore } from "@/design-system/stores/theme-store";
import { Switch as ChakraSwitch } from "@chakra-ui/react";
import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useState,
} from "react";

const SWITCH_SIZE_MAP = {
  xs: {
    controlW: "28px",
    controlH: "16px",
    thumbSize: "12px",
    thumbHoldingW: "18px",
    checkedMl: "12px",
    checkedHoldingMl: "6px",
  },
  sm: {
    controlW: "32px",
    controlH: "18px",
    thumbSize: "14px",
    thumbHoldingW: "20px",
    checkedMl: "14px",
    checkedHoldingMl: "8px",
  },
  md: {
    controlW: "38px",
    controlH: "22px",
    thumbSize: "18px",
    thumbHoldingW: "24px",
    checkedMl: "16px",
    checkedHoldingMl: "10px",
  },
  lg: {
    controlW: "46px",
    controlH: "26px",
    thumbSize: "22px",
    thumbHoldingW: "28px",
    checkedMl: "20px",
    checkedHoldingMl: "14px",
  },
} as const;

const SwitchContext = createContext<SwitchContextValue>({
  isHolding: false,
  sizeKey: "md",
});

export const SwitchRoot = forwardRef<HTMLInputElement, SwitchRootProps>(
  function SwitchRoot(props, ref) {
    // Props
    const {
      children,
      size = "md",
      tooltip,
      disabled,
      onPointerDown,
      ...restProps
    } = props;

    // Stores
    const { theme } = useThemeStore();

    // States
    const [isHolding, setIsHolding] = useState(false);

    // Derived Values
    const sizeKey = (
      typeof size === "string" && size in SWITCH_SIZE_MAP ? size : "md"
    ) as SwitchSizeKey;

    // Effects
    useEffect(() => {
      if (!isHolding) return;

      const handleRelease = () => {
        setIsHolding(false);
      };

      window.addEventListener("pointerup", handleRelease);
      window.addEventListener("pointercancel", handleRelease);

      return () => {
        window.removeEventListener("pointerup", handleRelease);
        window.removeEventListener("pointercancel", handleRelease);
      };
    }, [isHolding]);

    const rootNode = (
      <SwitchContext.Provider value={{ isHolding, sizeKey }}>
        <ChakraSwitch.Root
          size={size}
          colorPalette={theme.colorPalette}
          disabled={disabled}
          onPointerDown={(e) => {
            if (!disabled && e.button === 0) {
              setIsHolding(true);
            }
            onPointerDown?.(e);
          }}
          {...restProps}
        >
          <ChakraSwitch.HiddenInput ref={ref} />
          {children}
        </ChakraSwitch.Root>
      </SwitchContext.Provider>
    );

    if (tooltip) {
      return <Tooltip content={tooltip}>{rootNode}</Tooltip>;
    }

    return rootNode;
  },
);

export const SwitchControl = (props: SwitchControlProps) => {
  // Props
  const { thumbProps, ...restProps } = props;

  // Contexts
  const { isHolding, sizeKey } = useContext(SwitchContext);

  // Derived Values
  const sizeSpec = SWITCH_SIZE_MAP[sizeKey];

  return (
    <ChakraSwitch.Control
      cursor={"pointer"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"flex-start"}
      w={sizeSpec.controlW}
      h={sizeSpec.controlH}
      p={"2px"}
      _checked={{
        bg: `linear-gradient(to right, {colors.colorPalette.solid}, ${tintLight("colorPalette.solid", 20)})`,
      }}
      {...restProps}
    >
      <Circle
        transition={
          isHolding
            ? "margin-left 180ms cubic-bezier(0.22, 1, 0.36, 1), width 180ms cubic-bezier(0.22, 1, 0.36, 1)"
            : "margin-left 220ms cubic-bezier(0.34, 1.56, 0.64, 1), width 180ms cubic-bezier(0.22, 1, 0.36, 1)"
        }
        ml={0}
        w={isHolding ? sizeSpec.thumbHoldingW : sizeSpec.thumbSize}
        h={sizeSpec.thumbSize}
        bg={"bg.body"}
        css={{
          "[data-state=checked] &": {
            ml: isHolding ? sizeSpec.checkedHoldingMl : sizeSpec.checkedMl,
          },
        }}
        {...thumbProps}
      />
    </ChakraSwitch.Control>
  );
};

const SwitchBase = forwardRef<HTMLInputElement, SwitchProps>(
  function Switch(props, ref) {
    // Props
    const { children, controlProps, thumbProps, ...restProps } = props;

    return (
      <SwitchRoot ref={ref} {...restProps}>
        <SwitchControl thumbProps={thumbProps} {...controlProps} />
        {children && <ChakraSwitch.Label>{children}</ChakraSwitch.Label>}
      </SwitchRoot>
    );
  },
);

export const Switch = Object.assign(SwitchBase, {
  Root: SwitchRoot,
  Control: SwitchControl,
});
