"use client";

export function SignalRails() {
  // Decorative animated "digital signal / electricity in pipelines" rails.
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <svg className="absolute left-0 top-0 h-full w-[120px] opacity-60 dark:opacity-70" viewBox="0 0 120 1000" preserveAspectRatio="none">
        <defs>
          <linearGradient id="railL" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
            <stop offset="20%" stopColor="#22d3ee" stopOpacity="0.5" />
            <stop offset="80%" stopColor="#818cf8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
          </linearGradient>
          <filter id="glowL"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <path d="M60 0 V180 H30 V360 H70 V540 H35 V720 H65 V1000" fill="none" stroke="url(#railL)" strokeWidth="2" className="signal-rail" />
        <path d="M60 0 V180 H30 V360 H70 V540 H35 V720 H65 V1000" fill="none" stroke="#67e8f9" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="30 420" className="signal-pulse" filter="url(#glowL)" />
        <circle cx="30" cy="270" r="3" fill="#22d3ee" className="signal-node" />
        <circle cx="70" cy="450" r="3" fill="#818cf8" className="signal-node" style={{animationDelay:'1.2s'}} />
        <circle cx="35" cy="630" r="3" fill="#34d399" className="signal-node" style={{animationDelay:'2.4s'}} />
      </svg>

      <svg className="absolute right-0 top-0 h-full w-[120px] opacity-60 dark:opacity-70" viewBox="0 0 120 1000" preserveAspectRatio="none">
        <defs>
          <linearGradient id="railR" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0" />
            <stop offset="20%" stopColor="#818cf8" stopOpacity="0.5" />
            <stop offset="80%" stopColor="#22d3ee" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
          <filter id="glowR"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <path d="M60 0 V140 H85 V320 H45 V500 H80 V680 H50 V1000" fill="none" stroke="url(#railR)" strokeWidth="2" className="signal-rail" />
        <path d="M60 0 V140 H85 V320 H45 V500 H80 V680 H50 V1000" fill="none" stroke="#a5b4fc" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="30 420" className="signal-pulse signal-pulse-delay" filter="url(#glowR)" />
        <circle cx="85" cy="230" r="3" fill="#818cf8" className="signal-node" style={{animationDelay:'0.6s'}} />
        <circle cx="45" cy="410" r="3" fill="#22d3ee" className="signal-node" style={{animationDelay:'1.8s'}} />
        <circle cx="80" cy="590" r="3" fill="#f59e0b" className="signal-node" style={{animationDelay:'3s'}} />
      </svg>

      <style jsx>{`
        .signal-rail { opacity: .45; }
        .signal-pulse { animation: signalFlow 6s linear infinite; }
        .signal-pulse-delay { animation-delay: -3s; }
        .signal-node { animation: signalNode 2.8s ease-in-out infinite; transform-origin: center; }
        @keyframes signalFlow { from { stroke-dashoffset: 450; } to { stroke-dashoffset: 0; } }
        @keyframes signalNode { 0%,100%{ opacity:.25; filter: drop-shadow(0 0 0px currentColor); } 50%{ opacity:1; filter: drop-shadow(0 0 6px currentColor); } }
        @media (max-width: 1280px) { div :global(svg) { opacity: .28; width: 72px; } }
        @media (max-width: 768px) { div :global(svg) { display: none; } }
      `}</style>
    </div>
  );
}