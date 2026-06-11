"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

export function AuroraBackground() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const driftSlow = useTransform(scrollY, [0, 4000], [0, 420]);
  const driftFast = useTransform(scrollY, [0, 4000], [0, -560]);
  const driftMid = useTransform(scrollY, [0, 4000], [0, 260]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="orb orb-teal absolute -top-32 left-[-10%] size-[34rem] md:size-[44rem]"
        style={reduceMotion ? undefined : { y: driftSlow }}
      />
      <motion.div
        className="orb orb-amber absolute top-[35%] right-[-12%] size-[30rem] md:size-[40rem]"
        style={reduceMotion ? undefined : { y: driftFast }}
      />
      <motion.div
        className="orb orb-rose absolute bottom-[-15%] left-[20%] size-[26rem] md:size-[36rem]"
        style={reduceMotion ? undefined : { y: driftMid }}
      />
      <div className="noise absolute inset-0 opacity-[0.035] dark:opacity-[0.05]" />
    </div>
  );
}
