// src/shared/utils/unit/unit-i18n.ts

import type { UnitQuantity } from "@/design-system/constants/types/units.type";
import { UNIT_REGISTRY } from "@/design-system/constants/units";
import { getLocale } from "@/shared/libs/i18n";

/**
 * Indonesian localization map for unit display names.
 * English names are directly taken from UNIT_REGISTRY[quantity].units.name as default.
 */
const ID_UNIT_NAMES: Partial<Record<string, string>> = {
  // mass
  "mass.mg": "Miligram",
  "mass.g": "Gram",
  "mass.kg": "Kilogram",
  "mass.t": "Ton Metrik",
  "mass.oz": "Ons",
  "mass.lb": "Pon",

  // length
  "length.mm": "Milimeter",
  "length.cm": "Sentimeter",
  "length.m": "Meter",
  "length.km": "Kilometer",
  "length.in": "Inci",
  "length.ft": "Kaki",
  "length.yd": "Yard",
  "length.mi": "Mil",
  "length.um": "Mikrometer",

  // area
  "area.mm2": "Milimeter Persegi",
  "area.cm2": "Sentimeter Persegi",
  "area.m2": "Meter Persegi",
  "area.ha": "Hektare",
  "area.km2": "Kilometer Persegi",
  "area.in2": "Inci Persegi",
  "area.ft2": "Kaki Persegi",
  "area.yd2": "Yard Persegi",
  "area.ac": "Akar",
  "area.mi2": "Mil Persegi",

  // volume
  "volume.ml": "Mililiter",
  "volume.l": "Liter",
  "volume.m3": "Meter Kubik",
  "volume.tsp": "Sendok Teh",
  "volume.tbsp": "Sendok Makan",
  "volume.floz": "Ons Cair",
  "volume.cup": "Cangkir",
  "volume.pt": "Pint",
  "volume.qt": "Kuart",
  "volume.gal": "Galon",
  "volume.in3": "Inci Kubik",
  "volume.ft3": "Kaki Kubik",

  // temperature
  "temperature.celsius": "Celsius",
  "temperature.fahrenheit": "Fahrenheit",
  "temperature.kelvin": "Kelvin",

  // duration
  "duration.ms": "Milidetik",
  "duration.s": "Detik",
  "duration.min": "Menit",
  "duration.h": "Jam",
  "duration.d": "Hari",
  "duration.wk": "Minggu",

  // speed
  "speed.mps": "Meter per detik",
  "speed.kmh": "Kilometer per jam",
  "speed.mph": "Mil per jam",
  "speed.knot": "Knot",
  "speed.fps": "Kaki per detik",

  // data
  "data.b": "Bita (Byte)",
  "data.kb": "Kilobita",
  "data.mb": "Megabita",
  "data.gb": "Gigabita",
  "data.tb": "Terabita",
  "data.pb": "Petabita",
  "data.kib": "Kibibita",
  "data.mib": "Mebibita",
  "data.gib": "Gibibita",
  "data.tib": "Tebibita",

  // pressure
  "pressure.pa": "Pascal",
  "pressure.hpa": "Hektopascal",
  "pressure.kpa": "Kilopascal",
  "pressure.mpa": "Megapascal",
  "pressure.bar": "Bar",
  "pressure.psi": "Pon per inci persegi (PSI)",
  "pressure.atm": "Atmosfer standar",
  "pressure.mmhg": "Milimeter air raksa (mmHg)",

  // energy
  "energy.j": "Joule",
  "energy.kj": "Kilojoule",
  "energy.cal": "Kalori",
  "energy.kcal": "Kilokalori",
  "energy.wh": "Watt-jam",
  "energy.kwh": "Kilowatt-jam",
  "energy.btu": "Unit termal Britania (BTU)",

  // power
  "power.w": "Watt",
  "power.kw": "Kilowatt",
  "power.mw": "Megawatt",
  "power.hp": "Daya kuda (HP)",

  // angle
  "angle.deg": "Derajat",
  "angle.rad": "Radian",
  "angle.grad": "Gradian",
  "angle.turn": "Putaran",

  // frequency
  "frequency.hz": "Hertz",
  "frequency.khz": "Kilohertz",
  "frequency.mhz": "Megahertz",
  "frequency.ghz": "Gigahertz",
  "frequency.rpm": "Putaran per menit (RPM)",

  // force
  "force.n": "Newton",
  "force.kn": "Kilonewton",
  "force.lbf": "Gaya-pon (lbf)",
  "force.kgf": "Gaya-kilogram (kgf)",

  // count
  "count.pcs": "Buah (Pcs)",
  "count.dozen": "Lusin",
  "count.kodi": "Kodi",
  "count.gross": "Gross",
  "count.ream": "Rim",
};

/**
 * Returns localized name for a specific physical quantity and unit key.
 *
 * @param quantity Physical quantity (e.g. "mass", "duration", "temperature")
 * @param unitKey Unit identifier (e.g. "kg", "h", "celsius")
 * @param locale Optional locale code (defaults to current active locale from Paraglide)
 */
export function getLocalizedUnitName(
  quantity: UnitQuantity,
  unitKey: string,
  locale?: string,
): string {
  const activeLocale = locale ?? getLocale();
  const quantityDef = UNIT_REGISTRY[quantity];
  const unitDef = quantityDef?.units.find((u) => u.key === unitKey);
  const defaultEnglishName = unitDef?.name ?? unitKey;

  if (activeLocale?.startsWith("id")) {
    const specificKey = `${quantity}.${unitKey}`;
    return ID_UNIT_NAMES[specificKey] ?? defaultEnglishName;
  }

  return defaultEnglishName;
}

