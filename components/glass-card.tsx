import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div className={cn("glass rounded-3xl", className)}>{children}</div>
  );
}
