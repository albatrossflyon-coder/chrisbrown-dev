import { render, screen } from "@testing-library/react";
import ProjectSection from "./ProjectSection";
import type { Project } from "@/data/projects";

const project: Project = {
  id: "test-project",
  index: 3,
  title: "Test Project",
  tagline: "A project used only for testing",
  description: "Description text.",
  standout: "Standout text.",
  tech: ["TypeScript"],
  status: "Live",
  accentColor: "#e7a33e",
  links: [{ label: "Live Demo", href: "https://example.com" }],
};

describe("ProjectSection", () => {
  it("applies the project's accentColor to the index, tagline, status, and link", () => {
    render(<ProjectSection project={project} />);

    const index = screen.getByText(/03 \//);
    const tagline = screen.getByText(project.tagline);
    const status = screen.getByText(/STATUS: Live/);
    const link = screen.getByRole("link", { name: /Live Demo/ });

    expect(index).toHaveStyle({ color: project.accentColor });
    expect(tagline).toHaveStyle({ color: project.accentColor });
    expect(status).toHaveStyle({ color: project.accentColor });
    expect(link).toHaveStyle({ color: project.accentColor });
  });

  it("does not hardcode a fixed color regardless of project (regression for the original bug)", () => {
    const otherProject: Project = { ...project, accentColor: "#e1573a" };
    const { unmount } = render(<ProjectSection project={project} />);
    const firstTagline = screen.getByText(project.tagline);
    expect(firstTagline).toHaveStyle({ color: "#e7a33e" });
    unmount();

    render(<ProjectSection project={otherProject} />);
    const secondTagline = screen.getByText(otherProject.tagline);
    expect(secondTagline).toHaveStyle({ color: "#e1573a" });
  });

  it("keeps the title and description in neutral, non-accent colors", () => {
    render(<ProjectSection project={project} />);

    const title = screen.getByRole("heading", { name: project.title });
    const description = screen.getByText(project.description);

    expect(title).not.toHaveStyle({ color: project.accentColor });
    expect(description).not.toHaveStyle({ color: project.accentColor });
  });
});
