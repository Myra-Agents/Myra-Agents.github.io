"use client";

import { reopenConsent } from "@/components/consent-banner";
import { useT } from "@/components/providers";
import { LegalSection, LegalShell } from "./shell";

const CNIL = "https://www.cnil.fr";
const CONTACT = "valentin.rudloff.perso@gmail.com";

const COPY = {
  en: {
    title: "Privacy Policy",
    updated: "Last updated: 9 July 2026",
    controller: {
      h: "Who is responsible for your data",
      p1: "This website (the “Site”) is published by Leaptech, and its data controller within the meaning of the GDPR is Leaptech, represented by Valentin Rudloff (publication director).",
      p2: "For any question about this policy or your personal data, contact:",
    },
    scope: {
      h: "Scope",
      p: "The Site is a showcase for Myra Agents, a separate open-source (MIT) desktop application. The Site itself does not process your personal data beyond the analytics described below. The desktop app runs locally on your own machine and is not covered by this policy.",
    },
    collected: {
      h: "Data we collect",
      p: "With your consent, our analytics provider collects the following via cookies and local storage:",
      items: [
        "Page views and navigation",
        "Autocaptured interactions (clicks and other UI events)",
        "Session recordings / replay of your visit",
        "Console logs and JavaScript exceptions/errors",
        "Approximate location derived from your IP address",
        "Device and browser information (type, OS, screen, language)",
      ],
    },
    purposes: {
      h: "Why we collect it",
      p: "To understand how the Site is used, measure audience, diagnose errors, and improve the product and the pages.",
    },
    basis: {
      h: "Legal basis",
      p: "Consent (Article 6(1)(a) GDPR). No analytics is collected until you accept via the consent banner, and you can withdraw your consent at any time.",
    },
    processors: {
      h: "Processors and hosting",
      items: [
        "PostHog — product analytics, EU-hosted (eu.i.posthog.com). Processes the data listed above on our behalf.",
        "Vercel Inc. — hosting of the Site (340 S Lemon Ave #4133, Walnut, CA 91789, USA).",
      ],
    },
    transfers: {
      h: "International transfers",
      p: "Analytics data is stored in the EU. The Site is hosted by Vercel Inc., a US company; where hosting-related data (such as connection logs) is transferred outside the EU, it is governed by appropriate safeguards (e.g. the EU Standard Contractual Clauses).",
    },
    retention: {
      h: "Retention",
      p: "Analytics data is retained for the period configured with our provider and no longer than necessary for the purposes above. Your consent choice is stored in your browser until you clear it or change it.",
    },
    cookies: {
      h: "Cookies and local storage",
      p: "Analytics relies on cookies and browser local storage set only after you accept. A small technical entry stores your consent choice so we don't ask again on every visit; it is not used for tracking.",
    },
    rights: {
      h: "Your rights",
      p: "Under the GDPR you have the right to access, rectification, erasure, restriction, portability, and objection, as well as the right to withdraw your consent at any time. To exercise them, contact us at the address above.",
      cnilPre: "You also have the right to lodge a complaint with the CNIL (",
      cnilPost: ").",
    },
    withdraw: {
      h: "Withdraw or change your consent",
      pPre: "You can change your choice at any time: ",
      button: "reopen the consent banner",
      pPost: ". Refusing stops all analytics collection.",
    },
  },
  fr: {
    title: "Politique de confidentialité",
    updated: "Dernière mise à jour : 9 juillet 2026",
    controller: {
      h: "Qui est responsable de vos données",
      p1: "Ce site web (le « Site ») est édité par Leaptech, et son responsable de traitement au sens du RGPD est Leaptech, représenté par Valentin Rudloff (directeur de la publication).",
      p2: "Pour toute question sur cette politique ou vos données personnelles, contactez :",
    },
    scope: {
      h: "Périmètre",
      p: "Le Site est la vitrine de Myra Agents, une application de bureau open source (MIT) distincte. Le Site lui-même ne traite pas vos données personnelles au-delà des analyses décrites ci-dessous. L'application de bureau s'exécute localement sur votre propre machine et n'est pas couverte par cette politique.",
    },
    collected: {
      h: "Données que nous collectons",
      p: "Avec votre consentement, notre prestataire d'analyse collecte les éléments suivants via cookies et stockage local :",
      items: [
        "Pages vues et navigation",
        "Interactions capturées automatiquement (clics et autres événements d'interface)",
        "Enregistrements / relecture de votre session",
        "Journaux de console et exceptions/erreurs JavaScript",
        "Localisation approximative déduite de votre adresse IP",
        "Informations sur l'appareil et le navigateur (type, OS, écran, langue)",
      ],
    },
    purposes: {
      h: "Pourquoi nous les collectons",
      p: "Pour comprendre l'usage du Site, mesurer l'audience, diagnostiquer les erreurs, et améliorer le produit et les pages.",
    },
    basis: {
      h: "Base légale",
      p: "Le consentement (article 6.1.a du RGPD). Aucune analyse n'est collectée avant votre acceptation via la bannière de consentement, et vous pouvez retirer votre consentement à tout moment.",
    },
    processors: {
      h: "Sous-traitants et hébergement",
      items: [
        "PostHog — analyse produit, hébergé dans l'UE (eu.i.posthog.com). Traite les données listées ci-dessus pour notre compte.",
        "Vercel Inc. — hébergement du Site (340 S Lemon Ave #4133, Walnut, CA 91789, USA).",
      ],
    },
    transfers: {
      h: "Transferts internationaux",
      p: "Les données d'analyse sont stockées dans l'UE. Le Site est hébergé par Vercel Inc., société américaine ; lorsque des données liées à l'hébergement (par exemple des journaux de connexion) sont transférées hors de l'UE, elles sont encadrées par des garanties appropriées (par exemple les Clauses Contractuelles Types de l'UE).",
    },
    retention: {
      h: "Conservation",
      p: "Les données d'analyse sont conservées pour la durée configurée chez notre prestataire et pas plus longtemps que nécessaire aux finalités ci-dessus. Votre choix de consentement est stocké dans votre navigateur jusqu'à ce que vous l'effaciez ou le modifiiez.",
    },
    cookies: {
      h: "Cookies et stockage local",
      p: "Les analyses reposent sur des cookies et le stockage local du navigateur, déposés uniquement après votre acceptation. Une petite entrée technique conserve votre choix de consentement pour ne pas vous le redemander à chaque visite ; elle n'est pas utilisée à des fins de suivi.",
    },
    rights: {
      h: "Vos droits",
      p: "En vertu du RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, de portabilité et d'opposition, ainsi que du droit de retirer votre consentement à tout moment. Pour les exercer, contactez-nous à l'adresse ci-dessus.",
      cnilPre: "Vous avez également le droit d'introduire une réclamation auprès de la CNIL (",
      cnilPost: ").",
    },
    withdraw: {
      h: "Retirer ou modifier votre consentement",
      pPre: "Vous pouvez modifier votre choix à tout moment : ",
      button: "rouvrir la bannière de consentement",
      pPost: ". Le refus arrête toute collecte d'analyse.",
    },
  },
};

