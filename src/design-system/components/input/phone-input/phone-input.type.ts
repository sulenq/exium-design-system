// src/design-system/components/input/phone-input/phone-input.type.ts

import type { InputProps } from "@/design-system/components/input/input/input.type";
import type { SelectOption } from "@/design-system/components/input/select/select.type";
import type { ChangeEvent, ReactNode } from "react";

export type PhoneInputValue = {
  /** E.164 string ("+628123456789"), or "" when no number is entered. */
  value: string;
  /** ISO 3166-1 alpha-2 code of the active country. */
  country: string;
  /** Calling code digits of the active country, without "+". */
  dialCode: string;
  /** Digits typed by the user, without the calling code. */
  nationalNumber: string;
};

export type PhoneInputProps = Omit<
  InputProps,
  "value" | "defaultValue" | "onChange" | "type" | "startElement"
> & {
  /** Controlled E.164 value. */
  value?: string;
  /** Uncontrolled initial E.164 value. */
  defaultValue?: string;
  onValueChange?: (details: PhoneInputValue) => void;

  /** Controlled country (ISO alpha-2). Pair with `onCountryChange`. */
  country?: string;
  /** Uncontrolled initial country (ISO alpha-2). Default "ID". */
  defaultCountry?: string;
  onCountryChange?: (country: string, prevCountry: string) => void;
  /** Whitelist and order of selectable countries (ISO alpha-2). */
  countries?: string[];
  /** Show the country as a static prefix instead of a selector. */
  countryLocked?: boolean;

  /** Drop the national trunk prefix "0" (0812 -> 812). Default true. */
  stripLeadingZero?: boolean;

  /** Key for the country picker modal on small viewports. */
  modalKey?: string;

  // React Hook Form: `register()` receives the E.164 value
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type PhoneCountrySelectProps = {
  value: string;
  options: SelectOption[];
  prefixLabel: ReactNode;
  disabled?: boolean;
  modalKey?: string;
  onValueChange: (countryCode: string) => void;
};
