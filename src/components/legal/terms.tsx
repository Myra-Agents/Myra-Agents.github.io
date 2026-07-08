"use client";

import { useT } from "@/components/providers";
import { LegalSection, LegalShell } from "./shell";

const CONTACT = "contact@myra-agents.com";
const REPO = "https://github.com/Myra-Agents/Myra-Agents";

const COPY = {
  en: {
    title: "Terms of Use",
    updated: "Last updated: 9 July 2026",
    purpose: {
      h: "Purpose of the site",
      p: "This website presents Myra Agents and provides information and download links for the application. By using the Site you agree to these terms.",
    },
    app: {
      h: "The application",
      pPre: "Myra Agents is an open-source application released under the MIT license. Its source code is available on ",
      link: "GitHub",
      pPost: ". The software is provided “as is”, without warranty of any kind, express or implied, as set out in the MIT license.",
    },
    use: {
      h: "Acceptable use",
      p: "You agree to use the Site lawfully and not to disrupt its operation, attempt to gain unauthorized access, or use it in a way that infringes the rights of others.",
    },
    links: {
      h: "External links",
      p: "The Site may link to third-party websites (e.g. GitHub, download hosts). We have no control over their content and accept no responsibility for it.",
    },
    liability: {
      h: "Limitation of liability",
      p: "The Site and its content are provided for information purposes. To the fullest extent permitted by law, we accept no liability for any direct or indirect damage arising from use of the Site or the application.",
    },
    law: {
      h: "Governing law",
      p: "These terms are governed by French law. Any dispute is subject to the jurisdiction of the competent French courts.",
    },
    changes: {
      h: "Changes to these terms",
      p: "We may update these terms at any time. The version in force is the one published on this page, with its last-updated date.",
    },
    contact: {
      h: "Contact",
      p: "For any question about these terms, contact:",
    },
  },
  fr: {
    title: "Conditions générales d'utilisation",
    updated: "Dernière mise à jour : 9 juillet 2026",
    purpose: {
      h: "Objet du site",
      p: "Ce site web présente Myra Agents et fournit des informations et des liens de téléchargement de l'application. En utilisant le Site, vous acceptez les présentes conditions.",
    },
    app: {
      h: "L'application",
      pPre: "Myra Agents est une application open source publiée sous licence MIT. Son code source est disponible sur ",
      link: "GitHub",
      pPost: ". Le logiciel est fourni « en l'état », sans garantie d'aucune sorte, expresse ou implicite, conformément à la licence MIT.",
    },
    use: {
      h: "Usage acceptable",
      p: "Vous vous engagez à utiliser le Site de manière licite et à ne pas perturber son fonctionnement, tenter d'y accéder sans autorisation, ou l'utiliser d'une manière portant atteinte aux droits d'autrui.",
    },
    links: {
      h: "Liens externes",
      p: "Le Site peut renvoyer vers des sites tiers (par exemple GitHub, hébergeurs de téléchargement). Nous n'avons aucun contrôle sur leur contenu et déclinons toute responsabilité à leur égard.",
    },
    liability: {
      h: "Limitation de responsabilité",
      p: "Le Site et son contenu sont fournis à titre d'information. Dans toute la mesure permise par la loi, nous déclinons toute responsabilité pour tout dommage direct ou indirect résultant de l'utilisation du Site ou de l'application.",
    },
    law: {
      h: "Droit applicable",
      p: "Les présentes conditions sont régies par le droit français. Tout litige relève de la compétence des tribunaux français compétents.",
    },
    changes: {
      h: "Modification des conditions",
      p: "Nous pouvons modifier ces conditions à tout moment. La version en vigueur est celle publiée sur cette page, avec sa date de dernière mise à jour.",
    },
    contact: {
      h: "Contact",
      p: "Pour toute question sur ces conditions, contactez :",
    },
  },
} as const;

export function TermsContent() {
  const t = useT(COPY);

  return (
    <LegalShell title={t.title} updated={t.updated}>
      <LegalSection heading={t.purpose.h}>
        <p>{t.purpose.p}</p>
      </LegalSection>

      <LegalSection heading={t.app.h}>
        <p>
          {t.app.pPre}
          <a href={REPO} className="text-accent hover:opacity-80">
            {t.app.link}
          </a>
          {t.app.pPost}
        </p>
      </LegalSection>

      <LegalSection heading={t.use.h}>
        <p>{t.use.p}</p>
      </LegalSection>

      <LegalSection heading={t.links.h}>
        <p>{t.links.p}</p>
      </LegalSection>

      <LegalSection heading={t.liability.h}>
        <p>{t.liability.p}</p>
      </LegalSection>

      <LegalSection heading={t.law.h}>
        <p>{t.law.p}</p>
      </LegalSection>

      <LegalSection heading={t.changes.h}>
        <p>{t.changes.p}</p>
      </LegalSection>

      <LegalSection heading={t.contact.h}>
        <p>
          {t.contact.p}{" "}
          <a href={`mailto:${CONTACT}`} className="text-accent hover:opacity-80">
            {CONTACT}
          </a>
        </p>
      </LegalSection>
    </LegalShell>
  );
}
