"use client";

import { AnimatePresence, motion } from "framer-motion";
import { startTransition, useDeferredValue, useState, useSyncExternalStore } from "react";
import { MotionButton } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { phases, units } from "@/lib/site-data";

const initialState = {
  name: "",
  phone: "",
  preferredPhase: "Any phase",
};

export function AvailabilityPanel() {
  const { toast } = useToast();
  const [preferredPhase, setPreferredPhase] = useState("Any phase");
  const deferredPhase = useDeferredValue(preferredPhase);
  const [form, setForm] = useState(initialState);
  const [isPending, setIsPending] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const isMounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  const filteredUnits = units.filter((unit) => {
    if (deferredPhase === "Any phase") return unit.available;
    return unit.available && unit.phase === deferredPhase;
  });

  const availableLabel = `${filteredUnits.length} ${filteredUnits.length === 1 ? "unit" : "units"} available`;

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
      <div className="space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--olive)]">Availability</p>
            <h3 className="mt-3 font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl">
              When a studio opens here, it goes quickly.
            </h3>
          </div>
          <label className="flex min-w-[220px] flex-col gap-2 text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">
            Choose a phase
            <select
              value={preferredPhase}
              onChange={(event) => setPreferredPhase(event.target.value)}
              className="rounded-full border border-[color:var(--line-strong)] bg-white px-4 py-3 text-sm normal-case tracking-normal text-[color:var(--ink)] outline-none"
            >
              {phases.map((phase) => (
                <option key={phase}>{phase}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="space-y-5 border-t border-[color:var(--line)] pt-6">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[color:var(--olive)]">
            <span className="home-signal-pulse h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
            <span>
              {availableLabel} · Updated today
            </span>
          </div>

          <AnimatePresence mode="wait">
            {!isMounted ? (
              <motion.div
                key="skeletons"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={`availability-skeleton-${index}`}
                    className="rounded-[1.75rem] border border-[color:var(--line)] bg-white p-5"
                  >
                    <div className="h-3 w-24 rounded-full bg-[color:var(--stone)] animate-pulse" />
                    <div className="mt-4 h-8 w-40 rounded-full bg-[color:var(--stone)] animate-pulse" />
                    <div className="mt-3 h-3 w-full rounded-full bg-[color:var(--stone)] animate-pulse" />
                    <div className="mt-2 h-3 w-3/4 rounded-full bg-[color:var(--stone)] animate-pulse" />
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div key="units" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
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
                    Nothing open in that phase right now. Leave your number and we&apos;ll call when the next unit opens.
                  </p>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <form
        className="space-y-5 rounded-[2rem] border border-[color:var(--line-strong)] bg-white p-6 shadow-[0_32px_90px_rgba(17,24,15,0.08)] sm:p-8"
        onSubmit={(event) => {
          event.preventDefault();
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

              toast({
                variant: "success",
                title: "You're on the list",
                description: "We'll call you the moment a unit opens up.",
              });
              setForm({ ...initialState, preferredPhase });
              setIsComplete(true);
            } catch (error) {
              toast({
                variant: "error",
                title: "Something went wrong",
                description: error instanceof Error ? error.message : "Couldn't save your details. Try again.",
              });
            } finally {
              setIsPending(false);
            }
          });
        }}
      >
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--olive)]">Next opening</p>
          <h3 className="font-display text-3xl leading-none text-[color:var(--ink)] sm:text-4xl">
            Miss this one. Don&apos;t miss the next.
          </h3>
          <p className="text-sm leading-7 text-[color:var(--muted)]">
            Leave your number and we&apos;ll call you the moment a unit opens up.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {isComplete ? (
            <motion.div
              key="complete"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-[1.5rem] border border-[color:var(--line-strong)] bg-[color:var(--paper)] px-5 py-4 text-sm font-medium text-[color:var(--olive)]"
            >
              ✓ We have your number. Watch this space.
            </motion.div>
          ) : (
            <motion.div key="fields" exit={{ opacity: 0, height: 0 }} className="space-y-5 overflow-hidden">
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
                  {phases.map((phase) => (
                    <option key={phase}>{phase}</option>
                  ))}
                </select>
              </label>

              <MotionButton
                type="submit"
                disabled={isPending}
                className="inline-flex w-full items-center justify-center rounded-full bg-[color:var(--ink)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-white hover:bg-[color:var(--olive)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPending ? "Sending..." : "Notify me"}
              </MotionButton>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
