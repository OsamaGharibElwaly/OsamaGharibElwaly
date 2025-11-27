"use client";

import { ExperienceItem } from "../../lib/portfolio-data";
import { motion } from "framer-motion";

interface TimelineProps {
  items: ExperienceItem[];
}

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.35,
      delay: i * 0.08,
      ease: "easeOut",
    },
  }),
};

export function Timeline({ items }: TimelineProps) {
  return (
    <ol className="relative border-l border-slate-200 dark:border-slate-700">
      {items.map((exp, index) => (
        <motion.li
          key={index}
          className="group mb-8 ml-4 rounded-xl bg-transparent pl-4 pr-2 py-2 transition-colors duration-200 hover:bg-sky-200 dark:hover:bg-slate-800/60"
          
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={index}
        >
          {/* النقطة الزرقا */}
          <span className="absolute -left-[7px] mt-2 h-3.5 w-3.5 rounded-full border border-sky-400 bg-sky-400 transition-all duration-200 group-hover:scale-110 group-hover:shadow-[0_0_0_4px_rgba(56,189,248,0.35)]" />

          {/* التاريخ + المكان */}
          <p className="text-xs font-medium text-slate-500 transition-colors duration-200 group-hover:text-sky-600 dark:text-slate-400 dark:group-hover:text-sky-400">
            {exp.date_range} • {exp.location}
          </p>

          {/* العنوان */}
          <h3 className="mt-1 text-sm font-semibold text-slate-600 transition-colors duration-200 group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-white">
            {exp.title} ·{" "}
            <span className="text-slate-600 dark:text-slate-300">
              {exp.company}
            </span>
          </h3>

          {/* البوينتس */}
          <ul className="mt-2 space-y-1 text-sm text-slate-700 dark:!text-slate-100">
            {exp.description_points.map((point) => (
              <li key={point} className="transition-transform duration-200 group-hover:translate-x-0.5">
                • {point}
              </li>
            ))}
          </ul>
        </motion.li>
      ))}
    </ol>
  );
}
