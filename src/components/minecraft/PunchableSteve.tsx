import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { BreakParticles } from "./BreakParticles";

const CALLOUTS = ["OW!", "HEY!", "STOP THAT", "-1 HEART", "RUDE."];

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

  const handleClick = () => {
    setHitKey((k) => k + 1);
    setDustSeed(Date.now());
    idxRef.current = (idxRef.current + 1) % CALLOUTS.length;
    setCallout(CALLOUTS[idxRef.current]);
    window.setTimeout(() => setCallout(null), 900);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Poke Steve"
      className={cn(
        "pointer-events-auto absolute top-20 -left-16 z-10 hidden h-44 w-auto cursor-crosshair lg:block",
        className
      )}
    >
      <img
        key={hitKey}
        src={src}
        alt=""
        width={width}
        height={height}
        aria-hidden
        className="h-44 w-auto crisp drop-shadow-[6px_6px_0_rgba(0,0,0,0.4)]"
        style={{
          animation:
            hitKey > 0
              ? "bob 2.6s steps(8, end) infinite, punch-impact 0.32s cubic-bezier(0.34,1.56,0.64,1), hit-flash 0.28s steps(4,end)"
              : "bob 2.6s steps(8, end) infinite",
        }}
      />
      {hitKey > 0 && (
        <div className="pointer-events-none absolute inset-0">
          <BreakParticles tone="bg-dirt" seed={dustSeed} count={7} />
        </div>
      )}
      {callout && (
        <span
          aria-hidden
          className="pointer-events-none absolute top-0 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap font-pixel text-[7px] text-foreground pixel-shadow-sm animate-drop-float"
        >
          {callout}
        </span>
      )}
    </button>
  );
}
