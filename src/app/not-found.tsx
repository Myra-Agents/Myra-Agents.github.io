export const metadata = { title: "Not found — Myra Agents" };

export default function NotFound() {
  return (
    <main className="min-h-screen bg-paper text-ink flex flex-col items-center justify-center gap-4 px-5 text-center">
      {/* Black glyph on light, white on dark — CSS swap (no flash). */}
      {/* biome-ignore lint/performance/noImgElement: tiny static logo, avoids next/image dark-swap quirks */}
      <img
        src="/assets/glyph-black.png"
        alt=""
        width={40}
        height={40}
        className="h-10 w-10 rounded-md dark:hidden"
      />
      {/* biome-ignore lint/performance/noImgElement: tiny static logo */}
      <img
        src="/assets/glyph-white.png"
        alt=""
        width={40}
        height={40}
        className="hidden h-10 w-10 rounded-md dark:block"
      />
      <p className="font-serif text-7xl tracking-tight">404</p>
      <p className="text-ink-55">
        This page doesn&apos;t exist. / Cette page n&apos;existe pas.
      </p>
      <a
        href="/"
        className="flex h-8 items-center rounded-full bg-ink px-4 text-sm font-bold text-paper transition hover:opacity-85"
      >
        Back home
      </a>
    </main>
  );
}
