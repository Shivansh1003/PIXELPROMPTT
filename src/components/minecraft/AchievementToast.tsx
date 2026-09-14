interface AchievementToastProps {
  title: string;
  subtitle: string;
  /** Bump to replay the slide-in/out; 0 means "not shown yet". */
  triggerKey: number;
}

/** The little "Achievement Get!" toast that slides in from the corner. */
export function AchievementToast({ title, subtitle, triggerKey }: AchievementToastProps) {
  if (!triggerKey) return null;

  return (
    <div
      key={triggerKey}
      aria-hidden
      className="pointer-events-none absolute top-4 left-4 z-40 flex items-center gap-3 border-4 border-gold bg-deep/95 px-3 py-2 animate-achievement-toast"
    >
      <span className="grid size-8 shrink-0 place-items-center bg-gold pixel-block-sm">
        <span className="font-pixel text-[10px] text-deep">★</span>
      </span>
      <div>
        <p className="font-pixel text-[7px] text-gold">{title}</p>
        <p className="mt-1 font-pixel text-[6px] text-foreground/80">{subtitle}</p>
      </div>
    </div>
  );
}
