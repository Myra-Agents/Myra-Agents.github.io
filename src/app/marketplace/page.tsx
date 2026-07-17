import type { Metadata } from "next";
import { MarketplaceContent } from "@/components/marketplace-content";
import { getMarketplaceSkills } from "@/lib/marketplace";

export const metadata: Metadata = {
  title: "Skill marketplace — Myra Agents",
  description:
    "Curated skills for Myra Agents — reusable blocks of agent instructions like conventional commits, test-first and self-review. Install one straight into the desktop app and attach it to any patrol.",
  alternates: { canonical: "/marketplace" },
};

// Static page baked at build time from the marketplace repo's catalog.json.
// A rebuild (fired by that repo's CI when a skill is added) refreshes it.
export const dynamic = "force-static";

export default async function MarketplacePage() {
  const skills = await getMarketplaceSkills();
  return <MarketplaceContent skills={skills} />;
}
