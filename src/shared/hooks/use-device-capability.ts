// src/shared/hooks/use-device-capability.ts

import type { DeviceCapability } from "@/shared/types/device-capability.type";
import { getDeviceCapability } from "@/shared/utils/client/device-capability.utils";
import { useEffect, useState } from "react";

export const useDeviceCapability = (): DeviceCapability => {
  // States
  const [capability, setCapability] = useState<DeviceCapability>(() =>
    getDeviceCapability(),
  );

  // Effects
  useEffect(() => {
    if (typeof window === "undefined") return;

    const pointerMedia = window.matchMedia("(pointer: fine)");
    const hoverMedia = window.matchMedia("(hover: hover)");
    const coarseMedia = window.matchMedia("(pointer: coarse)");

    const update = () => {
      setCapability(getDeviceCapability());
    };

    update();

    pointerMedia.addEventListener("change", update);
    hoverMedia.addEventListener("change", update);
    coarseMedia.addEventListener("change", update);

    return () => {
      pointerMedia.removeEventListener("change", update);
      hoverMedia.removeEventListener("change", update);
      coarseMedia.removeEventListener("change", update);
    };
  }, []);

  return capability;
};
