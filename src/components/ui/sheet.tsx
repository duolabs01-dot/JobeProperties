"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { createContext, useContext } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

type SheetContextValue = {
  open: boolean;
};

const SheetContext = createContext<SheetContextValue>({ open: false });

type SheetProps = React.ComponentProps<typeof DialogPrimitive.Root>;

export function Sheet({ open = false, children, ...props }: SheetProps) {
  return (
    <SheetContext.Provider value={{ open }}>
      <DialogPrimitive.Root open={open} {...props}>
        {children}
      </DialogPrimitive.Root>
    </SheetContext.Provider>
  );
}

export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;

const sheetContentVariants = cva(
  "fixed top-0 h-dvh w-full max-w-[320px] bg-[color:var(--ink)] text-white shadow-[0_28px_80px_rgba(0,0,0,0.45)]",
  {
    variants: {
      side: {
        left: "left-0",
        right: "right-0",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

type SheetContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> &
  VariantProps<typeof sheetContentVariants>;

export function SheetContent({ className, children, side = "right", ...props }: SheetContentProps) {
  const { open } = useContext(SheetContext);

  return (
    <DialogPrimitive.Portal forceMount>
      <AnimatePresence>
        {open ? (
          <>
            <DialogPrimitive.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              />
            </DialogPrimitive.Overlay>

            <DialogPrimitive.Content asChild forceMount {...props}>
              <motion.div
                initial={{ x: side === "left" ? "-100%" : "100%" }}
                animate={{ x: 0 }}
                exit={{ x: side === "left" ? "-100%" : "100%" }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className={cn(sheetContentVariants({ side }), className)}
              >
                {children}
              </motion.div>
            </DialogPrimitive.Content>
          </>
        ) : null}
      </AnimatePresence>
    </DialogPrimitive.Portal>
  );
}
