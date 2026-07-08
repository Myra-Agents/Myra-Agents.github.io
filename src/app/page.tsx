"use client";

import Image from "next/image";
import {
  Activity,
  ArrowDownToLine,
  ArrowRight,
  Laptop,
  Layers,
  type LucideIcon,
  Repeat,
  Store,
  Terminal,
} from "lucide-react";
import { AgentPickerDemo } from "@/components/agent-picker-demo";
import { Install } from "@/components/install";
import { KanbanDemo } from "@/components/kanban-demo";
import { LogsDemo } from "@/components/logs-demo";
import { Nav } from "@/components/nav";
import { PatrolDemo } from "@/components/patrol-demo";
import { useT } from "@/components/providers";
import { WindowFrame } from "@/components/window-frame";

/* ---------- copy dictionary ---------- */

const COPY = {
  en: {
    hero: {
      eyebrow: "Free yourself from repetitive work",
      headline1: "Your AI workforce,",
      headline2: "running 24/7.",
      subheadPre: "Delegate the repetitive work. Set up your agents once — they run on their own, on schedule, even ",
      subheadBold: "while you sleep",
      subheadPost: ".",
      download: "Download the app",
      star: "Star on GitHub",
      badge: "macOS · Windows · Linux — open source, local-first",
      demoCaption:
        "Live demo — launch the operation, answer its question, or just watch it work.",
    },
    demos: {
      patrol: {
        title: "They patrol while you sleep.",
        lead: "Deploy patrols that fire once, daily, weekly, or by cron. Each carries a prompt, an agent and a working directory — no babysitting required.",
        link: "See what a patrol looks like",
      },
      logs: {
        title: "Watch every run live.",
        lead: "Output streams onto the operation as it happens — and History keeps every run with its result, duration, tokens and cost.",
        link: "Explore the app",
      },
      agent: {
        title: "Bring your own agent.",
        lead: "OpenCode works out of the box — detected and installed in one click. Ollama runs local models. Any other CLI agent plugs in through a custom preset.",
        link: "Read the docs on presets",
      },
    },
    features: {
      heading: "Put a whole team of agents to work",
      lead: "Set them up once. They run on their own — in parallel, on schedule, reporting back as they go.",
      note: "Also: English + French UI.",
      cards: [
        {
          title: "Runs on your machine",
          body: "A real desktop app, local-first. Your operations, agents and data live on your own Mac, Windows or Linux box — nothing to host.",
        },
        {
          title: "Bring your own agent",
          body: "OpenCode built in and installed for you, Ollama for local models, or any CLI agent via a custom preset. No lock-in.",
        },
        {
          title: "Around the clock",
          body: "Runs once, hourly, daily or on any cron. Lives in the system tray and keeps firing on schedule, day and night.",
        },
        {
          title: "Independent & parallel",
          body: "Each agent runs on its own, in its own process. Launch many at once — set a concurrency limit or let them all run.",
        },
        {
          title: "Watch every run live",
          body: "Output streams onto the operation as it happens. History keeps every past run with its result, duration, token and cost stats.",
        },
        {
          title: "Templates & marketplace",
          body: "Start from a ready-made template and launch the operation in a click — a marketplace of prebuilt ones that keeps growing.",
        },
      ],
    },
    useCases: {
      heading: "The repetitive work you'll hand off",
      lead: "Recurring chores you'd rather not do by hand — set once, then they just run.",
      cards: [
        {
          when: "Every weekday · 8am",
          title: "Daily change digest",
          body: "Summarize the last 24h — merged PRs, fixes, risky changes — and post it to Slack before standup.",
        },
        {
          when: "Every night",
          title: "Dependency & vuln sweep",
          body: "Scan for outdated or vulnerable packages, bump them, run the tests, and open a PR — while you sleep.",
        },
        {
          when: "Around the clock",
          title: "Production error triage",
          body: "Cluster new Sentry errors, find the root cause, and land a safe fix or post the analysis.",
        },
      ],
    },
    screens: {
      heading: "This is the real app",
      lead: "A native desktop app — Tauri, not a browser tab. Dark and light, English and French.",
      shots: [
        {
          alt: "Operations view with Backlog, Running, Needs you and Done counters",
          caption: "Operations — every run, List or Kanban.",
        },
        {
          alt: "Patrols view with recurring and cron-triggered agent runs",
          caption: "Patrols — recurring runs on your schedule.",
        },
        {
          alt: "History view with success rate, runs-over-time chart and per-run stats",
          caption: "History — every past run, measured.",
        },
      ],
    },
    roadmap: {
      badge: "Coming soon",
      heading: "What's coming next",
      lead: "Everything below is planned or in exploration — opt-in, and never at the cost of local-first.",
      tagPlanned: "Planned",
      tagExploring: "Exploring",
      cards: [
        {
          title: "Remote access",
          body: "Check operations and kick off runs from your phone, while agents keep running back home.",
        },
        {
          title: "Managed cloud sync",
          body: "An optional hosted relay keeps devices in sync without self-hosting. Opt-in only.",
        },
        {
          title: "Integrations & webhooks",
          body: "Fire Slack messages and webhooks as operations reach Needs you or Done.",
        },
        {
          title: "Day Planner",
          body: "Describe your goals in plain language; Myra turns them into scheduled operations.",
        },
        {
          title: "Plugin manager",
          body: "Browse and enable runtime plugins from Settings — the open agent ecosystem, one click away.",
        },
        {
          title: "Shared workspaces",
          body: "Bring your team in, assign operations, see who's running what.",
        },
      ],
      ctaPre: "Want to shape what ships next? ",
      ctaLink: "Open an issue on GitHub",
    },
    footer: {
      org: "GitHub org",
      repo: "App repo",
      privacy: "Privacy",
      legal: "Legal notice",
      terms: "Terms",
      license: "MIT · © 2026 Leaptech",
      taglineName: "Myra",
      taglineMeaning: "ant",
      taglinePre: "is Swedish for",
      taglineMid:
        "— one agent is a single worker; your setup is the colony, many running in parallel, quietly doing the work you'd rather not. Our mission: ",
      mission: "Free yourself from repetitive work.",
    },
  },
  fr: {
    hero: {
      eyebrow: "Libérez-vous du travail répétitif",
      headline1: "Votre force de travail IA,",
      headline2: "active 24h/24.",
      subheadPre: "Déléguez le travail répétitif. Configurez vos agents une seule fois — ils s'exécutent seuls, selon un planning, même ",
      subheadBold: "pendant que vous dormez",
      subheadPost: ".",
      download: "Télécharger l'application",
      star: "Star sur GitHub",
      badge: "macOS · Windows · Linux — open source, local d'abord",
      demoCaption:
        "Démo en direct — lancez l'opération, répondez à sa question, ou regardez-la simplement travailler.",
    },
    demos: {
      patrol: {
        title: "Ils patrouillent pendant que vous dormez.",
        lead: "Déployez des patrouilles qui se déclenchent une fois, chaque jour, chaque semaine, ou par cron. Chacune porte un prompt, un agent et un répertoire de travail — aucune surveillance requise.",
        link: "Voir à quoi ressemble une patrouille",
      },
      logs: {
        title: "Suivez chaque exécution en direct.",
        lead: "La sortie s'affiche sur l'opération en temps réel — et l'historique conserve chaque exécution avec son résultat, sa durée, ses tokens et son coût.",
        link: "Explorer l'application",
      },
      agent: {
        title: "Utilisez votre propre agent.",
        lead: "OpenCode fonctionne d'emblée — détecté et installé en un clic. Ollama exécute des modèles locaux. N'importe quel autre agent CLI se branche via un preset personnalisé.",
        link: "Lire la documentation sur les presets",
      },
    },
    features: {
      heading: "Mettez toute une équipe d'agents au travail",
      lead: "Configurez-les une fois. Ils s'exécutent seuls — en parallèle, selon un planning, en rendant compte au fil de l'eau.",
      note: "Aussi : interface en anglais + français.",
      cards: [
        {
          title: "S'exécute sur votre machine",
          body: "Une vraie application de bureau, local d'abord. Vos opérations, agents et données vivent sur votre propre Mac, PC Windows ou Linux — rien à héberger.",
        },
        {
          title: "Utilisez votre propre agent",
          body: "OpenCode intégré et installé pour vous, Ollama pour les modèles locaux, ou n'importe quel agent CLI via un preset personnalisé. Aucun verrouillage.",
        },
        {
          title: "Jour et nuit",
          body: "S'exécute une fois, toutes les heures, chaque jour ou selon n'importe quel cron. Reste dans la barre système et continue de se déclencher selon le planning, jour et nuit.",
        },
        {
          title: "Indépendants & parallèles",
          body: "Chaque agent s'exécute seul, dans son propre processus. Lancez-en plusieurs à la fois — fixez une limite de concurrence ou laissez-les tous tourner.",
        },
        {
          title: "Suivez chaque exécution en direct",
          body: "La sortie s'affiche sur l'opération en temps réel. L'historique conserve chaque exécution passée avec son résultat, sa durée, ses tokens et son coût.",
        },
        {
          title: "Modèles & marketplace",
          body: "Partez d'un modèle prêt à l'emploi et lancez l'opération en un clic — une marketplace de modèles préconçus qui ne cesse de s'enrichir.",
        },
      ],
    },
    useCases: {
      heading: "Le travail répétitif que vous déléguerez",
      lead: "Des corvées récurrentes que vous préféreriez ne pas faire à la main — configurées une fois, puis elles s'exécutent seules.",
      cards: [
        {
          when: "Chaque jour ouvré · 8h",
          title: "Digest quotidien des changements",
          body: "Résumez les dernières 24h — PR fusionnées, correctifs, changements risqués — et publiez-le sur Slack avant le standup.",
        },
        {
          when: "Chaque nuit",
          title: "Analyse des dépendances & vulnérabilités",
          body: "Détectez les paquets obsolètes ou vulnérables, mettez-les à jour, lancez les tests, et ouvrez une PR — pendant que vous dormez.",
        },
        {
          when: "Jour et nuit",
          title: "Triage des erreurs en production",
          body: "Regroupez les nouvelles erreurs Sentry, trouvez la cause racine, et déployez un correctif sûr ou publiez l'analyse.",
        },
      ],
    },
    screens: {
      heading: "Voici la vraie application",
      lead: "Une application de bureau native — Tauri, pas un onglet de navigateur. Sombre et claire, en anglais et en français.",
      shots: [
        {
          alt: "Vue Opérations avec les compteurs À faire, En cours, À vous et Terminé",
          caption: "Opérations — chaque exécution, en Liste ou en Tableau.",
        },
        {
          alt: "Vue Patrouilles avec des exécutions d'agents récurrentes et déclenchées par cron",
          caption: "Patrouilles — des exécutions récurrentes selon votre planning.",
        },
        {
          alt: "Vue Historique avec taux de réussite, graphique des exécutions dans le temps et statistiques par exécution",
          caption: "Historique — chaque exécution passée, mesurée.",
        },
      ],
    },
    roadmap: {
      badge: "Bientôt disponible",
      heading: "Ce qui arrive ensuite",
      lead: "Tout ce qui suit est planifié ou à l'étude — sur activation, et jamais au détriment du local d'abord.",
      tagPlanned: "Planifié",
      tagExploring: "À l'étude",
      cards: [
        {
          title: "Accès à distance",
          body: "Consultez les opérations et lancez des exécutions depuis votre téléphone, pendant que les agents continuent de tourner chez vous.",
        },
        {
          title: "Synchronisation cloud gérée",
          body: "Un relais hébergé optionnel garde vos appareils synchronisés sans auto-hébergement. Sur activation uniquement.",
        },
        {
          title: "Intégrations & webhooks",
          body: "Déclenchez des messages Slack et des webhooks lorsque les opérations passent à À vous ou Terminé.",
        },
        {
          title: "Day Planner",
          body: "Décrivez vos objectifs en langage naturel ; Myra les transforme en opérations planifiées.",
        },
        {
          title: "Gestionnaire de plugins",
          body: "Parcourez et activez des plugins d'exécution depuis les Réglages — l'écosystème d'agents ouvert, à un clic.",
        },
        {
          title: "Espaces de travail partagés",
          body: "Intégrez votre équipe, attribuez des opérations, voyez qui exécute quoi.",
        },
      ],
      ctaPre: "Envie d'influencer ce qui arrive ensuite ? ",
      ctaLink: "Ouvrir une issue sur GitHub",
    },
    footer: {
      org: "Organisation GitHub",
      repo: "Dépôt de l'app",
      privacy: "Confidentialité",
      legal: "Mentions légales",
      terms: "CGU",
      license: "MIT · © 2026 Leaptech",
      taglineName: "Myra",
      taglineMeaning: "fourmi",
      taglinePre: "signifie",
      taglineMid:
        "en suédois — un agent est un seul ouvrier ; votre installation est la colonie, plusieurs tournant en parallèle, faisant discrètement le travail que vous préféreriez éviter. Notre mission : ",
      mission: "libérez-vous du travail répétitif.",
    },
  },
};

