import type { MetadataRoute } from "next";
import { allowIndexing, siteOrigin } from "@/lib/config";
import { navigation } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!allowIndexing || !siteOrigin) return [];
  const paths = [...navigation.map(({ href }) => href), "/privacy", "/terms"];
  return paths.map((path) => ({ url: new URL(path, siteOrigin).href }));
}
