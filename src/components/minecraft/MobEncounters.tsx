import { useEffect, useRef, useState } from "react";
import { SnapIn } from "./SnapIn";
import { CrackOverlay } from "./CrackOverlay";
import { BreakParticles } from "./BreakParticles";
import { cn } from "@/lib/utils";
import creeperImg from "@/assets/mob-creeper.png";
import zombieImg from "@/assets/mob-zombie.png";
import skeletonImg from "@/assets/mob-skeleton.png";
import endermanImg from "@/assets/mob-enderman.png";

interface MobConfig {
  kind: "creeper" | "zombie" | "skeleton" | "enderman";
  name: string;
  img: string;
  threat: string;
  threatTone: string;
  hiss: string;
  story: string;
  /** Tailwind bg-* color used to tint the block-break debris. */
  tone: string;
  hitsRequired: number;
  /** Chance (0-1) a click whiffs and the mob teleports away instead of taking damage. */
  dodgeChance?: number;
  drop: string;
}

const MOBS: MobConfig[] = [
  {
    kind: "creeper",
    name: "Creeper",
    img: creeperImg,
    threat: "Extreme",
    threatTone: "text-destructive",
    hiss: "Hissssss…",
    story: "Took out the east wall of the Bastion twice. Now the wall is obsidian.",
    tone: "bg-grass",
    hitsRequired: 2,
    drop: "+1 GUNPOWDER",
  },
  {
    kind: "zombie",
    name: "Zombie",
    img: zombieImg,
    threat: "Moderate",
    threatTone: "text-grass",
    hiss: "Uuurrgh…",
    story: "Groans at the cabin door every night. Has never once figured out the latch.",
    tone: "bg-grass-dark",
    hitsRequired: 3,
    drop: "+1 ROTTEN FLESH",
  },
  {
    kind: "skeleton",
    name: "Skeleton",
    img: skeletonImg,
    threat: "High",
    threatTone: "text-gold",
    hiss: "*rattle*",
    story: "Perfect aim across the ravine. Steve built a roof purely out of spite.",
    tone: "bg-stone",
    hitsRequired: 3,
    drop: "+3 BONES",
  },
  {
    kind: "enderman",
    name: "Enderman",
    img: endermanImg,
    threat: "Do not look",
    threatTone: "text-ender",
    hiss: "vwoop",
    story: "Keeps stealing one dirt block from the garden path. Only ever one.",
    tone: "bg-ender",
    hitsRequired: 3,
    dodgeChance: 0.4,
    drop: "+1 ENDER PEARL",
  },
];

type Phase = "idle" | "hit" | "broken" | "respawn";

function reactionClass(phase: Phase) {
  switch (phase) {
    case "broken":
      return "animate-mob-break";
    case "respawn":
      return "animate-mob-respawn";
    case "hit":
      return "animate-mob-hit";
    default:
      return "";
  }
}

