import anime from 'https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.es.js';

/**
 * Creates a fade-in animation for the given targets.
 * @param {string | HTMLElement | NodeListOf<HTMLElement>} targets - The CSS selector or element(s) to animate.
 * @param {object} [options={}] - Additional options for the animation.
 */
function fadeIn(targets, options = {}) {
    const defaultOptions = {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1000,
        easing: 'easeOutExpo',
    };

    anime({
        targets,
        ...defaultOptions,
        ...options,
    });
}

/**
 * Initializes a preloader animation.
 * @param {function} onComplete - Callback function to execute when the preloader animation is complete.
 */
function animatePreloader(onComplete) {
    const preloaderLogo = document.querySelector('.preloader-logo');
    if (!preloaderLogo) {
        if (onComplete) onComplete();
        return;
    }

    anime({
        targets: preloaderLogo,
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutExpo',
        complete: () => {
            anime({
                targets: '.preloader',
                opacity: [1, 0],
                duration: 500,
                easing: 'easeOutExpo',
                delay: 200,
                complete: () => {
                    const preloader = document.querySelector('.preloader');
                    if (preloader) {
                        preloader.style.display = 'none';
                    }
                    if (onComplete) onComplete();
                }
            });
        }
    });
}

export { fadeIn, animatePreloader };

