#!/usr/bin/env python3
import re

# Read the HTML file
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Function to extract filename from CDN URL
def extract_filename(url):
    # Match: .../image/FILENAME.ext
    match = re.search(r'/image/([^/\s"?]+\.(?:jpg|jpeg|png|svg))', url)
    if match:
        return match.group(1)
    return None

# Replace function for all CDN URLs
def replace_cdn_url(match):
    url = match.group(0)
    filename = extract_filename(url)
    if filename:
        # Check if it's in quotes (src/href attribute) or not (url() in CSS)
        if url.startswith('http'):
            return f'images/{filename}'
        else:
            return f'images/{filename}'
    return url

# Pattern to match all variations of CDN URLs
patterns = [
    # In JSON/attributes: "https://cdn.vev.design/..."
    r'https://cdn\.vev\.design/cdn-cgi/image/[^/\s"]+/private/[^/]+/image/[^\s"?]+\.(?:jpg|jpeg|png|svg)',
    # Without cdn-cgi
    r'https://cdn\.vev\.design/private/[^/]+/image/[^\s"?]+\.(?:jpg|jpeg|png|svg)',
]

count = 0
for pattern in patterns:
    original_html = html
    html = re.sub(pattern, replace_cdn_url, html)
    count += html.count('images/') - original_html.count('images/')

# Write back
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print(f"✓ Fixed all image URLs")
print(f"  Total 'images/' references now: {html.count('images/')}")

# Verify no CDN URLs remain (except allowed ones like external links)
cdn_count = html.count('cdn.vev.design')
print(f"  Remaining CDN references: {cdn_count}")
