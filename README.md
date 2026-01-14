# Fifth Flora - Broken Website Archive

This folder contains a complete local copy of the "broken" Fifth Flora website from https://a-fifthflora.vev.site/fifth-flora

## Structure

```
broken_website/
├── index.html              # Main HTML file (modified to use local assets)
├── fonts/                  # 366 font files (woff2 format)
├── images/                 # 33 images (jpg, jpeg, png, svg)
├── scripts/                # 2 JavaScript files
├── styles/                 # (empty - styles are inline in HTML)
├── a-fifthflora.vev.site/  # Original downloaded HTML
│   └── fifth-flora.html    # Original HTML file (unmodified)
├── urls.txt                # List of all extracted URLs
├── download_assets.sh      # Script used to download assets
└── update_paths.py         # Script used to update paths in HTML

```

## How to View

Simply open `index.html` in a web browser:

```bash
# Open in default browser (Linux)
xdg-open index.html

# Or use a simple HTTP server
python3 -m http.server 8000
# Then visit: http://localhost:8000/
```

## What Was Downloaded

- **366 font files** - Various weights and styles from Google Fonts (Asap, Bree Serif, IBM Plex Sans, Poppins, Roboto, Rubik Mono One)
- **33 images** - All photos and graphics from the CDN
- **2 JavaScript files** - Main Vev.design runtime and additional scripts
- **1 main HTML file** - Complete page with inline CSS

## Modifications

The original HTML file was copied to `index.html` and all external URLs were updated to point to local files:

- Font URLs: `https://fonts.vev.design/...` → `fonts/...`
- Image URLs: `https://cdn.vev.design/...` → `images/...`
- Script URLs: `https://cdn.vev.design/...` → `scripts/...`
- Script URLs: `https://js.vev.design/...` → `scripts/...`

The original unmodified HTML is preserved at `a-fifthflora.vev.site/fifth-flora.html`

## Notes

- This is a static snapshot of the website from January 13, 2026
- External links (Instagram, etc.) remain as-is
- The site was built using Vev.design platform
