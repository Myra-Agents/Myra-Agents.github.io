"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Activity,
  ClipboardCheck,
  CornerDownLeft,
  MessageSquare,
  Pencil,
  Play,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { useInView } from "./use-in-view";
import { useT } from "@/components/providers";

/**
 * Faithful, replayable recreation of the app's Runs board — column
 * chrome, card anatomy and status blocks mirror the real Kanban view.
 * One operation runs the real lifecycle live: Backlog → Running →
 * Needs you (question) → Running → Needs you (review) → Done.
 */

type Phase =
  | "idle"
  | "queued"
  | "running"
  | "question"
  | "resumed"
  | "review"
  | "done";

const COPY = {
  en: {
    header: "Runs",
    headerSub: "Lists all the running tasks",
    list: "List",
    kanban: "Kanban",
    tags: "Tags",
    showing: "Showing 4 of 4",
    colBacklog: "Backlog",
    colBacklogSub: "Next tasks",
    colRunning: "Running",
    colRunningSub: "In progress",
    colNeedsYou: "Needs you",
    colNeedsYouSub: "Feedback · Review",
    colDone: "Done",
    colDoneSub: "Task done",
    cardDigest: "Summarize repo changes since yesterday",
    cardDeps: "Bump outdated dependencies",
    cardRefactor: "Refactor the settings panel into tabs",
    cardTrash: "Extract hardcoded strings in the trash zone",
    running: "Running",
    queued: "Queued",
    question: "Question",
    answer: "Answer",
    review: "Review",
    viewLogs: "View logs",
    launch: "Launch",
    waiting: "Waiting for output…",
    questionText:
      "Include the breaking change in api/auth in the digest, or open a separate operation for it?",
    reviewResult:
      "Digest posted to #eng-standup — 14 commits, 3 PRs, 1 breaking change flagged.",
    doneResult: "✓ 2m 14s · 41k tokens · digest posted",
    replay: "Replay",
    logLines: [
      "$ opencode run — digest of the last 24h",
      "Reading git log… 14 commits, 3 PRs merged",
      "Scanning diffs for risky changes…",
      "Found 1 breaking change in api/auth",
      "Drafting the digest…",
    ],
    resumeLines: ["Posting to #eng-standup…", "Digest posted. Done."],
  },
  fr: {
    header: "Exécutions",
    headerSub: "Liste toutes les tâches en cours",
    list: "Liste",
    kanban: "Kanban",
    tags: "Tags",
    showing: "4 sur 4 affichées",
    colBacklog: "À faire",
    colBacklogSub: "Prochaines",
    colRunning: "En cours",
    colRunningSub: "En cours",
    colNeedsYou: "À vous",
    colNeedsYouSub: "Retour · Revue",
    colDone: "Terminé",
    colDoneSub: "Terminé",
    cardDigest: "Résumer les changements du dépôt depuis hier",
    cardDeps: "Mettre à jour les dépendances obsolètes",
    cardRefactor: "Réorganiser le panneau de réglages en onglets",
    cardTrash: "Extraire les chaînes codées en dur dans la zone corbeille",
    running: "En cours",
    queued: "En file",
    question: "Question",
    answer: "Répondre",
    review: "Revoir",
    viewLogs: "Voir les logs",
    launch: "Lancer",
    waiting: "En attente de sortie…",
    questionText:
      "Inclure le changement cassant dans api/auth dans le résumé, ou ouvrir une opération séparée pour cela ?",
    reviewResult:
      "Résumé publié sur #eng-standup — 14 commits, 3 PR, 1 changement cassant signalé.",
    doneResult: "✓ 2m 14s · 41k tokens · résumé publié",
    replay: "Rejouer",
    logLines: [
      "$ opencode run — digest of the last 24h",
      "Lecture du git log… 14 commits, 3 PR fusionnées",
      "Analyse des diffs à la recherche de changements risqués…",
      "1 changement cassant trouvé dans api/auth",
      "Rédaction du résumé…",
    ],
    resumeLines: ["Publication sur #eng-standup…", "Résumé publié. Terminé."],
  },
};

/* ── Tag palette — verbatim from the app's kanban-tags.ts ── */

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

function Tag({ label }: { label: string }) {
  return (
    <span
      className={`inline-flex h-5 items-center rounded-4xl border px-1.5 py-0 text-[10px] font-medium whitespace-nowrap ${TAG_PALETTE[tagHashIndex(label)]}`}
    >
      {label}
    </span>
  );
}

