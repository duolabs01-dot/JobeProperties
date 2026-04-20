"use client";

import { AnimatePresence, motion } from "framer-motion";
import { startTransition, useMemo, useState } from "react";
import { revealItemVariants } from "@/components/reveal-section";
import { MotionButton } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { useInView } from "@/hooks/use-in-view";

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

type FieldName = "email" | "message" | "name" | "phone";
type ErrorState = Partial<Record<FieldName, string>>;
type TouchedState = Record<FieldName, boolean>;

const initialTouched: TouchedState = {
  email: false,
  message: false,
  name: false,
  phone: false,
};

function validateField(field: FieldName, value: string) {
  switch (field) {
    case "name":
      return value.trim().length >= 2 ? "" : "Please enter at least 2 characters.";
    case "phone":
      return /^0[0-9]{9}$/.test(value.replace(/\s+/g, "")) ? "" : "Use a valid South African number.";
    case "email":
      return !value.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Enter a valid email address.";
    case "message":
      return value.trim().length >= 10 ? "" : "Please add at least 10 characters.";
    default:
      return "";
  }
}

export function ContactForm() {
  const { toast } = useToast();
  const { ref, inView } = useInView<HTMLFormElement>();
  const [form, setForm] = useState(initialState);
  const [isPending, setIsPending] = useState(false);
  const [touched, setTouched] = useState<TouchedState>(initialTouched);

  const errors = useMemo<ErrorState>(
    () => ({
      email: validateField("email", form.email),
      message: validateField("message", form.message),
      name: validateField("name", form.name),
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
        const nextTouched = {
          email: true,
          message: true,
          name: true,
          phone: true,
        };
        setTouched(nextTouched);

        if (hasErrors) {
          return;
        }

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

            toast({
              variant: "success",
              title: "Message sent",
              description: "We'll be in touch within a few hours.",
            });
            setForm(initialState);
            setTouched(initialTouched);
          } catch (error) {
            toast({
              variant: "error",
              title: "Something went wrong",
              description: error instanceof Error ? error.message : "Couldn't send your message. Try again.",
            });
          } finally {
            setIsPending(false);
          }
        });
      }}
    >
      <motion.div variants={revealItemVariants} className="space-y-3">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--olive)]">Send us a message</p>
        <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl">
          Tell us what you need.
        </h2>
      </motion.div>

      <motion.div variants={revealItemVariants} className="grid gap-4 sm:grid-cols-2">
        <div className="block space-y-2 text-sm text-[color:var(--ink)]">
          <span>Name</span>
          <input
            required
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            onBlur={() => setTouched((current) => ({ ...current, name: true }))}
            className="w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--paper)] px-4 py-3 outline-none"
            placeholder="Full name"
          />
          <AnimatePresence initial={false}>
            {touched.name && errors.name ? (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-xs text-red-600"
              >
                {errors.name}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="block space-y-2 text-sm text-[color:var(--ink)]">
          <span>Phone number</span>
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
      </motion.div>

      <motion.div variants={revealItemVariants} className="block space-y-2 text-sm text-[color:var(--ink)]">
        <span>Email</span>
        <input
          type="email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          onBlur={() => setTouched((current) => ({ ...current, email: true }))}
          className="w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--paper)] px-4 py-3 outline-none"
          placeholder="Optional"
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
      </motion.div>

      <motion.div variants={revealItemVariants} className="block space-y-2 text-sm text-[color:var(--ink)]">
        <span>Message</span>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(event) => setForm({ ...form, message: event.target.value })}
          onBlur={() => setTouched((current) => ({ ...current, message: true }))}
          className="w-full rounded-[1.5rem] border border-[color:var(--line-strong)] bg-[color:var(--paper)] px-4 py-3 outline-none"
          placeholder="Tell us how we can help"
        />
        <AnimatePresence initial={false}>
          {touched.message && errors.message ? (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-xs text-red-600"
            >
              {errors.message}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </motion.div>

      <motion.fieldset variants={revealItemVariants} className="space-y-3">
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
      </motion.fieldset>

      <motion.div variants={revealItemVariants}>
        <MotionButton
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center rounded-full bg-[color:var(--ink)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-white transition duration-300 hover:bg-[color:var(--olive)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Sending..." : "Send message"}
        </MotionButton>
      </motion.div>
    </motion.form>
  );
}
