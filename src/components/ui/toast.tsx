"use client";

import * as ToastPrimitive from "@radix-ui/react-toast";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type ToastVariant = "error" | "neutral" | "success";

type ToastInput = {
  title: string;
  description?: string;
  duration?: number;
  variant?: ToastVariant;
};

type ToastRecord = ToastInput & {
  id: string;
  open: boolean;
};

type ToastStore = {
  toast: (input: ToastInput) => string;
  dismiss: (id: string) => void;
};

let toastState: ToastRecord[] = [];
const listeners = new Set<(toasts: ToastRecord[]) => void>();

function emitToastState() {
  listeners.forEach((listener) => listener(toastState));
}

function subscribe(listener: (toasts: ToastRecord[]) => void) {
  listeners.add(listener);
  listener(toastState);

  return () => {
    listeners.delete(listener);
  };
}

function removeToast(id: string) {
  toastState = toastState.filter((toast) => toast.id !== id);
  emitToastState();
}

function dismissToast(id: string) {
  toastState = toastState.map((toast) => (toast.id === id ? { ...toast, open: false } : toast));
  emitToastState();
  window.setTimeout(() => removeToast(id), 220);
}

function addToast(input: ToastInput) {
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;

  toastState = [
    ...toastState,
    {
      id,
      open: true,
      variant: "neutral",
      duration: 4500,
      ...input,
    },
  ];
  emitToastState();

  return id;
}

const toastVariantClasses: Record<ToastVariant, string> = {
  neutral: "border-[color:var(--line-strong)]",
  success: "border-[#6B8A4D]",
  error: "border-[#DC2626]",
};

function useToastStoreValue(): ToastStore {
  return useMemo(
    () => ({
      toast: addToast,
      dismiss: dismissToast,
    }),
    [],
  );
}

export function Toaster() {
  const [toasts, setToasts] = useState<ToastRecord[]>(toastState);

  useEffect(() => subscribe(setToasts), []);

  return (
    <ToastPrimitive.Provider swipeDirection="down">
      <AnimatePresence>
        {toasts.map((toast) =>
          toast.open ? (
            <ToastPrimitive.Root
              key={toast.id}
              asChild
              open={toast.open}
              duration={toast.duration}
              onOpenChange={(open) => {
                if (!open) {
                  dismissToast(toast.id);
                }
              }}
            >
              <motion.li
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "pointer-events-auto w-full max-w-sm rounded-[1.5rem] border bg-white px-5 py-4 shadow-[0_28px_60px_rgba(17,24,15,0.18)]",
                  toastVariantClasses[toast.variant ?? "neutral"],
                )}
              >
                <div className="space-y-1.5">
                  <ToastPrimitive.Title className="text-sm font-semibold text-[color:var(--ink)]">
                    {toast.title}
                  </ToastPrimitive.Title>
                  {toast.description ? (
                    <ToastPrimitive.Description className="text-sm leading-6 text-[color:var(--muted)]">
                      {toast.description}
                    </ToastPrimitive.Description>
                  ) : null}
                </div>
              </motion.li>
            </ToastPrimitive.Root>
          ) : null,
        )}
      </AnimatePresence>

      <ToastPrimitive.Viewport className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-3 px-4 outline-none sm:inset-x-auto sm:bottom-6 sm:right-6 sm:items-end" />
    </ToastPrimitive.Provider>
  );
}

export function useToast() {
  return useToastStoreValue();
}
