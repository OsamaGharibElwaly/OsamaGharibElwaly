import { cn } from "../../lib/utils";
import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center transition hover:translate-y-1.5 rounded-full border border-slate-200 bg-[#E4F3F7] px-3 py-1 text-xs font-medium text-slate-700 dark:border-[#00BFFF] text-[#00BFFF]",
        className
      )}
    >
      {children}
    </span>
  );
}
