import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { CrackOverlay } from "./CrackOverlay";
import { BreakParticles } from "./BreakParticles";
import { AchievementToast } from "./AchievementToast";

type Phase = "idle" | "hit" | "broken" | "respawn";

interface BreakableBlockProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  /** How many clicks/punches it takes to break. */
  hitsRequired?: number;
  /** Tailwind bg-* color used to tint the debris burst. */
  tone?: string;
  achievementTitle?: string;
  achievementSubtitle?: string;
}

/**
 * An image that cracks a little more with every click and then shatters —
 * the same beat as punching a block in the Google "Minecraft" search doodle.
 */
export function BreakableBlock({
  src,
  alt,
  width,
  height,
  className,
  hitsRequired = 5,
  tone = "bg-stone",
  achievementTitle,
  achievementSubtitle,
}: BreakableBlockProps) {
  const [hits, setHits] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [hitKey, setHitKey] = useState(0);
  const [breakSeed, setBreakSeed] = useState(0);
  const [toastKey, setToastKey] = useState(0);
  const timers = useRef<number[]>([]);

  const queue = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const handleClick = () => {
    if (phase === "broken") return;

    setPhase("hit");
    setHitKey((k) => k + 1);

    setHits((h) => {
      const next = h + 1;
      if (next >= hitsRequired) {
        queue(() => {
          setPhase("broken");
          setBreakSeed(Date.now());
          if (achievementTitle) setToastKey((k) => k + 1);
          queue(() => {
            setHits(0);
            setHitKey((k2) => k2 + 1);
            setPhase("respawn");
          }, 520);
          queue(() => setPhase("idle"), 520 + 520);
        }, 90);
      }
      return next;
    });
  };

  const animation =
    phase === "broken"
      ? "break-out 0.5s cubic-bezier(0.55,0,1,0.45) forwards"
      : phase === "respawn"
        ? "respawn-in 0.55s cubic-bezier(0.34,1.56,0.64,1) both"
        : phase === "hit"
          ? "knockback 0.36s cubic-bezier(0.34,1.56,0.64,1), hit-flash 0.28s steps(4,end)"
          : undefined;

  const crackHits = phase === "broken" || phase === "respawn" ? 0 : hits;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleClick}
        aria-label="Punch the block"
        className="group relative block w-full cursor-crosshair focus:outline-none"
      >
        <img
          key={`${phase}-${hitKey}`}
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={cn("w-full crisp", className)}
          style={animation ? { animation } : undefined}
        />
        <CrackOverlay hits={crackHits} />
        {phase === "broken" && <BreakParticles tone={tone} seed={breakSeed} count={20} />}
        <span
          aria-hidden
          className="pointer-events-none absolute top-2 right-2 font-pixel text-[6px] text-foreground/50 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
        >
          PUNCH
        </span>
      </button>

      {achievementTitle && (
        <AchievementToast
          title={achievementTitle}
          subtitle={achievementSubtitle ?? ""}
          triggerKey={toastKey}
        />
      )}
    </div>
  );
}
