import Image from "next/image";
import { SkillCategory } from "../../lib/portfolio-data";

interface SkillsGridProps {
  categories: SkillCategory[];
}

export function SkillsGrid({ categories }: SkillsGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {categories.map((cat) => (
        <div key={cat.title} className="rounded-3xl border border-slate-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-slate-950/45">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{cat.title}</h3>
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: cat.items[0]?.color ?? "#22d3ee" }} />
          </div>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 md:grid-cols-3 lg:grid-cols-6">
            {cat.items.map((item) => (
              <div key={item.name} className="group flex flex-col items-center gap-2 rounded-2xl border border-slate-100 bg-slate-50/70 p-3 transition hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white dark:border-white/5 dark:bg-white/[0.03] dark:hover:bg-white/[0.06]">
                <div className="relative h-9 w-9 transition group-hover:scale-110">
                  <Image
                    src={`https://skillicons.dev/icons?i=${item.icon}`}
                    alt={item.name}
                    fill
                    sizes="36px"
                    unoptimized
                    className="object-contain"
                  />
                </div>
                <span className="text-center text-[10px] font-medium leading-tight text-slate-600 dark:text-slate-300">{item.name}</span>
                <span className="h-0.5 w-6 rounded-full opacity-70" style={{ backgroundColor: item.color }} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}