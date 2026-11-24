// src/design-system/components/shell/gis-app-shell/gis-app-shell.type.ts

import type { StackProps } from "@/design-system/components/layout/flex-box/flex-box.type";
import type { CatalogMapLayer } from "@/design-system/components/map/map/map.type";
import type { ReactNode } from "react";

export type GisAppShellProps = StackProps & GisContentProps;

export type GisContentProps = {
  /** Layers shown on the map. The app fetches them; the shell only renders and toggles them. */
  catalogLayers?: CatalogMapLayer[];
  /** Layer management control shown on the map, top-right. */
  layerManagement?: ReactNode;
};
