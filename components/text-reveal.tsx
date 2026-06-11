"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

import { cn } from "@/lib/cn";

type TextRevealProps = {
  text: string;
  className?: string;
  /** applied to each word span — needed for background-clip:text effects,
      which don't paint through the transformed word wrappers */
  wordClassName?: string;
  delay?: number;
};

const container: Variants = {
  hidden: {},
  show: (delay: number) => ({
    transition: { staggerChildren: 0.045, delayChildren: delay },
  }),
};

const word: Variants = {
  hidden: { y: "115%" },
  show: {
    y: "0%",
    transition: { duration: 0.75, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export function TextReveal({ text, className, wordClassName, delay = 0 }: TextRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      className={cn("inline-block", className)}
      variants={container}
      custom={delay}
      initial={reduceMotion ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      aria-label={text}
    >
      {text.split(" ").map((part, index) => (
        <span
          key={`${part}-${index}`}
          aria-hidden
          // pb/-mb keep descenders (g, y, j) inside the overflow mask
          className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom"
        >
          <motion.span
            variants={word}
            className={cn("inline-block will-change-transform", wordClassName)}
          >
            {part}
            {index < text.split(" ").length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
