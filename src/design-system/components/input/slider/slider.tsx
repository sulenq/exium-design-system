// src/design-system/components/input/slider/slider.tsx

import type { SliderProps } from "@/design-system/components/input/slider/slider.type";
import { HStack } from "@/design-system/components/layout/flex-box/flex-box";
import { useBounceDrag } from "@/design-system/hooks/use-bounce-drag";
import { useThemeStore } from "@/design-system/stores/theme-store";
import { tintLight } from "@/shared/utils/style/color";
import { Slider as ChakraSlider } from "@chakra-ui/react";
import { forwardRef } from "react";

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  function Slider(props, ref) {
    // Props
    const { label, showValue = false, marks, onHold, ...restProps } = props;

    // Hooks
    const {
      ref: controlRef,
      isHolding,
      handlePointerDown,
      handlePointerUp,
    } = useBounceDrag<HTMLDivElement>({
      directions: {
        left: true,
        right: true,
        up: false,
        down: false,
      },
      maxOffset: 4,
      damping: 0.04,
      onHold,
    });

    // Stores
    const { theme } = useThemeStore();

    // Derived Values
    const hasMarks = marks && marks.length > 0;

    return (
      <ChakraSlider.Root
        ref={ref}
        colorPalette={theme.colorPalette}
        css={{ "--slider-thumb-size": "12px" }}
        {...restProps}
      >
        {(label || showValue) && (
          <HStack justify={"space-between"} mb={1}>
            {label && <ChakraSlider.Label>{label}</ChakraSlider.Label>}

            {showValue && <ChakraSlider.ValueText />}
          </HStack>
        )}

        <ChakraSlider.Control
          ref={controlRef}
          data-active={isHolding ? "" : undefined}
          cursor={"pointer"}
          transform={"translate(var(--bounce-x, 0px), var(--bounce-y, 0px))"}
          transition={
            isHolding
              ? "transform 80ms ease-out"
              : "transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)"
          }
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <ChakraSlider.Track
            bg={"bg.muted"}
            shadow={"none"}
            outline={isHolding ? "4px solid" : ""}
            outlineColor={"bg.muted !important"}
            transition={"all 0.18s cubic-bezier(0.4, 0, 0.2, 1)"}
            h={
              isHolding
                ? "calc(var(--slider-track-size) + 4px)"
                : "calc(var(--slider-track-size) + 2px)"
            }
            _vertical={{
              w: isHolding
                ? "calc(var(--slider-track-size) + 4px)"
                : "calc(var(--slider-track-size) + 2px)",
              h: "100%",
            }}
          >
            <ChakraSlider.Range
              bg={`linear-gradient(to right, {colors.colorPalette.solid}, ${tintLight("colorPalette.solid", 20)})`}
              _vertical={{
                bg: `linear-gradient(to top, {colors.colorPalette.solid}, ${tintLight("colorPalette.solid", 20)})`,
              }}
              rounded={theme.radii.component}
            />
          </ChakraSlider.Track>

          <ChakraSlider.Thumb
            index={0}
            ml={"-2px"}
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
