"use client";

import { useState } from "react";
import { CheckCircle2, Copy, FlaskConical, Trash2 } from "lucide-react";

/**
 * Faithful recreation of an agent preset card from the app's
 * Settings → Agents panel: name + install badge header, Name/Binary
 * fields, advanced args template, live test command. Pick a preset or
 * edit the fields — the spawned command updates as you type.
 */

const PRESETS = [
  {
    id: "opencode",
    name: "OpenCode",
    binary: "opencode",
    args: 'run --print-logs "{prompt}"',
    badge: "Installed · v0.6.4",
    tested: true,
  },
  {
    id: "claude",
    name: "Claude Code",
    binary: "claude",
    args: '-p "{prompt}" --output-format stream-json',
    badge: "Installed · v2.1.0",
    tested: true,
  },
  {
    id: "ollama",
    name: "Ollama · llama3.3",
    binary: "ollama",
    args: 'run llama3.3 "{prompt}"',
    badge: "Local — no API key",
    tested: false,
  },
  {
    id: "custom",
    name: "My agent",
    binary: "your-agent",
    args: '--headless "{prompt}"',
    badge: "Installed",
    tested: false,
  },
] as const;

export function AgentPickerDemo() {
  const [presetId, setPresetId] = useState<string>("opencode");
  const preset = PRESETS.find((p) => p.id === presetId) ?? PRESETS[0];
  const [name, setName] = useState<string>(preset.name);
  const [binary, setBinary] = useState<string>(preset.binary);
  const [args, setArgs] = useState<string>(preset.args);
  const [showArgs, setShowArgs] = useState(false);

  const pick = (p: (typeof PRESETS)[number]) => {
    setPresetId(p.id);
    setName(p.name);
    setBinary(p.binary);
    setArgs(p.args);
  };

  const testCmd = `${binary} ${args.replace("{prompt}", "hello")}`.trim();
  const inputCls =
    "h-7 w-full rounded-md border border-line bg-card px-2 text-xs text-ink outline-none transition focus:border-line-strong";

  return (
    <div className="min-h-[470px] select-none p-5 sm:p-7">
      {/* Preset switcher */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => pick(p)}
            className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold transition ${
              presetId === p.id
                ? "border-ink bg-ink text-paper"
                : "border-line bg-paper-2 text-ink-55 hover:border-line-strong"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Preset card — same anatomy as the app's settings panel */}
      <div className="space-y-2 rounded-md border border-line bg-card p-3">
        <div className="flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-2">
            <span className="truncate text-sm font-semibold">{name}</span>
            <span className="inline-flex h-5 shrink-0 items-center gap-1 rounded-4xl border border-green-500/30 bg-green-500/10 px-2 text-[10px] font-medium text-green-600">
              <CheckCircle2 className="size-3" />
              {preset.badge}
            </span>
            {preset.tested && (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-green-100 px-1.5 py-0.5 text-[10px] font-medium text-green-700">
                <CheckCircle2 className="size-2.5" />
                Tested
              </span>
            )}
          </div>
          <div className="flex items-center gap-0.5 text-ink-40">
            <Copy className="size-3.5" />
            <Trash2 className="ml-2 size-3.5" />
          </div>
        </div>

        <div className="grid gap-2 md:grid-cols-2">
          <div className="space-y-1">
            <label htmlFor="demo-agent-name" className="text-xs text-ink-70">
              Name
            </label>
            <input
              id="demo-agent-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputCls}
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="demo-agent-binary" className="text-xs text-ink-70">
              Binary
            </label>
            <input
              id="demo-agent-binary"
              value={binary}
              onChange={(e) => setBinary(e.target.value)}
              className={`${inputCls} font-mono`}
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-ink-55">Advanced args</span>
            <button
              type="button"
              role="switch"
              aria-checked={showArgs}
              onClick={() => setShowArgs((s) => !s)}
              className={`relative h-3.5 w-6 rounded-full transition-colors ${showArgs ? "bg-ink" : "bg-ink/20"}`}
            >
              <span
                className={`absolute top-0.5 h-2.5 w-2.5 rounded-full bg-paper shadow transition-transform ${showArgs ? "translate-x-3" : "translate-x-0.5"}`}
              />
            </button>
          </div>
          {showArgs && (
            <div className="space-y-1 pt-1">
              <label htmlFor="demo-agent-args" className="text-xs text-ink-70">
                Args template
              </label>
              <input
                id="demo-agent-args"
                value={args}
                onChange={(e) => setArgs(e.target.value)}
                placeholder="{prompt}"
                className={`${inputCls} font-mono`}
              />
              <p className="text-xs text-ink-40">
                Must contain{" "}
                <code className="font-mono">{"{prompt}"}</code> — replaced with
                the card&apos;s prompt at launch.
              </p>
            </div>
          )}
        </div>

        <div className="pt-1">
          <span className="inline-flex items-center gap-1 text-[11px] text-ink-55">
            <FlaskConical className="size-3" />
            Test command
          </span>
          <p className="mt-1 break-all rounded-md bg-paper-3 px-2 py-1.5 font-mono text-[11px] text-ink-70">
            {testCmd}
          </p>
        </div>
      </div>

      <p className="mt-3 text-center text-[11px] text-ink-40">
        Agent- and LLM-agnostic — any CLI binary, no lock-in.
      </p>
    </div>
  );
}
