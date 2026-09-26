import type { Project } from "@/types";

export const PROJECT_CATEGORIES = [
  "SaaS",
  "E-Commerce",
  "AI Product",
  "Business Website",
  "Dashboard",
  "Booking / Marketplace",
  "Creative / Animated Frontend",
  "UI / UX Product",
] as const;

export const PROJECT_CAPACITY = 8;

// Temporary portfolio entries. Replace these records with verified projects as they are ready.
export const projects: Project[] = [
  {
    slug: "bankgo",
    title: "BankGo — Fintech App Prototype",
    shortTitle: "BankGo",
    category: "Fintech App Prototype",
    description: "Designed a user-centered mobile banking prototype focused on usability and core financial features.",
    technologies: ["Figma"],
    featured: false,
    projectType: "ui-ux",
    status: "planned",
  },
  {
    slug: "weatherwizz",
    title: "WeatherWizz — Weather App Design",
    shortTitle: "WeatherWizz",
    category: "Weather App Design",
    description: "Designed a clean and user-friendly weather interface with clear information hierarchy and intuitive navigation.",
    technologies: ["Figma"],
    featured: false,
    projectType: "ui-ux",
    status: "planned",
  },
  {
    slug: "cricket-app",
    title: "Cricket App — UI/UX Design",
    shortTitle: "Cricket App",
    category: "UI/UX Design",
    description: "Designed an engaging cricket application interface with user-friendly screens, match information and intuitive navigation.",
    technologies: ["Figma"],
    featured: false,
    projectType: "ui-ux",
    status: "planned",
  },
  {
    slug: "personal-portfolio",
    title: "Personal Portfolio Website",
    shortTitle: "Portfolio Website",
    category: "Personal Website",
    description: "Created a responsive website to present professional profile, skills and projects.",
    technologies: ["HTML", "CSS", "JavaScript"],
    featured: false,
    projectType: "frontend",
    status: "planned",
  },
];