import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { AgentPickerDemo } from "@/components/agent-picker-demo";
import { Install } from "@/components/install";
import { KanbanDemo } from "@/components/kanban-demo";
import { LogsDemo } from "@/components/logs-demo";
import { Nav } from "@/components/nav";
import { PatrolDemo } from "@/components/patrol-demo";
import { WindowFrame } from "@/components/window-frame";

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
 * Cursor-style painterly panel — a demo window floating over a soft
 * relief painting, with the painting showing as a frame around it.
 */
function PaintingPanel({
  painting,
  children,
  className = "",
}: {
  painting: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-4 sm:p-6 md:p-8 ${className}`}
    >
      <Image
        src={`/assets/paintings/${painting}.png`}
        alt=""
        fill
        aria-hidden
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      {/* Floating window */}
      <div className="overflow-hidden rounded-xl bg-paper shadow-[0_30px_70px_-25px_rgb(38_37_30_/_0.5)] ring-1 ring-black/5">
        {children}
      </div>
    </div>
  );
}

/** Big Cursor-style feature card: floating demo on one side, copy on the other. */
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
  painting: string;
  flip?: boolean;
}) {
  return (
    <div className="grid items-center gap-8 md:grid-cols-5">
      <div className={`md:col-span-3 ${flip ? "md:order-2" : ""}`}>
        <PaintingPanel painting={painting}>{demo}</PaintingPanel>
      </div>
      <div className={`px-2 md:col-span-2 ${flip ? "md:order-1" : ""}`}>
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
    </div>
  );
}

/* ---------- static content ---------- */

const FEATURES = [
  {
    icon: "▦",
    title: "See where every operation stands",
    body: "List or Kanban — every operation at a glance. They move themselves: Backlog → Running → Needs you → Done, driven by what the agent reports.",
  },
  {
    icon: "⇉",
    title: "Run many at once",
    body: "Set how many agents may run in parallel (0 = unlimited). Extra launches queue up and start as others finish.",
  },
  {
    icon: "≣",
    title: "Watch every run live",
    body: "Output streams onto the operation as it happens. History keeps every past run with its result, duration, token and cost stats.",
  },
  {
    icon: "⏱",
    title: "They patrol the night shift",
    body: "Deploy patrols that run once, daily, weekly, on an interval, or by cron. Myra keeps working from the system tray, even while you sleep.",
  },
  {
    icon: "⚙",
    title: "Bring your own agent",
    body: "OpenCode built in and installed for you, Ollama for local models, or any CLI agent via a custom preset. No lock-in.",
  },
  {
    icon: "⌂",
    title: "Your machine, your keys",
    body: "Everything runs locally. No account, no sign-up — your API keys and your code never leave your device.",
  },
];

const USE_CASES = [
  {
    when: "Every weekday · 8am",
    title: "Daily change digest",
    body: "Summarize the last 24h — merged PRs, fixes, risky changes — and post it to Slack before standup.",
    cron: 'cron: "0 8 * * 1-5"',
  },
  {
    when: "Every night",
    title: "Dependency & vuln sweep",
    body: "Scan for outdated or vulnerable packages, bump them, run the tests, and open a PR — while you sleep.",
    cron: 'cron: "0 3 * * *"',
  },
  {
    when: "Around the clock",
    title: "Production error triage",
    body: "Cluster new Sentry errors, find the root cause, and land a safe fix or post the analysis.",
    cron: 'cron: "*/30 * * * *"',
  },
];

const ROADMAP = [
  {
    tag: "Planned",
    title: "Remote access",
    body: "Check operations and kick off runs from your phone, while agents keep running back home.",
  },
  {
    tag: "Planned",
    title: "Managed cloud sync",
    body: "An optional hosted relay keeps devices in sync without self-hosting. Opt-in only.",
  },
  {
    tag: "Planned",
    title: "Integrations & webhooks",
    body: "Fire Slack messages and webhooks as operations reach Needs you or Done.",
  },
  {
    tag: "Planned",
    title: "Day Planner",
    body: "Describe your goals in plain language; Myra turns them into scheduled operations.",
  },
  {
    tag: "Exploring",
    title: "Plugin manager",
    body: "Browse and enable runtime plugins from Settings — the open agent ecosystem, one click away.",
  },
  {
    tag: "Exploring",
    title: "Shared workspaces",
    body: "Bring your team in, assign operations, see who's running what.",
  },
];

const SCREENS = [
  {
    src: "/assets/screens/operations.png",
    alt: "Operations view with Backlog, Running, Needs you and Done counters",
    caption: "Operations — every run, List or Kanban.",
  },
  {
    src: "/assets/screens/patrols.png",
    alt: "Patrols view with recurring and cron-triggered agent runs",
    caption: "Patrols — recurring runs on your schedule.",
  },
  {
    src: "/assets/screens/history.png",
    alt: "History view with success rate, runs-over-time chart and per-run stats",
    caption: "History — every past run, measured.",
  },
];

/* ---------- page ---------- */

export default function Home() {
  return (
    <div id="top">
      <Nav />

      {/* Hero */}
      <SectionShell className="pb-10 pt-16 md:pt-24">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">
            Free everyone from repetitive work
          </p>
          <h1 className="mt-4 text-4xl leading-tight tracking-tight md:text-[3.4rem] md:leading-[1.1]">
            <span className="font-bold">Your AI workforce,</span>
            <br />
            <span className="text-ink-55">running 24/7.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-70">
            Delegate the repetitive work. Set up your
            agents once — they run on their own, on schedule, even{" "}
            <b>while you sleep</b>.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#install"
              className="rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-paper transition hover:opacity-85"
            >
              Download the app
            </a>
            <a
              href="https://github.com/Myra-Agents/Myra-Agents"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-bold text-ink-70 transition hover:bg-paper-2"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current" aria-hidden>
                <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38l-.01-1.49c-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
              </svg>
              Star on GitHub
            </a>
            <span className="ml-1 text-xs font-medium text-ink-40">
              macOS · Windows · Linux — open source, local-first
            </span>
          </div>
        </div>

        {/* Flagship interactive demo — floating over a painting */}
        <div className="rise-in mt-12" id="demos">
          <div className="relative overflow-hidden rounded-3xl p-3 sm:p-6 md:p-12">
            <Image
              src="/assets/paintings/warm.png"
              alt=""
              fill
              aria-hidden
              className="absolute inset-0 -z-10 h-full w-full object-cover"
            />
            <div className="shadow-[0_40px_90px_-30px_rgb(38_37_30_/_0.55)]">
              <WindowFrame title="Myra Agents — Runs">
                <KanbanDemo />
              </WindowFrame>
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-ink-40">
            Live demo — launch the operation, answer its question, or just
            watch it work.
          </p>
        </div>
      </SectionShell>

      {/* Feature demo sections */}
      <SectionShell className="flex flex-col gap-14 py-14 md:py-20" id="how">
        <DemoSection
          painting="dusk"
          title="They patrol while you sleep."
          lead="Deploy patrols that fire once, daily, weekly, or by cron. Each carries a prompt, an agent and a working directory — no babysitting required."
          link="See what a patrol looks like"
          linkHref="#use-cases"
          demo={<PatrolDemo />}
        />
        <DemoSection
          flip
          painting="sand"
          title="Watch every run live."
          lead="Output streams onto the operation as it happens — and History keeps every run with its result, duration, tokens and cost."
          link="Explore the app"
          linkHref="#screens"
          demo={<LogsDemo />}
        />
        <DemoSection
          painting="warm"
          title="Bring your own agent."
          lead="OpenCode works out of the box — detected and installed in one click. Ollama runs local models. Any other CLI agent plugs in through a custom preset."
          link="Read the docs on presets"
          linkHref="https://github.com/Myra-Agents/Myra-Agents#readme"
          demo={<AgentPickerDemo />}
        />
      </SectionShell>

      {/* Feature grid */}
      <SectionShell className="py-14 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Put a whole team of agents to work
          </h2>
          <p className="mt-4 text-lg text-ink-55">
            Set them up once. They run on their own — in parallel, on
            schedule, reporting back as they go.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-line bg-card p-6 transition hover:border-line-strong hover:shadow-sm"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-lg text-accent">
                {f.icon}
              </div>
              <h3 className="font-bold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-55">
                {f.body}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-ink-40">
          Also: English + French UI.
        </p>
      </SectionShell>

      {/* Use cases */}
      <SectionShell id="use-cases" className="py-14 md:py-20">
        <div className="rounded-2xl bg-paper-2 p-6 md:p-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              The repetitive work you&apos;ll hand off
            </h2>
            <p className="mt-3 text-base text-ink-55">
              Recurring chores you&apos;d rather not do by hand — set once,
              then they just run.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {USE_CASES.map((u) => (
              <div
                key={u.title}
                className="rounded-2xl bg-card p-6 ring-1 ring-line"
              >
                <div className="text-xs font-bold uppercase tracking-wide text-accent">
                  {u.when}
                </div>
                <div className="mt-2 text-base font-bold">{u.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-ink-55">
                  {u.body}
                </p>
                <code className="mt-4 block rounded-lg bg-ink px-3 py-2 font-mono text-xs text-[#9de07f]">
                  {u.cron}
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
            This is the real app
          </h2>
          <p className="mt-3 text-base text-ink-55">
            A native desktop app — Tauri, not a browser tab. Dark and light,
            English and French.
          </p>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {SCREENS.map((s) => (
            <figure
              key={s.src}
              className="overflow-hidden rounded-2xl border border-line bg-paper-2"
            >
              <Image
                src={s.src}
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
            Coming soon
          </span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">
            What&apos;s coming next
          </h2>
          <p className="mt-3 text-base text-ink-55">
            Everything below is planned or in exploration — opt-in, and never
            at the cost of local-first.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ROADMAP.map((r) => (
            <div
              key={r.title}
              className="relative rounded-2xl border border-dashed border-line-strong bg-paper-2/60 p-5"
            >
              <span className="absolute right-4 top-4 rounded-full bg-paper-3 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink-40">
                {r.tag}
              </span>
              <h3 className="pr-16 font-bold">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-55">
                {r.body}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-ink-40">
          Want to shape what ships next?{" "}
          <a
            href="https://github.com/Myra-Agents/Myra-Agents/issues"
            className="underline hover:text-ink-70"
          >
            Open an issue on GitHub
          </a>
          .
        </p>
      </SectionShell>

      <Install />

      {/* Footer */}
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-10 text-sm text-ink-40 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <Image
              src="/assets/logo-light.png"
              alt="Myra Agents"
              width={24}
              height={24}
              className="h-6 w-6 rounded-md"
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
              GitHub org
            </a>
            <a
              href="https://github.com/Myra-Agents/Myra-Agents"
              className="transition hover:text-ink-70"
            >
              App repo
            </a>
            <span>MIT · © 2026 Leaptech</span>
          </div>
        </div>
        <p className="mx-auto max-w-2xl px-5 pb-8 text-center text-xs text-ink-40">
          <em>Myra</em> is Swedish for <em>ant</em> — one agent is a single
          worker; your setup is the colony, many running in parallel, quietly
          doing the work you&apos;d rather not. Our mission:{" "}
          <span className="text-ink-55">
            free everyone from repetitive work.
          </span>
        </p>
      </footer>
    </div>
  );
}
