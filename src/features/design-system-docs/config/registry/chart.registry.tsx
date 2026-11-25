// src/features/design-system-docs/config/registry/chart.registry.tsx

import { AreaChart } from "@/design-system/components/chart/area-chart/area-chart";
import { BarChart } from "@/design-system/components/chart/bar-chart/bar-chart";
import { BarList } from "@/design-system/components/chart/bar-list/bar-list";
import { DonutChart } from "@/design-system/components/chart/donut-chart/donut-chart";
import { LineChart } from "@/design-system/components/chart/line-chart/line-chart";
import { PieChart } from "@/design-system/components/chart/pie-chart/pie-chart";
import { RadarChart } from "@/design-system/components/chart/radar-chart/radar-chart";
import { ScatterChart } from "@/design-system/components/chart/scatter-chart/scatter-chart";
import { Sparkline } from "@/design-system/components/chart/sparkline/sparkline";
import {
  ChartTooltip,
  ChartTooltipContent,
} from "@/design-system/components/charts/chart-tooltip/chart-tooltip";
import { Box } from "@/design-system/components/layout/box/box";
import type { ComponentDocSpec } from "@/features/design-system-docs/types/ds-docs-spec.type";
import {
  Bar,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  XAxis,
} from "recharts";

const DEMO_SERIES_DATA = [
  { month: "Jan", produksi: 120, target: 100 },
  { month: "Feb", produksi: 145, target: 115 },
  { month: "Mar", produksi: 132, target: 125 },
  { month: "Apr", produksi: 168, target: 140 },
  { month: "Mei", produksi: 185, target: 155 },
  { month: "Jun", produksi: 210, target: 170 },
];

const DEMO_PIE_DATA = [
  { name: "Sapi Perah", value: 420, color: "blue.solid" },
  { name: "Sapi Potong", value: 280, color: "green.solid" },
  { name: "Kambing", value: 190, color: "orange.solid" },
  { name: "Domba", value: 110, color: "purple.solid" },
];

const DEMO_BAR_LIST_DATA = [
  { name: "Kandang Utama A", value: 450 },
  { name: "Kandang Utama B", value: 320 },
  { name: "Kandang Karantina", value: 180 },
  { name: "Kandang Pembibitan", value: 270 },
];

const DEMO_RADAR_DATA = [
  { metric: "Kesehatan", skor: 92 },
  { metric: "Pakan", skor: 85 },
  { metric: "Produksi", skor: 78 },
  { metric: "Kebersihan", skor: 88 },
  { metric: "Vaksinasi", skor: 95 },
];

const DEMO_SCATTER_DATA = [
  { umur: 6, berat: 140 },
  { umur: 9, berat: 210 },
  { umur: 12, berat: 280 },
  { umur: 15, berat: 345 },
  { umur: 18, berat: 410 },
  { umur: 24, berat: 510 },
];

const DEMO_WEIGHT_DATA = [
  { month: "Jan", berat: 310 },
  { month: "Feb", berat: 325 },
  { month: "Mar", berat: 342 },
  { month: "Apr", berat: 358 },
];

