import type { Metadata } from "next";
import { PROFILE } from "@/lib/profile";
import { PERSON_ID } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { About, Marquee, Philosophy } from "@/components/sections/About";
import { Education, Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact, Venture } from "@/components/sections/Contact";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const profilePageLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: PROFILE.url,
  name: `${PROFILE.name} — Portfolio`,
  mainEntity: { "@id": PERSON_ID },
  dateModified: "2026-10-04",
};

export default function Home() {
  return (
    <>
      <JsonLd data={profilePageLd} />
      <Hero />
      <Marquee />
      <About />
      <Experience />
      <Philosophy />
      <Projects />
      <Venture />
      <Skills />
      <Education />
      <Contact />
    </>
  );
}
