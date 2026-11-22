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
import { Mail, Briefcase, FolderGit2, Sparkles, ArrowRight, Github, Linkedin } from "lucide-react";
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
    <div className="space-y-16 lg:space-y-20">
      <MotionSection className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center">
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
              <Sparkles className="h-3.5 w-3.5" /> AI Engineer · Data Scientist
            </p>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              <span className="bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-500 bg-clip-text text-transparent">
                Building reliable AI systems
              </span>
              <span className="mt-2 block text-xl font-medium text-slate-700 dark:text-slate-300 md:text-2xl">
                from data to deployed product.
              </span>
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-slate-600 md:text-base dark:text-slate-300">
              {personal.about_me}
            </p>
          </div>

          <div className="flex max-w-xl flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" className="rounded-full bg-cyan-500 text-white hover:bg-cyan-400">
              <Link href="#projects" data-testid="hero-view-projects">View Flagship Projects <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-slate-300 bg-white/80 dark:border-white/10 dark:bg-slate-950/40">
              <Link href={personal.cv_download} download data-testid="hero-download-cv">Download CV</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-cyan-500/25 bg-cyan-500/5 text-cyan-800 dark:text-cyan-100">
              <Link href="/ai" data-testid="hero-ai-journey">AI Systems</Link>
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-1 text-sm">
            <Link href={`mailto:${personal.contact.email}`} className="inline-flex items-center gap-2 text-cyan-700 hover:text-cyan-500 dark:text-cyan-300"><Mail className="h-4 w-4" />{personal.contact.email}</Link>
            <Link href="https://github.com/OsamaGharibElwaly" target="_blank" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"><Github className="h-4 w-4" />GitHub</Link>
            <Link href="https://www.linkedin.com/in/osama-alwaly" target="_blank" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"><Linkedin className="h-4 w-4" />LinkedIn</Link>
          </div>
        </div>
        <div className="flex min-h-[280px] flex-col justify-center">
          <HeroAiThree />
        </div>
      </MotionSection>

      <MotionSection className="grid gap-4 md:grid-cols-3" id="proof">
        <div>
          <SectionHeader eyebrow="Proof" title="Evidence, not claims" description="Generated visuals and architecture snapshots back the portfolio narrative." />
        </div>
        <div className="grid gap-4 md:col-span-2 md:grid-cols-3">
          <StatItem icon={<FolderGit2 className="h-4 w-4" />} label="Flagship projects" value={stats.projects} />
          <StatItem icon={<Briefcase className="h-4 w-4" />} label="Experience roles" value={stats.experience} />
          <StatItem icon={<Sparkles className="h-4 w-4" />} label="Core capabilities" value={8} />
        </div>
      </MotionSection>

      <MotionSection>
        <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/70 shadow-sm dark:border-white/10 dark:bg-slate-950/50">
          <Image src="/assets/generated/stats-dashboard.png" alt="Portfolio proof snapshot" width={1600} height={500} className="w-full" priority />
        </div>
      </MotionSection>

      <MotionSection id="about" className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <SectionHeader eyebrow="About" title="AI Engineer with a Data Scientist core" description="I care about measurable outcomes: clean data, clear assumptions, evaluated models, and systems that survive real usage." />
          <div className="grid gap-3 sm:grid-cols-2">
            {["RAG & LLM systems","Statistical & ML evaluation","FastAPI data/AI backends","Product-ready interfaces"].map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-white/80 p-4 text-sm text-slate-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-200">{item}</div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 dark:border-white/10 dark:bg-slate-950/50">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-400">Education</p>
          <p className="mt-3 text-base font-semibold text-slate-900 dark:text-slate-100">{mainEducation?.degree}</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">{mainEducation?.institution} · {mainEducation?.date_range}</p>
          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10">
            <Image src="/assets/generated/delivery-pipeline.png" alt="AI delivery workflow" width={1200} height={280} className="w-full" />
          </div>
        </div>
      </MotionSection>

      <MotionSection id="skills" className="space-y-6">
        <SectionHeader eyebrow="Skills" title="Technical arsenal" description="Capabilities used across the two flagship projects and AI/data product work." />
        <div className="overflow-hidden rounded-3xl border border-slate-200/80 dark:border-white/10">
          <Image src="/assets/generated/skill-matrix.png" alt="Skill matrix" width={1400} height={700} className="w-full" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <SkillsGrid title="Technical" items={skills.technical_skills} />
          <SkillsGrid title="Professional" items={skills.soft_skills} />
        </div>
      </MotionSection>

      <MotionSection id="projects" className="space-y-6">
        <SectionHeader eyebrow="Featured Projects" title="Two flagship proof-of-concept systems" description="Selected for depth: real architecture, AI/data workflow, and documented proof." />
        <div className="overflow-hidden rounded-3xl border border-slate-200/80 dark:border-white/10">
          <Image src="/assets/generated/project-scope.png" alt="Project scope comparison" width={1400} height={700} className="w-full" />
        </div>
        <ProjectsShowcase projects={projects} />
      </MotionSection>

      <MotionSection id="experience" className="space-y-6">
        <SectionHeader eyebrow="Experience" title="Grounded in real environments" description="Engineering, networking, and communication experience that supports practical AI delivery." />
        <Timeline items={experience} />
      </MotionSection>

      {reviews.length > 0 && (
        <MotionSection id="reviews" className="space-y-6">
          <SectionHeader eyebrow="Signal" title="What collaborators say" description="A small signal, backed by bigger project evidence." />
          <ReviewCarousel reviews={reviews} />
        </MotionSection>
      )}

      <MotionSection id="contact" className="mt-4">
        <div className="overflow-hidden rounded-3xl border border-cyan-500/20 bg-slate-950 p-8 text-center shadow-[0_0_60px_-20px_rgba(34,211,238,0.35)]">
          <h2 className="text-2xl font-semibold text-white">Let&apos;s build reliable AI products</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-300">
            Open to AI Engineer and Data Scientist roles where data quality, model evaluation, and production engineering matter.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="rounded-full bg-cyan-500 text-slate-950 hover:bg-cyan-400"><Link href="mailto:osamagharib04@gmail.com">Email me</Link></Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10"><Link href="https://github.com/OsamaGharibElwaly/OsamaGharibElwaly" target="_blank">View GitHub</Link></Button>
          </div>
        </div>
      </MotionSection>
    </div>
  );
}

function StatItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm transition-transform duration-200 hover:-translate-y-1 dark:border-white/10 dark:bg-white/[0.03]">
      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-700 dark:text-cyan-300">{icon}</span>
        <span>{label}</span>
      </div>
      <div className="text-center text-2xl font-semibold text-cyan-600 dark:text-cyan-400">{value}</div>
    </div>
  );
}