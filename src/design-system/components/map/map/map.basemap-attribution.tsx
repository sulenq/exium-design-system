// src/design-system/components/map/ui/map.basemap-attribution.tsx

import { IconButton } from "@/design-system/components/button/button/button";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { getBasemapOption } from "@/design-system/components/map/constants/map.basemap-options";
import { useMapBaseMapStore } from "@/design-system/components/map/stores/map.base-map.store";
import { MapOverlayContainer } from "@/design-system/components/map/map/map.overlay";
import { Popover } from "@/design-system/components/overlay/popover/popover";
import { Tooltip } from "@/design-system/components/overlay/tooltip/tooltip";
import { Span } from "@/design-system/components/typography/span/span";
import { InfoIcon } from "lucide-react";

export const MapAttribution = () => {
  // Stores
  const { activeStyleKey } = useMapBaseMapStore();

  const activeBaseLayer = getBasemapOption(activeStyleKey);
  const attributions = activeBaseLayer?.attributions ?? [];

  return (
    <Popover.Root
      positioning={{
        offset: { crossAxis: -80 },
      }}
    >
      <Popover.Trigger>
        <MapOverlayContainer>
          <Tooltip
            content={"Atribusi Peta"}
            positioning={{ placement: "bottom" }}
          >
            <IconButton aria-label={"Map attribution"} size={"sm"}>
              <AppIcon icon={InfoIcon} />
            </IconButton>
          </Tooltip>
        </MapOverlayContainer>
      </Popover.Trigger>

      <Popover.Content w={"200px"}>
        <Popover.Body>
          <VStack
            alignItems={"flex-start"}
            gap={1}
            css={{
              "& a:hover": {
                textDecoration: "underline",
              },
            }}
          >
            {attributions.map((attribution) => (
              <Span
                key={attribution}
                dangerouslySetInnerHTML={{ __html: attribution }}
              />
            ))}
          </VStack>
        </Popover.Body>
      </Popover.Content>
    </Popover.Root>
  );
};
