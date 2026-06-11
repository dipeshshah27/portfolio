# Hero portrait (2026-06-11)

- [x] Process `~/Downloads/profile.png` with ffmpeg → `public/profile.jpg` (4:5 crop on subject, warm grade: saturation 0.84, contrast 0.96, warm colorbalance, lifted blacks)
- [x] Add `HeroPortrait` subcomponent to `components/sections/hero.tsx` — glass-framed, right side, `hidden lg:block`
- [x] Theme-adaptive finish: `.noise` grain overlay, `from-background` bottom fade, `dark:brightness-90 dark:contrast-105`
- [x] Motion: entrance at `INTRO_DELAY + 0.9` (with paragraph/CTAs), parallax `-60` vs text `-120`, fades on scroll, `useReducedMotion` respected
- [x] Verify: tsc clean, eslint clean, page renders with optimized `next/image` markup (`fetchPriority="high"`, eager — `priority` prop is deprecated in Next 16)

## Review

Photo stays a natural photo (user picked subtle grade over duotone). Grain is CSS-overlaid, not baked in, so it matches the site texture exactly and the one static file adapts to both themes via the `var(--background)` edge fade. Mobile hero untouched.
