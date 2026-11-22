"use client";

import { Project } from "../../lib/portfolio-data";
import { ProjectCard } from "./project-card";

interface ProjectsShowcaseProps {
  projects: Project[];
}

export function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white/75 p-4 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-950/55 dark:shadow-[0_0_40px_-14px_rgba(34,211,238,0.15)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(34,211,238,0.08),transparent_50%)]" />
      <div className="relative z-10 mb-6 flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-cyan-400/30 bg-cyan-500/15 px-4 py-2 text-sm font-medium text-cyan-900 dark:bg-cyan-500/20 dark:text-cyan-100">
          Flagship AI Projects
        </span>
        <span className="text-sm text-slate-500 dark:text-slate-400">Proof-driven systems, not demo-only screens.</span>
      </div>
      <div className="relative z-10 grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
