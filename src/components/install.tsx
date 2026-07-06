"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { useT } from "@/components/providers";

/**
 * Prebuilt downloads. Detects the visitor's OS/arch and upgrades all links
 * to the latest GitHub release (static v0.3.0 fallback if the API is
 * unreachable).
 */

type Copy = {
  heading: string;
  subheading: string;
  otherBuildsBelow: string;
  downloadFor: Record<string, string>;
  see: string;
  allReleases: string;
};

const COPY: { en: Copy; fr: Copy } = {
  en: {
    heading: "Download the app",
    subheading: "Grab the prebuilt build for your platform.",
    otherBuildsBelow: "other builds below",
    downloadFor: {
      "mac-arm": "Download for macOS",
      "mac-x64": "Download for macOS",
      win: "Download for Windows",
      linux: "Download for Linux",
    },
    see: "see",
    allReleases: "all releases",
  },
  fr: {
    heading: "Téléchargez l'application",
    subheading: "Récupérez le build prêt à l'emploi pour votre plateforme.",
    otherBuildsBelow: "autres builds ci-dessous",
    downloadFor: {
      "mac-arm": "Télécharger pour macOS",
      "mac-x64": "Télécharger pour macOS",
      win: "Télécharger pour Windows",
      linux: "Télécharger pour Linux",
    },
    see: "voir",
    allReleases: "toutes les versions",
  },
};

const FALLBACK_BASE =
  "https://github.com/Myra-Agents/Myra-Agents/releases/download/v0.3.0/";
const SUFFIX_FILE: Record<string, string> = {
  "_aarch64.dmg": "Myra.Agents_0.3.0_aarch64.dmg",
  "_x64.dmg": "Myra.Agents_0.3.0_x64.dmg",
  "_x64-setup.exe": "Myra.Agents_0.3.0_x64-setup.exe",
  "_x64_en-US.msi": "Myra.Agents_0.3.0_x64_en-US.msi",
  "_amd64.AppImage": "Myra.Agents_0.3.0_amd64.AppImage",
  "_amd64.deb": "Myra.Agents_0.3.0_amd64.deb",
  ".x86_64.rpm": "Myra.Agents-0.3.0-1.x86_64.rpm",
};
const KEY_SUFFIX: Record<string, string> = {
  "mac-arm": "_aarch64.dmg",
  "mac-x64": "_x64.dmg",
  win: "_x64-setup.exe",
  linux: "_amd64.AppImage",
};
const LABEL: Record<string, [string, string]> = {
  "mac-arm": ["Download for macOS", "Apple Silicon · .dmg"],
  "mac-x64": ["Download for macOS", "Intel · .dmg"],
  win: ["Download for Windows", "x64 · .exe installer"],
  linux: ["Download for Linux", "x64 · AppImage"],
};

async function detectPlatform(): Promise<string | null> {
  const nav = navigator as Navigator & {
    userAgentData?: {
      getHighEntropyValues?: (
        hints: string[],
      ) => Promise<{ platform?: string; architecture?: string }>;
    };
  };
  if (nav.userAgentData?.getHighEntropyValues) {
    try {
      const hi = await nav.userAgentData.getHighEntropyValues([
        "platform",
        "architecture",
      ]);
      const plat = (hi.platform ?? "").toLowerCase();
      const arch = (hi.architecture ?? "").toLowerCase();
      if (plat.includes("mac")) return arch === "arm" ? "mac-arm" : "mac-x64";
      if (plat.includes("win")) return "win";
      if (plat.includes("linux") || plat.includes("chrome os")) return "linux";
    } catch {
      /* fall through to UA sniff */
    }
  }
  const ua = navigator.userAgent;
  if (/Windows/i.test(ua)) return "win";
  if (/Mac OS X|Macintosh/i.test(ua)) return "mac-arm";
  if (/Linux|X11|CrOS/i.test(ua) && !/Android/i.test(ua)) return "linux";
  return null;
}

