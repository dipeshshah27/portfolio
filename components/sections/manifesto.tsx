"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";

import { manifesto, stats } from "@/content/site";
import { useMediaQuery } from "@/hooks/use-media-query";

const WORDS = manifesto.split(" ");

export function Manifesto() {
  // hydration-safe (SSR snapshot is false), unlike useReducedMotion which
  // can mismatch on the first client render for reduced-motion users
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const statsOpacity = useTransform(scrollYProgress, [0.78, 0.92], [0, 1]);
  const statsY = useTransform(scrollYProgress, [0.78, 0.92], [32, 0]);

  if (reduceMotion) {
    return (
      <section id="about" className="scroll-mt-24 px-6 py-28 md:py-40">
        <div className="mx-auto max-w-5xl">
          <Kicker />
          <p className="mt-10 font-display text-3xl leading-snug font-medium md:text-5xl">
            {manifesto}
          </p>
          <StatsRow />
        </div>
      </section>
    );
  }

  return (
    <section id="about">
      {/* tall track gives the pinned viewport its scrub distance */}
      <div ref={trackRef} className="relative h-[280vh]">
        <div className="sticky top-0 flex h-svh items-center px-6">
          <div className="mx-auto w-full max-w-5xl">
            <Kicker />
            <p className="mt-10 flex flex-wrap font-display text-3xl leading-snug font-medium md:text-5xl md:leading-snug">
              {WORDS.map((word, index) => (
                <Word
                  key={`${word}-${index}`}
                  progress={scrollYProgress}
                  range={[
                    (index / WORDS.length) * 0.75,
                    (index / WORDS.length) * 0.75 + 0.06,
                  ]}
                >
                  {word}
                </Word>
              ))}
            </p>
            <motion.div style={{ opacity: statsOpacity, y: statsY }}>
              <StatsRow />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Kicker() {
  return (
    <p className="flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-accent uppercase">
      <span className="h-px w-10 bg-accent" />
      01 — About
    </p>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.13, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.28em] inline-block">
      {children}
    </motion.span>
  );
}

function StatsRow() {
  return (
    <dl className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label} className="glass rounded-2xl px-6 py-5">
          <dt className="order-2 font-mono text-xs tracking-[0.2em] text-muted uppercase">
            {stat.label}
          </dt>
          <dd className="font-display text-4xl font-medium text-gradient md:text-5xl">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
