#!/usr/bin/env python3
import re
import json

# Read the HTML file
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract the Vev JSON
vev_match = re.search(r'<script type="text/vev">(.*?)</script>', html, re.DOTALL)

if vev_match:
    vev_json = json.loads(vev_match.group(1))

    print("=== VEV CONTENT ANALYSIS ===\n")

    # Extract slideshow images
    print("SLIDESHOW IMAGES:")
    for model in vev_json.get('models', []):
        if model.get('type') == 'slideshow':
            images = model.get('content', {}).get('images', [])
            print(f"  Found {len(images)} slideshow images:")
            for img in images:
                img_key = img.get('key')
                if img_key and img_key in vev_json.get('images', {}):
                    img_data = vev_json['images'][img_key]
                    print(f"    - {img_data.get('src')}")
                    print(f"      Description: {img_data.get('meta', {}).get('description', 'N/A')}")

    print("\n" + "="*50 + "\n")

    # Extract text content
    print("TEXT CONTENT:")
    for model in vev_json.get('models', []):
        if model.get('type') == 'text':
            text = model.get('content', {}).get('text', '')
            # Remove HTML tags for display
            clean_text = re.sub(r'<[^>]+>', '', text)
            if clean_text.strip():
                print(f"  - {clean_text.strip()}")

    print("\n" + "="*50 + "\n")

    # Extract other images
    print("OTHER IMAGES:")
    for model in vev_json.get('models', []):
        if model.get('type') == 'image':
            src = model.get('content', {}).get('src', {})
            img_key = src.get('key')
            if img_key and img_key in vev_json.get('images', {}):
                img_data = vev_json['images'][img_key]
                print(f"  - {img_data.get('src')}")
                print(f"    Description: {img_data.get('meta', {}).get('description', 'N/A')}")

    print("\n" + "="*50 + "\n")

    # Extract page info
    pages = vev_json.get('pages', [])
    if pages:
        print("PAGE INFO:")
        for page in pages:
            print(f"  Title: {page.get('title')}")
            print(f"  Path: {page.get('path', '/')}")

    print("\n" + "="*50 + "\n")

    # Count animations
    animations_count = 0
    for model in vev_json.get('models', []):
        if 'init_animation' in model.get('cl', ''):
            animations_count += 1
    print(f"ANIMATIONS: {animations_count} elements with animations")

    # Save extracted data for building new HTML
    extracted_data = {
        'slideshow_images': [],
        'texts': [],
        'other_images': [],
        'page_title': pages[0].get('title') if pages else 'Fifth Flora'
    }

    # Get slideshow images
    for model in vev_json.get('models', []):
        if model.get('type') == 'slideshow':
            images = model.get('content', {}).get('images', [])
            for img in images:
                img_key = img.get('key')
                if img_key and img_key in vev_json.get('images', {}):
                    img_data = vev_json['images'][img_key]
                    extracted_data['slideshow_images'].append({
                        'src': img_data.get('src'),
                        'alt': img_data.get('meta', {}).get('description', '')
                    })

    # Get text content
    for model in vev_json.get('models', []):
        if model.get('type') == 'text':
            text = model.get('content', {}).get('text', '')
            if text.strip():
                extracted_data['texts'].append(text)

    # Get other images
    for model in vev_json.get('models', []):
        if model.get('type') == 'image':
            src = model.get('content', {}).get('src', {})
            img_key = src.get('key')
            if img_key and img_key in vev_json.get('images', {}):
                img_data = vev_json['images'][img_key]
                extracted_data['other_images'].append({
                    'src': img_data.get('src'),
                    'alt': img_data.get('meta', {}).get('description', '')
                })

    # Save to JSON file
    with open('extracted_content.json', 'w', encoding='utf-8') as f:
        json.dump(extracted_data, f, indent=2, ensure_ascii=False)

    print("\n✓ Content extracted to extracted_content.json")
else:
    print("✗ Could not find Vev JSON data")
