"use client";

import { useEffect, useRef, useState } from "react";
import { SKILLS } from "@/lib/profile";
import { SectionHeading } from "@/components/ui/primitives";

export function Skills() {
  const [tab, setTab] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVisible(true);
        io.disconnect();
      }
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const group = SKILLS[tab];

  return (
    <section id="skills" className="scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading eyebrow="Skills" title={<>The toolkit. <span className="text-muted">Sharpened on real problems.</span></>} />
        <div ref={ref} className="mt-12 grid gap-6 lg:grid-cols-12">
          <div role="tablist" aria-label="Skill groups" className="flex gap-2 overflow-x-auto pb-1 lg:col-span-4 lg:flex-col lg:overflow-visible [scrollbar-width:none]">
            {SKILLS.map((g, i) => (
              <button
                key={g.group}
                role="tab"
                aria-selected={tab === i}
                onClick={() => setTab(i)}
                className={`shrink-0 rounded-2xl border px-5 py-4 text-left transition-colors ${tab === i ? "border-accent bg-accent/10" : "border-line hover:border-line-strong"}`}
              >
                <span className="font-mono text-[10px] text-muted">0{i + 1}</span>
                <span className="mt-1 block font-display text-lg font-medium">{g.group}</span>
              </button>
            ))}
          </div>
          <div key={tab} role="tabpanel" className="space-y-6 rounded-3xl border border-line bg-surface p-6 sm:p-8 lg:col-span-8">
            {group.items.map((s, i) => (
              <div key={s.name}>
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-medium">{s.name}</p>
                  <p className="font-mono text-xs text-accent">{s.level}%</p>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2 transition-[width] duration-1000 ease-out"
                    style={{ width: visible ? `${s.level}%` : "0%", transitionDelay: `${i * 90}ms` }}
                  />
                </div>
                <p className="mt-1.5 text-xs text-muted">{s.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
