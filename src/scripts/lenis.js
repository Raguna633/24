import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initLenis() {
    // 1. Clean up previous instance properly
    if (window.lenis && typeof window.lenis.destroy === 'function') {
        window.lenis.destroy();
        // Clear ticker if we saved it previously
        if (window.lenisRaf) {
            gsap.ticker.remove(window.lenisRaf);
        }
    }

    // 2. Create new instance
    const lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
    });

    // 3. Make it globally accessible for cleanup and other scripts
    window.lenis = lenis;

    // 4. Define and save RAF handler for GSAP
    window.lenisRaf = (time) => {
        lenis.raf(time * 1000);
    };

    // 5. Sync Lenis scroll with GSAP
    lenis.on('scroll', ScrollTrigger.update);

    // 6. Add Lenis RAF to GSAP ticker
    gsap.ticker.add(window.lenisRaf);

    // 8. Sync lag smoothing with global config (Rule 05a)
    // Don't disable it (0) as it can cause freezes on low-end devices
    gsap.ticker.lagSmoothing(500, 33);

    // 8. Listen for viewport changes (ONLY ONCE using a global flag)
    if (!window.lenisEventsInitialized) {
        const refreshScrollTrigger = () => {
            requestAnimationFrame(() => {
                ScrollTrigger.refresh();
            });
        };

        window.addEventListener('orientationchange', () => {
            setTimeout(refreshScrollTrigger, 300);
        });

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(refreshScrollTrigger, 200);
        });

        window.addEventListener('viewModeChange', refreshScrollTrigger);
        window.lenisEventsInitialized = true;
    }

    // 9. Initial refresh to ensure ScrollTrigger knows current positions
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 100);

    return lenis;
}
