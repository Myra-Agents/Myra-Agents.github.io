"use client";

import { useEffect, useRef, useState } from "react";

/**
 * True once the element has been at least `fraction` visible in the
 * viewport. Rect-checked on scroll/resize (plus an initial check) rather
 * than IntersectionObserver, so it also works in throttled/headless
 * webviews where IO callbacks never fire.
 */
export function useInView<T extends HTMLElement>(fraction = 0.35) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView) return;
    const check = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.height === 0) return;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // Degenerate/headless viewports report height 0 — just play.
      if (!vh) {
        setInView(true);
        return;
      }
      const visible = Math.min(r.bottom, vh) - Math.max(r.top, 0);
      if (visible / Math.min(r.height, vh) >= fraction) setInView(true);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    const iv = setInterval(check, 800); // safety net for programmatic jumps
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      clearInterval(iv);
    };
  }, [inView, fraction]);

  return { ref, inView };
}
