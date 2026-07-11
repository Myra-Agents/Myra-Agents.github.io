"use client";

import { ArrowLeft, MousePointerClick, PencilLine, Rocket } from "lucide-react";
import { Nav } from "@/components/nav";
import { useT } from "@/components/providers";
import { TemplatesGallery } from "@/components/templates-gallery";

const COPY = {
  en: {
    back: "Back home",
    eyebrow: "Patrol templates",
    headline: "Start from a template.",
    lead: "Pick a ready-made patrol and open it straight in the app — the editor lands prefilled with its prompt, schedule and tags. Tweak what you like, then hit Add.",
    steps: [
      {
        title: "Pick a template",
        body: "Choose a patrol below that matches what you want automated.",
      },
      {
        title: "Open in Myra",
        body: "The desktop app launches to the patrol editor, prefilled and ready.",
      },
      {
        title: "Tweak & add",
        body: "Adjust the prompt, agent or schedule — then add it to your patrols.",
      },
    ],
  },
  fr: {
    back: "Retour à l'accueil",
    eyebrow: "Modèles de patrouilles",
    headline: "Partez d'un modèle.",
    lead: "Choisissez une patrouille prête à l'emploi et ouvrez-la directement dans l'application — l'éditeur s'ouvre pré-rempli avec son prompt, sa planification et ses tags. Ajustez, puis cliquez sur Ajouter.",
    steps: [
      {
        title: "Choisissez un modèle",
        body: "Sélectionnez ci-dessous une patrouille qui correspond à ce que vous voulez automatiser.",
      },
      {
        title: "Ouvrez dans Myra",
        body: "L'application s'ouvre sur l'éditeur de patrouille, pré-rempli et prêt.",
      },
      {
        title: "Ajustez & ajoutez",
        body: "Modifiez le prompt, l'agent ou la planification — puis ajoutez-la à vos patrouilles.",
      },
    ],
  },
};

const STEP_ICONS = [MousePointerClick, Rocket, PencilLine] as const;

export function TemplatesContent() {
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
          <TemplatesGallery />
        </div>
      </main>
    </div>
  );
}
