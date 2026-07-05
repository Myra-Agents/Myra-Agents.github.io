"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bot,
  CheckCircle2,
  Loader2,
  MoreHorizontal,
  Play,
  Plus,
  RotateCcw,
} from "lucide-react";
import { useInView } from "./use-in-view";
import { useT } from "@/components/providers";

/**
 * Faithful recreation of the app's Patrols view — same table anatomy as
 * `app/(main)/schedules/page.tsx`: enable switch, name + cadence line,
 * agent chip, tag badges, relative next-run column. "Run now" fires a
 * patrol live and its run lands below, exactly like the real thing.
 */

const COPY = {
  en: {
    header: "Patrols",
    headerSub: "Recurring agent runs, fired on schedule",
    newPatrol: "New patrol",
    colName: "Name",
    colAgent: "Agent",
    colTools: "Tools",
    colNextRun: "Next run",
    working: "agent working…",
    replay: "Replay",
    emptyHint: "Press ▶ on a patrol — or wait for its schedule to fire.",
    patrols: {
      digest: {
        name: "Daily change digest",
        cadence: "Weekdays at 08:00",
        next: "in 9 h",
        result: "digest posted to #eng-standup",
      },
      deps: {
        name: "Dependency & vuln sweep",
        cadence: "Every night at 03:00",
        next: "in 4 h",
        result: "3 packages bumped · tests green · PR #214 opened",
      },
      triage: {
        name: "Production error triage",
        cadence: "Every 30 minutes",
        next: "in 12 min",
        result: "1 root cause found · fix landed as PR #221",
      },
    },
  },
  fr: {
    header: "Patrouilles",
    headerSub: "Exécutions d'agents récurrentes, déclenchées à intervalle",
    newPatrol: "Nouvelle patrouille",
    colName: "Nom",
    colAgent: "Agent",
    colTools: "Outils",
    colNextRun: "Prochaine",
    working: "agent au travail…",
    replay: "Rejouer",
    emptyHint:
      "Appuyez sur ▶ sur une patrouille — ou attendez que sa planification se déclenche.",
    patrols: {
      digest: {
        name: "Résumé quotidien des changements",
        cadence: "En semaine à 08:00",
        next: "dans 9 h",
        result: "résumé publié sur #eng-standup",
      },
      deps: {
        name: "Balayage dépendances & vulnérabilités",
        cadence: "Chaque nuit à 03:00",
        next: "dans 4 h",
        result: "3 paquets mis à jour · tests au vert · PR #214 ouverte",
      },
      triage: {
        name: "Triage des erreurs de production",
        cadence: "Toutes les 30 min",
        next: "dans 12 min",
        result: "1 cause racine trouvée · correctif livré via PR #221",
      },
    },
  },
};

/* Tag palette — verbatim from the app's kanban-tags.ts (hash-colored). */
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

const PATROLS = [
  { id: "digest", tags: ["standup"], at: "08:00" },
  { id: "deps", tags: ["deps"], at: "03:00" },
  { id: "triage", tags: ["sentry"], at: "23:30" },
] as const;

type RunState = "running" | "done";

function AgentChip() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-line px-2 py-1 text-xs text-ink-70">
      <Bot className="size-3.5 text-ink-70" />
      OpenCode
    </span>
  );
}

function Switch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`inline-flex h-4 w-7 shrink-0 items-center rounded-full transition-colors ${checked ? "bg-ink" : "bg-ink/20"}`}
    >
      <span
        className={`h-3 w-3 rounded-full bg-white shadow-sm transition-transform ${checked ? "translate-x-3.5" : "translate-x-0.5"}`}
      />
    </button>
  );
}

