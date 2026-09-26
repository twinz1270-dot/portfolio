import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Capabilities from "@/components/sections/Capabilities";

vi.mock("@gsap/react", () => ({
  useGSAP: (callback: () => void) => callback(),
}));

vi.mock("@/lib/gsap-config", () => ({
  gsap: { from: vi.fn() },
}));

afterEach(() => vi.restoreAllMocks());

describe("<Capabilities />", () => {
  it("renders all nine product and interface capability categories", () => {
    render(<Capabilities />);
    expect(screen.getByRole("heading", { level: 2, name: "What I Build" })).toBeInTheDocument();
    for (const category of [
      "SaaS Products",
      "E-Commerce",
      "Business Websites",
      "Web Applications",
      "AI Interfaces",
      "Dashboards",
      "Booking / Marketplace Platforms",
      "UI / UX Implementation",
      "Interactive Frontend Experiences",
    ]) {
      expect(screen.getByRole("heading", { level: 3, name: category })).toBeInTheDocument();
    }
  });
});