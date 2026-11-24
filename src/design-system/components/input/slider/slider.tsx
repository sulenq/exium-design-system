// src/design-system/components/input/slider/slider.tsx

import type { SliderProps } from "@/design-system/components/input/slider/slider.type";
import { HStack } from "@/design-system/components/layout/flex-box/flex-box";
import { useThemeStore } from "@/design-system/stores/theme-store";
import { Slider as ChakraSlider } from "@chakra-ui/react";
import { forwardRef, useCallback, useEffect, useState } from "react";
import type { PointerEvent } from "react";

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  function Slider(props, ref) {
    // Props
    const { label, showValue = false, marks, onHold, ...restProps } = props;

    // States
    const [isHolding, setIsHolding] = useState(false);

    // Stores
    const { theme } = useThemeStore();

    // Derived Values
    const hasMarks = marks && marks.length > 0;

    // Handlers
    const handlePointerDown = useCallback(
      (e: PointerEvent<HTMLDivElement>) => {
        if (e.button !== 0) return;
        setIsHolding(true);
        onHold?.(true);
      },
      [onHold],
    );

    const handlePointerUp = useCallback(() => {
      setIsHolding(false);
      onHold?.(false);
    }, [onHold]);

    // Effects
    useEffect(() => {
      if (!isHolding) return;

      const handleGlobalPointerUp = () => {
        setIsHolding(false);
        onHold?.(false);
      };

      window.addEventListener("pointerup", handleGlobalPointerUp);
      window.addEventListener("pointercancel", handleGlobalPointerUp);

      return () => {
        window.removeEventListener("pointerup", handleGlobalPointerUp);
        window.removeEventListener("pointercancel", handleGlobalPointerUp);
      };
    }, [isHolding, onHold]);

    return (
      <ChakraSlider.Root
        ref={ref}
        colorPalette={theme.colorPalette}
        {...restProps}
      >
        {(label || showValue) && (
          <HStack justify={"space-between"} mb={1}>
            {label && <ChakraSlider.Label>{label}</ChakraSlider.Label>}

            {showValue && <ChakraSlider.ValueText />}
          </HStack>
        )}

        <ChakraSlider.Control
          data-active={isHolding ? "" : undefined}
          cursor={"pointer"}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <ChakraSlider.Track
            outline={isHolding ? "4px solid" : ""}
            outlineColor={"bg.muted !important"}
            transition={"all 0.18s cubic-bezier(0.4, 0, 0.2, 1)"}
            h={isHolding ? "calc(var(--slider-track-size) + 2px)" : ""}
            _vertical={{
              w: isHolding ? "calc(var(--slider-track-size) + 2px)" : "",
              h: "100%",
            }}
          >
            <ChakraSlider.Range />
          </ChakraSlider.Track>

          <ChakraSlider.Thumb
            index={0}
            transform={
              isHolding
                ? "scale(1.2) translateX(calc(var(--slider-thumb-size) / -2 + 2px)) !important"
                : ""
            }
            transition={"transform 150ms"}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          />
        </ChakraSlider.Control>

        {hasMarks && (
          <ChakraSlider.MarkerGroup>
            {marks.map((mark) => {
              const val = typeof mark === "number" ? mark : mark.value;
              const labelNode =
                typeof mark === "number" ? String(mark) : mark.label;
              return (
                <ChakraSlider.Marker key={val} value={val}>
                  {labelNode}
                </ChakraSlider.Marker>
              );
            })}
          </ChakraSlider.MarkerGroup>
        )}
      </ChakraSlider.Root>
    );
  },
);
