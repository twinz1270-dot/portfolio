"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { validateContactForm, type ContactFieldErrors } from "@/lib/contact-validation";
import { PROJECT_BUDGETS, PROJECT_TIMELINES, PROJECT_TYPES } from "@/lib/contact-options";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "ok" }
  | { kind: "error"; message: string };

const inputClass =
  "w-full rounded-xl border border-white/[0.08] bg-galaxy-darker/90 px-4 py-3 text-sm text-white placeholder:text-text-secondary/50 outline-none transition-colors focus:border-primary/60 focus:bg-galaxy-darker focus:ring-2 focus:ring-primary/20";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<ContactFieldErrors>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const formEl = e.currentTarget;
    const data = Object.fromEntries(new FormData(formEl).entries());
    const result = validateContactForm(data);
    if (!result.ok) {
      setErrors(result.errors);
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const json = (await res.json().catch(() => ({}))) as {
        error?: string;
        details?: Record<string, string[]>;
      };

      if (!res.ok) {
        if (json.details) setErrors(json.details as ContactFieldErrors);
        setStatus({
          kind: "error",
          message: json.error ?? "Something went wrong. Please try again.",
        });
        return;
      }

      formEl.reset();
      setStatus({ kind: "ok" });
    } catch {
      setStatus({
        kind: "error",
        message: "Network error. Please try again or email me directly.",
      });
    }
  }

  if (status.kind === "ok") {
    return (
      <motion.div
        role="status"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="flex flex-col items-center gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center"
      >
        <CheckCircle2 className="text-primary" size={32} />
        <p className="font-display text-xl font-semibold text-white">MESSAGE RECEIVED.</p>
        <p className="text-sm text-text-secondary">Thanks for reaching out.<br />I&apos;ll get back to you soon.</p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="mt-2 text-xs font-medium uppercase tracking-widest text-primary/80 underline-offset-4 hover:text-primary hover:underline"
        >
          Send another
        </button>
      </motion.div>
    );
  }

  const sending = status.kind === "sending";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#050812]/85 p-6 text-left shadow-2xl shadow-primary/5 backdrop-blur-xl sm:p-7"
      aria-label="Project inquiry form"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-text-secondary">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            disabled={sending}
            className={inputClass}
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
          />
          {errors.name && (
            <p id="contact-name-error" className="mt-1.5 text-xs text-red-400">{errors.name[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-text-secondary">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            disabled={sending}
            className={inputClass}
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
          />
          {errors.email && (
            <p id="contact-email-error" className="mt-1.5 text-xs text-red-400">{errors.email[0]}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="contact-company" className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-text-secondary">
          Company / Brand <span className="normal-case text-text-secondary/50">(optional)</span>
        </label>
        <input
          id="contact-company"
          name="company"
          type="text"
          autoComplete="organization"
          maxLength={120}
          disabled={sending}
          className={inputClass}
          placeholder="Company or product name"
          aria-invalid={Boolean(errors.company)}
          aria-describedby={errors.company ? "contact-company-error" : undefined}
        />
        {errors.company && <p id="contact-company-error" className="mt-1.5 text-xs text-red-400">{errors.company[0]}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-project-type" className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-text-secondary">
            Project Type
          </label>
          <select id="contact-project-type" name="projectType" disabled={sending} className={`${inputClass} appearance-none`} defaultValue="" aria-invalid={Boolean(errors.projectType)} aria-describedby={errors.projectType ? "contact-project-type-error" : undefined}>
            <option value="">Select a project type</option>
            {PROJECT_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
          {errors.projectType && <p id="contact-project-type-error" className="mt-1.5 text-xs text-red-400">{errors.projectType[0]}</p>}
        </div>
        <div>
          <label htmlFor="contact-budget" className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-text-secondary">
            Budget
          </label>
          <select id="contact-budget" name="budget" disabled={sending} className={`${inputClass} appearance-none`} defaultValue="" aria-invalid={Boolean(errors.budget)} aria-describedby={errors.budget ? "contact-budget-error" : undefined}>
            <option value="">Select a budget</option>
            {PROJECT_BUDGETS.map((budget) => <option key={budget} value={budget}>{budget}</option>)}
          </select>
          {errors.budget && <p id="contact-budget-error" className="mt-1.5 text-xs text-red-400">{errors.budget[0]}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="contact-timeline" className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-text-secondary">
          Timeline
        </label>
        <select id="contact-timeline" name="timeline" disabled={sending} className={`${inputClass} appearance-none`} defaultValue="" aria-invalid={Boolean(errors.timeline)} aria-describedby={errors.timeline ? "contact-timeline-error" : undefined}>
          <option value="">Select a timeline</option>
          {PROJECT_TIMELINES.map((timeline) => <option key={timeline} value={timeline}>{timeline}</option>)}
        </select>
        {errors.timeline && <p id="contact-timeline-error" className="mt-1.5 text-xs text-red-400">{errors.timeline[0]}</p>}
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-text-secondary">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          disabled={sending}
          className={`${inputClass} resize-y`}
          placeholder="Tell me about the project, goals, or interface you have in mind."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-1.5 text-xs text-red-400">{errors.message[0]}</p>
        )}
      </div>

      {/* Honeypot — visually hidden, accessibility-hidden, but reachable by bots */}
      <div className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Leave this empty</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status.kind === "error" && (
        <div role="alert" className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/5 p-3 text-sm text-red-300">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>{status.message}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={sending}
        className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-primary/35 bg-primary/15 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:border-primary/55 hover:bg-primary/25 hover:shadow-[0_0_22px_rgba(129,84,255,0.14)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {sending ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            START A CONVERSATION
            <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </>
        )}
      </button>
    </form>
  );
}
