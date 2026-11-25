// src/design-system/components/chart/pie-chart/pie-chart.tsx

import type { PieChartProps } from "@/design-system/components/chart/chart.type";
import { Chart, useChart } from "@chakra-ui/charts";
import { Cell, Legend, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip } from "recharts";

export const PieChart = (props: PieChartProps) => {
  // Props
  const {
    data,
    height = "260px",
    showLegend = true,
    showTooltip = true,
    innerRadius = 0,
    outerRadius = 90,
  } = props;

  // Hooks
  const chart = useChart({ data });

  return (
    <Chart.Root w={"full"} h={height} chart={chart}>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <RechartsPieChart>
          {showTooltip && (
            <Tooltip cursor={false} content={<Chart.Tooltip hideLabel />} />
          )}
          {showLegend && <Legend content={<Chart.Legend />} />}
          <Pie
            isAnimationActive={false}
            data={chart.data}
            dataKey={chart.key("value")}
            nameKey={"name"}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
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

