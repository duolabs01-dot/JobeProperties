"use client";

import * as Switch from "@radix-ui/react-switch";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

const STORAGE_KEY = "jobe:automatic-rent-reminders";

const upcomingReminderTemplate =
  "Hi [Name], your rent of R[Amount] for [Unit] is due on [Date]. Please pay at: https://jobepropco.vercel.app/portal or WhatsApp us on 072 229 3229.";

const overdueReminderTemplate =
  "Hi [Name], your rent was due on [Date] and hasn't been received yet. Please pay at: https://jobepropco.vercel.app/portal or WhatsApp us on 072 229 3229.";

export function ReminderSettingsCard() {
  const [enabled, setEnabled] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const storedValue = window.localStorage.getItem(STORAGE_KEY);

      if (storedValue === "false") {
        setEnabled(false);
      }

      setReady(true);
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!ready) {
      return;
    }

    // TODO: Persist this to a shared Supabase settings table once admin settings move out of localStorage.
    window.localStorage.setItem(STORAGE_KEY, String(enabled));
  }, [enabled, ready]);

  return (
    <article className="rounded-[2rem] border border-[color:var(--line-strong)] bg-white p-6 shadow-[0_20px_70px_rgba(17,24,15,0.06)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--olive)]">
            Automatic rent reminders
          </p>
          <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">
            Daily reminder flow
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-[color:var(--muted)]">
            This toggle is stored in this browser for now, so Dr Sithole can preview the reminder setup
            before we move it into a shared settings table.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant={enabled ? "available" : "waiting"}>
            {enabled ? "Enabled" : "Disabled"}
          </Badge>
          <Switch.Root
            checked={enabled}
            onCheckedChange={setEnabled}
            aria-label="Toggle automatic rent reminders"
            className="relative h-8 w-14 rounded-full border border-[color:var(--line-strong)] bg-[color:var(--paper)] transition-colors duration-300 data-[state=checked]:bg-[color:var(--olive)]"
          >
            <Switch.Thumb className="block h-6 w-6 translate-x-1 rounded-full bg-white shadow-sm transition-transform duration-300 data-[state=checked]:translate-x-7" />
          </Switch.Root>
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--olive)]">
            3 days before due date message
          </p>
          <pre className="overflow-x-auto rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--paper)] p-4 text-xs leading-6 text-[color:var(--muted)]">
            <code>{upcomingReminderTemplate}</code>
          </pre>
        </div>

        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--olive)]">
            On the day - overdue message
          </p>
          <pre className="overflow-x-auto rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--paper)] p-4 text-xs leading-6 text-[color:var(--muted)]">
            <code>{overdueReminderTemplate}</code>
          </pre>
        </div>
      </div>

      <p className="mt-5 text-sm leading-7 text-[color:var(--muted)]">
        To activate WhatsApp sending, add your <code>WASSENGER_API_KEY</code> to Vercel environment
        variables.
      </p>
    </article>
  );
}