const STATUS = {
  backlog: "var(--color-status-backlog)",
  running: "var(--color-status-running)",
  needsYou: "var(--color-status-needs-you)",
  done: "var(--color-status-done)",
};

/* ── Card + column chrome — mirrors the app's Kanban view ── */

function DemoCard({
  children,
  entering = false,
  dimmed = false,
  actions = false,
}: {
  children: React.ReactNode;
  entering?: boolean;
  dimmed?: boolean;
  actions?: boolean;
}) {
  return (
    <div
      className={`group relative space-y-2.5 rounded-xl border border-line bg-card p-3.5 text-left shadow-[0_1px_2px_rgb(38_37_30_/_0.05)] transition-all duration-200 ${entering ? "card-enter" : ""} ${dimmed ? "opacity-60" : ""}`}
    >
      {actions && (
        <div className="absolute right-2.5 top-2.5 flex items-center gap-1.5 text-ink-40">
          <Pencil className="size-3" />
          <Trash2 className="size-3" />
        </div>
      )}
      {children}
    </div>
  );
}

function TitleRow({ dot, title }: { dot: string; title: string }) {
  return (
    <div className="space-y-2">
      <div
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: dot }}
      />
      <p className="pr-8 text-sm font-medium leading-snug">{title}</p>
    </div>
  );
}

function Footer({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-1 border-t border-line pt-2">
      {tags.map((t) => (
        <Tag key={t} label={t} />
      ))}
    </div>
  );
}

function Column({
  name,
  sub,
  color,
  children,
}: {
  name: string;
  sub: string;
  color: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex min-w-[14rem] flex-1 basis-0 flex-col md:min-w-0">
      {/* Header card — square bottom, sits flush atop the task list */}
      <div className="mx-2 rounded-t-xl border border-b-0 border-line bg-card px-[18px] py-1.5">
        <div className="flex items-center gap-1">
          <div
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ backgroundColor: color }}
          />
          <h3 className="truncate text-xs font-medium leading-none text-ink-70">
            {name}
          </h3>
        </div>
        <div className="pl-3 pt-0.5 text-[10px] leading-none text-ink-40">
          {sub}
        </div>
      </div>
      {/* Task list card — own full-radius shell, distinct surface from cards inside */}
      <div className="flex min-h-[15rem] flex-1 flex-col gap-2 rounded-xl border border-line bg-paper-2 p-2.5">
        {children}
      </div>
    </div>
  );
}

/* ── Status blocks — mirrors of the app's card sub-sections ── */

function RunningBlock({
  elapsed,
  lines,
  runningLabel,
  waitingLabel,
}: {
  elapsed: string;
  lines: string[];
  runningLabel: string;
  waitingLabel: string;
}) {
  return (
    <div className="space-y-2 border-t border-line pt-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Activity className="size-3 text-orange-600" />
          <span className="text-xs font-medium text-orange-600">
            {runningLabel}
          </span>
        </div>
        <span className="text-[10px] tabular-nums text-ink-55">{elapsed}</span>
      </div>
      {lines.length === 0 ? (
        <p className="text-xs text-ink-55">{waitingLabel}</p>
      ) : (
        <div className="max-h-20 overflow-hidden rounded bg-terminal p-2 font-mono text-[10px] leading-snug text-terminal-fg">
          {lines.slice(-4).map((line) => (
            <div key={line} className="truncate">
              {line}
            </div>
          ))}
          <span className="demo-caret" />
        </div>
      )}
    </div>
  );
}

function QuestionBlock({
  question,
  elapsed,
  onAnswer,
  questionLabel,
  answerLabel,
}: {
  question: string;
  elapsed: string;
  onAnswer: () => void;
  questionLabel: string;
  answerLabel: string;
}) {
  return (
    <div className="space-y-2 border-t border-line pt-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <MessageSquare className="size-3 text-purple-500" />
          <span className="text-xs font-medium text-purple-500">
            {questionLabel}
          </span>
        </div>
        <span className="text-[10px] tabular-nums text-ink-55">{elapsed}</span>
      </div>
      <p className="text-xs text-ink-55">{question}</p>
      <button
        type="button"
        onClick={onAnswer}
        className="flex h-6 w-full items-center justify-center gap-1 rounded-md bg-ink px-2 text-xs font-medium text-paper transition hover:opacity-85"
      >
        {answerLabel}
        <CornerDownLeft className="size-3" />
      </button>
    </div>
  );
}

