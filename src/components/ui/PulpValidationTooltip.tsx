import { cn } from "../../lib/utils";

interface PulpValidationTooltipProps {
  message: string;
  show: boolean;
  className?: string;
}

export function PulpValidationTooltip({
  message,
  show,
  className,
}: PulpValidationTooltipProps) {
  if (!show || !message) {
    return null;
  }

  return (
    <div
      className={cn(
        "pointer-events-none absolute right-0 top-full mt-1 z-20 w-max max-w-52",
        className,
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="relative border-2 border-[var(--color-weird-black)] bg-[var(--color-weird-paper)] px-2 py-1 text-[10px] leading-tight font-serif text-[var(--color-weird-red)] font-bold shadow-[2px_2px_0px_var(--color-weird-black)]">
        <div className="absolute -top-1 right-3 h-2 w-2 rotate-45 border-l-2 border-t-2 border-[var(--color-weird-black)] bg-[var(--color-weird-paper)]" />
        {message}
      </div>
    </div>
  );
}
