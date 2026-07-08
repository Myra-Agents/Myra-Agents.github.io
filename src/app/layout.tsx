import type { Metadata } from "next";
import { Lato, Sorts_Mill_Goudy } from "next/font/google";
import Script from "next/script";
import { JsonLd } from "@/components/json-ld";
import { Providers, themeInitScript } from "@/components/providers";
import { OG_IMAGE, SITE_URL } from "@/lib/site";
import "./globals.css";

const lato = Lato({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
});

const goudy = Sorts_Mill_Goudy({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-goudy",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Myra Agents — your AI workforce, running 24/7",
  description:
    "Delegate the repetitive work. Myra Agents puts a whole team of AI agents to work for you — set them up once and they run on their own, on schedule, even while you sleep. Local-first on your own machine, your keys.",
  applicationName: "Myra Agents",
  keywords: [
    "AI agents",
    "automation",
    "local-first",
    "desktop app",
    "OpenCode",
    "Ollama",
    "cron",
  ],
  alternates: { canonical: "/" },
  icons: {
    // Theme-adaptive: black glyph on light browser chrome, white on dark.
    icon: [
      { url: "/assets/glyph-black.png", media: "(prefers-color-scheme: light)" },
      { url: "/assets/glyph-white.png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/assets/apple-touch.png",
  },
  openGraph: {
    type: "website",
    title: "Myra Agents — your AI workforce, running 24/7",
    description:
      "Delegate the repetitive work. Set up your AI agents once and they run on their own, on schedule, even while you sleep. A local-first desktop app — your machine, your keys.",
    url: SITE_URL,
    images: [
      {
        url: OG_IMAGE,
        width: 2800,
        height: 1800,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Myra Agents — your AI workforce, running 24/7",
    description:
      "Delegate the repetitive work. Put a team of AI agents to work for you — running on their own, on schedule, even while you sleep. Local-first, your keys.",
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${lato.variable} ${goudy.variable}`}
    >
      <head>
        {/* Pre-paint: apply theme class + lang before first render (no FOUC). */}
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: tiny inline theme bootstrap
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <JsonLd />
      </head>
      <body>
        <Providers>{children}</Providers>
        {/* id must NOT be "posthog": <script id> becomes window.posthog via
            named access and the snippet would mistake the DOM element for
            its command queue. */}
        <Script id="ph-analytics" strategy="afterInteractive">
          {`if (!window.__myraPosthogLoaded) { window.__myraPosthogLoaded = 1;
!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug getPageViewId captureTraceFeedback captureTraceMetric".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
var MYRA_ENV = /^(localhost|127\\.0\\.0\\.1|\\[::1\\])$/.test(location.hostname) || location.protocol === 'file:' ? 'development' : 'production';
posthog.init('phc_DnmcVLeGQzZKFKUMU5uUvayizSGJpLuwAETHVL6RCpxj', {
  api_host: 'https://eu.i.posthog.com',
  person_profiles: 'identified_only',
  autocapture: true,
  capture_pageview: true,
  capture_exceptions: true,
  enable_recording_console_log: true,
  disable_session_recording: false,
  session_recording: { maskAllInputs: false },
});
posthog.register({ environment: MYRA_ENV, service: 'landing' });
}`}
        </Script>
      </body>
    </html>
  );
}
