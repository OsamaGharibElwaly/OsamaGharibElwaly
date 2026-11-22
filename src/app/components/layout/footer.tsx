export function Footer() {
  return (
    <footer className="border-t border-slate-200/70 bg-white/70 py-6 text-center text-xs text-slate-500 dark:border-darkBorder dark:bg-darkSurface dark:text-slate-400">
      © {new Date().getFullYear()} Osama Gharib Al-Waly · AI Engineer | Data Scientist · Built with Next.js
    </footer>
  );
}