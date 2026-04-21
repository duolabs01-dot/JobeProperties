"use client";

import { useState } from "react";
import { MotionButton } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

type InitiateResponse = {
  url: string;
  params: Record<string, string>;
};

export function PayNowButton() {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);

  return (
    <MotionButton
      type="button"
      disabled={isPending}
      onClick={async () => {
        setIsPending(true);

        try {
          const response = await fetch("/api/payments/initiate", {
            method: "POST",
          });

          const payload = (await response.json()) as Partial<InitiateResponse> & { message?: string };

          if (!response.ok || !payload.url || !payload.params) {
            throw new Error(payload.message || "Couldn't start PayFast checkout.");
          }

          const form = document.createElement("form");
          form.method = "POST";
          form.action = payload.url;

          Object.entries(payload.params).forEach(([key, value]) => {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = value;
            form.appendChild(input);
          });

          document.body.appendChild(form);
          form.submit();
        } catch (error) {
          toast({
            variant: "error",
            title: "Payment could not start",
            description: error instanceof Error ? error.message : "Couldn't start PayFast checkout.",
          });
        } finally {
          setIsPending(false);
        }
      }}
      className="inline-flex items-center justify-center rounded-full bg-[color:var(--accent)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white transition duration-300 hover:bg-[color:var(--accent-dark)] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isPending ? "Opening PayFast..." : "Pay now"}
    </MotionButton>
  );
}
