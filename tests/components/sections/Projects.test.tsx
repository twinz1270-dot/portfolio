import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectsHeader, ProjectDetail } from "@/components/sections/Projects";
import { PROJECT_CATEGORIES, PROJECT_CAPACITY, projects } from "@/lib/projects";

vi.mock("@gsap/react", () => ({
  useGSAP: (cb: () => void) => cb(),
}));

vi.mock("@/lib/gsap-config", () => ({
  gsap: { from: vi.fn() },
}));

afterEach(() => vi.restoreAllMocks());

describe("<ProjectsHeader />", () => {
  it("renders the Coming Soon message and configured future categories", () => {
    render(<ProjectsHeader />);
    expect(screen.getByText("SELECTED WORK")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(screen.getByText("PROJECTS")).toBeInTheDocument();
    expect(screen.getByText("COMING SOON.")).toBeInTheDocument();
    expect(screen.getByText(/currently preparing a collection of frontend projects/i)).toBeInTheDocument();
    expect(screen.getByText("Case studies and live demos will be added soon.")).toBeInTheDocument();
    expect(screen.getByText("IN DEVELOPMENT")).toBeInTheDocument();
    for (const category of PROJECT_CATEGORIES) expect(screen.getByText(category)).toBeInTheDocument();
  });
});

describe("<ProjectDetail />", () => {
  it("renders nothing for an out-of-range index", () => {
    const { container } = render(<ProjectDetail index={999} />);
    expect(container.firstChild).toBeNull();
  });

  it("shows one generic atmospheric preview and hides planned project names", () => {
    const { unmount, container } = render(<ProjectDetail index={0} />);
    expect(screen.getByText("IN DEVELOPMENT")).toBeInTheDocument();
    expect(screen.getByText("Frontend case studies are in preparation.")).toBeInTheDocument();
    for (const project of projects) expect(screen.queryByText(project.title)).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /github repo link|live demo|case study/i })).not.toBeInTheDocument();
    unmount();

    const remainingPanels = render(<ProjectDetail index={1} />);
    expect(remainingPanels.container.firstChild).toBeNull();
    expect(container).toBeTruthy();
  });

  it("keeps the current records planned and exposes eight future categories", () => {
    expect(projects).toHaveLength(4);
    expect(PROJECT_CAPACITY).toBeGreaterThanOrEqual(8);
    expect(PROJECT_CATEGORIES).toEqual([
      "SaaS",
      "E-Commerce",
      "AI Product",
      "Business Website",
      "Dashboard",
      "Booking / Marketplace",
      "Creative / Animated Frontend",
      "UI / UX Product",
    ]);
    for (const project of projects) {
      expect(project.status).toBe("planned");
      expect(project.slug).toBeTruthy();
      expect(project.shortTitle).toBeTruthy();
      expect(project.category).toBeTruthy();
      expect(project.projectType).toMatch(/^(ui-ux|frontend)$/);
      expect([project.liveUrl, project.githubUrl, project.caseStudyUrl].filter(Boolean)).toHaveLength(0);
    }
  });

  it("still renders the existing detail structure when an entry is published", () => {
    const project = projects[0];
    const originalStatus = project.status;
    project.status = "published";
    try {
      render(<ProjectDetail index={0} />);
      expect(screen.getByRole("heading", { level: 3, name: project.title })).toBeInTheDocument();
      expect(screen.getByText(project.description)).toBeInTheDocument();
      expect(screen.getAllByText(new RegExp(project.category)).length).toBeGreaterThan(0);
      for (const technology of project.technologies) expect(screen.getByText(technology)).toBeInTheDocument();
    } finally {
      project.status = originalStatus;
    }
  });
});
