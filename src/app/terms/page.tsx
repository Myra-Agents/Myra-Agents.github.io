import type { Metadata } from "next";
import { TermsContent } from "@/components/legal/terms";

export const metadata: Metadata = {
  title: "Terms of Use — Myra Agents",
  description:
    "Terms of use for the Myra Agents website: purpose, the open-source MIT application, acceptable use, liability, and governing law.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <TermsContent />;
}
