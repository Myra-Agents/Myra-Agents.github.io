"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

/* ─────────────────────────── Theme ─────────────────────────── */

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
} | null>(null);

/* ────────────────────────── Language ────────────────────────── */

export type Lang = "en" | "fr";

const LangContext = createContext<{
  lang: Lang;
  toggle: () => void;
} | null>(null);

/**
 * Inline pre-paint script — set the theme class + <html lang> from
 * localStorage (falling back to the OS preference) before first paint, so
 * there's no flash of the wrong theme.
 */
export const themeInitScript = `
(function () {
  try {
    var t = localStorage.getItem('myra:theme');
    if (!t) t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    if (t === 'dark') document.documentElement.classList.add('dark');
    var l = localStorage.getItem('myra:lang');
    if (l === 'fr' || l === 'en') document.documentElement.lang = l;
  } catch (e) {}
})();
`;

export function Providers({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [lang, setLang] = useState<Lang>("en");

  // Hydrate from what the pre-paint script already applied.
  useEffect(() => {
    setTheme(
      document.documentElement.classList.contains("dark") ? "dark" : "light",
    );
    const l = document.documentElement.lang;
    setLang(l === "fr" ? "fr" : "en");
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      try {
        localStorage.setItem("myra:theme", next);
      } catch {}
      return next;
    });
  }, []);

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === "fr" ? "en" : "fr";
      document.documentElement.lang = next;
      try {
        localStorage.setItem("myra:lang", next);
      } catch {}
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle: toggleTheme }}>
      <LangContext.Provider value={{ lang, toggle: toggleLang }}>
        {children}
      </LangContext.Provider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within Providers");
  return ctx;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within Providers");
  return ctx;
}

/**
 * Widen literal types to their base — so `useT` accepts a COPY object
 * whether or not the caller wrote `as const`. Without this, `T` infers
 * from `en`'s string literals and every `fr` string is rejected.
 */
type Widen<T> = T extends readonly (infer U)[]
  ? Widen<U>[]
  : T extends string
    ? string
    : T extends number
      ? number
      : T extends boolean
        ? boolean
        : T extends object
          ? { -readonly [K in keyof T]: Widen<T[K]> }
          : T;

/**
 * Pick the copy for the active language.
 * Usage: `const t = useT(COPY);` where COPY = { en: {...}, fr: {...} }.
 * `en` drives the shape; `fr` is checked against the widened shape, so
 * both `as const` and plain objects work.
 */
export function useT<T>(copy: { en: T; fr: Widen<T> }): Widen<T> {
  const { lang } = useLang();
  return copy[lang] as Widen<T>;
}