function ReviewBlock({
  result,
  onReview,
  reviewLabel,
}: {
  result: string;
  onReview: () => void;
  reviewLabel: string;
}) {
  return (
    <div className="space-y-2 border-t border-line pt-2">
      <p className="text-xs text-ink-55">{result}</p>
      <button
        type="button"
        onClick={onReview}
        className="flex h-6 w-full items-center justify-center gap-1 rounded-md bg-paper-3 px-2 text-xs font-medium text-ink transition hover:opacity-80"
      >
        <ClipboardCheck className="size-3" />
        {reviewLabel}
      </button>
    </div>
  );
}

function QueuedBlock({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1.5 border-t border-line pt-2">
      <span className="size-2 animate-pulse rounded-full bg-amber-500" />
      <span className="text-xs font-medium text-amber-600">{label}</span>
    </div>
  );
}

/* ── The scripted board ── */

export function KanbanDemo() {
  const t = useT(COPY);
  const { ref, inView } = useInView<HTMLDivElement>(0.35);
  const [phase, setPhase] = useState<Phase>("idle");
  const [logIdx, setLogIdx] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [sideDone, setSideDone] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const later = useCallback((fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  const clearTimers = useCallback(() => {
    for (const t of timers.current) clearTimeout(t);
    timers.current = [];
  }, []);

  const launch = useCallback(() => {
    clearTimers();
    setPhase("queued");
    setLogIdx(0);
    setSeconds(0);
    setSideDone(false);
    later(() => setPhase("running"), 800);
    t.logLines.forEach((_, i) =>
      later(() => setLogIdx(i + 1), 1600 + i * 1100),
    );
    later(() => setSideDone(true), 4200);
    later(() => setPhase("question"), 1600 + t.logLines.length * 1100 + 600);
  }, [clearTimers, later, t]);

  const answer = useCallback(() => {
    clearTimers();
    setPhase("resumed");
    setLogIdx(0);
    t.resumeLines.forEach((_, i) =>
      later(() => setLogIdx(i + 1), 500 + i * 1000),
    );
    later(() => setPhase("review"), 500 + t.resumeLines.length * 1000 + 700);
  }, [clearTimers, later, t]);

  const finish = useCallback(() => {
    clearTimers();
    setPhase("done");
  }, [clearTimers]);

  const replay = useCallback(() => {
    clearTimers();
    setPhase("idle");
    setLogIdx(0);
    setSeconds(0);
    setSideDone(false);
  }, [clearTimers]);

  useEffect(() => {
    if (inView && phase === "idle") {
      const t = setTimeout(launch, 900);
      return () => clearTimeout(t);
    }
  }, [inView, phase, launch]);

  useEffect(() => {
    if (phase === "question") {
      const t = setTimeout(answer, 6000);
      return () => clearTimeout(t);
    }
    if (phase === "review") {
      const t = setTimeout(finish, 5000);
      return () => clearTimeout(t);
    }
  }, [phase, answer, finish]);

  useEffect(() => {
    if (phase !== "running" && phase !== "resumed") return;
    const iv = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(iv);
  }, [phase]);

  useEffect(() => clearTimers, [clearTimers]);

  // Same elapsed format as the app.
  const elapsed =
    seconds < 60
      ? `${seconds}s`
      : `${Math.floor(seconds / 60)}m ${seconds % 60}s`;

  const heroInBacklog = phase === "idle" || phase === "queued";
  const heroRunning = phase === "running" || phase === "resumed";
  const heroNeedsYou = phase === "question" || phase === "review";
  const lines = phase === "resumed" ? t.resumeLines : t.logLines;

  return (
    <div ref={ref} className="flex min-h-[688px] flex-col select-none">
      {/* View header — Runs */}
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <div>
          <div className="text-sm font-semibold">{t.header}</div>
          <div className="text-[10px] text-ink-40">{t.headerSub}</div>
        </div>
        {/* Non-interactive List / Kanban indicator (Kanban active) */}
        <div className="flex items-center gap-3 text-xs">
          <span className="text-ink-40">{t.list}</span>
          <span className="border-l border-line pl-3 font-semibold text-ink">
            {t.kanban}
          </span>
        </div>
      </div>

      {/* Tags row */}
      <div className="flex items-center justify-between px-5 pb-2 pt-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-ink-40">{t.tags}</span>
          {["standup", "deps", "refactor"].map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
        <span className="text-[10px] text-ink-40">{t.showing}</span>
      </div>

      {/* ── Kanban board — columns stretch to fill the whole window ── */}
      <div className="scrollbar-none relative flex flex-1 items-stretch gap-3 overflow-x-auto p-4 sm:p-6">
            <Column
              name={t.colBacklog}
              sub={t.colBacklogSub}
              color={STATUS.backlog}
            >
              {heroInBacklog && (
                <DemoCard entering={phase === "idle"} actions>
                  <TitleRow dot={STATUS.backlog} title={t.cardDigest} />
                  {phase === "queued" ? (
                    <QueuedBlock label={t.queued} />
                  ) : (
                    <button
                      type="button"
                      onClick={launch}
                      className="flex h-6 w-full items-center justify-center gap-1 rounded-md bg-ink px-2 text-xs font-medium text-paper transition hover:opacity-85"
                    >
                      <Play className="size-3" />
                      {t.launch}
                    </button>
                  )}
                  <Footer tags={["standup"]} />
                </DemoCard>
              )}
              <DemoCard dimmed actions>
                <TitleRow dot={STATUS.backlog} title={t.cardDeps} />
                <Footer tags={["deps"]} />
              </DemoCard>
            </Column>

            <Column
              name={t.colRunning}
              sub={t.colRunningSub}
              color={STATUS.running}
            >
              {heroRunning && (
                <DemoCard entering>
                  <TitleRow dot={STATUS.running} title={t.cardDigest} />
                  <RunningBlock
                    elapsed={elapsed}
                    lines={lines.slice(0, logIdx)}
                    runningLabel={t.running}
                    waitingLabel={t.waiting}
                  />
                  <Footer tags={["standup"]} />
                </DemoCard>
              )}
              {!sideDone && (
                <DemoCard>
                  <TitleRow dot={STATUS.running} title={t.cardRefactor} />
                  <div className="space-y-2 border-t border-line pt-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Activity className="size-3 text-orange-600" />
                        <span className="text-xs font-medium text-orange-600">
                          {t.running}
                        </span>
                      </div>
                      <span className="text-[10px] tabular-nums text-ink-55">
                        23m 57s
                      </span>
                    </div>
                    <p className="text-xs text-ink-55">{t.waiting}</p>
                  </div>
                  <Footer tags={["refactor"]} />
                </DemoCard>
              )}
            </Column>

            <Column
              name={t.colNeedsYou}
              sub={t.colNeedsYouSub}
              color={STATUS.needsYou}
            >
              {heroNeedsYou && (
                <DemoCard entering>
                  <TitleRow dot={STATUS.needsYou} title={t.cardDigest} />
                  {phase === "question" ? (
                    <QuestionBlock
                      elapsed="1m 32s"
                      question={t.questionText}
                      onAnswer={answer}
                      questionLabel={t.question}
                      answerLabel={t.answer}
                    />
                  ) : (
                    <ReviewBlock
                      result={t.reviewResult}
                      onReview={finish}
                      reviewLabel={t.review}
                    />
                  )}
                  <Footer tags={["standup"]} />
                </DemoCard>
              )}
            </Column>

            <Column name={t.colDone} sub={t.colDoneSub} color={STATUS.done}>
              {phase === "done" && (
                <DemoCard entering>
                  <TitleRow dot={STATUS.done} title={t.cardDigest} />
                  <p className="text-xs text-ink-55">{t.doneResult}</p>
                  <Footer tags={["standup"]} />
                </DemoCard>
              )}
              {sideDone && (
                <DemoCard entering>
                  <TitleRow dot={STATUS.done} title={t.cardRefactor} />
                  <Footer tags={["refactor"]} />
                </DemoCard>
              )}
              <DemoCard dimmed>
                <TitleRow dot={STATUS.done} title={t.cardTrash} />
                <Footer tags={["i18n"]} />
              </DemoCard>
            </Column>

        {phase === "done" && (
            <button
              type="button"
              onClick={replay}
              className="absolute bottom-5 right-5 flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1.5 text-[11px] font-semibold text-ink-70 shadow-sm transition hover:border-line-strong"
            >
              <RotateCcw className="h-3 w-3" /> {t.replay}
            </button>
          )}
        </div>
      </div>
  );
}
