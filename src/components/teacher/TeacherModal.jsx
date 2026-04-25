import React, { useState, useEffect } from 'react';
import { getOptimizedCloudinaryUrl } from '../../utils/cloudinary';

const TeacherModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [teacherData, setTeacherData] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false); // For managing entry/exit animations properly

  useEffect(() => {
    const handleOpenModal = (event) => {
      setTeacherData(event.detail);
      setIsRendered(true);
      // handled by useEffect now to prevent flash

      // Stop body scrolling if lenis is used, might need to disable lenis instance, 
      // but standard approach is overflow hidden
      document.body.style.overflow = 'hidden';
    };

    window.addEventListener('openTeacherModal', handleOpenModal);

    return () => {
      window.removeEventListener('openTeacherModal', handleOpenModal);
      document.body.style.overflow = '';
    };
  }, []);

  // Handle entry animation with a safer delay to prevent "flashing"
  useEffect(() => {
    if (isRendered) {
      // Use double rAF or 50ms delay to guarantee initial state (opacity-0) is painted
      const timer = setTimeout(() => setIsOpen(true), 50);
      return () => clearTimeout(timer);
    } else {
      setIsOpen(false);
    }
  }, [isRendered]);

  const closeModal = () => {
    setIsOpen(false);
    setIsLightboxOpen(false);
    document.body.style.overflow = '';

    // Wait for exit animation to finish before removing from DOM
    setTimeout(() => {
      setIsRendered(false);
      setTeacherData(null);
    }, 700); // Matches duration-700
  };

  const closeLightbox = (e) => {
    e.stopPropagation();
    setIsLightboxOpen(false);
  };

  if (!isRendered) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-[#251e54]/80 backdrop-blur-[8px] cursor-pointer transition-opacity duration-700 ease-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={closeModal}
        ></div>

        {/* Modal Content */}
        <div
          className={`relative z-10 w-full max-w-4xl bg-[#f5f0ea] shadow-2xl rounded-[2rem] overflow-hidden flex flex-col md:flex-row transform transition-all duration-700 ease-out ${isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-12 opacity-0'}`}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-20 w-12 h-12 bg-white/20 backdrop-blur-md hover:bg-white/80 text-[#251e54] rounded-full flex items-center justify-center transition-all duration-300"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Photo Section */}
          <div
            className="w-full md:w-[45%] cursor-zoom-in relative group"
            onClick={() => setIsLightboxOpen(true)}
          >
            <div className="absolute inset-0 bg-[#251e54]/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
            {teacherData && (
              <img
                src={getOptimizedCloudinaryUrl(teacherData.image, 800)}
                alt={teacherData.name}
                className="w-full h-[350px] md:h-[500px] object-cover filter sepia-[0.15] contrast-110"
              />
            )}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              Click to enlarge
            </div>
          </div>

          {/* Details Section */}
          <div className="w-full md:w-[55%] p-8 md:p-12 flex flex-col justify-center bg-white/50 text-[#251e54]">
            {teacherData && (
              <>
                <h2 className="text-4xl md:text-5xl font-serif text-[#3557a2] font-bold mb-6 tracking-tight leading-tight">{teacherData.name}</h2>

                <div className="w-16 h-[3px] bg-[#3557a2]/30 mb-8 rounded-full"></div>

                <div className="flex flex-col gap-2">
                  <span className="block text-xs md:text-sm uppercase tracking-[0.2em] font-bold text-[#3557a2]/60">Taught Subjects</span>
                  <p className="text-lg md:text-xl font-light tracking-wide text-[#251e54]/80">{teacherData.subjects}</p>
                </div>
              </>
            )}
          </div>
        </div>

      </div>

      {/* Lightbox / Zoom (Renders using React Portal in a real app, but this works fine full screen) */}
      <div
        className={`fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-12 bg-black/95 cursor-zoom-out transition-all duration-500 ease-out ${isLightboxOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={closeLightbox}
      >
        {teacherData && (
          <img
            src={getOptimizedCloudinaryUrl(teacherData.image, 1600)}
            alt={teacherData.name}
            className={`w-full max-h-dvh object-contain transform transition-transform duration-700 ease-out ${isLightboxOpen ? 'scale-100' : 'scale-90'}`}
            onClick={(e) => {
              // Click to close as well
              closeLightbox(e);
            }}
          />
        )}
      </div>
    </>
  );
};

export default TeacherModal;
