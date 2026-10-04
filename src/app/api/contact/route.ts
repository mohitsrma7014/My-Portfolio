// Portfolio contact form. With RESEND_API_KEY set, messages are emailed to CONTACT_TO_EMAIL;
// otherwise they are written to the server log (Vercel → Logs).
import { PROFILE } from "@/lib/profile";

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 5;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) return Response.json({ ok: false, error: "Too many messages — please try again later." }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  if (str(body.website, 200)) return Response.json({ ok: true }); // honeypot

  const msg = {
    name: str(body.name, 120),
    email: str(body.email, 200),
    subject: str(body.subject, 200),
    message: str(body.message, 5000),
  };
  if (!msg.name || !msg.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(msg.email)) {
    return Response.json({ ok: false, error: "Please fill in your name, a valid email and a message." }, { status: 422 });
  }

  console.log("[portfolio] new message", JSON.stringify(msg));

  const key = process.env.RESEND_API_KEY;
  if (key) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO_EMAIL ?? PROFILE.email],
        reply_to: msg.email,
        subject: `Portfolio: ${msg.subject || "New message"} — ${msg.name}`,
        html: `<p><b>${esc(msg.name)}</b> &lt;${esc(msg.email)}&gt;</p><p><b>${esc(msg.subject)}</b></p><p style="white-space:pre-wrap">${esc(msg.message)}</p>`,
      }),
    });
    if (!res.ok) {
      console.error("[portfolio] email failed", res.status, await res.text());
      return Response.json({ ok: false, error: `Couldn't send — please email ${PROFILE.email} directly.` }, { status: 502 });
    }
  }
  return Response.json({ ok: true });
}
