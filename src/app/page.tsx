import Navigation from "@/components/layout/Navigation";
import CustomCursor from "@/components/layout/CustomCursor";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Summary from "@/components/sections/Summary";
import Capabilities from "@/components/sections/Capabilities";
import About from "@/components/sections/About";
import { ProjectsHeader, ProjectDetail } from "@/components/sections/Projects";
import ProjectSnapZone from "@/components/sections/ProjectSnapZone";
import Skills from "@/components/sections/Skills";
import { Education, Experience } from "@/components/sections/ExperienceEducation";
import Contact from "@/components/sections/Contact";
import GalaxyBackground from "@/components/three/GalaxyBackground";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <>
      <GalaxyBackground />

      <main className="relative z-10">
        <Navigation />

        <section id="hero" aria-label="Introduction" className="h-screen">
          <Hero />
        </section>

        <Summary />
        <Capabilities />

        {/* Solar system overview */}
        <section id="projects" aria-label="Featured projects" className="flex h-screen items-center overflow-hidden">
          <div className="w-full">
            <ProjectsHeader />
          </div>
        </section>

        {/* Individual planet/project sections — planet on the left, info on the right */}
        <ProjectSnapZone>
          {projects.map((project, index) => (
            <section
              key={project.slug}
              id={`project-${index}`}
              aria-label={`Project preview ${String(index + 1).padStart(2, "0")}`}
              className="h-screen"
            >
              <ProjectDetail index={index} />
            </section>
          ))}
        </ProjectSnapZone>

        <section id="skills" aria-label="Tech stack">
          <Skills />
        </section>

        <Experience />
        <Education />

        <section id="about" aria-label="About Laiba">
          <About />
        </section>

        <section id="contact" aria-label="Contact">
          <Contact />
          <Footer />
        </section>
      </main>

      <CustomCursor />
    </>
  );
}
