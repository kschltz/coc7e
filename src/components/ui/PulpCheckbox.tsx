import * as React from "react";
import { cn } from "../../lib/utils";
import { Check } from "lucide-react";

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {}

const PulpCheckbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onChange, ...props }, ref) => {
    return (
      <div
        className={cn(
          "relative flex items-center justify-center w-5 h-5 border-2 border-[var(--color-weird-black)] bg-[var(--color-weird-paper)] cursor-pointer shadow-[2px_2px_0px_var(--color-weird-black)]",
          className,
        )}
      >
        <input
          type="checkbox"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          checked={!!checked}
          onChange={onChange}
          ref={ref}
          {...props}
        />
        {checked && (
          <Check
            className="w-4 h-4 text-[var(--color-weird-red)] pointer-events-none"
            strokeWidth={4}
          />
        )}
      </div>
    );
  },
);
PulpCheckbox.displayName = "PulpCheckbox";

export { PulpCheckbox };
