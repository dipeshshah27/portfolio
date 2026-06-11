"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";

import { GlassCard } from "@/components/glass-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { experiences, type Experience as ExperienceEntry } from "@/content/site";
import { cn } from "@/lib/cn";

export function Experience() {
  const reduceMotion = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 55%"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="experience" className="scroll-mt-24 px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="02"
          kicker="Experience"
          title="Three years, compounding daily."
        />

        <div ref={timelineRef} className="relative mt-20">
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-4 w-px bg-foreground/10 md:left-1/2"
          />
          <motion.div
            aria-hidden
            className="absolute top-0 bottom-0 left-4 w-px origin-top bg-gradient-to-b from-accent to-accent-warm md:left-1/2"
            style={reduceMotion ? undefined : { scaleY: lineScale }}
          />

          <ol className="flex flex-col gap-16">
            {experiences.map((entry, index) => (
              <TimelineEntry key={entry.company} entry={entry} flip={index % 2 === 1} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function TimelineEntry({ entry, flip }: { entry: ExperienceEntry; flip: boolean }) {
  return (
    <li className="relative pl-12 md:grid md:grid-cols-2 md:gap-16 md:pl-0">
      <span
        aria-hidden
        className="absolute top-2 left-4 size-2.5 -translate-x-1/2 rounded-full bg-accent ring-4 ring-background md:left-1/2"
      />
      <Reveal x={flip ? 48 : -48} className={cn(flip ? "md:col-start-2 md:pl-16" : "md:pr-16 md:text-right")}>
        <p className="font-mono text-xs tracking-[0.25em] text-accent uppercase">{entry.period}</p>
        <h3 className="mt-3 font-display text-2xl font-medium md:text-3xl">{entry.role}</h3>
        <p className="mt-1 text-muted">{entry.company}</p>
        <p className="mt-3 text-sm text-muted italic">{entry.summary}</p>
      </Reveal>
      <Reveal
        delay={0.15}
        x={flip ? -48 : 48}
        className={cn("mt-6 md:mt-0", flip && "md:col-start-1 md:row-start-1")}
      >
        <GlassCard className="p-6 md:p-8">
          <ul className="flex flex-col gap-3">
            {entry.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 text-sm leading-relaxed md:text-base">
                <span aria-hidden className="mt-1.5 text-accent">
                  ✦
                </span>
                {highlight}
              </li>
            ))}
          </ul>
        </GlassCard>
      </Reveal>
    </li>
  );
}
