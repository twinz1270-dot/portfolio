import GradientText from "@/components/ui/GradientText";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionDivider from "@/components/ui/SectionDivider";

const capabilities = [
  {
    title: "SaaS Products",
    examples: "Dashboards, admin panels, internal tools, MVP interfaces, subscription products",
  },
  {
    title: "E-Commerce",
    examples: "Storefronts, product pages, collections, cart and checkout flows, responsive commerce interfaces",
  },
  {
    title: "Business Websites",
    examples: "Company websites, landing pages, service websites, conversion-focused interfaces",
  },
  {
    title: "Web Applications",
    examples: "Interactive applications, portals, management systems, authenticated interfaces",
  },
  {
    title: "AI Interfaces",
    examples: "AI tools, chatbot interfaces, AI dashboards, LLM-powered frontend experiences",
  },
  {
    title: "Dashboards",
    examples: "Admin dashboards, analytics interfaces, operations dashboards, data-heavy UI",
  },
  {
    title: "Booking / Marketplace Platforms",
    examples: "Booking flows, marketplace interfaces, service-selection experiences, account and dashboard areas",
  },
  {
    title: "UI / UX Implementation",
    examples: "Figma to code, responsive interface development, component systems, design system implementation",
  },
  {
    title: "Interactive Frontend Experiences",
    examples: "GSAP, Framer Motion, Three.js, scroll-based interactions, premium motion interfaces",
  },
];

export default function Capabilities() {
  return (
    <section id="capabilities" aria-label="Frontend capabilities" className="section-padding relative">
      <SectionDivider />
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/30" />
            <span className="font-display text-sm font-medium tracking-widest text-primary/60 uppercase">Available for</span>
            <div className="h-px flex-1 bg-gradient-to-l from-primary/30 to-transparent" />
          </div>
          <GradientText as="h2" className="mt-4 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            What I Build
          </GradientText>
          <p className="mt-4 max-w-2xl text-text-secondary">
            Frontend products and interface work I&apos;m available to take on, from clear business experiences to interactive web applications.
          </p>
        </ScrollReveal>

        <div className="mt-8 grid gap-x-8 sm:grid-cols-2 xl:grid-cols-3">
          {capabilities.map((capability, index) => (
            <ScrollReveal key={capability.title} delay={(index % 3) * 0.06}>
              <article className="h-full border-t border-white/[0.08] py-5">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-xs font-semibold text-primary-light/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-base font-semibold text-white sm:text-lg">
                    {capability.title}
                  </h3>
                </div>
                <p className="mt-2 pl-7 text-sm leading-relaxed text-text-secondary">
                  {capability.examples}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}