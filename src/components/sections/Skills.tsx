"use client";

import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Code2, Wrench, CloudUpload, Database, PanelsTopLeft, Sparkles } from "lucide-react";
import { skillCategories } from "@/lib/constants";
import GradientText from "@/components/ui/GradientText";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionDivider from "@/components/ui/SectionDivider";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].name);
  const selectedCategory = skillCategories.find((category) => category.name === activeCategory) ?? skillCategories[0];

  return (
    <section className="section-padding relative">
      <SectionDivider />
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <div className="flex items-center gap-4">
            <span className="font-display text-sm font-medium tracking-widest text-primary/60 uppercase">03</span>
            <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
          </div>
          <GradientText as="h2" className="mt-4 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            Tech Stack
          </GradientText>
          <p className="mt-4 max-w-2xl text-text-secondary">
            Frontend engineering, interaction, design, and supporting foundations.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <div role="group" aria-label="Technology categories" className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {skillCategories.map((category, index) => {
              const selected = selectedCategory.name === category.name;
              return (
                <button
                  key={category.name}
                  type="button"
                  onClick={() => setActiveCategory(category.name)}
                  aria-pressed={selected}
                  className={`flex min-h-14 items-center gap-2 rounded-xl border px-3 py-2 text-left transition-colors sm:px-4 ${
                    selected
                      ? "border-primary/30 bg-primary/10 text-white"
                      : "border-glass-border bg-galaxy-dark/40 text-text-secondary hover:border-primary/20 hover:text-white"
                  }`}
                >
                  <span className="shrink-0 font-display text-xs font-semibold text-primary-light/80">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-snug">{category.name}</span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selectedCategory.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="mt-8 min-h-40 border-l border-primary/25 pl-5 sm:pl-7"
            aria-live="polite"
          >
            <div className="flex items-center gap-3">
              <span className="text-primary-light">
                {selectedCategory.name.includes("Data") ? <Database size={20} /> :
                  selectedCategory.name.includes("Deployment") ? <CloudUpload size={20} /> :
                  selectedCategory.name.includes("Tool") ? <Wrench size={20} /> :
                    selectedCategory.name.includes("Animation") ? <Sparkles size={20} /> :
                    selectedCategory.name.includes("UI") || selectedCategory.name.includes("Styling") ? <PanelsTopLeft size={20} /> :
                      <Code2 size={20} />}
              </span>
              <h3 className="font-display text-lg font-semibold text-white sm:text-xl">{selectedCategory.name}</h3>
            </div>
            {selectedCategory.description && (
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-text-secondary">{selectedCategory.description}</p>
            )}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mt-5 flex flex-wrap gap-2"
            >
              {selectedCategory.skills.map((skill) => (
                <motion.span
                  key={skill.name}
                  variants={badgeVariants}
                  whileHover={{ scale: 1.04, y: -1 }}
                  className="badge cursor-default rounded-lg border border-glass-border bg-galaxy-darker/60 text-sm font-medium text-text-secondary transition-colors hover:border-primary/30 hover:text-white"
                >
                  {skill.name}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
