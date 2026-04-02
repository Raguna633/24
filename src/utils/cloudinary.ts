/**
 * Utility untuk mengoptimalkan URL Cloudinary secara otomatis.
 * Menyisipkan f_auto (format otomatis), q_auto (kualitas otomatis), 
 * dan parameter lebar (w) serta crop (c_limit).
 */
export function getOptimizedCloudinaryUrl(url: string, width: number = 800): string {
    if (!url) return "";

    // Cek apakah URL berasal dari Cloudinary
    if (url.includes("res.cloudinary.com")) {
        // Cari bagian '/upload/' untuk menyisipkan transformasi
        // URL Cloudinary format: https://res.cloudinary.com/cloud_name/image/upload/v12345/public_id.jpg
        const parts = url.split("/upload/");
        if (parts.length === 2) {
            return `${parts[0]}/upload/f_auto,q_auto,w_${width},c_limit/${parts[1]}`;
        }
    }

    return url;
}

/**
 * Membuat srcset untuk responsive images menggunakan Cloudinary
 */
export function getCloudinarySrcset(url: string, widths: number[] = [300, 600, 900, 1200]): string {
    if (!url.includes("res.cloudinary.com")) return "";
    
    return widths
        .map(w => `${getOptimizedCloudinaryUrl(url, w)} ${w}w`)
        .join(", ");
}
