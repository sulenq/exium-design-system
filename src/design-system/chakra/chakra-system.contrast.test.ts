// src/design-system/chakra/chakra-system.contrast.test.ts

import { chakraSystem } from "@/design-system/chakra/chakra-system";
import { describe, expect, it } from "vitest";

// -------------------------------------------------------------------------------------
// Helpers: resolve a semantic token to hex and compute WCAG contrast
// -------------------------------------------------------------------------------------

function rawValue(name: string, condition: "base" | "_dark"): string {
  const token = chakraSystem.tokens.getByName(name);
  if (!token) throw new Error(`missing token ${name}`);
  const conditions = token.extensions.conditions as
    | Record<string, string>
    | undefined;
  const picked = conditions
    ? conditions[condition]
    : (token.originalValue as string);
  return picked.replace("!important", "").trim();
}

function resolveHex(name: string, condition: "base" | "_dark"): string {
  let value = rawValue(name, condition);
  for (let depth = 0; depth < 5 && value.startsWith("{"); depth += 1) {
    value = rawValue(value.slice(1, -1), condition);
  }
  if (value === "white") return "#ffffff";
  if (value === "black") return "#000000";
  return value;
}

function luminance(hex: string): number {
  const channels = hex
    .replace("#", "")
    .match(/.{2}/g)
    ?.map((part) => parseInt(part, 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  if (!channels) throw new Error(`bad hex ${hex}`);
  const [r, g, b] = channels;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// -------------------------------------------------------------------------------------
// Tests
// -------------------------------------------------------------------------------------

const TEXT_ON_WHITE = [
  "colors.fg.muted",
  "colors.fg.subtle",
  "colors.fg.error",
  "colors.fg.warning",
  "colors.fg.success",
  "colors.fg.info",
  "colors.green.fg",
  "colors.orange.fg",
  "colors.red.fg",
  "colors.blue.fg",
];

const SOLID_PAIRS: Array<[string, string]> = [
  ["colors.green.contrast", "colors.green.solid"],
  ["colors.orange.contrast", "colors.orange.solid"],
  ["colors.red.contrast", "colors.red.solid"],
  ["colors.blue.contrast", "colors.blue.solid"],
];

describe("light-mode contrast (WCAG AA, 4.5:1)", () => {
  const lightSurfaces = [
    "colors.bg.body",
    "colors.bg.panel",
    "colors.bg.subtle",
  ];

  it.each(TEXT_ON_WHITE)("%s on white", (name) => {
    expect(
      contrast(resolveHex(name, "base"), "#ffffff"),
    ).toBeGreaterThanOrEqual(4.5);
  });

  it.each(
    TEXT_ON_WHITE.flatMap((name) => lightSurfaces.map((bg) => [name, bg])),
  )("%s on %s", (fg, bg) => {
    expect(
      contrast(resolveHex(fg, "base"), resolveHex(bg, "base")),
    ).toBeGreaterThanOrEqual(4.5);
  });

  it.each(SOLID_PAIRS)("%s on %s", (fg, bg) => {
    expect(
      contrast(resolveHex(fg, "base"), resolveHex(bg, "base")),
    ).toBeGreaterThanOrEqual(4.5);
  });
});

describe("dark-mode contrast (WCAG AA, 4.5:1)", () => {
  const darkSurfaces = [
    "colors.bg.body",
    "colors.bg.panel",
    "colors.bg.subtle",
  ];

  it.each(
    TEXT_ON_WHITE.flatMap((name) => darkSurfaces.map((bg) => [name, bg])),
  )("%s on %s", (fg, bg) => {
    expect(
      contrast(resolveHex(fg, "_dark"), resolveHex(bg, "_dark")),
    ).toBeGreaterThanOrEqual(4.5);
  });

  it.each(SOLID_PAIRS)("%s on %s", (fg, bg) => {
    expect(
      contrast(resolveHex(fg, "_dark"), resolveHex(bg, "_dark")),
    ).toBeGreaterThanOrEqual(4.5);
  });
});

describe("light-mode values win over Chakra's _light defaults", () => {
  it.each(TEXT_ON_WHITE)("%s base is !important", (name) => {
    const conditions = chakraSystem.tokens.getByName(name)?.extensions
      .conditions as Record<string, string>;
    expect(conditions.base).toContain("!important");
  });
});
