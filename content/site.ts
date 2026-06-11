export type Experience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
};

export type Project = {
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  href: string;
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export const links = {
  email: "dipeshshah227@gmail.com",
  phone: "+977 9843804246",
  phoneHref: "tel:+9779843804246",
  // TODO: replace with your real profile URLs
  github: "https://github.com/your-username",
  linkedin: "https://www.linkedin.com/in/your-username",
};

export const manifesto =
  "I build web products that feel inevitable — fast, accessible, and polished to the last pixel. Three years deep in React and Next.js: design systems, storefronts, dashboards. I obsess over the final 4% most teams skip, because that's the part users actually feel.";

// TODO: placeholder numbers — make these your real ones
export const stats = [
  { value: "3+", label: "years of React & Next.js" },
  { value: "20+", label: "products shipped" },
  { value: "95+", label: "Lighthouse, every release" },
];

// TODO: placeholder employers — swap in your real companies, dates, and numbers
export const experiences: Experience[] = [
  {
    company: "Northline Studio",
    role: "Senior Frontend Engineer",
    period: "2025 — Present",
    summary: "Leading frontend on a multi-tenant commerce platform.",
    highlights: [
      "Own the React 19 / Next.js 16 architecture serving 40+ storefronts from one codebase",
      "Cut Largest Contentful Paint from 4.1s to 1.3s; conversion rose 18% the same quarter",
      "Built the internal design system — 50+ components, tokens, dark mode — now used by 3 teams",
      "Mentor two engineers; introduced performance budgets to every PR",
    ],
  },
  {
    company: "Kantipur Digital Works",
    role: "Frontend Engineer",
    period: "2023 — 2025",
    summary: "Shipped client products across e-commerce, publishing, and SaaS.",
    highlights: [
      "Delivered a bilingual CMS-driven commerce site end-to-end — localization, payments, admin",
      "Migrated a legacy SPA to the App Router with zero downtime and a 35% smaller bundle",
      "Championed accessibility: every project shipped WCAG AA, keyboard-first",
    ],
  },
  {
    company: "The first commit",
    role: "Self-taught, relentlessly",
    period: "2022 — 2023",
    summary: "Learned in public, shipped small things daily.",
    highlights: [
      "Built and broke dozens of side projects until the fundamentals stuck",
      "Fell in love with the browser — layout, paint, the 16ms frame",
    ],
  },
];

export const projects: Project[] = [
  {
    name: "Galaincha",
    tagline: "Heritage craft, modern web",
    description:
      "Bilingual e-commerce experience for hand-knotted Nepali carpets. Payload CMS for the workshop's editors, next-intl for English/Nepali, and a gallery that makes wool feel tactile through a screen.",
    tech: ["Next.js", "Payload CMS", "next-intl", "Tailwind"],
    href: "#", // TODO: live URL
  },
  {
    name: "Pulse",
    tagline: "Realtime, without the jank",
    description:
      "Operations dashboard streaming thousands of events a minute. Virtualized tables, 60fps charts, and optimistic UI that keeps operators in flow during incidents.",
    tech: ["React 19", "WebSockets", "TypeScript", "Motion"],
    href: "#", // TODO: live URL
  },
  {
    name: "Prism UI",
    tagline: "A design system that says no",
    description:
      "Opinionated component library: 40+ accessible components, design tokens, and docs. Strict by design — fewer props, fewer footguns, faster teams.",
    tech: ["React", "Tailwind", "Radix", "Storybook"],
    href: "#", // TODO: live URL
  },
  {
    name: "This site",
    tagline: "You're looking at it",
    description:
      "Glassmorphic scroll story built with the App Router, Motion for orchestration, and Lenis for the glide. View the source — the craft is the pitch.",
    tech: ["Next.js 16", "Motion", "Lenis", "Tailwind v4"],
    href: "#", // TODO: repo URL
  },
];

export const skillGroups: SkillGroup[] = [
  {
    label: "Core",
    items: ["TypeScript", "React 19", "Next.js 16", "Tailwind CSS"],
  },
  {
    label: "Motion & craft",
    items: ["Motion", "GSAP", "View Transitions", "Accessibility"],
  },
  {
    label: "Platform",
    items: ["Payload CMS", "next-intl", "Vercel", "CI/CD"],
  },
  {
    label: "Practice",
    items: ["Design systems", "Performance budgets", "Code review", "Mentoring"],
  },
];

export const marqueeItems = [
  "React 19",
  "Next.js 16",
  "TypeScript",
  "Tailwind",
  "Motion",
  "Accessibility",
  "Performance",
  "Design systems",
];
