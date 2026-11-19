import "server-only";
import { httpsUrl, simpleEmail } from "./site";

const canonical = httpsUrl(process.env.SITE_URL);
export const siteOrigin = canonical?.origin;
export const allowIndexing = Boolean(siteOrigin) &&
  (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production");

function readEmail(value: string | undefined) {
  const email = value?.trim() ?? "";
  return simpleEmail.test(email) ? email : undefined;
}

export const publicDetails = {
  donation: httpsUrl(process.env.DONATION_URL)?.href,
  email: readEmail(process.env.FOUNDATION_EMAIL),
  location: process.env.FOUNDATION_LOCATION?.trim(),
  social: [
    { label: "LinkedIn", url: httpsUrl(process.env.FOUNDATION_LINKEDIN_URL)?.href },
    { label: "Instagram", url: httpsUrl(process.env.FOUNDATION_INSTAGRAM_URL)?.href },
  ].filter((link): link is { label: string; url: string } => Boolean(link.url)),
};

export function contactSettings() {
  const key = process.env.RESEND_API_KEY?.trim();
  const from = readEmail(process.env.CONTACT_FROM_EMAIL);
  const to = readEmail(process.env.CONTACT_TO_EMAIL);
  return key && from && to ? { key, from, to } : undefined;
}
