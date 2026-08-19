"use client";

import dynamic from "next/dynamic";
import { projects, type Project } from "@/data/projects";
import { useInViewport } from "@/hooks/useInViewport";

const PlaceholderScene = dynamic(() => import("@/components/scenes/PlaceholderScene"), {
  ssr: false,
});

export default function ProjectSection({ project }: { project: Project }) {
  const { ref, inView } = useInViewport<HTMLDivElement>();
  const reversed = project.index % 2 === 0;

  return (
    <section
      ref={ref}
      className={`flex min-h-screen flex-col items-center gap-10 border-t border-(--color-surface) px-6 py-24 sm:px-12 md:flex-row ${
        reversed ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="flex-1">
        <p
          className="font-mono text-sm tracking-widest"
          style={{ color: project.accentColor }}
        >
          {String(project.index).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </p>
        <h2 className="mt-4 font-display text-3xl font-bold text-(--color-paper) sm:text-4xl">
          {project.title}
        </h2>
        <p className="mt-2 font-display text-lg" style={{ color: project.accentColor }}>
          {project.tagline}
        </p>
        <p className="mt-4 text-(--color-muted)">{project.description}</p>
        <p className="mt-4 text-sm text-(--color-paper)">{project.standout}</p>
        <ul className="mt-6 flex flex-wrap gap-2 font-mono text-xs text-(--color-muted)">
          {project.tech.map((tech) => (
            <li key={tech} className="rounded border border-(--color-surface) px-2 py-1">
              {tech}
            </li>
          ))}
        </ul>
        <p className="mt-4 font-mono text-xs" style={{ color: project.accentColor }}>
          STATUS: {project.status}
        </p>
        {project.links?.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block font-mono text-sm hover:underline"
            style={{ color: project.accentColor }}
          >
            {link.label} →
          </a>
        ))}
      </div>
      <div className="h-64 w-full flex-1 sm:h-80">
        {inView && <PlaceholderScene />}
      </div>
    </section>
  );
}
