// src/scripts/generate-tokens.ts

import fs from "node:fs";
import path from "node:path";
import { theme } from "../design-system-v2/constants/theme.ts";

function generateTokens() {
  const rootVars: string[] = [];
  const darkVars: string[] = [];
  const themeVars: string[] = [];

  // 1. Breakpoints
  if (theme.breakpoints) {
    for (const [bp, val] of Object.entries(theme.breakpoints)) {
      themeVars.push(`  --breakpoint-${bp}: ${val};`);
    }
  }

  const tokens = theme.tokens as Record<string, Record<string, unknown>>;
  if (!tokens) return;

  // 2. Colors
  const colors = tokens.colors;
  if (colors) {
    for (const [colorGroup, groupVal] of Object.entries(colors)) {
      if (typeof groupVal === "object" && groupVal !== null) {
        if ("value" in groupVal) {
          const val = String((groupVal as { value: string }).value);
          const kebab = colorGroup.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
          rootVars.push(`  --colors-${kebab}: ${val};`);
          themeVars.push(`  --color-${kebab}: var(--colors-${kebab});`);
        } else {
          for (const [shade, shadeObj] of Object.entries(groupVal as Record<string, { value: string }>)) {
            if (shadeObj && typeof shadeObj === "object" && "value" in shadeObj) {
              const val = String(shadeObj.value);
              const kebabGroup = colorGroup.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
              rootVars.push(`  --colors-${kebabGroup}-${shade}: ${val};`);
              themeVars.push(`  --color-${kebabGroup}-${shade}: var(--colors-${kebabGroup}-${shade});`);
            }
          }
        }
      }
    }
  }

  // 3. Fonts
  const fonts = tokens.fonts;
  if (fonts) {
    for (const [key, obj] of Object.entries(fonts)) {
      if (obj && typeof obj === "object" && "value" in obj) {
        const val = String((obj as { value: string }).value);
        rootVars.push(`  --font-${key}: ${val};`);
        themeVars.push(`  --font-${key}: var(--font-${key});`);
      }
    }
  }

  // 4. Font Sizes
  const fontSizes = tokens.fontSizes;
  if (fontSizes) {
    for (const [key, obj] of Object.entries(fontSizes)) {
      if (obj && typeof obj === "object" && "value" in obj) {
        const val = String((obj as { value: string }).value);
        rootVars.push(`  --text-${key}: ${val};`);
        themeVars.push(`  --text-${key}: var(--text-${key});`);
      }
    }
  }

  // 5. Font Weights
  const fontWeights = tokens.fontWeights;
  if (fontWeights) {
    for (const [key, obj] of Object.entries(fontWeights)) {
      if (obj && typeof obj === "object" && "value" in obj) {
        const val = String((obj as { value: string }).value);
        rootVars.push(`  --font-weight-${key}: ${val};`);
        themeVars.push(`  --font-weight-${key}: var(--font-weight-${key});`);
      }
    }
  }

  // 6. Durations
  const durations = tokens.durations;
  if (durations) {
    for (const [key, obj] of Object.entries(durations)) {
      if (obj && typeof obj === "object" && "value" in obj) {
        const val = String((obj as { value: string }).value);
        rootVars.push(`  --duration-${key}: ${val};`);
        themeVars.push(`  --duration-${key}: var(--duration-${key});`);
      }
    }
  }

  // 7. Semantic Tokens
  const semTokens = (theme.semanticTokens as Record<string, unknown>)?.colors as Record<string, unknown>;
  if (semTokens) {
    function resolveRef(val: string): string {
      return val
        .replace(/\{colors\.([a-zA-Z0-9.]+)\}/g, (_, pathStr: string) => {
          const parts = pathStr.split(".").map((p: string) => p.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase());
          return `var(--colors-${parts.join("-")})`;
        })
        .replace(/\s*!important/g, "");
    }

    function traverseSemantic(obj: Record<string, unknown>, currentPath: string[]) {
      for (const [k, v] of Object.entries(obj)) {
        if (v && typeof v === "object") {
          if ("value" in v) {
            const rawVal = (v as { value: unknown }).value;
            const kebabName = [...currentPath, k].map(p => p.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()).join("-");

            if (typeof rawVal === "string") {
              const resolved = resolveRef(rawVal);
              rootVars.push(`  --${kebabName}: ${resolved};`);
              themeVars.push(`  --color-${kebabName}: var(--${kebabName});`);
            } else if (typeof rawVal === "object" && rawVal !== null) {
              const valObj = rawVal as { base?: string; _dark?: string };
              if (valObj.base) {
                rootVars.push(`  --${kebabName}: ${resolveRef(valObj.base)};`);
              }
              if (valObj._dark) {
                darkVars.push(`  --${kebabName}: ${resolveRef(valObj._dark)};`);
              }
              themeVars.push(`  --color-${kebabName}: var(--${kebabName});`);
            }
          } else {
            traverseSemantic(v as Record<string, unknown>, [...currentPath, k]);
          }
        }
      }
    }

    traverseSemantic(semTokens, ["sem"]);
  }

  const css = `/* AUTO-GENERATED FROM src/design-system-v2/constants/theme.ts */
/* DO NOT EDIT DIRECTLY. EDIT theme.ts AND RUN tokens:generate */

:root {
${rootVars.join("\n")}
}

.dark {
${darkVars.join("\n")}
}

@theme inline {
${themeVars.join("\n")}
}
`;

  const outputPath = path.resolve(process.cwd(), "src/styles/tokens.css");
  fs.writeFileSync(outputPath, css, "utf-8");
  console.log(`✔ Generated ${outputPath} with all tokens (colors, fonts, fontWeights, fontSizes, durations).`);
}

generateTokens();
