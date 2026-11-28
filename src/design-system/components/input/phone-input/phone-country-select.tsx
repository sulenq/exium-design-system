// src/design-system/components/input/phone-input/phone-country-select.tsx

import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import type { PhoneCountrySelectProps } from "@/design-system/components/input/phone-input/phone-input.type";
import SelectInput from "@/design-system/components/input/select/select";
import type { SelectOption } from "@/design-system/components/input/select/select.type";
import {
  findPhoneCountry,
  getCountryName,
  getFlagEmoji,
} from "@/design-system/components/input/utils/phone.utils";
import { Box } from "@/design-system/components/layout/box/box";
import { HStack } from "@/design-system/components/layout/flex-box/flex-box";
import { P } from "@/design-system/components/typography/p/p";
import { PHONE_COUNTRIES } from "@/design-system/constants/phone-countries";
import type { PhoneCountry } from "@/design-system/constants/types/phone-countries.type";
import { getLocale, t } from "@/shared/libs/i18n";
import { isEmptyArray } from "@/shared/utils/data/array";
import { CaretDownIcon as ChevronDownIcon } from "@phosphor-icons/react";
import { useMemo } from "react";

/** Country dial-code selector used inside PhoneInput. */
export function PhoneCountrySelect(props: PhoneCountrySelectProps) {
  // Props
  const {
    value,
    countries: whitelistCountries,
    disabled = false,
    modalKey,
    onValueChange,
  } = props;

  // Derived Values
  const locale = getLocale();

  const availableCountries = useMemo<PhoneCountry[]>(() => {
    if (!whitelistCountries || isEmptyArray(whitelistCountries)) {
      return PHONE_COUNTRIES;
    }
    const resolved = whitelistCountries
      .map((code) => findPhoneCountry(PHONE_COUNTRIES, code))
      .filter((c): c is PhoneCountry => Boolean(c));
    return isEmptyArray(resolved) ? PHONE_COUNTRIES : resolved;
  }, [whitelistCountries]);

  const activeCountry = useMemo(
    () =>
      findPhoneCountry(availableCountries, value) ??
      findPhoneCountry(PHONE_COUNTRIES, value) ??
      PHONE_COUNTRIES[0],
    [availableCountries, value],
  );

  const countryOptions = useMemo<SelectOption[]>(() => {
    return availableCountries.map((c) => ({
      value: c.code,
      label: `+${c.dialCode}`,
      flag: getFlagEmoji(c.code),
      name: getCountryName(c.code, locale),
      dialCode: `+${c.dialCode}`,
    }));
  }, [availableCountries, locale]);

  return (
    <Box
      css={{
        "& [data-part='control'], & [data-part='trigger'], & button": {
          border: "none !important",
          boxShadow: "none !important",
          outline: "none !important",
          bg: "transparent !important",
          minH: "unset !important",
          ps: "1 !important",
          pe: "0 !important",
        },
        "& [data-part='trigger']:focus-visible": {
          outline:
            "2px solid var(--chakra-colors-border-emphasized) !important",
          outlineOffset: "2px",
        },
      }}
    >
      <SelectInput
        value={value}
        options={countryOptions}
        clearable={false}
        disabled={disabled}
        modalKey={modalKey}
        floatingLabel={false}
        title={t["common.select_country"]()}
        placeholder={t["common.select_country"]()}
        contentProps={{ minW: "280px", w: "auto" }}
        trigger={
          <HStack align={"center"} gap={2}>
            <HStack gap={1.5} align={"center"}>
              <P lineHeight={1} aria-hidden={true}>
                {getFlagEmoji(activeCountry.code)}
              </P>
              <P fontWeight={"medium"} whiteSpace={"nowrap"}>
                {`+${activeCountry.dialCode}`}
              </P>
            </HStack>
            <AppIcon icon={ChevronDownIcon} size={"sm"} color={"fg.subtle"} />
          </HStack>
        }
        renderOption={(option) => (
          <HStack gap={3} align={"center"} flex={1} minW={0}>
            <P lineHeight={1} aria-hidden={true}>
              {String(option.flag ?? "")}
            </P>
            <P flex={1} whiteSpace={"nowrap"} textAlign={"start"}>
              {String(option.name ?? option.label)}
            </P>
            <P color={"fg.muted"} whiteSpace={"nowrap"}>
              {String(option.dialCode ?? "")}
            </P>
          </HStack>
        )}
        onValueChange={(nextCode) => {
          if (nextCode) onValueChange(nextCode);
        }}
      />
    </Box>
  );
}