export function PrivacyContent() {
  const t = useT(COPY);

  return (
    <LegalShell title={t.title} updated={t.updated}>
      <LegalSection heading={t.controller.h}>
        <p>{t.controller.p1}</p>
        <p>
          {t.controller.p2}{" "}
          <a href={`mailto:${CONTACT}`} className="text-accent hover:opacity-80">
            {CONTACT}
          </a>
        </p>
      </LegalSection>

      <LegalSection heading={t.scope.h}>
        <p>{t.scope.p}</p>
      </LegalSection>

      <LegalSection heading={t.collected.h}>
        <p>{t.collected.p}</p>
        <ul className="list-disc pl-5">
          {t.collected.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      </LegalSection>

      <LegalSection heading={t.purposes.h}>
        <p>{t.purposes.p}</p>
      </LegalSection>

      <LegalSection heading={t.basis.h}>
        <p>{t.basis.p}</p>
      </LegalSection>

      <LegalSection heading={t.processors.h}>
        <ul className="list-disc pl-5">
          {t.processors.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      </LegalSection>

      <LegalSection heading={t.transfers.h}>
        <p>{t.transfers.p}</p>
      </LegalSection>

      <LegalSection heading={t.retention.h}>
        <p>{t.retention.p}</p>
      </LegalSection>

      <LegalSection heading={t.cookies.h}>
        <p>{t.cookies.p}</p>
      </LegalSection>

      <LegalSection heading={t.rights.h}>
        <p>{t.rights.p}</p>
        <p>
          {t.rights.cnilPre}
          <a href={CNIL} className="text-accent hover:opacity-80">
            www.cnil.fr
          </a>
          {t.rights.cnilPost}
        </p>
      </LegalSection>

      <LegalSection heading={t.withdraw.h}>
        <p>
          {t.withdraw.pPre}
          <button
            type="button"
            onClick={reopenConsent}
            className="font-bold text-accent underline hover:opacity-80"
          >
            {t.withdraw.button}
          </button>
          {t.withdraw.pPost}
        </p>
      </LegalSection>
    </LegalShell>
  );
}
