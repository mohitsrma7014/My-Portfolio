import { Hero } from "@/components/sections/Hero";
import { About, Marquee, Philosophy } from "@/components/sections/About";
import { Education, Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact, Footer, Venture } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
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
      <Footer />
    </>
  );
}
