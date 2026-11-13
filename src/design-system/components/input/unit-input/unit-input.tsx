// src/design-system/components/input/unit-input/unit-input.tsx

import { useFieldContextValue } from "@/design-system/components/input/context/field.context";
import { NumberInput } from "@/design-system/components/input/number-input/number-input";
import SelectInput from "@/design-system/components/input/select/select";
import type { SelectOption } from "@/design-system/components/input/select/select.type";
import type {
  Measurement,
  UnitInputProps,
  UnitInputValue,
} from "@/design-system/components/input/unit-input/unit-input.type";
import { Box } from "@/design-system/components/layout/box/box";
import { HStack } from "@/design-system/components/layout/flex-box/flex-box";
import { P } from "@/design-system/components/typography/p/p";
import { VISUALLY_HIDDEN_INPUT_STYLE } from "@/design-system/constants/css-preset";
import { UNIT_REGISTRY } from "@/design-system/constants/units";
import type {
  UnitOf,
  UnitQuantity,
} from "@/design-system/constants/types/units.type";
import { useMeasurementSystem } from "@/design-system/stores/measurement-store";
import {
  convertUnit,
  getDefaultUnit,
  getUnitDef,
  getUnitsForQuantity,
  toBase,
} from "@/shared/utils/unit/convert-unit";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

function isMeasurement<Q extends UnitQuantity>(
  val: number | Measurement<Q> | undefined,
): val is Measurement<Q> {
  return typeof val === "object" && val !== null && "unit" in val;
}

