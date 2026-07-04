import Image from "next/image";

const LINKS = [
  { href: "#demos", label: "Product" },
  { href: "#how", label: "How it works" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#install", label: "Install" },
  { href: "https://github.com/Myra-Agents/Myra-Agents", label: "GitHub" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#top" className="flex items-center gap-2.5">
          <Image
            src="/assets/logo-light.png"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 rounded-md"
          />
          <span className="font-serif text-lg tracking-tight">
            Myra Agents
          </span>
        </a>
        <div className="hidden items-center gap-6 text-sm font-medium text-ink-55 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-ink">
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#install"
          className="rounded-full bg-ink px-4 py-1.5 text-sm font-bold text-paper transition hover:opacity-85"
        >
          Download
        </a>
      </nav>
    </header>
  );
}
