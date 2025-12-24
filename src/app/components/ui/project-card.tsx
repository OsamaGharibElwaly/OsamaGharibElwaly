import Image from "next/image";
import Link from "next/link";
import { Project } from "../../lib/portfolio-data";
import { Badge } from "./badge";
import { ArrowRight } from "lucide-react";
import { projectSlug } from "../../lib/slug";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const slug = projectSlug(project.name);
  console.log("slug:", slug)
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-[#E0E0E0] bg-white shadow-sm transition-transform duration-200 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg dark:border-darkBorder dark:bg-slate-200 dark:hover:bg-slate-100">
      <div className="relative h-48 w-full">
        <Image
          src={project.cover_image}
          alt={project.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-900">
          {project.name}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-900">
          {project.short_description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.technologies_used.slice(0, 4).map((tech) => (
            <Badge key={tech} className="text-[11px]">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="mt-auto pt-2">
          <Link
            href={`../../projects/${slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-slate-900 underline-offset-4 hover:underline dark:text-slate-700 hover:text-[#00AEEF] transition hover:translate-x-0.5"
          >
            View project
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
