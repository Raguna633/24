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
 
  // Lag Smoothing:
  // Parameter 1 (500ms): Jika frame gap > 500ms, GSAP akan "catch up" secara smooth
  // Parameter 2 (33ms): Interval minimum antar frame (setara ~30fps minimum)
  gsap.ticker.lagSmoothing(500, 33);
 
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
  });

  // 📱 Normalize Scroll: Nuklir option untuk fix stuttering di mobile
  // Mengambil alih scroll native agar sinkron dengan GSAP lerp
  ScrollTrigger.normalizeScroll(true);
}
