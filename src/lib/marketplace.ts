// Build-time loader for the skill marketplace catalog.
//
// The catalog is owned by the `Myra-Agents/marketplace` repo: skills live as
// `skills/<slug>/SKILL.md` and a script parses them into `catalog.json`. We
// fetch that generated file at **build time** so a rebuild of the landing site
// (triggered by the marketplace repo's CI when a skill is added) picks up the
// new catalog. Between builds the page is fully static.
//
// If the fetch fails (network, repo unavailable) we fall back to a small
// bundled snapshot so a deploy never breaks — the next successful build
// reconciles it with the live catalog.

/** One marketplace card. Mirrors the app's `MarketplaceSkill` (sans `content`). */
export interface MarketplaceCard {
  id: string;
  name: string;
  description: string;
  category: string;
  author: string;
  /** Emoji shown on the card. */
  icon: string;
  tags: string[];
}

const CATALOG_URL =
  process.env.MARKETPLACE_CATALOG_URL ??
  "https://raw.githubusercontent.com/Myra-Agents/marketplace/main/catalog.json";

/** Bundled fallback — keeps the build green if the live catalog is unreachable. */
const FALLBACK: MarketplaceCard[] = [
  {
    id: "mk-conventional-commits",
    name: "Conventional Commits",
    description: "Write commits that follow the Conventional Commits spec.",
    category: "Git",
    author: "Myra",
    icon: "📝",
    tags: ["git", "commits"],
  },
];

function isCard(value: unknown): value is MarketplaceCard {
  const c = value as MarketplaceCard;
  return (
    !!c &&
    typeof c.id === "string" &&
    typeof c.name === "string" &&
    typeof c.description === "string" &&
    typeof c.category === "string" &&
    typeof c.author === "string" &&
    typeof c.icon === "string" &&
    Array.isArray(c.tags)
  );
}

/**
 * Fetch and validate the marketplace catalog at build time. Always returns a
 * non-empty list — falls back to the bundled snapshot on any failure.
 */
export async function getMarketplaceSkills(): Promise<MarketplaceCard[]> {
  try {
    const res = await fetch(CATALOG_URL, { cache: "force-cache" });
    if (!res.ok) throw new Error(`catalog fetch ${res.status}`);
    const data = await res.json();
    const cards = (Array.isArray(data) ? data : []).filter(isCard);
    return cards.length > 0 ? cards : FALLBACK;
  } catch (err) {
    console.warn(`[marketplace] using fallback catalog: ${(err as Error).message}`);
    return FALLBACK;
  }
}
