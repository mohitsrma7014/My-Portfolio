"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Download, MapPin } from "lucide-react";
import { PROFILE } from "@/lib/profile";
import type { ShapeId } from "@/components/three/shapes";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { useShell } from "@/components/layout/Shell";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), { ssr: false });

const CYCLE: { shape: ShapeId; word: string; color: string; ms: number }[] = [
  { shape: "name", word: "intelligent systems", color: "#b6ff3b", ms: 5200 },
  { shape: "neural", word: "AI assistants", color: "#22d3ee", ms: 4200 },
  { shape: "scatter", word: "ML models", color: "#b6ff3b", ms: 4200 },
  { shape: "heatmap", word: "live dashboards", color: "#ff7a59", ms: 4200 },
  { shape: "gear", word: "automation", color: "#c084fc", ms: 4200 },
];

export function Hero() {
  const { scrollTo } = useShell();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setI((x) => (x + 1) % CYCLE.length), CYCLE[i].ms);
    return () => clearTimeout(t);
  }, [i]);

  const cur = CYCLE[i];

  return (
    <section id="top" className="relative flex min-h-[100svh] items-end overflow-hidden pb-14 pt-32 sm:items-center sm:pb-0">
      <div className="grid-bg absolute inset-0 opacity-40" />
      <div
        className="absolute -right-40 top-1/4 h-[600px] w-[600px] rounded-full opacity-[0.16] blur-[140px] transition-colors duration-1000"
        style={{ background: cur.color }}
      />
      <div className="absolute inset-0 opacity-50 sm:opacity-100">
        <HeroCanvas shape={cur.shape} color={cur.color} />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />

      <div className="container-x relative">
        <div className="max-w-2xl">
          <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest text-muted backdrop-blur">
            <span className="relative inline-block h-2 w-2 rounded-full bg-accent text-accent pulse-dot" />
            {PROFILE.availability}
          </p>
          <h1 className="font-display text-5xl font-semibold leading-[1] tracking-tight sm:text-7xl lg:text-8xl">
            Hi, I&apos;m <span className="text-gradient">{PROFILE.firstName}</span>
            <span className="text-accent">.</span>
          </h1>
          <p className="mt-5 font-display text-2xl font-medium text-text/90 sm:text-3xl">{PROFILE.role}</p>
          <p className="mt-4 text-lg text-muted sm:text-xl">
            I build{" "}
            <span key={cur.word} className="inline-block font-medium animate-[wordIn_0.6s_cubic-bezier(.2,.7,.2,1)]" style={{ color: cur.color }}>
              {cur.word}
            </span>{" "}
            with Python, ML and LLMs.
          </p>
          <p className="mt-3 flex items-center gap-2 text-sm text-muted">
            <MapPin className="h-4 w-4 text-accent" /> {PROFILE.location}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollTo("projects")}
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg transition-shadow hover:shadow-[0_0_40px_-6px_var(--accent)]"
            >
              See my work
            </button>
            <a
              href={PROFILE.resume}
              download
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              <Download className="h-4 w-4" /> Download résumé
            </a>
            <div className="ml-1 flex items-center gap-1">
              <a href={PROFILE.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="rounded-full p-2.5 text-muted transition-colors hover:text-accent">
                <GithubIcon />
              </a>
              <a href={PROFILE.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-full p-2.5 text-muted transition-colors hover:text-accent">
                <LinkedinIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 hidden items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-muted lg:flex">
        <span>press</span>
        <kbd className="rounded border border-line px-1.5 py-0.5 text-text">ctrl + `</kbd>
        <span>for terminal</span>
      </div>
    </section>
  );
}
