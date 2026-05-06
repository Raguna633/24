import React, { useState, useEffect } from 'react';

// Inline SVG Icons
const PlayIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>
);

const PauseIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
);

interface Props {
  youtubeUrl?: string;
}

export default function InlineAudioPlayer({ youtubeUrl }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioEl, setAudioEl] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Cari elemen audio global yang dibuat oleh AudioPlayer.tsx
    const audio = document.getElementById('global-mars-audio') as HTMLAudioElement;
    if (audio) {
      setAudioEl(audio);
      
      // Sinkronisasi status awal
      setIsPlaying(!audio.paused);
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);

      const updateTime = () => setCurrentTime(audio.currentTime);
      const updateDuration = () => setDuration(audio.duration);
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      // Event Listeners
      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('loadedmetadata', updateDuration);
      audio.addEventListener('durationchange', updateDuration);
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);

      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('loadedmetadata', updateDuration);
        audio.removeEventListener('durationchange', updateDuration);
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
      };
    }
  }, []);

  const togglePlay = () => {
    const currentAudio = document.getElementById('global-mars-audio') as HTMLAudioElement;
    if (!currentAudio) return;
    
    if (isPlaying) {
      currentAudio.pause();
    } else {
      currentAudio.play().catch(e => console.error("Playback failed:", e));
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    const currentAudio = document.getElementById('global-mars-audio') as HTMLAudioElement;
    if (currentAudio) {
      currentAudio.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "00:00";
    const m = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
    const s = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-md ml-auto mr-auto md:mr-0 font-sans">
      <div className="flex items-center gap-4 bg-[#f5f0ea] border-2 border-[#2A358F]/20 rounded-full py-2 px-4 shadow-sm w-full">
        <button 
          onClick={togglePlay}
          className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-[#2A358F] text-[#f5f0ea] hover:scale-105 transition-transform"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <PauseIcon className="w-4 h-4 fill-current" />
          ) : (
            <PlayIcon className="w-4 h-4 fill-current ml-1" />
          )}
        </button>

        <div className="flex-1 flex flex-col gap-1">
          <div className="flex justify-between text-xs text-[#2A358F]/70 font-semibold tracking-wider">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          
          <input 
            type="range" 
            min="0" 
            max={duration || 100} 
            value={currentTime} 
            onChange={handleSeek}
            className="w-full h-1.5 bg-[#2A358F]/20 rounded-lg appearance-none cursor-pointer accent-[#2A358F]"
            style={{
              background: `linear-gradient(to right, #2A358F ${(currentTime / (duration || 1)) * 100}%, rgba(42, 53, 143, 0.2) ${(currentTime / (duration || 1)) * 100}%)`
            }}
          />
        </div>
      </div>

      {/* Credit Link */}
      {youtubeUrl && (
        <a 
          href={youtubeUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center justify-end gap-1.5 text-xs font-semibold text-[#2A358F]/60 hover:text-[#2A358F] transition-colors pr-4"
        >
          <YoutubeIcon className="w-3.5 h-3.5" />
          <span>Original Audio by Al-Ittihad Official</span>
        </a>
      )}
    </div>
  );
}
