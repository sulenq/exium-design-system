// src/design-system/components/chart/scatter-chart/scatter-chart.tsx

import type { ScatterChartProps } from "@/design-system/components/chart/chart.type";
import { ChartTooltip, ChartTooltipContent } from "@/design-system/components/charts/chart-tooltip/chart-tooltip";
import { Chart, useChart } from "@chakra-ui/charts";
import {
  CartesianGrid,
  Scatter,
  ScatterChart as RechartsScatterChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export const ScatterChart = (props: ScatterChartProps) => {
  // Props
  const {
    data,
    xKey,
    yKey,
    name = "Data",
    color = "blue.solid",
    height = "260px",
    showGrid = true,
    showTooltip = true,
  } = props;

  // Hooks
  const chart = useChart({
    data,
    series: [{ name, color }],
  });

  return (
    <Chart.Root w={"full"} h={height} chart={chart}>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <RechartsScatterChart>
          {showGrid && <CartesianGrid stroke={chart.color("border.muted")} />}
          <XAxis
            type={"number"}
            dataKey={chart.key(xKey)}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type={"number"}
            dataKey={chart.key(yKey)}
            axisLine={false}
            tickLine={false}
          />
          {showTooltip && (
            <ChartTooltip cursor={{ strokeDasharray: "3 3" }} content={<ChartTooltipContent />} />
          )}
          <Scatter
            isAnimationActive={false}
            name={name}
            data={chart.data}
            fill={chart.color(color)}
          />
        </RechartsScatterChart>
      </ResponsiveContainer>
    </Chart.Root>
  );
};

