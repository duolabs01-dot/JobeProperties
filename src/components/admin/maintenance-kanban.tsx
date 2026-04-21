"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { MotionButton } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import {
  formatDate,
  getMaintenanceStatusBadgeVariant,
  getPriorityBadgeVariant,
  type AdminMaintenanceRecord,
  type AdminMaintenanceStatus,
} from "@/lib/admin-dashboard";

type MaintenanceKanbanProps = {
  requests: AdminMaintenanceRecord[];
};

const columns: AdminMaintenanceStatus[] = ["open", "in_progress", "resolved"];

const statusTitles: Record<AdminMaintenanceStatus, string> = {
  open: "Open",
  in_progress: "In Progress",
  resolved: "Resolved",
};

function nextStatus(current: AdminMaintenanceStatus): AdminMaintenanceStatus | null {
  if (current === "open") {
    return "in_progress";
  }

  if (current === "in_progress") {
    return "resolved";
  }

  return null;
}

export function MaintenanceKanban({ requests }: MaintenanceKanbanProps) {
  const { toast } = useToast();
  const [rows, setRows] = useState(requests);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const groupedRows = useMemo(() => {
    return columns.reduce<Record<AdminMaintenanceStatus, AdminMaintenanceRecord[]>>(
      (accumulator, status) => {
        accumulator[status] = rows.filter((row) => row.status === status);
        return accumulator;
      },
      {
        open: [],
        in_progress: [],
        resolved: [],
      },
    );
  }, [rows]);

  return (
    <div className="grid gap-5 xl:grid-cols-3">
      {columns.map((status) => (
        <div
          key={status}
          className="rounded-[2rem] border border-[color:var(--line-strong)] bg-white p-5 shadow-[0_20px_70px_rgba(17,24,15,0.06)]"
        >
          <div className="flex items-center justify-between gap-3 border-b border-[color:var(--line)] pb-4">
            <h3 className="text-lg font-semibold tracking-[-0.03em] text-[color:var(--ink)]">{statusTitles[status]}</h3>
            <Badge variant={getMaintenanceStatusBadgeVariant(status)}>
              {groupedRows[status].length}
            </Badge>
          </div>

          <div className="mt-5 space-y-4">
            {groupedRows[status].length ? (
              groupedRows[status].map((request) => {
                const next = nextStatus(request.status);

                return (
                  <article
                    key={request.id}
                    className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-[color:var(--ink)]">{request.unitNumber}</p>
                        <Badge variant="highlight">{request.phase}</Badge>
                      </div>

                      <Badge variant={getPriorityBadgeVariant(request.priority)}>
                        {request.priority}
                      </Badge>
                    </div>

                    <p
                      className="mt-4 text-sm font-medium leading-6 text-[color:var(--ink)]"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {request.title}
                    </p>
                    <p className="mt-2 text-xs text-[color:var(--muted)]">{formatDate(request.createdAt)}</p>

                    {request.photoUrls[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={request.photoUrls[0]}
                        alt={request.title}
                        className="mt-4 h-24 w-full rounded-[1rem] object-cover"
                      />
                    ) : null}

                    {next ? (
                      <MotionButton
                        type="button"
                        disabled={updatingId === request.id}
                        onClick={async () => {
                          const previousRows = rows;
                          setUpdatingId(request.id);
                          setRows((current) =>
                            current.map((item) =>
                              item.id === request.id ? { ...item, status: next } : item,
                            ),
                          );

                          try {
                            const response = await fetch("/api/admin/maintenance", {
                              method: "PATCH",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                request_id: request.id,
                                status: next,
                              }),
                            });
                            const payload = (await response.json()) as { success?: boolean; message?: string };

                            if (!response.ok || !payload.success) {
                              throw new Error(payload.message || "Couldn't update request.");
                            }

                            toast({
                              variant: "success",
                              title: "Maintenance updated",
                              description: payload.message ?? "Status moved forward.",
                            });
                          } catch (error) {
                            setRows(previousRows);
                            toast({
                              variant: "error",
                              title: "Update failed",
                              description: error instanceof Error ? error.message : "Couldn't update request.",
                            });
                          } finally {
                            setUpdatingId(null);
                          }
                        }}
                        className="mt-4 rounded-full border border-[color:var(--ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--ink)] hover:bg-[color:var(--ink)] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {updatingId === request.id ? "Updating..." : "Move to next stage"}
                      </MotionButton>
                    ) : null}
                  </article>
                );
              })
            ) : (
              <p className="text-sm leading-7 text-[color:var(--muted)]">Nothing in this column right now.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
