// src/design-system/components/input/phone-input/phone-input.tsx

import { useFieldContextValue } from "@/design-system/components/input/context/field.context";
import { NumberInput } from "@/design-system/components/input/number-input/number-input";
import { PhoneCountrySelect } from "@/design-system/components/input/phone-input/phone-country-select";
import type {
  PhoneInputProps,
  PhoneInputValue,
} from "@/design-system/components/input/phone-input/phone-input.type";
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
import { Separator } from "@/design-system/components/layout/separator/separator";
import { P } from "@/design-system/components/typography/p/p";
import { VISUALLY_HIDDEN_INPUT_STYLE } from "@/design-system/constants/css-preset";
import {
  DEFAULT_PHONE_COUNTRY_CODE,
  PHONE_COUNTRIES,
} from "@/design-system/constants/phone-countries";
import type { PhoneCountry } from "@/design-system/constants/types/phone-countries.type";
import { useThemeStore } from "@/design-system/stores/theme-store";
import { getLocale } from "@/shared/libs/i18n";
import { isEmptyArray } from "@/shared/utils/data/array";
import { useFieldContext } from "@chakra-ui/react";
import { forwardRef, useMemo, useState } from "react";

const CONTAINER_VARIANT_STYLES = {
  outline: {
    borderWidth: "1px",
    borderColor: "border.emphasized",
    bg: "transparent",
    _focusWithin: {
      borderColor: "colorPalette.focusRing",
      outline: "1px solid",
      outlineColor: "colorPalette.focusRing",
    },
  },
  subtle: {
    borderWidth: "1px",
    borderColor: "transparent",
    bg: "bg.subtle",
    _focusWithin: {
      borderColor: "colorPalette.focusRing",
      outline: "1px solid",
      outlineColor: "colorPalette.focusRing",
    },
  },
  flushed: {
    borderBottomWidth: "1px",
    borderColor: "border.emphasized",
    bg: "transparent",
    rounded: "0",
    px: 0,
    _focusWithin: {
      borderColor: "colorPalette.focusRing",
    },
  },
} as const;

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
      variant = "outline",
      disabled: disabledProp = false,
      readOnly = false,
      floatingLabel: floatingLabelProp = true,
      placeholder,
      ...restProps
    } = props;

    // Stores
    const { theme } = useThemeStore();

    // Contexts
    const chakraFieldContext = useFieldContext();
    const fieldContext = useFieldContextValue();
    const isFloatingVariant =
      floatingLabelProp && fieldContext?.variant === "floating";
    const disabled = disabledProp || Boolean(chakraFieldContext?.disabled);
    const invalid = Boolean(chakraFieldContext?.invalid);

    // Derived Values: selectable countries
    const availableCountries = useMemo<PhoneCountry[]>(() => {
      if (!whitelistCountries || isEmptyArray(whitelistCountries)) {
        return PHONE_COUNTRIES;
      }
      const resolved = whitelistCountries
        .map((code) => findPhoneCountry(PHONE_COUNTRIES, code))
        .filter((c): c is PhoneCountry => Boolean(c));
      return isEmptyArray(resolved) ? PHONE_COUNTRIES : resolved;
    }, [whitelistCountries]);

    const fallbackCountry = availableCountries[0] ?? PHONE_COUNTRIES[0];
    const isControlledValue = controlledValue !== undefined;
    const isControlledCountry = controlledCountry !== undefined;

    // States
    const [uncontrolledState, setUncontrolledState] = useState<{
      countryCode: string;
      nationalNumber: string;
    }>(() => {
      const initialCountry =
        findPhoneCountry(availableCountries, defaultCountry) ?? fallbackCountry;
      if (defaultValue) {
        const parsed = parseInternationalNumber(
          defaultValue,
          availableCountries,
        );
        if (parsed) {
          return {
            countryCode: parsed.country.code,
            nationalNumber: sanitizeNationalNumber(
              parsed.nationalNumber,
              parsed.country.dialCode,
              stripLeadingZero,
            ),
          };
        }
      }
      return { countryCode: initialCountry.code, nationalNumber: "" };
    });

    // Derived Values: active country & national number
    const parsedControlled = useMemo(() => {
      if (!isControlledValue || !controlledValue) return null;
      return parseInternationalNumber(controlledValue, availableCountries);
    }, [isControlledValue, controlledValue, availableCountries]);

    const activeCountry = useMemo<PhoneCountry>(() => {
      const code = isControlledCountry
        ? controlledCountry
        : (parsedControlled?.country.code ?? uncontrolledState.countryCode);
      return (
        findPhoneCountry(availableCountries, code) ??
        findPhoneCountry(PHONE_COUNTRIES, code) ??
        fallbackCountry
      );
    }, [
      isControlledCountry,
      controlledCountry,
      parsedControlled,
      uncontrolledState.countryCode,
      availableCountries,
      fallbackCountry,
    ]);

    const nationalNumber = useMemo(() => {
      if (!isControlledValue) return uncontrolledState.nationalNumber;
      if (!controlledValue) return "";
      if (parsedControlled) {
        return sanitizeNationalNumber(
          parsedControlled.nationalNumber,
          parsedControlled.country.dialCode,
          stripLeadingZero,
        );
      }
      return sanitizeNationalNumber(
        controlledValue,
        activeCountry.dialCode,
        stripLeadingZero,
      );
    }, [
      isControlledValue,
      controlledValue,
      parsedControlled,
      activeCountry.dialCode,
      uncontrolledState.nationalNumber,
      stripLeadingZero,
    ]);

    const e164Value = formatE164(activeCountry.dialCode, nationalNumber);
    const locale = getLocale();

    const countryOptions = useMemo<SelectOption[]>(() => {
      return availableCountries.map((c) => ({
        value: c.code,
        label: `+${c.dialCode}`,
        flag: getFlagEmoji(c.code),
        name: getCountryName(c.code, locale),
        dialCode: `+${c.dialCode}`,
      }));
    }, [availableCountries, locale]);

    // Handlers
    const emitValue = (nextCountry: PhoneCountry, nextNational: string) => {
      const nextE164 = formatE164(nextCountry.dialCode, nextNational);
      const details: PhoneInputValue = {
        value: nextE164,
        country: nextCountry.code,
        dialCode: nextCountry.dialCode,
        nationalNumber: nextNational,
      };
      onValueChange?.(details);
      if (onChange) {
        onChange({
          target: { name: name ?? "", value: nextE164 },
          currentTarget: { name: name ?? "", value: nextE164 },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    };

    const handleCountrySelect = (nextCode: string) => {
      const nextCountry = findPhoneCountry(availableCountries, nextCode);
      if (!nextCountry) return;
      const prevCode = activeCountry.code;
      if (!isControlledCountry) {
        setUncontrolledState((prev) => ({
          ...prev,
          countryCode: nextCountry.code,
        }));
      }
      if (nextCountry.code !== prevCode) {
        onCountryChange?.(nextCountry.code, prevCode);
      }
      emitValue(nextCountry, nationalNumber);
    };

    const handleNumberChange = (details: {
      value: number;
      formattedValue: string;
    }) => {
      const nextNational = sanitizeNationalNumber(
        details.formattedValue,
        activeCountry.dialCode,
        stripLeadingZero,
      );
      if (!isControlledValue) {
        setUncontrolledState((prev) => ({
          ...prev,
          nationalNumber: nextNational,
        }));
      }
      emitValue(activeCountry, nextNational);
    };

    const isCountryStatic = countryLocked || availableCountries.length <= 1;
    const variantKey =
      variant === "subtle" || variant === "flushed" ? variant : "outline";
    const variantStyles = CONTAINER_VARIANT_STYLES[variantKey];

    const containerElement = (
      <HStack
        w={"full"}
        h={isFloatingVariant ? "48px" : "40px"}
        px={3}
        gap={2}
        align={"center"}
        rounded={theme.radii.component}
        opacity={disabled ? 0.5 : 1}
        pointerEvents={disabled ? "none" : undefined}
        {...variantStyles}
        {...(invalid && {
          borderColor: "border.error",
        })}
      >
        {isCountryStatic && (
          <HStack gap={1.5} align={"center"} flexShrink={0}>
            <P lineHeight={1} aria-hidden={true}>
              {getFlagEmoji(activeCountry.code)}
            </P>
            <P fontWeight={"medium"} whiteSpace={"nowrap"}>
              {`+${activeCountry.dialCode}`}
            </P>
          </HStack>
        )}

        {!isCountryStatic && (
          <Box flexShrink={0}>
            <PhoneCountrySelect
              value={activeCountry.code}
              options={countryOptions}
              prefixLabel={
                <HStack gap={1.5} align={"center"}>
                  <P lineHeight={1} aria-hidden={true}>
                    {getFlagEmoji(activeCountry.code)}
                  </P>
                  <P fontWeight={"medium"} whiteSpace={"nowrap"}>
                    {`+${activeCountry.dialCode}`}
                  </P>
                </HStack>
              }
              disabled={disabled}
              modalKey={modalKey}
              onValueChange={handleCountrySelect}
            />
          </Box>
        )}

        <Separator
          orientation={"vertical"}
          h={isFloatingVariant ? "26px" : "20px"}
          borderColor={"border.muted"}
        />

        <NumberInput
          stepper={false}
          floatingLabel={floatingLabelProp}
          flex={1}
          css={{
            "& input": {
              border: "none !important",
              boxShadow: "none !important",
              outline: "none !important",
              bg: "transparent !important",
              pr: "0 !important",
            },
          }}
          value={nationalNumber}
          placeholder={placeholder ?? ""}
          disabled={disabled}
          readOnly={readOnly}
          onValueChange={handleNumberChange}
          inputProps={{
            type: "tel",
            inputMode: "tel",
            autoComplete: "tel-national",
          }}
          {...(restProps as Record<string, unknown>)}
        />
      </HStack>
    );

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

        {containerElement}
      </>
    );
  },
);
