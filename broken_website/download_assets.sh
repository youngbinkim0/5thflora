#!/bin/bash

# Create directories for different asset types
mkdir -p fonts images scripts styles

# Read URLs and download them
while IFS= read -r url; do
    # Skip if it's the outdated browser link or Instagram
    if [[ "$url" == *"outdatedbrowser.com"* ]] || [[ "$url" == *"instagram.com"* ]]; then
        continue
    fi

    # Determine file type and directory
    if [[ "$url" == *".woff2"* ]] || [[ "$url" == *"fonts.vev.design"* ]]; then
        dir="fonts"
        filename=$(echo "$url" | sed 's/.*\///' | sed 's/?.*//')
    elif [[ "$url" == *".js"* ]] || [[ "$url" == *"js.vev.design"* ]]; then
        dir="scripts"
        filename=$(echo "$url" | sed 's/.*\///' | sed 's/?.*//')
        # If filename is empty or just query params, create a meaningful name
        if [ -z "$filename" ] || [[ "$filename" == "vev.js"* ]]; then
            filename="vev-$(echo "$url" | md5sum | cut -d' ' -f1).js"
        fi
    elif [[ "$url" == *".svg"* ]]; then
        dir="images"
        filename=$(echo "$url" | sed 's/.*\///')
    elif [[ "$url" == *".jpg"* ]] || [[ "$url" == *".jpeg"* ]] || [[ "$url" == *".png"* ]] || [[ "$url" == *"cdn.vev.design"* ]]; then
        dir="images"
        # Extract filename from URL, handling CDN URLs
        filename=$(echo "$url" | sed 's/.*\///')
        # If it's a CDN image URL without extension, extract the image ID
        if [[ "$url" == *"cdn.vev.design"* ]] && [[ ! "$filename" =~ \.(jpg|jpeg|png|svg)$ ]]; then
            image_id=$(echo "$url" | grep -oE '[^/]+\.(jpg|jpeg|png)' | tail -1)
            if [ -n "$image_id" ]; then
                filename="$image_id"
            else
                filename="image-$(echo "$url" | md5sum | cut -d' ' -f1).jpg"
            fi
        fi
    else
        dir="styles"
        filename=$(echo "$url" | sed 's/.*\///' | sed 's/?.*//')
        if [ -z "$filename" ]; then
            filename="asset-$(echo "$url" | md5sum | cut -d' ' -f1)"
        fi
    fi

    # Download the file
    output_path="$dir/$filename"
    if [ ! -f "$output_path" ]; then
        echo "Downloading: $url -> $output_path"
        wget -q --timeout=30 --tries=3 -O "$output_path" "$url" 2>/dev/null
        if [ $? -ne 0 ]; then
            echo "Failed to download: $url"
            rm -f "$output_path"
        else
            echo "✓ Downloaded: $filename"
        fi
        # Small delay to be nice to the server
        sleep 0.1
    fi
done < urls.txt

echo "Download complete!"
