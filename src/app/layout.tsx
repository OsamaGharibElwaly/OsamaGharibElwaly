import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { Navbar } from "./components/layout/navbar";
import { Footer } from "./components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Osama Gharib Al-Waly | AI Engineer · Data Scientist",
  description:
    "AI Engineer and Data Scientist building auditable AI systems, RAG pipelines, evaluation workflows, and data-driven products. Flagship projects: TalentOS and Waly_Presentation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-lightBg text-lightText antialiased dark:bg-darkBg dark:text-darkText`}
      >
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              <div className="mx-auto max-w-6xl px-4 py-10 lg:px-6 lg:py-12">
                {children}
              </div>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}