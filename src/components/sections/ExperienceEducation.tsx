import GradientText from "@/components/ui/GradientText";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionDivider from "@/components/ui/SectionDivider";

const experience = [
  {
    role: "UI/UX Intern",
    organization: "Explorer Bees",
    period: "Jun 2025 – Aug 2025",
    highlights: [
      "Collaborated with team members on UI/UX tasks and project objectives within defined timelines.",
      "Designed and refined user-centered interfaces using Figma.",
      "Focused on usability, visual hierarchy, and interface clarity.",
      "Participated in interface design and software development activities.",
      "Gained practical exposure to professional UI/UX and development workflows.",
      "Applied teamwork, communication, and time-management skills in a professional environment.",
    ],
  },
  {
    role: "Content Writer",
    organization: "QMH",
    period: "1 year",
    summary: "Content creation, research, clear writing, communication, and teamwork.",
  },
  {
    role: "Teacher",
    organization: "",
    period: "2024–2025",
    summary: "Communication, organization, presentation, leadership, and time management.",
  },
];

const education = [
  {
    qualification: "BS (Hons) Software Engineering",
    institution: "National University of Modern Languages (NUML)",
    period: "2022–2026",
  },
  {
    qualification: "Intermediate — ICS",
    institution: "",
    period: "2019–2021",
  },
  {
    qualification: "Matric (Pre-Medical)",
    institution: "",
    period: "2017–2019",
  },
];

export function Experience() {
  return (
    <section id="experience" aria-label="Professional experience" className="section-padding relative">
      <SectionDivider />
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <div className="flex items-center gap-4">
            <span className="font-display text-sm font-medium tracking-widest text-primary/60 uppercase">04</span>
            <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
          </div>
          <GradientText as="h2" className="mt-4 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            Experience
          </GradientText>
        </ScrollReveal>

        <div className="mt-10 border-l border-primary/25 pl-6 sm:pl-8">
          {experience.map((item, index) => (
            <ScrollReveal key={`${item.organization}-${item.role}`} delay={index * 0.1}>
              <article className={`relative ${index === 0 ? "pb-8" : "border-t border-white/[0.08] py-5"}`}>
                <span className="absolute -left-[calc(1.5rem+5px)] top-2 h-2.5 w-2.5 rounded-full border-2 border-primary bg-galaxy-darker sm:-left-[calc(2rem+5px)]" />
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <div>
                    <h3 className={`font-display font-semibold text-white ${index === 0 ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"}`}>
                      {item.role}
                    </h3>
                    {item.organization && <p className="mt-1 text-base text-text-secondary">{item.organization}</p>}
                  </div>
                  <p className="text-sm font-medium text-primary-light">{item.period}</p>
                </div>
                {item.highlights && (
                  <ul className="mt-5 max-w-3xl space-y-2 border-l border-white/[0.08] pl-4 text-sm leading-relaxed text-text-secondary sm:text-base">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="list-disc pl-1 marker:text-primary/70">{highlight}</li>
                    ))}
                  </ul>
                )}
                {item.summary && <p className="mt-2 max-w-3xl text-sm leading-relaxed text-text-secondary">{item.summary}</p>}
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Education() {
  return (
    <section id="education" aria-label="Education" className="section-padding relative">
      <SectionDivider />
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <div className="flex items-center gap-4">
            <span className="font-display text-sm font-medium tracking-widest text-primary/60 uppercase">05</span>
            <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
          </div>
          <GradientText as="h2" className="mt-4 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            Education
          </GradientText>
        </ScrollReveal>

        <div className="mt-8 divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {education.map((item, index) => (
            <ScrollReveal key={item.qualification} delay={index * 0.08}>
              <article className="grid gap-2 py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-8">
                <div>
                  <h3 className="font-display text-lg font-semibold text-white sm:text-xl">{item.qualification}</h3>
                  {item.institution && <p className="mt-1 text-sm text-text-secondary">{item.institution}</p>}
                </div>
                <p className="text-sm font-medium text-primary-light">{item.period}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}