import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Skills from "@/components/sections/Skills";
import { skillCategories } from "@/lib/constants";

vi.mock("@gsap/react", () => ({
  useGSAP: (cb: () => void) => cb(),
}));

vi.mock("@/lib/gsap-config", () => ({
  gsap: { from: vi.fn() },
}));

afterEach(() => vi.restoreAllMocks());

describe("<Skills />", () => {
  it("renders the section heading", () => {
    render(<Skills />);
    expect(
      screen.getByRole("heading", { level: 2, name: /tech stack/i }),
    ).toBeInTheDocument();
  });

  it("renders all category controls", () => {
    render(<Skills />);
    for (const cat of skillCategories) {
      expect(screen.getAllByText(cat.name).some((element) => element.closest("button"))).toBe(true);
    }
  });

  it("switches technology groups and frames 3D tools as explored technologies", async () => {
    render(<Skills />);
    expect(screen.getByText("HTML5")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /animation \/ interaction/i }));

    expect(await screen.findByText("Three.js")).toBeInTheDocument();
    expect(screen.getByText("WebGL concepts")).toBeInTheDocument();
    expect(screen.getByText(/not an advanced 3D or WebGL specialization/i)).toBeInTheDocument();
  });
});
