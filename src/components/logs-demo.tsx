"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { useInView } from "./use-in-view";
import { useT } from "@/components/providers";

/** Live-run terminal: the exec log of one operation, typed out line by line. */

type Copy = {
  streaming: string;
  replay: string;
};

const COPY: { en: Copy; fr: Copy } = {
  en: {
    streaming: "streaming",
    replay: "Replay",
  },
  fr: {
    streaming: "en direct",
    replay: "Rejouer",
  },
};

const LINES: { text: string; cls?: string }[] = [
  { text: "$ myra run — Production error triage", cls: "text-white/60" },
  { text: "▸ agent: opencode · cwd: ~/work/api" },
  { text: "Fetching new Sentry issues… 6 unresolved" },
  { text: "Clustering by stack trace → 2 root causes" },
  { text: "#1 TypeError in parseSession — 5 events" },
  { text: "Reading src/session.ts… found unchecked null" },
  { text: "Writing fix + regression test…" },
  { text: "✓ tests green (12 passed)", cls: "text-[#9de07f]" },
  { text: "✓ PR #221 opened — fix: guard null session", cls: "text-[#9de07f]" },
  { text: "run done · 3m 42s · 58k tokens · $0.19", cls: "text-white/50" },
];

export function LogsDemo() {
  const t = useT(COPY);
  const { ref, inView } = useInView<HTMLDivElement>(0.35);
  const [count, setCount] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const play = useCallback(() => {
    for (const t of timers.current) clearTimeout(t);
    timers.current = [];
    setCount(0);
    LINES.forEach((_, i) =>
      timers.current.push(setTimeout(() => setCount(i + 1), 400 + i * 750)),
    );
  }, []);

  useEffect(() => {
    if (inView) play();
    return () => {
      for (const t of timers.current) clearTimeout(t);
    };
  }, [inView, play]);

  const finished = count >= LINES.length;

  return (
    <div ref={ref} className="relative min-h-[384px] select-none p-5 sm:p-7">
      <div className="rounded-xl bg-terminal p-4 font-mono text-xs leading-relaxed text-[#d6d5cf] shadow-[0_1px_2px_rgb(38_37_30_/_0.1)]">
        <div className="mb-3 flex items-center gap-2 border-b border-white/10 pb-2 text-[10px] text-white/40">
          <span className="dot-running inline-block h-2 w-2 rounded-full bg-[#ff6900]" />
          agent-runs/f3a91c.log — {t.streaming}
        </div>
        <div className="min-h-[15.5rem]">
          {LINES.slice(0, count).map((l) => (
            <div key={l.text} className={`truncate ${l.cls ?? ""}`}>
              {l.text}
            </div>
          ))}
          {!finished && <span className="demo-caret" />}
        </div>
      </div>
      {finished && (
        <button
          type="button"
          onClick={play}
          className="absolute bottom-8 right-8 flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white/80 backdrop-blur transition hover:bg-white/15"
        >
          <RotateCcw className="h-3 w-3" /> {t.replay}
        </button>
      )}
    </div>
  );
}
