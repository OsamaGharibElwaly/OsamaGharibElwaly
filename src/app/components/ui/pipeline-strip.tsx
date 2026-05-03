"use client";

interface PipelineStripProps {
  steps: string[];
  "data-testid"?: string;
}

export function PipelineStrip({ steps, "data-testid": testId }: PipelineStripProps) {
  if (!steps?.length) return null;

  return (
    <div
      className="mt-3 rounded-xl border border-slate-200/80 bg-slate-50/80 px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.04]"
      data-testid={testId ?? "pipeline-strip"}
    >
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        Pipeline
      </p>
      <div className="flex flex-wrap items-center gap-1">
        {steps.map((step, i) => (
          <div key={`${step}-${i}`} className="flex items-center gap-1">
            {i > 0 && (
              <span className="text-[10px] text-cyan-500/70 dark:text-cyan-400/60" aria-hidden>
                →
              </span>
            )}
            <span className="rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-medium text-slate-700 shadow-sm dark:bg-slate-900/80 dark:text-slate-200">
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
