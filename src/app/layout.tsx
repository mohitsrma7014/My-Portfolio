import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { PROFILE } from "@/lib/profile";
import { siteLd } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { CursorGlow } from "@/components/layout/CursorGlow";
import { Navbar, Shell } from "@/components/layout/Shell";
import { Footer } from "@/components/sections/Contact";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const grotesk = Space_Grotesk({ variable: "--font-grotesk", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

const TITLE = `${PROFILE.name} — Data Scientist & ML Engineer | Python, AI & LLM Developer`;
const DESC = `${PROFILE.name} — Data Scientist & ML Engineer from Alwar, India. I build AI assistants, RAG chatbots, ML models and production dashboards with Python, Django and LLMs.`;

export const metadata: Metadata = {
  metadataBase: new URL(PROFILE.url),
  title: { default: TITLE, template: `%s · ${PROFILE.name}` },
  description: DESC,
  applicationName: `${PROFILE.name} Portfolio`,
  keywords: [
    "Mohit Sharma", "Mohit Sharma portfolio", "Mohit Sharma data scientist", "Mohit Sharma ML engineer", "mohitsrma",
    "data scientist India", "machine learning engineer India", "AI engineer Rajasthan", "Python developer Alwar",
    "LLM developer", "RAG chatbot developer", "Django developer", "data scientist portfolio", "Nexvorta founder",
  ],
  authors: [{ name: PROFILE.name, url: PROFILE.url }],
  creator: PROFILE.name,
  publisher: PROFILE.name,
  category: "technology",
  formatDetection: { telephone: true, email: true },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "profile",
    firstName: "Mohit",
    lastName: "Sharma",
    username: "mohitsrma",
    url: PROFILE.url,
    siteName: PROFILE.name,
    title: TITLE,
    description: DESC,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } : undefined,
  },
  other: { "geo.region": "IN-RJ", "geo.placename": "Alwar" },
};

export const viewport: Viewport = { themeColor: "#060607", colorScheme: "dark" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${grotesk.variable} ${mono.variable}`}>
      <head>
        <link rel="me" href={PROFILE.social.github} />
        <link rel="me" href={PROFILE.social.linkedin} />
      </head>
      <body className="min-h-screen">
        <JsonLd data={siteLd()} />
        <Shell>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-bg">
            Skip to content
          </a>
          <CursorGlow />
          <Navbar />
          <main id="main" className="relative z-[1]">{children}</main>
          <Footer />
        </Shell>
        <div className="noise" aria-hidden="true" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
