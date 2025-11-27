import { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  icon,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-6 flex flex-col gap-2", className)}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-lightMuted dark:text-darkMuted">
          {icon && (
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brandBlue/10 text-brandBlue dark:bg-darkSurfaceSoft dark:text-brandBlue">
              {icon}
            </span>
          )}
          <span>{eyebrow}</span>
        </div>
      )}
      <h2 className="text-2xl font-semibold tracking-tight text-lightText dark:text-darkText md:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-sm text-slate-400 dark:text-darkMuted md:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
