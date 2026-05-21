"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-gold"
      style={{ scaleX }}
    />
  );
}
