import React, { useEffect, useRef, useState } from 'react';

interface OpeningFilmProps {
  onEnter: () => void;
}

export const OpeningFilm: React.FC<OpeningFilmProps> = ({ onEnter }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Attempt autoplay on mount
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          const startPlayback = () => {
            if (videoRef.current) {
              videoRef.current.play().catch(() => {});
            }
          };
          window.addEventListener('click', startPlayback, { once: true });
          window.addEventListener('touchstart', startPlayback, { once: true });
        });
      }
    }
  }, []);

  const handleFinish = () => {
    if (isFadingOut) return;
    setIsFadingOut(true);
    setTimeout(() => {
      onEnter();
    }, 600);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden select-none transition-opacity duration-700 ease-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Pure 1080p Skincare Brand Intro Video */}
      <video
        ref={videoRef}
        src="/intro.mp4"
        playsInline
        autoPlay
        muted
        onEnded={handleFinish}
        onError={handleFinish}
        className="absolute inset-0 w-full h-full object-contain md:object-cover portrait:object-contain"
      />

      {/* Skip Intro Button */}
      <button
        onClick={handleFinish}
        className="absolute bottom-6 right-6 md:bottom-8 md:right-10 z-30 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/40 hover:bg-black/75 text-white/90 hover:text-white border border-white/25 backdrop-blur-md text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 shadow-lg hover:shadow-2xl active:scale-95 cursor-pointer group"
        aria-label="Skip intro video"
      >
        <span>Skip intro</span>
        <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
      </button>
    </div>
  );
};
