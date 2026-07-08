"use client";

import { useT } from "@/components/providers";
import { LegalSection, LegalShell } from "./shell";

const CONTACT = "contact@myra-agents.com";

const ADDRESS = "22 avenue de l'Orangerie, 95800 Cergy, France";
const SIRET = "800 298 739 00023";

const COPY = {
  en: {
    title: "Legal notice",
    updated: "Last updated: 9 July 2026",
    publisher: {
      h: "Publisher",
      lines: [
        "This website is published by Leaptech.",
        "Registered office:",
        "SIRET / registration:",
        "Country: France",
      ],
      repLabel: "Represented by / publication director:",
      rep: "Valentin Rudloff",
      contactLabel: "Contact:",
    },
    host: {
      h: "Host",
      p: "The website is hosted by Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.",
    },
    ip: {
      h: "Intellectual property",
      p: "The Myra Agents name, logo and the content of this website are protected. The Myra Agents desktop application is open source under the MIT license; its source code is governed by that license. Any other reproduction of the website's content without permission is prohibited.",
    },
    privacy: {
      h: "Personal data",
      pPre: "The processing of personal data on this website is described in our ",
      link: "Privacy Policy",
      pPost: ".",
    },
    contact: {
      h: "Contact",
      p: "For any request regarding this website, contact:",
    },
  },
  fr: {
    title: "Mentions légales",
    updated: "Dernière mise à jour : 9 juillet 2026",
    publisher: {
      h: "Éditeur",
      lines: [
        "Ce site web est édité par Leaptech.",
        "Siège social :",
        "SIRET / immatriculation :",
        "Pays : France",
      ],
      repLabel: "Représenté par / directeur de la publication :",
      rep: "Valentin Rudloff",
      contactLabel: "Contact :",
    },
    host: {
      h: "Hébergeur",
      p: "Le site web est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.",
    },
    ip: {
      h: "Propriété intellectuelle",
      p: "Le nom Myra Agents, le logo et le contenu de ce site web sont protégés. L'application de bureau Myra Agents est open source sous licence MIT ; son code source est régi par cette licence. Toute autre reproduction du contenu du site sans autorisation est interdite.",
    },
    privacy: {
      h: "Données personnelles",
      pPre: "Le traitement des données personnelles sur ce site est décrit dans notre ",
      link: "politique de confidentialité",
      pPost: ".",
    },
    contact: {
      h: "Contact",
      p: "Pour toute demande concernant ce site web, contactez :",
    },
  },
};

export function LegalNoticeContent() {
  const t = useT(COPY);

  return (
    <LegalShell title={t.title} updated={t.updated}>
      <LegalSection heading={t.publisher.h}>
        <p>{t.publisher.lines[0]}</p>
        <p>
          {t.publisher.lines[1]} {ADDRESS}
        </p>
        <p>
          {t.publisher.lines[2]} {SIRET}
        </p>
        <p>{t.publisher.lines[3]}</p>
        <p>
          {t.publisher.repLabel} {t.publisher.rep}
        </p>
        <p>
          {t.publisher.contactLabel}{" "}
          <a href={`mailto:${CONTACT}`} className="text-accent hover:opacity-80">
            {CONTACT}
          </a>
        </p>
      </LegalSection>

      <LegalSection heading={t.host.h}>
        <p>
          {t.host.p}{" "}
          <a href="https://vercel.com" className="text-accent hover:opacity-80">
            vercel.com
          </a>
        </p>
      </LegalSection>

      <LegalSection heading={t.ip.h}>
        <p>{t.ip.p}</p>
      </LegalSection>

      <LegalSection heading={t.privacy.h}>
        <p>
          {t.privacy.pPre}
          <a href="/privacy" className="text-accent hover:opacity-80">
            {t.privacy.link}
          </a>
          {t.privacy.pPost}
        </p>
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
