// src/design-system/constants/types/phone-countries.type.ts

export type PhoneCountry = {
  /** ISO 3166-1 alpha-2 code, upper case (e.g. "ID"). */
  code: string;
  /** Country calling code digits without the plus sign (e.g. "62"). */
  dialCode: string;
};

export type ParsedPhoneValue = {
  country: PhoneCountry;
  nationalNumber: string;
};
