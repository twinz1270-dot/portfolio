import GradientText from "@/components/ui/GradientText";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Summary() {
  return (
    <section id="summary" aria-label="Professional summary" className="section-padding relative">
      <SectionDivider />
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[1fr_2fr] md:gap-16">
        <ScrollReveal>
          <div className="flex items-center gap-4">
            <span className="font-display text-sm font-medium tracking-widest text-primary/60 uppercase">01</span>
            <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
          </div>
          <GradientText as="h2" className="mt-4 font-display text-3xl font-bold sm:text-4xl">
            Professional Summary
          </GradientText>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-xl leading-relaxed text-white sm:text-2xl">
            Frontend Developer focused on modern React interfaces and product-minded software engineering.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
            Software Engineering graduate with practical experience in UI/UX design, frontend development, and user-centered interface design. I use Figma and responsive design to translate ideas into modern, interactive experiences, with familiarity in testing, databases, APIs, Git workflows, and modern development tools.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}