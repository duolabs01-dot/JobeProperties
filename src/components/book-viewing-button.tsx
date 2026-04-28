"use client";

import { ButtonLink } from "@/components/ui/button-link";
import { Magnetic } from "@/components/ui/magnetic";
import { getBookingUrl } from "@/lib/calendar";
import { whatsappUrl } from "@/lib/property-data";

type BookViewingButtonProps = {
  /** Tag the booking source for UTM tracking. */
  source?: "viewing" | "consultation" | "venue";
  /** Override the default cream-pill styling. */
  className?: string;
  /** Override the visible label. */
  label?: string;
  /** Magnetic strength, 0–1. Default 0.22. */
  strength?: number;
  /** Pre-filled WhatsApp text used when the calendar URL is unset. */
  fallbackWhatsappText?: string;
};

const DEFAULT_CLASS =
  "inline-flex items-center justify-center rounded-full bg-[color:var(--accent)] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.28em] text-white hover:bg-[color:var(--accent-dark)]";

/**
 * Server component. Renders a "Book a viewing" CTA pointing at the configured
 * Google Calendar / Cal.com booking URL. Falls back to a pre-filled WhatsApp
 * deep link when GOOGLE_CALENDAR_BOOKING_URL is unset, so the button is never
 * dead.
 */
export function BookViewingButton({
  source = "viewing",
  className = DEFAULT_CLASS,
  label = "Book a viewing",
  strength = 0.22,
  fallbackWhatsappText = "Hi, I'd like to book a viewing of a Jobe studio. When are you free?",
}: BookViewingButtonProps) {
  const bookingUrl = getBookingUrl(source);
  const href =
    bookingUrl ??
    `${whatsappUrl.split("?")[0]}?text=${encodeURIComponent(fallbackWhatsappText)}`;

  return (
    <Magnetic strength={strength}>
      <ButtonLink href={href} target="_blank" rel="noreferrer" className={className}>
        {label}
      </ButtonLink>
    </Magnetic>
  );
}
