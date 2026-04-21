export type AdminPaymentStatus = "paid" | "pending" | "overdue" | "failed";
export type AdminMaintenanceStatus = "open" | "in_progress" | "resolved";
export type AdminWaitingListStatus = "new" | "contacted" | "qualified" | "archived";
export type AdminBadgeVariant =
  | "default"
  | "phase"
  | "available"
  | "waiting"
  | "unit"
  | "red"
  | "paid"
  | "pending"
  | "overdue"
  | "open"
  | "progress"
  | "resolved";

export type AdminPaymentRecord = {
  id: string;
  tenantId: string;
  tenantName: string;
  phone: string | null;
  unitNumber: string;
  phase: string;
  amount: number;
  dueDate: string;
  status: AdminPaymentStatus;
  paidAt: string | null;
  receiptUrl: string | null;
  remindedAt: string | null;
};

export type AdminMaintenanceRecord = {
  id: string;
  tenantId: string | null;
  unitId: string | null;
  unitNumber: string;
  phase: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: AdminMaintenanceStatus;
  createdAt: string;
  photoUrls: string[];
};

export type AdminWaitingListRecord = {
  id: string;
  name: string;
  phone: string;
  preferredPhase: string | null;
  unitType: string | null;
  createdAt: string;
  status: AdminWaitingListStatus;
};

export type AdminUnitTile = {
  id: string;
  unitNumber: string;
  phase: string;
  unitType: string;
  status: "available" | "reserved" | "occupied" | "maintenance";
  tenantName: string | null;
  tenantPhone: string | null;
  leaseStartDate: string | null;
  leaseEndDate: string | null;
  paymentStatus: AdminPaymentStatus | null;
};

export type AdminPhaseSection = {
  badge: string;
  name: string;
  address: string;
  units: AdminUnitTile[];
};

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(value: string | null) {
  if (!value) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function formatDateTime(value: string | null) {
  if (!value) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function formatUnitType(value: string | null) {
  if (!value) {
    return "Not set";
  }

  return value.replace(/-/g, " ");
}

export function getPaymentBadgeVariant(status: AdminPaymentStatus): AdminBadgeVariant {
  switch (status) {
    case "paid":
      return "available";
    case "pending":
      return "phase";
    case "overdue":
    case "failed":
      return "red";
    default:
      return "default";
  }
}

export function getMaintenanceStatusBadgeVariant(status: AdminMaintenanceStatus): AdminBadgeVariant {
  switch (status) {
    case "open":
      return "phase";
    case "in_progress":
      return "progress";
    case "resolved":
      return "available";
    default:
      return "default";
  }
}

export function getPriorityBadgeVariant(priority: "low" | "medium" | "high"): AdminBadgeVariant {
  switch (priority) {
    case "high":
      return "red";
    case "medium":
      return "phase";
    case "low":
      return "waiting";
    default:
      return "default";
  }
}

export function getWaitingListBadgeVariant(status: AdminWaitingListStatus): AdminBadgeVariant {
  switch (status) {
    case "new":
      return "phase";
    case "contacted":
      return "open";
    case "qualified":
      return "available";
    case "archived":
      return "waiting";
    default:
      return "default";
  }
}
