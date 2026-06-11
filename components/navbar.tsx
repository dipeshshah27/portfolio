import { ThemeToggle } from "@/components/theme-toggle";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-4 z-40 flex justify-center px-4">
      <nav className="glass flex items-center gap-1 rounded-full py-1.5 pr-1.5 pl-5">
        <a href="#top" className="mr-3 font-display text-lg font-semibold italic">
          ds<span className="text-accent">.</span>
        </a>
        <ul className="hidden items-center gap-1 sm:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:bg-foreground/8 hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  );
}
