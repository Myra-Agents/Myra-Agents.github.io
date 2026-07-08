import type { Metadata } from "next";
import { PrivacyContent } from "@/components/legal/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy — Myra Agents",
  description:
    "How the Myra Agents website handles personal data: consent-based analytics, your rights under the GDPR, and how to withdraw consent.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
