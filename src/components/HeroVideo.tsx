interface HeroVideoProps {
  desktop: string;
  mobile: string;
  poster: string;
}

export default function HeroVideo({ desktop, mobile, poster }: HeroVideoProps) {
  return (
    <video
      key={desktop}
      className="w-full h-full object-cover"
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
  );
}
