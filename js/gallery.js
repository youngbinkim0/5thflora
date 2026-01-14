// Gallery Class - FifthFlora

class Gallery {
    constructor(containerId, galleryData) {
        this.container = document.getElementById(containerId);
        this.data = galleryData;
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = this.lightbox.querySelector('.lightbox__image');
        this.lightboxVideo = this.lightbox.querySelector('.lightbox__video');
        this.currentIndex = 0;

        this.init();
    }

    init() {
        this.renderGallery();
        this.setupLazyLoading();
        this.setupLightbox();
        this.setupKeyboardNav();
    }

    renderGallery() {
        this.data.forEach((item, index) => {
            const galleryItem = this.createGalleryItem(item, index);
            this.container.appendChild(galleryItem);
        });
    }

    createGalleryItem(item, index) {
        const div = document.createElement('div');
        div.className = `gallery-item ${item.type === 'video' ? 'gallery-item--video' : ''}`;
        div.dataset.index = index;

        const img = document.createElement('img');
        img.className = 'gallery-item__image';
        img.dataset.src = item.thumbnail || item.src; // Lazy load
        img.alt = item.alt || `FifthFlora arrangement ${index + 1}`;
        img.loading = 'lazy'; // Native lazy loading as fallback

        div.appendChild(img);

        div.addEventListener('click', () => {
            this.openLightbox(index);
        });

        return div;
    }

    setupLazyLoading() {
        const images = this.container.querySelectorAll('img[data-src]');
        const lazyLoader = createLazyLoader((img) => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });

        images.forEach(img => lazyLoader.observe(img));
    }

    openLightbox(index) {
        this.currentIndex = index;
        this.showCurrentItem();
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';

        // Pause video if playing
        if (this.lightboxVideo.src) {
            this.lightboxVideo.pause();
            this.lightboxVideo.src = '';
        }
    }

    showCurrentItem() {
        const item = this.data[this.currentIndex];

        if (item.type === 'video') {
            this.lightboxImage.classList.remove('active');
            this.lightboxVideo.classList.add('active');
            this.lightboxVideo.src = item.src;
        } else {
            this.lightboxVideo.classList.remove('active');
            this.lightboxImage.classList.add('active');
            this.lightboxImage.src = item.src;
            this.lightboxImage.alt = item.alt || `FifthFlora arrangement ${this.currentIndex + 1}`;
        }
    }

    nextItem() {
        this.currentIndex = (this.currentIndex + 1) % this.data.length;
        this.showCurrentItem();
    }

    prevItem() {
        this.currentIndex = (this.currentIndex - 1 + this.data.length) % this.data.length;
        this.showCurrentItem();
    }

    setupLightbox() {
        // Close button
        this.lightbox.querySelector('.lightbox__close').addEventListener('click', () => {
            this.closeLightbox();
        });

        // Navigation buttons
        this.lightbox.querySelector('.lightbox__nav--prev').addEventListener('click', () => {
            this.prevItem();
        });

        this.lightbox.querySelector('.lightbox__nav--next').addEventListener('click', () => {
            this.nextItem();
        });

        // Close on background click
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });
    }

    setupKeyboardNav() {
        document.addEventListener('keydown', (e) => {
            if (!this.lightbox.classList.contains('active')) return;

            handleKeyboardNav(e, {
                onEscape: () => this.closeLightbox(),
                onLeft: () => this.prevItem(),
                onRight: () => this.nextItem()
            });
        });
    }
}
