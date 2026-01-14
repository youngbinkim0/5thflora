#!/usr/bin/env python3
"""Convert HEIC files to JPEG format"""

import os
from pathlib import Path
from pillow_heif import register_heif_opener
from PIL import Image

# Register HEIF opener with Pillow
register_heif_opener()

# Source directory
source_dir = Path("Fifth Flora-20260113T225710Z-1-001/Fifth Flora")

# Find all HEIC files (case insensitive)
heic_files = []
for ext in ['*.heic', '*.HEIC']:
    heic_files.extend(source_dir.glob(ext))

print(f"Found {len(heic_files)} HEIC files to convert\n")

converted = 0
failed = 0

for heic_file in sorted(heic_files):
    # Create output filename (same name but .jpg extension)
    jpg_file = heic_file.with_suffix('.jpg')

    try:
        # Open HEIC file
        img = Image.open(heic_file)

        # Convert to RGB (HEIC might be in different color space)
        if img.mode != 'RGB':
            img = img.convert('RGB')

        # Save as JPEG with high quality
        img.save(jpg_file, 'JPEG', quality=95)

        print(f"✓ Converted: {heic_file.name} → {jpg_file.name}")
        converted += 1

    except Exception as e:
        print(f"✗ Failed to convert {heic_file.name}: {e}")
        failed += 1

print(f"\n{'='*60}")
print(f"Conversion complete!")
print(f"  Successfully converted: {converted}")
print(f"  Failed: {failed}")
print(f"{'='*60}")
