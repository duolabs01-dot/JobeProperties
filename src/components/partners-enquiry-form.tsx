"use client";

import { AnimatePresence, motion } from "framer-motion";
import { startTransition, useMemo, useState } from "react";
import { revealItemVariants } from "@/components/reveal-section";
import { MotionButton } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { useInView } from "@/hooks/use-in-view";

type InterestOption =
  | "On-site advertising"
  | "Conference / event venue"
  | "Corporate accommodation"
  | "Supplier partnership"
  | "Other";

type FormState = {
  businessName: string;
  contactName: string;
  phone: string;
  email: string;
  interest: InterestOption;
  details: string;
};

type FieldName = "businessName" | "contactName" | "details" | "email" | "interest" | "phone";
type ErrorState = Partial<Record<FieldName, string>>;
type TouchedState = Record<FieldName, boolean>;

const interestOptions: InterestOption[] = [
  "On-site advertising",
  "Conference / event venue",
  "Corporate accommodation",
  "Supplier partnership",
  "Other",
];

const initialState: FormState = {
  businessName: "",
  contactName: "",
  phone: "",
  email: "",
  interest: "On-site advertising",
  details: "",
};

const initialTouched: TouchedState = {
  businessName: false,
  contactName: false,
  details: false,
  email: false,
  interest: false,
  phone: false,
};

function validateField(field: FieldName, value: string) {
  switch (field) {
    case "businessName":
    case "contactName":
      return value.trim().length >= 2 ? "" : "Please enter at least 2 characters.";
    case "phone":
      return /^0[0-9]{9}$/.test(value.replace(/\s+/g, "")) ? "" : "Use a valid South African number.";
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? "" : "Enter a valid email address.";
    case "interest":
      return value.trim() ? "" : "Please choose an option.";
    case "details":
      return value.trim().length >= 20 ? "" : "Please add at least 20 characters.";
    default:
      return "";
  }
}

