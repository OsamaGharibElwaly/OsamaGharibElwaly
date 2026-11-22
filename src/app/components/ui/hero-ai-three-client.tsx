"use client";

import dynamic from "next/dynamic";

const HeroAiThree = dynamic(() => import("./hero-ai-three").then((m) => m.HeroAiThree), {
  ssr: false,
  loading: () => <div className="h-[min(52vw,420px)] min-h-[280px] w-full rounded-3xl border border-cyan-500/20 bg-slate-950/60" />,
});

export function HeroAiThreeClient() {
  return <HeroAiThree />;
}