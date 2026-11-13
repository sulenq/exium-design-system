// src/design-system/components/input/unit-input/unit-input.type.ts

import type { NumberInputProps } from "@/design-system/components/input/number-input/number-input.type";
import type { SelectProps } from "@/design-system/components/input/select/select.type";
import type {
  UnitOf,
  UnitQuantity,
} from "@/design-system/constants/types/units.type";

export type Measurement<Q extends UnitQuantity> = {
  value: number;
  unit: UnitOf<Q>;
};

export type UnitInputValue<Q extends UnitQuantity> = {
  value: number | null; // number in the CURRENT unit; null when empty
  formattedValue: string; // what the text field shows
  unit: UnitOf<Q>;
  baseValue: number | null; // same measurement in the quantity's base unit; null when empty
  baseUnit: UnitOf<Q>;
};

export type UnitInputProps<Q extends UnitQuantity> = Omit<
  NumberInputProps,
  "onValueChange" | "min" | "max" | "step"
> & {
  quantity: Q; // REQUIRED
  units?: UnitOf<Q>[]; // whitelist + order. Default: all "common" units of Q
  unit?: UnitOf<Q>; // controlled unit
  defaultUnit?: UnitOf<Q>; // uncontrolled initial unit
  onUnitChange?: (unit: UnitOf<Q>, prevUnit: UnitOf<Q>) => void;
  unitChangeBehavior?: "keep" | "convert"; // default "keep"
  onValueChange?: (v: UnitInputValue<Q>) => void;
  min?: number | Measurement<Q>; // number = literal in the current unit
  max?: number | Measurement<Q>;
  step?: number; // default 1
  maxFractionDigits?: number; // default 6, used for conversion rounding
  unitName?: string; // hidden input name for the unit. Default `${name}Unit`
  stepper?: boolean; // default true
  unitTriggerProps?: Partial<SelectProps>;
};

