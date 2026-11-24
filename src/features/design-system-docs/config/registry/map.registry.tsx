// src/features/design-system-docs/config/registry/map.registry.tsx

import { Button } from "@/design-system/components/button/button/button";
import { Box } from "@/design-system/components/layout/box/box";
import { HStack } from "@/design-system/components/layout/flex-box/flex-box";
import { BaseMap, Map } from "@/design-system/components/map/map/map";
import { MapAttribution } from "@/design-system/components/map/map/map.basemap-attribution";
import { MapControls } from "@/design-system/components/map/map/map.controls";
import { MapBasemapSelect } from "@/design-system/components/map/map/map.controls/map.basemap-select";
import { MapLayerManagementPanel } from "@/design-system/components/map/map/map.controls/map.layer-management-panel";
import { MapCoordinates } from "@/design-system/components/map/map/map.coordinates";
import { MapDrawControls } from "@/design-system/components/map/map/map.draw-controls";
import { MapFeatureInfoPanel } from "@/design-system/components/map/map/map.feature-info-panel";
import type { GenericMapLayer } from "@/design-system/components/map/map/map.layer-management.type";
import { MapOverlay } from "@/design-system/components/map/map/map.overlay";
import { MapSearch } from "@/design-system/components/map/map/map.search";
import { MapSymbologyPanel } from "@/design-system/components/map/map/map.symbology-panel";
import { useMapFeatureInfoStore } from "@/design-system/components/map/stores/map.feature-info.store";
import { useMapLayerStore } from "@/design-system/components/map/stores/map.layer.store";
import type { ComponentDocSpec } from "@/features/design-system-docs/types/ds-docs-spec.type";
import { Grid2X2Icon, Layers2Icon } from "lucide-react";
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
    appearance: { colorPalette: "green", icon: Grid2X2Icon, categoryLabel: "Area" },
  },
  {
    id: "demo:kandang",
    title: "Lokasi kandang",
    bbox: DEMO_BBOX,
    zIndex: 1,
    appearance: { colorPalette: "blue", icon: Layers2Icon, categoryLabel: "Titik" },
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
            <Button size={"sm"} variant={"outline"} onClick={clearFeatureInfo}>
              {"Reset"}
            </Button>
          </HStack>
        </MapSlot>
      </BaseMap>
    </MapFrame>
  );
};

const SymbologyDemo = () => {
  // Stores
  const setSymbologyLayerEnabled = useMapLayerStore((s) => s.setSymbologyLayerEnabled);

  return (
    <MapFrame>
      <BaseMap>
        <MapSlot top={4} left={4}>
          <Button
            size={"sm"}
            onClick={() => setSymbologyLayerEnabled(DEMO_LAYERS[0].id, true)}
          >
            {"Tampilkan legenda"}
          </Button>
        </MapSlot>
        <MapSlot top={"60px"} right={4}>
          <MapSymbologyPanel layers={DEMO_LAYERS} />
        </MapSlot>
      </BaseMap>
    </MapFrame>
  );
};

// -------------------------------------------------------------------------------------
// Specs
// -------------------------------------------------------------------------------------

