import type { ReactNode } from "react";
import { useSnapIn } from "@/hooks/useSnapIn";
import { cn } from "@/lib/utils";

interface SnapInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "li";
}

/** Wraps content so it drops into place with a stepped, blocky reveal. */
export function SnapIn({ children, className, delay = 0, as = "div" }: SnapInProps) {
  const { ref, shown } = useSnapIn<HTMLElement>();
  const Tag = as as "div";

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(shown ? "animate-snap-in" : "opacity-0", className)}
      style={shown && delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
