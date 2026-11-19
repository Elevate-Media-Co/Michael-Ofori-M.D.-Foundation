export const foundation = {
  name: "Michael Ofori M.D. Foundation",
  founder: "Dr. Michael K. Ofori, MD",
  field: "Anesthesiology",
  mission:
    "To advance health and opportunity by supporting medical and dental students, equipping community hospitals, and providing essential medical supplies and resources to underserved communities.",
  vision:
    "We envision a future where aspiring healthcare professionals, hospitals, and underserved communities, regardless of financial or social circumstances, have access to the resources, knowledge, and support needed to build healthier lives and stronger communities.",
  summary:
    "A registered nonprofit supporting healthcare education and access to essential medical resources.",
  // Place approved image files in public/ and use a root-relative path here.
  logo: "/images/foundation-logo.jpg" as string,
  founderPortrait: "/images/dr-michael-ofori.webp" as string,
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Impact", href: "/impact" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Contact", href: "/contact" },
];

export function httpsUrl(value: string | undefined) {
  try {
    const url = new URL(value?.trim() ?? "");
    if (url.protocol === "https:" && !url.username && !url.password) return url;
  } catch {
    return undefined;
  }
}

export const simpleEmail = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
