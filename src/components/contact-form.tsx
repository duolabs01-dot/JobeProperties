"use client";

import { startTransition, useState } from "react";

type ContactType =
  | "Looking for an apartment"
  | "Current tenant"
  | "Business enquiry";

const initialState: {
  name: string;
  phone: string;
  email: string;
  message: string;
  contactType: ContactType;
} = {
  name: "",
  phone: "",
  email: "",
  message: "",
  contactType: "Looking for an apartment",
};

const contactOptions: ContactType[] = [
  "Looking for an apartment",
  "Current tenant",
  "Business enquiry",
];

export function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState<null | { tone: "success" | "error"; message: string }>(null);

  return (
    <form
      className="space-y-6 rounded-[2rem] border border-[color:var(--line-strong)] bg-white p-6 shadow-[0_24px_80px_rgba(17,24,15,0.08)] sm:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        setStatus(null);
        setIsPending(true);

        startTransition(async () => {
          try {
            const response = await fetch("/api/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(form),
            });

            const payload = (await response.json()) as { success?: boolean };

            if (!response.ok || !payload.success) {
              throw new Error("Couldn't send your message. Try again.");
            }

            setStatus({ tone: "success", message: "Thanks. We've got your message and we'll be in touch." });
            setForm(initialState);
          } catch (error) {
            setStatus({
              tone: "error",
              message: error instanceof Error ? error.message : "Couldn't send your message. Try again.",
            });
          } finally {
            setIsPending(false);
          }
        });
      }}
    >
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--olive)]">Send us a message</p>
        <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl">
          Tell us what you need.
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2 text-sm text-[color:var(--ink)]">
          <span>Name</span>
          <input
            required
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            className="w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--paper)] px-4 py-3 outline-none"
            placeholder="Full name"
          />
        </label>

        <label className="block space-y-2 text-sm text-[color:var(--ink)]">
          <span>Phone number</span>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
            className="w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--paper)] px-4 py-3 outline-none"
            placeholder="071 234 5678"
          />
        </label>
      </div>

      <label className="block space-y-2 text-sm text-[color:var(--ink)]">
        <span>Email</span>
        <input
          type="email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          className="w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--paper)] px-4 py-3 outline-none"
          placeholder="Optional"
        />
      </label>

      <label className="block space-y-2 text-sm text-[color:var(--ink)]">
        <span>Message</span>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(event) => setForm({ ...form, message: event.target.value })}
          className="w-full rounded-[1.5rem] border border-[color:var(--line-strong)] bg-[color:var(--paper)] px-4 py-3 outline-none"
          placeholder="Tell us how we can help"
        />
      </label>

      <fieldset className="space-y-3">
        <legend className="text-sm text-[color:var(--ink)]">Which are you?</legend>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {contactOptions.map((option) => {
            const isSelected = form.contactType === option;

            return (
              <label
                key={option}
                className={`inline-flex items-center gap-3 rounded-full border px-4 py-3 text-sm transition ${
                  isSelected
                    ? "border-[color:var(--ink)] bg-[color:var(--sand)] text-[color:var(--ink)]"
                    : "border-[color:var(--line-strong)] bg-white text-[color:var(--muted)]"
                }`}
              >
                <input
                  type="radio"
                  name="contactType"
                  checked={isSelected}
                  onChange={() => setForm({ ...form, contactType: option })}
                  className="accent-[color:var(--olive)]"
                />
                {option}
              </label>
            );
          })}
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center justify-center rounded-full bg-[color:var(--ink)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-white transition duration-300 hover:bg-[color:var(--olive)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Sending..." : "Send message"}
      </button>

      {status ? (
        <p className={`text-sm leading-7 ${status.tone === "success" ? "text-[color:var(--olive)]" : "text-red-600"}`}>
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
