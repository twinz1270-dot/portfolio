import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import About from "@/components/sections/About";

vi.mock("@gsap/react", () => ({
  useGSAP: (cb: () => void) => cb(),
}));

vi.mock("@/lib/gsap-config", () => ({
  gsap: { from: vi.fn() },
  ScrollTrigger: {},
}));

beforeEach(() => {});
afterEach(() => vi.restoreAllMocks());

describe("<About />", () => {
  it("renders the section heading", () => {
    render(<About />);
    expect(
      screen.getByRole("heading", { level: 2, name: /^about me$/i }),
    ).toBeInTheDocument();
  });

  it("renders Laiba's frontend and UI/UX positioning", () => {
    render(<About />);
    expect(screen.getByText(/Frontend Developer and Software Engineering graduate/i)).toBeInTheDocument();
    expect(screen.getByText(/intersection of frontend engineering and UI\/UX/i)).toBeInTheDocument();
    expect(screen.getByText(/Where thoughtful design meets frontend engineering/i)).toBeInTheDocument();
  });

  it("renders the supplied location, focus, and interests", () => {
    render(<About />);
    expect(screen.getByText("Islamabad, Pakistan")).toBeInTheDocument();
    expect(screen.getByText("Frontend Development")).toBeInTheDocument();
    expect(screen.getByText(/SaaS · E-Commerce · Web Applications/)).toBeInTheDocument();
  });

  it("renders languages and professional strengths without numeric claims", () => {
    render(<About />);
    expect(screen.getByRole("heading", { name: "Languages" })).toBeInTheDocument();
    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByText("Urdu")).toBeInTheDocument();
    expect(screen.getByText("German")).toBeInTheDocument();
    expect(screen.getByText("A1 · Goethe Certified")).toBeInTheDocument();
    expect(screen.getByText(/Problem Solving · Attention to Detail · Communication · Teamwork · Adaptability/)).toBeInTheDocument();
  });
});
