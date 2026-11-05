// src/scripts/generate-tokens.ts

import fs from "node:fs";
import path from "node:path";
import { designTokens } from "../design-system-v2/constants/tokens.ts";

function generateTokensCss() {
  const rootVars: string[] = [];
  const darkVars: string[] = [];
  const themeVars: string[] = [];

  // Breakpoints
  for (const [bp, val] of Object.entries(designTokens.breakpoints)) {
    themeVars.push(`  --breakpoint-${bp}: ${val};`);
  }

  // Radius
  rootVars.push(`  --radius: ${designTokens.radius};`);
  themeVars.push(`  --radius-sm: calc(var(--radius) - 4px);`);
  themeVars.push(`  --radius-md: calc(var(--radius) - 2px);`);
  themeVars.push(`  --radius-lg: var(--radius);`);
  themeVars.push(`  --radius-xl: calc(var(--radius) + 4px);`);

  // Colors
  for (const [colorName, values] of Object.entries(designTokens.colors)) {
    const kebabName = colorName.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    rootVars.push(`  --${kebabName}: ${values.light};`);
    darkVars.push(`  --${kebabName}: ${values.dark};`);
    themeVars.push(`  --color-${kebabName}: var(--${kebabName});`);
  }

  const css = `/* AUTO-GENERATED FROM src/design-system-v2/constants/tokens.ts - DO NOT EDIT MANUALLY */

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
  console.log("✔ Successfully generated src/styles/tokens.css from tokens.ts");
}

generateTokensCss();

