"use client";

import { useMemo, useState } from "react";
import { Project } from "../../lib/portfolio-data";
import { ProjectCard } from "./project-card";

type ProjectCategory = "Fullstack Web" | "QA Testing" | "AI Engineering";

const CATEGORY_ORDER: ProjectCategory[] = [
  "AI Engineering",
  "Fullstack Web",
  "QA Testing",
];

function getProjectCategory(project: Project): ProjectCategory {
  return project.category ?? "Fullstack Web";
}

interface ProjectsShowcaseProps {
  projects: Project[];
}

export function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  const [activeCategory, setActiveCategory] =
    useState<ProjectCategory>("AI Engineering");
  const [hoveredCategory, setHoveredCategory] = useState<ProjectCategory | null>(
    null,
  );

  const visibleCategory = hoveredCategory ?? activeCategory;

  const filteredProjects = useMemo(
    () =>
      projects.filter(
        (project) => getProjectCategory(project) === visibleCategory,
      ),
    [projects, visibleCategory],
  );

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white/75 p-4 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-950/55 dark:shadow-[0_0_40px_-14px_rgba(34,211,238,0.15)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(34,211,238,0.08),transparent_50%)]" />

      <div className="relative z-10 mb-6 flex flex-wrap items-center gap-3">
        {CATEGORY_ORDER.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              data-testid={`projects-category-${category.replace(/\s+/g, "-").toLowerCase()}`}
              onMouseEnter={() => setHoveredCategory(category)}
              onMouseLeave={() => setHoveredCategory(null)}
              onFocus={() => setHoveredCategory(category)}
              onBlur={() => setHoveredCategory(null)}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "border border-cyan-400/30 bg-cyan-500/15 text-cyan-900 shadow-sm dark:bg-cyan-500/20 dark:text-cyan-100"
                  : "border border-transparent bg-slate-100/90 text-slate-700 hover:border-slate-200 hover:bg-white dark:bg-white/5 dark:text-slate-200 dark:hover:border-white/10 dark:hover:bg-white/10"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="relative z-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
