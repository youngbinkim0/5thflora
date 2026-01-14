# Portra Film Roll Filter & Typography Updates

## Changes Made

### 1. Thinner "fifth flora" Title Font 📝

**Font**: Courier Prime / Courier New (monospace)
- **Before**: `font-weight: 400` (normal)
- **After**: `font-weight: 300` (light/thin)
- **File**: [style.css:100](broken_website/style.css:100)

The title is now noticeably thinner and more delicate.

---

### 2. Portra Film Roll Aesthetic 🎞️

Added a filter stack to replicate the look of **Kodak Portra film**:

#### Filter Stack ([style.css:158-163](broken_website/style.css:158-163)):
```css
filter:
    brightness(1.05)    /* Slightly brighter, dreamy highlights */
    contrast(0.92)      /* Softer, less harsh contrast */
    saturate(0.85)      /* Muted, pastel-like colors */
    sepia(0.08)         /* Subtle warm brown undertone */
    hue-rotate(-5deg);  /* Shift towards warmer/magenta tones */
```

#### Warm Color Overlay ([style.css:167-181](broken_website/style.css:167-181)):
Added a subtle peachy/cream gradient overlay using `::after` pseudo-element:
- Very subtle warm glow in highlights
- `mix-blend-mode: screen` for soft, luminous effect
- Barely perceptible but adds that classic Portra warmth

---

## Portra Film Characteristics

The filter replicates these classic Portra traits:
- ✅ **Warm tones** - Peachy skin tones, golden highlights
- ✅ **Soft contrast** - Creamy highlights, gentle shadows
- ✅ **Muted colors** - Desaturated but rich
- ✅ **Slight magenta cast** - Hue shift towards pink/magenta
- ✅ **Dreamy quality** - Increased brightness for that "glow"
- ✅ **Film grain** - Already have white noise overlay!

---

## Stacking Order

From bottom to top:
1. **Image** - Base photo with Portra filters
2. **Warm overlay** (`.slide::after`) - Peachy gradient
3. **White noise** (`.noise-canvas`) - TV static grain

All layers work together to create authentic film photography look!

---

## Test It

Refresh your browser (`Ctrl+Shift+R`) and you should see:
- ✅ Thinner "fifth flora" text
- ✅ Warmer, softer, more vintage-looking slideshow images
- ✅ Muted pastel colors like classic Portra 400/800
- ✅ Creamy highlights and gentle contrast

---

## Adjusting the Filter

To make the effect **more/less intense**, edit [style.css:158-163](broken_website/style.css:158-163):

**Warmer**:
- Increase `sepia(0.08)` → `sepia(0.15)`
- Adjust `hue-rotate(-5deg)` → `hue-rotate(-10deg)`

**Cooler/More neutral**:
- Decrease `sepia(0.08)` → `sepia(0.03)`
- Adjust `hue-rotate(-5deg)` → `hue-rotate(0deg)`

**More saturated** (less muted):
- Increase `saturate(0.85)` → `saturate(0.95)`

**Softer/Dreamier**:
- Increase `brightness(1.05)` → `brightness(1.08)`
- Decrease `contrast(0.92)` → `contrast(0.88)`

**Remove warm overlay**:
- Delete or comment out `.slide::after` block (lines 167-181)
