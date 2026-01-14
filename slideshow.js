// Slideshow data - using cropped square images
const slideshowImages = [
  { src: "Slideshow Images/cropped images for slideshow/418434993_18309739819130085_936062320733734416_n-VSCO.jpeg", alt: "Fifth Flora floral arrangement" },
  { src: "Slideshow Images/cropped images for slideshow/418435156_18309739810130085_7752165727893854069_n-VSCO.jpeg", alt: "Fifth Flora floral arrangement" },
  { src: "Slideshow Images/cropped images for slideshow/418457044_18309739792130085_937474106629883565_n-VSCO.jpeg", alt: "Fifth Flora floral arrangement" },
  { src: "Slideshow Images/cropped images for slideshow/418726911_18309739774130085_6011209659365046964_n-VSCO.jpeg", alt: "Fifth Flora floral arrangement" },
  { src: "Slideshow Images/cropped images for slideshow/461658235_18343749064130085_7223932482911666025_n-VSCO.jpeg", alt: "Fifth Flora floral arrangement" },
  { src: "Slideshow Images/cropped images for slideshow/461853474_18343749073130085_5019073652476433422_n-VSCO.jpeg", alt: "Fifth Flora floral arrangement" },
  { src: "Slideshow Images/cropped images for slideshow/462565363_1398102751545476_2458918867684096133_n-VSCO.jpeg", alt: "Fifth Flora floral arrangement" },
  { src: "Slideshow Images/cropped images for slideshow/462570540_1137318808027399_6934403131525645120_n-VSCO.jpeg", alt: "Fifth Flora floral arrangement" },
  { src: "Slideshow Images/cropped images for slideshow/462637133_1116906946659433_8004616903300974246_n-2-VSCO.jpeg", alt: "Fifth Flora floral arrangement" },
  { src: "Slideshow Images/cropped images for slideshow/IMG_1108-VSCO.jpeg", alt: "Fifth Flora floral arrangement" },
  { src: "Slideshow Images/cropped images for slideshow/IMG_1454-VSCO.jpeg", alt: "Fifth Flora floral arrangement" },
  { src: "Slideshow Images/cropped images for slideshow/IMG_1472-VSCO.jpeg", alt: "Fifth Flora floral arrangement" },
  { src: "Slideshow Images/cropped images for slideshow/IMG_1476-VSCO.jpeg", alt: "Fifth Flora floral arrangement" },
  { src: "Slideshow Images/cropped images for slideshow/IMG_1478-VSCO.jpeg", alt: "Fifth Flora floral arrangement" },
  { src: "Slideshow Images/cropped images for slideshow/IMG_2312-VSCO.jpeg", alt: "Fifth Flora floral arrangement" },
  { src: "Slideshow Images/cropped images for slideshow/IMG_2374-VSCO.jpeg", alt: "Fifth Flora floral arrangement" },
  { src: "Slideshow Images/cropped images for slideshow/IMG_2403-VSCO.jpeg", alt: "Fifth Flora floral arrangement" },
  { src: "Slideshow Images/cropped images for slideshow/IMG_4414-VSCO.jpeg", alt: "Fifth Flora floral arrangement" },
  { src: "Slideshow Images/cropped images for slideshow/IMG_4459-VSCO.jpeg", alt: "Fifth Flora floral arrangement" },
  { src: "Slideshow Images/cropped images for slideshow/IMG_5820-VSCO.jpeg", alt: "Fifth Flora floral arrangement" },
  { src: "Slideshow Images/cropped images for slideshow/IMG_5854-VSCO.jpeg", alt: "Fifth Flora floral arrangement" },
  { src: "Slideshow Images/cropped images for slideshow/IMG_6253-VSCO.jpeg", alt: "Fifth Flora floral arrangement" },
  { src: "Slideshow Images/cropped images for slideshow/IMG_7326-VSCO.jpeg", alt: "Fifth Flora floral arrangement" },
  { src: "Slideshow Images/cropped images for slideshow/IMG_7788-VSCO.jpeg", alt: "Fifth Flora floral arrangement" },
  { src: "Slideshow Images/cropped images for slideshow/_MG_6639-VSCO.jpeg", alt: "Fifth Flora floral arrangement" },
  { src: "Slideshow Images/cropped images for slideshow/_MG_7021-VSCO.jpeg", alt: "Fifth Flora floral arrangement" },
  { src: "Slideshow Images/cropped images for slideshow/_MG_7398-4-VSCO.jpeg", alt: "Fifth Flora floral arrangement" },
  { src: "Slideshow Images/cropped images for slideshow/_MG_7453-VSCO.jpeg", alt: "Fifth Flora floral arrangement" },
  { src: "Slideshow Images/cropped images for slideshow/_MG_7468-2-VSCO.jpeg", alt: "Fifth Flora floral arrangement" }
];

