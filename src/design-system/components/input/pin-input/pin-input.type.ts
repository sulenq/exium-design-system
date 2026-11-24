// src/design-system/components/input/pin-input/pin-input.type.ts

import { PinInput as ChakraPinInput } from "@chakra-ui/react";

export type PinInputProps = ChakraPinInput.RootProps & {
  count?: number;
  attached?: boolean;
  mask?: boolean;
  /**
   * Sets `autocomplete="one-time-code"` so mobile keyboards can autofill codes from SMS.
   * Defaults to `true` unless `mask` is enabled (masked PINs are secrets, not one-time codes).
   */
  otp?: boolean;
  placeholder?: string;
  fluid?: boolean;
  inputHeight?: number | string;
  inputProps?: ChakraPinInput.InputProps;
};

