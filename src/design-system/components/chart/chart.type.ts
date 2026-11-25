// src/design-system/components/chart/chart.type.ts

import type { BarListData } from "@chakra-ui/charts";

export type ChartSeriesItem = {
  name: string;
  color: string;
  label?: string;
  stackId?: string;
};

export type ChartDataRow = Record<string, string | number>;

export type CartesianChartProps = {
  data: ChartDataRow[];
  series: ChartSeriesItem[];
  xAxisKey: string;
  height?: string | number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
};

export type PieChartSegment = {
  name: string;
  value: number;
  color: string;
};

export type PieChartProps = {
  data: PieChartSegment[];
  height?: string | number;
  showLegend?: boolean;
  showTooltip?: boolean;
  innerRadius?: number | string;
  outerRadius?: number | string;
};

export type BarListProps = {
  data: BarListData[];
  colorPalette?: string;
  height?: string | number;
};

export type RadarChartProps = {
  data: ChartDataRow[];
  series: ChartSeriesItem[];
  angleKey: string;
  height?: string | number;
  showLegend?: boolean;
  showTooltip?: boolean;
};

export type ScatterChartProps = {
  data: ChartDataRow[];
  xKey: string;
  yKey: string;
  name?: string;
  color?: string;
  height?: string | number;
  showGrid?: boolean;
  showTooltip?: boolean;
};

export type SparklineProps = {
  data: ChartDataRow[];
  dataKey: string;
  color?: string;
  height?: string | number;
  width?: string | number;
};

