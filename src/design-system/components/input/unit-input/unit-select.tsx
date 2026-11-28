// src/design-system/components/input/unit-input/unit-select.tsx

import SelectInput from "@/design-system/components/input/select/select";
import type { UnitSelectProps } from "@/design-system/components/input/unit-input/unit-input.type";
import { HStack } from "@/design-system/components/layout/flex-box/flex-box";
import { P } from "@/design-system/components/typography/p/p";

/** Borderless unit selector used inside UnitInput. */
export function UnitSelect(props: UnitSelectProps) {
  // Props
  const {
    value,
    options,
    disabled = false,
    onValueChange,
    ...restProps
  } = props;

  return (
    // <Box
    //   w={"auto"}
    //   minW={"88px"}
    //   h={"full"}
    //   display={"flex"}
    //   alignItems={"center"}
    //   css={{
    //     "& [data-part='control'], & [data-part='trigger'], & button": {
    //       border: "none !important",
    //       borderWidth: "0 !important",
    //       borderColor: "transparent !important",
    //       boxShadow: "none !important",
    //       outline: "none !important",
    //       bg: "transparent !important",
    //       minH: "unset !important",
    //       ps: "1 !important",
    //       pe: "0 !important",
    //     },
    //     "& [data-part='trigger']:focus-visible": {
    //       outline:
    //         "2px solid var(--chakra-colors-border-emphasized) !important",
    //       outlineOffset: "2px",
    //     },
    //   }}
    // >
    <SelectInput
      value={value}
      options={options}
      clearable={false}
      disabled={disabled}
      floatingLabel={false}
      contentProps={{
        minW: "200px",
      }}
      renderOption={(opt) => (
        <HStack gap={3} align={"center"} flex={1} minW={0}>
          <P
            fontWeight={"semibold"}
            w={"48px"}
            whiteSpace={"nowrap"}
            textAlign={"start"}
          >
            {String(opt.symbol || "")}
          </P>

          <P
            color={"fg.muted"}
            textAlign={"start"}
            flex={1}
            minW={0}
            lineClamp={1}
          >
            {String(opt.name || opt.label)}
          </P>
        </HStack>
      )}
      onValueChange={(val) => {
        if (val) onValueChange(val);
      }}
      {...restProps}
    />
    // </Box>
  );
}
