"use client";

import { Github, Linkedin, Mail, Link2, ArrowUpRight } from "lucide-react";
import { personalInfo } from "@/lib/constants";
import GradientText from "@/components/ui/GradientText";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionDivider from "@/components/ui/SectionDivider";
import ContactForm from "./ContactForm";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  portfolio: Link2,
};

export default function Contact() {
  return (
    <section className="relative overflow-hidden px-6 pt-32 pb-12 md:px-12 md:pt-40 md:pb-16 xl:px-16">
      <SectionDivider />

      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        {/* Heading */}
        <ScrollReveal>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/30" />
            <span className="font-display text-sm font-medium tracking-widest text-primary/60 uppercase">07</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/30" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <GradientText as="h2" className="mt-4 text-center font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            <span className="block">LET&apos;S BUILD</span>
            <span className="block">SOMETHING.</span>
          </GradientText>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mx-auto mt-4 max-w-xl text-center text-base leading-relaxed text-text-secondary md:text-lg">
            Have a project, product idea, or interface that needs to be brought to life? Let&apos;s talk.
          </p>
        </ScrollReveal>

        <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <ScrollReveal delay={0.15}>
            <div className="flex h-full flex-col justify-between gap-8">
              {/* Direct email */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-text-secondary/60">
                  Direct contact
                </h3>
                {personalInfo.email ? (
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="mt-3 inline-flex items-center gap-2 font-display text-lg font-medium text-white transition-colors hover:text-primary-light sm:text-xl"
                  >
                    {personalInfo.email}
                    <ArrowUpRight size={16} className="text-primary-light" />
                  </a>
                ) : (
                  <p className="mt-2 font-medium text-text-secondary">Email address to add</p>
                )}
                {personalInfo.location && (
                  <p className="mt-1 text-xs text-text-secondary/60">{personalInfo.location}</p>
                )}
              </div>

              {/* Social links */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-text-secondary/60">
                  Profiles
                </h3>
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
                  {personalInfo.socials.map((social) => {
                    const Icon = iconMap[social.icon] || Mail;
                    const className = "inline-flex min-h-10 items-center gap-2 text-sm text-text-secondary transition-colors hover:text-white";
                    return social.url ? (
                      <a
                        key={social.name}
                        href={social.url}
                        target={social.url.startsWith("mailto") ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        className={className}
                      >
                        <Icon size={16} />
                        <span>{social.name} ↗</span>
                      </a>
                    ) : (
                      <span key={social.name} className={className} aria-label={`${social.name} placeholder`}>
                        <Icon size={16} className="text-text-secondary/60" />
                        <span>{social.name} <span className="text-text-secondary/50">(add link)</span></span>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-secondary/70" aria-label="Project types welcome">
              <span>Frontend projects welcome:</span>
              <span>SaaS</span><span>E-Commerce</span><span>Web Apps</span><span>Dashboards</span><span>AI</span><span>Business</span><span>Booking</span><span>UI / UX</span><span>Interactive</span>
            </div>
            <ContactForm />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
