"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MotionButton } from "@/components/ui/button";
import {
  formatDate,
  formatUnitType,
  getPaymentBadgeVariant,
  type AdminPhaseSection,
  type AdminUnitTile,
} from "@/lib/admin-dashboard";

type UnitsGridProps = {
  phases: AdminPhaseSection[];
};

function getTileClasses(status: AdminUnitTile["status"]) {
  switch (status) {
    case "occupied":
      return "bg-[#dcfce7] text-[#166534] border-[#86efac]";
    case "reserved":
      return "bg-[#fde7bb] text-[#7c2d12] border-[#fbbf24]";
    case "maintenance":
      return "bg-[#e5e7eb] text-[#374151] border-[#cbd5e1]";
    case "available":
    default:
      return "bg-[#fee2e2] text-[#991b1b] border-[#fca5a5]";
  }
}

export function UnitsGrid({ phases }: UnitsGridProps) {
  const [activeUnit, setActiveUnit] = useState<AdminUnitTile | null>(null);

  return (
    <>
      <div className="space-y-8">
        {phases.map((phase) => (
          <section
            key={phase.badge}
            className="rounded-[2rem] border border-[color:var(--line-strong)] bg-white p-5 shadow-[0_20px_70px_rgba(17,24,15,0.06)] sm:p-6"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Badge variant="phase">{phase.badge}</Badge>
                <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">{phase.name}</h3>
              </div>
              <p className="text-sm leading-7 text-[color:var(--muted)]">{phase.address}</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {phase.units.length ? (
                phase.units.map((unit) => (
                  <button
                    key={unit.id}
                    type="button"
                    onClick={() => setActiveUnit(unit)}
                    className={`flex h-20 w-20 flex-col items-center justify-center rounded-[1rem] border text-center text-xs font-semibold tracking-[0.04em] transition-transform duration-300 hover:-translate-y-1 ${getTileClasses(unit.status)}`}
                  >
                    <span>{unit.unitNumber}</span>
                    <span className="mt-1 text-[10px] uppercase">{unit.status}</span>
                  </button>
                ))
              ) : (
                <p className="text-sm text-[color:var(--muted)]">No units added to this phase yet.</p>
              )}
            </div>
          </section>
        ))}
      </div>

      <AnimatePresence>
        {activeUnit ? (
          <DialogPrimitive.Root open onOpenChange={(open) => !open && setActiveUnit(null)}>
            <DialogPrimitive.Portal forceMount>
              <DialogPrimitive.Overlay asChild forceMount>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm"
                />
              </DialogPrimitive.Overlay>

              <DialogPrimitive.Content asChild forceMount>
                <motion.div
                  initial={{ opacity: 0, y: 18, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 18, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="fixed left-1/2 top-1/2 z-[81] w-[min(92vw,34rem)] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-[color:var(--line-strong)] bg-white p-6 shadow-[0_28px_90px_rgba(17,24,15,0.2)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-3">
                      <DialogPrimitive.Title className="font-display text-3xl leading-none text-[color:var(--ink)]">
                        {activeUnit.unitNumber}
                      </DialogPrimitive.Title>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="phase">{activeUnit.phase}</Badge>
                        <Badge variant="unit">{formatUnitType(activeUnit.unitType)}</Badge>
                      </div>
                    </div>

                    <MotionButton
                      type="button"
                      onClick={() => setActiveUnit(null)}
                      className="inline-flex items-center justify-center rounded-full border border-[color:var(--line-strong)] bg-[color:var(--paper)] p-3 text-[color:var(--ink)]"
                    >
                      <X className="h-4 w-4" />
                    </MotionButton>
                  </div>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--olive)]">Tenant</p>
                      <p className="text-sm text-[color:var(--ink)]">{activeUnit.tenantName ?? "No tenant linked"}</p>
                      <p className="text-sm text-[color:var(--muted)]">{activeUnit.tenantPhone ?? "No phone saved"}</p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--olive)]">Payment</p>
                      {activeUnit.paymentStatus ? (
                        <Badge variant={getPaymentBadgeVariant(activeUnit.paymentStatus)}>
                          {activeUnit.paymentStatus}
                        </Badge>
                      ) : (
                        <p className="text-sm text-[color:var(--muted)]">No payment status yet</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--olive)]">Lease start</p>
                      <p className="text-sm text-[color:var(--ink)]">{formatDate(activeUnit.leaseStartDate)}</p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--olive)]">Lease end</p>
                      <p className="text-sm text-[color:var(--ink)]">
                        {activeUnit.leaseEndDate ? formatDate(activeUnit.leaseEndDate) : "Month to month"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          </DialogPrimitive.Root>
        ) : null}
      </AnimatePresence>
    </>
  );
}
