import type { MetadataRoute } from "next";
import { allowIndexing, siteOrigin } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: allowIndexing ? `${siteOrigin}/sitemap.xml` : undefined,
  };
}
