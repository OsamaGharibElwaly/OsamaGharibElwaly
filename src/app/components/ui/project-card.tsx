"use client";

import Image from "next/image";
import Link from "next/link";
import { Project } from "../../lib/portfolio-data";
import { Badge } from "./badge";
import { ArrowRight, ExternalLink } from "lucide-react";
import { projectSlug } from "../../lib/slug";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const slug = projectSlug(project.name);
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-[#E0E0E0] bg-white shadow-md transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl dark:border-darkBorder dark:bg-darkSurface"
    >
      {/* Image Container with Enhanced Effects */}
      <Link href={`/projects/${slug}`} className="relative block overflow-hidden">
        <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-darkSurface dark:to-darkSurface/80">
          <Image
            src={project.cover_image}
            alt={project.name}
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            quality={90}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          
          {/* Hover Overlay with Icon */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/20">
            <div className="flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-md px-4 py-2 text-sm font-semibold text-slate-900 opacity-0 shadow-xl transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-95 dark:bg-slate-800/95 dark:text-slate-100">
              <span>View Project</span>
              <ExternalLink className="h-4 w-4" />
            </div>
          </div>

          {/* Decorative Corner Accent */}
          <div className="absolute top-0 right-0 h-20 w-20 bg-gradient-to-bl from-[#00AEEF]/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      </Link>

      {/* Content Section */}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-900 transition-colors duration-200 group-hover:text-[#00AEEF] dark:text-slate-200 dark:group-hover:text-[#00AEEF]">
            {project.name}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {project.short_description}
          </p>
        </div>

        {/* Technologies Badges */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies_used.slice(0, 4).map((tech) => (
            <Badge
              key={tech}
              className="text-[10px] bg-sky-50 text-sky-700 dark:bg-[#0b2237] dark:text-sky-300 border-0"
            >
              {tech}
            </Badge>
          ))}
          {project.technologies_used.length > 4 && (
            <Badge className="text-[10px] bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-0">
              +{project.technologies_used.length - 4}
            </Badge>
          )}
        </div>

        {/* View Project Link */}
        <div className="mt-auto pt-2">
          <Link
            href={`/projects/${slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 underline-offset-4 transition-all duration-200 hover:gap-3 hover:text-[#00AEEF] hover:underline dark:text-slate-300 dark:hover:text-[#00AEEF]"
          >
            <span>View details</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
