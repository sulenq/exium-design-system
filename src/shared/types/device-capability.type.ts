// src/shared/types/device-capability.type.ts

export type DeviceInputType = "mouse" | "touch" | "dual";

export type DeviceCapability = {
  hasPointer: boolean;
  hasTouch: boolean;
  inputType: DeviceInputType;
};

