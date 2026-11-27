import { Button } from "@/design-system/components/button/button/button";
import { Box } from "@/design-system/components/layout/box/box";
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { BaseMap, Map } from "@/design-system/components/map/map/map";
import { MapLayerManagementPanel } from "@/design-system/components/map/map/map.controls/map.layer-management-panel";
import { MapDrawControls } from "@/design-system/components/map/map/map.draw-controls";
import { MapFeatureInfoPanel } from "@/design-system/components/map/map/map.feature-info-panel";
import type { GenericMapLayer } from "@/design-system/components/map/map/map.layer-management.type";
import { useMapFeatureInfoStore } from "@/design-system/components/map/stores/map.feature-info.store";
import { useMapDrawStore } from "@/design-system/components/map/stores/map.draw.store";
import type { ComponentDocSpec } from "@/features/design-system-docs/types/ds-docs-spec.type";
import { SquaresFourIcon, StackIcon } from "@phosphor-icons/react";
import type { ReactNode } from "react";

// -------------------------------------------------------------------------------------
// Demo data
// -------------------------------------------------------------------------------------

const DEMO_BBOX: [number, number, number, number] = [110.35, -7.85, 110.45, -7.75];

/** Generic layers: the app's adapter fills `appearance`; the map only renders it. */
const DEMO_LAYERS: GenericMapLayer[] = [
  {
    id: "demo:padang_penggembalaan",
    title: "Padang penggembalaan",
    bbox: DEMO_BBOX,
    zIndex: 2,
    appearance: { colorPalette: "green", icon: SquaresFourIcon, categoryLabel: "Area" },
  },
  {
    id: "demo:kandang",
    title: "Lokasi kandang",
    bbox: DEMO_BBOX,
    zIndex: 1,
    appearance: { colorPalette: "blue", icon: StackIcon, categoryLabel: "Titik" },
  },
];

// -------------------------------------------------------------------------------------
// Demo components
// -------------------------------------------------------------------------------------

const MapFrame = (props: { children?: ReactNode; h?: string }) => {
  // Props
  const { children, h = "420px" } = props;

  return (
    <Box
      pos={"relative"}
      w={"full"}
      h={h}
      overflow={"hidden"}
      rounded={"md"}
      border={"1px solid"}
      borderColor={"border.subtle"}
    >
      {children}
    </Box>
  );
};

/** Absolutely positioned slot over the map, with pointer events re-enabled. */
const MapSlot = (props: {
  children: ReactNode;
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
}) => {
  // Props
  const { children, ...position } = props;

  return (
    <Box pos={"absolute"} zIndex={10} pointerEvents={"auto"} {...position}>
      {children}
    </Box>
  );
};

const DemoLayerManagement = () => (
  <MapLayerManagementPanel<GenericMapLayer>
    title={"Layer"}
    layers={DEMO_LAYERS}
    showSymbology={false}
  />
);

const FeatureInfoDemo = () => {
  // Stores
  const setSelectedFeature = useMapFeatureInfoStore((s) => s.setSelectedFeature);
  const clearFeatureInfo = useMapFeatureInfoStore((s) => s.clearFeatureInfo);

  return (
    <MapFrame>
      <BaseMap>
        <MapSlot top={"60px"} right={4}>
          <MapFeatureInfoPanel />
        </MapSlot>
        <MapSlot top={4} left={4}>
          <HStack gap={2}>
            <Button
              size={"sm"}
              variant={"glass"}
              onClick={() =>
                setSelectedFeature({
                  id: "demo-1",
                  layerId: DEMO_LAYERS[0].id,
                  title: "Padang penggembalaan Blok C",
                  appearance: DEMO_LAYERS[0].appearance,
                  properties: { luas_ha: 12.4, kapasitas_ekor: 40, pengelola: "Kelompok Tani Makmur" },
                  geometry: null,
                })
              }
            >
              {"Simulasikan klik fitur"}
            </Button>
            <Button size={"sm"} variant={"glass"} onClick={clearFeatureInfo}>
              {"Reset"}
            </Button>
          </HStack>
        </MapSlot>
      </BaseMap>
    </MapFrame>
  );
};


