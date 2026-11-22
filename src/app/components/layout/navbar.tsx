"use client";

import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";
import { usePathname } from "next/navigation";

const sections = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#proof", label: "Proof" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur-md dark:border-darkBorder dark:bg-darkBg/90">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-6">
        <Link href={pathname ?? "/"} className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900 text-xs font-bold text-white dark:bg-cyan-400 dark:text-slate-950">
            OA
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Osama Gharib Al-Waly
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 ">
              AI Engineer · Data Scientist
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-4 text-xs font-medium text-slate-600 md:flex dark:text-slate-300">
            <li>
              <Link
                href="/ai"
                className="rounded-full px-3 py-1 text-cyan-700 transition hover:bg-cyan-500/10 dark:text-cyan-300 dark:hover:bg-cyan-400/10"
                data-testid="nav-ai-systems"
              >
                AI Systems
              </Link>
            </li>
            {sections.map((item) => (
              <li key={item.href}>
                <a
                  href={pathname === "/" || pathname === "" ? item.href : `/${item.href}`}
                  onClick={(e) => {
                    if (pathname === "/" || pathname === "") {
                      e.preventDefault();
                      document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  className="rounded-full px-3 py-1 transition hover:bg-slate-100 dark:hover:bg-white/10"
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