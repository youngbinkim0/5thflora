# Header Layout Update

## Changes Made

### Desktop Layout (> 768px)
The header has been reorganized with a **left-center-right** layout:

```
[inquire]    a work in progress...    [5 logo]
   LEFT              CENTER              RIGHT
```

**Implementation:**
- **Left**: Inquire button
- **Center**: "a work in progress..." tagline
- **Right**: Number 5 logo/image

**How it works:**
- Flexbox with `justify-content: space-between`
- Tagline has `flex: 1` to fill middle space
- Tagline text is centered with `text-align: center`
- Button and logo have `flex-shrink: 0` to maintain their size

### Mobile Layout (≤ 768px)
Stacks vertically in order:

```
    [inquire]
a work in progress...
      [5 logo]
```

All elements centered for clean mobile experience.

## Files Modified

1. **index.html** - Reordered header elements:
   - Moved inquire button first
   - Tagline second
   - Logo third

2. **style.css** - Updated mobile responsive layout:
   - Changed to `flex-direction: column`
   - Added proper `order` properties
   - Centered all items for mobile

## Test It

Refresh your browser to see:
- ✅ Inquire button on the left
- ✅ "a work in progress..." centered
- ✅ Logo/number 5 on the right

Resize your window to test mobile layout - everything should stack nicely!
