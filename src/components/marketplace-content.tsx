"use client";

import { ArrowLeft, Download, MousePointerClick, Sparkles } from "lucide-react";
import { MarketplaceGallery } from "@/components/marketplace-gallery";
import { Nav } from "@/components/nav";
import { useT } from "@/components/providers";
import type { MarketplaceCard } from "@/lib/marketplace";

const COPY = {
  en: {
    back: "Back home",
    eyebrow: "Skill marketplace",
    headline: "Give your agents skills.",
    lead: "Skills are reusable blocks of agent instructions — conventional commits, test-first, self-review — that you attach to any patrol. Browse the catalog and install one straight into the desktop app in a click.",
    steps: [
      {
        title: "Pick a skill",
        body: "Choose a curated skill below that matches how you want your agents to work.",
      },
      {
        title: "Open in Myra",
        body: "The desktop app launches and installs it into your local skills library.",
      },
      {
        title: "Attach to a patrol",
        body: "Add the skill to any patrol — its guidance rides along on every agent run.",
      },
    ],
  },
  fr: {
    back: "Retour à l'accueil",
    eyebrow: "Marketplace de compétences",
    headline: "Donnez des compétences à vos agents.",
    lead: "Les compétences sont des blocs d'instructions réutilisables — commits conventionnels, tests d'abord, auto-revue — que vous attachez à n'importe quelle patrouille. Parcourez le catalogue et installez-en une directement dans l'application en un clic.",
    steps: [
      {
        title: "Choisissez une compétence",
        body: "Sélectionnez ci-dessous une compétence qui correspond à la façon dont vous voulez faire travailler vos agents.",
      },
      {
        title: "Ouvrez dans Myra",
        body: "L'application s'ouvre et l'installe dans votre bibliothèque de compétences locale.",
      },
      {
        title: "Attachez à une patrouille",
        body: "Ajoutez la compétence à une patrouille — ses consignes suivent chaque exécution d'agent.",
      },
    ],
  },
};

const STEP_ICONS = [MousePointerClick, Download, Sparkles] as const;

export function MarketplaceContent({ skills }: { skills: MarketplaceCard[] }) {
  const t = useT(COPY);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Nav />
      <main className="mx-auto max-w-6xl px-5 py-14 md:py-20">
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-ink-55 transition hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" /> {t.back}
        </a>

        <header className="mt-6 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-wide text-accent">
            {t.eyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            {t.headline}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-55">{t.lead}</p>
        </header>

        {/* How it works — three compact steps */}
        <ol className="mt-8 grid gap-3 sm:grid-cols-3">
          {t.steps.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <li
                key={step.title}
                className="flex flex-col gap-2 rounded-[10px] border border-line bg-paper-2 p-4"
              >
                <div className="flex items-center gap-2 text-ink">
                  <Icon className="size-4 text-accent" />
                  <span className="text-sm font-bold">{step.title}</span>
                </div>
                <p className="text-xs leading-relaxed text-ink-55">
                  {step.body}
                </p>
              </li>
            );
          })}
        </ol>

        <div className="mt-10">
          <MarketplaceGallery skills={skills} />
        </div>
      </main>
    </div>
  );
}
