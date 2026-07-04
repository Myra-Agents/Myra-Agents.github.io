"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bot,
  CheckCircle2,
  Loader2,
  MoreHorizontal,
  Play,
  Plus,
} from "lucide-react";
import { useInView } from "./use-in-view";

/**
 * Faithful recreation of the app's Patrols view — same table anatomy as
 * `app/(main)/schedules/page.tsx`: enable switch, name + cadence line,
 * agent chip, tag badges, relative next-run column. "Run now" fires a
 * patrol live and its run lands below, exactly like the real thing.
 */

/* Tag palette — verbatim from the app's kanban-tags.ts (hash-colored). */
const TAG_PALETTE = [
  "border-orange-500/25 bg-orange-500/10 text-orange-700",
  "border-blue-500/25 bg-blue-500/10 text-blue-700",
  "border-emerald-500/25 bg-emerald-500/10 text-emerald-700",
  "border-purple-500/25 bg-purple-500/10 text-purple-700",
  "border-amber-500/25 bg-amber-500/10 text-amber-700",
  "border-rose-500/25 bg-rose-500/10 text-rose-700",
  "border-cyan-500/25 bg-cyan-500/10 text-cyan-700",
  "border-lime-500/25 bg-lime-500/10 text-lime-700",
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
  {
    id: "digest",
    name: "Daily change digest",
    cadence: "Weekdays at 08:00",
    tags: ["standup"],
    next: "in 9 h",
    at: "08:00",
    result: "digest posted to #eng-standup",
  },
  {
    id: "deps",
    name: "Dependency & vuln sweep",
    cadence: "Every night at 03:00",
    tags: ["deps"],
    next: "in 4 h",
    at: "03:00",
    result: "3 packages bumped · tests green · PR #214 opened",
  },
  {
    id: "triage",
    name: "Production error triage",
    cadence: "Every 30 minutes",
    tags: ["sentry"],
    next: "in 12 min",
    at: "23:30",
    result: "1 root cause found · fix landed as PR #221",
  },
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

  useEffect(
    () => () => {
      for (const t of timers.current) clearTimeout(t);
    },
    [],
  );

  return (
    <div ref={ref} className="min-h-[420px] select-none">
      {/* View header */}
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <div>
          <div className="text-sm font-semibold">Patrols</div>
          <div className="text-[10px] text-ink-40">
            Recurring agent runs, fired on schedule
          </div>
        </div>
        <span className="inline-flex h-6 items-center gap-1 rounded-md bg-ink px-2 text-xs font-medium text-paper">
          <Plus className="size-3" />
          New patrol
        </span>
      </div>

      <div className="scrollbar-none overflow-x-auto p-4 sm:p-6">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line text-[11px] text-ink-40">
              <th className="pb-2 pl-1 font-medium">Name</th>
              <th className="pb-2 font-medium">Agent</th>
              <th className="pb-2 font-medium">Tools</th>
              <th className="pb-2 font-medium">Next run</th>
              <th className="pb-2" />
            </tr>
          </thead>
          <tbody>
            {PATROLS.map((p) => {
              const on = enabled[p.id];
              const run = runs.find((r) => r.id === p.id);
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
                        <p className="truncate text-sm text-ink">{p.name}</p>
                        <p className="truncate text-xs text-ink-40">
                          {p.cadence}
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
                          {p.next}
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
                <span className="truncate text-xs text-ink-70">
                  <span className="font-medium text-ink">{p.name}</span>
                  {" — "}
                  {r.state === "done" ? p.result : "agent working…"}
                </span>
              </div>
            );
          })}
          {runs.length === 0 && (
            <p className="py-2 text-center text-xs italic text-ink-40">
              Press ▶ on a patrol — or wait for its schedule to fire.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
