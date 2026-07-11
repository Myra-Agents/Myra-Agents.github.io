import type { Metadata } from "next";
import { MarketplaceContent } from "@/components/marketplace-content";

export const metadata: Metadata = {
  title: "Skill marketplace — Myra Agents",
  description:
    "Curated skills for Myra Agents — reusable blocks of agent instructions like conventional commits, test-first and self-review. Install one straight into the desktop app and attach it to any patrol.",
  alternates: { canonical: "/marketplace" },
};

export default function MarketplacePage() {
  return <MarketplaceContent />;
}
