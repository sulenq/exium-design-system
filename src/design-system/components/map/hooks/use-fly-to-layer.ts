// src/design-system/components/map/hooks/use-fly-to-layer.ts

import { useMapInstanceStore } from "@/design-system/components/map/stores/map.instance.store";
import type {
  FlyToLayerOptions,
  FlyToLayerTarget,
} from "@/design-system/components/map/types/map.layer-management.type";
import { fitBoundsSafe, flyToSafe } from "@/design-system/components/map/utils/map-camera";
import { useCallback } from "react";

export const useFlyToLayer = () => {
  const map = useMapInstanceStore((state) => state.map);

  const flyTo = useCallback(
    (target: FlyToLayerTarget, options?: FlyToLayerOptions) => {
      if (!map) return;

      if (target.bbox && target.bbox.length === 4) {
        fitBoundsSafe(map, target.bbox, {
          padding: options?.padding ?? 80,
          maxZoom: options?.maxZoom ?? 15,
          duration: options?.duration ?? 1200,
        });
        return;
      }

      if (target.coordinates && target.coordinates.length === 2) {
        flyToSafe(map, {
          center: target.coordinates,
          zoom: options?.defaultZoom ?? 14,
          duration: options?.duration ?? 1200,
        });
      }
    },
    [map],
  );

  return { flyTo };
};
