export type Photo = { src: string; alt: string; position?: string };

export const photos = {
  hero: {
    src: "/images/clinical-care.webp",
    alt: "A clinician and nurse speak with a patient in a hospital room",
    position: "53% 46%",
  },
  team: {
    src: "/images/healthcare-team.webp",
    alt: "Healthcare professionals talking together in a hospital corridor",
    position: "88% 45%",
  },
  education: {
    src: "/images/medical-education.webp",
    alt: "Medical students sharing notes in a bright hallway",
    position: "50% 45%",
  },
  equipment: {
    src: "/images/hospital-equipment.webp",
    alt: "Medical equipment beside a hospital bed",
    position: "50% 52%",
  },
  resources: {
    src: "/images/clinic-supplies.webp",
    alt: "Shelves stocked with medical supplies",
    position: "50% 67%",
  },
  community: {
    src: "/images/community-care.webp",
    alt: "A clinician talking with a patient and sharing information on a tablet",
    position: "51% 48%",
  },
} satisfies Record<string, Photo>;
