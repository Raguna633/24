import { useState, useEffect, useCallback, useRef } from "react";
import { getOptimizedCloudinaryUrl } from "../utils/cloudinary";

export interface LightboxPhoto {
  id: string;
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  // If it belongs to a group (like a specific uniform with multiple photos)
  photos?: { src: string }[];
}

interface GalleryLightboxProps {
  items: LightboxPhoto[];
}

export default function GalleryLightbox({ items }: GalleryLightboxProps) {
  const [activeItem, setActiveItem] = useState<LightboxPhoto | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Listen to clicks on gallery items
  useEffect(() => {
    const handleGalleryClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest("[data-gallery-id]") as HTMLElement;

      if (button) {
        const id = button.getAttribute("data-gallery-id");
        const item = items.find((u) => u.id === id);
        if (item) {
          setActiveItem(item);
          setActivePhotoIndex(0);
          setIsFullscreen(false);
          document.body.style.overflow = "hidden"; // Prevent background scrolling
        }
      }
    };

    document.addEventListener("click", handleGalleryClick);
    return () => document.removeEventListener("click", handleGalleryClick);
  }, [items]);

  const closeModal = useCallback(() => {
    setActiveItem(null);
    setIsFullscreen(false);
    document.body.style.overflow = "";
  }, []);

  const isGrouped = !!activeItem?.photos;
  const photosList = isGrouped ? activeItem!.photos! : items;
  const currentIndex = isGrouped 
    ? activePhotoIndex 
    : items.findIndex(item => item.id === activeItem?.id);

  // Safely get current photo sources for hooks
  const currentPhoto = activeItem 
    ? (isGrouped ? activeItem.photos![activePhotoIndex] : activeItem)
    : null;
  const photoSrc = currentPhoto 
    ? (typeof currentPhoto === "string" ? currentPhoto : currentPhoto.src) 
    : "";
  const optimizedSrc = photoSrc 
    ? (photoSrc.includes("res.cloudinary.com") ? getOptimizedCloudinaryUrl(photoSrc, isFullscreen ? 2000 : 1200) : photoSrc)
    : "";

  // Reset loading state when source changes
  useEffect(() => {
    if (activeItem && optimizedSrc) {
      setIsImageLoading(true);
    }
  }, [optimizedSrc, activeItem]);

  // Preload next image
  useEffect(() => {
    if (!activeItem || photosList.length <= 1) return;
    const nextIdx = currentIndex === photosList.length - 1 ? 0 : currentIndex + 1;
    const nextPhotoObj = isGrouped ? activeItem.photos![nextIdx] : items[nextIdx];
    const nextSrcRaw = nextPhotoObj 
      ? (typeof nextPhotoObj === "string" ? nextPhotoObj : nextPhotoObj.src) 
      : "";
    const nextOptimized = nextSrcRaw.includes("res.cloudinary.com") 
      ? getOptimizedCloudinaryUrl(nextSrcRaw, isFullscreen ? 2000 : 1200) 
      : nextSrcRaw;
    
    if (nextOptimized) {
      const img = new Image();
      img.src = nextOptimized;
    }
  }, [currentIndex, photosList.length, isGrouped, activeItem, items, isFullscreen]);

  const lastActionTime = useRef(0);

  const nextPhoto = useCallback((e?: React.MouseEvent | KeyboardEvent) => {
    if (e && 'stopPropagation' in e) e.stopPropagation();
    
    // Prevent double-firing (throttle to 250ms)
    const now = Date.now();
    if (now - lastActionTime.current < 250) return;
    lastActionTime.current = now;

    if (!activeItem) return;

    if (activeItem.photos) {
      setActivePhotoIndex((prevIdx) => 
        prevIdx === activeItem.photos!.length - 1 ? 0 : prevIdx + 1
      );
    } else {
      setActiveItem((prevActive) => {
        if (!prevActive) return null;
        const idx = items.findIndex(item => item.id === prevActive.id);
        return items[idx === items.length - 1 ? 0 : idx + 1];
      });
    }
  }, [activeItem, items]);

  const prevPhoto = useCallback((e?: React.MouseEvent | KeyboardEvent) => {
    if (e && 'stopPropagation' in e) e.stopPropagation();
    
    // Prevent double-firing (throttle to 250ms)
    const now = Date.now();
    if (now - lastActionTime.current < 250) return;
    lastActionTime.current = now;

    if (!activeItem) return;

    if (activeItem.photos) {
      setActivePhotoIndex((prevIdx) => 
        prevIdx === 0 ? activeItem.photos!.length - 1 : prevIdx - 1
      );
    } else {
      setActiveItem((prevActive) => {
        if (!prevActive) return null;
        const idx = items.findIndex(item => item.id === prevActive.id);
        return items[idx === 0 ? items.length - 1 : idx - 1];
      });
    }
  }, [activeItem, items]);

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFullscreen((prev) => !prev);
  };

  const downloadPhoto = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDownloading || !activeItem) return;

    setIsDownloading(true);
    const photoToDownload = isGrouped ? activeItem.photos![activePhotoIndex] : activeItem;
    let urlToDownload = typeof photoToDownload === "string" ? photoToDownload : photoToDownload.src;

    // Use optimized version for download if it's cloudinary
    if (urlToDownload.includes("res.cloudinary.com")) {
      urlToDownload = getOptimizedCloudinaryUrl(urlToDownload, 2000);
    }

    try {
      const response = await fetch(urlToDownload);
      if (!response.ok) throw new Error("Failed to fetch image");
      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = `${activeItem.title || "gallery-photo"}-${currentIndex + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Cleanup for memory management
      window.URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error("Error downloading image:", error);
      alert("Gagal mengunduh gambar. Silakan coba lagi.");
    } finally {
      setIsDownloading(false);
    }
  };

  // Handle Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeItem) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeItem, closeModal, nextPhoto, prevPhoto]);

  if (!activeItem) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm transition-opacity duration-300"
      onClick={closeModal}
      aria-modal="true"
      role="dialog"
    >
      {/* Top Banner (Details & Close) */}
      <div
        className={`absolute top-0 left-0 right-0 flex items-center justify-between p-4 md:p-6 bg-gradient-to-b from-black/70 to-transparent text-white transition-opacity duration-300 z-10 ${isFullscreen ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col">
          <h2 className="text-xl md:text-2xl font-bold">{activeItem.title || "Photo Preview"}</h2>
          {activeItem.subtitle && (
            <p className="text-sm md:text-base text-gray-300" dangerouslySetInnerHTML={{ __html: activeItem.subtitle }} />
          )}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={downloadPhoto}
            className={`p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors ${isDownloading ? "opacity-50 cursor-not-allowed" : ""}`}
            title="Download Full Quality"
            disabled={isDownloading}
          >
            {isDownloading ? (
              <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            )}
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors hidden md:block"
            title="Toggle Fullscreen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isFullscreen ? (
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
              ) : (
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              )}
            </svg>
          </button>
          <button
            onClick={closeModal}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close Modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Main Image Container */}
      <div
        className={`relative w-full flex items-center justify-center transition-all duration-500 ease-out-expo ${isFullscreen ? 'h-dvh' : 'h-[80vh] md:h-[85vh] max-w-6xl'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {isImageLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-0 gap-4">
            <div className="w-12 h-12 relative">
              <div className="absolute inset-0 rounded-full border-t-2 border-white/80 animate-spin"></div>
              <div className="absolute inset-2 rounded-full border-r-2 border-white/40 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.7s' }}></div>
              <div className="absolute inset-4 rounded-full border-b-2 border-white/20 animate-spin" style={{ animationDuration: '1.5s' }}></div>
            </div>
            <span className="text-white/50 text-xs uppercase tracking-[0.2em] font-medium animate-pulse">Memuat...</span>
          </div>
        )}
        <img
          src={optimizedSrc}
          alt={`Photo ${currentIndex + 1} of ${activeItem.title}`}
          className={`object-contain transition-all duration-300 relative z-10 ${isFullscreen ? 'w-full h-full' : 'max-w-full max-h-full rounded-md shadow-2xl'} ${isImageLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
          style={{ width: isFullscreen ? '100%' : 'auto', height: isFullscreen ? '100%' : 'auto' }}
          loading="eager"
          onLoad={() => setIsImageLoading(false)}
        />
      </div>

      {/* Navigation Arrows */}
      {(isGrouped ? photosList.length > 1 : items.length > 1) && (
        <>
          <button
            onClick={prevPhoto}
            className={`absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 text-white hover:bg-black/70 backdrop-blur-md transition-all z-10 ${isFullscreen ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}
            aria-label="Previous photo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <button
            onClick={nextPhoto}
            className={`absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 text-white hover:bg-black/70 backdrop-blur-md transition-all z-10 ${isFullscreen ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}
            aria-label="Next photo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          {/* Pagination Dots (Only show if multiple photos) */}
          {photosList.length > 1 && (
            <div className={`absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 md:gap-2 z-10 overflow-x-auto px-4 py-2 scrollbar-hide ${isFullscreen ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
              {photosList.length <= 15 ? (
                // Show all dots if 15 or less
                photosList.map((_, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={idx}
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        if (isGrouped) {
                          setActivePhotoIndex(idx);
                        } else {
                          setActiveItem(items[idx]);
                        }
                      }}
                      className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 flex-shrink-0 ${isActive ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'}`}
                      aria-label={`Go to photo ${idx + 1}`}
                    />
                  );
                })
              ) : (
                <div className="bg-black/50 backdrop-blur-md text-white text-sm font-medium px-4 py-1.5 rounded-full">
                  {currentIndex + 1} / {photosList.length}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
