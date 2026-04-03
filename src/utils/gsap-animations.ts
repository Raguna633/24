// src/utils/gsap-animations.ts
 
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
 
/**
 * Cek apakah user meminta reduced motion.
 * Selalu cek ini sebelum menjalankan animasi.
 */
export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
 
/**
 * fadeUp()
 * Animasi elemen dari bawah ke posisi normal, fade-in.
 * Paling umum digunakan untuk card, text, section.
 *
 * @param elements - CSS selector atau HTMLElement
 * @param options - Override default animasi
 */
export function fadeUp(
  elements: string | HTMLElement | HTMLElement[],
  options: {
    y?: number;           // Jarak vertikal (default: 40)
    duration?: number;    // Durasi animasi (default: 0.6)
    delay?: number;       // Delay sebelum animasi (default: 0)
    stagger?: number;     // Delay antar elemen (default: 0)
    once?: boolean;       // Hanya animasi sekali (default: true)
    trigger?: string | HTMLElement; // Trigger element
    start?: string;       // ScrollTrigger start (default: 'top 90%')
  } = {}
): gsap.core.Tween | void {
  // Jika user minta reduced motion, tampilkan langsung tanpa animasi
  if (prefersReducedMotion()) {
    gsap.set(elements, { opacity: 1, y: 0 });
    return;
  }
 
  const {
    y = 40,
    duration = 0.6,
    delay = 0,
    stagger = 0,
    once = true,
    trigger,
    start = 'top 90%',
  } = options;
 
  return gsap.from(elements, {
    opacity: 0,
    y,
    duration,
    delay,
    stagger,
    ease: 'power2.out',
    force3D: true,
    scrollTrigger: trigger || typeof elements === 'string' ? {
      trigger: trigger || (typeof elements === 'string' ? elements : undefined),
      start,
      once,
    } : undefined,
  });
}
 
/**
 * fadeIn()
 * Animasi elemen muncul tanpa pergerakan (pure fade).
 * Gunakan untuk overlay, modal, background.
 *
 * @param elements - CSS selector atau HTMLElement
 * @param duration - Durasi fade (default: 0.5)
 */
export function fadeIn(
  elements: string | HTMLElement,
  duration: number = 0.5
): gsap.core.Tween | void {
  if (prefersReducedMotion()) {
    gsap.set(elements, { opacity: 1 });
    return;
  }
 
  return gsap.from(elements, {
    opacity: 0,
    duration,
    ease: 'power1.out',
    force3D: true,
  });
}
 
/**
 * staggerFadeUp()
 * Animasi group elemen secara bertahap (satu per satu).
 * Gunakan untuk grid card, list item, menu items.
 */
export function staggerFadeUp(
  elements: string,
  staggerDelay: number = 0.08
): void {
  if (prefersReducedMotion()) {
    gsap.set(elements, { opacity: 1, y: 0 });
    return;
  }
 
  // Ambil semua elemen dan animasikan per-elemen dengan ScrollTrigger
  // Lebih efisien daripada stagger global untuk banyak elemen
  gsap.utils.toArray<HTMLElement>(elements).forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 30,
      duration: 0.5,
      ease: 'power2.out',
      force3D: true,
      scrollTrigger: {
        trigger: el,
        start: 'top 95%',
        once: true,
      },
    });
  });
}
