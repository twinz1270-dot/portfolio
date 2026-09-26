"use client";

import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { PROJECT_CATEGORIES, projects } from "@/lib/projects";
import GradientText from "@/components/ui/GradientText";
import ScrollReveal from "@/components/ui/ScrollReveal";

const PLANET_NAMES = ["Earth", "Mars", "Jupiter", "Saturn"];

export function ProjectsHeader() {
  return (
    <div className="section-padding pb-0">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <div className="flex items-center gap-4">
            <span className="font-display text-sm font-medium tracking-widest text-primary/60 uppercase">SELECTED WORK</span>
            <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
          </div>
          <GradientText as="h2" className="mt-4 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            <span className="block">PROJECTS</span>
            <span className="block">COMING SOON.</span>
          </GradientText>
          <p className="mt-4 max-w-2xl text-text-secondary">
            I&apos;m currently preparing a collection of frontend projects across SaaS, e-commerce, dashboards, AI interfaces, business websites, booking platforms, and interactive web experiences.
          </p>
          <p className="mt-3 text-sm text-text-secondary/70">Case studies and live demos will be added soon.</p>
          <div className="mt-5 flex max-w-3xl flex-wrap gap-2" aria-label="Future project categories">
            {PROJECT_CATEGORIES.map((category) => (
              <span key={category} className="badge rounded-lg border border-white/[0.06] bg-white/[0.025] text-xs font-medium text-text-secondary/75">
                {category}
              </span>
            ))}
          </div>
          <span className="badge mt-5 gap-2 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold uppercase tracking-widest text-primary-light">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-light/80" />
            IN DEVELOPMENT
          </span>
        </ScrollReveal>
      </div>
    </div>
  );
}

export function ProjectDetail({ index }: { index: number }) {
  const project = projects[index];
  if (!project) return null;

  if (project.status !== "published") {
    if (index !== 0) return null;
    return (
      <div className="flex h-full items-center justify-end px-6 sm:px-12 lg:pr-24 lg:pl-[42%]">
        <div className="w-full max-w-xl rounded-3xl border border-white/[0.04] bg-[#050812]/90 p-8 text-center backdrop-blur-xl sm:p-10">
          <ScrollReveal>
            <span className="badge rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold uppercase tracking-widest text-primary-light">
              IN DEVELOPMENT
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <p className="mt-6 font-display text-xl font-semibold text-white sm:text-2xl">Frontend case studies are in preparation.</p>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">The project gallery will appear here as work is ready to share.</p>
          </ScrollReveal>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full items-center justify-end px-6 sm:px-12 lg:pr-24 lg:pl-[42%]">
      <div className="w-full max-w-xl rounded-3xl border border-white/[0.04] bg-[#050812]/90 p-8 text-center backdrop-blur-xl sm:p-10">
        {/* Badge */}
        <ScrollReveal>
          <span className="badge rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold uppercase tracking-widest text-primary-light">
            {PLANET_NAMES[index % PLANET_NAMES.length]} — {project.category}
          </span>
        </ScrollReveal>

        {/* Logo + Title */}
        <ScrollReveal delay={0.05}>
          <div className="mt-6 flex flex-col items-center gap-4">
            {project.image && (
              <div className="relative h-[96px] w-[96px] overflow-hidden rounded-2xl border border-glass-border bg-galaxy-dark/50 p-3">
                <Image
                  src={project.image}
                  alt={`${project.shortTitle} preview`}
                  fill
                  sizes="96px"
                  className="rounded-xl object-contain p-3"
                />
              </div>
            )}
            <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
              {project.title}
            </h3>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="badge gap-1.5 rounded-full bg-white/10 text-xs font-semibold text-white transition-all hover:bg-white/20 hover:scale-105"
              >
                <Github size={14} />
                Github repo link
              </a>
            )}
          </div>
        </ScrollReveal>

        {project.gallery && project.gallery.length > 0 && (
          <ScrollReveal delay={0.08}>
            <div aria-label={`${project.shortTitle} image gallery`} className="mt-5 flex gap-2 overflow-x-auto">
              {project.gallery.map((image, imageIndex) => (
                <div key={`${image}-${imageIndex}`} className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border border-glass-border bg-galaxy-dark/50 sm:h-24 sm:w-36">
                  <Image src={image} alt={`${project.shortTitle} gallery image ${imageIndex + 1}`} fill sizes="144px" className="object-cover" />
                </div>
              ))}
            </div>
          </ScrollReveal>
        )}

        {project.video && (
          <ScrollReveal delay={0.08}>
            <video className="mt-5 max-h-64 w-full rounded-xl border border-glass-border bg-black" controls playsInline preload="metadata">
              <source src={project.video} />
            </video>
          </ScrollReveal>
        )}

        {(project.role || project.year) && (
          <p className="mt-5 text-sm text-text-secondary">
            {[project.role, project.year].filter(Boolean).join(" · ")}
          </p>
        )}

        {/* Divider */}
        <div className="my-7 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />

        {/* Description */}
        <ScrollReveal delay={0.1}>
          <p className="text-sm leading-[1.8] text-text-secondary">
            {project.description}
          </p>
        </ScrollReveal>

        {/* Tech tags + Links */}
        <ScrollReveal delay={0.15}>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="badge rounded-lg border border-white/[0.06] bg-white/[0.03] text-xs font-medium text-text-secondary"
              >
                {tech}
              </span>
            ))}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="badge group gap-2 rounded-full bg-primary text-xs font-semibold text-white transition-all hover:bg-primary-light hover:shadow-lg hover:shadow-primary/20"
              >
                <ExternalLink size={12} />
                Live Demo
              </a>
            )}
            {project.caseStudyUrl && (
              <a
                href={project.caseStudyUrl}
                className="badge gap-2 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-primary-light transition-all hover:border-primary/40 hover:bg-primary/10"
              >
                Case Study
              </a>
            )}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
