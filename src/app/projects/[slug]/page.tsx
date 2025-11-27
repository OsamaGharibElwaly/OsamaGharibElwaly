import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Github } from "lucide-react";

import { getProjects } from "../../lib/portfolio-data";
import { MotionSection } from "../../components/ui/motion-section";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

// نفس طريقة الـ slug اللي هتستخدمها في الكارد
function projectSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

type PageProps = {
  params: { slug: string };
};

export default async function ProjectDetailPage(props: PageProps) {
  const params = await props.params;

  const projects = getProjects();
  const project = projects.find(
    (p) => projectSlug(p.name) === params.slug
  );

  if (!project) return notFound();

  const githubLink = project.links?.find(
    (l) => l.type?.toLowerCase() === "github"
  );

  return (
    <div className="space-y-14 lg:space-y-16">
      {/* Back + Title */}
      <MotionSection className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 underline-offset-4 hover:underline dark:text-slate-500"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to portfolio
          </Link>

          {githubLink && (
            <Button
              asChild
              variant="outline"
              className="rounded-full border border-[#E0E0E0] bg-white px-4 py-2 text-xs font-medium text-slate-800 shadow-sm hover:bg-slate-100 dark:border-darkBorder dark:bg-darkSurface dark:text-slate-800 dark:hover:text-slate-200 dark:hover:bg-[#182235]"
            >
              <Link
                href={githubLink.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                View on GitHub
              </Link>
            </Button>
          )}
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Project
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl dark:text-slate-200">
            {project.name}
          </h1>
          <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-500">
            {project.short_description}
          </p>
        </div>
      </MotionSection>

      {/* Main preview */}
      <MotionSection>
        <div className="overflow-hidden rounded-3xl border border-[#E0E0E0] bg-white shadow-sm dark:border-darkBorder dark:bg-darkSurface">
          <div className="relative w-full pb-[52%]">
            <Image
              src={project.cover_image}
              alt={project.name}
              fill
              sizes="(min-width: 1024px) 900px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </MotionSection>

      {/* About this project */}
      <MotionSection className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-200">
          About this project
        </h2>
        <p className="max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-500">
          {project.description}
        </p>
      </MotionSection>

      {/* Key Features */}
      {project.features?.length > 0 && (
        <MotionSection className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-200">
            Key features
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {project.features.map((feature) => (
              <div
                key={feature}
                className="rounded-3xl border border-[#E0E0E0] bg-white p-5 text-sm text-slate-700 shadow-sm transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-lg dark:border-darkBorder dark:bg-darkSurface dark:text-slate-500"
              >
                {feature}
              </div>
            ))}
          </div>
        </MotionSection>
      )}

      {/* Technologies */}
      {project.technologies_used?.length > 0 && (
        <MotionSection className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-200">
            Technologies used
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies_used.map((tech) => (
              <Badge
                key={tech}
                className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-600 dark:bg-[#0b2237] dark:text-sky-300"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </MotionSection>
      )}

      {/* Gallery */}
      {project.media?.length > 0 && (
        <MotionSection className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-200">
            Project gallery
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {project.media.map((src, index) => (
              <div
                key={src + index}
                className="overflow-hidden rounded-3xl border border-[#E0E0E0] bg-white shadow-sm transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-lg dark:border-darkBorder dark:bg-darkSurface"
              >
                <div className="relative w-full pb-[70%]">
                  <Image
                    src={src}
                    alt={`${project.name} preview ${index + 1}`}
                    fill
                    sizes="(min-width: 1024px) 400px, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </MotionSection>
      )}

      {/* CTA */}
      <MotionSection className="mt-4">
        <div className="rounded-3xl border border-[#E0E0E0] bg-white p-6 text-center shadow-sm dark:border-darkBorder dark:bg-darkSurface">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-700">
            Interested in similar work?
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-500">
            Let&apos;s connect and discuss how I can bring your next project to
            life with clean, effective design and front-end development.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Button
              asChild
              size="md"
              className="rounded-full bg-[#00AEEF] px-5 text-sm text-white shadow-md hover:bg-[#0096D6] transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.02]"
            >
              <Link href="mailto:osamagharib04@gmail.com">
                Send me an email
              </Link>
            </Button>

            <Button
              asChild
              size="md"
              variant="outline"
              className="rounded-full border-[#E0E0E0] bg-white px-5 text-sm text-slate-800 shadow-md hover:bg-slate-100 dark:border-darkBorder dark:bg-[#0b2237] dark:text-slate-100 dark:hover:bg-[#182235] transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.02]"
            >
              <Link
                href="https://wa.me/201210916041"
                target="_blank"
                rel="noopener noreferrer"
              >
                Send me on WhatsApp
              </Link>
            </Button>
          </div>
        </div>
      </MotionSection>
    </div>
  );
}

// (اختياري) عشان الـ static generation – لو حابب:
export function generateStaticParams() {
  const projects = getProjects();
  return projects.map((project) => ({
    slug: projectSlug(project.name),
  }));
}
