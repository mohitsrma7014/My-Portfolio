import type { Metadata } from "next";
import { CERTIFICATIONS, EDUCATION, EXPERIENCE, PROFILE, SKILLS } from "./profile";

export const PERSON_ID = `${PROFILE.url}/#person`;
export const SITE_ID = `${PROFILE.url}/#website`;

export function pageMeta({ title, description, path, keywords = [], type = "website", image = "/opengraph-image" }: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article" | "profile";
  image?: string;
}): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: `${PROFILE.url}${path === "/" ? "" : path}`,
      title: `${title} · ${PROFILE.name}`,
      description,
      siteName: PROFILE.name,
      locale: "en_IN",
      images: [{ url: image, width: 1200, height: 630, alt: `${PROFILE.name} — ${PROFILE.role}` }],
    },
    twitter: { card: "summary_large_image", title: `${title} · ${PROFILE.name}`, description, images: [image] },
  };
}

/** Site-wide graph: the WebSite and the Person it is about. */
export function siteLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": SITE_ID,
        url: PROFILE.url,
        name: `${PROFILE.name} — Portfolio`,
        inLanguage: "en-IN",
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: PROFILE.name,
        givenName: "Mohit",
        familyName: "Sharma",
        jobTitle: PROFILE.role,
        description: PROFILE.summary,
        url: PROFILE.url,
        image: `${PROFILE.url}${PROFILE.photo}`,
        email: `mailto:${PROFILE.email}`,
        telephone: "+917014028949",
        nationality: { "@type": "Country", name: "India" },
        homeLocation: { "@type": "Place", name: PROFILE.location },
        address: { "@type": "PostalAddress", addressLocality: "Alwar", addressRegion: "Rajasthan", addressCountry: "IN" },
        sameAs: [PROFILE.social.github, PROFILE.social.linkedin],
        worksFor: [
          { "@type": "Organization", name: "SSB Engineers Pvt. Ltd." },
          { "@type": "Organization", name: "Nexvorta", founder: { "@id": PERSON_ID } },
        ],
        alumniOf: EDUCATION.slice(0, 1).map((e) => ({ "@type": "CollegeOrUniversity", name: e.org })),
        hasCredential: CERTIFICATIONS.map((c) => ({
          "@type": "EducationalOccupationalCredential",
          name: c.title,
          credentialCategory: "certificate",
          recognizedBy: { "@type": "Organization", name: c.org },
        })),
        hasOccupation: EXPERIENCE.map((e) => ({ "@type": "Occupation", name: e.role, skills: e.tech.join(", ") })),
        knowsAbout: SKILLS.flatMap((g) => g.items.map((i) => i.name)),
        knowsLanguage: ["English", "Hindi"],
      },
    ],
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${PROFILE.url}${it.path === "/" ? "" : it.path}`,
    })),
  };
}
