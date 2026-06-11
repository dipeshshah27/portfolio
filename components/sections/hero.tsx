"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from "motion/react";
import Image from "next/image";
import { useRef } from "react";

import { Magnetic } from "@/components/magnetic";
import { INTRO_DELAY } from "@/lib/intro";

const NAME_LINES = ["Dipesh", "Shah"];

const lineContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.045, delayChildren: INTRO_DELAY + 0.15 },
  },
};

const letter: Variants = {
  hidden: { y: "110%", rotate: 5 },
  show: {
    y: "0%",
    rotate: 0,
    transition: { type: "spring", stiffness: 110, damping: 16 },
  },
};

export function Hero() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const rise = useTransform(scrollYProgress, [0, 1], [0, -120]);
  // the two name lines shear apart as you scroll away
  const splitLeft = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const splitRight = useTransform(scrollYProgress, [0, 1], [0, 90]);
  // portrait drifts slower than the text (-60 vs -120) for parallax depth
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={sectionRef} id="top" className="relative flex min-h-svh items-center px-6">
      <motion.div
        className="mx-auto w-full max-w-6xl"
        style={reduceMotion ? undefined : { opacity: fade, y: rise }}
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: INTRO_DELAY }}
          className="flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-accent uppercase"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          Kathmandu · Open to senior frontend roles
        </motion.p>

        <h1 className="relative z-10 mt-8 font-display text-[clamp(3.5rem,14vw,10.5rem)] leading-[0.95] font-medium">
          {NAME_LINES.map((line, lineIndex) => (
            <motion.span
              key={line}
              variants={lineContainer}
              initial={reduceMotion ? false : "hidden"}
              animate="show"
              style={
                reduceMotion
                  ? undefined
                  : { x: lineIndex === 0 ? splitLeft : splitRight }
              }
              className="block overflow-hidden"
            >
              {line.split("").map((char, index) => (
                <motion.span
                  key={`${char}-${index}`}
                  variants={letter}
                  className="inline-block will-change-transform"
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: INTRO_DELAY + 0.9 }}
          className="mt-10 flex max-w-xl flex-col gap-8"
        >
          <p className="text-lg leading-relaxed text-muted md:text-xl">
            Senior frontend engineer building fast, polished web products with React and
            Next.js. I care about the last 4% — the part users feel but can&apos;t name.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href="#work"
                className="inline-flex rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
              >
                See the work
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="glass inline-flex rounded-full px-7 py-3.5 text-sm font-semibold transition-transform hover:scale-[1.03]"
              >
                Get in touch
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </motion.div>

      <HeroPortrait fade={fade} y={portraitY} reduceMotion={reduceMotion ?? false} />

      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: INTRO_DELAY + 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.35em] text-muted uppercase"
      >
        <span className="flex flex-col items-center gap-3">
          Scroll
          <motion.span
            aria-hidden
            className="block h-10 w-px bg-gradient-to-b from-accent to-transparent"
            animate={reduceMotion ? undefined : { scaleY: [1, 0.55, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}

type HeroPortraitProps = {
  fade: MotionValue<number>;
  y: MotionValue<number>;
  reduceMotion: boolean;
};

function HeroPortrait({ fade, y, reduceMotion }: HeroPortraitProps) {
  return (
    <motion.div
      className="pointer-events-none absolute top-1/2 right-[4vw] hidden -translate-y-1/2 lg:block"
      style={reduceMotion ? undefined : { opacity: fade, y }}
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 28, rotate: 5 }}
        animate={{ opacity: 1, y: 0, rotate: 2 }}
        transition={{
          duration: 0.9,
          delay: INTRO_DELAY + 0.9,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
        className="glass w-[clamp(300px,26vw,420px)] rounded-3xl p-2"
      >
        <div className="relative overflow-hidden rounded-2xl">
          <Image
            src="/profile-cafe.jpg"
            alt="Dipesh Shah working on a laptop in a Kathmandu café"
            width={760}
            height={950}
            loading="eager"
            fetchPriority="high"
            className="h-auto w-full dark:brightness-90 dark:contrast-105"
          />
          {/* same film grain the aurora backdrop uses, so the photo shares the site's texture */}
          <div aria-hidden className="noise absolute inset-0 opacity-[0.08] mix-blend-overlay" />
          {/* bottom edge melts into whichever theme background is active */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-background/45 via-transparent to-transparent"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
