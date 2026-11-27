// src/design-system/components/input/switch/switch.type.ts

import { Switch as ChakraSwitch } from "@chakra-ui/react";
import type { ReactNode } from "react";

export type SwitchSizeKey = "xs" | "sm" | "md" | "lg";

export type SwitchContextValue = {
  isHolding: boolean;
  sizeKey: SwitchSizeKey;
};

export type SwitchRootProps = ChakraSwitch.RootProps & {
  tooltip?: ReactNode;
};

export type SwitchControlProps = ChakraSwitch.ControlProps & {
  thumbProps?: ChakraSwitch.ThumbProps;
};

export type SwitchProps = SwitchRootProps & {
  controlProps?: ChakraSwitch.ControlProps;
  thumbProps?: ChakraSwitch.ThumbProps;
};
