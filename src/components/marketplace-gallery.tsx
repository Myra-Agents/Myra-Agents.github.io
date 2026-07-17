"use client";

import { ArrowUpRight, Download } from "lucide-react";
import { useT } from "@/components/providers";
import type { MarketplaceCard } from "@/lib/marketplace";

/**
 * Skill marketplace gallery. Skills come from the `Myra-Agents/marketplace`
 * repo's `catalog.json` (fetched at build time — see `@/lib/marketplace`), so
 * this component holds no catalog data of its own. Each card deep-links into the
 * desktop app with `myra://skill/install?id=<id>` — the app routes that to the
 * Skills page (`/skills?install=<id>`) and installs the matching catalog entry.
 * Card text (name/description/category) is English, straight from the catalog;
 * only the surrounding chrome labels are translated.
 */

const DEEP_LINK = (id: string) => `myra://skill/install?id=${id}`;

/** Tag palette — verbatim from the app's kanban tags (hash-colored). */
const TAG_PALETTE = [
  "border-orange-500/25 bg-orange-500/10 text-orange-700 dark:text-orange-300",
  "border-blue-500/25 bg-blue-500/10 text-blue-700 dark:text-blue-300",
  "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  "border-purple-500/25 bg-purple-500/10 text-purple-700 dark:text-purple-300",
  "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  "border-rose-500/25 bg-rose-500/10 text-rose-700 dark:text-rose-300",
  "border-cyan-500/25 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300",
  "border-lime-500/25 bg-lime-500/10 text-lime-700 dark:text-lime-300",
] as const;

function tagHashIndex(tag: string): number {
  let hash = 2166136261;
  for (const char of tag) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash) % TAG_PALETTE.length;
}

const COPY = {
  en: { open: "Open in Myra", noApp: "Don't have the app?", download: "Download", by: "by" },
  fr: {
    open: "Ouvrir dans Myra",
    noApp: "Vous n'avez pas l'application ?",
    download: "Télécharger",
    by: "par",
  },
};

export function MarketplaceGallery({ skills }: { skills: MarketplaceCard[] }) {
  const t = useT(COPY);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {skills.map((skill) => (
        <div
          key={skill.id}
          className="flex flex-col rounded-[10px] border border-line bg-paper-2 p-6 transition hover:border-line-strong"
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl leading-none" aria-hidden>
              {skill.icon}
            </span>
            <div className="min-w-0">
              <h3 className="text-lg font-bold tracking-tight">{skill.name}</h3>
              <p className="text-xs font-medium text-ink-40">
                {t.by} {skill.author}
              </p>
            </div>
          </div>

          <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-55">
            {skill.description}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            <span className="inline-flex h-5 items-center rounded-full border border-line bg-paper px-2 text-[10px] font-bold uppercase tracking-wide text-ink-55">
              {skill.category}
            </span>
            {skill.tags.map((tag) => (
              <span
                key={tag}
                className={`inline-flex h-5 items-center rounded-full border px-2 text-[10px] font-medium ${TAG_PALETTE[tagHashIndex(tag)]}`}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <a
              href={DEEP_LINK(skill.id)}
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-ink px-4 text-sm font-bold text-paper transition hover:opacity-85"
            >
              {t.open}
              <ArrowUpRight className="size-4" />
            </a>
            <span className="text-right text-[11px] leading-tight text-ink-40">
              {t.noApp}{" "}
              <a
                href="/#install"
                className="inline-flex items-center gap-0.5 font-semibold text-accent transition hover:opacity-80"
              >
                {t.download}
                <Download className="size-3" />
              </a>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
