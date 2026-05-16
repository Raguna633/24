import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

type ModalType = 'privacy' | 'terms' | 'credits' | null;

export default function LegalModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ModalType>(null);
  
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpen = (e: any) => {
      const type = e.detail?.type || 'privacy';
      setActiveTab(type);
      setIsOpen(true);
    };

    window.addEventListener('open-legal-modal', handleOpen);
    return () => window.removeEventListener('open-legal-modal', handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      // GSAP Entrance Animation
      const tl = gsap.timeline();
      tl.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' })
        .fromTo(contentRef.current, 
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.2)' },
          "-=0.1"
        );
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const closePortal = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsOpen(false);
        setActiveTab(null);
      }
    });
    
    tl.to(contentRef.current, { opacity: 0, y: 20, scale: 0.95, duration: 0.3, ease: 'power2.in' })
      .to(overlayRef.current, { opacity: 0, duration: 0.2 }, "-=0.1");
  };

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) closePortal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  if (!isOpen) return null;

  const tabs = [
    { id: 'privacy', label: 'Privacy Policy' },
    { id: 'terms', label: 'Terms of Service' },
    { id: 'credits', label: 'Credits & Assets' },
  ];

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-md opacity-0"
        onClick={closePortal}
      />

      {/* Modal Content */}
      <div 
        ref={contentRef}
        className="relative bg-[#f5f0ea] w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-white/20"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-heading font-bold text-[#251E54]">
            {tabs.find(t => t.id === activeTab)?.label}
          </h2>
          <button 
            onClick={closePortal}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 group-hover:rotate-90 transition-transform duration-300">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-white/50 px-6 overflow-x-auto scrollbar-hide border-b border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ModalType)}
              className={`py-4 px-6 text-sm font-medium whitespace-nowrap transition-all relative
                ${activeTab === tab.id ? 'text-[#3557A2]' : 'text-gray-500 hover:text-gray-700'}
              `}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3557A2]" />
              )}
            </button>
          ))}
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-white/30">
          <div className="prose prose-slate max-w-none text-[#251E54]/80">
            {activeTab === 'privacy' && (
              <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <p className="mb-4">Halaman ini menjelaskan bagaimana kami mengelola data pribadi Anda dalam platform Yearbook Digital Nihayatu Zayn.</p>
                <h3 className="text-lg font-bold mt-6 mb-2">1. Pengumpulan Data</h3>
                <p>Data yang ditampilkan (nama, foto, kutipan) telah dikumpulkan dengan persetujuan (consent) tertulis dari setiap siswa atau wali murid bagi yang berusia di bawah 18 tahun.</p>
                <h3 className="text-lg font-bold mt-6 mb-2">2. Penggunaan Data</h3>
                <p>Data ini digunakan secara eksklusif untuk kepentingan dokumentasi alumni dan kenangan angkatan. Kami tidak menjual atau membagikan data pribadi kepada pihak ketiga untuk kepentingan komersial.</p>
                <h3 className="text-lg font-bold mt-6 mb-2">3. Keamanan</h3>
                <p>Kami menerapkan protokol keamanan standar untuk melindungi aset digital dari penyalahgunaan. Seluruh foto diproses melalui CDN yang aman.</p>
                <h3 className="text-lg font-bold mt-6 mb-2">4. Hak untuk Dilupakan</h3>
                <p>Jika Anda ingin data Anda dihapus dari platform ini, silakan hubungi tim panitia melalui saluran yang tersedia. Kami akan memproses permintaan penghapusan data dalam waktu 3x24 jam.</p>
              </section>
            )}

            {activeTab === 'terms' && (
              <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <p className="mb-4">Dengan mengakses website ini, Anda setuju untuk mematuhi ketentuan berikut:</p>
                <h3 className="text-lg font-bold mt-6 mb-2">1. Penggunaan Konten</h3>
                <p>Seluruh konten dalam website ini (foto, video, desain) adalah milik angkatan Nihayatu Zayn. Anda dilarang menggunakan aset dalam website ini untuk kepentingan yang dapat merugikan nama baik individu atau institusi.</p>
                <h3 className="text-lg font-bold mt-6 mb-2">2. Larangan Penyalahgunaan</h3>
                <p>Dilarang melakukan tindakan yang merusak sistem (hacking), scraping data secara massal, atau memodifikasi konten tanpa izin tertulis dari panitia.</p>
                <h3 className="text-lg font-bold mt-6 mb-2">3. Batasan Tanggung Jawab</h3>
                <p>Kami berusaha memberikan informasi yang akurat, namun kami tidak bertanggung jawab atas kerugian yang timbul akibat kesalahan teknis atau informasi yang tidak sengaja terlewatkan dalam proses input data.</p>
              </section>
            )}

            {activeTab === 'credits' && (
              <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="bg-blue-50 p-6 rounded-xl mb-8 border border-blue-100">
                  <h3 className="text-[#3557A2] font-bold mb-2 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                    Zero-Cost Development Approach
                  </h3>
                  <p className="text-sm leading-relaxed">
                    Website ini dibangun dengan semangat efisiensi menggunakan teknologi open-source dan layanan tingkat gratis (free tier). Kami memanfaatkan ekosistem modern seperti <strong>Astro</strong> untuk framework, <strong>Vercel</strong> untuk hosting, dan <strong>Cloudinary</strong> untuk manajemen aset tanpa mengeluarkan biaya infrastruktur.
                  </p>
                </div>

                <h3 className="text-lg font-bold mb-4">Digital Asset Credits</h3>
                <p className="mb-4 text-sm">Terima kasih kepada komunitas kreatif global yang menyediakan aset berkualitas tinggi untuk proyek non-komersial ini:</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                  <li className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-[#3557A2] rounded-full"></div>
                    <span className="font-medium text-sm">
                      <a href="https://www.freepik.com" target="_blank" rel="noopener noreferrer">Freepik (Magnific)</a></span>
                  </li>
                  <li className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-[#3557A2] rounded-full"></div>
                    <span className="font-medium text-sm">
                      <a href="https://www.flaticon.com" target="_blank" rel="noopener noreferrer">Flaticon</a>
                    </span>
                  </li>
                  <li className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-[#3557A2] rounded-full"></div>
                    <span className="font-medium text-sm">
                      <a href="https://www.vecteezy.com/" target="_blank" rel="noopener noreferrer">Vecteezy</a>
                    </span>
                  </li>
                  <li className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-[#3557A2] rounded-full"></div>
                    <span className="font-medium text-sm">
                      <a href="https://www.svgrepo.com" target="_blank" rel="noopener noreferrer">SVG Repo</a>
                    </span>
                  </li>
                  <li className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-[#3557A2] rounded-full"></div>
                    <span className="font-medium text-sm">
                      <a href="https://fonts.google.com" target="_blank" rel="noopener noreferrer">Google Fonts</a>
                    </span>
                  </li>
                </ul>

                <div className="mt-8 pt-6 border-t border-gray-100 text-xs text-gray-400 text-center italic">
                  Seluruh data siswa dan informasi sensitif lainnya dikelola secara privat dan tidak dipublikasikan dalam kredit ini.
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 flex justify-end border-t border-gray-200">
          <button 
            onClick={closePortal}
            className="px-6 py-2 bg-[#251E54] text-white font-medium rounded-full hover:bg-[#3557A2] transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
