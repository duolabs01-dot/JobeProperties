"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MotionButton } from "@/components/ui/button";
import { createBrowserClient } from "@/lib/supabase";

export function LogoutButton() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  return (
    <MotionButton
      type="button"
      disabled={isPending}
      onClick={async () => {
        setIsPending(true);
        const supabase = createBrowserClient();
        await supabase.auth.signOut();
        router.replace("/portal/login");
        router.refresh();
      }}
      className="inline-flex items-center justify-center rounded-full border border-[color:var(--ink)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--ink)] transition duration-300 hover:bg-[color:var(--ink)] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isPending ? "Logging out..." : "Logout"}
    </MotionButton>
  );
}
