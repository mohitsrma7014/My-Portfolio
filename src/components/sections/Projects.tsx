"use client";

import { useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { PROJECTS, projectSlug, type ProjectCat } from "@/lib/profile";
import { Reveal, SectionHeading, onSpotlightMove } from "@/components/ui/primitives";
import { GithubIcon } from "@/components/ui/BrandIcons";

const FILTERS: ("All" | ProjectCat)[] = ["All", "AI & ML", "Data & Dashboards", "Web"];
const CAT_COLOR: Record<ProjectCat, string> = { "AI & ML": "#22d3ee", "Data & Dashboards": "#ff7a59", Web: "#c084fc" };

export function Projects() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const list = PROJECTS.filter((p) => filter === "All" || p.cat === filter);

  return (
    <section id="projects" className="scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Projects"
          title={<>Things I&apos;ve built. <span className="text-muted">Some run factories.</span></>}
          sub="AI systems, ML models, production dashboards and websites, from experiments to code running in production."
        />

        <div role="tablist" aria-label="Filter projects" className="mt-10 flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const count = f === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.cat === f).length;
            return (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${filter === f ? "border-accent bg-accent text-bg" : "border-line text-muted hover:text-text"}`}
              >
                {f} <span className="ml-1 font-mono text-[10px] opacity-70">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 70} as="article">
              <div
                onMouseMove={onSpotlightMove}
                className={`spotlight group flex h-full flex-col rounded-3xl p-6 ${p.featured ? "lg:min-h-[420px]" : ""}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: CAT_COLOR[p.cat] }}>{p.cat}</span>
                  {p.featured && (
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted">
                      <Sparkles className="h-3 w-3 text-accent" /> Featured
                    </span>
                  )}
                </div>
                <h3 className="mt-4 font-display text-2xl font-semibold leading-tight">
                  <Link href={`/projects/${projectSlug(p)}`} className="hover:text-accent">{p.title}</Link>
                </h3>
                {p.badge && <p className="mt-2 inline-block w-fit rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-[11px] text-accent">{p.badge}</p>}
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.summary}</p>
                <ul className="mt-4 flex-1 space-y-1.5">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-2 text-sm text-text/80">
                      <span className="text-accent">→</span>
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span key={t} className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[10.5px] text-muted">{t}</span>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-5">
                  <Link href={`/projects/${projectSlug(p)}`} className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs hover:border-accent hover:text-accent">
                    Case study <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-bg">
                        Live site <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {p.code && (
                      <a href={p.code} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs hover:border-accent hover:text-accent">
                        <GithubIcon className="h-3.5 w-3.5" /> Code
                      </a>
                    )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
