import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { BreakParticles } from "./BreakParticles";

const CALLOUTS = ["OW!", "HEY!", "MY BLOCKS!", "-1 HEART", "RUDE.", "NICE TRY!"];

type SteveAction = "idle" | "greeting" | "attacking";

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
  const [action, setAction] = useState<SteveAction>("idle");
  const [attackKey, setAttackKey] = useState(0);
  const idxRef = useRef(0);
  const timerRef = useRef<number | null>(null);
  const actionTimersRef = useRef<number[]>([]);

  const playAttack = useCallback(() => {
    if (action !== "idle") return;
    actionTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    actionTimersRef.current = [];
    setAction("greeting");
    setCallout("HI!");
    actionTimersRef.current.push(window.setTimeout(() => {
      setAction("attacking");
      setCallout("HYAA!");
      setAttackKey((key) => key + 1);
      setDustSeed(Date.now());
    }, 850));
    actionTimersRef.current.push(window.setTimeout(() => {
      setAction("idle");
      setCallout(null);
    }, 1900));
  }, [action]);

  useEffect(() => {
    const openingTimer = window.setTimeout(playAttack, 900);
    const repeatTimer = window.setInterval(playAttack, 9000);

    return () => {
      window.clearTimeout(openingTimer);
      window.clearInterval(repeatTimer);
      actionTimersRef.current.forEach((timer) => window.clearTimeout(timer));
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, [playAttack]);

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
      onPointerEnter={playAttack}
      aria-label="Poke Steve"
      className={cn(
        "pointer-events-auto absolute top-16 left-0 z-10 h-40 w-28 cursor-crosshair overflow-visible focus:outline-none focus-visible:ring-4 focus-visible:ring-gold sm:h-48 sm:w-36 lg:top-12 lg:-left-20 lg:h-56 lg:w-40 xl:-left-24 xl:h-64 xl:w-48",
        action === "greeting" && "animate-steve-greeting",
        action === "attacking" && "animate-steve-jump-attack",
        className
      )}
    >
      <span className="absolute inset-0 grid place-items-center animate-steve-idle">
        <img
          key={`${hitKey}-${attackKey}`}
          src={src}
          alt=""
          width={width}
          height={height}
          aria-hidden
          className={cn(
            "h-40 w-auto max-w-none crisp drop-shadow-[7px_7px_0_rgba(0,0,0,0.42)] sm:h-48 lg:h-56 xl:h-64",
            hitKey > 0 && "animate-steve-impact"
          )}
        />
        <span className="steve-eye steve-eye--left" aria-hidden />
        <span className="steve-eye steve-eye--right" aria-hidden />
      </span>
      {hitKey > 0 && (
        <div className="pointer-events-none absolute inset-0">
          <BreakParticles tone="bg-dirt" seed={dustSeed} count={7} />
        </div>
      )}
      {action === "attacking" && (
        <span className="steve-attack-burst" aria-hidden>
          POW!
        </span>
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
