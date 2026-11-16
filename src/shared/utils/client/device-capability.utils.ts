// src/shared/utils/client/device-capability.utils.ts

import type {
  DeviceCapability,
  DeviceInputType,
} from "@/shared/types/device-capability.type";

export const getDeviceCapability = (): DeviceCapability => {
  if (typeof window === "undefined") {
    return {
      hasPointer: true,
      hasTouch: false,
      inputType: "mouse",
    };
  }

  const hasPointer =
    window.matchMedia("(pointer: fine)").matches ||
    window.matchMedia("(hover: hover)").matches;

  const hasTouch =
    ("maxTouchPoints" in navigator && navigator.maxTouchPoints > 0) ||
    window.matchMedia("(pointer: coarse)").matches;

  let inputType: DeviceInputType = "mouse";
  if (hasPointer && hasTouch) {
    inputType = "dual";
  } else if (hasTouch) {
    inputType = "touch";
  }

  return {
    hasPointer,
    hasTouch,
    inputType,
  };
};
