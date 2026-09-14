import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { BreakParticles } from "./BreakParticles";

const CALLOUTS = ["OW!", "HEY!", "MY BLOCKS!", "-1 HEART", "RUDE.", "NICE TRY!"];

interface PunchableSteveProps {
  src: string;
  className?: string;
  width: number;
  height: number;
}

/** Steve idle-bobs until clicked, then flinches, puffs dust, and complains. */
export function PunchableSteve({ src, className, width, height }: PunchableSteveProps) {
  const [hitKey, setHitKey] = useState(0);
  const [callout, setCallout] = useState<string | null>(null);
  const [dustSeed, setDustSeed] = useState(0);
  const idxRef = useRef(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
  }, []);

  const handleClick = () => {
    setHitKey((k) => k + 1);
    setDustSeed(Date.now());
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    idxRef.current = (idxRef.current + 1) % CALLOUTS.length;
    setCallout(CALLOUTS[idxRef.current] ?? "OW!");
    timerRef.current = window.setTimeout(() => setCallout(null), 900);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Poke Steve"
      className={cn(
        "pointer-events-auto absolute top-12 -left-20 z-10 hidden h-56 w-40 cursor-crosshair overflow-visible focus:outline-none focus-visible:ring-4 focus-visible:ring-gold lg:block xl:-left-24 xl:h-64 xl:w-48",
        className
      )}
    >
      <span className="absolute inset-0 grid place-items-center animate-steve-idle">
        <img
          key={hitKey}
          src={src}
          alt=""
          width={width}
          height={height}
          aria-hidden
          className={cn(
            "h-56 w-auto max-w-none crisp drop-shadow-[7px_7px_0_rgba(0,0,0,0.42)] xl:h-64",
            hitKey > 0 && "animate-steve-impact"
          )}
        />
      </span>
      {hitKey > 0 && (
        <div className="pointer-events-none absolute inset-0">
          <BreakParticles tone="bg-dirt" seed={dustSeed} count={7} />
        </div>
      )}
      {callout && (
        <span
          aria-hidden
          className="pointer-events-none absolute -top-3 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap border-2 border-deep bg-background px-2 py-1 font-pixel text-[7px] text-foreground pixel-shadow-sm animate-drop-float"
        >
          {callout}
        </span>
      )}
    </button>
  );
}
