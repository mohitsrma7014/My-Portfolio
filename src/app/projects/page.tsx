import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROFILE, PROJECTS, projectSlug } from "@/lib/profile";
import { breadcrumbLd, pageMeta, PERSON_ID } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/primitives";

export const metadata: Metadata = pageMeta({
  title: "Projects — AI, Machine Learning, Dashboards & Web",
  description: `Projects by ${PROFILE.name}: RAG chatbot, AI stock sentiment recommender, manufacturing traceability dashboards, adaptive ML testing and client websites.`,
  path: "/projects",
  keywords: ["Mohit Sharma projects", "machine learning projects", "RAG chatbot project", "data science portfolio projects", "Django dashboard project"],
});

export default function ProjectsPage() {
  const listLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Projects by ${PROFILE.name}`,
    url: `${PROFILE.url}/projects`,
    author: { "@id": PERSON_ID },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: PROJECTS.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${PROFILE.url}/projects/${projectSlug(p)}`, name: p.title })),
    },
  };
  return (
    <section className="pt-36 pb-20 sm:pt-44">
      <JsonLd data={listLd} />
      <JsonLd data={breadcrumbLd([{ name: "Projects", path: "/projects" }])} />
      <div className="container-x">
        <nav aria-label="Breadcrumb" className="font-mono text-xs text-muted">
          <Link href="/" className="hover:text-text">Home</Link> / <span className="text-accent">Projects</span>
        </nav>
        <h1 className="mt-6 max-w-4xl font-display text-4xl font-semibold tracking-tight sm:text-6xl">
          Projects by {PROFILE.name}<span className="text-accent">.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          AI assistants, machine-learning models, production dashboards and websites: what each one solves, how it&apos;s built, and the results.
        </p>
        <ul className="mt-14 divide-y divide-line border-y border-line">
          {PROJECTS.map((p, i) => (
            <Reveal as="li" key={p.title} delay={(i % 4) * 50}>
              <Link href={`/projects/${projectSlug(p)}`} className="group grid gap-3 py-7 sm:grid-cols-12 sm:items-center">
                <span className="font-mono text-xs text-muted sm:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <span className="sm:col-span-5">
                  <span className="block font-display text-2xl font-semibold transition-colors group-hover:text-accent">{p.title}</span>
                  <span className="mt-1 block font-mono text-[11px] uppercase tracking-widest text-muted">{p.cat}</span>
                </span>
                <span className="text-sm text-muted sm:col-span-5">{p.summary}</span>
                <ArrowUpRight className="hidden h-5 w-5 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent sm:col-span-1 sm:block sm:justify-self-end" />
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
