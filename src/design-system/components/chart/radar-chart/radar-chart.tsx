// src/design-system/components/chart/radar-chart/radar-chart.tsx

import type { RadarChartProps } from "@/design-system/components/chart/chart.type";
import { Chart, useChart } from "@chakra-ui/charts";
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as RechartsRadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export const RadarChart = (props: RadarChartProps) => {
  // Props
  const {
    data,
    series,
    angleKey,
    height = "260px",
    showLegend = false,
    showTooltip = true,
  } = props;

  // Hooks
  const chart = useChart({ data, series });

  return (
    <Chart.Root w={"full"} h={height} chart={chart}>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <RechartsRadarChart data={chart.data}>
          <PolarGrid stroke={chart.color("border")} />
          <PolarAngleAxis dataKey={chart.key(angleKey)} />
          <PolarRadiusAxis />
          {showTooltip && <Tooltip content={<Chart.Tooltip />} />}
          {showLegend && <Legend content={<Chart.Legend />} />}
          {chart.series.map((item) => (
            <Radar
              key={item.name}
              isAnimationActive={false}
              name={String(item.label ?? item.name)}
              dataKey={chart.key(item.name)}
              stroke={chart.color(item.color)}
              fill={chart.color(item.color)}
              fillOpacity={0.25}
            />
          ))}
        </RechartsRadarChart>
      </ResponsiveContainer>
    </Chart.Root>
  );
};

