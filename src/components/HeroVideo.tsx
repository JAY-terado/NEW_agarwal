import { useEffect, useState } from 'react';

interface HeroVideoProps {
  desktop: string;
  mobile: string;
  poster: string;
}

export default function HeroVideo({ desktop, mobile, poster }: HeroVideoProps) {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const activateVideo = () => {
      if (cancelled) return;
      const isDesktop = window.matchMedia('(min-width: 768px)').matches;
      setVideoSrc(isDesktop ? desktop : mobile);
    };

    const scheduleVideo = () => {
      // Let LCP and initial paint finish before pulling multi-MB MP4 video
      timer = setTimeout(activateVideo, 2500);
    };

    const onInteract = () => {
      if (timer) clearTimeout(timer);
      activateVideo();
    };

    if (document.readyState === 'complete') {
      scheduleVideo();
    } else {
      window.addEventListener('load', scheduleVideo, { once: true });
    }

    window.addEventListener('pointerdown', onInteract, { once: true, passive: true });
    window.addEventListener('touchstart', onInteract, { once: true, passive: true });
    window.addEventListener('scroll', onInteract, { once: true, passive: true });

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      window.removeEventListener('load', scheduleVideo);
      window.removeEventListener('pointerdown', onInteract);
      window.removeEventListener('touchstart', onInteract);
      window.removeEventListener('scroll', onInteract);
    };
  }, [desktop, mobile]);

  return (
    <div className="relative w-full h-full">
      <img
        src={poster}
        alt=""
        width={1600}
        height={900}
        fetchPriority="high"
        decoding="sync"
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />
      {videoSrc && (
        <video
          key={videoSrc}
          className="relative w-full h-full object-cover"
          src={videoSrc}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      )}
    </div>
  );
}
