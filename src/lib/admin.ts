export const adminTabs = [
  "overview",
  "payments",
  "maintenance",
  "waiting-list",
  "units",
  "settings",
] as const;

export type AdminTab = (typeof adminTabs)[number];

export function isAdminEmail(email: string | null | undefined) {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const userEmail = email?.trim().toLowerCase();

  return Boolean(adminEmail && userEmail && adminEmail === userEmail);
}

export function getAdminTab(value: string | undefined): AdminTab {
  if (value && adminTabs.includes(value as AdminTab)) {
    return value as AdminTab;
  }

  return "overview";
}

export function normaliseSouthAfricanPhone(input: string) {
  const digits = input.replace(/\D/g, "");

  if (digits.startsWith("27")) {
    return `+${digits}`;
  }

  if (digits.startsWith("0")) {
    return `+27${digits.slice(1)}`;
  }

  return `+27${digits}`;
}
