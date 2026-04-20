"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors",
  {
    variants: {
      variant: {
        default: "border-[color:var(--line-strong)] bg-white text-[color:var(--ink)]",
        phase: "border-transparent bg-[color:var(--sand)] text-[color:var(--ink)]",
        available: "border-transparent bg-[color:var(--olive)] text-white",
        waiting: "border-[color:var(--line-strong)] bg-[color:var(--paper)] text-[color:var(--muted)]",
        unit: "border-[color:var(--sand)] bg-transparent text-[color:var(--olive)]",
        paid: "border-transparent bg-[color:#0f766e] text-white",
        pending: "border-transparent bg-[color:#EF9F27] text-[color:var(--ink)]",
        overdue: "border-transparent bg-[color:#b91c1c] text-white",
        open: "border-transparent bg-[color:#e5efe1] text-[color:var(--olive)]",
        progress: "border-transparent bg-[color:#fde7bb] text-[color:var(--ink)]",
        resolved: "border-transparent bg-[color:#d7c495] text-[color:var(--ink)]",
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