export function PartnersEnquiryForm() {
  const { toast } = useToast();
  const { ref, inView } = useInView<HTMLFormElement>();
  const [form, setForm] = useState<FormState>(initialState);
  const [touched, setTouched] = useState<TouchedState>(initialTouched);
  const [isPending, setIsPending] = useState(false);

  const errors = useMemo<ErrorState>(
    () => ({
      businessName: validateField("businessName", form.businessName),
      contactName: validateField("contactName", form.contactName),
      details: validateField("details", form.details),
      email: validateField("email", form.email),
      interest: validateField("interest", form.interest),
      phone: validateField("phone", form.phone),
    }),
    [form],
  );

  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <motion.form
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{ visible: { transition: { delayChildren: 0.1, staggerChildren: 0.08 } } }}
      className="space-y-6 rounded-[2rem] border border-[color:var(--line-strong)] bg-white p-6 shadow-[0_24px_80px_rgba(17,24,15,0.08)] sm:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        setTouched({
          businessName: true,
          contactName: true,
          details: true,
          email: true,
          interest: true,
          phone: true,
        });

        if (hasErrors) {
          return;
        }

        setIsPending(true);

        startTransition(async () => {
          try {
            const response = await fetch("/api/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                type: "business",
                businessName: form.businessName,
                contactName: form.contactName,
                phone: form.phone,
                email: form.email,
                interest: form.interest,
                message: form.details,
              }),
            });

            const payload = (await response.json()) as { success?: boolean };

            if (!response.ok || !payload.success) {
              throw new Error("Couldn't send your enquiry. Try again.");
            }

            toast({
              variant: "success",
              title: "Enquiry sent",
              description: "We'll be in touch within 24 hours.",
            });
            setForm(initialState);
            setTouched(initialTouched);
          } catch (error) {
            toast({
              variant: "error",
              title: "Something went wrong",
              description: error instanceof Error ? error.message : "Couldn't send your enquiry. Try again.",
            });
          } finally {
            setIsPending(false);
          }
        });
      }}
    >
      <motion.div variants={revealItemVariants} className="space-y-3">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--olive)]">Partnership enquiry</p>
        <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl">
          Tell us about your business.
        </h2>
        <p className="text-sm leading-7 text-[color:var(--muted)]">We&apos;ll come back to you within 24 hours.</p>
      </motion.div>

      <motion.div variants={revealItemVariants} className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 text-sm text-[color:var(--ink)]">
          <span>Business name</span>
          <input
            required
            value={form.businessName}
            onChange={(event) => setForm({ ...form, businessName: event.target.value })}
            onBlur={() => setTouched((current) => ({ ...current, businessName: true }))}
            className="w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--paper)] px-4 py-3 outline-none"
            placeholder="Your business name"
          />
          <AnimatePresence initial={false}>
            {touched.businessName && errors.businessName ? (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-xs text-red-600"
              >
                {errors.businessName}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="space-y-2 text-sm text-[color:var(--ink)]">
          <span>Contact name</span>
          <input
            required
            value={form.contactName}
            onChange={(event) => setForm({ ...form, contactName: event.target.value })}
            onBlur={() => setTouched((current) => ({ ...current, contactName: true }))}
            className="w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--paper)] px-4 py-3 outline-none"
            placeholder="Full name"
          />
          <AnimatePresence initial={false}>
            {touched.contactName && errors.contactName ? (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-xs text-red-600"
              >
                {errors.contactName}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div variants={revealItemVariants} className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 text-sm text-[color:var(--ink)]">
          <span>Phone</span>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
            onBlur={() => setTouched((current) => ({ ...current, phone: true }))}
            className="w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--paper)] px-4 py-3 outline-none"
            placeholder="071 234 5678"
          />
          <AnimatePresence initial={false}>
            {touched.phone && errors.phone ? (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-xs text-red-600"
              >
                {errors.phone}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="space-y-2 text-sm text-[color:var(--ink)]">
          <span>Email</span>
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            onBlur={() => setTouched((current) => ({ ...current, email: true }))}
            className="w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--paper)] px-4 py-3 outline-none"
            placeholder="hello@business.com"
          />
          <AnimatePresence initial={false}>
            {touched.email && errors.email ? (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-xs text-red-600"
              >
                {errors.email}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div variants={revealItemVariants} className="space-y-2 text-sm text-[color:var(--ink)]">
        <span>What are you interested in?</span>
        <select
          required
          value={form.interest}
          onChange={(event) => setForm({ ...form, interest: event.target.value as InterestOption })}
          onBlur={() => setTouched((current) => ({ ...current, interest: true }))}
          className="w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--paper)] px-4 py-3 outline-none"
        >
          {interestOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <AnimatePresence initial={false}>
          {touched.interest && errors.interest ? (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-xs text-red-600"
            >
              {errors.interest}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </motion.div>

      <motion.div variants={revealItemVariants} className="space-y-2 text-sm text-[color:var(--ink)]">
        <span>Tell us more</span>
        <textarea
          required
          rows={5}
          value={form.details}
          onChange={(event) => setForm({ ...form, details: event.target.value })}
          onBlur={() => setTouched((current) => ({ ...current, details: true }))}
          className="w-full rounded-[1.5rem] border border-[color:var(--line-strong)] bg-[color:var(--paper)] px-4 py-3 outline-none"
          placeholder="Tell us what you do, what you're interested in, and how you'd like to work with Jobe."
        />
        <AnimatePresence initial={false}>
          {touched.details && errors.details ? (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-xs text-red-600"
            >
              {errors.details}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </motion.div>

      <motion.div variants={revealItemVariants}>
        <MotionButton
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center rounded-full bg-[color:var(--ink)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-white hover:bg-[color:var(--olive)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Sending..." : "Send enquiry"}
        </MotionButton>
      </motion.div>
    </motion.form>
  );
}
