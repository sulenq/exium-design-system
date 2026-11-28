// src/design-system/components/input/phone-input/phone-country-select.tsx

import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import type { PhoneCountrySelectProps } from "@/design-system/components/input/phone-input/phone-input.type";
import SelectInput from "@/design-system/components/input/select/select";
import { Box } from "@/design-system/components/layout/box/box";
import { HStack } from "@/design-system/components/layout/flex-box/flex-box";
import { P } from "@/design-system/components/typography/p/p";
import { t } from "@/shared/libs/i18n";
import { CaretDownIcon as ChevronDownIcon } from "@phosphor-icons/react";

/** Country selector prefix used inside PhoneInput. */
export function PhoneCountrySelect(props: PhoneCountrySelectProps) {
  // Props
  const {
    value,
    options,
    prefixLabel,
    disabled = false,
    modalKey,
    onValueChange,
  } = props;

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
        options={options}
        clearable={false}
        disabled={disabled}
        modalKey={modalKey}
        floatingLabel={false}
        title={t["common.select_country"]()}
        placeholder={t["common.select_country"]()}
        contentProps={{ minW: "280px", w: "auto" }}
        trigger={
          <HStack align={"center"} gap={1}>
            {prefixLabel}
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
