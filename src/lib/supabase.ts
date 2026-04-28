import {
  createBrowserClient as createSupabaseBrowserClient,
  createServerClient as createSupabaseServerClient,
} from "@supabase/ssr";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { NextRequest, NextResponse } from "next/server";

export type UnitRow = {
  id: string;
  phase: string;
  unit_number: string;
  unit_type: string;
  monthly_rent: number;
  status: "available" | "reserved" | "occupied" | "maintenance";
  available_from: string | null;
  created_at: string;
};

export type TenantRow = {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  unit_id: string | null;
  auth_user_id: string | null;
  status: "lead" | "active" | "notice" | "archived";
  created_at: string;
};

export type LeaseRow = {
  id: string;
  tenant_id: string;
  unit_id: string;
  start_date: string;
  end_date: string | null;
  deposit_amount: number | null;
  monthly_rent: number;
  signed_document_url: string | null;
  move_in_date: string | null;
  move_out_date: string | null;
  created_at: string;
};

export type PaymentRow = {
  id: string;
  tenant_id: string;
  lease_id: string | null;
  amount: number;
  due_date: string;
  paid_at: string | null;
  reminded_at: string | null;
  status: "pending" | "paid" | "overdue" | "failed";
  gateway: string | null;
  gateway_reference: string | null;
  receipt_url: string | null;
  created_at: string;
};

export type MaintenanceRequestRow = {
  id: string;
  tenant_id: string | null;
  unit_id: string | null;
  title: string;
  description: string;
  photo_urls: string[];
  priority: "low" | "medium" | "high";
  status: "open" | "in_progress" | "resolved";
  created_at: string;
};

export type WaitingListRow = {
  id: string;
  full_name: string;
  phone: string;
  preferred_phase: string | null;
  preferred_unit_type: string | null;
  notes: string | null;
  contacted_at: string | null;
  status: "new" | "contacted" | "qualified" | "archived";
  created_at: string;
};

export type ProfileRow = {
  id: string;
  full_name: string | null;
  phone: string | null;
  email: string | null;
  role: "tenant" | "admin" | "partner" | "lead";
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export type AdminAuditLogRow = {
  id: string;
  actor_id: string | null;
  actor_email: string | null;
  action: string;
  target_user_id: string | null;
  target_email: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
};

export type AppDatabase = {
  public: {
    Tables: {
      units: {
        Row: UnitRow;
        Insert: Omit<UnitRow, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<UnitRow>;
      };
      tenants: {
        Row: TenantRow;
        Insert: Omit<TenantRow, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<TenantRow>;
      };
      leases: {
        Row: LeaseRow;
        Insert: Omit<LeaseRow, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<LeaseRow>;
      };
      payments: {
        Row: PaymentRow;
        Insert: Omit<PaymentRow, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<PaymentRow>;
      };
      maintenance_requests: {
        Row: MaintenanceRequestRow;
        Insert: Omit<MaintenanceRequestRow, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<MaintenanceRequestRow>;
      };
      waiting_list: {
        Row: WaitingListRow;
        Insert: Omit<WaitingListRow, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<WaitingListRow>;
      };
      profiles: {
        Row: ProfileRow;
        Insert: Omit<ProfileRow, "created_at" | "updated_at"> & {
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<ProfileRow>;
      };
      admin_audit_log: {
        Row: AdminAuditLogRow;
        Insert: Omit<AdminAuditLogRow, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<AdminAuditLogRow>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Missing Supabase environment variables.");
  }

  return { url, anonKey };
}

function getServiceRoleConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("Missing Supabase service role environment variables.");
  }

  return { url, serviceRoleKey };
}

export function createBrowserClient(): SupabaseClient<AppDatabase> {
  const { url, anonKey } = getSupabaseConfig();

  return createSupabaseBrowserClient<AppDatabase>(url, anonKey);
}

export async function createServerClient(): Promise<SupabaseClient<AppDatabase>> {
  const { url, anonKey } = getSupabaseConfig();
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();

  return createSupabaseServerClient<AppDatabase>(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          if ("set" in cookieStore) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          }
        } catch {
          // Server components cannot always mutate cookies. The proxy handles refreshes.
        }
      },
    },
  });
}

export function createProxyClient(
  request: NextRequest,
  response: NextResponse,
): SupabaseClient<AppDatabase> {
  const { url, anonKey } = getSupabaseConfig();

  return createSupabaseServerClient<AppDatabase>(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });
}

export function createServiceRoleClient(): SupabaseClient<AppDatabase> {
  const { url, serviceRoleKey } = getServiceRoleConfig();

  return createClient<AppDatabase>(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
