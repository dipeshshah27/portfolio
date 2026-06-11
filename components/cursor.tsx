"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

import { useMediaQuery } from "@/hooks/use-media-query";

export function Cursor() {
  const fine = useMediaQuery("(pointer: fine)");
  const noReduce = useMediaQuery("(prefers-reduced-motion: no-preference)");
  const enabled = fine && noReduce;

  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;

    function handleMove(event: PointerEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    }
    function handleOver(event: PointerEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      setHovering(target.closest("a, button, [data-cursor]") !== null);
    }
    function handleLeave() {
      setVisible(false);
    }

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerover", handleOver);
    document.documentElement.addEventListener("pointerleave", handleLeave);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerover", handleOver);
      document.documentElement.removeEventListener("pointerleave", handleLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-70 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground"
        style={{ x, y }}
        animate={{ opacity: visible ? 1 : 0, scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-70 size-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/40"
        style={{ x: ringX, y: ringY }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovering ? 1.7 : 1,
          backgroundColor: hovering ? "color-mix(in srgb, var(--accent) 18%, transparent)" : "transparent",
        }}
        transition={{ duration: 0.25 }}
      />
    </>
  );
}
