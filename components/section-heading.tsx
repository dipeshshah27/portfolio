import { TextReveal } from "@/components/text-reveal";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  index: string;
  kicker: string;
  title: string;
  className?: string;
};

export function SectionHeading({ index, kicker, title, className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-4xl", className)}>
      <p className="flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-accent uppercase">
        <span className="h-px w-10 bg-accent" />
        {index} — {kicker}
      </p>
      <h2 className="mt-5 font-display text-4xl leading-[1.05] font-medium text-balance md:text-6xl">
        <TextReveal text={title} />
      </h2>
    </div>
  );
}
