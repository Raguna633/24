import React, { useState, useRef, useEffect } from 'react';
import { waitForLoading } from '../../utils/loadingState';

// Inline SVG Icons
const PlayIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>
);

const PauseIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
);

const MusicIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

interface AudioPlayerProps {
  src: string;
}

export default function AudioPlayer({ src }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Set initial path
    setCurrentPath(window.location.pathname);

    // Sync path on Astro navigation
    const handlePageLoad = () => {
      setCurrentPath(window.location.pathname);
    };

    document.addEventListener('astro:after-swap', handlePageLoad);

    let isMounted = true;
    let timer: NodeJS.Timeout;

    const initPopup = async () => {
      // Tunggu hingga transisi halaman dan loading overlay selesai
      await waitForLoading();
      
      if (!isMounted) return;

      // Mulai hitung 3 detik hanya setelah halaman terlihat sepenuhnya
      timer = setTimeout(() => {
        if (isMounted) setShowPopup(true);
      }, 3000);
    };

    initPopup();
    
    return () => {
      isMounted = false;
      clearTimeout(timer);
      document.removeEventListener('astro:after-swap', handlePageLoad);
    };
  }, [src]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      // Sembunyikan popup secara permanen setelah interaksi pertama
      setShowPopup(false); 
    }
    setIsPlaying(!isPlaying);
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  // Logika Visibilitas:
  // Komponen tetap ada jika sedang di halaman About atau Song (sumber audio)
  // ATAU jika audio sedang aktif berputar (sedang menyeberang halaman)
  const isAudioPage = currentPath.includes('/about-altie') || currentPath.includes('/song');
  const shouldRender = isAudioPage || isPlaying;

  if (!shouldRender) return null;

  return (
    <div className="fixed top-6 left-6 z-[100] flex flex-row items-center gap-4 font-sans pointer-events-none">
      {/* Audio Element */}
      <audio 
        id="global-mars-audio"
        ref={audioRef} 
        src={src} 
        onEnded={handleAudioEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        preload="auto"
      />

      {/* Play Button - Pointer events diaktifkan kembali karena container utama non-interactive */}
      <button
        onClick={togglePlay}
        className={`pointer-events-auto group relative flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 hover:scale-105 active:scale-95 overflow-hidden ${
          isPlaying ? 'bg-[#f5f0ea] text-[#2A358F]' : 'bg-[#2A358F] text-[#f5f0ea]'
        }`}
        aria-label={isPlaying 
          ? `Jeda ${currentPath.includes('/song') ? "Lagu" : "Mars"}` 
          : `Putar ${currentPath.includes('/song') ? "Lagu" : "Mars"}`
        }
      >
        {/* Ripple effect when playing - Lebih halus (opacity-20) */}
        {isPlaying && (
          <div className="absolute inset-0 rounded-full bg-[#2A358F]/20 animate-ping" style={{ animationDuration: '2s' }}></div>
        )}
        
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          {isPlaying ? (
            <PauseIcon className="w-6 h-6 fill-current" />
          ) : (
            <PlayIcon className="w-6 h-6 fill-current ml-1" />
          )}
        </div>
      </button>

      {/* Interactive Popup (Horizontal slide from left) */}
      <div 
        className={`pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left transform ${
          showPopup && isAudioPage
            ? 'opacity-100 scale-100 translate-x-0' 
            : 'opacity-0 scale-95 -translate-x-8 pointer-events-none'
        }`}
      >
        <div className="bg-[#2A358F]/90 backdrop-blur-md text-[#f5f0ea] px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-4 border border-[#f5f0ea]/20 relative">
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#f5f0ea]/10 shadow-inner animate-pulse flex-shrink-0">
            <MusicIcon className="w-4 h-4" />
          </div>
          <div className="whitespace-nowrap">
            <p className="text-sm font-bold tracking-wide m-0">
              {currentPath.includes('/song') ? "Dengarkan Lagu Angkatan" : "Dengarkan Mars"}
            </p>
            <p className="text-xs text-[#f5f0ea]/70 font-medium tracking-wider m-0">
              {currentPath.includes('/song') ? "Nihayatu Zayn Official" : "Al-Ittihad Official"}
            </p>
          </div>
          <button 
            onClick={() => setShowPopup(false)}
            className="ml-1 text-[#f5f0ea]/50 hover:text-[#f5f0ea] transition-colors p-1"
            aria-label="Tutup notifikasi"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
