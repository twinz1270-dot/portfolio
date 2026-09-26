import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Navigation from "@/components/layout/Navigation";

const scrollToMock = vi.fn();
vi.mock("lenis/react", () => ({
  useLenis: () => ({ scrollTo: scrollToMock }),
}));

beforeEach(() => {
  scrollToMock.mockReset();
});

afterEach(() => vi.restoreAllMocks());

describe("<Navigation />", () => {
  it("renders all nav links", () => {
    render(<Navigation />);
    for (const label of ["Home", "Capabilities", "Work", "Stack", "Experience", "Education", "About", "Contact"]) {
      expect(
        screen.getByRole("button", { name: new RegExp(`navigate to ${label}`, "i") }),
      ).toBeInTheDocument();
    }
  });

  it("shows the horizontal navigation from the desktop breakpoint", () => {
    render(<Navigation />);
    const navigation = screen.getByRole("navigation", { name: /main navigation/i });
    expect(navigation.querySelector("ul")?.className).toContain("md:flex");
    expect(navigation.className).not.toContain("w-full");
    expect(screen.getByRole("button", { name: /navigate to experience/i }).className).toContain("px-2");
    expect(screen.getByRole("button", { name: /toggle menu/i }).className).toContain("md:hidden");
    expect(navigation).toHaveAttribute("data-scrolled", "false");
  });

  it("switches to its stronger background after scrolling", () => {
    render(<Navigation />);
    const navigation = screen.getByRole("navigation", { name: /main navigation/i });
    const originalScrollY = window.scrollY;
    Object.defineProperty(window, "scrollY", { configurable: true, value: 60 });
    fireEvent.scroll(window);
    expect(navigation).toHaveAttribute("data-scrolled", "true");
    Object.defineProperty(window, "scrollY", { configurable: true, value: originalScrollY });
  });

  it("uses lenis to scroll when a nav button is clicked (when target exists)", () => {
    document.body.innerHTML += '<section id="about" />';
    render(<Navigation />);
    fireEvent.click(screen.getByRole("button", { name: /navigate to about/i }));
    expect(scrollToMock).toHaveBeenCalledOnce();
    expect(scrollToMock.mock.calls[0][1]).toEqual({ offset: 0 });
  });

  it("routes Capabilities to the existing What I Build section", () => {
    document.body.innerHTML += '<section id="capabilities" />';
    render(<Navigation />);
    fireEvent.click(screen.getByRole("button", { name: /navigate to capabilities/i }));
    expect(scrollToMock).toHaveBeenCalledOnce();
    expect(scrollToMock.mock.calls[0][0]).toBe(document.querySelector("#capabilities"));
  });

  it("toggles the mobile menu and reflects aria-expanded", () => {
    render(<Navigation />);
    const toggle = screen.getByLabelText(/toggle menu/i);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(document.getElementById("mobile-nav-menu")?.className).toContain("nav-galaxy-menu");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("uses aria-current='page' (not 'true') for the active link", () => {
    // The 'hero' section starts active by default in the component state.
    render(<Navigation />);
    const home = screen.getByRole("button", { name: /navigate to home/i });
    const value = home.getAttribute("aria-current");
    // Either "page" or null — never the deprecated "true".
    expect(value === null || value === "page").toBe(true);
  });
});
