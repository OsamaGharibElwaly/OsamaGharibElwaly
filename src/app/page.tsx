import Image from "next/image";
import Link from "next/link";
import {
  getEducation,
  getExperience,
  getPersonalInfo,
  getProjects,
  getSkills,
  getStats,
} from "./lib/portfolio-data";
import { Button } from "./components/ui/button";
import { MotionSection } from "./components/ui/motion-section";
import { SectionHeader } from "./components/ui/section-header";
import { SkillsGrid } from "./components/ui/skills-grid";
import { Timeline } from "./components/ui/timeline";
import { ProjectCard } from "./components/ui/project-card";
import { Mail, Phone, Briefcase, FolderGit2, Users } from "lucide-react";

export default function HomePage() {
  const personal = getPersonalInfo();
  const stats = getStats();
  const skills = getSkills();
  const education = getEducation();
  const experience = getExperience();
  const projects = getProjects();

  const mainEducation = education[0];

  return (
    <div className="space-y-14 lg:space-y-16 dark:[#101622]">
                  {/* HERO */}
      <MotionSection className="grid gap-10 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] md:items-center">
        {/* left side */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              <span className="block text-[#00AEEF]">Front-end Developer</span>
            </h1>
            <p className="max-w-xl text-sm text-slate-600 md:text-base dark:text-slate-300">
              Coding smooth. Designing smart. Delivering fast.
            </p>
          </div>

          {/* buttons + contact */}
          <div className="flex max-w-xs flex-col gap-3">
            <Button
              asChild
              size="lg"
              className="w-full rounded-full bg-[#00AEEF] text-white shadow-md transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-lg hover:bg-brandBlue/90 hover:text-black"
            >
              <Link href={personal.cv_download} download>
                Download CV
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full rounded-full border-transparent bg-white text-black shadow-md transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-lg hover:text-[#00AEEF]"
            >
              <Link href="#projects">View Projects</Link>
            </Button>

            {/* Contact centered under buttons */}
            <div className="flex justify-center pt-1">
              <Link
                href={`mailto:${personal.contact.email}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#00AEEF] transition hover:scale-[1.02] hover:text-black dark:hover:text-white"
              >
                <Mail className="h-4 w-4" />
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* right side image */}
        <div className="flex justify-center md:justify-end">
          <div className="relative h-56 w-56 overflow-hidden rounded-full border-8 border-[#00AEEF] md:h-64 md:w-64 transition hover:scale-[1.2]">
            <Image
              src={personal.profile_image}
              alt={personal.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </MotionSection>


      {/* STATS */}
      <MotionSection className="grid gap-4 md:grid-cols-3">
        <div>
          <SectionHeader
            eyebrow="Overview"
            title="Quick snapshot"
            description={`Delivering clean and scalable front-end solutions with modern tooling.`}
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
          eyebrow="Projects"
          title="Selected work"
          description="A mix of real-world applications and UI/UX explorations."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {projects.slice(0, projects.length).map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </MotionSection>
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
