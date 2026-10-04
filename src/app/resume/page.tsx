import type { Metadata } from "next";
import Link from "next/link";
import { Download, Mail, MapPin, Phone } from "lucide-react";
import { CERTIFICATIONS, EDUCATION, EXPERIENCE, PROFILE, PROJECTS, SKILLS, projectSlug } from "@/lib/profile";
import { breadcrumbLd, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

export const metadata: Metadata = pageMeta({
  title: "Résumé — Data Scientist & ML Engineer",
  description: `Résumé of ${PROFILE.name}, Data Scientist & ML Engineer — SSB Engineers, Auring Technologies, NEI. Python, ML, LLMs, Django, SQL. IIT Ropar AI minor. PDF download.`,
  path: "/resume",
  keywords: ["Mohit Sharma resume", "Mohit Sharma CV", "data scientist resume", "ML engineer resume India"],
  type: "profile",
});

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="border-b border-line pb-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">{children}</h2>
);

export default function ResumePage() {
  return (
    <article className="pt-36 pb-20 sm:pt-44">
      <JsonLd data={breadcrumbLd([{ name: "Résumé", path: "/resume" }])} />
      <div className="container-x max-w-4xl">
        <nav aria-label="Breadcrumb" className="font-mono text-xs text-muted">
          <Link href="/" className="hover:text-text">Home</Link> / <span className="text-accent">Résumé</span>
        </nav>

        <header className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-6xl">{PROFILE.name}</h1>
            <p className="mt-2 text-xl text-accent">{PROFILE.role}</p>
          </div>
          <a href={PROFILE.resume} download className="inline-flex w-fit items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-bg">
            <Download className="h-4 w-4" /> Download PDF
          </a>
        </header>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" />{PROFILE.location}</li>
          <li><a href={`mailto:${PROFILE.email}`} className="flex items-center gap-2 hover:text-text"><Mail className="h-4 w-4 text-accent" />{PROFILE.email}</a></li>
          <li><a href={PROFILE.phoneHref} className="flex items-center gap-2 hover:text-text"><Phone className="h-4 w-4 text-accent" />{PROFILE.phone}</a></li>
          <li><a href={PROFILE.social.linkedin} rel="me noopener noreferrer" target="_blank" className="flex items-center gap-2 hover:text-text"><LinkedinIcon className="h-4 w-4 text-accent" />in/mohitsrma</a></li>
          <li><a href={PROFILE.social.github} rel="me noopener noreferrer" target="_blank" className="flex items-center gap-2 hover:text-text"><GithubIcon className="h-4 w-4 text-accent" />mohitsrma7014</a></li>
        </ul>

        <section className="mt-12">
          <H2>Summary</H2>
          <p className="mt-4 leading-relaxed text-text/85">{PROFILE.summary}</p>
        </section>

        <section className="mt-12">
          <H2>Experience</H2>
          <div className="mt-6 space-y-8">
            {EXPERIENCE.map((e) => (
              <div key={e.company}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl font-semibold">{e.role} · <span className="text-accent">{e.company}</span></h3>
                  <p className="font-mono text-xs text-muted">{e.period} · {e.place}</p>
                </div>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-text/85 marker:text-accent">
                  {e.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <H2>Selected projects</H2>
          <ul className="mt-6 space-y-4">
            {PROJECTS.filter((p) => p.featured).map((p) => (
              <li key={p.title}>
                <Link href={`/projects/${projectSlug(p)}`} className="font-display text-lg font-semibold hover:text-accent">{p.title}</Link>
                {p.badge && <span className="ml-2 text-xs text-accent">({p.badge})</span>}
                <p className="text-sm text-muted">{p.summary} <span className="font-mono text-xs">· {p.tech.slice(0, 4).join(", ")}</span></p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <H2>Technical skills</H2>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            {SKILLS.map((g) => (
              <div key={g.group}>
                <dt className="font-medium">{g.group}</dt>
                <dd className="mt-1 text-sm text-muted">{g.items.map((i) => i.name).join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="mt-12 grid gap-12 sm:grid-cols-2">
          <section>
            <H2>Education</H2>
            <ul className="mt-6 space-y-4">
              {EDUCATION.map((e) => (
                <li key={e.title}>
                  <p className="font-medium">{e.title}</p>
                  <p className="text-sm text-muted">{e.org} · {e.year}</p>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <H2>Certifications</H2>
            <ul className="mt-6 space-y-4">
              {CERTIFICATIONS.map((c) => (
                <li key={c.title}>
                  <p className="font-medium">{c.title}</p>
                  <p className="text-sm text-muted">{c.org} · {c.year}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <p className="mt-12 text-sm text-muted">{PROFILE.availability}. Passionate about AI safety, LLMs and real-world automation.</p>
      </div>
    </article>
  );
}
