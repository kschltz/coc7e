import * as React from "react";
import { cn } from "../../lib/utils";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const PulpSelect = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => {
    return (
      <select
        className={cn(
          "flex h-8 w-full bg-[var(--color-weird-paper)] border-2 border-[var(--color-weird-black)] shadow-[2px_2px_0px_var(--color-weird-black)] px-2 py-1 text-sm focus-visible:outline-none focus-visible:border-[var(--color-weird-red)] disabled:cursor-not-allowed disabled:opacity-50",
          "font-serif text-[var(--color-weird-black)] font-bold",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
PulpSelect.displayName = "PulpSelect";

export { PulpSelect };
