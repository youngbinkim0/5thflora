// Utility Functions - FifthFlora

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Intersection Observer for lazy loading images
function createLazyLoader(callback) {
    const options = {
        root: null,
        rootMargin: '50px',
        threshold: 0.01
    };

    return new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, options);
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.querySelector(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Keyboard navigation helper
function handleKeyboardNav(event, callbacks) {
    const keyMap = {
        'Escape': callbacks.onEscape,
        'ArrowLeft': callbacks.onLeft,
        'ArrowRight': callbacks.onRight
    };

    const handler = keyMap[event.key];
    if (handler) {
        event.preventDefault();
        handler();
    }
}
