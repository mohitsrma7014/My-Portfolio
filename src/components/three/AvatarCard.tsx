"use client";

import dynamic from "next/dynamic";
import { PROFILE } from "@/lib/profile";

const Avatar = dynamic(() => import("./Avatar"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 grid place-items-center font-mono text-xs text-muted">booting avatar…</div>,
});

export function AvatarCard() {
  return (
    <div className="relative aspect-square overflow-hidden rounded-3xl border border-line bg-[radial-gradient(circle_at_50%_35%,#1a2210,#0c0d10_65%)]">
      <div className="grid-bg absolute inset-0 opacity-40" />
      <Avatar />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg via-bg/70 to-transparent p-6 pt-16">
        <p className="font-display text-2xl font-semibold">{PROFILE.name}</p>
        <p className="font-mono text-xs text-accent">{PROFILE.role} · probably shipping something</p>
      </div>
    </div>
  );
}
