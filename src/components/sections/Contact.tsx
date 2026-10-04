"use client";

import { useState } from "react";
import { ArrowRight, ArrowUp, Check, Mail, MessageCircle, Phone, Rocket, Terminal } from "lucide-react";
import { PROFILE } from "@/lib/profile";
import { Reveal, SectionHeading } from "@/components/ui/primitives";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { useShell } from "@/components/layout/Shell";

export function Venture() {
  const v = PROFILE.venture;
  return (
    <section className="py-16">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-line bg-surface p-8 sm:p-12">
          <div className="grid-bg absolute inset-0 opacity-50" />
          <div aria-hidden="true" className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#22e6ff] opacity-20 blur-3xl" />
          <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <p className="eyebrow flex items-center gap-2"><Rocket className="h-3.5 w-3.5" /> Currently building</p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                {v.name}<span className="text-[#22e6ff]">.</span>
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{v.desc}</p>
            </div>
            {v.url ? (
              <a href={v.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#22e6ff] px-6 py-3 text-sm font-semibold text-bg">
                Visit {v.name} <ArrowRight className="h-4 w-4" />
              </a>
            ) : (
              <span className="rounded-full border border-line-strong px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-muted">Launching soon</span>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json().catch(() => ({}));
      if (res.ok) setStatus("sent");
      else {
        setError(json.error ?? "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setError(`Network error — please email ${PROFILE.email}.`);
      setStatus("error");
    }
  };

  const channels = [
    { icon: Mail, label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { icon: Phone, label: "Phone", value: PROFILE.phone, href: PROFILE.phoneHref },
    { icon: MessageCircle, label: "WhatsApp", value: "Message me", href: PROFILE.whatsappHref },
    { icon: LinkedinIcon, label: "LinkedIn", value: "in/mohitsrma", href: PROFILE.social.linkedin },
    { icon: GithubIcon, label: "GitHub", value: "mohitsrma7014", href: PROFILE.social.github },
  ];
  const input = "w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted focus:border-accent";

  return (
    <section id="contact" className="scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Contact"
          title={<>Have a role, project or idea? <span className="text-gradient">Let&apos;s talk.</span></>}
          sub={`${PROFILE.availability}. I usually reply within a day.`}
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            {status === "sent" ? (
              <div className="flex h-full min-h-[360px] flex-col items-center justify-center rounded-3xl border border-line bg-surface p-10 text-center">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-accent text-bg"><Check className="h-7 w-7" /></span>
                <p className="mt-6 font-display text-3xl font-semibold">Message sent!</p>
                <p className="mt-2 text-muted">Thanks for reaching out — I&apos;ll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-muted">Name *</span>
                    <input name="name" required autoComplete="name" placeholder="Your name" className={input} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-muted">Email *</span>
                    {/* suppressHydrationWarning: email-helper extensions (e.g. Temp Mail) inject attributes before React hydrates */}
                    <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={input} suppressHydrationWarning />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-muted">Subject</span>
                    <input name="subject" placeholder="Job opportunity, freelance project, collaboration…" className={input} />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-muted">Message *</span>
                    <textarea name="message" required rows={5} placeholder="Tell me a little about it…" className={`${input} resize-y`} />
                  </label>
                  <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                </div>
                <button
                  disabled={status === "sending"}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-bg transition-shadow hover:shadow-[0_0_30px_-4px_var(--accent)] disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send message"} <ArrowRight className="h-4 w-4" />
                </button>
                {status === "error" && <p className="mt-4 text-sm text-[#ff6b6b]">{error}</p>}
              </form>
            )}
          </Reveal>
          <Reveal delay={100} className="space-y-3 lg:col-span-5">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-accent"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-line text-accent">
                  <c.icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">{c.label}</span>
                  <span className="block font-medium group-hover:text-accent">{c.value}</span>
                </span>
              </a>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { open, scrollTo } = useShell();
  return (
    <footer className="relative mt-12 overflow-hidden border-t border-line">
      <div className="container-x pointer-events-none select-none pt-12">
        <p
          aria-hidden="true"
          className="font-display text-[19vw] font-bold leading-[0.85] tracking-tighter text-transparent lg:text-[15rem]"
          style={{ WebkitTextStroke: "1px var(--line-strong)" }}
        >
          mohit.
        </p>
      </div>
      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-4 py-6 font-mono text-[11px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {PROFILE.name} · {PROFILE.location}</span>
          <div className="flex items-center gap-4">
            <button onClick={() => open("terminal")} className="inline-flex items-center gap-1.5 hover:text-accent">
              <Terminal className="h-3.5 w-3.5" /> terminal
            </button>
            <button onClick={() => scrollTo("top")} className="inline-flex items-center gap-1.5 hover:text-accent">
              <ArrowUp className="h-3.5 w-3.5" /> back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
