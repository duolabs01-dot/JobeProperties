"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { revealItemVariants } from "@/components/reveal-section";
import { MotionButton } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { useInView } from "@/hooks/use-in-view";

const interestOptions = [
  "On-site advertising",
  "Conference / event venue",
  "Corporate accommodation",
  "Supplier partnership",
  "Other",
] as const;

const partnersSchema = z.object({
  businessName: z.string().min(2, "Business name required"),
  contactName: z.string().min(2, "Contact name required"),
  phone: z.string().regex(/^0[0-9]{9}$/, "Enter a valid SA number"),
  email: z.string().email("Enter a valid email"),
  interest: z.enum(interestOptions),
  message: z.string().min(20, "Please tell us a bit more (min 20 characters)"),
});

type PartnersValues = z.infer<typeof partnersSchema>;

const initialState: PartnersValues = {
  businessName: "",
  contactName: "",
  phone: "",
  email: "",
  interest: "On-site advertising",
  message: "",
};

export function PartnersEnquiryForm() {
  const { toast } = useToast();
  const { ref, inView } = useInView<HTMLFormElement>();
  const [isPending, setIsPending] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, submitCount, touchedFields },
  } = useForm<PartnersValues>({
    resolver: zodResolver(partnersSchema),
    defaultValues: initialState,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  return (
    <motion.form
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{ visible: { transition: { delayChildren: 0.1, staggerChildren: 0.08 } } }}
      className="space-y-6 rounded-[2rem] border border-[color:var(--line-strong)] bg-white p-6 shadow-[0_24px_80px_rgba(17,24,15,0.08)] sm:p-8"
      onSubmit={handleSubmit(async (values) => {
        setIsPending(true);

        try {
          const response = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "business",
              businessName: values.businessName,
              contactName: values.contactName,
              phone: values.phone,
              email: values.email,
              interest: values.interest,
              message: values.message,
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
          reset(initialState);
        } catch (error) {
          toast({
            variant: "error",
            title: "Something went wrong",
            description: error instanceof Error ? error.message : "Couldn't send your enquiry. Try again.",
          });
        } finally {
          setIsPending(false);
        }
      })}
    >
      <motion.div variants={revealItemVariants} className="space-y-3">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--accent-dark)]">Partnership enquiry</p>
        <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl">
          Tell us about your business.
        </h2>
        <p className="text-sm leading-7 text-[color:var(--muted)]">We&apos;ll come back to you within 24 hours.</p>
      </motion.div>

      <motion.div variants={revealItemVariants} className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 text-sm text-[color:var(--ink)]">
          <span>Business name</span>
          <input
            {...register("businessName")}
            className="w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--surface)] px-4 py-3 outline-none"
            placeholder="Your business name"
          />
          <AnimatePresence initial={false}>
            {(touchedFields.businessName || submitCount > 0) && errors.businessName ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs text-red-600"
              >
                {errors.businessName.message}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="space-y-2 text-sm text-[color:var(--ink)]">
          <span>Contact name</span>
          <input
            {...register("contactName")}
            className="w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--surface)] px-4 py-3 outline-none"
            placeholder="Full name"
          />
          <AnimatePresence initial={false}>
            {(touchedFields.contactName || submitCount > 0) && errors.contactName ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs text-red-600"
              >
                {errors.contactName.message}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div variants={revealItemVariants} className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 text-sm text-[color:var(--ink)]">
          <span>Phone</span>
          <input
            {...register("phone", {
              setValueAs: (value) => (typeof value === "string" ? value.replace(/\s+/g, "") : value),
            })}
            type="tel"
            className="w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--surface)] px-4 py-3 outline-none"
            placeholder="071 234 5678"
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
        </div>

        <div className="space-y-2 text-sm text-[color:var(--ink)]">
          <span>Email</span>
          <input
            {...register("email")}
            type="email"
            className="w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--surface)] px-4 py-3 outline-none"
            placeholder="hello@business.com"
          />
          <AnimatePresence initial={false}>
            {(touchedFields.email || submitCount > 0) && errors.email ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs text-red-600"
              >
                {errors.email.message}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div variants={revealItemVariants} className="space-y-2 text-sm text-[color:var(--ink)]">
        <span>What are you interested in?</span>
        <select
          {...register("interest")}
          className="w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--surface)] px-4 py-3 outline-none"
        >
          {interestOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <AnimatePresence initial={false}>
          {(touchedFields.interest || submitCount > 0) && errors.interest ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs text-red-600"
            >
              {errors.interest.message}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </motion.div>

      <motion.div variants={revealItemVariants} className="space-y-2 text-sm text-[color:var(--ink)]">
        <span>Tell us more</span>
        <textarea
          {...register("message")}
          rows={5}
          className="w-full rounded-[1.5rem] border border-[color:var(--line-strong)] bg-[color:var(--surface)] px-4 py-3 outline-none"
          placeholder="Tell us what you do, what you're interested in, and how you'd like to work with Jobe."
        />
        <AnimatePresence initial={false}>
          {(touchedFields.message || submitCount > 0) && errors.message ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs text-red-600"
            >
              {errors.message.message}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </motion.div>

      <motion.div variants={revealItemVariants}>
        <MotionButton
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center rounded-full bg-[color:var(--ink)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-white hover:bg-[color:var(--accent-dark)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Sending..." : "Send enquiry"}
        </MotionButton>
      </motion.div>
    </motion.form>
  );
}
