"use client";

import { useMemo, useState } from "react";
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { MotionButton } from "@/components/ui/button";
import { PortalStatusBadge } from "@/components/portal/portal-status-badge";
import type { PaymentRow } from "@/lib/supabase";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function PaymentHistoryTable({ payments }: { payments: PaymentRow[] }) {
  const [visibleCount, setVisibleCount] = useState(6);
  const visiblePayments = payments.slice(0, visibleCount);

  const columns = useMemo<ColumnDef<PaymentRow>[]>(
    () => [
      {
        accessorKey: "due_date",
        header: "Date",
        cell: ({ row }) => <span>{formatDate(row.original.due_date)}</span>,
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => <span>{formatCurrency(Number(row.original.amount))}</span>,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <PortalStatusBadge kind="payment" value={row.original.status} />,
      },
      {
        accessorKey: "receipt_url",
        header: "Receipt",
        cell: ({ row }) =>
          row.original.receipt_url ? (
            <a
              href={row.original.receipt_url}
              target="_blank"
              rel="noreferrer"
              className="text-[color:var(--accent-dark)] underline-offset-4 hover:underline"
            >
              Download
            </a>
          ) : (
            <span className="text-[color:var(--muted)]">—</span>
          ),
      },
    ],
    [],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: visiblePayments,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-[2rem] border border-[color:var(--line-strong)] bg-white shadow-[0_20px_70px_rgba(17,24,15,0.06)]">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-[color:var(--surface)] text-left text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-5 py-4 font-medium">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-t border-[color:var(--line)] text-sm text-[color:var(--ink)]">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-5 py-4 align-middle">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-5 py-8 text-sm text-[color:var(--muted)]">
                  No payments yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {visibleCount < payments.length ? (
        <div className="border-t border-[color:var(--line)] px-5 py-4">
          <MotionButton
            type="button"
            onClick={() => setVisibleCount((count) => count + 6)}
            className="inline-flex items-center justify-center rounded-full border border-[color:var(--line-strong)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--ink)] transition duration-300 hover:bg-[color:var(--surface)]"
          >
            Load more
          </MotionButton>
        </div>
      ) : null}
    </div>
  );
}
