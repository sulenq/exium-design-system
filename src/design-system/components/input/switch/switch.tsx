// src/design-system/components/input/switch/switch.tsx

import type { SwitchProps } from "@/design-system/components/input/switch/switch.type";
import { Circle } from "@/design-system/components/layout/box/box";
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
        <ChakraSwitch.Control
          cursor={"pointer"}
          display={"flex"}
          justifyContent={"flex-start"}
          w={"36px"}
          p={"2px"}
          {...controlProps}
        >
          <Circle
            transition={
              "margin-left 180ms cubic-bezier(0.22, 1, 0.36, 1), width 180ms cubic-bezier(0.22, 1, 0.36, 1)"
            }
            ml={0}
            w={isHolding ? "60%" : "50%"}
            h={"full"}
            // bg={`{colors.colorPalette.contrast}`}
            bg={"fg.inverted"}
            css={{
              "[data-state=checked] &": {
                ml: isHolding ? "40%" : "50%",
              },
            }}
            {...thumbProps}
          />
          {/* <ChakraSwitch.Thumb
            w={isHolding ? "60%" : undefined}
            transform={undefined}
            // transition={"translate 250ms ease, width 140ms"}
            rounded={theme.radii.container}
            _checked={isHolding ? { ml: "-10%" } : undefined}
            {...thumbProps}
          /> */}
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
