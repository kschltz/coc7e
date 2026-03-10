import * as React from "react";
import { cn } from "../../lib/utils";

export const PulpDivider = ({ className }: { className?: string }) => (
  <div className={cn("flex items-center justify-center py-4", className)}>
    <div className="h-[2px] bg-[var(--color-weird-black)] flex-1"></div>
    <div className="w-3 h-3 rotate-45 bg-[var(--color-weird-red)] mx-2 border-2 border-[var(--color-weird-black)]"></div>
    <div className="h-[2px] bg-[var(--color-weird-black)] flex-1"></div>
  </div>
);
