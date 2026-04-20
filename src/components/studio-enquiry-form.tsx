"use client";

import { startTransition, useMemo, useState } from "react";
import { MotionButton } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

type UnitChoice = "Standard" | "Balcony" | "Sliding door";

const initialState = {
  name: "",
  phone: "",
  preferredMoveInDate: "",
  unitType: "Standard" as UnitChoice,
};

export function StudioEnquiryForm() {
  const { toast } = useToast();
  const [form, setForm] = useState(initialState);
  const [isPending, setIsPending] = useState(false);

  const isPhoneValid = useMemo(() => /^0[0-9]{9}$/.test(form.phone.replace(/\s+/g, "")), [form.phone]);

  return (
    <form
      id="studio-enquiry"
      className="space-y-5 rounded-[2rem] border border-[color:var(--line-strong)] bg-white p-6 shadow-[0_28px_80px_rgba(17,24,15,0.08)] sm:p-8"
      onSubmit={(event) => {
        event.preventDefault();

        if (!isPhoneValid) {
          toast({
            variant: "error",
            title: "Check your phone number",
            description: "Use a valid South African mobile number so we can call you back.",
          });
          return;
        }

        setIsPending(true);

        startTransition(async () => {
          try {
            const response = await fetch("/api/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: form.name,
                phone: form.phone,
                preferredMoveInDate: form.preferredMoveInDate,
                preferredUnitType: form.unitType,
                contactType: "Looking for an apartment",
                message: `Campaign lead from /studio. Preferred move-in date: ${form.preferredMoveInDate || "Not provided"}. Unit type: ${form.unitType}.`,
                campaign: true,
                source: "studio-landing",
              }),
            });

            const payload = (await response.json()) as { success?: boolean };

            if (!response.ok || !payload.success) {
              throw new Error("Couldn't send your details. Try again.");
            }

            toast({
              variant: "success",
              title: "Details sent",
              description: "We'll WhatsApp or call you back soon.",
            });
            setForm(initialState);
          } catch (error) {
            toast({
              variant: "error",
              title: "Something went wrong",
              description: error instanceof Error ? error.message : "Couldn't send your details. Try again.",
            });
          } finally {
            setIsPending(false);
          }
        });
      }}
    >
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--olive)]">Quick enquiry</p>
        <h2 className="font-display text-3xl leading-none text-[color:var(--ink)] sm:text-4xl">
          Tell us where you are in the process.
        </h2>
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
          type="tel"
          value={form.phone}
          onChange={(event) => setForm({ ...form, phone: event.target.value })}
          className="w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--paper)] px-4 py-3 outline-none"
          placeholder="071 234 5678"
        />
        {form.phone && !isPhoneValid ? (
          <p className="text-xs text-red-600">Use a valid South African number.</p>
        ) : null}
      </label>

      <label className="block space-y-2 text-sm text-[color:var(--ink)]">
        <span>Preferred move-in date</span>
        <input
          type="date"
          value={form.preferredMoveInDate}
          onChange={(event) => setForm({ ...form, preferredMoveInDate: event.target.value })}
          className="w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--paper)] px-4 py-3 outline-none"
        />
      </label>

      <fieldset className="space-y-3">
        <legend className="text-sm text-[color:var(--ink)]">Which type appeals to you?</legend>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {(["Standard", "Balcony", "Sliding door"] as const).map((option) => {
            const isSelected = form.unitType === option;

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
                  name="unitType"
                  checked={isSelected}
                  onChange={() => setForm({ ...form, unitType: option })}
                  className="accent-[color:var(--olive)]"
                />
                {option}
              </label>
            );
          })}
        </div>
      </fieldset>

      <MotionButton
        type="submit"
        disabled={isPending}
        className="inline-flex w-full items-center justify-center rounded-full bg-[color:var(--ink)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-white transition duration-300 hover:bg-[color:var(--olive)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Sending..." : "Send enquiry"}
      </MotionButton>
    </form>
  );
}
