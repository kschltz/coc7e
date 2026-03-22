import * as React from "react";
import { cn } from "../../lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const PulpInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-8 w-full bg-[var(--color-weird-paper)] border-2 border-[var(--color-weird-black)] px-2 py-1 text-sm placeholder:text-[var(--color-weird-black)]/50 focus-visible:outline-none focus-visible:border-[var(--color-weird-red)] disabled:cursor-not-allowed disabled:opacity-50",
          "font-sans text-[var(--color-weird-black)] font-bold",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
PulpInput.displayName = "PulpInput";

export { PulpInput };
