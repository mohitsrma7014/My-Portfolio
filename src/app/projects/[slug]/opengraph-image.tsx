import { ImageResponse } from "next/og";
import { PROFILE, PROJECTS, projectSlug } from "@/lib/profile";

export const alt = `Project by ${PROFILE.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: projectSlug(p) }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PROJECTS.find((x) => projectSlug(x) === slug) ?? PROJECTS[0];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#060607",
          backgroundImage: "radial-gradient(circle at 85% 25%, #b6ff3b38, transparent 45%), radial-gradient(circle at 5% 105%, #22d3ee30, transparent 40%)",
          color: "#e9edf6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: "#8d95a8" }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, border: "2px solid #b6ff3b", color: "#b6ff3b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700 }}>
            MS
          </div>
          {PROFILE.name} · Projects
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 26, letterSpacing: 5, textTransform: "uppercase", color: "#b6ff3b" }}>{p.cat}</div>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05, maxWidth: 1050 }}>{p.title}</div>
          <div style={{ fontSize: 28, color: "#8d95a8", maxWidth: 1000 }}>{p.summary}</div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {p.tech.slice(0, 5).map((t) => (
            <div key={t} style={{ fontSize: 22, padding: "8px 16px", borderRadius: 999, border: "1px solid #ffffff30", color: "#e9edf6" }}>{t}</div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
