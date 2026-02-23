import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initLenis() {
    const lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
    });

    // Sync Lenis scroll with GSAP
    lenis.on('scroll', gsap.updateRoot);

    // Add Lenis RAF to GSAP ticker
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    // Disable GSAP lag smoothing for smoother animation
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after Lenis is initialized
    // This ensures correct calculation when viewport changes (desktop/mobile mode)
    ScrollTrigger.refresh();

    // Refresh ScrollTrigger when viewport changes (orientation change, resize, view mode toggle)
    const refreshScrollTrigger = () => {
        // Small delay to ensure viewport is fully updated
        requestAnimationFrame(() => {
            ScrollTrigger.refresh();
        });
    };

    // Listen for viewport changes
    window.addEventListener('orientationchange', () => {
        setTimeout(refreshScrollTrigger, 300);
    });

    // Debounced resize listener
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(refreshScrollTrigger, 200);
    });

    // Listen for view mode toggle changes (custom event)
    window.addEventListener('viewModeChange', refreshScrollTrigger);

    return lenis;
}
