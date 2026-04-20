import { Resend } from "resend";

type NotificationPayload = {
  subject: string;
  headline: string;
  lines: string[];
};

const resendApiKey = process.env.RESEND_API_KEY;
const ownerEmail = process.env.OWNER_EMAIL;
const senderEmail = process.env.SENDER_EMAIL ?? "Jobe Propco <notifications@jobepropco.co.za>";
const ownerSms = process.env.OWNER_SMS;

export async function notifyOwner(payload: NotificationPayload) {
  const summary = [payload.headline, ...payload.lines].join("\n");

  if (resendApiKey && ownerEmail) {
    const resend = new Resend(resendApiKey);
    await resend.emails.send({
      from: senderEmail,
      to: ownerEmail,
      subject: payload.subject,
      text: summary,
      html: `<div style="font-family:Arial,sans-serif;padding:24px;line-height:1.6"><h2>${payload.headline}</h2><p>${payload.lines.join("<br />")}</p></div>`,
    });
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
