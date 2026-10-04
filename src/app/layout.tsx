import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { PROFILE, EXPERIENCE, SKILLS, EDUCATION } from "@/lib/profile";
import { JsonLd } from "@/components/ui/JsonLd";
import { CursorGlow } from "@/components/layout/CursorGlow";
import { Navbar, Shell } from "@/components/layout/Shell";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const grotesk = Space_Grotesk({ variable: "--font-grotesk", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

const TITLE = `${PROFILE.name} — ${PROFILE.role} | Python, ML, LLMs`;
const DESC = `${PROFILE.name} is a ${PROFILE.role} from ${PROFILE.location} building AI assistants, ML models, production dashboards and automation with Python, Django, SQL and LLMs. Founder of Nexvorta.`;

export const metadata: Metadata = {
  metadataBase: new URL(PROFILE.url),
  title: { default: TITLE, template: `%s · ${PROFILE.name}` },
  description: DESC,
  keywords: [
    "Mohit Sharma", "Mohit Sharma data scientist", "ML engineer India", "data scientist Rajasthan", "Python developer Alwar",
    "LLM developer", "Django developer", "AI engineer portfolio", "Nexvorta founder",
  ],
  authors: [{ name: PROFILE.name, url: PROFILE.url }],
  creator: PROFILE.name,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: { type: "profile", firstName: "Mohit", lastName: "Sharma", url: PROFILE.url, siteName: PROFILE.name, title: TITLE, description: DESC, locale: "en_IN" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
};

export const viewport: Viewport = { themeColor: "#060607" };

const personLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: PROFILE.name,
    jobTitle: PROFILE.role,
    description: PROFILE.summary,
    url: PROFILE.url,
    image: `${PROFILE.url}${PROFILE.photo}`,
    email: `mailto:${PROFILE.email}`,
    telephone: "+917014028949",
    address: { "@type": "PostalAddress", addressLocality: "Alwar", addressRegion: "Rajasthan", addressCountry: "IN" },
    sameAs: [PROFILE.social.github, PROFILE.social.linkedin],
    worksFor: [
      { "@type": "Organization", name: "SSB Engineers Pvt. Ltd." },
      { "@type": "Organization", name: "Nexvorta" },
    ],
    alumniOf: { "@type": "CollegeOrUniversity", name: EDUCATION[0].org },
    knowsAbout: SKILLS.flatMap((g) => g.items.map((i) => i.name)),
    hasOccupation: EXPERIENCE.slice(1).map((e) => ({ "@type": "Occupation", name: e.role })),
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${grotesk.variable} ${mono.variable}`}>
      <body className="min-h-screen">
        <JsonLd data={personLd} />
        <Shell>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-bg">
            Skip to content
          </a>
          <CursorGlow />
          <Navbar />
          <main id="main" className="relative z-[1]">{children}</main>
        </Shell>
        <div className="noise" aria-hidden="true" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
