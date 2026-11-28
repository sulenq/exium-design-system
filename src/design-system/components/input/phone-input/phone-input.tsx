// src/design-system/components/input/phone-input/phone-input.tsx

import {
  FieldContext,
  useFieldContextValue,
} from "@/design-system/components/input/context/field.context";
import { Input } from "@/design-system/components/input/input/input";
import type {
  PhoneInputProps,
  PhoneInputValue,
} from "@/design-system/components/input/phone-input/phone-input.type";
import { PhoneCountrySelect } from "@/design-system/components/input/phone-input/phone-country-select";
import type { SelectOption } from "@/design-system/components/input/select/select.type";
import {
  findPhoneCountry,
  formatE164,
  getCountryName,
  getFlagEmoji,
  parseInternationalNumber,
  sanitizeNationalNumber,
} from "@/design-system/components/input/utils/phone.utils";
import { Box } from "@/design-system/components/layout/box/box";
import { HStack } from "@/design-system/components/layout/flex-box/flex-box";
import { P } from "@/design-system/components/typography/p/p";
import { VISUALLY_HIDDEN_INPUT_STYLE } from "@/design-system/constants/css-preset";
import {
  DEFAULT_PHONE_COUNTRY_CODE,
  PHONE_COUNTRIES,
} from "@/design-system/constants/phone-countries";
import type { PhoneCountry } from "@/design-system/constants/types/phone-countries.type";
import { getLocale } from "@/shared/libs/i18n";
import { isEmptyArray } from "@/shared/utils/data/array";
import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ClipboardEvent,
} from "react";

