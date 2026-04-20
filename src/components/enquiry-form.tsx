"use client";

import { startTransition, useState } from "react";

type EnquiryFormProps = {
  endpoint: "/api/advertise" | "/api/maintenance";
  eyebrow: string;
  title: string;
  description: string;
  submitLabel: string;
  fields: Array<{
    name: string;
    label: string;
    placeholder: string;
    type?: "text" | "email" | "tel" | "date";
  }>;
};

export function EnquiryForm({
  endpoint,
  eyebrow,
  title,
  description,
  submitLabel,
  fields,
}: EnquiryFormProps) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((field) => [field.name, ""])),
  );
  const [status, setStatus] = useState<null | { tone: "success" | "error"; message: string }>(null);
  const [isPending, setIsPending] = useState(false);

  return (
    <form
      className="space-y-5 rounded-[2rem] border border-[color:var(--line-strong)] bg-white p-6 shadow-[0_24px_80px_rgba(17,24,15,0.08)] sm:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        setStatus(null);
        setIsPending(true);

        startTransition(async () => {
          try {
            const response = await fetch(endpoint, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values),
            });
            const payload = (await response.json()) as { message: string };
            if (!response.ok) {
              throw new Error(payload.message);
            }
            setStatus({ tone: "success", message: payload.message });
            setValues(Object.fromEntries(fields.map((field) => [field.name, ""])));
          } catch (error) {
            setStatus({
              tone: "error",
              message: error instanceof Error ? error.message : "Couldn't send that. Try again.",
            });
          } finally {
            setIsPending(false);
          }
        });
      }}
    >
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--olive)]">{eyebrow}</p>
        <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl">{title}</h2>
        <p className="max-w-xl text-sm leading-7 text-[color:var(--muted)]">{description}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <label key={field.name} className="block space-y-2 text-sm text-[color:var(--ink)] sm:last:col-span-2">
            <span>{field.label}</span>
            <input
              required
              type={field.type ?? "text"}
              value={values[field.name]}
              onChange={(event) => setValues({ ...values, [field.name]: event.target.value })}
              className="w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--paper)] px-4 py-3 outline-none"
              placeholder={field.placeholder}
            />
          </label>
        ))}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center justify-center rounded-full bg-[color:var(--ink)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-white transition duration-300 hover:bg-[color:var(--olive)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Sending..." : submitLabel}
      </button>

      {status ? (
        <p className={`text-sm leading-7 ${status.tone === "success" ? "text-[color:var(--olive)]" : "text-red-600"}`}>
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
