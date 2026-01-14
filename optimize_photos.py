#!/usr/bin/env python3
"""Optimize photos for FifthFlora website"""

import os
from pathlib import Path
from PIL import Image

# Directories
source_dir = Path("photo-selection")
optimized_dir = Path("assets/images/optimized")
thumbnails_dir = Path("assets/images/thumbnails")

# Create output directories if they don't exist
optimized_dir.mkdir(parents=True, exist_ok=True)
thumbnails_dir.mkdir(parents=True, exist_ok=True)

# Get all image files (excluding README)
image_extensions = ['.jpg', '.JPG', '.jpeg', '.JPEG', '.png', '.PNG']
image_files = []
for ext in image_extensions:
    image_files.extend(source_dir.glob(f'*{ext}'))

# Filter out README
image_files = [f for f in image_files if 'README' not in f.name]

print(f"Optimizing {len(image_files)} photos for web...\n")

optimized_count = 0
thumbnail_count = 0
failed = 0

for i, img_path in enumerate(sorted(image_files), 1):
    # Create new filename: fifthflora-001.jpg, fifthflora-002.jpg, etc.
    new_name = f"fifthflora-{i:03d}.jpg"

    try:
        # Open image
        img = Image.open(img_path)

        # Convert to RGB if necessary (for PNG with transparency)
        if img.mode in ('RGBA', 'LA', 'P'):
            # Create white background
            background = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'P':
                img = img.convert('RGBA')
            background.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
            img = background
        elif img.mode != 'RGB':
            img = img.convert('RGB')

        # Get original dimensions
        width, height = img.size

        # ===== OPTIMIZED VERSION (Full Size) =====
        # Resize if width > 1920px, maintaining aspect ratio
        if width > 1920:
            new_width = 1920
            new_height = int((1920 / width) * height)
            img_optimized = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
        else:
            img_optimized = img.copy()

        # Save optimized version
        optimized_path = optimized_dir / new_name
        img_optimized.save(optimized_path, 'JPEG', quality=85, optimize=True)
        optimized_count += 1

        # ===== THUMBNAIL VERSION =====
        # Resize to 600px max width
        if width > 600:
            thumb_width = 600
            thumb_height = int((600 / width) * height)
            img_thumb = img.resize((thumb_width, thumb_height), Image.Resampling.LANCZOS)
        else:
            img_thumb = img.copy()

        # Save thumbnail
        thumb_name = f"fifthflora-{i:03d}-thumb.jpg"
        thumb_path = thumbnails_dir / thumb_name
        img_thumb.save(thumb_path, 'JPEG', quality=75, optimize=True)
        thumbnail_count += 1

        # Get file sizes
        opt_size = optimized_path.stat().st_size / 1024  # KB
        thumb_size = thumb_path.stat().st_size / 1024  # KB

        print(f"✓ {i:2d}. {img_path.name[:40]:<40}")
        print(f"     → {new_name} ({opt_size:.0f}KB optimized, {thumb_size:.0f}KB thumb)")

    except Exception as e:
        print(f"✗ {i:2d}. Failed: {img_path.name} - {e}")
        failed += 1

print(f"\n{'='*70}")
print(f"Optimization Complete!")
print(f"{'='*70}")
print(f"  Optimized images: {optimized_count} → assets/images/optimized/")
print(f"  Thumbnails:       {thumbnail_count} → assets/images/thumbnails/")
print(f"  Failed:           {failed}")
print(f"{'='*70}")
