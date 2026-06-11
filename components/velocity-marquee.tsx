"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { Fragment, useRef } from "react";

import { marqueeItems } from "@/content/site";

const BASE_SPEED = 2.5; // %/s drift when the page is still
const COPIES = [0, 1, 2, 3];

// keep x within one copy's width so the loop never shows an edge
function wrap(min: number, max: number, value: number) {
  const range = max - min;
  return min + (((value - min) % range) + range) % range;
}

export function VelocityMarquee() {
  const reduceMotion = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  // scrolling fast multiplies the drift; scrolling up reverses it
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const direction = useRef(1);
  const x = useTransform(baseX, (value) => `${wrap(-25, 0, value)}%`);

  useAnimationFrame((_, delta) => {
    if (reduceMotion) return;
    const factor = velocityFactor.get();
    if (factor < 0) direction.current = -1;
    else if (factor > 0) direction.current = 1;

    let moveBy = direction.current * BASE_SPEED * (delta / 1000);
    moveBy += moveBy * Math.abs(factor);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div aria-hidden className="relative overflow-hidden border-y border-foreground/8 py-5">
      <motion.div className="flex w-max items-center gap-8" style={{ x }}>
        {COPIES.map((copy) => (
          <Fragment key={copy}>
            {marqueeItems.map((item) => (
              <span
                key={`${copy}-${item}`}
                className="flex items-center gap-8 font-mono text-sm tracking-[0.25em] whitespace-nowrap text-muted uppercase"
              >
                {item}
                <span className="text-accent">✦</span>
              </span>
            ))}
          </Fragment>
        ))}
      </motion.div>
    </div>
  );
}
