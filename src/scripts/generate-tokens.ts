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

  // 2. Base Tokens: colors
  const colors = (theme.tokens as Record<string, unknown>)?.colors as Record<string, unknown>;
  if (colors) {
    for (const [colorGroup, groupVal] of Object.entries(colors)) {
      if (typeof groupVal === "object" && groupVal !== null) {
        if ("value" in groupVal) {
          // Flat color: e.g. canvasLight, bodyLight
          const val = String((groupVal as { value: string }).value);
          const kebab = colorGroup.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
          rootVars.push(`  --colors-${kebab}: ${val};`);
          themeVars.push(`  --color-${kebab}: var(--colors-${kebab});`);
        } else {
          // Palette: e.g. neutral.50, blue.500
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

  // 3. Semantic Tokens: colors
  const semTokens = (theme.semanticTokens as Record<string, unknown>)?.colors as Record<string, unknown>;
  if (semTokens) {
    function resolveRef(val: string): string {
      // replace {colors.neutral.100} with var(--colors-neutral-100)
      return val.replace(/\{colors\.([a-zA-Z0-9.]+)\}/g, (_, pathStr: string) => {
        const parts = pathStr.split(".").map((p: string) => p.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase());
        return `var(--colors-${parts.join("-")})`;
      }).replace(/\s*!important/g, "");
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
  console.log(`✔ Generated ${outputPath} with ${rootVars.length} base/light vars, ${darkVars.length} dark vars.`);
}

generateTokens();
