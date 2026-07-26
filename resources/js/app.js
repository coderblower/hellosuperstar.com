document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('.lazy-image');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const fullSrc = img.getAttribute('data-src');
                    
                    if (fullSrc) {
                        // Preload the full image before swapping
                        const tempImg = new Image();
                        tempImg.src = fullSrc;
                        tempImg.onload = () => {
                            img.src = fullSrc;
                            img.classList.add('loaded');
                        };
                    }
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach((img) => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        lazyImages.forEach((img) => {
            const fullSrc = img.getAttribute('data-src');
            if (fullSrc) {
                img.src = fullSrc;
                img.classList.add('loaded');
            }
        });
    }
});
