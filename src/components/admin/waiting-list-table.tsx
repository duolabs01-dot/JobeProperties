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
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";
import {
  formatDate,
  formatUnitType,
  getWaitingListBadgeVariant,
  type AdminWaitingListRecord,
  type AdminWaitingListStatus,
} from "@/lib/admin-dashboard";

type WaitingListTableProps = {
  entries: AdminWaitingListRecord[];
};

type StatusFilter = "all" | AdminWaitingListStatus;

const nextStatusOptions: AdminWaitingListStatus[] = ["new", "contacted", "qualified", "archived"];

export function WaitingListTable({ entries }: WaitingListTableProps) {
  const { toast } = useToast();
  const [rows, setRows] = useState(entries);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sorting, setSorting] = useState<SortingState>([{ id: "createdAt", desc: true }]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => statusFilter === "all" || row.status === statusFilter);
  }, [rows, statusFilter]);

  const columns = useMemo<ColumnDef<AdminWaitingListRecord>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => <span className="font-medium text-[color:var(--ink)]">{row.original.name}</span>,
      },
      {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => (
          <a href={`tel:${row.original.phone}`} className="text-sm text-[color:var(--olive)] hover:underline">
            {row.original.phone}
          </a>
        ),
      },
      {
        accessorKey: "preferredPhase",
        header: "Preferred phase",
        cell: ({ row }) => <span className="text-sm text-[color:var(--muted)]">{row.original.preferredPhase ?? "Any phase"}</span>,
      },
      {
        accessorKey: "unitType",
        header: "Unit type",
        cell: ({ row }) => <span className="text-sm text-[color:var(--muted)]">{formatUnitType(row.original.unitType)}</span>,
      },
      {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => <span className="text-sm text-[color:var(--muted)]">{formatDate(row.original.createdAt)}</span>,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge variant={getWaitingListBadgeVariant(row.original.status)}>
            {row.original.status}
          </Badge>
        ),
      },
      {
        id: "action",
        header: "Action",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <a
              href={`tel:${row.original.phone}`}
              className="text-xs font-medium text-[color:var(--olive)] transition-colors duration-300 hover:underline"
            >
              Call
            </a>
            <select
              value={row.original.status}
              disabled={updatingId === row.original.id}
              onChange={async (event) => {
                const nextStatus = event.target.value as AdminWaitingListStatus;
                const previousRows = rows;
                setUpdatingId(row.original.id);
                setRows((current) =>
                  current.map((item) => (item.id === row.original.id ? { ...item, status: nextStatus } : item)),
                );

                try {
                  const response = await fetch("/api/admin/waiting-list", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      entry_id: row.original.id,
                      status: nextStatus,
                    }),
                  });
                  const payload = (await response.json()) as { success?: boolean; message?: string };

                  if (!response.ok || !payload.success) {
                    throw new Error(payload.message || "Couldn't update waiting list entry.");
                  }

                  toast({
                    variant: "success",
                    title: "Status updated",
                    description: payload.message ?? "Waiting list entry updated.",
                  });
                } catch (error) {
                  setRows(previousRows);
                  toast({
                    variant: "error",
                    title: "Update failed",
                    description: error instanceof Error ? error.message : "Couldn't update waiting list entry.",
                  });
                } finally {
                  setUpdatingId(null);
                }
              }}
              className="rounded-full border border-[color:var(--line-strong)] bg-white px-3 py-2 text-xs text-[color:var(--ink)] outline-none"
            >
              {nextStatusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        ),
      },
    ],
    [rows, toast, updatingId],
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

  return (
    <div className="space-y-5 rounded-[2rem] border border-[color:var(--line-strong)] bg-white p-5 shadow-[0_20px_70px_rgba(17,24,15,0.06)] sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--olive)]">Lead queue</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">Waiting list</h3>
        </div>

        <select
          value={statusFilter}
          onChange={(event) => {
            setStatusFilter(event.target.value as StatusFilter);
            setPagination((current) => ({ ...current, pageIndex: 0 }));
          }}
          className="rounded-full border border-[color:var(--line-strong)] bg-[color:var(--paper)] px-4 py-3 text-sm text-[color:var(--ink)] outline-none"
        >
          <option value="all">All statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="archived">Archived</option>
        </select>
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
                <tr key={row.id} className="rounded-[1.25rem] bg-[color:var(--paper)]">
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
                  No waiting list entries match that filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-[color:var(--muted)]">{filteredRows.length} entries</p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            className="rounded-full border border-[color:var(--line-strong)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--ink)] hover:bg-[color:var(--paper)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <button
            type="button"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            className="rounded-full border border-[color:var(--line-strong)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--ink)] hover:bg-[color:var(--paper)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
