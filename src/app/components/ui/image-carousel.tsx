"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./button";

interface ImageCarouselProps {
  images: string[];
  projectName: string;
  initialIndex?: number;
  openTrigger?: number; // External trigger to open carousel
  onOpenChange?: (isOpen: boolean) => void; // Callback when carousel opens/closes
  hideGallery?: boolean; // Hide the gallery grid, only show modal
}

export function ImageCarousel({
  images,
  projectName,
  initialIndex = 0,
  openTrigger,
  onOpenChange,
  hideGallery = false,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isOpen, setIsOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Handle external open trigger
  useEffect(() => {
    if (openTrigger !== undefined && openTrigger > 0) {
      setCurrentIndex(initialIndex);
      setIsOpen(true);
    }
  }, [openTrigger, initialIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      } else if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleNext, handlePrevious]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const openCarousel = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
    onOpenChange?.(true);
  };

  const closeCarousel = () => {
    setIsOpen(false);
    onOpenChange?.(false);
  };

  // Touch gesture handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      // Swipe left - next image
      handleNext();
    } else if (distance < -minSwipeDistance) {
      // Swipe right - previous image
      handlePrevious();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (images.length === 0) return null;

  return (
    <>
      {/* Gallery Grid */}
      {!hideGallery && (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {images.map((src, index) => (
          <motion.div
            key={src + index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group relative overflow-hidden rounded-3xl border border-[#E0E0E0] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-darkBorder dark:bg-darkSurface cursor-pointer"
            onClick={() => openCarousel(index)}
          >
            <div className="relative w-full pb-[70%]">
              <Image
                src={src}
                alt={`${projectName} preview ${index + 1}`}
                fill
                sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10 dark:group-hover:bg-black/20" />
            {/* Click indicator */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="rounded-full bg-white/90 px-4 py-2 text-xs font-medium text-slate-900 shadow-lg dark:bg-slate-800/90 dark:text-slate-100">
                Click to view
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      )}

      {/* Carousel Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
              onClick={closeCarousel}
            />

            {/* Modal Content */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="relative flex h-full w-full max-w-7xl items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <Button
                  onClick={closeCarousel}
                  variant="ghost"
                  size="md"
                  className="absolute right-4 top-4 z-10 rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20 dark:bg-slate-800/50 dark:hover:bg-slate-700/50"
                  aria-label="Close carousel"
                >
                  <X className="h-5 w-5" />
                </Button>

                {/* Previous Button */}
                {images.length > 1 && (
                  <Button
                    onClick={handlePrevious}
                    variant="ghost"
                    size="md"
                    className="absolute left-4 z-10 rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20 dark:bg-slate-800/50 dark:hover:bg-slate-700/50"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                )}

                {/* Next Button */}
                {images.length > 1 && (
                  <Button
                    onClick={handleNext}
                    variant="ghost"
                    size="md"
                    className="absolute right-4 z-10 rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20 dark:bg-slate-800/50 dark:hover:bg-slate-700/50"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                )}

                {/* Image Container */}
                <div
                  className="relative h-full w-full"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                      className="relative h-full w-full"
                    >
                      <Image
                        src={images[currentIndex]}
                        alt={`${projectName} - Image ${currentIndex + 1}`}
                        fill
                        sizes="100vw"
                        className="object-contain"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Image Counter */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md dark:bg-slate-800/50">
                    {currentIndex + 1} / {images.length}
                  </div>
                )}

                {/* Thumbnail Strip (for multiple images) */}
                {images.length > 1 && (
                  <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto px-4 py-2 max-w-[90%] scrollbar-hide">
                    {images.map((src, index) => (
                      <button
                        key={src + index}
                        onClick={() => setCurrentIndex(index)}
                        className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                          index === currentIndex
                            ? "border-white scale-110 shadow-lg"
                            : "border-white/30 opacity-60 hover:opacity-100"
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      >
                        <Image
                          src={src}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
