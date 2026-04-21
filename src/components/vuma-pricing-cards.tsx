"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { vumaPackages, vumaSignupUrl } from "@/lib/property-data";

export function VumaPricingCards() {
  const [selected, setSelected] = useState(() =>
    Math.max(
      0,
      vumaPackages.findIndex((pkg) => pkg.featured),
    ),
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full border border-[color:var(--line-strong)] px-3 py-1.5">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--ink)]">
              Fibre
            </span>
          </div>
          <span className="text-sm font-semibold text-[#1a3a8f]">VUMA</span>
          <span className="text-xs text-[color:var(--muted)]">via Webafrica</span>
        </div>
        <span className="text-xs text-[color:var(--muted)]">Monthly</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {vumaPackages.map((pkg, index) => {
          const isSelected = selected === index;

          return (
            <motion.button
              key={`${pkg.speed}-${pkg.uploadSpeed}-${pkg.price}`}
              type="button"
              onClick={() => setSelected(index)}
              animate={{ scale: isSelected ? 1.02 : 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={[
                "rounded-2xl p-5 text-left transition-all duration-200",
                isSelected
                  ? "bg-[#1a3a8f] text-white shadow-lg"
                  : "bg-[#dce8f5] text-[#1a3a8f] hover:bg-[#c8ddf0]",
                index === 4 ? "col-span-2 sm:col-span-1" : "",
              ].join(" ")}
            >
              <p
                className={[
                  "mb-1 text-xs font-medium",
                  isSelected ? "text-white/70" : "text-[#1a3a8f]/70",
                ].join(" ")}
              >
                Uncapped
              </p>
              <p className="text-3xl font-bold tracking-[-0.04em]">
                {pkg.price}
                <span className="text-base font-medium">pm</span>
              </p>
              <div
                className={[
                  "mt-3 flex items-center gap-3 text-xs",
                  isSelected ? "text-white/80" : "text-[#1a3a8f]/80",
                ].join(" ")}
              >
                <span className="flex items-center gap-1">↓ {pkg.speed}</span>
                <span className="flex items-center gap-1">↑ {pkg.uploadSpeed}</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      <p className="text-[11px] leading-5 text-[color:var(--muted)]">
        Prices shown are Webafrica/Vuma rates as of 2026. Tenants subscribe and pay directly. Jobe
        Propco provides the fibre infrastructure — your connection, your account.
      </p>

      <Link
        href={vumaSignupUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center text-sm font-medium text-[color:var(--accent-dark)] hover:underline"
      >
        Check availability at webafrica.co.za →
      </Link>
    </div>
  );
}
