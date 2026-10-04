"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import Lenis from "lenis";
import { Command, CornerDownLeft, Download, Menu, Search, X } from "lucide-react";
import { PROFILE, PROJECTS, EXPERIENCE, SKILLS } from "@/lib/profile";
import { Logo } from "@/components/ui/primitives";

export const NAV = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

type Overlay = "none" | "palette" | "terminal";
const Ctx = createContext<{ open: (o: Overlay) => void; close: () => void; scrollTo: (id: string) => void }>({
  open: () => {},
  close: () => {},
  scrollTo: () => {},
});
export const useShell = () => useContext(Ctx);

export function Shell({ children }: { children: React.ReactNode }) {
  const [overlay, setOverlay] = useState<Overlay>("none");
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1 });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOverlay((o) => (o === "palette" ? "none" : "palette"));
      } else if (e.ctrlKey && e.key === "`") {
        e.preventDefault();
        setOverlay((o) => (o === "terminal" ? "none" : "terminal"));
      } else if (e.key === "Escape") setOverlay("none");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (overlay === "none") lenisRef.current?.start();
    else lenisRef.current?.stop();
  }, [overlay]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: -80 });
    else el.scrollIntoView({ behavior: "smooth" });
  }, []);
  const open = useCallback((o: Overlay) => setOverlay(o), []);
  const close = useCallback(() => setOverlay("none"), []);
  const value = useMemo(() => ({ open, close, scrollTo }), [open, close, scrollTo]);

  return (
    <Ctx.Provider value={value}>
      {children}
      {overlay === "palette" && <Palette />}
      {overlay === "terminal" && <Terminal />}
    </Ctx.Provider>
  );
}

