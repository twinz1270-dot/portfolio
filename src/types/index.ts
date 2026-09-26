export interface Project {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  description: string;
  role?: string;
  year?: number | string;
  technologies: string[];
  image?: string;
  gallery?: string[];
  video?: string;
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  featured?: boolean;
  projectType: "ui-ux" | "frontend";
  status: "temporary" | "planned" | "in-progress" | "published" | "archived";
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
  description?: string;
}

export interface Skill {
  name: string;
  icon?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  email: string;
  location: string;
  socials: SocialLink[];
}
