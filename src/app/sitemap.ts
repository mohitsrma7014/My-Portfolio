import type { MetadataRoute } from "next";
import { PROFILE, PROJECTS, projectSlug } from "@/lib/profile";

// Bump when content changes so search engines re-crawl.
const UPDATED = new Date("2026-10-04");

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (path: string, priority: number) => ({ url: `${PROFILE.url}${path}`, lastModified: UPDATED, changeFrequency: "monthly" as const, priority });
  return [u("", 1), u("/resume", 0.9), u("/projects", 0.9), ...PROJECTS.map((p) => u(`/projects/${projectSlug(p)}`, 0.7))];
}
