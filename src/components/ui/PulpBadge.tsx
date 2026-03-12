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
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium uppercase tracking-wider",
        variant === "default" &&
          "bg-[var(--color-weird-darkred)] text-[var(--color-weird-paper)]",
        variant === "muted" &&
          "bg-[var(--color-weird-red-alpha)] text-[var(--color-weird-black)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
