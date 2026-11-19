import { BookOpen, HandHeart, Hospital, PackagePlus } from "lucide-react";
import { photos } from "./photos";

export const programs = [
  {
    id: "education",
    title: "Medical & Dental Education",
    short: "Educational assistance for aspiring medical and dental professionals.",
    detail: "The cost of training can put a medical or dental education out of reach. The Foundation’s educational focus includes grants and other support that can help students with financial need continue their studies.",
    icon: BookOpen,
    photo: photos.education,
    action: "Ask about educational support",
    inquiry: "education",
  },
  {
    id: "hospital-equipment",
    title: "Community Hospital Equipment",
    short: "Equipment support for community hospitals with limited resources.",
    detail: "The Foundation focuses on equipment that addresses a hospital’s identified clinical needs. Before pursuing a contribution, we consider how staff would use the equipment and whether the facility can maintain it.",
    icon: Hospital,
    photo: photos.equipment,
    action: "Discuss a hospital equipment need",
    inquiry: "resources",
  },
  {
    id: "medical-resources",
    title: "Essential Medical Resources",
    short: "Essential supplies for rural clinics and underserved healthcare facilities.",
    detail: "Rural clinics and underserved facilities need reliable access to the supplies they use every day. The Foundation prioritizes requests shaped by local healthcare teams who understand which supplies can make the biggest practical difference.",
    icon: PackagePlus,
    photo: photos.resources,
    action: "Discuss a medical supply need",
    inquiry: "resources",
  },
  {
    id: "community-support",
    title: "Healthcare Education & Community Support",
    short: "Health education, collaboration, and charitable support shaped by local needs.",
    detail: "Healthcare education can make information easier to understand and use. The Foundation welcomes conversations with organizations about locally relevant education and practical ways to support communities they serve.",
    icon: HandHeart,
    photo: photos.community,
    action: "Discuss a community collaboration",
    inquiry: "partnership",
  },
];
