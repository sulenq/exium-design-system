// src/design-system/components/chart/donut-chart/donut-chart.tsx

import type { PieChartProps } from "@/design-system/components/chart/chart.type";
import { ChartTooltip, ChartTooltipContent } from "@/design-system/components/charts/chart-tooltip/chart-tooltip";
import { Chart, useChart } from "@chakra-ui/charts";
import { Cell, Legend, Pie, PieChart as RechartsPieChart, ResponsiveContainer } from "recharts";

export const DonutChart = (props: PieChartProps) => {
  // Props
  const {
    data,
    height = "260px",
    showLegend = true,
    showTooltip = true,
    innerRadius = 56,
    outerRadius = 90,
  } = props;

  // Hooks
  const chart = useChart({ data });

  return (
    <Chart.Root w={"full"} h={height} chart={chart}>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <RechartsPieChart>
          {showTooltip && (
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          )}
          {showLegend && <Legend content={<Chart.Legend />} />}
          <Pie
            isAnimationActive={false}
            data={chart.data}
            dataKey={chart.key("value")}
            nameKey={"name"}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={2}
          >
            {chart.data.map((item) => (
              <Cell key={item.name} fill={chart.color(item.color)} />
            ))}
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>
    </Chart.Root>
  );
};

