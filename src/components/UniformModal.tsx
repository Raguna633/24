import { useState, useEffect, useCallback } from "react";

interface UniformData {
  id: string;
  data: {
    uniformName: string;
    uniformPhotos: { src: string; width: number; height: number; format: string }[];
    modelName: string;
    modelClass: string;
  };
}

interface UniformModalProps {
  uniforms: UniformData[];
}

export default function UniformModal({ uniforms }: UniformModalProps) {
  const [activeUniform, setActiveUniform] = useState<UniformData | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Listen to clicks on gallery items
  useEffect(() => {
    const handleGalleryClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest("[data-gallery-id]") as HTMLElement;
      
      if (button) {
        const id = button.getAttribute("data-gallery-id");
        const uniform = uniforms.find((u) => u.id === id);
        if (uniform) {
          setActiveUniform(uniform);
          setActivePhotoIndex(0);
          setIsFullscreen(false);
          document.body.style.overflow = "hidden"; // Prevent background scrolling
        }
      }
    };

    document.addEventListener("click", handleGalleryClick);
    return () => document.removeEventListener("click", handleGalleryClick);
  }, [uniforms]);

  const closeModal = useCallback(() => {
    setActiveUniform(null);
    setIsFullscreen(false);
    document.body.style.overflow = "";
  }, []);

  const nextPhoto = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!activeUniform) return;
    setActivePhotoIndex((prev) => 
      prev === activeUniform.data.uniformPhotos.length - 1 ? 0 : prev + 1
    );
  }, [activeUniform]);

  const prevPhoto = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!activeUniform) return;
    setActivePhotoIndex((prev) => 
      prev === 0 ? activeUniform.data.uniformPhotos.length - 1 : prev - 1
    );
  }, [activeUniform]);

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFullscreen((prev) => !prev);
  };

  // Handle Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeUniform) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeUniform, closeModal, nextPhoto, prevPhoto]);

  if (!activeUniform) return null;

  const photos = activeUniform.data.uniformPhotos;
  const currentPhoto = photos[activePhotoIndex];

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
          <h2 className="text-xl md:text-2xl font-bold">{activeUniform.data.uniformName}</h2>
          <p className="text-sm md:text-base text-gray-300">
            Model: <span className="text-white font-medium">{activeUniform.data.modelName}</span> ({activeUniform.data.modelClass})
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleFullscreen}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            title="Toggle Fullscreen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isFullscreen ? (
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
              ) : (
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
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
        className={`relative w-full flex items-center justify-center transition-all duration-500 ease-out-expo ${isFullscreen ? 'h-screen' : 'h-[80vh] md:h-[85vh] max-w-6xl'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={currentPhoto.src} 
          alt={`Photo ${activePhotoIndex + 1} of ${activeUniform.data.uniformName}`}
          className={`object-contain transition-all duration-300 ${isFullscreen ? 'w-full h-full' : 'max-w-full max-h-full rounded-md shadow-2xl'}`}
          style={{ width: isFullscreen ? '100%' : 'auto', height: isFullscreen ? '100%' : 'auto' }}
        />
      </div>

      {/* Navigation Arrows (Only show if multiple photos) */}
      {photos.length > 1 && (
        <>
          <button 
            onClick={prevPhoto}
            className={`absolute left-4 md:left-8 p-3 rounded-full bg-black/40 text-white hover:bg-black/70 backdrop-blur-md transition-all z-10 ${isFullscreen ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}
            aria-label="Previous photo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <button 
            onClick={nextPhoto}
            className={`absolute right-4 md:right-8 p-3 rounded-full bg-black/40 text-white hover:bg-black/70 backdrop-blur-md transition-all z-10 ${isFullscreen ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}
            aria-label="Next photo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          {/* Pagination Indicators */}
          <div className={`absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10 ${isFullscreen ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
            {photos.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setActivePhotoIndex(idx); }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === activePhotoIndex ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'}`}
                aria-label={`Go to photo ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
