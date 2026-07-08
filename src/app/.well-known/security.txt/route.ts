import { SITE_URL } from "@/lib/site";

export function GET() {
  const body = [
    "Contact: mailto:valentin.rudloff.perso@gmail.com",
    "Expires: 2027-07-09T00:00:00.000Z",
    "Preferred-Languages: en, fr",
    `Canonical: ${SITE_URL}/.well-known/security.txt`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
