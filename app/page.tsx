import Hero from "@/components/sections/Hero";
import ProjectSection from "@/components/sections/ProjectSection";
import Footer from "@/components/sections/Footer";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <>
      <Hero />
      <div id="projects">
        {projects.map((project) => (
          <ProjectSection key={project.id} project={project} />
        ))}
      </div>
      <Footer />
    </>
  );
}
