const CRACK_LINES = [
  "M50,4 L44,28 L58,34 L40,52 L52,58 L38,80",
  "M78,18 L58,32 L70,44 L52,56 L62,72",
  "M14,30 L34,42 L22,58 L40,66 L28,86",
  "M62,10 L70,30 L54,40 L68,50",
  "M8,60 L26,66 L16,78 L32,84",
];

/**
 * Renders `hits` jagged crack lines over a block/mob, each popping in as it
 * lands — plus a darkening wash so damage reads at a glance.
 */
export function CrackOverlay({ hits }: { hits: number }) {
  if (hits <= 0) return null;

  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 z-10 h-full w-full"
      style={{ filter: "drop-shadow(0 0 1px rgba(0,0,0,0.6))" }}
    >
      <rect
        width="100"
        height="100"
        fill="black"
        opacity={Math.min(hits * 0.09, 0.32)}
        style={{ transition: "opacity 0.15s steps(2, end)" }}
      />
      {CRACK_LINES.slice(0, hits).map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="black"
          strokeWidth={2.4}
          strokeLinecap="square"
          className="origin-center animate-crack-pop"
          style={{ opacity: 0.85 }}
        />
      ))}
    </svg>
  );
}
