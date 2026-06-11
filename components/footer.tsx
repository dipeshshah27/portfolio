import { links } from "@/content/site";

export function Footer() {
  return (
    <footer className="px-6 pt-8 pb-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-muted sm:flex-row">
        <p className="font-mono text-xs tracking-widest uppercase">
          Designed &amp; built by Dipesh Shah · {new Date().getFullYear()}
        </p>
        <a href={`mailto:${links.email}`} className="transition-colors hover:text-foreground">
          {links.email}
        </a>
      </div>
    </footer>
  );
}
