/**
 * Google Calendar booking helpers. Two paths supported:
 *
 * 1. Calendly-style: set GOOGLE_CALENDAR_BOOKING_URL to a public booking page
 *    (e.g. Cal.com, Google Calendar appointment schedule, Calendly). The site
 *    then deep-links visitors there. Zero backend setup.
 *
 * 2. Programmatic: set GOOGLE_CALENDAR_API_TOKEN + GOOGLE_CALENDAR_ID to call
 *    the Google Calendar API directly from the server. Use this when you want
 *    full control over availability slots.
 *
 * For the launch, path 1 is fine — Cal.com or a Google appointment schedule
 * has a 5-minute setup vs. days of OAuth dance.
 */

/**
 * Booking URL (Cal.com / Google Appointments). Public, so we expose it via
 * NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL; the unprefixed
 * GOOGLE_CALENDAR_BOOKING_URL still works as a fallback for server-only code.
 */
export function getBookingUrl(
  source: "viewing" | "consultation" | "venue" = "viewing",
): string | null {
  const url =
    process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL ??
    process.env.GOOGLE_CALENDAR_BOOKING_URL;
  if (!url) return null;
  try {
    const u = new URL(url);
    u.searchParams.set("utm_source", "jobepropco");
    u.searchParams.set("utm_medium", "site");
    u.searchParams.set("utm_campaign", source);
    return u.toString();
  } catch {
    return url;
  }
}

export type BookingSlot = {
  start: string; // ISO
  end: string; // ISO
  summary: string;
  attendeeEmail: string;
  attendeeName?: string;
  description?: string;
};

/**
 * Programmatic event creation against the Google Calendar API. Requires an
 * OAuth or service-account token in GOOGLE_CALENDAR_API_TOKEN.
 */
export async function createCalendarEvent(slot: BookingSlot) {
  const token = process.env.GOOGLE_CALENDAR_API_TOKEN;
  const calendarId = process.env.GOOGLE_CALENDAR_ID ?? "primary";
  if (!token) {
    console.log("[calendar:fallback] would create event:", slot);
    return { ok: false, reason: "GOOGLE_CALENDAR_API_TOKEN unset" } as const;
  }

  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?sendUpdates=all`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        summary: slot.summary,
        description: slot.description,
        start: { dateTime: slot.start, timeZone: "Africa/Johannesburg" },
        end: { dateTime: slot.end, timeZone: "Africa/Johannesburg" },
        attendees: [
          { email: slot.attendeeEmail, displayName: slot.attendeeName },
        ],
      }),
    },
  );

  if (!response.ok) {
    const text = await response.text();
    console.error("[calendar:error]", text);
    return { ok: false, reason: text } as const;
  }

  const event = (await response.json()) as { htmlLink?: string; id?: string };
  return { ok: true, htmlLink: event.htmlLink ?? null, eventId: event.id ?? null } as const;
}