export function PatrolDemo() {
  const t = useT(COPY);
  const { ref, inView } = useInView<HTMLDivElement>(0.35);
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    digest: true,
    deps: true,
    triage: true,
  });
  const [runs, setRuns] = useState<{ id: string; state: RunState }[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const runNow = useCallback((id: string) => {
    setRuns((r) =>
      r.some((x) => x.id === id) ? r : [...r, { id, state: "running" }],
    );
    timers.current.push(
      setTimeout(
        () =>
          setRuns((r) =>
            r.map((x) => (x.id === id ? { ...x, state: "done" } : x)),
          ),
        2400,
      ),
    );
  }, []);

  // Auto-fire the nightly sweep once visible; the triage patrol follows.
  useEffect(() => {
    if (!inView) return;
    const a = setTimeout(() => runNow("deps"), 1400);
    const b = setTimeout(() => runNow("triage"), 4600);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [inView, runNow]);

  const replay = useCallback(() => {
    for (const timer of timers.current) clearTimeout(timer);
    timers.current = [];
    setRuns([]);
    timers.current.push(
      setTimeout(() => runNow("deps"), 500),
      setTimeout(() => runNow("triage"), 2200),
    );
  }, [runNow]);

  const allDone =
    runs.length >= 2 && runs.every((r) => r.state === "done");

  useEffect(
    () => () => {
      for (const t of timers.current) clearTimeout(t);
    },
    [],
  );

  return (
    <div ref={ref} className="relative min-h-[464px] select-none">
      {/* View header */}
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <div>
          <div className="text-sm font-semibold">{t.header}</div>
          <div className="text-[10px] text-ink-40">{t.headerSub}</div>
        </div>
        <span className="inline-flex h-6 items-center gap-1 rounded-md bg-ink px-2 text-xs font-medium text-paper">
          <Plus className="size-3" />
          {t.newPatrol}
        </span>
      </div>

      <div className="scrollbar-none overflow-x-auto p-4 sm:p-5">
        <table className="w-full min-w-[500px] table-fixed border-collapse text-left md:min-w-0">
          <thead>
            <tr className="border-b border-line text-[11px] text-ink-40">
              <th className="pb-2 pl-1 font-medium">{t.colName}</th>
              <th className="w-[104px] pb-2 font-medium">{t.colAgent}</th>
              <th className="w-[74px] pb-2 font-medium">{t.colTools}</th>
              <th className="w-[72px] pb-2 font-medium">{t.colNextRun}</th>
              <th className="w-9 pb-2" />
            </tr>
          </thead>
          <tbody>
            {PATROLS.map((p) => {
              const on = enabled[p.id];
              const run = runs.find((r) => r.id === p.id);
              const copy = t.patrols[p.id];
              return (
                <tr
                  key={p.id}
                  className={`border-b border-line transition-colors hover:bg-paper-3/40 ${on ? "" : "opacity-60"}`}
                >
                  <td className="py-3 pl-1 pr-3">
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={on}
                        onChange={() =>
                          setEnabled((e) => ({ ...e, [p.id]: !e[p.id] }))
                        }
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm text-ink">
                          {copy.name}
                        </p>
                        <p className="truncate text-xs text-ink-40">
                          {copy.cadence}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-3">
                    <AgentChip />
                  </td>
                  <td className="py-3 pr-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`inline-flex h-5 items-center rounded-4xl border px-1.5 text-[10px] font-medium ${TAG_PALETTE[tagHashIndex(tag)]}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 pr-3">
                    {on ? (
                      <div className="flex flex-col">
                        <span className="whitespace-nowrap text-xs text-ink">
                          {copy.next}
                        </span>
                        <span className="whitespace-nowrap text-[10px] text-ink-40">
                          {p.at}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-ink-40">—</span>
                    )}
                  </td>
                  <td className="py-3">
                    <button
                      type="button"
                      onClick={() => runNow(p.id)}
                      disabled={!on || !!run}
                      title="Run now"
                      className="flex size-7 items-center justify-center rounded-md text-ink-55 transition-colors hover:bg-paper-3 hover:text-ink disabled:opacity-40"
                    >
                      {run ? (
                        <MoreHorizontal className="size-4" />
                      ) : (
                        <Play className="size-3.5" />
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Fired runs land below, like operations spawned by the scheduler */}
        <div className="mt-3 flex flex-col gap-2">
          {runs.map((r) => {
            const p = PATROLS.find((x) => x.id === r.id);
            if (!p) return null;
            const copy = t.patrols[p.id];
            return (
              <div
                key={r.id}
                className="card-enter flex items-center gap-2.5 rounded-lg border border-line bg-card px-3 py-2"
              >
                {r.state === "done" ? (
                  <CheckCircle2 className="size-4 shrink-0 text-[#639922]" />
                ) : (
                  <Loader2 className="size-4 shrink-0 animate-spin text-[#ff6900]" />
                )}
                <span className="min-w-0 flex-1 truncate text-xs text-ink-70">
                  <span className="font-medium text-ink">{copy.name}</span>
                  {" — "}
                  {r.state === "done" ? copy.result : t.working}
                </span>
              </div>
            );
          })}
          {runs.length === 0 && (
            <p className="py-2 text-center text-xs italic text-ink-40">
              {t.emptyHint}
            </p>
          )}
          {allDone && (
            <button
              type="button"
              onClick={replay}
              className="mx-auto mt-1 flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1.5 text-[11px] font-semibold text-ink-70 shadow-sm transition hover:border-line-strong"
            >
              <RotateCcw className="h-3 w-3" /> {t.replay}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
