// src/design-system/components/map/map/map.draw-controls.tsx

import { IconButton } from "@/design-system/components/button/button/button";
import { useMapDrawStore } from "@/design-system/components/map/stores/map.draw.store";
import { MapOverlayContainer } from "@/design-system/components/map/map/map.overlay";
import { Tooltip } from "@/design-system/components/overlay/tooltip/tooltip";
import { PencilSimpleIcon as PencilIcon, XIcon } from "@phosphor-icons/react";
import { t } from "@/shared/libs/i18n";

export const MapDrawControls = () => {
  const { isDrawing, start, cancel } = useMapDrawStore();

  return (
    <MapOverlayContainer>
      <Tooltip
        content={isDrawing ? t["map.cancel_drawing"]() : t["map.draw_polygon"]()}
        positioning={{ placement: "top" }}
      >
        <IconButton
          aria-label={isDrawing ? t["map.cancel_drawing"]() : t["map.draw_polygon"]()}
          size={"sm"}
          colorPalette={isDrawing ? "red" : "blue"}
          onClick={() => {
            if (isDrawing) {
              // While drawing: just cancel (no finished shape to clear from map source)
              cancel();
            } else {
              start("polygon");
            }
          }}
        >
          {isDrawing ? <XIcon size={16} /> : <PencilIcon size={16} />}
        </IconButton>
      </Tooltip>
    </MapOverlayContainer>
  );
};
