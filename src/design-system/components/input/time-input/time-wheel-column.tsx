// src/design-system/components/input/time-input/time-wheel-column.tsx

import type { TimeWheelColumnProps } from "@/design-system/components/input/time-input/time-input.type";
import {
  getNearestOptionIndex,
  getWheelOptions,
  padTimeUnit,
} from "@/design-system/components/input/utils/time.utils";
import { Box } from "@/design-system/components/layout/box/box";
import { P } from "@/design-system/components/typography/p/p";
import { useThemeStore } from "@/design-system/stores/theme-store";
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  type KeyboardEvent,
} from "react";

const ITEM_HEIGHT_PX = 40;
const VISIBLE_ITEMS = 5;
const WHEEL_HEIGHT_PX = ITEM_HEIGHT_PX * VISIBLE_ITEMS;
const EDGE_PADDING_PX = (WHEEL_HEIGHT_PX - ITEM_HEIGHT_PX) / 2;
const SCROLL_SETTLE_MS = 90;
const TYPE_BUFFER_MS = 900;
const PAGE_JUMP = 5;

export const TimeWheelColumn = (props: TimeWheelColumnProps) => {
  // Props
  const { label, value, count, step = 1, onValueChange } = props;

  // Stores
  const { theme } = useThemeStore();

  // Refs
  const scrollRef = useRef<HTMLDivElement>(null);
  const settleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typeBufferRef = useRef<{ digits: string; at: number }>({
    digits: "",
    at: 0,
  });
  const hasPositionedRef = useRef<boolean>(false);

  // Derived Values
  const options = useMemo(() => getWheelOptions(count, step), [count, step]);
  const selectedIndex = getNearestOptionIndex(options, value);
  const lastIndex = options.length - 1;

  // Effects: keep the scroll position on the selected option. The first
  // placement is instant; later changes (keyboard, click) animate.
  useLayoutEffect(() => {
    const node = scrollRef.current;
    if (!node) return;

    const targetTop = selectedIndex * ITEM_HEIGHT_PX;
    const currentIndex = Math.round(node.scrollTop / ITEM_HEIGHT_PX);
    if (hasPositionedRef.current && currentIndex === selectedIndex) return;

    const behavior = hasPositionedRef.current ? "smooth" : "auto";
    hasPositionedRef.current = true;

    if (typeof node.scrollTo === "function") {
      node.scrollTo({ top: targetTop, behavior });
      return;
    }
    node.scrollTop = targetTop;
  }, [selectedIndex]);

  useEffect(() => {
    return () => {
      if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
    };
  }, []);

  // Handlers
  const selectIndex = (index: number) => {
    const clamped = Math.min(Math.max(index, 0), lastIndex);
    const nextValue = options[clamped];
    if (nextValue === undefined || nextValue === value) return;
    onValueChange(nextValue);
  };

  const handleScroll = () => {
    // Commit once the scroll has settled on a snap point
    if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
    settleTimerRef.current = setTimeout(() => {
      const node = scrollRef.current;
      if (!node) return;
      selectIndex(Math.round(node.scrollTop / ITEM_HEIGHT_PX));
    }, SCROLL_SETTLE_MS);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      selectIndex(selectedIndex + 1);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      selectIndex(selectedIndex - 1);
      return;
    }
    if (e.key === "PageDown") {
      e.preventDefault();
      selectIndex(selectedIndex + PAGE_JUMP);
      return;
    }
    if (e.key === "PageUp") {
      e.preventDefault();
      selectIndex(selectedIndex - PAGE_JUMP);
      return;
    }
    if (e.key === "Home") {
      e.preventDefault();
      selectIndex(0);
      return;
    }
    if (e.key === "End") {
      e.preventDefault();
      selectIndex(lastIndex);
      return;
    }

    // Typing digits jumps to the nearest option: "4" then "5" selects 45
    if (!/^\d$/.test(e.key)) return;
    e.preventDefault();

    const now = Date.now();
    const buffer = typeBufferRef.current;
    const isContinuing =
      now - buffer.at < TYPE_BUFFER_MS && buffer.digits.length === 1;
    const digits = isContinuing ? `${buffer.digits}${e.key}` : e.key;
    typeBufferRef.current = { digits, at: now };

    const typedValue = Number(digits);
    const boundedValue = typedValue < count ? typedValue : Number(e.key);
    selectIndex(getNearestOptionIndex(options, boundedValue));
  };

  return (
    <Box
      position={"relative"}
      flex={1}
      minW={"64px"}
      h={`${WHEEL_HEIGHT_PX}px`}
    >
      {/* Selection band behind the centered option */}
      <Box
        position={"absolute"}
        left={0}
        right={0}
        top={`${EDGE_PADDING_PX}px`}
        h={`${ITEM_HEIGHT_PX}px`}
        bg={"bg.muted"}
        rounded={theme.radii.component}
        pointerEvents={"none"}
      />

      <Box
        ref={scrollRef}
        role={"spinbutton"}
        tabIndex={0}
        aria-label={label}
        aria-valuemin={options[0]}
        aria-valuemax={options[lastIndex]}
        aria-valuenow={value}
        aria-valuetext={padTimeUnit(value)}
        position={"relative"}
        h={"full"}
        overflowY={"auto"}
        py={`${EDGE_PADDING_PX}px`}
        rounded={theme.radii.component}
        css={{
          scrollSnapType: "y mandatory",
          scrollbarWidth: "none",
          overscrollBehavior: "contain",
          "&::-webkit-scrollbar": { display: "none" },
        }}
        _focusVisible={{
          outline: "2px solid",
          outlineColor: "border.emphasized",
          outlineOffset: "2px",
        }}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
      >
        {options.map((option, index) => {
          const isSelected = index === selectedIndex;
          const color = isSelected ? "fg" : "fg.subtle";
          const fontWeight = isSelected ? "semibold" : "normal";

          return (
            <Box
              key={option}
              h={`${ITEM_HEIGHT_PX}px`}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              cursor={"pointer"}
              userSelect={"none"}
              css={{ scrollSnapAlign: "center" }}
              data-selected={isSelected ? "" : undefined}
              onClick={() => selectIndex(index)}
            >
              <P
                fontSize={"xl"}
                fontWeight={fontWeight}
                color={color}
                fontVariantNumeric={"tabular-nums"}
              >
                {padTimeUnit(option)}
              </P>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
