import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { PROFILE, PROJECTS, projectSlug } from "@/lib/profile";
import { breadcrumbLd, pageMeta, PERSON_ID } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { GithubIcon } from "@/components/ui/BrandIcons";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: projectSlug(p) }));
}

const find = (slug: string) => PROJECTS.find((p) => projectSlug(p) === slug);

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const p = find((await params).slug);
  if (!p) return {};
  return pageMeta({
    title: `${p.title} — ${p.cat} Project`,
    description: `${p.summary} Built by ${PROFILE.name} with ${p.tech.slice(0, 4).join(", ")}.`,
    path: `/projects/${projectSlug(p)}`,
    keywords: [p.title, ...p.tech, `${PROFILE.name} ${p.cat} project`],
    type: "article",
    image: `/projects/${projectSlug(p)}/opengraph-image`,
  });
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const p = find((await params).slug);
  if (!p) notFound();
  const slug = projectSlug(p);
  const idx = PROJECTS.indexOf(p);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const path = `/projects/${slug}`;

  const workLd = {
    "@context": "https://schema.org",
    "@type": p.code ? "SoftwareSourceCode" : "CreativeWork",
    name: p.title,
    headline: p.title,
    description: p.story ?? p.summary,
    url: `${PROFILE.url}${path}`,
    image: `${PROFILE.url}${path}/opengraph-image`,
    author: { "@id": PERSON_ID },
    creator: { "@id": PERSON_ID },
    keywords: p.tech.join(", "),
    genre: p.cat,
    ...(p.code && { codeRepository: p.code, programmingLanguage: p.tech[0] }),
    ...(p.live && { sameAs: p.live }),
  };

  return (
    <article className="pt-36 pb-20 sm:pt-44">
      <JsonLd data={workLd} />
      <JsonLd data={breadcrumbLd([{ name: "Projects", path: "/projects" }, { name: p.title, path }])} />
      <div className="container-x max-w-4xl">
        <nav aria-label="Breadcrumb" className="font-mono text-xs text-muted">
          <Link href="/" className="hover:text-text">Home</Link> / <Link href="/projects" className="hover:text-text">Projects</Link> /{" "}
          <span className="text-accent">{p.title}</span>
        </nav>
        <p className="mt-8 font-mono text-[11px] uppercase tracking-widest text-accent">{p.cat}</p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">{p.title}</h1>
        {p.badge && <p className="mt-4 inline-block rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs text-accent">{p.badge}</p>}
        <p className="mt-6 text-xl leading-relaxed text-text/90">{p.summary}</p>

        {(p.live || p.code) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {p.live && (
              <a href={p.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-bg">
                View live site <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            {p.code && (
              <a href={p.code} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm hover:border-accent hover:text-accent">
                <GithubIcon className="h-4 w-4" /> Source code
              </a>
            )}
          </div>
        )}

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="font-display text-2xl font-semibold">Overview</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{p.story ?? p.summary}</p>
            <h2 className="mt-10 font-display text-2xl font-semibold">Highlights</h2>
            <ul className="mt-4 space-y-3">
              {p.points.map((pt) => (
                <li key={pt} className="flex gap-3 text-lg">
                  <Check className="mt-1.5 h-4 w-4 shrink-0 text-accent" />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
          <aside className="h-fit rounded-2xl border border-line bg-surface p-6">
            <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted">Tech stack</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <li key={t} className="rounded-md bg-white/5 px-2.5 py-1 font-mono text-xs">{t}</li>
              ))}
            </ul>
            <h2 className="mt-6 font-mono text-[11px] uppercase tracking-widest text-muted">Built by</h2>
            <p className="mt-2">
              <Link href="/" className="font-medium hover:text-accent">{PROFILE.name}</Link>
              <span className="block text-sm text-muted">{PROFILE.role}</span>
            </p>
          </aside>
        </div>

        <div className="mt-16 rounded-3xl border border-line bg-surface p-8">
          <p className="font-display text-2xl font-semibold">Want something like this for your team?</p>
          <p className="mt-2 text-muted">{PROFILE.availability}. Let&apos;s talk about what you&apos;re building.</p>
          <Link href="/#contact" className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-bg">
            Get in touch <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <nav className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8" aria-label="More projects">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-muted hover:text-text">
            <ArrowLeft className="h-4 w-4" /> All projects
          </Link>
          <Link href={`/projects/${projectSlug(next)}`} className="group text-right">
            <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">Next project</span>
            <span className="font-display text-lg group-hover:text-accent">{next.title} →</span>
          </Link>
        </nav>
      </div>
    </article>
  );
}