// -------------------------------------------------------------------------------------
// Specs
// -------------------------------------------------------------------------------------

const MAP_IMPORT_ROOT = "@/design-system/components/map/map";

const MapDrawDemo = () => {
  // Stores
  const { isDrawing, start, cancel } = useMapDrawStore();

  return (
    <VStack w={"full"} gap={2} align={"stretch"}>
      <HStack gap={2}>
        <Button
          size={"sm"}
          variant={"solid"}
          colorPalette={isDrawing ? "red" : "blue"}
          onClick={() => (isDrawing ? cancel() : start("polygon"))}
        >
          {isDrawing ? "Batal Draw" : "Mulai Draw Polygon"}
        </Button>
        <Button size={"sm"} onClick={() => cancel()}>
          {"Reset Polygon"}
        </Button>
      </HStack>
      <MapFrame h={"420px"}>
        <Map layers={[]} />
      </MapFrame>
    </VStack>
  );
};

export const MAP_DOCS: Record<string, ComponentDocSpec> = {
  map: {
    key: "map",
    title: "Map",
    category: "Map",
    description:
      "Peta MapLibre lengkap: basemap, layer dari config, gambar poligon, info fitur, pencarian, kontrol, dan koordinat. Komponen ini generik: data domain dipasang lewat `layers`, dan kontrol layer lewat slot `layerManagement`.",
    importPath: `import { Map } from "${MAP_IMPORT_ROOT}/map";`,
    component: Map,
    defaultProps: {},
    propsSpec: [
      {
        name: "layers",
        type: "MapLayerConfig[]",
        required: true,
        description: "Layer WFS, WMS, raster, atau vector tile. `appearance` menentukan warna, ikon, dan label tiap layer.",
      },
      {
        name: "layerManagement",
        type: "ReactNode",
        description: "Kontrol layer di kanan atas, misalnya MapLayerManagementPanel berisi katalog layer app.",
      },
      {
        name: "onDrawFinish",
        type: "(feature, points) => void",
        description: "Dipanggil saat poligon selesai digambar.",
      },
      {
        name: "styleUrl",
        type: "string",
        description: "Ganti style basemap.",
      },
    ],
    generateCode: () => `<Map layers={[]} layerManagement={<DemoLayerManagement />} />`,
    renderPlayground: () => (
      <MapFrame h={"480px"}>
        <Map layers={[]} layerManagement={<DemoLayerManagement />} />
      </MapFrame>
    ),
  },




  map_draw_controls: {
    key: "map_draw_controls",
    title: "MapDrawControls",
    category: "Map",
    description:
      "Kontrol untuk menggambar poligon di peta, misalnya batas lahan. Hasil dikirim lewat `onDrawFinish` pada Map.",
    importPath: `import { MapDrawControls } from "${MAP_IMPORT_ROOT}/map.draw-controls";`,
    component: MapDrawControls,
    defaultProps: {},
    propsSpec: [],
    generateCode: () => `<MapDrawControls />`,
    renderPlayground: () => <MapDrawDemo />,
  },

  map_feature_info_panel: {
    key: "map_feature_info_panel",
    title: "MapFeatureInfoPanel",
    category: "Map",
    description:
      "Panel atribut fitur yang diklik di peta, dengan pencarian atribut dan zoom ke fitur. Warna dan label kategori mengikuti `appearance` layer asal fitur.",
    importPath: `import { MapFeatureInfoPanel } from "${MAP_IMPORT_ROOT}/map.feature-info-panel";`,
    component: MapFeatureInfoPanel,
    defaultProps: {},
    propsSpec: [],
    generateCode: () => `<MapFeatureInfoPanel
  feature={DEMO_FEATURE}
  onClose={() => {}}
/>`,
    renderPlayground: () => <FeatureInfoDemo />,
  },




};
