"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MotionButton } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { createBrowserClient } from "@/lib/supabase";

type LoginTab = "phone" | "email";

function normaliseSouthAfricanPhone(input: string) {
  const digits = input.replace(/\D/g, "");

  if (digits.startsWith("27")) {
    return `+${digits}`;
  }

  if (digits.startsWith("0")) {
    return `+27${digits.slice(1)}`;
  }

  return `+27${digits}`;
}

export function PortalLoginForm({ redirectTo = "/portal" }: { redirectTo?: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const [tab, setTab] = useState<LoginTab>("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [otpType, setOtpType] = useState<"sms" | "email">("sms");
  const [hasSentOtp, setHasSentOtp] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const supabase = createBrowserClient();

    const redirectIfReady = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        router.replace(redirectTo);
      }
    };

    redirectIfReady();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event !== "SIGNED_OUT" && session) {
        router.replace(redirectTo);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [redirectTo, router]);

  const handleSendLink = async () => {
    setIsSending(true);
    setStatusMessage(null);

    try {
      const supabase = createBrowserClient();

      if (tab === "phone") {
        const formattedPhone = normaliseSouthAfricanPhone(phone);
        const { error } = await supabase.auth.signInWithOtp({
          phone: formattedPhone,
        });

        if (error) {
          throw error;
        }

        setIdentifier(formattedPhone);
        setOtpType("sms");
        setHasSentOtp(true);
        setStatusMessage("Check your SMS for a login link.");
        toast({
          variant: "success",
          title: "SMS sent",
          description: "Check your SMS for a login link.",
        });
      } else {
        const redirectBase = process.env.NEXT_PUBLIC_URL || window.location.origin;
        const { error } = await supabase.auth.signInWithOtp({
          email: email.trim(),
          options: {
            emailRedirectTo: `${redirectBase}/portal/login`,
          },
        });

        if (error) {
          throw error;
        }

        setIdentifier(email.trim());
        setOtpType("email");
        setHasSentOtp(true);
        setStatusMessage("Check your email for a login link.");
        toast({
          variant: "success",
          title: "Email sent",
          description: "Check your email for a login link.",
        });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Couldn't send your login link.";
      setStatusMessage(message);
      toast({
        variant: "error",
        title: "Could not send link",
        description: message,
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleVerifyCode = async () => {
    setIsVerifying(true);

    try {
      const supabase = createBrowserClient();
      const verification =
        otpType === "sms"
          ? await supabase.auth.verifyOtp({
              phone: identifier,
              token,
              type: "sms",
            })
          : await supabase.auth.verifyOtp({
              email: identifier,
              token,
              type: "email",
            });

      if (verification.error) {
        throw verification.error;
      }

      toast({
        variant: "success",
        title: "Logged in",
        description: "Taking you to your tenant dashboard.",
      });
      router.replace(redirectTo);
    } catch (error) {
      toast({
        variant: "error",
        title: "Code not accepted",
        description: error instanceof Error ? error.message : "Couldn't verify your code.",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="rounded-[2rem] border border-[color:var(--line-strong)] bg-white p-6 shadow-[0_24px_80px_rgba(17,24,15,0.08)] sm:p-8">
      <div className="inline-flex rounded-full border border-[color:var(--line-strong)] bg-[color:var(--paper)] p-1">
        {(["phone", "email"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setTab(item);
              setStatusMessage(null);
            }}
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] transition ${
              tab === item ? "bg-[color:var(--ink)] text-white" : "text-[color:var(--muted)]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-5">
        {tab === "phone" ? (
          <label className="block space-y-2 text-sm text-[color:var(--ink)]">
            <span>Phone number</span>
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              type="tel"
              placeholder="071 234 5678"
              className="w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--paper)] px-4 py-3 outline-none"
            />
          </label>
        ) : (
          <label className="block space-y-2 text-sm text-[color:var(--ink)]">
            <span>Email address</span>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--paper)] px-4 py-3 outline-none"
            />
          </label>
        )}

        <MotionButton
          type="button"
          disabled={isSending || (tab === "phone" ? phone.trim().length < 10 : email.trim().length < 5)}
          onClick={handleSendLink}
          className="inline-flex items-center justify-center rounded-full bg-[color:var(--ink)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-white transition duration-300 hover:bg-[color:var(--olive)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSending ? "Sending..." : "Send link"}
        </MotionButton>

        {statusMessage ? <p className="text-sm leading-7 text-[color:var(--muted)]">{statusMessage}</p> : null}

        {hasSentOtp ? (
          <div className="space-y-4 rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--paper)] p-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-[color:var(--ink)]">Enter your 6-digit code</p>
              <p className="text-sm leading-7 text-[color:var(--muted)]">
                If you received a login code as well, enter it here to finish signing in.
              </p>
            </div>

            <input
              value={token}
              onChange={(event) => setToken(event.target.value.replace(/\D/g, "").slice(0, 6))}
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="123456"
              className="w-full rounded-full border border-[color:var(--line-strong)] bg-white px-4 py-3 text-center text-lg tracking-[0.4em] outline-none"
            />

            <MotionButton
              type="button"
              disabled={isVerifying || token.length !== 6}
              onClick={handleVerifyCode}
              className="inline-flex items-center justify-center rounded-full border border-[color:var(--ink)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--ink)] transition duration-300 hover:bg-[color:var(--ink)] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isVerifying ? "Verifying..." : "Verify code"}
            </MotionButton>
          </div>
        ) : null}
      </div>
    </div>
  );
}