function MobCard({ mob, delay }: { mob: MobConfig; delay: number }) {
  const [hits, setHits] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [hitKey, setHitKey] = useState(0);
  const [dodging, setDodging] = useState(false);
  const [showDrop, setShowDrop] = useState(false);
  const [breakSeed, setBreakSeed] = useState(0);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  const queue = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timers.current.push(id);
  };

  const handleHit = () => {
    if (phase === "broken") return;

    if (mob.dodgeChance && Math.random() < mob.dodgeChance) {
      setDodging(true);
      queue(() => setDodging(false), 420);
      return;
    }

    setPhase("hit");
    setHitKey((k) => k + 1);

    setHits((h) => {
      const next = h + 1;
      if (next >= mob.hitsRequired) {
        queue(() => {
          setPhase("broken");
          setBreakSeed(Date.now());
          setShowDrop(true);
          queue(() => {
            setHits(0);
            setHitKey((k2) => k2 + 1);
            setPhase("respawn");
          }, 460);
          queue(() => setShowDrop(false), 1500);
          queue(() => setPhase("idle"), 460 + 520);
        }, 90);
      }
      return next;
    });
  };

  const remaining = Math.max(mob.hitsRequired - hits, 0);
  const crackHits = phase === "broken" || phase === "respawn" ? 0 : hits;

  return (
    <SnapIn as="li" delay={delay} className="list-none">
      <article
        className={cn(
          "group relative h-full border-4 border-stone-dark bg-deep/80 p-5 lift-block hover:border-gold",
          phase === "hit" && "animate-card-jolt"
        )}
      >
        <button
          type="button"
          onClick={handleHit}
          aria-label={`Hit the ${mob.name}`}
          className="relative grid h-40 w-full cursor-crosshair place-items-center overflow-hidden bg-background/60 pixel-block-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          <span className={cn("mob-idle absolute inset-0 grid place-items-center", `mob-idle--${mob.kind}`)}>
            <span className={cn("relative grid h-full w-full place-items-center", reactionClass(phase), dodging && "animate-mob-dodge")}>
              <img
                key={`${mob.name}-${phase}-${hitKey}`}
                src={mob.img}
                alt={`${mob.name} pixel art`}
                width={816}
                height={816}
                loading="lazy"
                className="h-32 w-auto crisp"
              />
              {mob.kind === "creeper" && phase === "hit" && <span aria-hidden className="creeper-fuse" />}
              {mob.kind === "skeleton" && phase === "hit" && <span aria-hidden className="skeleton-arrow" />}
              {mob.kind === "enderman" && dodging && <span aria-hidden className="ender-echo" />}
            </span>
          </span>

          <CrackOverlay hits={crackHits} />

          {phase === "broken" && (
            <BreakParticles tone={mob.tone} seed={breakSeed} count={14} />
          )}

          {mob.kind === "creeper" && phase === "broken" && (
            <span aria-hidden className="creeper-blast" />
          )}

          {showDrop && (
            <span
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap font-pixel text-[8px] text-gold animate-drop-float"
            >
              {mob.drop}
            </span>
          )}

          {dodging && (
            <span
              aria-hidden
              className="pointer-events-none absolute top-2 right-2 z-30 font-pixel text-[7px] text-ender"
            >
              MISS
            </span>
          )}

          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute top-2 left-2 font-pixel text-[6px] text-foreground/40 opacity-0 transition-opacity duration-150",
              phase !== "broken" && "group-hover:opacity-100"
            )}
          >
            TAP TO HIT
          </span>
        </button>

        {/* HP pips */}
        <div className="mt-3 flex items-center gap-1" aria-hidden>
          {Array.from({ length: mob.hitsRequired }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "size-3 pixel-block-sm transition-all duration-150",
                i < remaining ? "bg-heart" : "scale-75 bg-secondary opacity-50"
              )}
            />
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <h3 className="font-pixel text-[10px] text-foreground">{mob.name}</h3>
          <span className={`font-pixel text-[7px] ${mob.threatTone}`}>{mob.threat}</span>
        </div>
        <p className="mt-2 font-pixel text-[7px] text-muted-foreground">{mob.hiss}</p>
        <p className="mt-3 text-sm text-muted-foreground">{mob.story}</p>
      </article>
    </SnapIn>
  );
}

export function MobEncounters() {
  return (
    <section id="mobs" className="relative overflow-hidden bg-cave py-20">
      {/* Creeper that patrols the section */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24">
        <img
          src={creeperImg}
          alt=""
          width={816}
          height={816}
          loading="lazy"
          className="absolute bottom-2 h-20 w-auto animate-creep opacity-90 crisp"
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <SnapIn>
          <span className="font-pixel text-[8px] text-gold">SECTION 04</span>
          <h2 className="mt-3 font-pixel text-base text-foreground pixel-shadow sm:text-lg">
            MOB ENCOUNTERS
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Every build has a body count of interruptions. These four show up the most — logged
            with threat level and how it usually goes.{" "}
            <span className="text-foreground/70">Click one to fight back.</span>
          </p>
        </SnapIn>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MOBS.map((mob, i) => (
            <MobCard key={mob.name} mob={mob} delay={i * 90} />
          ))}
        </ul>
      </div>
    </section>
  );
}
