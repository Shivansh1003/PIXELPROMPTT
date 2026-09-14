const SPECKS = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 5.6 + (i % 4) * 3.1) % 98}%`,
  size: 4 + (i % 3) * 3,
  duration: 7 + (i % 5) * 1.9,
  delay: -(i * 0.83),
  tone: i % 3,
}));

const TONES = ["bg-stone/70", "bg-dirt/80", "bg-diamond/60"];

/** Sparse pixel dust drifting down, like gravel falling in a cave. */
export function FallingBlocks() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {SPECKS.map((s, i) => (
        <span
          key={i}
          className={`absolute top-0 animate-fall ${TONES[s.tone]}`}
          style={{
            left: s.left,
            width: s.size,
            height: s.size,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
