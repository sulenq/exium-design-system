// src/design-system/components/chart/bar-list/bar-list.tsx

import type { BarListProps } from "@/design-system/components/chart/chart.type";
import { BarList as ChakraBarList, useChart } from "@chakra-ui/charts";

export const BarList = (props: BarListProps) => {
  // Props
  const { data, colorPalette = "blue", height } = props;

  // Hooks
  const chart = useChart({
    sort: { by: "value", direction: "desc" },
    data,
    series: [{ name: "name", color: `${colorPalette}.subtle` }],
  });

  return (
    <ChakraBarList.Root chart={chart} h={height}>
      <ChakraBarList.Content>
        <ChakraBarList.Bar />
        <ChakraBarList.Value />
      </ChakraBarList.Content>
    </ChakraBarList.Root>
  );
};

