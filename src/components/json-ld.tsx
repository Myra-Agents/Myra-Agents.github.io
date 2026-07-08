import { SITE_NAME, SITE_URL } from "@/lib/site";

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  url: SITE_URL,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "macOS, Windows, Linux",
  offers: {
    "@type": "Offer",
    price: 0,
    priceCurrency: "USD",
  },
  description:
    "Delegate the repetitive work. Myra Agents puts a whole team of AI agents to work for you — set them up once and they run on their own, on schedule, even while you sleep. Local-first on your own machine, your keys.",
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD structured data
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
