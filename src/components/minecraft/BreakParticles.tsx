import { useMemo } from "react";

interface BreakParticlesProps {
  /** Tailwind background color class for the debris chunks, e.g. "bg-grass" */
  tone: string;
  /** Bump this to re-trigger a fresh burst (e.g. Date.now() or a counter) */
  seed: number;
  /** How many chunks to spawn */
  count?: number;
}

/**
 * A radial burst of little square "blocks" flying outward and fading —
 * the same beat as a Minecraft block popping into item drops when broken.
 */
export function BreakParticles({ tone, seed, count = 12 }: BreakParticlesProps) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2 + (i % 2 === 0 ? 0.2 : -0.2);
      const distance = 34 + ((i * 37 + seed) % 46);
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance - 10;
      const rot = ((i * 53 + seed) % 360) - 180;
      const size = 4 + ((i + seed) % 3) * 2;
      const duration = 0.42 + ((i % 4) * 0.07);
      return { id: `${seed}-${i}`, dx, dy, rot, size, duration };
    });
  }, [seed, count]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-20">
      {particles.map((p) => (
        <span
          key={p.id}
          className={`absolute top-1/2 left-1/2 ${tone}`}
          style={
            {
              width: p.size,
              height: p.size,
              marginLeft: -p.size / 2,
              marginTop: -p.size / 2,
              "--dx": `${p.dx}px`,
              "--dy": `${p.dy}px`,
              "--rot": `${p.rot}deg`,
              animation: `particle-burst ${p.duration}s cubic-bezier(0.25,0.7,0.5,1) forwards`,
              imageRendering: "pixelated",
              boxShadow: "inset -2px -2px 0 rgb(0 0 0 / 0.35)",
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
