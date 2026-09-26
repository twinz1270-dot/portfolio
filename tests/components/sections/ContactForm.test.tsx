import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "@/components/sections/ContactForm";

const fetchMock = vi.fn();
beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

const VALID = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "Hello, I would love to chat about your work.",
};

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/name/i), VALID.name);
  await user.type(screen.getByLabelText(/email/i), VALID.email);
  await user.type(screen.getByLabelText(/message/i), VALID.message);
}

describe("<ContactForm />", () => {
  it("renders inquiry fields and submit button", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company \/ brand/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/project type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/budget/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/timeline/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /start a conversation/i })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "SaaS" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "AI Interface" })).toBeInTheDocument();
  });

  it("shows inline validation errors for client-side invalid input", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText(/name/i), "X");
    await user.type(screen.getByLabelText(/email/i), "not-an-email");
    await user.type(screen.getByLabelText(/message/i), "short");
    await user.click(screen.getByRole("button", { name: /start a conversation/i }));

    expect(await screen.findByText(/name must be at least 2/i)).toBeInTheDocument();
    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    expect(screen.getByText(/message must be at least 10/i)).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("posts to /api/contact and shows success on 200", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ok: true }),
    });
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /start a conversation/i }));

    await waitFor(() => {
      expect(screen.getByText("MESSAGE RECEIVED.")).toBeInTheDocument();
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }),
    );
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body).toEqual(expect.objectContaining({
      name: VALID.name,
      email: VALID.email,
      message: VALID.message,
    }));
  });

  it("includes selected project inquiry details in the existing API request", async () => {
    fetchMock.mockResolvedValueOnce({ ok: true, json: async () => ({ ok: true }) });
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillValidForm(user);
    await user.type(screen.getByLabelText(/company \/ brand/i), "Studio North");
    await user.selectOptions(screen.getByLabelText(/project type/i), "SaaS");
    await user.selectOptions(screen.getByLabelText(/budget/i), "$1,000 – $3,000");
    await user.selectOptions(screen.getByLabelText(/timeline/i), "1–2 months");
    await user.click(screen.getByRole("button", { name: /start a conversation/i }));

    await waitFor(() => expect(screen.getByText("MESSAGE RECEIVED.")).toBeInTheDocument());
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body).toEqual(expect.objectContaining({
      company: "Studio North",
      projectType: "SaaS",
      budget: "$1,000 – $3,000",
      timeline: "1–2 months",
    }));
  });

  it("renders 'Send another' which resets the form", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ok: true }),
    });
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /start a conversation/i }));

    const reset = await screen.findByRole("button", { name: /send another/i });
    await user.click(reset);

    // Form is back
    expect(screen.getByRole("button", { name: /start a conversation/i })).toBeInTheDocument();
  });

  it("shows API error message on non-2xx response and surfaces field details", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        error: "Invalid form data",
        details: { email: ["server says this is bad"] },
      }),
    });
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /start a conversation/i }));

    expect(await screen.findByText(/invalid form data/i)).toBeInTheDocument();
    expect(screen.getByText(/server says this is bad/i)).toBeInTheDocument();
  });

  it("shows network error message on fetch reject", async () => {
    fetchMock.mockRejectedValueOnce(new TypeError("offline"));
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /start a conversation/i }));

    expect(await screen.findByText(/network error/i)).toBeInTheDocument();
  });

  it("disables inputs and shows 'Sending…' while in-flight", async () => {
    let resolve!: (v: unknown) => void;
    fetchMock.mockReturnValueOnce(
      new Promise((r) => {
        resolve = r;
      }),
    );
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /start a conversation/i }));

    expect(await screen.findByText(/sending/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeDisabled();
    expect(screen.getByLabelText(/email/i)).toBeDisabled();
    expect(screen.getByLabelText(/message/i)).toBeDisabled();

    resolve({ ok: true, json: async () => ({ ok: true }) });
    await waitFor(() => {
      expect(screen.getByText("MESSAGE RECEIVED.")).toBeInTheDocument();
    });
  });

  it("includes a hidden honeypot field that is aria-hidden and tab-skipped", () => {
    render(<ContactForm />);
    const honeypot = screen.getByLabelText(/leave this empty/i, { selector: "input" });
    expect(honeypot).toHaveAttribute("name", "website");
    expect(honeypot).toHaveAttribute("tabIndex", "-1");
  });
});