// Input adornments start 12px in; 8px more separates the prefix from the
// digits and lines the digits up with the floating label.
const PREFIX_GAP_PX = 20;
const PREFIX_FALLBACK_WIDTH_PX = 88;

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  function PhoneInput(props, ref) {
    // Props
    const {
      value: controlledValue,
      defaultValue,
      onValueChange,
      country: controlledCountry,
      defaultCountry = DEFAULT_PHONE_COUNTRY_CODE,
      onCountryChange,
      countries: whitelistCountries,
      countryLocked = false,
      stripLeadingZero = true,
      modalKey,
      name,
      onChange,
      disabled = false,
      readOnly = false,
      floatingLabel: floatingLabelProp = true,
      ...restProps
    } = props;

    // Contexts
    const fieldContext = useFieldContextValue();
    const inputFieldContext = useMemo(
      () => (fieldContext ? { ...fieldContext, hasValue: true } : null),
      [fieldContext],
    );

    // Derived Values: selectable countries (whitelist keeps the caller's order)
    const availableCountries = useMemo<PhoneCountry[]>(() => {
      if (!whitelistCountries || isEmptyArray(whitelistCountries)) {
        return PHONE_COUNTRIES;
      }
      const resolved = whitelistCountries
        .map((code) => findPhoneCountry(PHONE_COUNTRIES, code))
        .filter((country): country is PhoneCountry => Boolean(country));
      if (isEmptyArray(resolved)) return PHONE_COUNTRIES;
      return resolved;
    }, [whitelistCountries]);

    const fallbackCountry = availableCountries[0];

    // States
    const [internalCountryCode, setInternalCountryCode] = useState<string>(
      () => {
        const fromDefaultValue = defaultValue
          ? parseInternationalNumber(
              defaultValue,
              availableCountries,
              findPhoneCountry(availableCountries, defaultCountry),
            )
          : null;
        return (
          fromDefaultValue?.country.code ??
          findPhoneCountry(availableCountries, defaultCountry)?.code ??
          fallbackCountry.code
        );
      },
    );
    const [internalNationalNumber, setInternalNationalNumber] =
      useState<string>(() => {
        if (!defaultValue) return "";
        const parsed = parseInternationalNumber(
          defaultValue,
          availableCountries,
          findPhoneCountry(availableCountries, defaultCountry),
        );
        if (!parsed) return "";
        return sanitizeNationalNumber(
          parsed.nationalNumber,
          parsed.country.dialCode,
          stripLeadingZero,
        );
      });
    const [prefixWidth, setPrefixWidth] = useState<number>(0);

    // Refs
    const prefixRef = useRef<HTMLDivElement>(null);

    // Effects: keep the input padding in sync with the prefix width
    useEffect(() => {
      const node = prefixRef.current;
      if (!node) return;

      const measure = () => setPrefixWidth(node.offsetWidth);
      measure();

      if (typeof ResizeObserver === "undefined") return;
      const observer = new ResizeObserver(measure);
      observer.observe(node);
      return () => observer.disconnect();
    }, []);

    // Derived Values: active country and national number
    const isValueControlled = controlledValue !== undefined;
    const internalCountry =
      findPhoneCountry(availableCountries, internalCountryCode) ??
      fallbackCountry;
    const propCountry = findPhoneCountry(availableCountries, controlledCountry);
    const parsedControlledValue = isValueControlled
      ? parseInternationalNumber(
          controlledValue,
          availableCountries,
          propCountry ?? internalCountry,
        )
      : null;

    // A controlled `country` always wins. Otherwise a controlled value whose
    // calling code differs from the current country moves the country with it.
    const valueCountry =
      parsedControlledValue &&
      parsedControlledValue.country.dialCode !== internalCountry.dialCode
        ? parsedControlledValue.country
        : undefined;
    const activeCountry = propCountry ?? valueCountry ?? internalCountry;

    const nationalNumber = isValueControlled
      ? sanitizeNationalNumber(
          parsedControlledValue?.country.dialCode === activeCountry.dialCode
            ? parsedControlledValue.nationalNumber
            : "",
          activeCountry.dialCode,
          stripLeadingZero,
        )
      : internalNationalNumber;

    const e164Value = formatE164(activeCountry.dialCode, nationalNumber);
    const isCountryStatic =
      countryLocked || availableCountries.length === 1 || readOnly;
    const canSwitchCountry =
      !isCountryStatic &&
      (controlledCountry === undefined || Boolean(onCountryChange));
    const dialCodeLabel = `+${activeCountry.dialCode}`;
    const prefixPointerEvents = isCountryStatic ? "none" : "auto";
    const locale = getLocale();

    const countryOptions = useMemo<SelectOption[]>(
      () =>
        availableCountries
          .map((country) => {
            const countryName = getCountryName(country.code, locale);
            return {
              value: country.code,
              label: `${countryName} (+${country.dialCode})`,
              name: countryName,
              flag: getFlagEmoji(country.code),
              dialCode: `+${country.dialCode}`,
            };
          })
          .sort((a, b) => a.name.localeCompare(b.name, locale)),
      [availableCountries, locale],
    );

    // Handlers
    const emitChange = useCallback(
      (nextCountry: PhoneCountry, nextNationalNumber: string) => {
        const details: PhoneInputValue = {
          value: formatE164(nextCountry.dialCode, nextNationalNumber),
          country: nextCountry.code,
          dialCode: nextCountry.dialCode,
          nationalNumber: nextNationalNumber,
        };

        onValueChange?.(details);
        onChange?.({
          target: { name, value: details.value },
        } as ChangeEvent<HTMLInputElement>);
      },
      [name, onChange, onValueChange],
    );

    const applyCountry = useCallback(
      (nextCountry: PhoneCountry) => {
        if (nextCountry.code === activeCountry.code) return;
        setInternalCountryCode(nextCountry.code);
        onCountryChange?.(nextCountry.code, activeCountry.code);
      },
      [activeCountry.code, onCountryChange],
    );

    const commitInput = useCallback(
      (raw: string, allowInternational: boolean) => {
        const parsed = allowInternational
          ? parseInternationalNumber(raw, availableCountries, activeCountry)
          : null;

        let nextCountry = activeCountry;
        let rawNational = raw;

        if (parsed && parsed.country.dialCode === activeCountry.dialCode) {
          rawNational = parsed.nationalNumber;
        } else if (parsed && canSwitchCountry) {
          // A full number from another country moves the selector with it
          nextCountry = parsed.country;
          rawNational = parsed.nationalNumber;
        }
        // Otherwise the country is fixed: the digits are kept as typed and
        // the fixed prefix still applies.

        const nextNationalNumber = sanitizeNationalNumber(
          rawNational,
          nextCountry.dialCode,
          stripLeadingZero,
        );

        applyCountry(nextCountry);
        setInternalNationalNumber(nextNationalNumber);
        emitChange(nextCountry, nextNationalNumber);
      },
      [
        activeCountry,
        applyCountry,
        availableCountries,
        canSwitchCountry,
        emitChange,
        stripLeadingZero,
      ],
    );

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      commitInput(e.target.value, e.target.value.trim().startsWith("+"));
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
      const pasted = e.clipboardData.getData("text");
      const trimmed = pasted.trim();
      const isInternational =
        trimmed.startsWith("+") || trimmed.startsWith("00");
      if (!isInternational) return;

      // Pasting "+62 812..." replaces the field instead of nesting the prefix
      e.preventDefault();
      commitInput(pasted, true);
    };

    const handleCountrySelect = (countryCode: string) => {
      const nextCountry = findPhoneCountry(availableCountries, countryCode);
      if (!nextCountry || nextCountry.code === activeCountry.code) return;

      const nextNationalNumber = sanitizeNationalNumber(
        nationalNumber,
        nextCountry.dialCode,
        stripLeadingZero,
      );

      applyCountry(nextCountry);
      setInternalNationalNumber(nextNationalNumber);
      emitChange(nextCountry, nextNationalNumber);
    };

    const prefixLabel = (
      <HStack align={"center"} gap={2}>
        <P lineHeight={1} aria-hidden={true}>
          {getFlagEmoji(activeCountry.code)}
        </P>
        <P fontWeight={"medium"} whiteSpace={"nowrap"}>
          {dialCodeLabel}
        </P>
      </HStack>
    );

    const prefixNode = (
      <Box
        ref={prefixRef}
        display={"flex"}
        alignItems={"center"}
        h={"full"}
        data-phone-prefix={dialCodeLabel}
        // Input adornments ignore pointer events by default; the selector needs them
        pointerEvents={prefixPointerEvents}
      >
        {isCountryStatic && (
          <Box
            ps={1}
            role={"img"}
            aria-label={`${getCountryName(activeCountry.code, locale)} ${dialCodeLabel}`}
          >
            {prefixLabel}
          </Box>
        )}

        {!isCountryStatic && (
          <PhoneCountrySelect
            value={activeCountry.code}
            options={countryOptions}
            prefixLabel={prefixLabel}
            disabled={disabled}
            modalKey={modalKey}
            onValueChange={handleCountrySelect}
          />
        )}
      </Box>
    );

    const inputPaddingStart = `${(prefixWidth || PREFIX_FALLBACK_WIDTH_PX) + PREFIX_GAP_PX}px`;

    return (
      <>
        {/* Carries the E.164 value for native forms and React Hook Form */}
        <input
          ref={ref}
          type={"text"}
          style={VISUALLY_HIDDEN_INPUT_STYLE}
          tabIndex={-1}
          aria-hidden={true}
          name={name}
          value={e164Value}
          readOnly={true}
        />

        {/* The prefix is always visible, so the floating label never rests over it */}
        <FieldContext.Provider value={inputFieldContext}>
          <Input
            floatingLabel={floatingLabelProp}
            type={"tel"}
            inputMode={"tel"}
            autoComplete={"tel-national"}
            value={nationalNumber}
            disabled={disabled}
            readOnly={readOnly}
            startElement={prefixNode}
            ps={inputPaddingStart}
            onChange={handleInputChange}
            onPaste={handlePaste}
            {...restProps}
          />
        </FieldContext.Provider>
      </>
    );
  },
);
