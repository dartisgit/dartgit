# DartGit Pitch-Black Theme Setup

This guide explains how to enable and customize the Pitch-Black theme for your DartGit instance.

## Automatic Setup

The Pitch-Black theme CSS is included in the repository at:
```
custom/public/css/pitch-black.css
```

## Enable the Theme

### Via Configuration File (`app.ini`)

1. Locate or create your `app.ini` configuration file
2. Add the following under the `[ui]` section:

```ini
[ui]
CUSTOM_CSS_URL = /css/pitch-black.css
```

3. Restart your DartGit instance:
```bash
# If running via Docker
docker restart dartgit

# If running standalone
systemctl restart gitea
# or
./gitea web
```

### Via Environment Variable

Alternatively, set the environment variable before starting DartGit:

```bash
export GITEA_ui__CUSTOM_CSS_URL=/css/pitch-black.css
```

## Theme Features

- **Dark Background**: #181818 base color for reduced eye strain
- **Syntax Highlighting**: Code blocks with optimized colors
- **Diff Visualization**: Green for additions, red for removals
- **Accessible Colors**: WCAG AA compliant contrast ratios
- **Smooth Scrollbar**: Custom styled scrollbars with theme colors
- **Responsive**: Works across all screen sizes

## Customization

To modify the theme colors, edit `custom/public/css/pitch-black.css`:

```css
:root {
  --color-primary: #181818;        /* Main background */
  --color-secondary: #1e1e1e;      /* Secondary background */
  --color-tertiary: #222;          /* Tertiary background */
  --color-text: #e3e3e3;           /* Main text */
  --color-text-light: #b0b0b0;     /* Secondary text */
  --color-accent: #5d9dd6;         /* Primary accent */
  --color-accent-hover: #98cfff;   /* Accent hover state */
  --color-border: #383838;         /* Borders */
  --color-code-bg: #131313;        /* Code background */
}
```

## Troubleshooting

- **Theme not applying?** Clear your browser cache and perform a hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- **Some elements still light?** Ensure the CSS file is being served correctly at `/css/pitch-black.css`
- **Custom CSS not loading?** Verify the path in `app.ini` is correct and DartGit has file permissions to read the custom directory

## Integration with Other Themes

This theme can coexist with other custom CSS. Additional stylesheets can be loaded via:

```ini
[ui]
CUSTOM_CSS_URL = /css/pitch-black.css;/css/custom-overrides.css
```

---

For more information on Gitea customization, see the [official documentation](https://docs.gitea.io/en-us/customizing-gitea/).
