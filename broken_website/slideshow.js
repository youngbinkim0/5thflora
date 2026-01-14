// Slideshow data
const slideshowImages = [
  { src: "images/02S73AmAXE_2j7np8.jpeg", alt: "Flower bouquet, Cut flowers, Floral design, Floristry, Petal, Pink" },
  { src: "images/jW1dHRM57g_2j7np8.jpeg", alt: "Flowerpot, Blond" },
  { src: "images/eABkUQsCBB_2j7np8.jpeg", alt: "Flower bouquet, Cut flowers, Floral design, Red, Floristry, Petal" },
  { src: "images/g98192-I2k_2j7np8.jpeg", alt: "Flower bouquet, Cut flowers, Floral design, Red, Petal, Floristry, Pink" },
  { src: "images/eUPyexDLKq_2j7np8.jpeg", alt: "Flower bouquet, Cut flowers, Floral design, Red, Floristry, Flowerpot" },
  { src: "images/wSDiFU6SQF_2j7np8.jpeg", alt: "Flower bouquet, Interior design, Cut flowers, Furniture, Floristry, Table, Flowerpot, Lighting" },
  { src: "images/RugjxeSlFW_2j7np8.jpeg", alt: "Flower bouquet, Wedding dress, Bridal Clothing, Cut flowers, Bride, Petal, Floristry" },
  { src: "images/SubDbJaZwd_2j7np8.jpeg", alt: "Wedding dress, Formal wear, Flower bouquet, Bridal Clothing, Bride, Petal, Event, Gown" },
  { src: "images/tzj0ExoAbH_2j7np8.jpeg", alt: "Flower bouquet, Cut flowers, Wedding dress, Petal, Floristry, White, Event" },
  { src: "images/WzItF9_ZvS_2ka95d.png", alt: "Bride in white dress and veil, flanked by bridesmaids in blue, walks down outdoor stairs." },
  { src: "images/DeZV6zi7jY_2ka95d.jpg", alt: "Backyard with red roses & blue flowers on a glass table, tree, fence, and string lights." },
  { src: "images/LaILZooFMW_2ka95d.jpg", alt: "A bride in a white dress and veil holds a bouquet in a sunny rose garden." },
  { src: "images/sPHuIjRqF9_2ka95d.jpg", alt: "Bookshelves, projector, fireplace with pink roses, mirror reflecting painting, and a cat's paw." },
  { src: "images/8HEMwd-xP9_2ka95d.jpg", alt: "Vibrant floral arrangement on a white mantelpiece, reflected in a mirror, adjacent to a kitchen." },
  { src: "images/dJzXBctHXX_2ka95d.jpg", alt: "Outdoor floral display: red roses in a blue vase, surrounded by blue and white flowers on a glass table." },
  { src: "images/C3WqfnZMeG_2ka95d.jpg", alt: "Bride and groom embrace, foreheads touching, in a lush garden with a gazebo and flowers." },
  { src: "images/T5HAbwEEe2_2ka95d.jpg", alt: "Vibrant floral arrangement in crystal vase on a round wooden table by a window, with a painting." },
  { src: "images/crS6p5ooJe_2ka95d.jpg", alt: "Green and white hellebore bouquet with delicate white flowers in a glass vase." },
  { src: "images/3Z_kHaI9_m_2ka95d.jpg", alt: "Happy groom kisses laughing bride's forehead, she holds a flower bouquet at their wedding." },
  { src: "images/KulhZruKAO_2j7np8.jpeg", alt: "Flower bouquet, Cut flowers, Flowering plant, Floristry, Petal, Centrepiece, Vase, Purple" },
  { src: "images/lbbieciXpP_2ka95d.jpg", alt: "White lilies, a fish tank, and framed art on a wooden cabinet in a dimly lit room." },
  { src: "images/yD9E_2EXdb_2ka95d.jpg", alt: "Vibrant floral display with pink orchids, red blossoms, purple lilacs, and orange tulips." },
  { src: "images/C5A-3OBov__2ka95d.jpg", alt: "Smiling groom and bride hold hands under a eucalyptus wedding arch, in black and white." },
  { src: "images/yqPKKinH6W_2ka95d.jpg", alt: "Bride and three bridesmaids smiling on a beach boardwalk, holding flowers." },
  { src: "images/5MRNkrX-Z4_2ka95d.jpg", alt: "Smiling wedding couple in a bright garden with flowers." },
  { src: "images/Ga5ggIsJaU_2ka95d.jpg", alt: "Joyful bride and bridesmaids smiling with colorful bouquets." },
  { src: "images/Ie6H_9LlPG_2ka95d.jpg", alt: "Cozy dining area with a flower arrangement on a table set with dishes, next to a lamp and wall art." },
  { src: "images/U90kif5TYV_2ka95d.jpg", alt: "B&W close-up of a bride in a white dress holding a mixed floral bouquet." },
  { src: "images/KH2uuB2sIv_2ka95d.jpg", alt: "Shelf decor: books, pink roses, Matisse portrait, and bird painting." }
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
