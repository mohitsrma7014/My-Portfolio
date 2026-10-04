import type { MetadataRoute } from "next";
import { PROFILE } from "@/lib/profile";

export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : true;
  return {
    rules: isProd ? { userAgent: "*", allow: "/", disallow: "/api/" } : { userAgent: "*", disallow: "/" },
    sitemap: `${PROFILE.url}/sitemap.xml`,
  };
}
