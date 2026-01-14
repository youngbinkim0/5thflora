#!/usr/bin/env python3

# Read the HTML file
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace timer value from 0 to 4000 (4 seconds)
html = html.replace('"timer":0', '"timer":4000')

# Write back
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("✓ Fixed slideshow timer")
print("  Timer set to 4000ms (4 seconds)")
