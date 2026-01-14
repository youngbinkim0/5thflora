# Slideshow Updates

## Changes Made

### 1. Speed ⚡
- **Before**: 4 seconds per slide
- **After**: 1 second per slide ✅
- **File**: `slideshow.js` line 35

### 2. Size 📐
- **Before**: max-width 850px
- **After**: max-width 600px ✅
- **File**: `style.css` line 111
- **Mobile**: max-width 90% (down from 95%)

### 3. Dynamic White Noise Filter 📺 (UPDATED)
- **Type**: Animated Canvas-based white noise ✅
- **Effect**: Live TV static that changes every frame (60fps)
- **Implementation**:
  - HTML5 Canvas element dynamically created
  - JavaScript generates random pixel values each frame
  - Uses `requestAnimationFrame` for smooth 60fps animation
  - True dynamic noise, not static SVG pattern
- **Files**:
  - `slideshow.js` lines 75-128 (noise generation & animation)
  - `style.css` lines 125-136 (canvas styling)

### Additional Enhancements
- **Faster transitions**: Reduced from 0.8s to 0.5s for smoother 1-second cycling
- **Image filter**: Added slight contrast boost and desaturated colors for vintage feel
- **Responsive**: Noise canvas resizes with window
- **Performance**: Uses `requestAnimationFrame` for optimal rendering

## How It Works

The white noise effect uses an HTML5 Canvas element that's dynamically added to the slideshow container. JavaScript generates random grayscale values for every pixel on every frame (60 times per second), creating authentic TV static/white noise that continuously changes.

### Technical Details:
1. **Canvas Creation**: Dynamically created and sized to match slideshow
2. **Pixel Generation**: Random values (0-255) for each pixel
3. **Animation Loop**: `requestAnimationFrame` calls `animateNoise()` 60 times/sec
4. **Overlay**: CSS `mix-blend-mode: overlay` blends with images
5. **Cleanup**: Animation stops when page unloads

## Test It

Open `index.html` and you should see:
- ✅ Images cycling every 1 second
- ✅ Smaller slideshow frame (600px max)
- ✅ **Animated TV static/grain** constantly changing over images
- ✅ Smooth, fast transitions

## Adjusting the Noise

To adjust the noise intensity, modify in `style.css` line 132:
- **More visible**: Change `opacity: 0.15` to `0.25` or `0.35`
- **More subtle**: Change `opacity: 0.15` to `0.08` or `0.05`

To adjust the noise performance in `slideshow.js`:
- **Lower quality/better performance**: Reduce canvas size before generating pixels
- **Skip frames**: Only generate noise every 2nd or 3rd frame instead of every frame

## Performance Note

The noise animation runs at 60fps. On slower devices, you can optimize by:
1. Reducing the opacity (makes it less noticeable)
2. Generating noise at a lower resolution and scaling up
3. Reducing the frame rate (e.g., generate new noise every 2-3 frames)
