// src/design-system/components/input/currency-input/currency-input.tsx

"use client";

import type { CurrencyInputProps } from "@/design-system/components/input/currency-input/currency-input.type";
import {
  clampValue,
  formatCurrency,
  formatCurrencyNumber,
  formatWhileTyping,
  getCurrencyFractionDigits,
  getCurrencySymbol,
  parseCurrencyInput,
} from "@/design-system/components/input/currency-input/currency-input.utils";
import { Input } from "@/design-system/components/input/input/input";
import { VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { P } from "@/design-system/components/typography/p/p";
import { t } from "@/shared/libs/i18n";
import { mergeRefs } from "@/shared/utils/react/merge-refs";
import {
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
} from "react";

/**
 * Money input. Shows grouped numbers while typing (Rp1.500.000), reads shorthand such as
 * "1,5jt" or "250rb", clamps to min/max on blur and emits a plain number.
 *
 * Use with react-hook-form through `Controller` (value + onValueChange), since the visible
 * text is formatted and is not the form value.
 */
export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>((props, ref) => {
  // Props
  const {
    value: valueProp,
    defaultValue = null,
    onValueChange,
    currency = "IDR",
    locale = "id-ID",
    fractionDigits: fractionDigitsProp,
    min,
    max,
    shorthand = true,
    conversion,
    hideSymbol = false,
    onBlur,
    onFocus,
    inputMode = "decimal",
    ...restProps
  } = props;

  // Derived Values
  const isControlled = valueProp !== undefined;
  const fractionDigits = fractionDigitsProp ?? getCurrencyFractionDigits(currency, locale);
  const symbol = useMemo(() => getCurrencySymbol(currency, locale), [currency, locale]);

  // Utils
  function toText(next: number | null): string {
    return next === null ? "" : formatCurrencyNumber(next, { locale, fractionDigits });
  }

  // States
  const [internalValue, setInternalValue] = useState<number | null>(defaultValue);
  const value = isControlled ? valueProp : internalValue;
  const [text, setText] = useState(() => toText(value ?? null));

  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const isFocusedRef = useRef(false);
  const pendingCaret = useRef<number | null>(null);
  const conversionId = useId();

  // Effects
  // Follow outside changes to `value` (form reset, programmatic set) when not typing
  useEffect(() => {
    if (!isFocusedRef.current) setText(toText(value ?? null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, locale, fractionDigits]);

  // Restore the caret after re-grouping
  useEffect(() => {
    if (pendingCaret.current === null || !inputRef.current) return;
    inputRef.current.setSelectionRange(pendingCaret.current, pendingCaret.current);
    pendingCaret.current = null;
  }, [text]);

  // Handlers
  function commit(next: number | null) {
    if (!isControlled) setInternalValue(next);
    if (next !== value) onValueChange?.(next);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const caret = event.target.selectionStart ?? event.target.value.length;
    const formatted = formatWhileTyping(event.target.value, caret, { locale, fractionDigits });
    pendingCaret.current = formatted.caret;
    setText(formatted.text);
    commit(parseCurrencyInput(formatted.text, { locale, fractionDigits, shorthand }));
  }

  function handleFocus(event: FocusEvent<HTMLInputElement>) {
    isFocusedRef.current = true;
    onFocus?.(event);
  }

  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    isFocusedRef.current = false;
    const parsed = parseCurrencyInput(text, { locale, fractionDigits, shorthand });
    const clamped = parsed === null ? null : clampValue(parsed, min, max);
    setText(toText(clamped));
    commit(clamped);
    onBlur?.(event);
  }

  // Derived Values
  const conversionLabel =
    conversion && value !== null && value !== undefined
      ? t["currency_input.conversion"]({
          amount: formatCurrency(value * conversion.rate, { currency: conversion.to, locale }),
          date: new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(
            new Date(`${conversion.rateDate}T00:00:00`),
          ),
        })
      : null;

  return (
    <VStack w={"full"} gap={1} align={"stretch"}>
      <Input
        ref={mergeRefs(inputRef, ref)}
        type={"text"}
        inputMode={inputMode}
        autoComplete={"off"}
        value={text}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        startElement={hideSymbol ? undefined : symbol}
        aria-describedby={conversionLabel ? conversionId : undefined}
        {...restProps}
      />
      {conversionLabel && (
        <P id={conversionId} fontSize={"sm"} color={"fg.muted"} aria-live={"polite"}>
          {conversionLabel}
        </P>
      )}
    </VStack>
  );
});

CurrencyInput.displayName = "CurrencyInput";
