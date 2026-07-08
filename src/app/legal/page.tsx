import type { Metadata } from "next";
import { LegalNoticeContent } from "@/components/legal/legal-notice";

export const metadata: Metadata = {
  title: "Legal notice — Myra Agents",
  description:
    "Legal notice for the Myra Agents website: publisher, publication director, host, and intellectual property.",
  alternates: { canonical: "/legal" },
};

export default function LegalPage() {
  return <LegalNoticeContent />;
}
