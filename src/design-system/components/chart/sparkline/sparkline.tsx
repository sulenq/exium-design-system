// src/design-system/components/chart/sparkline/sparkline.tsx

import type { SparklineProps } from "@/design-system/components/chart/chart.type";
import { Chart, useChart } from "@chakra-ui/charts";
import { Area, AreaChart as RechartsAreaChart, ResponsiveContainer } from "recharts";

export const Sparkline = (props: SparklineProps) => {
  // Props
  const {
    data,
    dataKey,
    color = "blue.solid",
    height = "60px",
    width = "200px",
  } = props;

  // Hooks
  const chart = useChart({
    data,
    series: [{ name: dataKey, color }],
  });

  return (
    <Chart.Root w={width} h={height} chart={chart}>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <RechartsAreaChart data={chart.data}>
          <Area
            type={"monotone"}
            isAnimationActive={false}
            dataKey={chart.key(dataKey)}
            fill={chart.color(color)}
            fillOpacity={0.2}
            stroke={chart.color(color)}
            strokeWidth={2}
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </Chart.Root>
  );
};

