# Catppuccin Themes for DartGit

🍵 Soothing pastel theme for Gitea - ported to DartGit

## Overview

Catppuccin is a community-driven pastel theme that aims to be the middle ground between low and high contrast themes. It consists of 4 soothing warm flavors with 10 eye-friendly accent colors each.

### Flavors

- 🌻 **Latte** - Light theme with warm pastel colors
- 🪴 **Frappé** - Dark theme with cool pastel colors
- 🌺 **Macchiato** - Dark theme with slightly warmer pastels
- 🌿 **Mocha** - Dark theme with cool pastel colors

### Accent Colors

Each flavor includes 10 accent colors:
- Rosewater, Flamingo, Pink, Mauve, Red
- Maroon, Peach, Yellow, Green, Teal
- Sky, Sapphire, Blue, Lavender

## Installation

1. Compile the SCSS themes using your preferred SCSS compiler or the included build script
2. Place the compiled CSS files in Gitea's theme directory
3. Add the theme names to your `app.ini` configuration
4. Restart Gitea and select the theme in your user settings

## Configuration

Add one or more themes to your Gitea `app.ini`:

```ini
[ui]
THEMES = catppuccin-mocha-lavender,catppuccin-latte-pink
```

## Build

To compile all themes:

```bash
deno run -A build.ts
```

This will generate all flavor-accent combinations as CSS files.

## Auto-Switching Themes

For automatic light/dark mode switching:

```ini
[ui]
THEMES = catppuccin-rosewater-auto,catppuccin-lavender-auto
```

## License

MIT - See LICENSE file
