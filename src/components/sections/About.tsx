import { PROFILE, STATS, STACK_MARQUEE } from "@/lib/profile";
import { Reveal, SectionHeading } from "@/components/ui/primitives";
import { ScrollWords } from "@/components/ui/ScrollWords";
import { AvatarCard } from "@/components/three/AvatarCard";

export function Marquee() {
  const items = [...STACK_MARQUEE, ...STACK_MARQUEE];
  return (
    <div className="relative overflow-hidden border-y border-line py-5 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {items.map((m, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-xl text-muted sm:text-2xl">
            {m}
            <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Code() {
  const k = "text-[#c084fc]", s = "text-accent", n = "text-[#ff7a59]", c = "text-muted/70";
  return (
    <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-relaxed sm:text-[13px]">
      <code>
        <span className={c}># about.py</span>{"\n"}
        <span className={k}>class</span> <span className="text-[#22d3ee]">MohitSharma</span>:{"\n"}
        {"    "}role     = <span className={s}>&quot;Data Scientist &amp; ML Engineer&quot;</span>{"\n"}
        {"    "}based_in = <span className={s}>&quot;Alwar, Rajasthan 🇮🇳&quot;</span>{"\n"}
        {"    "}founder  = <span className={s}>&quot;Nexvorta&quot;</span>{"\n"}
        {"    "}stack    = [<span className={s}>&quot;Python&quot;</span>, <span className={s}>&quot;Django&quot;</span>, <span className={s}>&quot;LLMs&quot;</span>, <span className={s}>&quot;SQL&quot;</span>]{"\n"}
        {"    "}years_shipping = <span className={n}>2</span>{"\n\n"}
        {"    "}<span className={k}>def</span> <span className="text-[#22d3ee]">solve</span>(self, problem):{"\n"}
        {"        "}data  = self.<span className="text-[#22d3ee]">understand</span>(problem){"\n"}
        {"        "}model = self.<span className="text-[#22d3ee]">build</span>(data){"\n"}
        {"        "}<span className={k}>return</span> self.<span className="text-[#22d3ee]">ship</span>(model)  <span className={c}># to production ✓</span>
      </code>
    </pre>
  );
}

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading eyebrow="About me" title={<>Engineer by training. <span className="text-muted">Data scientist by obsession.</span></>} />

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <AvatarCard />
          </Reveal>

          <div className="space-y-6 lg:col-span-7">
            <Reveal>
              <p className="text-lg leading-relaxed text-text/85">{PROFILE.summary}</p>
              <p className="mt-4 leading-relaxed text-muted">
                My background in mechanical engineering means I understand the shop floor as well as the database. I&apos;ve put
                ML and dashboards into real factories, wired GPT into customer-support workflows, and I&apos;m now building{" "}
                <span className="text-text">Nexvorta</span> to bring that same craft to businesses everywhere.
              </p>
            </Reveal>
            <Reveal delay={100} className="overflow-hidden rounded-2xl border border-line bg-[#08090b]">
              <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-2 font-mono text-[11px] text-muted">about.py</span>
              </div>
              <Code />
            </Reveal>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="bg-bg p-6 sm:p-8">
              <p className="font-display text-4xl font-semibold tracking-tight text-gradient sm:text-5xl">{s.value}</p>
              <p className="mt-2 text-sm text-muted">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Philosophy() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-x">
        <p className="eyebrow mb-8"><span className="opacity-60">{"// "}</span>How I work</p>
        <ScrollWords
          className="font-display text-3xl font-medium leading-[1.2] tracking-tight sm:text-5xl"
          text="A model in a notebook helps no one. I care about the last mile — clean data, honest metrics, and systems that real people use every day on the shop floor, in the office and on their phones."
        />
      </div>
    </section>
  );
}