export function UnitInput<Q extends UnitQuantity>(props: UnitInputProps<Q>) {
  // Props
  const {
    quantity,
    units: whitelistUnits,
    unit: controlledUnit,
    defaultUnit,
    onUnitChange,
    unitChangeBehavior = "keep",
    onValueChange,
    min,
    max,
    step = 1,
    maxFractionDigits = 6,
    unitName,
    stepper = true,
    unitTriggerProps,
    value: controlledValue,
    defaultValue,
    name,
    inputProps,
    disabled = false,
    readOnly = false,
    ...restProps
  } = props;

  // Stores
  const measurementSystem = useMeasurementSystem();

  // Contexts
  const fieldContext = useFieldContextValue();
  const isFloatingVariant = fieldContext?.variant === "floating";
  const fieldLabel = fieldContext?.label;

  // Registry definitions
  const quantityDef = UNIT_REGISTRY[quantity];
  const baseUnit = quantityDef.base as UnitOf<Q>;

  // 1. Resolve Available Units
  const availableUnitDefs = useMemo(() => {
    if (whitelistUnits && whitelistUnits.length > 0) {
      return whitelistUnits.map((uKey) => getUnitDef(quantity, uKey));
    }
    return getUnitsForQuantity(quantity);
  }, [quantity, whitelistUnits]);

  const availableUnitKeys = useMemo(
    () => new Set(availableUnitDefs.map((u) => u.key as UnitOf<Q>)),
    [availableUnitDefs],
  );

  // 2. Unit Resolution Order (at mount)
  const resolveInitialUnit = useCallback((): UnitOf<Q> => {
    if (controlledUnit !== undefined) {
      if (availableUnitKeys.has(controlledUnit)) return controlledUnit;
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          `[UnitInput] Controlled unit "${controlledUnit}" is not in whitelist.`,
        );
      }
    }
    if (defaultUnit !== undefined) {
      if (availableUnitKeys.has(defaultUnit)) return defaultUnit;
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          `[UnitInput] defaultUnit "${defaultUnit}" is not in whitelist.`,
        );
      }
    }
    const storeDefault = getDefaultUnit(quantity, measurementSystem) as UnitOf<Q>;
    if (availableUnitKeys.has(storeDefault)) return storeDefault;

    return (availableUnitDefs[0]?.key ?? baseUnit) as UnitOf<Q>;
  }, [
    controlledUnit,
    defaultUnit,
    quantity,
    measurementSystem,
    availableUnitKeys,
    availableUnitDefs,
    baseUnit,
  ]);

  // State: Unit (Uncontrolled first, or controlled)
  const [internalUnit, setInternalUnit] = useState<UnitOf<Q>>(resolveInitialUnit);
  const currentUnit = controlledUnit !== undefined ? controlledUnit : internalUnit;

  // Refs for tracking values without re-rendering on typing
  const currentValueRef = useRef<number | null>(
    controlledValue !== undefined && controlledValue !== ""
      ? Number(controlledValue)
      : defaultValue !== undefined && defaultValue !== ""
        ? Number(defaultValue)
        : null,
  );
  const currentFormattedValueRef = useRef<string>(
    controlledValue !== undefined
      ? String(controlledValue)
      : defaultValue !== undefined
        ? String(defaultValue)
        : "",
  );

  // Conversion override for uncontrolled mode when unit changes with unitChangeBehavior="convert"
  const [convertedValue, setConvertedValue] = useState<string | null>(null);

  // Initial unit ref for form reset listener
  const initialUnitRef = useRef<UnitOf<Q>>(currentUnit);

  // Hidden unit input ref for form reset listener
  const hiddenUnitInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const inputEl = hiddenUnitInputRef.current;
    if (!inputEl || !inputEl.form) return;

    const form = inputEl.form;
    const handleReset = () => {
      const resetUnit = initialUnitRef.current;
      setInternalUnit(resetUnit);
      setConvertedValue(null);
    };

    form.addEventListener("reset", handleReset);
    return () => {
      form.removeEventListener("reset", handleReset);
    };
  }, []);

  // 3. Compute Boundaries (min / max)
  const resolvedMin = useMemo(() => {
    if (min !== undefined) {
      if (isMeasurement(min)) {
        // Round min UP so bound is never exceeded by rounding
        const converted = convertUnit(min.value, quantity, min.unit, currentUnit, {
          maxFractionDigits,
        });
        const factor = 10 ** maxFractionDigits;
        return Math.ceil(converted * factor) / factor;
      }
      return min;
    }
    // Default min
    if (quantity === "temperature") {
      if (currentUnit === "kelvin") return 0;
      if (currentUnit === "celsius") return -273.15;
      if (currentUnit === "fahrenheit") return -459.67;
      return 0;
    }
    if (!quantityDef.allowNegative) {
      return 0;
    }
    return undefined;
  }, [min, quantity, currentUnit, maxFractionDigits, quantityDef.allowNegative]);

  const resolvedMax = useMemo(() => {
    if (max !== undefined) {
      if (isMeasurement(max)) {
        // Round max DOWN so bound is never exceeded by rounding
        const converted = convertUnit(max.value, quantity, max.unit, currentUnit, {
          maxFractionDigits,
        });
        const factor = 10 ** maxFractionDigits;
        return Math.floor(converted * factor) / factor;
      }
      return max;
    }
    return undefined;
  }, [max, quantity, currentUnit, maxFractionDigits]);

  // 4. Emit Helper
  const emitChange = useCallback(
    (num: number | null, formatted: string, unitKey: UnitOf<Q>) => {
      currentValueRef.current = num;
      currentFormattedValueRef.current = formatted;

      const baseVal =
        num !== null ? toBase(num, quantity, unitKey) : null;

      const changeEvent: UnitInputValue<Q> = {
        value: num,
        formattedValue: formatted,
        unit: unitKey,
        baseValue: baseVal,
        baseUnit,
      };

      onValueChange?.(changeEvent);
    },
    [baseUnit, onValueChange, quantity],
  );

  // 5. Unit Change Handler
  const handleUnitSelect = useCallback(
    (newUnitKey: string) => {
      const nextUnit = newUnitKey as UnitOf<Q>;
      const prevUnit = currentUnit;
      if (nextUnit === prevUnit) return;

      onUnitChange?.(nextUnit, prevUnit);

      if (controlledUnit === undefined) {
        setInternalUnit(nextUnit);
      }

      const currentNum = currentValueRef.current;
      if (currentNum === null || Number.isNaN(currentNum)) {
        emitChange(null, "", nextUnit);
        return;
      }

      if (unitChangeBehavior === "convert") {
        let converted = convertUnit(
          currentNum,
          quantity,
          prevUnit,
          nextUnit,
          { maxFractionDigits },
        );

        // Clamp converted bounds if min/max exists
        let currentBoundMin: number | undefined;
        if (min !== undefined) {
          if (isMeasurement(min)) {
            const factor = 10 ** maxFractionDigits;
            currentBoundMin =
              Math.ceil(
                convertUnit(min.value, quantity, min.unit, nextUnit, {
                  maxFractionDigits,
                }) * factor,
              ) / factor;
          } else {
            currentBoundMin = min;
          }
        } else if (quantity === "temperature") {
          if (nextUnit === "kelvin") currentBoundMin = 0;
          else if (nextUnit === "celsius") currentBoundMin = -273.15;
          else if (nextUnit === "fahrenheit") currentBoundMin = -459.67;
        } else if (!quantityDef.allowNegative) {
          currentBoundMin = 0;
        }

        let currentBoundMax: number | undefined;
        if (max !== undefined) {
          if (isMeasurement(max)) {
            const factor = 10 ** maxFractionDigits;
            currentBoundMax =
              Math.floor(
                convertUnit(max.value, quantity, max.unit, nextUnit, {
                  maxFractionDigits,
                }) * factor,
              ) / factor;
          } else {
            currentBoundMax = max;
          }
        }

        if (currentBoundMin !== undefined && converted < currentBoundMin) {
          converted = currentBoundMin;
        }
        if (currentBoundMax !== undefined && converted > currentBoundMax) {
          converted = currentBoundMax;
        }

        const formatted = String(converted);
        setConvertedValue(formatted);
        emitChange(converted, formatted, nextUnit);
      } else {
        // "keep" mode
        emitChange(currentNum, currentFormattedValueRef.current, nextUnit);
      }
    },
    [
      currentUnit,
      onUnitChange,
      controlledUnit,
      unitChangeBehavior,
      emitChange,
      quantity,
      maxFractionDigits,
      min,
      quantityDef.allowNegative,
      max,
    ],
  );

  // 6. Number Input Value Change Handler
  const handleNumberChange = useCallback(
    (details: { value: number; formattedValue: string }) => {
      // Clear convertedValue override when user types/changes number
      setConvertedValue(null);
      const isNullOrEmpty =
        details.formattedValue === "" || Number.isNaN(details.value);
      const num = isNullOrEmpty ? null : details.value;
      currentValueRef.current = num;
      currentFormattedValueRef.current = details.formattedValue;

      emitChange(num, details.formattedValue, currentUnit);
    },
    [currentUnit, emitChange],
  );

  // 7. Select Options (Grouped by system unless whitelist `units` is provided)
  const unitOptions: SelectOption[] = useMemo(() => {
    if (whitelistUnits && whitelistUnits.length > 0) {
      // Honor order without grouping
      return availableUnitDefs.map((u) => ({
        value: u.key,
        label: `${u.symbol}  ${u.name}`,
        symbol: u.symbol,
        name: u.name,
      }));
    }

    const neutrals = availableUnitDefs.filter((u) => u.system === "neutral");
    const metrics = availableUnitDefs.filter((u) => u.system === "metric");
    const imperials = availableUnitDefs.filter((u) => u.system === "imperial");

    const activeGroup = measurementSystem === "imperial" ? imperials : metrics;
    const secondGroup = measurementSystem === "imperial" ? metrics : imperials;

    const ordered = [...neutrals, ...activeGroup, ...secondGroup];

    return ordered.map((u) => ({
      value: u.key,
      label: `${u.symbol}  ${u.name}`,
      symbol: u.symbol,
      name: u.name,
    }));
  }, [whitelistUnits, availableUnitDefs, measurementSystem]);

  const activeUnitDef = useMemo(
    () => getUnitDef(quantity, currentUnit),
    [quantity, currentUnit],
  );

  // Effective unit name for native form submission
  const resolvedUnitName = unitName ?? (name ? `${name}Unit` : undefined);

  // Unit Dropdown Trigger JSX (integrated seamlessly as endElement)
  const unitTriggerNode = (
    <HStack h={"full"} align={"center"} gap={0}>
      {/* 1px Vertical Divider between stepper and unit trigger */}
      <Box
        w={"1px"}
        h={isFloatingVariant ? "26px" : "20px"}
        bg={"border.muted"}
      />

      {/* Unit Select Dropdown */}
      <Box
        w={"auto"}
        minW={{ base: "72px", md: "110px" }}
        h={"full"}
        display={"flex"}
        alignItems={"center"}
        css={{
          "& .chakra-select__control, & [data-part='control'], & .chakra-select__trigger, & [data-part='trigger'], & button":
            {
              border: "none !important",
              borderWidth: "0 !important",
              borderColor: "transparent !important",
              boxShadow: "none !important",
              outline: "none !important",
              bg: "transparent !important",
              minH: "unset !important",
              h: "full",
              px: "8px",
              cursor: disabled || readOnly ? "default" : "pointer",
              _hover: {
                bg: disabled || readOnly ? "transparent" : "bg.muted",
              },
              _focus: {
                boxShadow: "none !important",
                border: "none !important",
                outline: "none !important",
              },
              _focusVisible: {
                boxShadow: "none !important",
                border: "none !important",
                outline: "none !important",
              },
            },
        }}
        {...(isFloatingVariant && {
          pt: "18px",
        })}
      >
        <SelectInput
          value={currentUnit}
          options={unitOptions}
          clearable={false}
          disabled={disabled || readOnly}
          contentProps={{
            minW: "220px",
            w: "auto",
          }}
          onValueChange={(val) => {
            if (val) handleUnitSelect(val);
          }}
          trigger={({ disabled: isTriggerDisabled }) => (
            <HStack
              gap={1}
              align={"center"}
              justify={"center"}
              w={"full"}
              h={"full"}
              title={activeUnitDef.name}
              aria-label={fieldLabel ? `${fieldLabel} unit` : "Unit"}
              opacity={isTriggerDisabled ? 0.6 : 1}
            >
              <P fontSize={"sm"} fontWeight={"medium"} userSelect={"none"}>
                {activeUnitDef.symbol}
              </P>
            </HStack>
          )}
          renderOption={(opt) => (
            <HStack w={"full"} justify={"space-between"} align={"center"} gap={3}>
              <P fontWeight={"semibold"} minW={"44px"} whiteSpace={"nowrap"}>
                {String(opt.symbol || "")}
              </P>
              <P color={"fg.muted"} whiteSpace={"nowrap"}>
                {String(opt.name || opt.label)}
              </P>
            </HStack>
          )}
          {...unitTriggerProps}
        />
      </Box>
    </HStack>
  );

  return (
    <>
      {resolvedUnitName && (
        <input
          ref={hiddenUnitInputRef}
          type={"text"}
          style={VISUALLY_HIDDEN_INPUT_STYLE}
          tabIndex={-1}
          aria-hidden={true}
          name={resolvedUnitName}
          value={currentUnit}
          readOnly={true}
        />
      )}

      <NumberInput
        name={name}
        inputProps={inputProps}
        disabled={disabled}
        readOnly={readOnly}
        min={resolvedMin}
        max={resolvedMax}
        step={step}
        stepper={stepper}
        stepperVariant={"borderless"}
        endElement={unitTriggerNode}
        endElementPlacement={"after-stepper"}
        {...(controlledValue !== undefined
          ? { value: String(controlledValue) }
          : convertedValue !== null
            ? { value: convertedValue }
            : {})}
        {...(defaultValue !== undefined && {
          defaultValue: defaultValue,
        })}
        onValueChange={handleNumberChange}
        {...restProps}
      />
    </>
  );
}

