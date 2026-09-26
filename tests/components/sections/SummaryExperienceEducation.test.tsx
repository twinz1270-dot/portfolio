import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Summary from "@/components/sections/Summary";
import { Education, Experience } from "@/components/sections/ExperienceEducation";

vi.mock("@gsap/react", () => ({
  useGSAP: (callback: () => void) => callback(),
}));

vi.mock("@/lib/gsap-config", () => ({
  gsap: { from: vi.fn() },
}));

afterEach(() => vi.restoreAllMocks());

describe("homepage profile sections", () => {
  it("renders the frontend-focused professional summary", () => {
    render(<Summary />);
    expect(screen.getByRole("heading", { name: /professional summary/i })).toBeInTheDocument();
    expect(screen.getByText(/Frontend Developer focused on modern React interfaces/i)).toBeInTheDocument();
    expect(screen.getByText(/Software Engineering graduate with practical experience in UI\/UX design/i)).toBeInTheDocument();
    expect(screen.getByText(/I use Figma and responsive design to translate ideas/i)).toBeInTheDocument();
  });

  it("renders the supplied experience with the internship emphasized", () => {
    render(<Experience />);
    expect(screen.getByRole("heading", { level: 2, name: "Experience" })).toBeInTheDocument();
    expect(screen.getByText("UI/UX Intern")).toBeInTheDocument();
    expect(screen.getByText("Explorer Bees")).toBeInTheDocument();
    expect(screen.getByText("Jun 2025 – Aug 2025")).toBeInTheDocument();
    expect(screen.getByText(/Collaborated with team members on UI\/UX tasks/i)).toBeInTheDocument();
    expect(screen.getByText(/Designed and refined user-centered interfaces using Figma/i)).toBeInTheDocument();
    expect(screen.getByText("Content Writer")).toBeInTheDocument();
    expect(screen.getByText("QMH")).toBeInTheDocument();
    expect(screen.getByText("1 year")).toBeInTheDocument();
    expect(screen.getByText("Teacher")).toBeInTheDocument();
    expect(screen.getByText("2024–2025")).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(3);
  });

  it("renders the supplied education history", () => {
    render(<Education />);
    expect(screen.getByRole("heading", { level: 2, name: "Education" })).toBeInTheDocument();
    expect(screen.getByText("BS (Hons) Software Engineering")).toBeInTheDocument();
    expect(screen.getByText("National University of Modern Languages (NUML)")).toBeInTheDocument();
    expect(screen.getByText("2022–2026")).toBeInTheDocument();
    expect(screen.getByText("Intermediate — ICS")).toBeInTheDocument();
    expect(screen.getByText("2019–2021")).toBeInTheDocument();
    expect(screen.getByText("Matric (Pre-Medical)")).toBeInTheDocument();
    expect(screen.getByText("2017–2019")).toBeInTheDocument();
  });
});