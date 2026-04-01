// src/utils/loadingState.ts
//
// Koordinator state loading berbasis Promise.
//
// Kenapa lebih baik dari CustomEvent + window flag?
//
// CustomEvent approach memiliki beberapa kelemahan:
//   1. window._loadingComplete adalah global mutable state —
//      bisa di-overwrite oleh kode lain secara tidak sengaja
//   2. Ada jeda kecil antara dispatchEvent() dan listener menerima
//      event (microtask queue), yang bisa menyebabkan race condition
//      pada halaman yang sangat cepat load
//   3. setTimeout(100) untuk fade Astro adalah angka arbitrary —
//      tidak ada jaminan 100ms cukup di semua kondisi jaringan/device
//
// Promise approach menyelesaikan semua ini:
//   1. State tersimpan di module scope (closure), bukan window
//   2. Promise.then() dijamin berjalan SETELAH resolve() dipanggil,
//      tidak ada race condition
//   3. Jika halaman await promise yang sudah resolved → langsung
//      lanjut, tidak ada delay
// =================================================================

// =================================================================
// TIPE DATA
// =================================================================

// Fungsi resolve yang disimpan untuk dipanggil nanti dari luar
type ResolveFn = () => void;

// =================================================================
// MODULE STATE
//
// Variabel-variabel ini hidup di module scope (bukan window/global).
// Hanya bisa diakses lewat fungsi-fungsi yang diekspor di bawah.
// Ini adalah pola "module as singleton" — satu instance untuk
// seluruh lifetime aplikasi.
// =================================================================

// Promise aktif untuk navigasi saat ini.
// null = belum ada navigasi yang sedang berjalan
let currentPromise: Promise<void> | null = null;

// Referensi ke fungsi resolve() dari currentPromise.
// Dipanggil oleh Loading.astro ketika animasinya selesai.
let currentResolve: ResolveFn | null = null;

// =================================================================
// FUNGSI YANG DIEKSPOR
// =================================================================

// -----------------------------------------------------------------
// prepareLoading()
// Dipanggil oleh Loading.astro SEBELUM animasi dimulai.
// Membuat Promise baru yang akan di-resolve setelah animasi selesai.
//
// Kenapa perlu membuat Promise baru setiap navigasi?
// Promise yang sudah resolved tidak bisa "di-reset".
// Kita perlu Promise segar untuk setiap navigasi agar halaman
// baru bisa menunggu dengan benar.
// -----------------------------------------------------------------
export function prepareLoading(): void {
  currentPromise = new Promise<void>((resolve) => {
    // Simpan resolve agar bisa dipanggil dari luar Promise
    currentResolve = resolve;
  });
}

// -----------------------------------------------------------------
// completeLoading()
// Dipanggil oleh Loading.astro SETELAH animasi selesai.
// Me-resolve Promise yang sedang ditunggu oleh halaman.
// -----------------------------------------------------------------
export function completeLoading(): void {
  if (currentResolve) {
    currentResolve();  // "unlock" semua yang sedang await
    currentResolve = null;
  }
}

// -----------------------------------------------------------------
// waitForLoading()
// Dipanggil oleh halaman untuk menunggu loading selesai.
//
// Return value:
//   Promise<void> yang resolve ketika loading selesai.
//
// Tiga skenario yang ditangani:
//   1. Promise belum ada (first load sebelum prepareLoading dipanggil)
//      → kembalikan Promise yang langsung resolved
//   2. Promise ada dan belum resolved → tunggu
//   3. Promise ada dan sudah resolved → langsung lanjut
//      (Promise yang resolved selalu memanggil .then() secara
//       async di microtask queue, tanpa delay tambahan)
// -----------------------------------------------------------------
export function waitForLoading(): Promise<void> {
  return currentPromise ?? Promise.resolve();
}