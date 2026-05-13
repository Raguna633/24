// src/utils/gsap-config.ts
 
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CSSPlugin } from "gsap/CSSPlugin";
 
/**
 * setupGSAP()
 * Inisialisasi global GSAP dengan konfigurasi optimal untuk perangkat low-end.
 * WAJIB dipanggil sekali di MainLayout sebelum animasi apapun dijalankan.
 */
export function setupGSAP(): void {
  // Daftarkan semua plugin yang digunakan
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(CSSPlugin);
 
  // Lag Smoothing (Rule 05a):
  // Parameter 1 (300ms): Threshold lebih agresif — catch up lebih cepat saat frame drop
  // Parameter 2 (16ms): ~60fps minimum, lebih responsif dari 33ms sebelumnya
  gsap.ticker.lagSmoothing(300, 16);
 
  // Batasi FPS maksimum ke 60fps
  // Perangkat lemah lebih stabil di 60fps daripada mencoba 120fps
  gsap.ticker.fps(60);
 
  // Default global: berlaku untuk SEMUA animasi gsap.from(), gsap.to(), dll.
  // Dapat di-override per animasi jika diperlukan
  gsap.defaults({
    ease: 'power2.out',   // Easing ringan sebagai default
    duration: 0.6,         // Durasi standar
    force3D: true,         // Selalu pakai GPU layer
  });
 
  // Konfigurasi ScrollTrigger untuk performa optimal
  ScrollTrigger.config({
    // Batasi callback yang dipanggil per frame, mencegah overload di scroll cepat
    limitCallbacks: true,

    // Sync ScrollTrigger setiap 40ms, bukan setiap frame (default: setiap frame)
    // Mengurangi CPU usage signifikan di scroll event
    syncInterval: 40,
  });

  // ❌ ScrollTrigger.normalizeScroll(true) — DIHAPUS
  // Alasan: Konflik fatal dengan Lenis smooth scroll.
  // Keduanya me-intercept scroll events secara bersamaan:
  // - Lenis: handle smooth interpolation + forward ke GSAP ticker
  // - normalizeScroll: override scroll events di level browser
  // Akibat pada mobile: double-interception → frame drop, ghost scroll, iOS rubber-band palsu.
  // Lenis sudah menangani scroll normalization dengan lebih baik.
}
