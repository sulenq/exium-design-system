// src/design-system/components/utilities/chakra-locale-provider/chakra-locale-provider.type.ts

import type { LocaleProviderProps } from "@chakra-ui/react";

export type ChakraLocaleProviderProps = Omit<
  LocaleProviderProps,
  "locale"
> & {};