export const CHART_DOCS: Record<string, ComponentDocSpec> = {
  area_chart: {
    key: "area_chart",
    title: "Area Chart",
    category: "Chart",
    description:
      "Closed component AreaChart berbasis `@chakra-ui/charts` dan Recharts untuk memvisualisasikan tren data berkelanjutan.",
    importPath:
      'import { AreaChart } from "@/design-system/components/chart/area-chart/area-chart";',
    component: AreaChart,
    defaultProps: {
      showGrid: true,
      showLegend: false,
    },
    propsSpec: [
      {
        name: "data",
        type: "ChartDataRow[]",
        description: "Array data chart.",
      },
      {
        name: "series",
        type: "ChartSeriesItem[]",
        description: "Konfigurasi series (name, color, stackId).",
      },
      {
        name: "xAxisKey",
        type: "string",
        description: "Key data untuk sumbu X.",
      },
      {
        name: "showGrid",
        type: "boolean",
        defaultValue: true,
        description: "Tampilkan garis grid horizontal.",
        controlKind: "boolean",
      },
      {
        name: "showLegend",
        type: "boolean",
        defaultValue: false,
        description: "Tampilkan legend chart.",
        controlKind: "boolean",
      },
    ],
    renderPlayground: (props) => (
      <Box w={"full"} maxW={"560px"}>
        <AreaChart
          data={DEMO_SERIES_DATA}
          xAxisKey={"month"}
          series={[
            { name: "produksi", color: "blue.solid" },
            { name: "target", color: "teal.solid" },
          ]}
          showGrid={Boolean(props.showGrid)}
          showLegend={Boolean(props.showLegend)}
        />
      </Box>
    ),
  },

  bar_chart: {
    key: "bar_chart",
    title: "Bar Chart",
    category: "Chart",
    description:
      "Closed component BarChart berbasis `@chakra-ui/charts` dan Recharts untuk membandingkan nilai antar kategori.",
    importPath:
      'import { BarChart } from "@/design-system/components/chart/bar-chart/bar-chart";',
    component: BarChart,
    defaultProps: {
      showGrid: true,
      showLegend: false,
    },
    propsSpec: [
      {
        name: "data",
        type: "ChartDataRow[]",
        description: "Array data chart.",
      },
      {
        name: "series",
        type: "ChartSeriesItem[]",
        description: "Konfigurasi series (name, color, stackId).",
      },
      {
        name: "xAxisKey",
        type: "string",
        description: "Key data untuk sumbu X.",
      },
      {
        name: "showGrid",
        type: "boolean",
        defaultValue: true,
        description: "Tampilkan garis grid horizontal.",
        controlKind: "boolean",
      },
      {
        name: "showLegend",
        type: "boolean",
        defaultValue: false,
        description: "Tampilkan legend chart.",
        controlKind: "boolean",
      },
    ],
    renderPlayground: (props) => (
      <Box w={"full"} maxW={"560px"}>
        <BarChart
          data={DEMO_SERIES_DATA}
          xAxisKey={"month"}
          series={[
            { name: "produksi", color: "blue.solid" },
            { name: "target", color: "teal.solid" },
          ]}
          showGrid={Boolean(props.showGrid)}
          showLegend={Boolean(props.showLegend)}
        />
      </Box>
    ),
  },

  bar_list: {
    key: "bar_list",
    title: "Bar List",
    category: "Chart",
    description:
      "Closed component BarList berbasis `@chakra-ui/charts` untuk menampilkan peringkat nilai dalam bentuk bar horizontal.",
    importPath:
      'import { BarList } from "@/design-system/components/chart/bar-list/bar-list";',
    component: BarList,
    defaultProps: {
      colorPalette: "blue",
    },
    propsSpec: [
      {
        name: "data",
        type: "BarListItem[]",
        description: "Array item `{ name, value }`.",
      },
      {
        name: "colorPalette",
        type: "string",
        defaultValue: "blue",
        description: "Skema warna bar.",
        controlKind: "select",
        options: ["blue", "teal", "green", "orange", "purple"],
      },
    ],
    renderPlayground: (props) => (
      <Box w={"full"} maxW={"460px"}>
        <BarList
          data={DEMO_BAR_LIST_DATA}
          colorPalette={String(props.colorPalette || "blue")}
        />
      </Box>
    ),
  },

  chart_tooltip: {
    key: "chart_tooltip",
    title: "ChartTooltip",
    category: "Chart",
    description:
      "Tooltip Recharts dengan gaya Exium. Pasang `ChartTooltip` di dalam chart dan `ChartTooltipContent` sebagai `content`. Arahkan kursor ke batang untuk melihatnya.",
    importPath:
      'import { ChartTooltip, ChartTooltipContent } from "@/design-system/components/charts/chart-tooltip/chart-tooltip";',
    component: ChartTooltip,
    defaultProps: {},
    propsSpec: [
      {
        name: "content",
        type: "ReactElement",
        description: "Isi tooltip; pakai `<ChartTooltipContent />`.",
      },
      {
        name: "...TooltipProps",
        type: "Recharts TooltipProps",
        description: "Semua props Tooltip Recharts.",
      },
    ],
    renderPlayground: () => (
      <Box w={"full"} maxW={"420px"} h={"200px"}>
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <RechartsBarChart data={DEMO_WEIGHT_DATA}>
            <XAxis dataKey={"month"} tickLine={false} axisLine={false} />
            <ChartTooltip
              content={<ChartTooltipContent />}
              cursor={{ fillOpacity: 0.1 }}
            />
            <Bar
              dataKey={"berat"}
              name={"Berat (kg)"}
              fill={"var(--chakra-colors-green-600)"}
              radius={4}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </Box>
    ),
  },

  donut_chart: {
    key: "donut_chart",
    title: "Donut Chart",
    category: "Chart",
    description:
      "Closed component DonutChart berbasis `@chakra-ui/charts` dan Recharts untuk menampilkan proporsi data.",
    importPath:
      'import { DonutChart } from "@/design-system/components/chart/donut-chart/donut-chart";',
    component: DonutChart,
    defaultProps: {
      showLegend: true,
    },
    propsSpec: [
      {
        name: "data",
        type: "PieChartSegment[]",
        description: "Array segmen `{ name, value, color }`.",
      },
      {
        name: "showLegend",
        type: "boolean",
        defaultValue: true,
        description: "Tampilkan legend chart.",
        controlKind: "boolean",
      },
    ],
    renderPlayground: (props) => (
      <Box w={"full"} maxW={"420px"}>
        <DonutChart
          data={DEMO_PIE_DATA}
          showLegend={Boolean(props.showLegend)}
        />
      </Box>
    ),
  },

  line_chart: {
    key: "line_chart",
    title: "Line Chart",
    category: "Chart",
    description:
      "Closed component LineChart berbasis `@chakra-ui/charts` dan Recharts untuk memvisualisasikan tren garis.",
    importPath:
      'import { LineChart } from "@/design-system/components/chart/line-chart/line-chart";',
    component: LineChart,
    defaultProps: {
      showGrid: true,
      showLegend: false,
    },
    propsSpec: [
      {
        name: "data",
        type: "ChartDataRow[]",
        description: "Array data chart.",
      },
      {
        name: "series",
        type: "ChartSeriesItem[]",
        description: "Konfigurasi series (name, color).",
      },
      {
        name: "xAxisKey",
        type: "string",
        description: "Key data untuk sumbu X.",
      },
      {
        name: "showGrid",
        type: "boolean",
        defaultValue: true,
        description: "Tampilkan garis grid horizontal.",
        controlKind: "boolean",
      },
      {
        name: "showLegend",
        type: "boolean",
        defaultValue: false,
        description: "Tampilkan legend chart.",
        controlKind: "boolean",
      },
    ],
    renderPlayground: (props) => (
      <Box w={"full"} maxW={"560px"}>
        <LineChart
          data={DEMO_SERIES_DATA}
          xAxisKey={"month"}
          series={[
            { name: "produksi", color: "blue.solid" },
            { name: "target", color: "teal.solid" },
          ]}
          showGrid={Boolean(props.showGrid)}
          showLegend={Boolean(props.showLegend)}
        />
      </Box>
    ),
  },

  pie_chart: {
    key: "pie_chart",
    title: "Pie Chart",
    category: "Chart",
    description:
      "Closed component PieChart berbasis `@chakra-ui/charts` dan Recharts untuk menampilkan proporsi kategori.",
    importPath:
      'import { PieChart } from "@/design-system/components/chart/pie-chart/pie-chart";',
    component: PieChart,
    defaultProps: {
      showLegend: true,
    },
    propsSpec: [
      {
        name: "data",
        type: "PieChartSegment[]",
        description: "Array segmen `{ name, value, color }`.",
      },
      {
        name: "showLegend",
        type: "boolean",
        defaultValue: true,
        description: "Tampilkan legend chart.",
        controlKind: "boolean",
      },
    ],
    renderPlayground: (props) => (
      <Box w={"full"} maxW={"420px"}>
        <PieChart data={DEMO_PIE_DATA} showLegend={Boolean(props.showLegend)} />
      </Box>
    ),
  },

  radar_chart: {
    key: "radar_chart",
    title: "Radar Chart",
    category: "Chart",
    description:
      "Closed component RadarChart berbasis `@chakra-ui/charts` dan Recharts untuk membandingkan data multivariat.",
    importPath:
      'import { RadarChart } from "@/design-system/components/chart/radar-chart/radar-chart";',
    component: RadarChart,
    defaultProps: {
      showLegend: false,
    },
    propsSpec: [
      {
        name: "data",
        type: "ChartDataRow[]",
        description: "Array data chart.",
      },
      {
        name: "series",
        type: "ChartSeriesItem[]",
        description: "Konfigurasi series (name, color).",
      },
      {
        name: "angleKey",
        type: "string",
        description: "Key data untuk sumbu sudut.",
      },
      {
        name: "showLegend",
        type: "boolean",
        defaultValue: false,
        description: "Tampilkan legend chart.",
        controlKind: "boolean",
      },
    ],
    renderPlayground: (props) => (
      <Box w={"full"} maxW={"420px"}>
        <RadarChart
          data={DEMO_RADAR_DATA}
          angleKey={"metric"}
          series={[{ name: "skor", color: "teal.solid", label: "Skor" }]}
          showLegend={Boolean(props.showLegend)}
        />
      </Box>
    ),
  },

  scatter_chart: {
    key: "scatter_chart",
    title: "Scatter Chart",
    category: "Chart",
    description:
      "Closed component ScatterChart berbasis `@chakra-ui/charts` dan Recharts untuk menampilkan korelasi dua variabel numerik.",
    importPath:
      'import { ScatterChart } from "@/design-system/components/chart/scatter-chart/scatter-chart";',
    component: ScatterChart,
    defaultProps: {
      showGrid: true,
    },
    propsSpec: [
      {
        name: "data",
        type: "ChartDataRow[]",
        description: "Array data titik koordinat.",
      },
      {
        name: "xKey",
        type: "string",
        description: "Key data untuk sumbu X.",
      },
      {
        name: "yKey",
        type: "string",
        description: "Key data untuk sumbu Y.",
      },
      {
        name: "showGrid",
        type: "boolean",
        defaultValue: true,
        description: "Tampilkan garis grid.",
        controlKind: "boolean",
      },
    ],
    renderPlayground: (props) => (
      <Box w={"full"} maxW={"520px"}>
        <ScatterChart
          data={DEMO_SCATTER_DATA}
          xKey={"umur"}
          yKey={"berat"}
          name={"Pertumbuhan"}
          showGrid={Boolean(props.showGrid)}
        />
      </Box>
    ),
  },

  sparkline: {
    key: "sparkline",
    title: "Sparkline",
    category: "Chart",
    description:
      "Closed component Sparkline berbasis `@chakra-ui/charts` dan Recharts untuk grafik tren mini inline.",
    importPath:
      'import { Sparkline } from "@/design-system/components/chart/sparkline/sparkline";',
    component: Sparkline,
    defaultProps: {},
    propsSpec: [
      {
        name: "data",
        type: "ChartDataRow[]",
        description: "Array data sparkline.",
      },
      {
        name: "dataKey",
        type: "string",
        description: "Key nilai yang ditampilkan.",
      },
      {
        name: "color",
        type: "string",
        defaultValue: "blue.solid",
        description: "Token warna garis dan area.",
      },
    ],
    renderPlayground: () => (
      <Sparkline data={DEMO_SERIES_DATA} dataKey={"produksi"} />
    ),
  },
};

