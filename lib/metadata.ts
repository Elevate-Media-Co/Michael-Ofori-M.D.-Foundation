import type { Metadata } from "next";
import { siteOrigin } from "./config";
import { foundation } from "./site";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = siteOrigin ? new URL(path, siteOrigin).href : undefined;
  const socialTitle = path === "/" ? foundation.name : `${title} | ${foundation.name}`;
  return {
    title: path === "/" ? { absolute: foundation.name } : title,
    description,
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      title: socialTitle,
      description,
      ...(url ? { url, images: [{ url: new URL("/images/social.jpg", url).href, width: 1200, height: 630, alt: foundation.name }] } : {}),
      siteName: foundation.name,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: siteOrigin ? "summary_large_image" : "summary",
      title: socialTitle,
      description,
      ...(siteOrigin ? { images: [new URL("/images/social.jpg", siteOrigin).href] } : {}),
    },
  };
}
