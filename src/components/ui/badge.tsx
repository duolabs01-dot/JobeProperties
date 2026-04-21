"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors",
  {
    variants: {
      variant: {
        default: "border-[color:var(--line-strong)] bg-white text-[color:var(--ink)]",
        phase: "border-transparent bg-[color:var(--accent)] text-white",
        available: "border-transparent bg-[#166534] text-white",
        waiting: "border-[color:var(--line-strong)] bg-[color:var(--surface)] text-[color:var(--muted)]",
        unit: "border-[color:var(--accent-light)] bg-[color:var(--accent-light)] text-[color:var(--accent-dark)]",
        red: "border-transparent bg-[#FEE2E2] text-[#991B1B]",
        paid: "border-transparent bg-[color:#0f766e] text-white",
        pending: "border-transparent bg-[color:#EF9F27] text-[color:var(--ink)]",
        overdue: "border-transparent bg-[#FEE2E2] text-[#991B1B]",
        open: "border-transparent bg-[color:var(--success-bg)] text-[color:var(--success)]",
        progress: "border-transparent bg-[color:#fde7bb] text-[color:var(--ink)]",
        resolved: "border-transparent bg-[color:var(--accent-light)] text-[color:var(--accent-dark)]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
