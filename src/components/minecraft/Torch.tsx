import { cn } from "@/lib/utils";

/** A wall torch whose flame flickers irregularly. */
export function Torch({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("relative inline-block h-10 w-2.5", className)}>
      <span className="absolute bottom-0 left-0 h-7 w-2.5 bg-dirt pixel-block-sm" />
      <span className="absolute top-0 left-0 h-3 w-2.5 animate-flicker bg-gold pixel-block-sm" />
      <span className="absolute -top-4 -left-3 size-8 animate-flicker rounded-full bg-gold/25 blur-md" />
    </span>
  );
}
