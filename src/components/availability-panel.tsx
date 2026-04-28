"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useDeferredValue, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MotionButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";
import { phases, units } from "@/lib/site-data";
import { formatLocationLabel } from "@/lib/property-data";

const waitingListSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^0[0-9]{9}$/, "Enter a valid SA number (e.g. 071 234 5678)"),
  preferredPhase: z.string(),
});

type WaitingListValues = z.infer<typeof waitingListSchema>;

const initialState: WaitingListValues = {
  name: "",
  phone: "",
  preferredPhase: "Any location",
};

const unitTypeOptions = ["Any type", "Standard", "Balcony", "Sliding door"] as const;

const unitTypeLabels = {
  standard: "Standard",
  balcony: "Balcony",
  "sliding-door": "Sliding door",
} as const;

export function AvailabilityPanel() {
  const { toast } = useToast();
  const [preferredPhase, setPreferredPhase] = useState("Any location");
  const deferredPhase = useDeferredValue(preferredPhase);
  const [preferredUnitType, setPreferredUnitType] = useState<(typeof unitTypeOptions)[number]>("Any type");
  const deferredUnitType = useDeferredValue(preferredUnitType);
  const [isComplete, setIsComplete] = useState(false);
  const waitingListRef = useRef<HTMLFormElement>(null);
  const isMounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, submitCount, touchedFields },
  } = useForm<WaitingListValues>({
    resolver: zodResolver(waitingListSchema),
    defaultValues: initialState,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const filteredUnits = units.filter((unit) => {
    const locationLabel = formatLocationLabel(unit.phase);
    const matchesPhase = deferredPhase === "Any location" || locationLabel === deferredPhase;
    const matchesUnitType = deferredUnitType === "Any type" || unitTypeLabels[unit.unitType] === deferredUnitType;

    return unit.available && matchesPhase && matchesUnitType;
  });

  useEffect(() => {
    if (!isMounted || filteredUnits.length > 0) {
      return;
    }

    waitingListRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [filteredUnits.length, isMounted]);

  const availableLabel = filteredUnits.length
    ? `${filteredUnits.length} ${filteredUnits.length === 1 ? "unit" : "units"} available · Updated today`
    : "Nothing available in that filter right now — join the list";

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
      <div className="space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--accent-dark)]">Availability</p>
            <h3 className="mt-3 font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl">
              When a studio opens here, it goes quickly.
            </h3>
            <div className="mt-2 flex items-center gap-2">
              <motion.span
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="h-2 w-2 rounded-full bg-[color:var(--success)]"
              />
              <span className="text-xs font-medium text-[color:var(--success)]">
                {filteredUnits.length > 0
                  ? `${filteredUnits.length} ${filteredUnits.length === 1 ? "unit" : "units"} available right now`
                  : "Join the list — next unit opening soon"}
              </span>
            </div>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-end">
            <label className="flex min-w-[220px] flex-col gap-2 text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">
              Choose a location
              <div className="relative">
                <select
                  value={preferredPhase}
                  onChange={(event) => setPreferredPhase(event.target.value)}
                  className="w-full appearance-none rounded-full border border-[color:var(--line-strong)] bg-white py-3 pl-4 pr-10 text-sm normal-case tracking-normal text-[color:var(--ink)] outline-none transition-colors focus:border-[color:var(--accent)] focus:ring-1 focus:ring-[color:var(--accent-light)]"
                >
                  {phases.map((phase) => (
                    <option key={phase}>{phase}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <svg className="h-4 w-4 text-[color:var(--muted)]" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M4 6l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </label>

            <label className="flex min-w-[220px] flex-col gap-2 text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">
              Unit type
              <div className="relative">
                <select
                  value={preferredUnitType}
                  onChange={(event) => setPreferredUnitType(event.target.value as (typeof unitTypeOptions)[number])}
                  className="w-full appearance-none rounded-full border border-[color:var(--line-strong)] bg-white py-3 pl-4 pr-10 text-sm normal-case tracking-normal text-[color:var(--ink)] outline-none transition-colors focus:border-[color:var(--accent)] focus:ring-1 focus:ring-[color:var(--accent-light)]"
                >
                  {unitTypeOptions.map((unitType) => (
                    <option key={unitType}>{unitType}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <svg className="h-4 w-4 text-[color:var(--muted)]" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M4 6l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </label>
          </div>
        </div>

        <div className="space-y-5 border-t border-[color:var(--line)] pt-6">
          <div
            className={`inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] ${
              filteredUnits.length ? "text-[color:var(--accent-dark)]" : "text-[#EF9F27]"
            }`}
          >
            <span
              className={`home-signal-pulse h-1.5 w-1.5 rounded-full ${
                filteredUnits.length ? "bg-[#22c55e]" : "bg-[#EF9F27]"
              }`}
            />
            <span>{availableLabel}</span>
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
                  <motion.article
                    key={unit.id}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="grid gap-3 border-b border-[color:var(--line)] pb-5 sm:grid-cols-[1fr_auto] sm:items-end"
                  >
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Badge variant="highlight">{formatLocationLabel(unit.phase)}</Badge>
                        <Badge variant="unit">{unitTypeLabels[unit.unitType]} studio</Badge>
                      </div>
                      <div>
                        <h4 className="text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">{unit.name}</h4>
                        <p className="mt-2 max-w-2xl text-sm leading-7 text-[color:var(--muted)]">{unit.summary}</p>
                      </div>
                    </div>
                    <div className="space-y-2 sm:text-right">
                      <p className="font-display text-3xl text-[color:var(--ink)]">{unit.price}</p>
                      <Badge variant={unit.available ? "available" : "waiting"} className="sm:ml-auto">
                        {unit.availableFrom}
                      </Badge>
                      <Link
                        href={`https://wa.me/27722293229?text=${encodeURIComponent(`Hi, I'm interested in ${unit.name} in ${formatLocationLabel(unit.phase)}. Is it still available?`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex text-xs text-[color:var(--accent-dark)] transition-colors duration-300 hover:underline sm:justify-end"
                      >
                        Enquire via WhatsApp →
                      </Link>
                    </div>
                  </motion.article>
                ))}
                {!filteredUnits.length ? (
                  <p className="text-sm leading-7 text-[color:var(--muted)]">
                    Nothing open in that location right now. Leave your number and we&apos;ll call when the next unit opens.
                  </p>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <form
        ref={waitingListRef}
        className="space-y-5 rounded-[2rem] border border-[color:var(--line-strong)] bg-white p-6 shadow-[0_32px_90px_rgba(17,24,15,0.08)] sm:p-8"
        onSubmit={handleSubmit(async (values) => {
          try {
            const response = await fetch("/api/waiting-list", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values),
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
            reset({ ...initialState, preferredPhase });
            setIsComplete(true);
          } catch (error) {
            toast({
              variant: "error",
              title: "Something went wrong",
              description: error instanceof Error ? error.message : "Couldn't save your details. Try again.",
            });
          }
        })}
      >
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--accent-dark)]">Next opening</p>
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
              className="rounded-[1.5rem] border border-[color:var(--line-strong)] bg-[color:var(--surface)] px-5 py-4 text-sm font-medium text-[color:var(--accent-dark)]"
            >
              ✓ We have your number. Watch this space.
            </motion.div>
          ) : (
            <motion.div key="fields" exit={{ opacity: 0, height: 0 }} className="space-y-5 overflow-hidden">
              <label className="block space-y-2 text-sm text-[color:var(--ink)]">
                <span>Name</span>
                <input
                  {...register("name")}
                  className="w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--surface)] px-4 py-3 outline-none"
                  placeholder="Full name"
                />
                <AnimatePresence initial={false}>
                  {(touchedFields.name || submitCount > 0) && errors.name ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-red-600"
                    >
                      {errors.name.message}
                    </motion.p>
                  ) : null}
                </AnimatePresence>
              </label>

              <label className="block space-y-2 text-sm text-[color:var(--ink)]">
                <span>Phone number</span>
                <input
                  {...register("phone", {
                    setValueAs: (value) => (typeof value === "string" ? value.replace(/\s+/g, "") : value),
                  })}
                  type="tel"
                  className="w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--surface)] px-4 py-3 outline-none"
                  placeholder="e.g. 071 234 5678"
                />
                <AnimatePresence initial={false}>
                  {(touchedFields.phone || submitCount > 0) && errors.phone ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-red-600"
                    >
                      {errors.phone.message}
                    </motion.p>
                  ) : null}
                </AnimatePresence>
              </label>

              <label className="block space-y-2 text-sm text-[color:var(--ink)]">
                <span>Preferred location</span>
                <div className="relative">
                  <select
                    {...register("preferredPhase")}
                    className="w-full appearance-none rounded-full border border-[color:var(--line-strong)] bg-[color:var(--surface)] py-3 pl-4 pr-10 text-sm outline-none transition-colors focus:border-[color:var(--accent)]"
                  >
                    {phases.map((phase) => (
                      <option key={phase}>{phase}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg
                      className="h-4 w-4 text-[color:var(--muted)]"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 6l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <AnimatePresence initial={false}>
                  {(touchedFields.preferredPhase || submitCount > 0) && errors.preferredPhase ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-red-600"
                    >
                      {errors.preferredPhase.message}
                    </motion.p>
                  ) : null}
                </AnimatePresence>
              </label>

              <MotionButton
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center rounded-full bg-[color:var(--accent)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-white hover:bg-[color:var(--accent-dark)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : "Notify me"}
              </MotionButton>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
