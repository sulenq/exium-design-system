// src/design-system/components/map/map/map.controls/map.locate.tsx

import { IconButton } from "@/design-system/components/button/button/button";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import type { StackProps } from "@/design-system/components/layout/flex-box/flex-box.type";
import { useGeolocation } from "@/design-system/components/map/hooks/use-map-geolocation";
import { useMapInstanceStore } from "@/design-system/components/map/stores/map.instance.store";
import { MapOverlayContainer } from "@/design-system/components/map/map/map.overlay";
import { Tooltip } from "@/design-system/components/overlay/tooltip/tooltip";
import { useThemeStore } from "@/design-system/stores/theme-store";
import {
  IconCurrentLocation,
  IconCurrentLocationFilled,
} from "@tabler/icons-react";
import { t } from "@/shared/libs/i18n";

export const MapLocate = (props: StackProps) => {
  // Stores
  const { theme } = useThemeStore();

  // Map Instance
  const map = useMapInstanceStore((state) => state.map);

  // Hooks
  const { isActive, isLocating, toggle } = useGeolocation(map);

  return (
    <MapOverlayContainer {...props}>
      <Tooltip
        content={isActive ? t["map.hide_my_location"]() : t["map.show_my_location"]()}
        positioning={{ placement: "top" }}
      >
        <IconButton
          aria-label={isActive ? t["map.hide_my_location"]() : t["map.show_my_location"]()}
          size={"sm"}
          loading={isLocating}
          onClick={toggle}
          color={isActive ? `${theme.colorPalette}.fg` : undefined}
        >
          <AppIcon
            icon={isActive ? IconCurrentLocationFilled : IconCurrentLocation}
          />
        </IconButton>
      </Tooltip>
    </MapOverlayContainer>
  );
};
