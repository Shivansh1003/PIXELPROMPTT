import { useEffect, useState } from "react";

const SLOTS = [
  { label: "Pickaxe", tone: "bg-diamond" },
  { label: "Sword", tone: "bg-stone" },
  { label: "Torch", tone: "bg-gold" },
  { label: "Dirt", tone: "bg-dirt" },
  { label: "Grass", tone: "bg-grass" },
  { label: "Redstone", tone: "bg-destructive" },
  { label: "Empty", tone: "bg-secondary" },
  { label: "Empty", tone: "bg-secondary" },
  { label: "Empty", tone: "bg-secondary" },
];

/** Ambient game HUD: hearts, a filling XP bar, and an inventory hotbar. */
export function Hotbar() {
  const [xp, setXp] = useState(12);

  useEffect(() => {
    const id = setInterval(() => setXp((v) => (v >= 100 ? 6 : v + 4)), 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full">
      <div className="mb-2 flex items-end justify-between gap-4">
        <div className="flex items-center gap-1" aria-label="Health: 10 of 10 hearts">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              aria-hidden
              className="size-3 animate-heartbeat bg-heart pixel-block-sm"
              style={{ animationDelay: `${i * 0.09}s` }}
            />
          ))}
        </div>
        <span className="font-pixel text-[8px] text-xp">LVL 47</span>
      </div>

      <div className="h-3 w-full bg-deep pixel-block-sm">
        <div
          className="h-full bg-xp transition-[width] duration-700 ease-linear"
          style={{ width: `${xp}%` }}
        />
      </div>

      <div className="mt-3 grid grid-cols-9 gap-1">
        {SLOTS.map((slot, i) => (
          <div
            key={i}
            title={slot.label}
            className="grid aspect-square place-items-center bg-stone-dark/60 pixel-block-sm"
          >
            <span className={`size-1/2 ${slot.tone} pixel-block-sm`} aria-hidden />
          </div>
        ))}
      </div>
    </div>
  );
}
