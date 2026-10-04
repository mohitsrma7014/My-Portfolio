import { ImageResponse } from "next/og";
import { PROFILE } from "@/lib/profile";

export const alt = `${PROFILE.name} — ${PROFILE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          backgroundImage: "radial-gradient(circle at 85% 25%, #b6ff3b40, transparent 45%), radial-gradient(circle at 5% 105%, #22d3ee33, transparent 40%)",
          color: "#e9edf6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 60, height: 60, borderRadius: 16, border: "2px solid #b6ff3b", color: "#b6ff3b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 700 }}>
            MS
          </div>
          <div style={{ fontSize: 26, color: "#8d95a8", display: "flex" }}>Portfolio</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1, display: "flex" }}>
            {PROFILE.name}
            <span style={{ color: "#b6ff3b" }}>.</span>
          </div>
          <div style={{ fontSize: 40, color: "#b6ff3b" }}>{PROFILE.role}</div>
          <div style={{ fontSize: 28, color: "#8d95a8" }}>Python · Machine Learning · LLMs · Django · Dashboards</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#8d95a8" }}>
          <span>{PROFILE.location}</span>
          <span>Founder @ Nexvorta</span>
        </div>
      </div>
    ),
    size,
  );
}
