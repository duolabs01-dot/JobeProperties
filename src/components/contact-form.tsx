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

const contactOptions = [
  "Looking for an apartment",
  "Current tenant",
  "Business enquiry",
] as const;

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^0[0-9]{9}$/, "Enter a valid SA number"),
  email: z.string().email("Enter a valid email address").optional().or(z.literal("")),
  message: z.string().min(10, "Message must be at least 10 characters"),
  enquiryType: z.enum(contactOptions),
});

type ContactValues = z.infer<typeof contactSchema>;

const initialState: ContactValues = {
  name: "",
  phone: "",
  email: "",
  message: "",
  enquiryType: "Looking for an apartment",
};

export function ContactForm() {
  const { toast } = useToast();
  const { ref, inView } = useInView<HTMLFormElement>();
  const [isPending, setIsPending] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, submitCount, touchedFields },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
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
              name: values.name,
              phone: values.phone,
              email: values.email,
              message: values.message,
              contactType: values.enquiryType,
            }),
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
          reset(initialState);
        } catch (error) {
          toast({
            variant: "error",
            title: "Something went wrong",
            description: error instanceof Error ? error.message : "Couldn't send your message. Try again.",
          });
        } finally {
          setIsPending(false);
        }
      })}
    >
      <motion.div variants={revealItemVariants} className="space-y-3">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--accent-dark)]">Send us a message</p>
        <h2 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl">
          Tell us what you need.
        </h2>
      </motion.div>

      <motion.div variants={revealItemVariants} className="grid gap-4 sm:grid-cols-2">
        <div className="block space-y-2 text-sm text-[color:var(--ink)]">
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
        </div>

        <div className="block space-y-2 text-sm text-[color:var(--ink)]">
          <span>Phone number</span>
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
      </motion.div>

      <motion.div variants={revealItemVariants} className="block space-y-2 text-sm text-[color:var(--ink)]">
        <span>Email</span>
        <input
          {...register("email")}
          type="email"
          className="w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--surface)] px-4 py-3 outline-none"
          placeholder="Optional"
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
      </motion.div>

      <motion.div variants={revealItemVariants} className="block space-y-2 text-sm text-[color:var(--ink)]">
        <span>Message</span>
        <textarea
          {...register("message")}
          rows={5}
          className="w-full rounded-[1.5rem] border border-[color:var(--line-strong)] bg-[color:var(--surface)] px-4 py-3 outline-none"
          placeholder="Tell us how we can help"
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

      <motion.fieldset variants={revealItemVariants} className="space-y-3">
        <legend className="text-sm text-[color:var(--ink)]">Which are you?</legend>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {contactOptions.map((option) => {
            return (
              <label
                key={option}
                className="inline-flex items-center gap-3 rounded-full border border-[color:var(--line-strong)] bg-white px-4 py-3 text-sm text-[color:var(--muted)] transition has-[:checked]:border-[color:var(--accent)] has-[:checked]:bg-[color:var(--accent-light)] has-[:checked]:text-[color:var(--accent-dark)]"
              >
                <input
                  {...register("enquiryType")}
                  type="radio"
                  value={option}
                  className="accent-[color:var(--accent)]"
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
          className="inline-flex items-center justify-center rounded-full bg-[color:var(--ink)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-white transition duration-300 hover:bg-[color:var(--accent-dark)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Sending..." : "Send message"}
        </MotionButton>
      </motion.div>
    </motion.form>
  );
}
