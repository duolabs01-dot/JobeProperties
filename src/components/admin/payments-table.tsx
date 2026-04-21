"use client";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { Download, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { MotionButton } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import {
  formatCurrency,
  formatDate,
  formatDateTime,
  getPaymentBadgeVariant,
  type AdminPaymentRecord,
  type AdminPaymentStatus,
} from "@/lib/admin-dashboard";

type PaymentsTableProps = {
  payments: AdminPaymentRecord[];
};

type StatusFilter = "all" | AdminPaymentStatus;

export function PaymentsTable({ payments }: PaymentsTableProps) {
  const { toast } = useToast();
  const [rows, setRows] = useState(payments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sorting, setSorting] = useState<SortingState>([{ id: "dueDate", desc: true }]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
  const [remindingId, setRemindingId] = useState<string | null>(null);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const matchesSearch = row.tenantName.toLowerCase().includes(search.trim().toLowerCase());
      const matchesStatus = statusFilter === "all" || row.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [rows, search, statusFilter]);

  const columns = useMemo<ColumnDef<AdminPaymentRecord>[]>(
    () => [
      {
        accessorKey: "tenantName",
        header: "Tenant name",
        cell: ({ row }) => (
          <div className="space-y-1">
            <p className="font-medium text-[color:var(--ink)]">{row.original.tenantName}</p>
            <p className="text-xs text-[color:var(--muted)]">{row.original.phone ?? "No phone saved"}</p>
          </div>
        ),
      },
      {
        accessorKey: "unitNumber",
        header: "Unit",
        cell: ({ row }) => <span className="text-sm text-[color:var(--ink)]">{row.original.unitNumber}</span>,
      },
      {
        accessorKey: "phase",
        header: "Location",
        cell: ({ row }) => <Badge variant="phase">{row.original.phase}</Badge>,
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => <span className="text-sm text-[color:var(--ink)]">{formatCurrency(row.original.amount)}</span>,
      },
      {
        accessorKey: "dueDate",
        header: "Due date",
        cell: ({ row }) => <span className="text-sm text-[color:var(--muted)]">{formatDate(row.original.dueDate)}</span>,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge variant={getPaymentBadgeVariant(row.original.status)}>
            {row.original.status}
          </Badge>
        ),
      },
      {
        accessorKey: "paidAt",
        header: "Paid at",
        cell: ({ row }) => <span className="text-sm text-[color:var(--muted)]">{formatDateTime(row.original.paidAt)}</span>,
      },
      {
        accessorKey: "receiptUrl",
        header: "Receipt",
        enableSorting: false,
        cell: ({ row }) =>
          row.original.receiptUrl ? (
            <a
              href={row.original.receiptUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-medium text-[color:var(--accent-dark)] hover:underline"
            >
              Download
            </a>
          ) : (
            <span className="text-xs text-[color:var(--muted)]">—</span>
          ),
      },
      {
        id: "action",
        header: "Action",
        enableSorting: false,
        cell: ({ row }) => {
          const payment = row.original;
          const canRemind = payment.status === "pending" || payment.status === "overdue";

          if (!canRemind) {
            return <span className="text-xs text-[color:var(--muted)]">—</span>;
          }

          return (
            <div className="space-y-2">
              <button
                type="button"
                disabled={remindingId === payment.id}
                onClick={async () => {
                  setRemindingId(payment.id);

                  try {
                    const response = await fetch("/api/admin/remind", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ payment_id: payment.id }),
                    });
                    const payload = (await response.json()) as { success?: boolean; message?: string };

                    if (!response.ok || !payload.success) {
                      throw new Error(payload.message || "Couldn't send reminder.");
                    }

                    const remindedAt = new Date().toISOString();
                    setRows((current) =>
                      current.map((item) => (item.id === payment.id ? { ...item, remindedAt } : item)),
                    );
                    toast({
                      variant: "success",
                      title: "Reminder sent",
                      description: payload.message ?? "Tenant reminder sent.",
                    });
                  } catch (error) {
                    toast({
                      variant: "error",
                      title: "Reminder failed",
                      description: error instanceof Error ? error.message : "Couldn't send reminder.",
                    });
                  } finally {
                    setRemindingId(null);
                  }
                }}
                className="text-xs font-medium text-[color:var(--accent-dark)] transition-colors duration-300 hover:underline disabled:opacity-60"
              >
                {remindingId === payment.id ? "Sending..." : "Send reminder"}
              </button>

              {payment.remindedAt ? (
                <p className="text-[11px] text-[color:var(--muted)]">
                  Reminded {formatDateTime(payment.remindedAt)}
                </p>
              ) : null}
            </div>
          );
        },
      },
    ],
    [remindingId, toast],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: filteredRows,
    columns,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const exportCsv = () => {
    const csvRows = [
      ["Tenant name", "Phone", "Unit", "Location", "Amount", "Due date", "Status", "Paid at", "Reminded at"],
      ...filteredRows.map((row) => [
        row.tenantName,
        row.phone ?? "",
        row.unitNumber,
        row.phase,
        row.amount.toFixed(2),
        row.dueDate,
        row.status,
        row.paidAt ?? "",
        row.remindedAt ?? "",
      ]),
    ];

    const csv = csvRows
      .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "jobe-payments.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5 rounded-[2rem] border border-[color:var(--line-strong)] bg-white p-5 shadow-[0_20px_70px_rgba(17,24,15,0.06)] sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          <label className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--muted)]" />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPagination((current) => ({ ...current, pageIndex: 0 }));
              }}
              placeholder="Search tenant name"
              className="w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--surface)] py-3 pl-11 pr-4 text-sm outline-none"
            />
          </label>

          <select
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value as StatusFilter);
              setPagination((current) => ({ ...current, pageIndex: 0 }));
            }}
            className="rounded-full border border-[color:var(--line-strong)] bg-[color:var(--surface)] px-4 py-3 text-sm text-[color:var(--ink)] outline-none"
          >
            <option value="all">All statuses</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <MotionButton
          type="button"
          onClick={exportCsv}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--ink)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--ink)] hover:bg-[color:var(--ink)] hover:text-white"
        >
          <Download className="h-4 w-4" />
          Download CSV
        </MotionButton>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-3">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-3 text-left text-[11px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <button
                        type="button"
                        onClick={header.column.getToggleSortingHandler()}
                        className="inline-flex items-center gap-2"
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <span className="text-[10px]">
                          {header.column.getIsSorted() === "asc"
                            ? "↑"
                            : header.column.getIsSorted() === "desc"
                              ? "↓"
                              : ""}
                        </span>
                      </button>
                    ) : (
                      flexRender(header.column.columnDef.header, header.getContext())
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="rounded-[1.25rem] bg-[color:var(--surface)]">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-3 py-4 align-top text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-3 py-8 text-center text-sm text-[color:var(--muted)]">
                  No payments match that filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-[color:var(--muted)]">
          Showing {table.getRowModel().rows.length} of {filteredRows.length} records
        </p>

        <div className="flex items-center gap-3">
          <MotionButton
            type="button"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            className="rounded-full border border-[color:var(--line-strong)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--ink)] hover:bg-[color:var(--surface)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </MotionButton>
          <MotionButton
            type="button"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            className="rounded-full border border-[color:var(--line-strong)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--ink)] hover:bg-[color:var(--surface)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </MotionButton>
        </div>
      </div>
    </div>
  );
}
