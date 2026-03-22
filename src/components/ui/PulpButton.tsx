import * as React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
}

const PulpButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-none px-6 py-3 text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          "font-serif uppercase tracking-widest",
          variant === "default" &&
            "bg-[var(--color-weird-red)] text-[var(--color-weird-paper)] border-[3px] border-[var(--color-weird-black)] hover:bg-[var(--color-weird-darkred)] active:translate-y-[2px]",
          variant === "outline" &&
            "bg-[var(--color-weird-paper)] text-[var(--color-weird-black)] border-[3px] border-[var(--color-weird-black)] hover:bg-[var(--color-weird-black)] hover:text-[var(--color-weird-paper)] active:translate-y-[2px]",
          variant === "ghost" && "hover:bg-[var(--color-weird-red-alpha)] text-[var(--color-weird-black)]",
          className,
        )}
        {...props}
      />
    );
  },
);
PulpButton.displayName = "PulpButton";

export { PulpButton };
