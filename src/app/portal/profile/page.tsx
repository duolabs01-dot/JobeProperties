import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { ProfileForm } from "@/components/portal/profile-form";
import { createServerClient, type ProfileRow } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Your profile | Jobe Propco",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProfilePage() {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/portal/login?redirectTo=/portal/profile");
  }

  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();
  const profile = profileData as ProfileRow | null;

  return (
    <div className="bg-[color:var(--surface)]">
      <section className="mx-auto w-full max-w-4xl px-5 pb-20 pt-28 sm:px-8 lg:px-12">
        <Link
          href="/portal"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.24em] text-[color:var(--muted)] transition-colors hover:text-[color:var(--ink)]"
        >
          <ChevronLeft className="h-3.5 w-3.5" /> Back to dashboard
        </Link>

        <div className="mt-6 space-y-3">
          <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--accent-dark)]">Your profile</p>
          <h1 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl">
            Profile & preferences
          </h1>
          <p className="max-w-2xl text-base leading-7 text-[color:var(--muted)]">
            Update your photo, name, and phone number. Changes sync to the Jobe team automatically.
          </p>
        </div>

        <div className="mt-10">
          <ProfileForm
            userId={user.id}
            initial={{
              full_name: profile?.full_name ?? null,
              phone: profile?.phone ?? null,
              email: profile?.email ?? user.email ?? null,
              avatar_url: profile?.avatar_url ?? null,
            }}
          />
        </div>
      </section>
    </div>
  );
}
