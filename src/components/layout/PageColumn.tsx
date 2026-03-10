import { ReactNode } from "react";
import { cn } from "../../lib/utils";

export function PageColumn({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("flex flex-col gap-6", className)}>{children}</div>;
}
