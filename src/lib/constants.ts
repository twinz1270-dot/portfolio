import type { PersonalInfo, SkillCategory } from "@/types";

export const personalInfo: PersonalInfo = {
  name: "Laiba Kabeer",
  title: "Frontend Developer",
  subtitle: "Software Engineer • UI/UX Designer building responsive, interactive, and polished digital products with modern web technologies.",
  bio: "As a Frontend Developer with software engineering foundations and UI/UX awareness, I focus on modern interfaces, responsive products, and polished digital experiences.",
  email: "twinz1270@gmail.com",
  location: "",
  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/laiba-kabeer-93bb94356?utm_source=share_via&utm_content=profile&utm_medium=member_android", icon: "linkedin" },
    { name: "GitHub", url: "", icon: "github" },
    { name: "Portfolio", url: "", icon: "portfolio" },
  ],
};

export const languages = [
  { name: "English" },
  { name: "Urdu" },
  { name: "German", detail: "A1 · Goethe Certified" },
];

export const professionalStrengths = [
  "Analytical Thinking",
  "Problem Solving",
  "Attention to Detail",
  "Communication",
  "Teamwork",
  "Leadership",
  "Time Management",
  "Adaptability",
];

export const skillCategories: SkillCategory[] = [
  {
    name: "Frontend Languages",
    skills: [{ name: "HTML5" }, { name: "CSS3" }, { name: "JavaScript" }, { name: "TypeScript" }],
  },
  {
    name: "Core Frontend",
    skills: [
      { name: "React" }, { name: "Next.js" }, { name: "Responsive Web Design" },
      { name: "Component-Based Development" }, { name: "Reusable Components" },
      { name: "Modern CSS" }, { name: "CSS Grid" }, { name: "Flexbox" },
      { name: "DOM Manipulation" }, { name: "Client-Side Rendering" }, { name: "Responsive Layouts" },
    ],
  },
  {
    name: "Styling / UI",
    skills: [
      { name: "Tailwind CSS" }, { name: "shadcn/ui" }, { name: "CSS Modules" },
      { name: "Responsive Design" }, { name: "Design Systems" }, { name: "Component Styling" },
      { name: "Mobile-First Design" },
    ],
  },
  {
    name: "Animation / Interaction",
    description: "Used and explored in frontend projects and this portfolio; not an advanced 3D or WebGL specialization.",
    skills: [
      { name: "Framer Motion / Motion" }, { name: "GSAP" }, { name: "GSAP ScrollTrigger" },
      { name: "Lenis Smooth Scrolling" }, { name: "Three.js" }, { name: "React Three Fiber" },
      { name: "Drei" }, { name: "WebGL concepts" },
    ],
  },
  {
    name: "Tooling / Frameworks",
    skills: [
      { name: "React" }, { name: "Next.js" }, { name: "Vite" }, { name: "TypeScript" },
      { name: "npm" }, { name: "Git" }, { name: "GitHub" }, { name: "GitHub Codespaces" },
      { name: "Browser DevTools" }, { name: "ESLint" },
    ],
  },
  {
    name: "Deployment",
    skills: [{ name: "Vercel" }, { name: "Netlify" }, { name: "GitHub-based deployments" }],
  },
  {
    name: "Data / Backend Services",
    skills: [
      { name: "Supabase" }, { name: "REST APIs" }, { name: "API Integration" }, { name: "SQL" },
      { name: "MySQL" }, { name: "Database Fundamentals" }, { name: "Authentication concepts" },
    ],
  },
  {
    name: "UI / UX",
    skills: [
      { name: "Figma" }, { name: "UI Design" }, { name: "UX Design" }, { name: "Wireframing" },
      { name: "Prototyping" }, { name: "User-Centered Design" }, { name: "Design-to-Code" },
      { name: "Responsive Interface Design" }, { name: "Information Hierarchy" }, { name: "Usability" },
    ],
  },
  {
    name: "Software Engineering Foundations",
    skills: [
      { name: "Object-Oriented Programming" }, { name: "SDLC" }, { name: "Agile Basics" },
      { name: "API Testing" }, { name: "Software Testing" }, { name: "Debugging" }, { name: "Problem Solving" },
    ],
  },
  {
    name: "Additional Programming Knowledge",
    skills: [{ name: "C++" }, { name: "Java" }],
  },
  {
    name: "QA (Supporting)",
    skills: [
      { name: "Manual Testing" }, { name: "Test Case Design" }, { name: "Bug Reporting" },
      { name: "API Testing" }, { name: "Software Testing" }, { name: "Usability Testing Awareness" },
    ],
  },
];

export const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Work", href: "#projects" },
  { label: "Stack", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];