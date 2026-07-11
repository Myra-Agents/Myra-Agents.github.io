import type { Metadata } from "next";
import { TemplatesContent } from "@/components/templates-content";

export const metadata: Metadata = {
  title: "Patrol templates — Myra Agents",
  description:
    "Ready-made Myra Agents patrols. Pick a template and open it straight in the desktop app — the patrol editor lands prefilled with its prompt, schedule and tags.",
  alternates: { canonical: "/templates" },
};

export default function TemplatesPage() {
  return <TemplatesContent />;
}
