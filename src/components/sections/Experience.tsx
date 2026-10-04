import { Award, Briefcase, GraduationCap, Rocket } from "lucide-react";
import { CERTIFICATIONS, EDUCATION, EXPERIENCE } from "@/lib/profile";
import { Reveal, SectionHeading } from "@/components/ui/primitives";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Experience"
          title={<>Shipped to production, <span className="text-muted">not just to notebooks.</span></>}
          sub="From shop-floor analytics to LLM integrations: real systems used by real teams."
        />
        <ol className="relative mt-14 space-y-6 before:absolute before:bottom-4 before:left-[19px] before:top-4 before:w-px before:bg-gradient-to-b before:from-accent before:via-line-strong before:to-transparent sm:before:left-[23px]">
          {EXPERIENCE.map((e, i) => {
            const Icon = e.type === "Venture" ? Rocket : Briefcase;
            return (
              <Reveal as="li" key={e.company} delay={i * 60} className="relative pl-14 sm:pl-16">
                <span className="absolute left-0 top-6 grid h-10 w-10 place-items-center rounded-full border border-accent bg-bg text-accent shadow-[0_0_24px_-6px_var(--accent)] sm:h-12 sm:w-12">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <article className="rounded-3xl border border-line bg-surface p-6 transition-colors hover:border-line-strong sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-xl font-semibold sm:text-2xl">{e.role}</h3>
                      <p className="mt-1 text-accent">{e.company}</p>
                    </div>
                    <div className="text-right font-mono text-xs text-muted">
                      <p>{e.period}</p>
                      <p className="mt-1">{e.place}{e.type && e.type !== "Venture" ? ` · ${e.type}` : ""}</p>
                    </div>
                  </div>
                  <ul className="mt-5 space-y-2">
                    {e.points.map((p) => (
                      <li key={p} className="flex gap-3 text-sm leading-relaxed text-text/85 sm:text-base">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {e.tech.map((t) => (
                      <span key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted">{t}</span>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export function Education() {
  return (
    <section id="education" className="scroll-mt-24 py-24">
      <div className="container-x grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Education" title="Foundations" />
          <ul className="mt-10 space-y-3">
            {EDUCATION.map((e, i) => (
              <Reveal as="li" key={e.title} delay={i * 80} className="flex gap-4 rounded-2xl border border-line bg-surface p-5">
                <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div className="flex-1">
                  <div className="flex flex-wrap justify-between gap-2">
                    <h3 className="font-medium">{e.title}</h3>
                    <span className="font-mono text-xs text-muted">{e.year}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted">{e.org} · {e.place}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
        <div>
          <SectionHeading eyebrow="Certifications" title="Always learning" />
          <ul className="mt-10 space-y-3">
            {CERTIFICATIONS.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 80} className="flex gap-4 rounded-2xl border border-line bg-surface p-5">
                <Award className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div className="flex-1">
                  <div className="flex flex-wrap justify-between gap-2">
                    <h3 className="font-medium">{c.title}</h3>
                    <span className="font-mono text-xs text-muted">{c.year}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted">{c.org}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
