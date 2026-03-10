import * as React from "react";
import { cn } from "../../lib/utils";

export const PulpBadge = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={cn(
      "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#8B1A1A] text-[#F4ECD8] uppercase tracking-wider",
      className,
    )}
  >
    {children}
  </span>
);
