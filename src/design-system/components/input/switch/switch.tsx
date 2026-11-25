// src/design-system/components/input/switch/switch.tsx

import type { SwitchProps } from "@/design-system/components/input/switch/switch.type";
import { Tooltip } from "@/design-system/components/overlay/tooltip/tooltip";
import { useThemeStore } from "@/design-system/stores/theme-store";
import { Switch as ChakraSwitch } from "@chakra-ui/react";
import { forwardRef, useEffect, useState } from "react";

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  function Switch(props, ref) {
    // Props
    const {
      children,
      controlProps,
      thumbProps,
      tooltip,
      disabled,
      onPointerDown,
      ...restProps
    } = props;

    // Stores
    const { theme } = useThemeStore();

    // States
    const [isHolding, setIsHolding] = useState(false);

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

    const switchNode = (
      <ChakraSwitch.Root
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
        <ChakraSwitch.Control cursor={"pointer"} {...controlProps}>
          <ChakraSwitch.Thumb
            transition={
              "width 260ms cubic-bezier(0.34, 1.56, 0.64, 1), margin-left 260ms cubic-bezier(0.34, 1.56, 0.64, 1)"
            }
            w={isHolding ? "60%" : undefined}
            _checked={isHolding ? { ml: "-10%" } : undefined}
            {...thumbProps}
          />
        </ChakraSwitch.Control>
        {children && <ChakraSwitch.Label>{children}</ChakraSwitch.Label>}
      </ChakraSwitch.Root>
    );

    if (tooltip) {
      return <Tooltip content={tooltip}>{switchNode}</Tooltip>;
    }

    return switchNode;
  },
);
