import { Badge } from "./badge";

interface SkillsGridProps {
  title: string;
  items: string[];
}

export function SkillsGrid({ title, items }: SkillsGridProps) {
  return (
    <div className="rounded-3xl border border-[#E0E0E0] bg-white p-6 shadow-sm dark:border-darkBorder dark:bg-darkSurface transition hover:scale-[1.02] ">
      <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-900">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Badge key={item}>{item}</Badge>
        ))}
      </div>
    </div>
  );
}
