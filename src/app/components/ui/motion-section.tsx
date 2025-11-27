"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "../../lib/utils";

export interface MotionSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function MotionSection({ children, className, id }: MotionSectionProps) {
  return (
    <motion.section
      id={id}
      className={cn(className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
