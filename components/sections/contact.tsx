import { GlassCard } from "@/components/glass-card";
import { Magnetic } from "@/components/magnetic";
import { Reveal } from "@/components/reveal";
import { TextReveal } from "@/components/text-reveal";
import { links } from "@/content/site";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 px-6 py-28 md:py-40">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <GlassCard className="relative overflow-hidden p-10 text-center md:p-16">
            <div aria-hidden className="orb orb-amber absolute -top-24 -right-24 size-72" />
            <div aria-hidden className="orb orb-teal absolute -bottom-28 -left-24 size-72" />

            <p className="relative flex items-center justify-center gap-3 font-mono text-xs tracking-[0.3em] text-accent uppercase">
              <span className="h-px w-10 bg-accent" />
              05 — Contact
              <span className="h-px w-10 bg-accent" />
            </p>
            <h2 className="relative mt-6 font-display text-4xl leading-[1.05] font-medium text-balance md:text-6xl">
              <TextReveal text="Let's build something" />{" "}
              <em className="italic">
                <TextReveal text="people remember." wordClassName="text-gradient" delay={0.25} />
              </em>
            </h2>
            <p className="relative mx-auto mt-6 max-w-xl leading-relaxed text-muted md:text-lg">
              Hiring for a senior frontend role, or building something ambitious? My inbox is
              open — I reply fast.
            </p>

            <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4">
              <Magnetic>
                <a
                  href={`mailto:${links.email}`}
                  data-cursor
                  className="inline-flex rounded-full bg-foreground px-8 py-4 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
                >
                  {links.email}
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={links.phoneHref}
                  data-cursor
                  className="glass inline-flex rounded-full px-8 py-4 text-sm font-semibold transition-transform hover:scale-[1.03]"
                >
                  {links.phone}
                </a>
              </Magnetic>
            </div>

            <div className="relative mt-8 flex items-center justify-center gap-6 font-mono text-xs tracking-[0.2em] uppercase">
              <a
                href={links.github}
                target="_blank"
                rel="noreferrer"
                className="link-sweep text-muted transition-colors hover:text-foreground"
              >
                GitHub
              </a>
              <span aria-hidden className="text-accent">
                ✦
              </span>
              <a
                href={links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="link-sweep text-muted transition-colors hover:text-foreground"
              >
                LinkedIn
              </a>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
