import * as React from "react";
import { cn } from "../../lib/utils";

export interface PulpBadgeProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "muted";
}

export function PulpBadge({
  className,
  variant = "default",
  children,
}: PulpBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-xs font-bold uppercase tracking-wider border-2 border-[var(--color-weird-black)]",
        variant === "default" &&
          "bg-[var(--color-weird-red)] text-[var(--color-weird-paper)]",
        variant === "muted" &&
          "bg-[var(--color-weird-teal)] text-[var(--color-weird-paper)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
