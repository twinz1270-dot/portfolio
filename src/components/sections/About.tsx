import { languages } from "@/lib/constants";
import GradientText from "@/components/ui/GradientText";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionDivider from "@/components/ui/SectionDivider";

const strengths = [
  "Problem Solving",
  "Attention to Detail",
  "Communication",
  "Teamwork",
  "Adaptability",
];

const details = [
  { label: "Based in", value: "Islamabad, Pakistan" },
  { label: "Primary focus", value: "Frontend Development" },
  { label: "Also", value: "UI/UX Design · Software Engineering" },
  {
    label: "Interested in",
    value: "SaaS · E-Commerce · Web Applications · Dashboards · AI Interfaces · Interactive Frontend Experiences",
  },
];

export default function About() {
  return (
    <section className="section-padding relative">
      <SectionDivider />
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <div className="flex items-center gap-4">
            <span className="font-display text-sm font-medium tracking-widest text-primary/60 uppercase">06</span>
            <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
          </div>
          <GradientText as="h2" className="mt-4 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            About Me
          </GradientText>
        </ScrollReveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(17rem,0.75fr)] lg:gap-16">
          <ScrollReveal delay={0.1}>
            <p className="max-w-3xl font-display text-xl leading-relaxed text-white sm:text-2xl">
              I&apos;m a Frontend Developer and Software Engineering graduate focused on creating responsive, intuitive, and visually polished digital experiences.
            </p>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-text-secondary sm:text-lg">
              My work sits at the intersection of frontend engineering and UI/UX: turning ideas and designs into interfaces that are functional, clear, engaging, and easy to use. I enjoy modern web technologies, component-based development, responsive design, interaction, and design-to-code workflows.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-text-secondary sm:text-base">
              I also have practical exposure to UI/UX design and Figma, software testing, APIs, databases, Git workflows, and collaborative software development.
            </p>
            <p className="mt-7 border-l border-primary/50 pl-4 font-display text-lg text-primary-light sm:text-xl">
              Where thoughtful design meets frontend engineering.
            </p>
            <div className="mt-8 border-t border-white/[0.08] pt-5">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-text-secondary/60">
                How I work
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary sm:text-base">
                {strengths.join(" · ")}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <dl className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {details.map((detail) => (
                <div key={detail.label} className="py-4">
                  <dt className="text-xs font-semibold uppercase tracking-widest text-text-secondary/60">{detail.label}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-white sm:text-base">{detail.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-text-secondary/60">Languages</h3>
              <ul className="mt-2 divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {languages.map((language) => (
                <li key={language.name} className="flex items-center justify-between gap-4 py-3 text-sm sm:text-base">
                  <span className="text-text-secondary">{language.name}</span>
                  {language.detail && <span className="text-right text-primary-light">{language.detail}</span>}
                </li>
              ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