export function Install() {
  const t = useT(COPY);
  const [urls, setUrls] = useState<Record<string, string>>(() => {
    const seed: Record<string, string> = {};
    for (const s in SUFFIX_FILE) seed[s] = FALLBACK_BASE + SUFFIX_FILE[s];
    return seed;
  });
  const [version, setVersion] = useState("v0.3.0");
  const [platform, setPlatform] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(
          "https://api.github.com/repos/Myra-Agents/Myra-Agents/releases/latest",
          { headers: { Accept: "application/vnd.github+json" } },
        );
        if (r.ok) {
          const rel = await r.json();
          const assets: { name: string; browser_download_url: string }[] =
            rel.assets ?? [];
          setUrls((prev) => {
            const next = { ...prev };
            for (const s in SUFFIX_FILE) {
              const a = assets.find((x) => x.name.endsWith(s));
              if (a) next[s] = a.browser_download_url;
            }
            return next;
          });
          if (rel.tag_name) setVersion(rel.tag_name);
        }
      } catch {
        /* keep fallback links */
      }
      setPlatform(await detectPlatform());
    })();
  }, []);

  const osCard = platform?.startsWith("mac") ? "mac" : platform;
  const dlBtn =
    "flex items-center justify-center rounded-lg bg-ink px-4 py-2.5 text-sm font-bold text-paper transition hover:opacity-85";
  const dlBtnGhost =
    "flex items-center justify-center rounded-lg border border-line px-4 py-2.5 text-sm font-semibold text-ink-70 transition hover:bg-paper-2";

  return (
    <section id="install" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          {t.heading}
        </h2>
        <p className="mt-4 text-lg text-ink-55">{t.subheading}</p>
      </div>

      <div className="mx-auto mt-10 max-w-3xl text-center">
        {platform && (
          <div>
            <a
              href={urls[KEY_SUFFIX[platform]]}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-base font-bold text-white shadow-sm transition hover:opacity-90"
            >
              <Download className="h-5 w-5" />
              {t.downloadFor[platform]}
            </a>
            <p className="mt-2 text-xs text-ink-40">
              {LABEL[platform][1]} · {t.otherBuildsBelow}
            </p>
          </div>
        )}

        <div className="mt-6 grid gap-5 text-left sm:grid-cols-3">
          <div
            className={`rounded-2xl bg-card p-5 ring-1 transition ${osCard === "mac" ? "ring-2 ring-accent" : "ring-line"}`}
          >
            <div className="text-sm font-bold">macOS</div>
            <div className="mt-3 flex flex-col gap-2">
              <a href={urls["_aarch64.dmg"]} className={dlBtn}>
                Apple&nbsp;Silicon&nbsp;· .dmg
              </a>
              <a href={urls["_x64.dmg"]} className={dlBtnGhost}>
                Intel&nbsp;· .dmg
              </a>
            </div>
          </div>
          <div
            className={`rounded-2xl bg-card p-5 ring-1 transition ${osCard === "win" ? "ring-2 ring-accent" : "ring-line"}`}
          >
            <div className="text-sm font-bold">Windows</div>
            <div className="mt-3 flex flex-col gap-2">
              <a href={urls["_x64-setup.exe"]} className={dlBtn}>
                x64&nbsp;· .exe
              </a>
              <a href={urls["_x64_en-US.msi"]} className={dlBtnGhost}>
                x64&nbsp;· .msi
              </a>
            </div>
          </div>
          <div
            className={`rounded-2xl bg-card p-5 ring-1 transition ${osCard === "linux" ? "ring-2 ring-accent" : "ring-line"}`}
          >
            <div className="text-sm font-bold">Linux</div>
            <div className="mt-3 flex flex-col gap-2">
              <a href={urls["_amd64.AppImage"]} className={dlBtn}>
                x64&nbsp;· AppImage
              </a>
              <div className="flex gap-2">
                <a href={urls["_amd64.deb"]} className={`${dlBtnGhost} flex-1`}>
                  .deb
                </a>
                <a
                  href={urls[".x86_64.rpm"]}
                  className={`${dlBtnGhost} flex-1`}
                >
                  .rpm
                </a>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-5 text-sm text-ink-40">
          {version} · {t.see}{" "}
          <a
            href="https://github.com/Myra-Agents/Myra-Agents/releases/latest"
            className="underline hover:text-ink-70"
          >
            {t.allReleases}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
