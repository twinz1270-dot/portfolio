import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Contact from "@/components/sections/Contact";
import { personalInfo } from "@/lib/constants";

vi.mock("@gsap/react", () => ({
  useGSAP: (cb: () => void) => cb(),
}));

vi.mock("@/lib/gsap-config", () => ({
  gsap: { from: vi.fn() },
}));

vi.mock("@/components/sections/ContactForm", () => ({
  default: () => <div data-testid="contact-form" />,
}));

afterEach(() => vi.restoreAllMocks());

describe("<Contact />", () => {
  it("renders the contact heading", () => {
    render(<Contact />);
    expect(
      screen.getByRole("heading", { level: 2, name: /let.s build/i }),
    ).toBeInTheDocument();
  });

  it("renders the form (mocked)", () => {
    render(<Contact />);
    expect(screen.getByTestId("contact-form")).toBeInTheDocument();
  });

  it("renders the supplied email as a direct mailto contact", () => {
    render(<Contact />);
    const emailLink = screen.getByRole("link", { name: personalInfo.email });
    expect(emailLink).toHaveAttribute("href", `mailto:${personalInfo.email}`);
  });

  it("renders LinkedIn as a secure external link and leaves other profiles unconfigured", () => {
    render(<Contact />);
    const linkedIn = screen.getByRole("link", { name: /LinkedIn/ });
    expect(linkedIn).toHaveAttribute("href", personalInfo.socials.find((social) => social.name === "LinkedIn")?.url);
    expect(linkedIn).toHaveAttribute("target", "_blank");
    expect(linkedIn).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByLabelText("GitHub placeholder")).toBeInTheDocument();
    expect(screen.getByLabelText("Portfolio placeholder")).toBeInTheDocument();
  });
});
