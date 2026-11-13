// src/design-system/constants/units.ts

import type {
  QuantityDef,
  UnitQuantity,
} from "@/design-system/constants/types/units.type";

const linear = (factor: number) => ({
  toBase: (v: number) => v * factor,
  fromBase: (b: number) => b / factor,
});

export const UNIT_REGISTRY = {
  // 1. mass — base kg, allowNegative false. Defaults: metric kg, imperial lb
  mass: {
    base: "kg",
    allowNegative: false,
    defaults: { metric: "kg", imperial: "lb" },
    units: [
      { key: "mg", symbol: "mg", name: "Milligram", system: "metric", tier: "common", ...linear(1e-6) },
      { key: "g", symbol: "g", name: "Gram", system: "metric", tier: "common", ...linear(1e-3) },
      { key: "kg", symbol: "kg", name: "Kilogram", system: "metric", tier: "common", ...linear(1) },
      { key: "t", symbol: "t", name: "Metric Ton", system: "metric", tier: "common", ...linear(1000) },
      { key: "oz", symbol: "oz", name: "Ounce", system: "imperial", tier: "common", ...linear(0.028349523125) },
      { key: "lb", symbol: "lb", name: "Pound", system: "imperial", tier: "common", ...linear(0.45359237) },
    ],
  },

  // 2. length — base m, allowNegative false. Defaults: m / ft
  length: {
    base: "m",
    allowNegative: false,
    defaults: { metric: "m", imperial: "ft" },
    units: [
      { key: "mm", symbol: "mm", name: "Millimeter", system: "metric", tier: "common", ...linear(1e-3) },
      { key: "cm", symbol: "cm", name: "Centimeter", system: "metric", tier: "common", ...linear(1e-2) },
      { key: "m", symbol: "m", name: "Meter", system: "metric", tier: "common", ...linear(1) },
      { key: "km", symbol: "km", name: "Kilometer", system: "metric", tier: "common", ...linear(1e3) },
      { key: "in", symbol: "in", name: "Inch", system: "imperial", tier: "common", ...linear(0.0254) },
      { key: "ft", symbol: "ft", name: "Foot", system: "imperial", tier: "common", ...linear(0.3048) },
      { key: "yd", symbol: "yd", name: "Yard", system: "imperial", tier: "common", ...linear(0.9144) },
      { key: "mi", symbol: "mi", name: "Mile", system: "imperial", tier: "common", ...linear(1609.344) },
      { key: "um", symbol: "µm", name: "Micrometer", system: "metric", tier: "extended", ...linear(1e-6) },
    ],
  },

  // 3. area — base m2, allowNegative false. Defaults: m2 / ft2
  area: {
    base: "m2",
    allowNegative: false,
    defaults: { metric: "m2", imperial: "ft2" },
    units: [
      { key: "mm2", symbol: "mm²", name: "Square Millimeter", system: "metric", tier: "common", ...linear(1e-6) },
      { key: "cm2", symbol: "cm²", name: "Square Centimeter", system: "metric", tier: "common", ...linear(1e-4) },
      { key: "m2", symbol: "m²", name: "Square Meter", system: "metric", tier: "common", ...linear(1) },
      { key: "ha", symbol: "ha", name: "Hectare", system: "metric", tier: "common", ...linear(10000) },
      { key: "km2", symbol: "km²", name: "Square Kilometer", system: "metric", tier: "common", ...linear(1e6) },
      { key: "in2", symbol: "in²", name: "Square Inch", system: "imperial", tier: "common", ...linear(0.00064516) },
      { key: "ft2", symbol: "ft²", name: "Square Foot", system: "imperial", tier: "common", ...linear(0.09290304) },
      { key: "yd2", symbol: "yd²", name: "Square Yard", system: "imperial", tier: "common", ...linear(0.83612736) },
      { key: "ac", symbol: "ac", name: "Acre", system: "imperial", tier: "common", ...linear(4046.8564224) },
      { key: "mi2", symbol: "mi²", name: "Square Mile", system: "imperial", tier: "common", ...linear(2589988.110336) },
    ],
  },

  // 4. volume — base l, allowNegative false. Defaults: l / gal
  volume: {
    base: "l",
    allowNegative: false,
    defaults: { metric: "l", imperial: "gal" },
    units: [
      { key: "ml", symbol: "mL", name: "Milliliter", system: "metric", tier: "common", ...linear(1e-3) },
      { key: "l", symbol: "L", name: "Liter", system: "metric", tier: "common", ...linear(1) },
      { key: "m3", symbol: "m³", name: "Cubic Meter", system: "metric", tier: "common", ...linear(1000) },
      { key: "tsp", symbol: "tsp", name: "Teaspoon", system: "imperial", tier: "common", ...linear(0.00492892159375) },
      { key: "tbsp", symbol: "tbsp", name: "Tablespoon", system: "imperial", tier: "common", ...linear(0.01478676478125) },
      { key: "floz", symbol: "fl oz", name: "Fluid Ounce", system: "imperial", tier: "common", ...linear(0.0295735295625) },
      { key: "cup", symbol: "cup", name: "Cup", system: "imperial", tier: "common", ...linear(0.2365882365) },
      { key: "pt", symbol: "pt", name: "Pint", system: "imperial", tier: "common", ...linear(0.473176473) },
      { key: "qt", symbol: "qt", name: "Quart", system: "imperial", tier: "common", ...linear(0.946352946) },
      { key: "gal", symbol: "gal", name: "Gallon", system: "imperial", tier: "common", ...linear(3.785411784) },
      { key: "in3", symbol: "in³", name: "Cubic Inch", system: "imperial", tier: "extended", ...linear(0.016387064) },
      { key: "ft3", symbol: "ft³", name: "Cubic Foot", system: "imperial", tier: "extended", ...linear(28.316846592) },
    ],
  },

  // 5. temperature — base kelvin, allowNegative true. Defaults: celsius / fahrenheit
  temperature: {
    base: "kelvin",
    allowNegative: true,
    defaults: { metric: "celsius", imperial: "fahrenheit" },
    units: [
      {
        key: "celsius",
        symbol: "°C",
        name: "Celsius",
        system: "metric",
        tier: "common",
        toBase: (v: number) => v + 273.15,
        fromBase: (b: number) => b - 273.15,
      },
      {
        key: "fahrenheit",
        symbol: "°F",
        name: "Fahrenheit",
        system: "imperial",
        tier: "common",
        toBase: (v: number) => ((v - 32) * 5) / 9 + 273.15,
        fromBase: (b: number) => ((b - 273.15) * 9) / 5 + 32,
      },
      {
        key: "kelvin",
        symbol: "K",
        name: "Kelvin",
        system: "metric",
        tier: "common",
        toBase: (v: number) => v,
        fromBase: (b: number) => b,
      },
    ],
  },

  // 6. duration — base s, allowNegative false. Defaults: min / min
  duration: {
    base: "s",
    allowNegative: false,
    defaults: { metric: "min", imperial: "min" },
    units: [
      { key: "ms", symbol: "ms", name: "Millisecond", system: "neutral", tier: "common", ...linear(1e-3) },
      { key: "s", symbol: "s", name: "Second", system: "neutral", tier: "common", ...linear(1) },
      { key: "min", symbol: "min", name: "Minute", system: "neutral", tier: "common", ...linear(60) },
      { key: "h", symbol: "h", name: "Hour", system: "neutral", tier: "common", ...linear(3600) },
      { key: "d", symbol: "d", name: "Day", system: "neutral", tier: "common", ...linear(86400) },
      { key: "wk", symbol: "wk", name: "Week", system: "neutral", tier: "common", ...linear(604800) },
    ],
  },

  // 7. speed — base mps, allowNegative false. Defaults: kmh / mph
  speed: {
    base: "mps",
    allowNegative: false,
    defaults: { metric: "kmh", imperial: "mph" },
    units: [
      { key: "mps", symbol: "m/s", name: "Meters per second", system: "metric", tier: "common", ...linear(1) },
      { key: "kmh", symbol: "km/h", name: "Kilometers per hour", system: "metric", tier: "common", ...linear(1 / 3.6) },
      { key: "mph", symbol: "mph", name: "Miles per hour", system: "imperial", tier: "common", ...linear(0.44704) },
      { key: "fps", symbol: "ft/s", name: "Feet per second", system: "imperial", tier: "common", ...linear(0.3048) },
      { key: "knot", symbol: "kn", name: "Knot", system: "neutral", tier: "common", ...linear(1852 / 3600) },
    ],
  },

  // 8. data — base byte, allowNegative false. Defaults: mb / mb
  data: {
    base: "byte",
    allowNegative: false,
    defaults: { metric: "mb", imperial: "mb" },
    units: [
      { key: "byte", symbol: "B", name: "Byte", system: "neutral", tier: "common", ...linear(1) },
      { key: "kb", symbol: "KB", name: "Kilobyte", system: "neutral", tier: "common", ...linear(1e3) },
      { key: "mb", symbol: "MB", name: "Megabyte", system: "neutral", tier: "common", ...linear(1e6) },
      { key: "gb", symbol: "GB", name: "Gigabyte", system: "neutral", tier: "common", ...linear(1e9) },
      { key: "tb", symbol: "TB", name: "Terabyte", system: "neutral", tier: "common", ...linear(1e12) },
      { key: "pb", symbol: "PB", name: "Petabyte", system: "neutral", tier: "common", ...linear(1e15) },
      { key: "kib", symbol: "KiB", name: "Kibibyte", system: "neutral", tier: "extended", ...linear(1024) },
      { key: "mib", symbol: "MiB", name: "Mebibyte", system: "neutral", tier: "extended", ...linear(1048576) },
      { key: "gib", symbol: "GiB", name: "Gibibyte", system: "neutral", tier: "extended", ...linear(1073741824) },
      { key: "tib", symbol: "TiB", name: "Tebibyte", system: "neutral", tier: "extended", ...linear(1099511627776) },
    ],
  },

  // 9. pressure — base pa, allowNegative false. Defaults: kpa / psi
  pressure: {
    base: "pa",
    allowNegative: false,
    defaults: { metric: "kpa", imperial: "psi" },
    units: [
      { key: "pa", symbol: "Pa", name: "Pascal", system: "metric", tier: "common", ...linear(1) },
      { key: "kpa", symbol: "kPa", name: "Kilopascal", system: "metric", tier: "common", ...linear(1e3) },
      { key: "bar", symbol: "bar", name: "Bar", system: "metric", tier: "common", ...linear(1e5) },
      { key: "psi", symbol: "psi", name: "Pounds per square inch", system: "imperial", tier: "common", ...linear(6894.757293168) },
      { key: "atm", symbol: "atm", name: "Standard atmosphere", system: "neutral", tier: "common", ...linear(101325) },
      { key: "mmhg", symbol: "mmHg", name: "Millimeter of mercury", system: "neutral", tier: "common", ...linear(133.322387415) },
      { key: "mpa", symbol: "MPa", name: "Megapascal", system: "metric", tier: "extended", ...linear(1e6) },
      { key: "hpa", symbol: "hPa", name: "Hectopascal", system: "metric", tier: "extended", ...linear(100) },
    ],
  },

  // 10. energy — base j, allowNegative false. Defaults: kj / btu
  energy: {
    base: "j",
    allowNegative: false,
    defaults: { metric: "kj", imperial: "btu" },
    units: [
      { key: "j", symbol: "J", name: "Joule", system: "metric", tier: "common", ...linear(1) },
      { key: "kj", symbol: "kJ", name: "Kilojoule", system: "metric", tier: "common", ...linear(1e3) },
      { key: "kcal", symbol: "kcal", name: "Kilocalorie", system: "metric", tier: "common", ...linear(4184) },
      { key: "wh", symbol: "Wh", name: "Watt-hour", system: "metric", tier: "common", ...linear(3600) },
      { key: "kwh", symbol: "kWh", name: "Kilowatt-hour", system: "metric", tier: "common", ...linear(3.6e6) },
      { key: "btu", symbol: "BTU", name: "British thermal unit", system: "imperial", tier: "common", ...linear(1055.05585262) },
      { key: "cal", symbol: "cal", name: "Calorie", system: "metric", tier: "extended", ...linear(4.184) },
    ],
  },

  // 11. power — base w, allowNegative false. Defaults: kw / hp
  power: {
    base: "w",
    allowNegative: false,
    defaults: { metric: "kw", imperial: "hp" },
    units: [
      { key: "w", symbol: "W", name: "Watt", system: "metric", tier: "common", ...linear(1) },
      { key: "kw", symbol: "kW", name: "Kilowatt", system: "metric", tier: "common", ...linear(1e3) },
      { key: "hp", symbol: "hp", name: "Horsepower (mechanical)", system: "imperial", tier: "common", ...linear(745.69987158227) },
      { key: "mw", symbol: "MW", name: "Megawatt", system: "metric", tier: "extended", ...linear(1e6) },
    ],
  },

  // 12. angle — base deg, allowNegative true. Defaults: deg / deg
  angle: {
    base: "deg",
    allowNegative: true,
    defaults: { metric: "deg", imperial: "deg" },
    units: [
      { key: "deg", symbol: "°", name: "Degree", system: "neutral", tier: "common", ...linear(1) },
      { key: "rad", symbol: "rad", name: "Radian", system: "neutral", tier: "common", ...linear(180 / Math.PI) },
      { key: "turn", symbol: "turn", name: "Turn", system: "neutral", tier: "common", ...linear(360) },
      { key: "grad", symbol: "grad", name: "Gradian", system: "neutral", tier: "extended", ...linear(0.9) },
    ],
  },

  // 13. frequency — base hz, allowNegative false. Defaults: hz / hz
  frequency: {
    base: "hz",
    allowNegative: false,
    defaults: { metric: "hz", imperial: "hz" },
    units: [
      { key: "hz", symbol: "Hz", name: "Hertz", system: "neutral", tier: "common", ...linear(1) },
      { key: "khz", symbol: "kHz", name: "Kilohertz", system: "neutral", tier: "common", ...linear(1e3) },
      { key: "mhz", symbol: "MHz", name: "Megahertz", system: "neutral", tier: "common", ...linear(1e6) },
      { key: "ghz", symbol: "GHz", name: "Gigahertz", system: "neutral", tier: "common", ...linear(1e9) },
      { key: "rpm", symbol: "rpm", name: "Revolutions per minute", system: "neutral", tier: "common", ...linear(1 / 60) },
    ],
  },

  // 14. force — base n, allowNegative false. Defaults: n / lbf
  force: {
    base: "n",
    allowNegative: false,
    defaults: { metric: "n", imperial: "lbf" },
    units: [
      { key: "n", symbol: "N", name: "Newton", system: "metric", tier: "common", ...linear(1) },
      { key: "kn", symbol: "kN", name: "Kilonewton", system: "metric", tier: "common", ...linear(1e3) },
      { key: "lbf", symbol: "lbf", name: "Pound-force", system: "imperial", tier: "common", ...linear(4.4482216152605) },
      { key: "kgf", symbol: "kgf", name: "Kilogram-force", system: "metric", tier: "extended", ...linear(9.80665) },
    ],
  },

  // 15. count — base pcs, allowNegative false. Defaults: pcs / pcs
  count: {
    base: "pcs",
    allowNegative: false,
    defaults: { metric: "pcs", imperial: "pcs" },
    units: [
      { key: "pcs", symbol: "pcs", name: "Pieces", system: "neutral", tier: "common", ...linear(1) },
      { key: "dozen", symbol: "doz", name: "Dozen", system: "neutral", tier: "common", ...linear(12) },
      { key: "kodi", symbol: "kodi", name: "Kodi", system: "neutral", tier: "common", ...linear(20) },
      { key: "gross", symbol: "gross", name: "Gross", system: "neutral", tier: "common", ...linear(144) },
      { key: "ream", symbol: "ream", name: "Ream", system: "neutral", tier: "common", ...linear(500) },
    ],
  },
} as const satisfies Record<UnitQuantity, QuantityDef>;

