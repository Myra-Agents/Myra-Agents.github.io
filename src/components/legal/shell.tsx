"use client";

import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/nav";
import { useT } from "@/components/providers";

const COPY = {
  en: { back: "Back home" },
  fr: { back: "Retour à l'accueil" },
} as const;

/**
 * Shared page shell for the legal pages — reuses <Nav/>, applies the same
 * paper/ink page background as the home page, and renders a readable prose
 * column with a "back home" link.
 */
export function LegalShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  const t = useT(COPY);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Nav />
      <main className="mx-auto max-w-3xl px-5 py-14 md:py-20">
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-ink-55 transition hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" /> {t.back}
        </a>
        <h1 className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">
          {title}
        </h1>
        {updated ? (
          <p className="mt-2 text-sm text-ink-40">{updated}</p>
        ) : null}
        <article className="prose-legal mt-10 flex flex-col gap-8">
          {children}
        </article>
      </main>
    </div>
  );
}

/** A titled section block with heading + body content. */
export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-serif text-xl tracking-tight text-ink md:text-2xl">
        {heading}
      </h2>
      <div className="flex flex-col gap-3 text-[0.95rem] leading-relaxed text-ink-70">
        {children}
      </div>
    </section>
  );
}