export function Navbar() {
  const { open, scrollTo } = useShell();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const go = (id: string) => {
    setMenu(false);
    scrollTo(id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <nav
        className={`mx-auto flex max-w-[1240px] items-center justify-between gap-4 rounded-2xl px-4 py-2.5 transition-all duration-500 ${
          scrolled || menu ? "glass shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]" : "border border-transparent"
        }`}
      >
        <a href="#top" onClick={(e) => { e.preventDefault(); go("top"); }} className="flex items-center gap-2.5" aria-label="Back to top">
          <Logo />
          <span className="font-display text-lg font-semibold tracking-tight">
            mohit<span className="text-accent">.</span>sharma
          </span>
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                onClick={(e) => { e.preventDefault(); go(n.id); }}
                className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${active === n.id ? "text-text" : "text-muted hover:text-text"}`}
              >
                {n.label}
                {active === n.id && <span className="absolute inset-x-3.5 -bottom-0.5 h-px bg-accent" />}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <button
            onClick={() => open("palette")}
            className="hidden items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-[11px] text-muted transition-colors hover:border-line-strong hover:text-text sm:flex"
            aria-label="Open command palette"
          >
            <Command className="h-3 w-3" /> K
          </button>
          <a
            href={PROFILE.resume}
            download
            className="hidden items-center gap-2 rounded-full bg-text px-4 py-2 text-sm font-medium text-bg transition-colors hover:bg-accent sm:inline-flex"
          >
            <Download className="h-4 w-4" /> Résumé
          </a>
          <button onClick={() => setMenu((m) => !m)} className="rounded-full p-2 lg:hidden" aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu}>
            {menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      {menu && (
        <div className="glass mx-auto mt-2 max-w-[1240px] rounded-2xl p-4 lg:hidden">
          <ul>
            {NAV.map((n, i) => (
              <li key={n.id}>
                <button onClick={() => go(n.id)} className="flex w-full items-baseline gap-3 border-b border-line py-3.5 text-left font-display text-2xl font-medium">
                  <span className="font-mono text-xs text-accent">0{i + 1}</span>
                  {n.label}
                </button>
              </li>
            ))}
          </ul>
          <a href={PROFILE.resume} download className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-bg">
            <Download className="h-4 w-4" /> Download résumé
          </a>
        </div>
      )}
    </header>
  );
}

type Cmd = { id: string; group: string; label: string; hint?: string; run: () => void };

function Palette() {
  const { close, open, scrollTo } = useShell();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const commands = useMemo<Cmd[]>(() => {
    const go = (id: string) => () => {
      close();
      setTimeout(() => scrollTo(id), 50);
    };
    const ext = (url: string) => () => {
      window.open(url, "_blank", "noopener");
      close();
    };
    return [
      { id: "top", group: "Go to", label: "Home", run: go("top") },
      ...NAV.map((n) => ({ id: n.id, group: "Go to", label: n.label, run: go(n.id) })),
      ...PROJECTS.filter((p) => p.live || p.code).map((p) => ({
        id: p.title, group: "Projects", label: p.title, hint: p.live ? "live ↗" : "code ↗", run: ext((p.live ?? p.code)!),
      })),
      { id: "cv", group: "Actions", label: "Download résumé (PDF)", run: () => { window.open(PROFILE.resume, "_blank"); close(); } },
      { id: "mail", group: "Actions", label: `Email — ${PROFILE.email}`, run: () => { window.location.href = `mailto:${PROFILE.email}`; close(); } },
      { id: "wa", group: "Actions", label: "WhatsApp me", run: ext(PROFILE.whatsappHref) },
      { id: "li", group: "Actions", label: "LinkedIn profile", run: ext(PROFILE.social.linkedin) },
      { id: "gh", group: "Actions", label: "GitHub profile", run: ext(PROFILE.social.github) },
      { id: "term", group: "Actions", label: "Open terminal mode", hint: "ctrl + `", run: () => open("terminal") },
    ];
  }, [close, open, scrollTo]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? commands.filter((c) => `${c.group} ${c.label}`.toLowerCase().includes(s)) : commands;
  }, [q, commands]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, filtered.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Enter") filtered[active]?.run();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm" onMouseDown={close}>
      <div role="dialog" aria-label="Command palette" onMouseDown={(e) => e.stopPropagation()} className="glass w-full max-w-xl overflow-hidden rounded-2xl shadow-2xl">
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="h-4 w-4 text-muted" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => { setQ(e.target.value); setActive(0); }}
            onKeyDown={onKey}
            placeholder="Jump to a section, project or action…"
            className="h-14 flex-1 bg-transparent outline-none placeholder:text-muted"
          />
          <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">ESC</kbd>
        </div>
        <ul className="max-h-[50vh] overflow-y-auto p-2" data-lenis-prevent>
          {filtered.length === 0 && <li className="px-3 py-8 text-center text-sm text-muted">Nothing found.</li>}
          {filtered.map((c, i) => (
            <li key={c.id}>
              {c.group !== filtered[i - 1]?.group && <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-widest text-muted">{c.group}</p>}
              <button
                onMouseEnter={() => setActive(i)}
                onClick={c.run}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm ${i === active ? "bg-accent/10 text-text" : "text-text/80"}`}
              >
                {c.label}
                <span className="flex items-center gap-2 font-mono text-[10px] text-muted">
                  {c.hint}
                  {i === active && <CornerDownLeft className="h-3 w-3 text-accent" />}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

type Line = { kind: "in" | "out" | "ok" | "err"; text: string };

function Terminal() {
  const { close, scrollTo } = useShell();
  const [lines, setLines] = useState<Line[]>([
    { kind: "ok", text: "mohit@portfolio:~$ welcome 👋" },
    { kind: "out", text: "Type 'help' to explore. 'exit' or Esc to leave." },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  const out = (t: string): Line => ({ kind: "out", text: t });

  function exec(raw: string): Line[] | "clear" {
    const [cmd = "", ...args] = raw.trim().split(/\s+/);
    const arg = args.join(" ").toLowerCase();
    switch (cmd.toLowerCase()) {
      case "": return [];
      case "help":
        return ["whoami        who I am", "experience    where I've worked", "projects      things I've built", "skills        my stack",
          "education     degrees & certifications", "resume        download my CV", "contact       reach me", "goto <section>  about | experience | projects | skills | contact",
          "sudo hire mohit", "clear / exit"].map(out);
      case "whoami":
        return [out(`${PROFILE.name} — ${PROFILE.role}`), out(PROFILE.tagline), out(`📍 ${PROFILE.location} · ${PROFILE.availability}`)];
      case "experience":
        return EXPERIENCE.map((e) => out(`▸ ${e.period.padEnd(20)} ${e.role} @ ${e.company}`));
      case "projects": case "ls":
        return PROJECTS.map((p) => out(`▸ ${p.title.padEnd(44)} ${p.tech.slice(0, 3).join(", ")}`));
      case "skills":
        return SKILLS.map((g) => out(`▸ ${g.group}: ${g.items.map((i) => i.name).join(", ")}`));
      case "education":
        return [out("▸ B.Tech, Mechanical Engineering — MITRC (2024)"), out("▸ Minor in Artificial Intelligence — IIT Ropar (2024)")];
      case "resume": case "cv":
        window.open(PROFILE.resume, "_blank");
        return [{ kind: "ok", text: "✓ opening résumé…" }];
      case "contact":
        return [out(`email     ${PROFILE.email}`), out(`phone     ${PROFILE.phone}`), out(`linkedin  ${PROFILE.social.linkedin}`), out(`github    ${PROFILE.social.github}`)];
      case "goto": case "cd": {
        const id = arg.replace(/^[#/]/, "");
        if (!NAV.some((n) => n.id === id)) return [{ kind: "err", text: `no section '${arg}'` }];
        close();
        setTimeout(() => scrollTo(id), 50);
        return [];
      }
      case "sudo":
        if (arg.startsWith("hire")) {
          setTimeout(() => { close(); scrollTo("contact"); }, 900);
          return [{ kind: "ok", text: "[sudo] access granted. Excellent decision. Taking you to contact…" }];
        }
        return [{ kind: "err", text: "permission denied (hint: sudo hire mohit)" }];
      case "clear": return "clear";
      case "exit": close(); return [];
      default: return [{ kind: "err", text: `command not found: ${cmd}. type 'help'` }];
    }
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = exec(input);
    if (res === "clear") setLines([]);
    else setLines((l) => [...l, { kind: "in", text: input }, ...res]);
    if (input.trim()) setHistory((h) => [input, ...h]);
    setHIdx(-1);
    setInput("");
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp" && history[hIdx + 1] !== undefined) { e.preventDefault(); setHIdx(hIdx + 1); setInput(history[hIdx + 1]); }
    else if (e.key === "ArrowDown") { e.preventDefault(); const n = hIdx - 1; setHIdx(Math.max(n, -1)); setInput(n >= 0 ? history[n] : ""); }
  };
  const color = { in: "text-text", out: "text-muted", ok: "text-accent", err: "text-[#ff6b6b]" };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-3 backdrop-blur-sm sm:items-center sm:p-6" onMouseDown={close}>
      <div
        role="dialog"
        aria-label="Terminal"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={() => inputRef.current?.focus()}
        className="w-full max-w-3xl overflow-hidden rounded-xl border border-line-strong bg-[#050506]/95 font-mono text-[13px] shadow-[0_0_80px_-20px_var(--accent)]"
      >
        <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
          <button onClick={close} aria-label="Close terminal" className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-xs text-muted">guest@mohit-sharma: ~</span>
        </div>
        <div ref={bodyRef} className="h-[60vh] max-h-[460px] overflow-y-auto p-4 leading-relaxed" data-lenis-prevent>
          {lines.map((l, i) => (
            <p key={i} className={`whitespace-pre-wrap break-words ${color[l.kind]}`}>
              {l.kind === "in" && <span className="text-accent">❯ </span>}
              {l.text}
            </p>
          ))}
          <form onSubmit={submit} className="flex items-center">
            <span className="text-accent">❯&nbsp;</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              aria-label="Terminal input"
              autoComplete="off"
              spellCheck={false}
              className="flex-1 bg-transparent text-text caret-[var(--accent)] outline-none"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