/* ---------- small shared pieces ---------- */

function SectionShell({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-5 ${className}`}>
      {children}
    </section>
  );
}

/**
 * Fixed-size painting layer. The image is a constant 1400×900 anchored to
 * the top, NOT `fill` — so it never re-crops when the demo inside changes
 * height (which made the background visibly shift). A paper fallback fills
 * any area past the image edge.
 */
function PaintingBackdrop({ src }: { src: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden bg-paper-2">
      <Image
        src={`/assets/paintings/${src}`}
        alt=""
        width={1400}
        height={900}
        aria-hidden
        className="absolute left-1/2 top-0 h-[900px] w-[1400px] max-w-none -translate-x-1/2 object-cover"
      />
    </div>
  );
}

/**
 * Big Cursor-style feature card, split cleanly in two: a copy half on a
 * flat, uniform paper panel, and a demo half where the floating window
 * sits over the brutalist painting. No scrim — the divide is a hard edge,
 * so the text never sits on the painting.
 */
function DemoSection({
  title,
  lead,
  link,
  linkHref,
  demo,
  painting,
  flip = false,
}: {
  title: string;
  lead: string;
  link: string;
  linkHref: string;
  demo: React.ReactNode;
  /** Full filename inside /assets/paintings, e.g. "brutalist1.webp". */
  painting: string;
  flip?: boolean;
}) {
  return (
    <div className="grid overflow-hidden rounded-[10px] border border-line md:grid-cols-5">
      {/* Copy half — flat uniform panel */}
      <div
        className={`flex flex-col justify-center bg-paper-2 p-8 sm:p-10 md:col-span-2 md:p-14 ${
          flip
            ? "md:order-2 md:border-l md:border-line"
            : "md:border-r md:border-line"
        }`}
      >
        <h3 className="text-2xl leading-snug tracking-tight md:text-[1.7rem]">
          <span className="font-bold">{title}</span>{" "}
          <span className="text-ink-55">{lead}</span>
        </h3>
        <a
          href={linkHref}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-accent transition hover:opacity-80"
        >
          {link} <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      {/* Demo half — floating window over the painting */}
      <div
        className={`relative flex min-w-0 items-center p-6 sm:p-10 md:col-span-3 md:p-14 ${flip ? "md:order-1" : ""}`}
      >
        <PaintingBackdrop src={painting} />
        <div className="w-full overflow-hidden rounded-[10px] border border-black/5 dark:border-white/10 bg-paper shadow-[0_30px_70px_-25px_rgb(38_37_30_/_0.55)]">
          {demo}
        </div>
      </div>
    </div>
  );
}

/* ---------- static (language-independent) content ---------- */

const FEATURE_ICONS: LucideIcon[] = [
  Laptop,
  Terminal,
  Repeat,
  Layers,
  Activity,
  Store,
];

const USE_CASE_CRONS = [
  'cron: "0 8 * * 1-5"',
  'cron: "0 3 * * *"',
  'cron: "*/30 * * * *"',
] as const;

// A distinct tint per cron so the three stand apart at a glance.
const CRON_STYLES = [
  "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300",
  "border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-300",
  "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
];

const ROADMAP_TAGS = [
  "Planned",
  "Planned",
  "Planned",
  "Planned",
  "Exploring",
  "Exploring",
] as const;

const SCREEN_SRCS = [
  "/assets/screens/operations.png",
  "/assets/screens/patrols.png",
  "/assets/screens/history.png",
];

const DEMO_META = {
  patrol: { painting: "brutalist4.webp", linkHref: "#use-cases" },
  logs: { painting: "brutalist2.jpg", linkHref: "#screens" },
  agent: {
    painting: "brutalist3.jpeg",
    linkHref: "https://github.com/Myra-Agents/Myra-Agents#readme",
  },
} as const;

/* ---------- page ---------- */

export default function Home() {
  const t = useT(COPY);

  return (
    <div id="top">
      <Nav />

      {/* Hero */}
      <SectionShell className="pb-10 pt-16 md:pt-24">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">
            {t.hero.eyebrow}
          </p>
          <h1 className="mt-4 text-4xl leading-tight tracking-tight md:text-[3.4rem] md:leading-[1.1]">
            <span className="font-bold">{t.hero.headline1}</span>
            <br />
            <span className="text-ink-55">{t.hero.headline2}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-70">
            {t.hero.subheadPre}
            <b>{t.hero.subheadBold}</b>
            {t.hero.subheadPost}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#install"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-paper transition hover:opacity-85"
            >
              {t.hero.download}
              <ArrowDownToLine className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/Myra-Agents/Myra-Agents"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-bold text-ink-70 transition hover:bg-paper-2"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current" aria-hidden>
                <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38l-.01-1.49c-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
              </svg>
              {t.hero.star}
            </a>
            <span className="ml-1 text-xs font-medium text-ink-40">
              {t.hero.badge}
            </span>
          </div>
        </div>

        {/* Flagship interactive demo — floating over a painting */}
        <div className="rise-in mt-12" id="demos">
          <div className="relative overflow-hidden rounded-[10px] border border-line p-4 sm:p-8 md:p-14">
            <PaintingBackdrop src="brutalist1.webp" />
            <div className="shadow-[0_40px_90px_-30px_rgb(38_37_30_/_0.55)]">
              <WindowFrame title="Myra Agents — Runs">
                <KanbanDemo />
              </WindowFrame>
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-ink-40">
            {t.hero.demoCaption}
          </p>
        </div>
      </SectionShell>

      {/* Feature demo sections */}
      <SectionShell className="flex flex-col gap-14 py-14 md:py-20" id="how">
        <DemoSection
          painting={DEMO_META.patrol.painting}
          title={t.demos.patrol.title}
          lead={t.demos.patrol.lead}
          link={t.demos.patrol.link}
          linkHref={DEMO_META.patrol.linkHref}
          demo={<PatrolDemo />}
        />
        <DemoSection
          flip
          painting={DEMO_META.logs.painting}
          title={t.demos.logs.title}
          lead={t.demos.logs.lead}
          link={t.demos.logs.link}
          linkHref={DEMO_META.logs.linkHref}
          demo={<LogsDemo />}
        />
        <DemoSection
          painting={DEMO_META.agent.painting}
          title={t.demos.agent.title}
          lead={t.demos.agent.lead}
          link={t.demos.agent.link}
          linkHref={DEMO_META.agent.linkHref}
          demo={<AgentPickerDemo />}
        />
      </SectionShell>

      {/* Feature grid */}
      <SectionShell className="py-14 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {t.features.heading}
          </h2>
          <p className="mt-4 text-lg text-ink-55">{t.features.lead}</p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.features.cards.map((f, i) => {
            const Icon = FEATURE_ICONS[i];
            return (
              <div
                key={f.title}
                className="rounded-2xl border border-line bg-card p-6 transition hover:border-line-strong hover:shadow-sm"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon className="size-5" strokeWidth={1.75} />
                </div>
                <h3 className="font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-55">
                  {f.body}
                </p>
              </div>
            );
          })}
        </div>
        <p className="mt-6 text-center text-sm text-ink-40">
          {t.features.note}
        </p>
      </SectionShell>

      {/* Use cases */}
      <SectionShell id="use-cases" className="py-14 md:py-20">
        <div className="rounded-2xl bg-paper-2 p-6 md:p-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              {t.useCases.heading}
            </h2>
            <p className="mt-3 text-base text-ink-55">{t.useCases.lead}</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {t.useCases.cards.map((u, i) => (
              <div
                key={u.title}
                className="flex flex-col rounded-2xl bg-card p-6 ring-1 ring-line"
              >
                <div className="text-xs font-bold uppercase tracking-wide text-accent">
                  {u.when}
                </div>
                <div className="mt-2 text-base font-bold">{u.title}</div>
                <p className="mt-2 mb-4 text-sm leading-relaxed text-ink-55">
                  {u.body}
                </p>
                <code
                  className={`mt-auto block rounded-lg border px-3 py-2 font-mono text-xs ${CRON_STYLES[i]}`}
                >
                  {USE_CASE_CRONS[i]}
                </code>
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      {/* Real screenshots */}
      <SectionShell id="screens" className="py-14 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            {t.screens.heading}
          </h2>
          <p className="mt-3 text-base text-ink-55">{t.screens.lead}</p>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {t.screens.shots.map((s, i) => (
            <figure
              key={SCREEN_SRCS[i]}
              className="overflow-hidden rounded-2xl border border-line bg-paper-2"
            >
              <Image
                src={SCREEN_SRCS[i]}
                alt={s.alt}
                width={1400}
                height={900}
                className="w-full"
              />
              <figcaption className="px-5 py-3 text-sm text-ink-55">
                {s.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </SectionShell>

      {/* Roadmap */}
      <SectionShell id="roadmap" className="py-14 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent">
            {t.roadmap.badge}
          </span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">
            {t.roadmap.heading}
          </h2>
          <p className="mt-3 text-base text-ink-55">{t.roadmap.lead}</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.roadmap.cards.map((r, i) => (
            <div
              key={r.title}
              className="relative rounded-2xl border border-dashed border-line-strong bg-paper-2/60 p-5"
            >
              <span className="absolute right-4 top-4 rounded-full bg-paper-3 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink-40">
                {ROADMAP_TAGS[i] === "Planned"
                  ? t.roadmap.tagPlanned
                  : t.roadmap.tagExploring}
              </span>
              <h3 className="pr-16 font-bold">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-55">
                {r.body}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-ink-40">
          {t.roadmap.ctaPre}
          <a
            href="https://github.com/Myra-Agents/Myra-Agents/issues"
            className="underline hover:text-ink-70"
          >
            {t.roadmap.ctaLink}
          </a>
          .
        </p>
      </SectionShell>

      <Install />

      {/* Footer */}
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-10 text-sm text-ink-40 sm:flex-row">
          <div className="flex items-center gap-2.5">
            {/* biome-ignore lint/performance/noImgElement: tiny static logo, dark-swap */}
            <img
              src="/assets/glyph-black.png"
              alt="Myra Agents"
              width={24}
              height={24}
              className="h-6 w-6 rounded-md dark:hidden"
            />
            {/* biome-ignore lint/performance/noImgElement: tiny static logo */}
            <img
              src="/assets/glyph-white.png"
              alt="Myra Agents"
              width={24}
              height={24}
              className="hidden h-6 w-6 rounded-md dark:block"
            />
            <span className="font-serif text-base text-ink-70">
              Myra Agents
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/orgs/Myra-Agents/repositories"
              className="transition hover:text-ink-70"
            >
              {t.footer.org}
            </a>
            <a
              href="https://github.com/Myra-Agents/Myra-Agents"
              className="transition hover:text-ink-70"
            >
              {t.footer.repo}
            </a>
            <a href="/privacy" className="transition hover:text-ink-70">
              {t.footer.privacy}
            </a>
            <a href="/legal" className="transition hover:text-ink-70">
              {t.footer.legal}
            </a>
            <a href="/terms" className="transition hover:text-ink-70">
              {t.footer.terms}
            </a>
            <span>{t.footer.license}</span>
          </div>
        </div>
        <p className="mx-auto max-w-2xl px-5 pb-8 text-center text-xs text-ink-40">
          <em>{t.footer.taglineName}</em> {t.footer.taglinePre}{" "}
          <em>{t.footer.taglineMeaning}</em> {t.footer.taglineMid}
          <span className="text-ink-55">{t.footer.mission}</span>
        </p>
      </footer>
    </div>
  );
}
