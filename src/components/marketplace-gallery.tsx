"use client";

import { ArrowUpRight, Download } from "lucide-react";
import { useT } from "@/components/providers";

/**
 * Skill marketplace gallery. Each card deep-links into the desktop app with
 * `myra://skill/install?id=<id>` — the app's deep-link handler (see the app
 * repo's `src-tauri/src/lib.rs`) routes that to the Skills page
 * (`/skills?install=<id>`), which installs the matching catalog entry into the
 * user's local library. The ids MUST match live entries in the app's
 * `src/types/skill.ts` (`SKILL_MARKETPLACE`); an unknown id installs nothing, so
 * only list skills shipped there. Keep this catalog in sync with that source.
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

/**
 * Language-independent skill descriptors. `id` is the deep-link key (matches the
 * app's `SKILL_MARKETPLACE`); `icon`/`tags`/`author` are shared across languages,
 * while name + description live in the COPY dictionary keyed by the same id. Add
 * a skill by shipping it in the app first, then adding an entry here plus its
 * copy in both languages.
 */
const SKILLS = [
  { id: "mk-conventional-commits", icon: "📝", author: "Myra", tags: ["git", "commits"] },
  { id: "mk-test-first", icon: "🧪", author: "Myra", tags: ["testing", "quality"] },
  { id: "mk-self-review", icon: "🔍", author: "Myra", tags: ["review", "quality"] },
  { id: "mk-security-audit", icon: "🛡️", author: "Myra", tags: ["security"] },
  { id: "mk-docs-sync", icon: "📚", author: "Myra", tags: ["docs"] },
  { id: "mk-minimal-diff", icon: "✂️", author: "Myra", tags: ["refactor", "quality"] },
] as const;

type SkillId = (typeof SKILLS)[number]["id"];
type CardCopy = { name: string; description: string; category: string };

const COPY: {
  en: {
    open: string;
    noApp: string;
    download: string;
    by: string;
    cards: Record<SkillId, CardCopy>;
  };
  fr: {
    open: string;
    noApp: string;
    download: string;
    by: string;
    cards: Record<SkillId, CardCopy>;
  };
} = {
  en: {
    open: "Open in Myra",
    noApp: "Don't have the app?",
    download: "Download",
    by: "by Myra",
    cards: {
      "mk-conventional-commits": {
        name: "Conventional Commits",
        description: "Write commits that follow the Conventional Commits spec — typed headers, imperative subjects, one change per commit.",
        category: "Git",
      },
      "mk-test-first": {
        name: "Test-Driven Changes",
        description: "Add a failing test before implementing, run the full suite, and cover the edge cases — never claim done on an unrun suite.",
        category: "Testing",
      },
      "mk-self-review": {
        name: "Self Code Review",
        description: "Re-read every changed hunk for off-by-ones, unhandled nulls and stray debug code before declaring the task complete.",
        category: "Review",
      },
      "mk-security-audit": {
        name: "Security Hardening",
        description: "Apply defensive-security judgement: no hard-coded secrets, validated input, parameterised queries, least-privilege defaults.",
        category: "Security",
      },
      "mk-docs-sync": {
        name: "Keep Docs in Sync",
        description: "When behaviour changes, update the README, doc comments and examples so they still run against the new API.",
        category: "Docs",
      },
      "mk-minimal-diff": {
        name: "Minimal Diff",
        description: "Make the smallest correct change — touch only what the task needs, match existing patterns, avoid gratuitous refactors.",
        category: "Refactor",
      },
    },
  },
  fr: {
    open: "Ouvrir dans Myra",
    noApp: "Vous n'avez pas l'application ?",
    download: "Télécharger",
    by: "par Myra",
    cards: {
      "mk-conventional-commits": {
        name: "Commits conventionnels",
        description: "Rédigez des commits conformes à la spec Conventional Commits — en-têtes typés, sujets à l'impératif, un changement par commit.",
        category: "Git",
      },
      "mk-test-first": {
        name: "Changements pilotés par les tests",
        description: "Ajoutez un test qui échoue avant d'implémenter, lancez toute la suite et couvrez les cas limites — jamais « terminé » sur une suite non exécutée.",
        category: "Tests",
      },
      "mk-self-review": {
        name: "Auto-revue de code",
        description: "Relisez chaque section modifiée — erreurs de bornes, nuls non gérés, code de debug oublié — avant de déclarer la tâche terminée.",
        category: "Revue",
      },
      "mk-security-audit": {
        name: "Durcissement sécurité",
        description: "Appliquez un réflexe de sécurité défensive : aucun secret en dur, entrées validées, requêtes paramétrées, moindre privilège par défaut.",
        category: "Sécurité",
      },
      "mk-docs-sync": {
        name: "Documentation à jour",
        description: "Quand le comportement change, mettez à jour le README, les commentaires et les exemples pour qu'ils tournent encore avec la nouvelle API.",
        category: "Docs",
      },
      "mk-minimal-diff": {
        name: "Diff minimal",
        description: "Faites le plus petit changement correct — ne touchez que le nécessaire, suivez les motifs existants, évitez les refactors gratuits.",
        category: "Refactor",
      },
    },
  },
};

export function MarketplaceGallery() {
  const t = useT(COPY);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {SKILLS.map((skill) => {
        const copy = t.cards[skill.id];
        return (
          <div
            key={skill.id}
            className="flex flex-col rounded-[10px] border border-line bg-paper-2 p-6 transition hover:border-line-strong"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl leading-none" aria-hidden>
                {skill.icon}
              </span>
              <div className="min-w-0">
                <h3 className="text-lg font-bold tracking-tight">{copy.name}</h3>
                <p className="text-xs font-medium text-ink-40">{t.by}</p>
              </div>
            </div>

            <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-55">
              {copy.description}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-1.5">
              <span className="inline-flex h-5 items-center rounded-full border border-line bg-paper px-2 text-[10px] font-bold uppercase tracking-wide text-ink-55">
                {copy.category}
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
        );
      })}
    </div>
  );
}
