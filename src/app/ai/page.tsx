import Link from "next/link";
import { ArrowLeft, Cpu, Database, GitBranch, Layers } from "lucide-react";
import { MotionSection } from "../components/ui/motion-section";

const diagrams = [
  {
    title: "RAG retrieval path",
    icon: Database,
    nodes: [
      { label: "Documents" },
      { label: "Chunk + embed" },
      { label: "Vector store" },
      { label: "LLM + citations" },
    ],
  },
  {
    title: "Serving layer",
    icon: Layers,
    nodes: [
      { label: "API / FastAPI" },
      { label: "Auth + rate limits" },
      { label: "Model router" },
      { label: "Clients" },
    ],
  },
  {
    title: "Iteration loop",
    icon: GitBranch,
    nodes: [
      { label: "Eval set" },
      { label: "Prompt / tool change" },
      { label: "Regression tests" },
      { label: "Ship" },
    ],
  },
];

export const metadata = {
  title: "AI Systems | Osama Alwaly",
  description:
    "AI engineering journey: LLMs, RAG, embeddings, and production-minded AI architecture.",
};

export default function AiSystemsPage() {
  return (
    <div className="space-y-14 lg:space-y-16">
      <MotionSection className="space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-cyan-600 underline-offset-4 hover:text-cyan-500 hover:underline dark:text-cyan-400"
          data-testid="ai-back-home"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to portfolio
        </Link>

        <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-slate-950/95 p-6 text-slate-100 shadow-[0_0_48px_-16px_rgba(34,211,238,0.25)] backdrop-blur-md dark:border-cyan-400/10 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/90">
            AI systems engineering
          </p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
            From prototypes to dependable AI pipelines
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300">
            I design and ship AI features the same way as other systems: clear contracts, observable
            stages, and guardrails. Work spans LLM orchestration, retrieval-augmented generation,
            embeddings and ranking, and FastAPI-style services that keep latency and cost predictable.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-cyan-100/90">
              LLMs & tool use
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-cyan-100/90">
              RAG & vector search
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-cyan-100/90">
              Embeddings & evals
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-cyan-100/90">
              Production APIs
            </span>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="space-y-4">
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-100">
          <Cpu className="h-5 w-5 text-cyan-500 dark:text-cyan-400" />
          <h2 className="text-xl font-semibold">How I think in pipelines</h2>
        </div>
        <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-400">
          Every AI system is a graph: inputs, transforms, stores, and outputs. Diagrams keep assumptions
          explicit—what is cached, what is streamed, and where failure would hurt users.
        </p>
      </MotionSection>

      <div className="grid gap-6 lg:grid-cols-3">
        {diagrams.map((d) => {
          const Icon = d.icon;
          return (
            <MotionSection
              key={d.title}
              className="flex flex-col rounded-3xl border border-slate-200/90 bg-white/70 p-5 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-950/50 dark:shadow-[0_0_32px_-12px_rgba(34,211,238,0.12)]"
            >
              <div className="mb-4 flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                  <Icon className="h-4 w-4" />
                </span>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{d.title}</h3>
              </div>
              <div className="flex flex-1 flex-wrap items-center gap-y-2">
                {d.nodes.map((n, idx) => (
                  <div key={n.label} className="flex items-center">
                    {idx > 0 && (
                      <span className="mx-1 text-xs text-cyan-500/60 dark:text-cyan-400/50" aria-hidden>
                        →
                      </span>
                    )}
                    <span className="rounded-lg border border-slate-200/90 bg-slate-50/95 px-2.5 py-1.5 text-[11px] font-medium text-slate-800 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200">
                      {n.label}
                    </span>
                  </div>
                ))}
              </div>
            </MotionSection>
          );
        })}
      </div>

      <MotionSection>
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 text-center shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-950/60">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            See live system cards on the homepage under{" "}
            <Link href="/#projects" className="font-medium text-cyan-600 hover:underline dark:text-cyan-400">
              AI Systems Showcase
            </Link>
            .
          </p>
        </div>
      </MotionSection>
    </div>
  );
}
