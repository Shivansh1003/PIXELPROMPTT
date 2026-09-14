import { useMemo } from "react";

interface PixelDisintegrateProps {
  /** Image to shatter into pixels */
  src: string;
  /** Bump to re-trigger */
  seed: number;
  /** Grid resolution per axis */
  grid?: number;
  /** Extra outward force multiplier */
  force?: number;
}

/**
 * Shatters an image into a grid of chunky pixels that blow outward one
 * step at a time — a block-break dissolve rather than a plain fade.
 */
export function PixelDisintegrate({ src, seed, grid = 12, force = 1 }: PixelDisintegrateProps) {
  const cells = useMemo(() => {
    const out: {
      id: string;
      x: number;
      y: number;
      dx: number;
      dy: number;
      delay: number;
      rot: number;
    }[] = [];
    const center = (grid - 1) / 2;
    for (let y = 0; y < grid; y++) {
      for (let x = 0; x < grid; x++) {
        const ox = x - center;
        const oy = y - center;
        const dist = Math.hypot(ox, oy);
        const angle = Math.atan2(oy, ox);
        const spread = (30 + ((x * 17 + y * 29 + seed) % 46)) * force;
        out.push({
          id: `${seed}-${x}-${y}`,
          x,
          y,
          dx: Math.cos(angle) * spread,
          dy: Math.sin(angle) * spread - 14,
          delay: dist * 0.022 + ((x + y + seed) % 3) * 0.012,
          rot: ((x * 41 + y * 23 + seed) % 120) - 60,
        });
      }
    }
    return out;
  }, [grid, seed, force]);

  const step = 100 / grid;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-20 grid place-items-center">
      <div className="relative h-32 w-32">
        {cells.map((c) => (
          <span
            key={c.id}
            className="absolute"
            style={
              {
                left: `${c.x * step}%`,
                top: `${c.y * step}%`,
                width: `${step}%`,
                height: `${step}%`,
                backgroundImage: `url(${src})`,
                backgroundSize: `${grid * 100}% ${grid * 100}%`,
                backgroundPosition: `${(c.x / (grid - 1)) * 100}% ${(c.y / (grid - 1)) * 100}%`,
                imageRendering: "pixelated",
                "--dx": `${c.dx}px`,
                "--dy": `${c.dy}px`,
                "--rot": `${c.rot}deg`,
                animation: `pixel-shatter 0.5s steps(6, end) ${c.delay}s forwards`,
                opacity: 1,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
