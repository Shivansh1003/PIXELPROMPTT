const CLOUDS = [
  { top: "8%", width: 120, height: 18, duration: 74, delay: 0, opacity: 0.85 },
  { top: "18%", width: 84, height: 14, duration: 96, delay: -20, opacity: 0.7 },
  { top: "30%", width: 150, height: 20, duration: 62, delay: -38, opacity: 0.8 },
  { top: "44%", width: 96, height: 16, duration: 108, delay: -12, opacity: 0.55 },
  { top: "58%", width: 130, height: 18, duration: 86, delay: -55, opacity: 0.5 },
];

/** Flat pixel clouds drifting across the Overworld sky. */
export function PixelClouds() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {CLOUDS.map((cloud, i) => (
        <div
          key={i}
          className="absolute animate-drift bg-foreground/90 pixel-block-sm"
          style={{
            top: cloud.top,
            width: cloud.width,
            height: cloud.height,
            opacity: cloud.opacity,
            animationDuration: `${cloud.duration}s`,
            animationDelay: `${cloud.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
