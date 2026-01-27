"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./button";
import { Review } from "../../lib/portfolio-data";

interface ReviewCarouselProps {
  reviews: Review[];
}

export function ReviewCarousel({ reviews }: ReviewCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || reviews.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000); // Change review every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, reviews.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
    setIsAutoPlaying(false); // Pause auto-play when user manually navigates
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  if (reviews.length === 0) return null;

  const currentReview = reviews[currentIndex];

  return (
    <div className="relative w-full">
      {/* Review Card */}
      <div className="relative overflow-hidden rounded-3xl border border-[#E0E0E0] bg-white p-8 shadow-lg dark:border-darkBorder dark:bg-darkSurface">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Stars Rating */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < currentReview.rating
                      ? "fill-[#FFC800] text-[#FFC800]"
                      : "fill-slate-200 text-slate-200 dark:fill-slate-700 dark:text-slate-700"
                  }`}
                />
              ))}
            </div>

            {/* Review Text */}
            <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300 md:text-lg">
              &ldquo;{currentReview.reviewText}&rdquo;
            </p>

            {/* Client Info */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#00AEEF] to-[#0096D6] text-lg font-semibold text-white">
                {currentReview.clientName.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-200">
                  {currentReview.clientName}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {currentReview.jobTitle}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        {reviews.length > 1 && (
          <>
            <Button
              onClick={handlePrevious}
              variant="ghost"
              size="md"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-700"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              onClick={handleNext}
              variant="ghost"
              size="md"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-700"
              aria-label="Next review"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}
      </div>

      {/* Dots Indicator */}
      {reviews.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-[#00AEEF]"
                  : "w-2 bg-slate-300 hover:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-600"
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
