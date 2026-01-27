"use client";

import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { motion } from "framer-motion";

interface CoverImageProps {
  src: string;
  alt: string;
  onClick?: () => void;
}

export function CoverImage({ src, alt, onClick }: CoverImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-3xl border border-[#E0E0E0] bg-gradient-to-br from-slate-50 to-slate-100 shadow-xl transition-all duration-500 hover:shadow-2xl dark:border-darkBorder dark:from-darkSurface dark:to-darkSurface/80"
    >
      {/* Image Container - Flexible aspect ratio for different image types */}
      <div 
        className="relative w-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-darkSurface dark:via-darkSurface dark:to-darkSurface/50 cursor-pointer"
        onClick={onClick}
      >
        <div className="relative w-full h-full max-h-[80vh] flex items-center justify-center p-4 md:p-8 lg:p-12">
          <Image
            src={src}
            alt={alt}
            width={1400}
            height={800}
            className="w-full h-auto max-h-full object-contain rounded-2xl transition-all duration-500 group-hover:scale-[1.02] shadow-2xl"
            priority
            quality={95}
            sizes="(min-width: 1280px) 1400px, (min-width: 1024px) 1200px, (min-width: 768px) 900px, 100vw"
          />
        </div>
      </div>

      {/* Hover Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
      
      {/* Click Indicator */}
      {onClick && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100 pointer-events-none">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center gap-3 rounded-2xl bg-white/95 backdrop-blur-md px-6 py-4 shadow-2xl dark:bg-slate-800/95 border border-slate-200/50 dark:border-slate-700/50"
          >
            <Maximize2 className="h-7 w-7 text-slate-900 dark:text-slate-100" />
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Click to view fullscreen
            </span>
          </motion.div>
        </div>
      )}

      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-[#00AEEF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-br-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-[#00AEEF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tl-full pointer-events-none" />
    </motion.div>
  );
}
