import Image from "next/image";
import Link from "next/link";
import {
  getEducation,
  getExperience,
  getPersonalInfo,
  getProjects,
  getReviews,
  getSkills,
  getStats,
} from "./lib/portfolio-data";
import { Button } from "./components/ui/button";
import { MotionSection } from "./components/ui/motion-section";
import { SectionHeader } from "./components/ui/section-header";
import { SkillsGrid } from "./components/ui/skills-grid";
import { Timeline } from "./components/ui/timeline";
import { ReviewCarousel } from "./components/ui/review-carousel";
import { Mail, Briefcase, FolderGit2, Users } from "lucide-react";
import { ProjectsShowcase } from "./components/ui/projects-showcase";
import { HeroAiThree } from "./components/ui/hero-ai-three";

export default function HomePage() {
  const personal = getPersonalInfo();
  const stats = getStats();
  const skills = getSkills();
  const education = getEducation();
  const experience = getExperience();
  const projects = getProjects();
  const reviews = getReviews();

  const mainEducation = education[0];

  return (
    <div className="space-y-14 lg:space-y-16 dark:[#101622]">
                  {/* HERO */}
      <MotionSection className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
              AI systems · full-stack
            </p>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              <span className="block bg-gradient-to-r from-cyan-600 via-sky-600 to-violet-600 bg-clip-text text-transparent dark:from-cyan-400 dark:via-sky-400 dark:to-violet-400">
                AI Engineer | Software Engineer
              </span>
              <span className="mt-1 block text-lg font-medium text-slate-700 md:text-xl dark:text-slate-300">
                (Full-Stack AI Systems)
              </span>
            </h1>
            <p className="max-w-xl text-sm text-slate-600 md:text-base dark:text-slate-300">
              Focus: LLMs, RAG pipelines, embeddings, and AI architecture you can ship—observable stages,
              clear APIs, and guardrails that hold in production.
            </p>
          </div>

          <div className="flex max-w-md flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button
              asChild
              size="lg"
              className="w-full rounded-full bg-[#00AEEF] text-white shadow-md transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-lg hover:bg-cyan-500/90 sm:w-auto"
            >
              <Link href={personal.cv_download} download data-testid="hero-download-cv">
                Download CV
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full rounded-full border-slate-200/90 bg-white/90 text-slate-900 shadow-md backdrop-blur-sm transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:border-cyan-400/40 hover:text-cyan-700 dark:border-white/10 dark:bg-slate-950/50 dark:text-slate-100 dark:hover:border-cyan-400/30 sm:w-auto"
            >
              <Link href="#projects" data-testid="hero-view-projects">
                AI Systems Showcase
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full rounded-full border-cyan-500/25 bg-cyan-500/5 text-cyan-900 shadow-sm transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.02] dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-100 sm:w-auto"
            >
              <Link href="/ai" data-testid="hero-ai-journey">
                AI engineering journey
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-1">
            <Link
              href={`mailto:${personal.contact.email}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-cyan-600 transition hover:text-cyan-800 dark:text-cyan-400 dark:hover:text-cyan-200"
              data-testid="hero-contact-email"
            >
              <Mail className="h-4 w-4" />
              Contact
            </Link>
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-cyan-500/40 ring-2 ring-cyan-500/10 dark:border-cyan-400/30">
              <Image
                src={personal.profile_image}
                alt={personal.name}
                fill
                className="object-cover"
                priority
                sizes="56px"
              />
            </div>
          </div>
        </div>

        <div className="flex min-h-[280px] flex-col justify-center">
          <HeroAiThree />
        </div>
      </MotionSection>


      {/* STATS */}
      <MotionSection className="grid gap-4 md:grid-cols-3">
        <div>
          <SectionHeader
            eyebrow="Overview"
            title="Quick snapshot"
            description="Shipping AI-backed systems and interfaces with the same rigor as any production service."
          />
        </div>
        <div className="grid gap-4 md:col-span-2 md:grid-cols-3">
          <StatItem
            icon={<FolderGit2 className="h-4 w-4" />}
            label="Projects shipped"
            value={stats.projects}
          />
          <StatItem
            icon={<Briefcase className="h-4 w-4" />}
            label="Years of experience"
            value={stats.experience}
          />
          <StatItem
            icon={<Users className="h-4 w-4" />}
            label="Happy clients"
            value={stats.customers}
          />
        </div>
      </MotionSection>

      {/* ABOUT */}
      <MotionSection id="about">
        <SectionHeader
          eyebrow="About"
          title="Blending engineering and design"
          description={personal.about_me}
        />
        {mainEducation && (
          <div className="rounded-2xl border border-[#E0E0E0] bg-white p-4 text-sm text-lightMuted shadow-sm dark:border-darkBorder dark:bg-darkSurface dark:text-darkMuted transition hover:scale-[1.02] dark:text-slate-900">
            <span className="font-medium text-slate-900 dark:text-slate-900">
              {mainEducation.degree}
            </span>{" "}
            at {mainEducation.institution} · {mainEducation.date_range}
          </div>
        )}
      </MotionSection>

      {/* SKILLS */}
      <MotionSection id="skills" className="space-y-6">
        <SectionHeader
          eyebrow="Skills"
          title="What I work with"
          description="From pixel-perfect interfaces to clean, maintainable code."
        />
        <div className="grid gap-4 md:grid-cols-2">
          <SkillsGrid
            title="Technical"
            items={skills.technical_skills}
          />
          <SkillsGrid title="Soft skills" items={skills.soft_skills} />
        </div>
      </MotionSection>

      {/* EXPERIENCE */}
      <MotionSection id="experience" className="space-y-6">
        <SectionHeader
          eyebrow="Experience"
          title="Learning from real-world systems"
          description="Internships and volunteering that shaped how I think about software, networks, and people."
        />
        <Timeline items={experience} />
      </MotionSection>

      {/* PROJECTS */}
      <MotionSection id="projects" className="space-y-6">
        <SectionHeader
          eyebrow="AI Systems Showcase"
          title="Systems, not just screens"
          description="Architecture tags, AI building blocks, and compact pipeline views—organized by AI engineering, full-stack web, and QA automation."
        />
        <ProjectsShowcase projects={projects} />
      </MotionSection>

      {/* REVIEWS */}
      {reviews.length > 0 && (
        <MotionSection id="reviews" className="space-y-6">
          <SectionHeader
            eyebrow="Reviews"
            title="What clients say"
            description="Feedback from clients I've had the pleasure of working with."
          />
          <ReviewCarousel reviews={reviews} />
        </MotionSection>
      )}

      {/* CTA */}
      <MotionSection className="mt-4">
        <div className="rounded-3xl border border-[#E0E0E0] bg-white p-6 text-center shadow-sm dark:border-darkBorder dark:bg-darkSurface">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-700">
            Interested in similar work?
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-500">
            Let&apos;s connect on LLM features, RAG, or full-stack delivery—from first
            prototype to production checks.
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

function StatItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-[#E0E0E0] bg-white p-4 shadow-sm transition-transform duration-200 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg dark:border-darkBorder dark:bg-darkSurface">
      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100">
          {icon}
        </span>
        <span>{label}</span>
      </div>
      <div className="text-2xl text-center text-[#00BFFF] font-semibold ">
        {value}
        {label.toLowerCase().includes("years") && (
          <span className="ml-1 text-sm font-normal text-slate-500 dark:text-slate-400">
            
          </span>
        )}
      </div>
    </div>
  );
}
