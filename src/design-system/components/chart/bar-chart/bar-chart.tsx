// src/design-system/components/chart/bar-chart/bar-chart.tsx

import type { CartesianChartProps } from "@/design-system/components/chart/chart.type";
import { ChartTooltip, ChartTooltipContent } from "@/design-system/components/charts/chart-tooltip/chart-tooltip";
import { Chart, useChart } from "@chakra-ui/charts";
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export const BarChart = (props: CartesianChartProps) => {
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
        <RechartsBarChart data={chart.data}>
          {showGrid && (
            <CartesianGrid stroke={chart.color("border.muted")} vertical={false} />
          )}
          <XAxis
            axisLine={false}
            tickLine={false}
            dataKey={chart.key(xAxisKey)}
          />
          <YAxis axisLine={false} tickLine={false} />
          {showTooltip && (
            <ChartTooltip cursor={{ fill: chart.color("bg.muted") }} content={<ChartTooltipContent />} />
          )}
          {showLegend && <Legend content={<Chart.Legend />} />}
          {chart.series.map((item) => (
            <Bar
              key={item.name}
              isAnimationActive={false}
              dataKey={chart.key(item.name)}
              fill={chart.color(item.color)}
              radius={[4, 4, 0, 0]}
              stackId={item.stackId}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </Chart.Root>
  );
};

