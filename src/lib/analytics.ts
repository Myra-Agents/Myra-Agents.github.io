// Shared helper for firing custom PostHog events from client components.
// PostHog itself is loaded as a raw <script> snippet in src/app/layout.tsx
// (no posthog-js package is installed), so `window.posthog` is the only
// surface — mirrors the minimal-shape pattern already used by
// src/components/consent-banner.tsx.

/** Minimal shape of the PostHog client we touch for custom capture calls. */
type PostHog = {
  capture?: (event: string, properties?: Record<string, unknown>) => void;
};

function getPosthog(): PostHog | undefined {
  return (window as unknown as { posthog?: PostHog }).posthog;
}

/**
 * Fire a custom PostHog event. Safe no-op if PostHog hasn't loaded yet (ad
 * blocker, opt-out, or a race on first paint) — analytics must never break
 * the UI.
 */
export function capture(event: string, properties?: Record<string, unknown>) {
  try {
    getPosthog()?.capture?.(event, properties);
  } catch {
    /* ignore */
  }
}
