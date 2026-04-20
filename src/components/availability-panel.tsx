"use client";

import { startTransition, useDeferredValue, useState } from "react";
import { units } from "@/lib/site-data";

const initialState = {
  name: "",
  phone: "",
  preferredPhase: "Any phase",
};

export function AvailabilityPanel() {
  const [preferredPhase, setPreferredPhase] = useState("Any phase");
  const deferredPhase = useDeferredValue(preferredPhase);
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<null | { tone: "success" | "error"; message: string }>(null);
  const [isPending, setIsPending] = useState(false);

  const filteredUnits = units.filter((unit) => {
    if (deferredPhase === "Any phase") return unit.available;
    return unit.available && unit.phase === deferredPhase;
  });

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
      <div className="space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--olive)]">Available now</p>
            <h3 className="mt-3 font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl">
              Live unit visibility without enquiry chaos.
            </h3>
          </div>
          <label className="flex min-w-[220px] flex-col gap-2 text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">
            Preferred phase
            <select
              value={preferredPhase}
              onChange={(event) => setPreferredPhase(event.target.value)}
              className="rounded-full border border-[color:var(--line-strong)] bg-white px-4 py-3 text-sm normal-case tracking-normal text-[color:var(--ink)] outline-none"
            >
              <option>Any phase</option>
              <option>Phase 4</option>
              <option>Phase 5</option>
              <option>Phase 6</option>
            </select>
          </label>
        </div>

        <div className="space-y-5 border-t border-[color:var(--line)] pt-6">
          {filteredUnits.map((unit) => (
            <article key={unit.id} className="grid gap-3 border-b border-[color:var(--line)] pb-5 sm:grid-cols-[1fr_auto] sm:items-end">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--olive)]">{unit.phase}</p>
                <div>
                  <h4 className="text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">{unit.name}</h4>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-[color:var(--muted)]">{unit.summary}</p>
                </div>
              </div>
              <div className="space-y-1 sm:text-right">
                <p className="font-display text-3xl text-[color:var(--ink)]">{unit.price}</p>
                <p className="text-sm text-[color:var(--muted)]">{unit.availableFrom}</p>
              </div>
            </article>
          ))}
          {!filteredUnits.length ? (
            <p className="text-sm leading-7 text-[color:var(--muted)]">
              Nothing public in that phase right now. Join the waiting list and the owner gets a structured lead instead of a missed message.
            </p>
          ) : null}
        </div>
      </div>

      <form
        className="space-y-5 rounded-[2rem] border border-[color:var(--line-strong)] bg-white p-6 shadow-[0_32px_90px_rgba(17,24,15,0.08)] sm:p-8"
        onSubmit={(event) => {
          event.preventDefault();
          setStatus(null);
          setIsPending(true);
          startTransition(async () => {
            try {
              const response = await fetch("/api/waiting-list", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
              });
              const payload = (await response.json()) as { message: string };
              if (!response.ok) {
                throw new Error(payload.message);
              }
              setStatus({ tone: "success", message: payload.message });
              setForm({ ...initialState, preferredPhase });
            } catch (error) {
              setStatus({
                tone: "error",
                message: error instanceof Error ? error.message : "Something went wrong while joining the waiting list.",
              });
            } finally {
              setIsPending(false);
            }
          });
        }}
      >
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--olive)]">Waiting list</p>
          <h3 className="font-display text-3xl leading-none text-[color:var(--ink)] sm:text-4xl">
            Hold the next vacancy before somebody else does.
          </h3>
          <p className="text-sm leading-7 text-[color:var(--muted)]">
            Prospects leave their name, phone number, and preferred phase. The owner receives a clean lead alert by email now, with SMS / WhatsApp hooks ready next.
          </p>
        </div>

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
          <span>Phone</span>
          <input
            required
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
            className="w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--paper)] px-4 py-3 outline-none"
            placeholder="e.g. 071 234 5678"
          />
        </label>

        <label className="block space-y-2 text-sm text-[color:var(--ink)]">
          <span>Preferred phase</span>
          <select
            value={form.preferredPhase}
            onChange={(event) => {
              setPreferredPhase(event.target.value);
              setForm({ ...form, preferredPhase: event.target.value });
            }}
            className="w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--paper)] px-4 py-3 outline-none"
          >
            <option>Any phase</option>
            <option>Phase 4</option>
            <option>Phase 5</option>
            <option>Phase 6</option>
          </select>
        </label>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex w-full items-center justify-center rounded-full bg-[color:var(--ink)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-white transition duration-300 hover:bg-[color:var(--olive)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Saving enquiry" : "Join the waiting list"}
        </button>

        {status ? (
          <p className={`text-sm leading-7 ${status.tone === "success" ? "text-[color:var(--olive)]" : "text-red-600"}`}>
            {status.message}
          </p>
        ) : null}
      </form>
    </div>
  );
}
