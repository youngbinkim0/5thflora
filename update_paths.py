#!/usr/bin/env python3
import re
import os

# Read the HTML file
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace font URLs
html = re.sub(
    r'url\(https://fonts\.vev\.design/[^)]+/([^)]+\.woff2)\)',
    r'url(fonts/\1)',
    html
)

# Replace CDN image URLs - handle the complex CDN URLs
def replace_image_url(match):
    url = match.group(0)
    # Extract the image filename from the URL
    filename_match = re.search(r'/([^/]+\.(jpg|jpeg|png|svg))(?:\?|$)', url)
    if filename_match:
        filename = filename_match.group(1)
        if 'src="' in url:
            return f'src="images/{filename}"'
        else:
            return f'url(images/{filename})'
    return url

# Replace image sources
html = re.sub(
    r'src="https://cdn\.vev\.design/[^"]+"',
    replace_image_url,
    html
)

# Replace background image URLs
html = re.sub(
    r'url\(https://cdn\.vev\.design/[^)]+\)',
    replace_image_url,
    html
)

# Replace JavaScript sources
html = re.sub(
    r'src="https://cdn\.vev\.design/pkg/v1/([^"]+\.js)"',
    r'src="scripts/\1"',
    html
)

# Replace the main vev.js script
html = re.sub(
    r'src="https://js\.vev\.design/[^"]+"',
    'src="scripts/vev-51c6be360525a9b492a27340025eb224.js"',
    html
)

# Replace SVG sources
html = re.sub(
    r'src="https://cdn\.vev\.design/private/[^/]+/image/([^"]+\.svg)"',
    r'src="images/\1"',
    html
)

# Write the updated HTML
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("✓ Updated all paths in index.html")
