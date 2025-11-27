import { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: number;
  className?: string;
}

export function StatCard({ icon, label, value, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 dark:bg-[#1E1E1E] transition hover:scale-[1.02] rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900",
        className
      )}
    >
      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100">
          {icon}
        </span>
        <span>{label}</span>
      </div>
      <div className="text-3xl font-semibold text-slate-900 dark:text-slate-50">
        {value}
        {label.toLowerCase().includes("years") && <span className="ml-1 text-base font-normal text-slate-500 dark:text-slate-400">+</span>}
      </div>
    </div>
  );
}
