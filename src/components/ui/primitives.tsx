"use client";

import Link from "next/link";
import { useEffect, useRef, type ComponentProps, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

/** Fades/slides children in when they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${className}`}
      style={{ ["--delay" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/** Updates --mx / --my so `.spotlight` cards glow under the cursor. */
export function onSpotlightMove(e: React.MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <span
      className={`grid place-items-center rounded-xl border border-accent/40 bg-accent/10 font-mono text-sm font-bold text-accent ${className}`}
      aria-hidden="true"
    >
      MS
    </span>
  );
}

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  arrow?: boolean;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

/** Magnetic button: gently follows the cursor on hover. */
export function Button({ href, children, variant = "primary", className = "", arrow = true, ...rest }: BtnProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const move = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.18;
    const y = (e.clientY - r.top - r.height / 2) * 0.25;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const leave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-[transform,background,box-shadow,color] duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
  const styles =
    variant === "primary"
      ? "bg-accent text-[#04060b] shadow-[0_0_0_0_var(--accent)] hover:shadow-[0_0_40px_-6px_var(--accent)]"
      : "border border-line-strong text-text hover:border-accent hover:text-accent";
  return (
    <Link ref={ref} href={href} onMouseMove={move} onMouseLeave={leave} className={`${base} ${styles} ${className}`} {...rest}>
      {children}
      {arrow && (
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  center = false,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  center?: boolean;
}) {
  return (
    <Reveal className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <p className="eyebrow mb-4">
        <span className="opacity-60">{"// "}</span>
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl">{title}</h2>
      {sub && <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg text-pretty">{sub}</p>}
    </Reveal>
  );
}

export function PageHero({ eyebrow, title, sub }: { eyebrow: string; title: ReactNode; sub: ReactNode }) {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-24">
      <div className="grid-bg absolute inset-0 -z-10 opacity-60" />
      <div
        className="absolute left-1/2 top-0 -z-10 h-[480px] w-[900px] -translate-x-1/2 rounded-full opacity-25 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--accent), transparent 65%)" }}
      />
      <div className="container-x">
        <Reveal>
          <p className="eyebrow mb-5">
            <span className="opacity-60">{"// "}</span>
            {eyebrow}
          </p>
          <h1 className="font-display max-w-4xl text-4xl font-semibold leading-[1.03] tracking-tight text-balance sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted text-pretty">{sub}</p>
        </Reveal>
      </div>
    </section>
  );
}