const MAP_IMPORT_ROOT = "@/design-system/components/map/map";

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
    renderPlayground: () => (
      <MapFrame h={"480px"}>
        <Map layers={[]} layerManagement={<DemoLayerManagement />} />
      </MapFrame>
    ),
  },

  map_basemap: {
    key: "map_basemap",
    title: "MapBasemap",
    category: "Map",
    description:
      "BaseMap adalah engine peta (MapLibre) tanpa overlay. MapBasemapSelect mengganti gaya basemap; MapAttribution menampilkan atribusi sumber peta yang wajib dicantumkan.",
    importPath: `import { BaseMap } from "${MAP_IMPORT_ROOT}/map";\nimport { MapBasemapSelect } from "${MAP_IMPORT_ROOT}/map.controls/map.basemap-select";\nimport { MapAttribution } from "${MAP_IMPORT_ROOT}/map.basemap-attribution";`,
    component: BaseMap,
    defaultProps: {},
    propsSpec: [
      {
        name: "styleUrl",
        type: "string",
        description: "Style MapLibre. Default mengikuti pilihan di MapBasemapSelect.",
      },
      {
        name: "children",
        type: "ReactNode",
        description: "Overlay yang membaca instance peta dari store.",
      },
    ],
    renderPlayground: () => (
      <MapFrame>
        <BaseMap>
          <MapSlot top={4} right={4}>
            <HStack gap={2}>
              <MapBasemapSelect />
              <MapAttribution />
            </HStack>
          </MapSlot>
        </BaseMap>
      </MapFrame>
    ),
  },

  map_controls: {
    key: "map_controls",
    title: "MapControls",
    category: "Map",
    description:
      "Kontrol bawah peta: zoom, kompas (reset ke utara), lokasi saya, skala, dan tampilan 3D. Tiap kontrol juga diekspor terpisah (MapZoom, MapCompass, MapLocate, MapScale, Map3DToggle).",
    importPath: `import { MapControls } from "${MAP_IMPORT_ROOT}/map.controls";`,
    component: MapControls,
    defaultProps: {},
    propsSpec: [
      {
        name: "...StackProps",
        type: "StackProps",
        description: "Diteruskan ke container kontrol, misalnya `px` dan `pb`.",
      },
    ],
    a11y: {
      notes: "Setiap tombol punya `aria-label` terlokalisasi dan hit area 48 px di perangkat sentuh.",
    },
    renderPlayground: () => (
      <MapFrame>
        <BaseMap>
          <MapSlot bottom={0} left={0} right={0}>
            <MapControls px={4} pb={4} />
          </MapSlot>
        </BaseMap>
      </MapFrame>
    ),
  },

  map_layer_management: {
    key: "map_layer_management",
    title: "MapLayerManagement",
    category: "Map",
    description:
      "Panel daftar layer: nyala-mati, opasitas, urutan (drag), zoom ke layer, dan legenda. Generik terhadap tipe layer; warna, ikon, dan label kategori diambil dari `layer.appearance`.",
    importPath: `import { MapLayerManagementPanel } from "${MAP_IMPORT_ROOT}/map.controls/map.layer-management-panel";`,
    component: MapLayerManagementPanel,
    defaultProps: {},
    propsSpec: [
      {
        name: "layers",
        type: "T[] (T extends GenericMapLayer)",
        required: true,
        description: "Daftar layer yang dikelola.",
      },
      {
        name: "title",
        type: "string",
        required: true,
        description: "Judul panel.",
      },
      {
        name: "isLoading / isError / onRetry",
        type: "boolean / boolean / () => void",
        description: "State saat daftar layer sedang dimuat atau gagal dimuat.",
      },
      {
        name: "showSymbology",
        type: "boolean",
        description: "Tampilkan tombol legenda per layer.",
      },
      {
        name: "onToggleLayer / onFlyToLayer",
        type: "(layer: T, ...) => void",
        description: "Callback tambahan saat layer dinyalakan atau di-zoom.",
      },
    ],
    renderPlayground: () => (
      <MapFrame>
        <BaseMap>
          <MapSlot top={4} right={4}>
            <DemoLayerManagement />
          </MapSlot>
        </BaseMap>
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
    renderPlayground: () => (
      <MapFrame>
        <BaseMap>
          <MapSlot top={4} left={4}>
            <MapDrawControls />
          </MapSlot>
        </BaseMap>
      </MapFrame>
    ),
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
    renderPlayground: () => <FeatureInfoDemo />,
  },

  map_search: {
    key: "map_search",
    title: "MapSearch",
    category: "Map",
    description:
      "Pencarian lokasi (geocoding) yang memindahkan kamera peta ke hasil yang dipilih.",
    importPath: `import { MapSearch } from "${MAP_IMPORT_ROOT}/map.search";`,
    component: MapSearch,
    defaultProps: {},
    propsSpec: [],
    renderPlayground: () => (
      <MapFrame>
        <BaseMap>
          <MapSlot top={4} left={4}>
            <MapSearch />
          </MapSlot>
        </BaseMap>
      </MapFrame>
    ),
  },

  map_symbology_panel: {
    key: "map_symbology_panel",
    title: "MapSymbologyPanel",
    category: "Map",
    description:
      "Legenda layer dari WMS GetLegendGraphic. Datanya masuk lewat `layers`; panel hanya menampilkan layer yang legendanya dinyalakan di layer store. Di demo ini layer tidak punya WMS, jadi panel menampilkan state gagal dan tombol coba lagi.",
    importPath: `import { MapSymbologyPanel } from "${MAP_IMPORT_ROOT}/map.symbology-panel";`,
    component: MapSymbologyPanel,
    defaultProps: {},
    propsSpec: [
      {
        name: "layers",
        type: "GenericMapLayer[]",
        required: true,
        description: "Layer yang legendanya bisa ditampilkan.",
      },
    ],
    renderPlayground: () => <SymbologyDemo />,
  },

  map_coordinates: {
    key: "map_coordinates",
    title: "MapCoordinates",
    category: "Map",
    description:
      "Indikator koordinat titik tengah peta. Geser peta untuk melihat koordinat berubah.",
    importPath: `import { MapCoordinates } from "${MAP_IMPORT_ROOT}/map.coordinates";`,
    component: MapCoordinates,
    defaultProps: {},
    propsSpec: [],
    renderPlayground: () => (
      <MapFrame>
        <BaseMap>
          <MapCoordinates />
        </BaseMap>
      </MapFrame>
    ),
  },

  map_overlay: {
    key: "map_overlay",
    title: "MapOverlay",
    category: "Map",
    description:
      "Tata letak overlay standar di atas BaseMap: pencarian di kiri atas, slot `layerManagement` dan atribusi di kanan atas, info fitur, koordinat, dan kontrol di bawah. Dipakai oleh Map.",
    importPath: `import { MapOverlay } from "${MAP_IMPORT_ROOT}/map.overlay";`,
    component: MapOverlay,
    defaultProps: {},
    propsSpec: [
      {
        name: "layerManagement",
        type: "ReactNode",
        description: "Kontrol layer di kanan atas.",
      },
    ],
    renderPlayground: () => (
      <MapFrame>
        <BaseMap>
          <MapOverlay layerManagement={<DemoLayerManagement />} />
        </BaseMap>
      </MapFrame>
    ),
  },
};
