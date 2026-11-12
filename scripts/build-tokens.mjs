// Builds the style file of the current framework from src/tokens.json.
// Usage: node scripts/build-tokens.mjs <tailwind|bootstrap>
import { readFileSync, writeFileSync } from "node:fs";

const src = (path) => new URL(`../src/${path}`, import.meta.url);
const tokens = JSON.parse(readFileSync(src("tokens.json"), "utf8"));
const { colors, fontSans, spacingUnit } = tokens;

const HEADER = "Generated from src/tokens.json by scripts/build-tokens.mjs. Do not edit.";

// Bootstrap spacing steps 0 to 5 as multiples of the unit (0, 1, 2, 4, 6, 12).
const SPACER_STEPS = [0, 1, 2, 4, 6, 12];

const targets = {
  tailwind() {
    const colorLines = Object.entries(colors).map(
      ([name, value]) => `  --color-${name}: ${value};`
    );
    const css = [
      `/* ${HEADER} */`,
      "@theme {",
      `  --font-sans: ${fontSans};`,
      ...colorLines,
      `  --spacing: ${spacingUnit};`,
      "}",
      "",
    ].join("\n");
    writeFileSync(src("tokens.generated.css"), css);
  },

  bootstrap() {
    const colorLines = Object.entries(colors).map(
      ([name, value]) => `$${name}: ${value};`
    );
    const spacers = SPACER_STEPS.map(
      (steps, i) => `  ${i}: ${steps === 0 ? "0" : `$unit * ${steps}`},`
    );
    const scss = [
      `// ${HEADER}`,
      ...colorLines,
      `$unit: ${spacingUnit};`,
      "",
      `$font-family-sans-serif: ${fontSans};`,
      "$body-color: $ink;",
      "$body-bg: $paper;",
      "$primary: $ink;",
      "$dark: $ink;",
      "$danger: $accent;",
      "$warning: $signal;",
      "$border-color: $ink;",
      "$input-border-color: $ink;",
      "$spacer: $unit * 4;",
      "$spacers: (",
      ...spacers,
      ");",
      "",
    ].join("\n");
    writeFileSync(src("_tokens.scss"), scss);
  },
};

const target = process.argv[2];
if (!(target in targets)) {
  console.error("Usage: node scripts/build-tokens.mjs <tailwind|bootstrap>");
  process.exit(1);
}
targets[target]();
