import { useEffect, useState } from 'react';

interface HeroVideoProps {
  desktop: string;
  mobile: string;
  poster: string;
}

export default function HeroVideo({ desktop, mobile, poster }: HeroVideoProps) {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const scheduleLoad = () => {
      if ('requestIdleCallback' in window) {
        (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
          () => { if (!cancelled) setShouldLoadVideo(true); },
          { timeout: 1200 }
        );
      } else {
        setTimeout(() => { if (!cancelled) setShouldLoadVideo(true); }, 600);
      }
    };

    if (document.readyState === 'complete') {
      scheduleLoad();
    } else {
      window.addEventListener('load', scheduleLoad, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener('load', scheduleLoad);
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <img
        src={poster}
        alt=""
        fetchPriority="high"
        decoding="sync"
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />
      {shouldLoadVideo && (
        <video
          key={desktop}
          className="relative w-full h-full object-cover"
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source media="(min-width: 768px)" src={desktop} type="video/mp4" />
          <source src={mobile} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
