import type { MetadataRoute } from "next";
import { puppies } from "@/lib/catalogue";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return [
    "",
    "/puppies",
    "/gone-home",
    "/happy-families",
    "/how-it-works",
    "/faq",
    "/contact",
    ...puppies.map((p) => "/puppies/" + p.slug),
  ].map((path) => ({ url: base + path }));
}
