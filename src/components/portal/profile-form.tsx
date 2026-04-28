"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Check, Loader2 } from "lucide-react";
import { MotionButton } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { createBrowserClient } from "@/lib/supabase";

type ProfileFormProps = {
  userId: string;
  initial: {
    full_name: string | null;
    phone: string | null;
    email: string | null;
    avatar_url: string | null;
  };
};

export function ProfileForm({ userId, initial }: ProfileFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState(initial.full_name ?? "");
  const [phone, setPhone] = useState(initial.phone ?? "");
  const [avatarUrl, setAvatarUrl] = useState(initial.avatar_url ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showSavedPill, setShowSavedPill] = useState(false);

  useEffect(() => {
    if (!showSavedPill) return;
    const id = setTimeout(() => setShowSavedPill(false), 3000);
    return () => clearTimeout(id);
  }, [showSavedPill]);

  const initials = (fullName || initial.email || "?")
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  async function handleAvatarPick(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({ variant: "error", title: "That's not an image", description: "Pick a JPG, PNG, or WebP." });
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      toast({ variant: "error", title: "Too large", description: "Pick an image under 4MB." });
      return;
    }

    setIsUploading(true);
    try {
      const supabase = createBrowserClient();
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
      const path = `${userId}/avatar-${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, file, { cacheControl: "3600", upsert: true });
      if (uploadError) throw uploadError;

      const { data: publicData } = supabase.storage.from("avatars").getPublicUrl(path);
      const url = publicData.publicUrl;
      setAvatarUrl(url);

      // Persist immediately so the avatar shows on the dashboard right away.
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatar_url: url }),
      });
      const payload = (await response.json()) as { message: string };
      if (!response.ok) throw new Error(payload.message);

      toast({ variant: "success", title: "Photo updated" });
      startTransition(() => router.refresh());
    } catch (err) {
      toast({
        variant: "error",
        title: "Upload failed",
        description: err instanceof Error ? err.message : "Try another image.",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsSaving(true);
    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name: fullName.trim(), phone: phone.trim() }),
      });
      const payload = (await response.json()) as { message: string };
      if (!response.ok) throw new Error(payload.message);

      toast({ variant: "success", title: "Saved", description: payload.message });
      setShowSavedPill(true);
      startTransition(() => router.refresh());
    } catch (err) {
      toast({
        variant: "error",
        title: "Couldn't save",
        description: err instanceof Error ? err.message : "Try again.",
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-[color:var(--line-strong)] bg-white p-6 shadow-[0_24px_70px_rgba(17,24,15,0.06)] sm:p-8"
    >
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          aria-label="Change profile photo"
          className="group relative h-28 w-28 shrink-0 overflow-hidden rounded-full border border-[color:var(--line-strong)] bg-[color:var(--accent-light)]"
        >
          <AnimatePresence mode="wait">
            {avatarUrl ? (
              <motion.div
                key={avatarUrl}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={avatarUrl}
                  alt="Your photo"
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </motion.div>
            ) : (
              <motion.span
                key="initials"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-full w-full items-center justify-center font-display text-3xl text-[color:var(--accent-dark)]"
              >
                {initials}
              </motion.span>
            )}
          </AnimatePresence>

          <div className="absolute inset-0 flex items-center justify-center bg-[rgba(28,25,23,0.55)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {isUploading ? (
              <Loader2 className="h-6 w-6 animate-spin text-white" />
            ) : (
              <Camera className="h-6 w-6 text-white" />
            )}
          </div>
        </motion.button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleAvatarPick}
          className="hidden"
        />

        <div className="space-y-1 text-center sm:text-left">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--accent-dark)]">Photo</p>
          <p className="text-sm text-[color:var(--muted)]">
            Tap your avatar to upload a new one. JPG, PNG, or WebP — under 4MB.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <label className="block space-y-2 text-sm text-[color:var(--ink)]">
          <span className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">Full name</span>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--surface)] px-4 py-3 outline-none transition-colors focus:border-[color:var(--accent)]"
            placeholder="Your full name"
            required
            minLength={2}
          />
        </label>

        <label className="block space-y-2 text-sm text-[color:var(--ink)]">
          <span className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">Phone</span>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            className="w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--surface)] px-4 py-3 outline-none transition-colors focus:border-[color:var(--accent)]"
            placeholder="071 234 5678"
          />
        </label>

        <label className="block space-y-2 text-sm text-[color:var(--ink)] sm:col-span-2">
          <span className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">Email</span>
          <input
            value={initial.email ?? ""}
            disabled
            className="w-full cursor-not-allowed rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3 text-[color:var(--muted)] outline-none"
          />
          <span className="text-xs text-[color:var(--muted)]">
            Email is locked to your sign-in. WhatsApp us if you need to change it.
          </span>
        </label>
      </div>

      <div className="mt-8 flex items-center gap-3">
        <MotionButton
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--accent)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-white hover:bg-[color:var(--accent-dark)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving
            </>
          ) : (
            "Save changes"
          )}
        </MotionButton>

        <AnimatePresence>
          {showSavedPill ? (
            <motion.span
              key="saved-pill"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="inline-flex items-center gap-1.5 text-xs text-[color:var(--accent-dark)]"
            >
              <Check className="h-3.5 w-3.5" /> Saved
            </motion.span>
          ) : null}
        </AnimatePresence>
      </div>
    </form>
  );
}