// Slideshow configuration
const SLIDESHOW_INTERVAL = 1500; // 1.5 seconds per slide
let currentSlide = 0;
let slideshowTimer = null;
let noiseCanvas = null;
let noiseCtx = null;
let animationFrameId = null;

// Initialize slideshow
function initSlideshow() {
  const slideshowContainer = document.getElementById('slideshow');

  if (!slideshowContainer) {
    console.error('Slideshow container not found');
    return;
  }

  // Create slides
  slideshowImages.forEach((image, index) => {
    const slide = document.createElement('div');
    slide.className = 'slide';
    if (index === 0) {
      slide.classList.add('active');
    }

    const img = document.createElement('img');
    img.src = image.src;
    img.alt = image.alt;
    img.loading = 'lazy';

    slide.appendChild(img);
    slideshowContainer.appendChild(slide);
  });

  // Start automatic slideshow
  startSlideshow();

  // Initialize white noise
  initWhiteNoise();
}

// Initialize white noise canvas
function initWhiteNoise() {
  const slideshowContainer = document.getElementById('slideshow');

  if (!slideshowContainer) return;

  // Create canvas element
  noiseCanvas = document.createElement('canvas');
  noiseCanvas.className = 'noise-canvas';
  noiseCanvas.width = slideshowContainer.offsetWidth;
  noiseCanvas.height = slideshowContainer.offsetHeight;

  slideshowContainer.appendChild(noiseCanvas);
  noiseCtx = noiseCanvas.getContext('2d');

  // Start animation
  animateNoise();

  // Handle resize
  window.addEventListener('resize', () => {
    noiseCanvas.width = slideshowContainer.offsetWidth;
    noiseCanvas.height = slideshowContainer.offsetHeight;
  });
}

// Animate white noise (TV static effect)
function animateNoise() {
  if (!noiseCtx || !noiseCanvas) return;

  const imageData = noiseCtx.createImageData(noiseCanvas.width, noiseCanvas.height);
  const data = imageData.data;

  // Generate random noise
  for (let i = 0; i < data.length; i += 4) {
    const value = Math.random() * 255;
    data[i] = value;     // Red
    data[i + 1] = value; // Green
    data[i + 2] = value; // Blue
    data[i + 3] = 255;   // Alpha (fully opaque)
  }

  noiseCtx.putImageData(imageData, 0, 0);

  // Continue animation (60fps for smooth TV static effect)
  animationFrameId = requestAnimationFrame(animateNoise);
}

// Stop white noise animation
function stopNoise() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}

// Show specific slide
function showSlide(index) {
  const slides = document.querySelectorAll('.slide');

  if (slides.length === 0) return;

  // Remove active class from all slides
  slides.forEach(slide => slide.classList.remove('active'));

  // Wrap around if necessary
  if (index >= slides.length) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide = index;
  }

  // Add active class to current slide
  slides[currentSlide].classList.add('active');
}

// Go to next slide
function nextSlide() {
  showSlide(currentSlide + 1);
}

// Go to previous slide
function prevSlide() {
  showSlide(currentSlide - 1);
}

// Start automatic slideshow
function startSlideshow() {
  if (slideshowTimer) {
    clearInterval(slideshowTimer);
  }
  slideshowTimer = setInterval(nextSlide, SLIDESHOW_INTERVAL);
}

// Stop automatic slideshow
function stopSlideshow() {
  if (slideshowTimer) {
    clearInterval(slideshowTimer);
    slideshowTimer = null;
  }
}

// Pause slideshow on hover
function addHoverPause() {
  const slideshowContainer = document.getElementById('slideshow');

  if (slideshowContainer) {
    slideshowContainer.addEventListener('mouseenter', stopSlideshow);
    slideshowContainer.addEventListener('mouseleave', startSlideshow);
  }
}

// Keyboard navigation (optional)
function addKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      startSlideshow(); // Restart timer after manual navigation
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      startSlideshow(); // Restart timer after manual navigation
    }
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initSlideshow();
    addHoverPause();
    addKeyboardNavigation();
  });
} else {
  initSlideshow();
  addHoverPause();
  addKeyboardNavigation();
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  stopSlideshow();
  stopNoise();
});
