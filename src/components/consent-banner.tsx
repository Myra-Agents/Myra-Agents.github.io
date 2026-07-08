"use client";

import { useEffect, useState } from "react";
import { useT } from "./providers";

const STORAGE_KEY = "myra:consent";

type Consent = "granted" | "denied";

/** Minimal shape of the PostHog client we touch from the banner. */
type PostHog = {
  opt_in_capturing?: () => void;
  opt_out_capturing?: () => void;
  startSessionRecording?: () => void;
};

function getPosthog(): PostHog | undefined {
  return (window as unknown as { posthog?: PostHog }).posthog;
}

function readStored(): Consent | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

/** Clear the stored choice and reload so the banner is shown again. */
export function reopenConsent() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
  location.reload();
}

const COPY = {
  en: {
    text: "We use analytics (PostHog) to understand how the site is used — including session recordings. Nothing is collected until you accept.",
    learn: "Privacy Policy",
    accept: "Accept",
    refuse: "Refuse",
    label: "Cookie consent",
  },
  fr: {
    text: "Nous utilisons des analyses (PostHog) pour comprendre l'usage du site — y compris des enregistrements de session. Rien n'est collecté avant votre acceptation.",
    learn: "Politique de confidentialité",
    accept: "Accepter",
    refuse: "Refuser",
    label: "Consentement aux cookies",
  },
} as const;

export function ConsentBanner() {
  const t = useT(COPY);
  const [visible, setVisible] = useState(false);

  // On mount, reconcile the stored choice with PostHog. PostHog is configured
  // to start opted-OUT each load, so a stored "granted" must proactively opt in
  // and (re)start session recording; "denied" re-asserts opt-out; null shows
  // the banner.
  useEffect(() => {
    const stored = readStored();
    const ph = getPosthog();
    if (stored === "granted") {
      ph?.opt_in_capturing?.();
      ph?.startSessionRecording?.();
    } else if (stored === "denied") {
      ph?.opt_out_capturing?.();
    } else {
      setVisible(true);
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, "granted");
    } catch {}
    const ph = getPosthog();
    ph?.opt_in_capturing?.();
    ph?.startSessionRecording?.();
    setVisible(false);
  }

  function refuse() {
    try {
      localStorage.setItem(STORAGE_KEY, "denied");
    } catch {}
    getPosthog()?.opt_out_capturing?.();
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={t.label}
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-line bg-paper p-5 shadow-[0_20px_60px_-20px_rgb(38_37_30_/_0.45)] sm:flex-row sm:items-center">
        <p className="flex-1 text-sm leading-relaxed text-ink-70">
          {t.text}{" "}
          <a href="/privacy" className="font-bold text-accent hover:opacity-80">
            {t.learn}
          </a>
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={refuse}
            className="rounded-full border border-line px-4 py-2 text-sm font-bold text-ink-70 transition hover:text-ink"
          >
            {t.refuse}
          </button>
          <button
            type="button"
            onClick={accept}
            className="rounded-full bg-ink px-4 py-2 text-sm font-bold text-paper transition hover:opacity-85"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
