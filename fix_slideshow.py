#!/usr/bin/env python3
import re
import json

# Read the HTML file
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Find the JSON data in the script tag
vev_script_match = re.search(r'<script type="text/vev">(.*?)</script>', html, re.DOTALL)

if vev_script_match:
    json_str = vev_script_match.group(1)

    # Replace all CDN image URLs with local paths
    # Pattern: https://cdn.vev.design/cdn-cgi/image/f=auto,q=82,h=1920/private/YZdMh0KhYmatZqwtce7KcluFt4H3/image/FILENAME.ext
    # Or: https://cdn.vev.design/cdn-cgi/image/f=auto,q=82/private/YZdMh0KhYmatZqwtce7KcluFt4H3/image/FILENAME.ext

    def replace_cdn_url(match):
        url = match.group(0)
        # Extract the filename from the URL
        filename_match = re.search(r'/image/([^/]+\.(jpg|jpeg|png|svg))', url)
        if filename_match:
            filename = filename_match.group(1)
            return f'images/{filename}'
        return url

    # Replace the URLs in the JSON
    json_str_updated = re.sub(
        r'https://cdn\.vev\.design/cdn-cgi/image/[^/]+/private/[^/]+/image/[^"\s]+',
        replace_cdn_url,
        json_str
    )

    # Also handle URLs without the cdn-cgi part
    json_str_updated = re.sub(
        r'https://cdn\.vev\.design/private/[^/]+/image/([^"\s]+\.(jpg|jpeg|png|svg))',
        r'images/\1',
        json_str_updated
    )

    # Replace in the HTML
    html_updated = html.replace(json_str, json_str_updated)

    # Write back
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html_updated)

    print("✓ Fixed slideshow image URLs in JSON data")

    # Count how many URLs were updated
    cdn_count_before = json_str.count('cdn.vev.design')
    cdn_count_after = json_str_updated.count('cdn.vev.design')
    print(f"  Replaced {cdn_count_before - cdn_count_after} CDN references")
else:
    print("✗ Could not find Vev JSON data")
