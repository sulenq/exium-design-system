// src/design-system/components/map/map/map.controls/map.zoom.tsx

import { IconButton } from "@/design-system/components/button/button/button";
import { ButtonGroup } from "@/design-system/components/button/button-group/button-group";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import type { StackProps } from "@/design-system/components/layout/flex-box/flex-box.type";
import { useMapInstanceStore } from "@/design-system/components/map/stores/map.instance.store";
import { MapOverlayContainer } from "@/design-system/components/map/map/map.overlay";
import { Tooltip } from "@/design-system/components/overlay/tooltip/tooltip";
import { MinusIcon, PlusIcon } from "@phosphor-icons/react";
import { t } from "@/shared/libs/i18n";

export const MapZoom = (props: StackProps) => {
  const map = useMapInstanceStore((state) => state.map);

  // Utils
  function zoomIn() {
    map?.zoomIn();
  }
  function zoomOut() {
    map?.zoomOut();
  }

  return (
    <MapOverlayContainer {...props}>
      <ButtonGroup attached color={"white"}>
        <Tooltip
          content={t["map.zoom_out"]()}
          positioning={{ placement: "top" }}
        >
          <IconButton
            aria-label={t["map.zoom_out"]()}
            size={"sm"}
            roundedRight={0}
            onClick={zoomOut}
          >
            <AppIcon icon={MinusIcon} />
          </IconButton>
        </Tooltip>

        <Tooltip
          content={t["map.zoom_in"]()}
          positioning={{ placement: "top" }}
        >
          <IconButton
            aria-label={t["map.zoom_in"]()}
            size={"sm"}
            roundedLeft={0}
            onClick={zoomIn}
          >
            <AppIcon icon={PlusIcon} />
          </IconButton>
        </Tooltip>
      </ButtonGroup>
    </MapOverlayContainer>
  );
};
