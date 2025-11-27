"use client";

import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";
import { usePathname } from "next/navigation";

const sections = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-black bg-slate-500 transition hover:bg-slate-100 backdrop-blur-md dark:border-darkBorder dark:bg-darkBg/90">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-6">
        <Link href={pathname ?? "/"} className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900 text-xs font-bold text-white dark:bg-slate-100 dark:text-slate-900">
            OA
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-900">
              Osama Alwaly
            </span>
            <span className="text-xs text-slate-900 dark:text-slate-400 ">
              Front-end Developer
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-4 text-xs font-medium text-slate-600 md:flex dark:text-slate-900">
            {sections.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-3 py-1 dark:hover:bg-slate-300 transition hover:bg-slate-300"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
