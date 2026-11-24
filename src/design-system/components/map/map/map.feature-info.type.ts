// src/design-system/components/map/map/map.feature-info.type.ts

import type { Geometry } from "geojson";
import type { MapLayerAppearance } from "@/design-system/components/map/map/map.type";
import type maplibregl from "maplibre-gl";

export type GetFeatureInfoOptions = {
  wmsUrl?: string | null;
  layerId?: string;
  layers: string;
  point: { x: number; y: number };
  lngLat?: { lng: number; lat: number };
  map: maplibregl.Map;
  cqlFilter?: string;
};

export type MapFeatureInfoItem = {
  id?: string | number;
  layerId: string;
  title?: string;
  layerTitle?: string;
  /** Appearance of the layer the feature came from (accent color, icon, category label). */
  appearance?: MapLayerAppearance;
  typeName?: string;
  properties: Record<string, unknown>;
  geometry?: Geometry | null;
  coordinate?: [number, number];
};

export type MapFeatureInfoState = {
  selectedFeature: MapFeatureInfoItem | null;
  isLoading: boolean;
  error: string | null;
  setSelectedFeature: (feature: MapFeatureInfoItem | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearFeatureInfo: () => void;
};
