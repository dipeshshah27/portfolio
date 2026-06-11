"use client";

import { AnimatePresence, animate, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { PRELOADER_DURATION, PRELOADER_EXIT } from "@/lib/intro";

export function Preloader() {
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const skip = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const controls = animate(0, 100, {
      duration: skip ? 0.01 : PRELOADER_DURATION,
      ease: "easeInOut",
      onUpdate: (value) => setProgress(Math.round(value)),
      onComplete: () => setDone(true),
    });
    return () => controls.stop();
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-60 flex items-end justify-between bg-background p-8 md:p-12"
          exit={{ y: "-100%" }}
          transition={{
            duration: reduceMotion ? 0 : PRELOADER_EXIT,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-2xl italic md:text-4xl"
          >
            Dipesh Shah<span className="text-accent">.</span>
          </motion.p>
          <p className="font-mono text-5xl tabular-nums md:text-7xl">{progress}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
