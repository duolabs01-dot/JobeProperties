import nodemailer, { type Transporter } from "nodemailer";

type NotificationPayload = {
  subject: string;
  headline: string;
  lines: string[];
};

let cachedTransport: Transporter | null = null;

function getTransport(): Transporter | null {
  if (cachedTransport) return cachedTransport;

  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) return null;

  cachedTransport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return cachedTransport;
}

const ownerEmail = process.env.OWNER_EMAIL;
const senderEmail = process.env.SENDER_EMAIL ?? "Jobe Propco <notifications@jobepropco.co.za>";
const ownerSms = process.env.OWNER_SMS;

export async function notifyOwner(payload: NotificationPayload) {
  const summary = [payload.headline, ...payload.lines].join("\n");
  const transport = getTransport();

  if (transport && ownerEmail) {
    try {
      await transport.sendMail({
        from: senderEmail,
        to: ownerEmail,
        subject: payload.subject,
        text: summary,
        html: `<div style="font-family:Arial,sans-serif;padding:24px;line-height:1.6"><h2>${payload.headline}</h2><p>${payload.lines.join("<br />")}</p></div>`,
      });
    } catch (err) {
      console.error("[notifyOwner:smtp:error]", err);
    }
  } else {
    console.log("[notifyOwner:email:fallback]", payload);
  }

  if (ownerSms) {
    console.log("[notifyOwner:sms:stub]", {
      to: ownerSms,
      message: `${payload.subject}: ${summary}`,
      provider: process.env.SMS_PROVIDER ?? "configure_sms_provider",
    });
  }

  if (process.env.WHATSAPP_TEMPLATE_ID) {
    console.log("[notifyOwner:whatsapp:stub]", {
      templateId: process.env.WHATSAPP_TEMPLATE_ID,
      message: summary,
    });
  }
}

/**
 * Send a confirmation email to the user themselves (e.g. waiting list signup,
 * viewing booking confirmation). Silent fallback to console if SMTP is unset.
 */
export async function notifyUser({
  to,
  subject,
  headline,
  lines,
}: NotificationPayload & { to: string }) {
  const transport = getTransport();
  if (!transport) {
    console.log("[notifyUser:email:fallback]", { to, subject, headline, lines });
    return;
  }
  try {
    await transport.sendMail({
      from: senderEmail,
      to,
      subject,
      text: [headline, ...lines].join("\n"),
      html: `<div style="font-family:Arial,sans-serif;padding:24px;line-height:1.7"><h2 style="color:#1c1917;margin:0 0 12px">${headline}</h2><p style="color:#3d3936;margin:0">${lines.join("<br />")}</p><hr style="border:none;border-top:1px solid #e7e3dc;margin:24px 0" /><p style="color:#8a857d;font-size:12px;margin:0">Jobe Propco · Alexandra · jobepropco.co.za</p></div>`,
    });
  } catch (err) {
    console.error("[notifyUser:smtp:error]", err);
  }
}
