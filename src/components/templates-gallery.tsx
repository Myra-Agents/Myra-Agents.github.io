"use client";

import { ArrowUpRight, Download } from "lucide-react";
import { useT } from "@/components/providers";

/**
 * Patrol template gallery. Each card deep-links into the desktop app with
 * `myra://patrol/new?template=<id>` — the app's deep-link handler (see the
 * app repo's `src-tauri/src/lib.rs`) routes that to the prefilled patrol editor
 * (`/schedules/edit/?template=<id>`). The ids MUST match live entries in the
 * app's `src/lib/schedule-ideas.ts` (`SCHEDULE_IDEAS`); an unknown id opens a
 * blank editor instead of the template, so only list templates shipped there.
 */

const DEEP_LINK = (id: string) => `myra://patrol/new?template=${id}`;

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
 * Language-independent template descriptors. `id` is the deep-link key (matches
 * the app's `SCHEDULE_IDEAS`); copy (name / description / cadence) lives in the
 * COPY dictionary below, keyed by the same id. Add a template by shipping it in
 * the app first, then adding an entry here plus its copy in both languages.
 */
const TEMPLATES = [
  { id: "sortMyComputer", tags: ["files", "organization"] },
  { id: "dailyBrief", tags: ["brief", "github"] },
  { id: "standupPrep", tags: ["standup", "slack"] },
  { id: "weeklyReview", tags: ["review", "board"] },
] as const;

type TemplateId = (typeof TEMPLATES)[number]["id"];
type CardCopy = { name: string; description: string; cadence: string };

const COPY: {
  en: {
    open: string;
    noApp: string;
    download: string;
    cards: Record<TemplateId, CardCopy>;
  };
  fr: {
    open: string;
    noApp: string;
    download: string;
    cards: Record<TemplateId, CardCopy>;
  };
} = {
  en: {
    open: "Open in Myra",
    noApp: "Don't have the app?",
    download: "Download",
    cards: {
      sortMyComputer: {
        name: "Sort out my computer",
        description:
          "Let the agent tidy a folder — group files by type, rename with a consistent scheme, and clear out duplicates and junk.",
        cadence: "Weekly · Monday 09:00",
      },
      dailyBrief: {
        name: "Daily brief",
        description:
          "A morning summary of overnight repo activity and the board: new commits, open PRs, failing checks, and cards waiting on you.",
        cadence: "Daily · 09:00",
      },
      standupPrep: {
        name: "Scrum daily prep",
        description:
          "Standup talking points ready before the meeting — what you shipped yesterday, what's next, and where you're blocked.",
        cadence: "Weekdays · 08:45",
      },
      weeklyReview: {
        name: "Weekly review",
        description:
          "An end-of-week board review: stale cards flagged, anything stuck in review surfaced, and next steps proposed for each.",
        cadence: "Weekly · Monday 09:00",
      },
    },
  },
  fr: {
    open: "Ouvrir dans Myra",
    noApp: "Vous n'avez pas l'application ?",
    download: "Télécharger",
    cards: {
      sortMyComputer: {
        name: "Ranger mon ordinateur",
        description:
          "Laissez l'agent ranger un dossier — regrouper les fichiers par type, les renommer proprement et supprimer doublons et fichiers inutiles.",
        cadence: "Hebdo · lundi 09:00",
      },
      dailyBrief: {
        name: "Brief quotidien",
        description:
          "Un résumé matinal de l'activité du dépôt et du tableau : nouveaux commits, PR ouvertes, checks en échec et cartes en attente.",
        cadence: "Chaque jour · 09:00",
      },
      standupPrep: {
        name: "Prépa du daily scrum",
        description:
          "Vos points de daily prêts avant la réunion — ce que vous avez livré hier, ce qui suit, et là où vous êtes bloqué.",
        cadence: "En semaine · 08:45",
      },
      weeklyReview: {
        name: "Revue hebdomadaire",
        description:
          "Une revue du tableau en fin de semaine : cartes inactives signalées, blocages en revue mis en avant, prochaines étapes proposées.",
        cadence: "Hebdo · lundi 09:00",
      },
    },
  },
};

export function TemplatesGallery() {
  const t = useT(COPY);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {TEMPLATES.map((tpl) => {
        const copy = t.cards[tpl.id];
        return (
          <div
            key={tpl.id}
            className="flex flex-col rounded-[10px] border border-line bg-paper-2 p-6 transition hover:border-line-strong"
          >
            <div className="flex flex-wrap items-center gap-1.5">
              {tpl.tags.map((tag) => (
                <span
                  key={tag}
                  className={`inline-flex h-5 items-center rounded-full border px-2 text-[10px] font-medium ${TAG_PALETTE[tagHashIndex(tag)]}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 className="mt-4 text-lg font-bold tracking-tight">
              {copy.name}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-55">
              {copy.description}
            </p>

            <p className="mt-4 text-xs font-medium text-ink-40">
              {copy.cadence}
            </p>

            <div className="mt-5 flex items-center justify-between gap-3">
              <a
                href={DEEP_LINK(tpl.id)}
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
