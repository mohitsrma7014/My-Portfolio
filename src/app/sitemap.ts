import type { MetadataRoute } from "next";
import { PROFILE } from "@/lib/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: PROFILE.url, lastModified: new Date("2026-10-04"), changeFrequency: "monthly", priority: 1 }];
}
