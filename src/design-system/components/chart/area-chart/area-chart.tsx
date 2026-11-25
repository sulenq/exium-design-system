// src/design-system/components/chart/area-chart/area-chart.tsx

import type { CartesianChartProps } from "@/design-system/components/chart/chart.type";
import { Chart, useChart } from "@chakra-ui/charts";
import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const AreaChart = (props: CartesianChartProps) => {
  // Props
  const {
    data,
    series,
    xAxisKey,
    height = "260px",
    showGrid = true,
    showLegend = false,
    showTooltip = true,
  } = props;

  // Hooks
  const chart = useChart({ data, series });

  return (
    <Chart.Root w={"full"} h={height} chart={chart}>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <RechartsAreaChart data={chart.data}>
          {showGrid && (
            <CartesianGrid
              stroke={chart.color("border.muted")}
              vertical={false}
            />
          )}
          <XAxis
            axisLine={false}
            tickLine={false}
            dataKey={chart.key(xAxisKey)}
          />
          <YAxis axisLine={false} tickLine={false} />
          {showTooltip && (
            <Tooltip cursor={false} content={<Chart.Tooltip />} />
          )}
          {showLegend && <Legend content={<Chart.Legend />} />}
          {chart.series.map((item) => (
            <Area
              key={item.name}
              type={"monotone"}
              isAnimationActive={false}
              dataKey={chart.key(item.name)}
              fill={chart.color(item.color)}
              fillOpacity={0.2}
              stroke={chart.color(item.color)}
              strokeWidth={2}
              stackId={item.stackId}
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </Chart.Root>
  );
};
