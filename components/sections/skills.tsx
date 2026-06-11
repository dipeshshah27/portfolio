import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { skillGroups } from "@/content/site";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="04" kicker="The toolkit" title="Sharp tools, held lightly." />

        <div className="mt-16 border-t border-foreground/10">
          {skillGroups.map((group, index) => (
            <Reveal key={group.label} delay={index * 0.08}>
              <div
                data-cursor
                className="group grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-3 border-b border-foreground/10 py-8 transition-all duration-300 hover:bg-foreground/4 hover:pl-4 md:grid-cols-[6rem_1fr_2fr] md:py-10"
              >
                <span className="font-mono text-xs tracking-[0.25em] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-3xl font-medium transition-transform duration-300 group-hover:translate-x-2 md:text-5xl">
                  {group.label}
                </h3>
                <p className="col-span-2 text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-foreground md:col-span-1 md:text-right md:text-base">
                  {group.items.join("  ·  ")}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
