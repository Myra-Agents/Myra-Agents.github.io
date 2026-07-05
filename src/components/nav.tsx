"use client";

import { Moon, Sun } from "lucide-react";
import { useLang, useTheme } from "./providers";

const COPY = {
  en: {
    links: [
      { href: "#demos", label: "Product" },
      { href: "#how", label: "How it works" },
      { href: "#roadmap", label: "Roadmap" },
      { href: "#install", label: "Install" },
      { href: "https://github.com/Myra-Agents/Myra-Agents", label: "GitHub" },
    ],
    download: "Download",
    theme: "Toggle theme",
    language: "Switch to French",
  },
  fr: {
    links: [
      { href: "#demos", label: "Produit" },
      { href: "#how", label: "Fonctionnement" },
      { href: "#roadmap", label: "Feuille de route" },
      { href: "#install", label: "Installer" },
      { href: "https://github.com/Myra-Agents/Myra-Agents", label: "GitHub" },
    ],
    download: "Télécharger",
    theme: "Changer de thème",
    language: "Passer en anglais",
  },
} as const;

export function Nav() {
  const { lang, toggle: toggleLang } = useLang();
  const { theme, toggle: toggleTheme } = useTheme();
  const t = COPY[lang];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#top" className="flex items-center gap-2.5">
          {/* Black glyph on light, white on dark — CSS swap (no flash). */}
          {/* biome-ignore lint/performance/noImgElement: tiny static logo, avoids next/image dark-swap quirks */}
          <img
            src="/assets/glyph-black.png"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 rounded-md dark:hidden"
          />
          {/* biome-ignore lint/performance/noImgElement: tiny static logo */}
          <img
            src="/assets/glyph-white.png"
            alt=""
            width={28}
            height={28}
            className="hidden h-7 w-7 rounded-md dark:block"
          />
          <span className="font-serif text-lg tracking-tight">
            Myra Agents
          </span>
        </a>

        <div className="hidden items-center gap-6 text-sm font-medium text-ink-55 md:flex">
          {t.links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-ink">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <button
            type="button"
            onClick={toggleLang}
            aria-label={t.language}
            className="flex h-8 items-center rounded-full border border-line px-1 text-[11px] font-bold"
          >
            <span
              className={`rounded-full px-1.5 py-0.5 ${lang === "en" ? "bg-ink text-paper" : "text-ink-40"}`}
            >
              EN
            </span>
            <span
              className={`rounded-full px-1.5 py-0.5 ${lang === "fr" ? "bg-ink text-paper" : "text-ink-40"}`}
            >
              FR
            </span>
          </button>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={t.theme}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink-70 transition hover:text-ink"
          >
            {theme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </button>

          <a
            href="#install"
            className="flex h-8 items-center rounded-full bg-ink px-4 text-sm font-bold text-paper transition hover:opacity-85"
          >
            {t.download}
          </a>
        </div>
      </nav>
    </header>
  );
}
