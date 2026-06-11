"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, type PointerEvent } from "react";

import { SectionHeading } from "@/components/section-heading";
import { projects, type Project } from "@/content/site";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/cn";

// static per-card offsets so the pinned deck fans out slightly
const STICKY_TOPS = ["md:top-[10vh]", "md:top-[12vh]", "md:top-[14vh]", "md:top-[16vh]"];

export function Projects() {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const deckRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: deckRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="work" className="scroll-mt-24 px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="03" kicker="Selected work" title="Proof beats promises." />

        <div ref={deckRef} className="relative mt-20">
          {projects.map((project, index) => (
            <div
              key={project.name}
              className={cn(
                "md:sticky",
                reduceMotion ? "md:static" : STICKY_TOPS[index % STICKY_TOPS.length],
                index > 0 && "mt-10 md:mt-[28vh]"
              )}
            >
              <DeckCard
                project={project}
                index={index}
                total={projects.length}
                deckProgress={scrollYProgress}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DeckCard({
  project,
  index,
  total,
  deckProgress,
}: {
  project: Project;
  index: number;
  total: number;
  deckProgress: MotionValue<number>;
}) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  // cards only deck up under md:sticky — below that they're a plain column
  const isDecked = useMediaQuery("(min-width: 48rem)");
  // as the next card scrolls over, this one settles back into the deck.
  // brightness, not opacity — a translucent card would let the cards
  // underneath bleed through it
  const targetScale = 1 - (total - 1 - index) * 0.045;
  const scale = useTransform(deckProgress, [index / total, 1], [1, targetScale]);
  const dim = useTransform(deckProgress, [index / total, 1], [1, 0.62]);
  const dimFilter = useMotionTemplate`brightness(${dim})`;
  // the top card is never covered, so it never settles back
  const isTop = index === total - 1;

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const glow = useMotionTemplate`radial-gradient(480px circle at calc(${pointerX} * 100%) calc(${pointerY} * 100%), var(--orb-1), transparent 65%)`;

  function handlePointerMove(event: PointerEvent<HTMLAnchorElement>) {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - bounds.left) / bounds.width;
    const py = (event.clientY - bounds.top) / bounds.height;
    pointerX.set(px);
    pointerY.set(py);
    rotateY.set((px - 0.5) * 6);
    rotateX.set((0.5 - py) * 6);
  }

  function handlePointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      style={
        reduceMotion || !isDecked || isTop ? undefined : { scale, filter: dimFilter }
      }
      className="origin-top"
    >
      <motion.a
        href={project.href}
        data-cursor
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}
        className="glass-solid group relative block overflow-hidden rounded-3xl p-8 md:min-h-[58vh] md:p-14"
      >
        <motion.span
          aria-hidden
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: glow }}
        />
        <span className="relative flex h-full flex-col">
          <span className="flex items-baseline justify-between font-mono text-xs tracking-[0.25em] text-accent uppercase">
            <span>{project.tagline}</span>
            <span className="text-muted">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </span>
          <span className="mt-6 flex items-baseline gap-4 font-display text-4xl font-medium md:text-6xl">
            {project.name}
            <span
              aria-hidden
              className="text-2xl text-accent transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1"
            >
              ↗
            </span>
          </span>
          <span className="mt-6 block max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            {project.description}
          </span>
          <span className="mt-auto flex flex-wrap gap-2 pt-10">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-foreground/12 px-3 py-1 font-mono text-xs text-muted"
              >
                {tech}
              </span>
            ))}
          </span>
        </span>
      </motion.a>
    </motion.div>
  );
}
