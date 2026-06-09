import { mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";

const root = dirname(new URL(import.meta.url).pathname);
const outputDir = root;
mkdirSync(outputDir, { recursive: true });

const flavors = [
  {
    name: "latte",
    isDark: false,
    colors: {
      crust: "#e6e9ef",
      mantle: "#e7e9ef",
      base: "#eff1f5",
      surface0: "#ccd0da",
      surface1: "#bcc0cc",
      surface2: "#acb0be",
      overlay0: "#9ca0b0",
      overlay1: "#8c8fa1",
      overlay2: "#7c7f93",
      subtext0: "#6c6f85",
      subtext1: "#5c5f77",
      text: "#4c4f69",
      rosewater: "#dc8a78",
      flamingo: "#dd7878",
      pink: "#ea76cb",
      mauve: "#8839ef",
      red: "#d20f39",
      maroon: "#e64553",
      peach: "#fe640b",
      yellow: "#df8e1d",
      green: "#40a02b",
      teal: "#179299",
      sky: "#04a5e5",
      sapphire: "#209fb5",
      blue: "#1e66f5",
      lavender: "#7287fd",
    },
  },
  {
    name: "frappe",
    isDark: true,
    colors: {
      crust: "#232634",
      mantle: "#292c3c",
      base: "#303446",
      surface0: "#414559",
      surface1: "#51576d",
      surface2: "#626880",
      overlay0: "#737994",
      overlay1: "#838ba7",
      overlay2: "#949cbb",
      subtext0: "#a5adce",
      subtext1: "#b5bfd2",
      text: "#c6d0f5",
      rosewater: "#f2d5cf",
      flamingo: "#eebebe",
      pink: "#f4b8e4",
      mauve: "#ca9ee6",
      red: "#e78284",
      maroon: "#ea999c",
      peach: "#ef9f76",
      yellow: "#e5c890",
      green: "#a6d189",
      teal: "#81c8be",
      sky: "#99d1db",
      sapphire: "#85c1dc",
      blue: "#8caaee",
      lavender: "#babbf1",
    },
  },
  {
    name: "macchiato",
    isDark: true,
    colors: {
      crust: "#181926",
      mantle: "#1e2030",
      base: "#24273a",
      surface0: "#363a4f",
      surface1: "#494d64",
      surface2: "#5b6078",
      overlay0: "#6e738d",
      overlay1: "#8087a2",
      overlay2: "#939ab7",
      subtext0: "#a5adcb",
      subtext1: "#b8c0e0",
      text: "#cad3f5",
      rosewater: "#f4dbd6",
      flamingo: "#f0c6c6",
      pink: "#f5bde6",
      mauve: "#c6a0f6",
      red: "#ed8796",
      maroon: "#ee99a0",
      peach: "#f5a97f",
      yellow: "#eed49f",
      green: "#a6da95",
      teal: "#8bd5ca",
      sky: "#91d7e3",
      sapphire: "#7dc4e4",
      blue: "#8aadf4",
      lavender: "#b7bdf8",
    },
  },
  {
    name: "mocha",
    isDark: true,
    colors: {
      crust: "#11111b",
      mantle: "#181825",
      base: "#1e1e2e",
      surface0: "#313244",
      surface1: "#45475a",
      surface2: "#585b70",
      overlay0: "#6c7086",
      overlay1: "#7f849c",
      overlay2: "#9399b2",
      subtext0: "#a6adc8",
      subtext1: "#bac2de",
      text: "#cdd6f4",
      rosewater: "#f5e0dc",
      flamingo: "#f2cdcd",
      pink: "#f5c2e7",
      mauve: "#cba6f7",
      red: "#f38ba8",
      maroon: "#eba0ac",
      peach: "#fab387",
      yellow: "#f9e2af",
      green: "#a6e3a1",
      teal: "#94e2d5",
      sky: "#89dceb",
      sapphire: "#74c7ec",
      blue: "#89b4fa",
      lavender: "#b4befe",
    },
  },
];

const accents = [
  "rosewater",
  "flamingo",
  "pink",
  "mauve",
  "red",
  "maroon",
  "peach",
  "yellow",
  "green",
  "teal",
  "sky",
  "sapphire",
  "blue",
  "lavender",
];

for (const flavor of flavors) {
  for (const accentName of accents) {
    const accent = flavor.colors[accentName as keyof typeof flavor.colors];
    const source = `@use "sass:color";

$isDark: ${flavor.isDark};
$accent: ${accent};
$crust: ${flavor.colors.crust};
$mantle: ${flavor.colors.mantle};
$base: ${flavor.colors.base};
$surface0: ${flavor.colors.surface0};
$surface1: ${flavor.colors.surface1};
$surface2: ${flavor.colors.surface2};
$overlay0: ${flavor.colors.overlay0};
$overlay1: ${flavor.colors.overlay1};
$overlay2: ${flavor.colors.overlay2};
$subtext0: ${flavor.colors.subtext0};
$subtext1: ${flavor.colors.subtext1};
$text: ${flavor.colors.text};
$rosewater: ${flavor.colors.rosewater};
$flamingo: ${flavor.colors.flamingo};
$pink: ${flavor.colors.pink};
$mauve: ${flavor.colors.mauve};
$red: ${flavor.colors.red};
$maroon: ${flavor.colors.maroon};
$peach: ${flavor.colors.peach};
$yellow: ${flavor.colors.yellow};
$green: ${flavor.colors.green};
$teal: ${flavor.colors.teal};
$sky: ${flavor.colors.sky};
$sapphire: ${flavor.colors.sapphire};
$blue: ${flavor.colors.blue};
$lavender: ${flavor.colors.lavender};

@import "theme";
@import "chroma";
@import "codemirror";
@import "monaco";
`;

    const inputFile = join(root, `.tmp-${flavor.name}-${accentName}.scss`);
    const outputFile = join(outputDir, `catppuccin-${flavor.name}-${accentName}.css`);
    await Deno.writeTextFile(inputFile, source);

    const command = new Deno.Command("npx", {
      args: ["--yes", "sass", "--no-source-map", inputFile, outputFile],
      cwd: root,
      stdout: "piped",
      stderr: "piped",
    });

    const result = await command.output();
    if (!result.success) {
      throw new Error(new TextDecoder().decode(result.stderr));
    }

    rmSync(inputFile, { force: true });
    console.log(`Generated ${outputFile}`);
  }
}
