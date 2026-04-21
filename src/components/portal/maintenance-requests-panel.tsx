"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { MotionButton } from "@/components/ui/button";
import { PortalStatusBadge } from "@/components/portal/portal-status-badge";
import { useToast } from "@/components/ui/toast";
import { createBrowserClient, type MaintenanceRequestRow } from "@/lib/supabase";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function safeFileName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9.-]+/g, "-");
}

type MaintenanceRequestsPanelProps = {
  requests: MaintenanceRequestRow[];
  tenantId: string;
  unitId: string | null;
};

export function MaintenanceRequestsPanel({
  requests,
  tenantId,
  unitId,
}: MaintenanceRequestsPanelProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setFile(null);
  };

  return (
    <div className="space-y-5 rounded-[2rem] border border-[color:var(--line-strong)] bg-white p-6 shadow-[0_20px_70px_rgba(17,24,15,0.06)]">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--accent-dark)]">Maintenance requests</p>
          <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">Recent issues</h2>
        </div>

        <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
          <DialogPrimitive.Trigger asChild>
            <MotionButton
              type="button"
              className="inline-flex items-center justify-center rounded-full bg-[color:var(--ink)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition duration-300 hover:bg-[color:var(--accent-dark)]"
            >
              Log new request
            </MotionButton>
          </DialogPrimitive.Trigger>

          <AnimatePresence>
            {open ? (
              <DialogPrimitive.Portal forceMount>
                <DialogPrimitive.Overlay asChild forceMount>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm"
                  />
                </DialogPrimitive.Overlay>

                <DialogPrimitive.Content asChild forceMount>
                  <motion.div
                    initial={{ opacity: 0, y: 18, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 18, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed left-1/2 top-1/2 z-[81] w-[min(92vw,36rem)] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-[color:var(--line-strong)] bg-white p-6 shadow-[0_28px_90px_rgba(17,24,15,0.2)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <DialogPrimitive.Title className="font-display text-3xl leading-none text-[color:var(--ink)]">
                          Log a maintenance request
                        </DialogPrimitive.Title>
                        <DialogPrimitive.Description className="text-sm leading-7 text-[color:var(--muted)]">
                          Tell us what&apos;s wrong and add a photo if it helps us see it faster.
                        </DialogPrimitive.Description>
                      </div>

                      <DialogPrimitive.Close asChild>
                        <MotionButton
                          type="button"
                          className="inline-flex items-center justify-center rounded-full border border-[color:var(--line-strong)] bg-[color:var(--surface)] p-3 text-[color:var(--ink)]"
                        >
                          <X className="h-4 w-4" />
                        </MotionButton>
                      </DialogPrimitive.Close>
                    </div>

                    <form
                      className="mt-6 space-y-4"
                      onSubmit={async (event) => {
                        event.preventDefault();
                        setIsSubmitting(true);

                        try {
                          const supabase = createBrowserClient();

                          if (title.trim().length < 3 || description.trim().length < 10) {
                            throw new Error("Please add a clear title and description.");
                          }

                          const photoUrls: string[] = [];

                          if (file) {
                            const filePath = `${tenantId}/${Date.now()}-${safeFileName(file.name)}`;
                            const { data: uploadData, error: uploadError } = await supabase.storage
                              .from("maintenance-photos")
                              .upload(filePath, file, {
                                upsert: false,
                              });

                            if (uploadError) {
                              throw uploadError;
                            }

                            const {
                              data: { publicUrl },
                            } = supabase.storage.from("maintenance-photos").getPublicUrl(uploadData.path);

                            photoUrls.push(publicUrl);
                          }

                          const { error } = await supabase.from("maintenance_requests").insert({
                            tenant_id: tenantId,
                            unit_id: unitId,
                            title: title.trim(),
                            description: description.trim(),
                            photo_urls: photoUrls,
                            priority: "medium",
                            status: "open",
                          } as never);

                          if (error) {
                            throw error;
                          }

                          toast({
                            variant: "success",
                            title: "Request logged",
                            description: "We’ve added your maintenance request.",
                          });
                          resetForm();
                          setOpen(false);
                          router.refresh();
                        } catch (error) {
                          toast({
                            variant: "error",
                            title: "Could not save request",
                            description: error instanceof Error ? error.message : "Couldn't save your request.",
                          });
                        } finally {
                          setIsSubmitting(false);
                        }
                      }}
                    >
                      <label className="block space-y-2 text-sm text-[color:var(--ink)]">
                        <span>Title</span>
                        <input
                          value={title}
                          onChange={(event) => setTitle(event.target.value)}
                          className="w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--surface)] px-4 py-3 outline-none"
                          placeholder="What needs attention?"
                        />
                      </label>

                      <label className="block space-y-2 text-sm text-[color:var(--ink)]">
                        <span>Description</span>
                        <textarea
                          value={description}
                          onChange={(event) => setDescription(event.target.value)}
                          rows={5}
                          className="w-full rounded-[1.5rem] border border-[color:var(--line-strong)] bg-[color:var(--surface)] px-4 py-3 outline-none"
                          placeholder="Tell us what happened and where it is."
                        />
                      </label>

                      <label className="block space-y-2 text-sm text-[color:var(--ink)]">
                        <span>Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
                          className="w-full rounded-[1rem] border border-[color:var(--line-strong)] bg-[color:var(--surface)] px-4 py-3 text-sm"
                        />
                      </label>

                      <MotionButton
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center rounded-full bg-[color:var(--accent)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white transition duration-300 hover:bg-[color:var(--accent-dark)] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isSubmitting ? "Saving..." : "Submit request"}
                      </MotionButton>
                    </form>
                  </motion.div>
                </DialogPrimitive.Content>
              </DialogPrimitive.Portal>
            ) : null}
          </AnimatePresence>
        </DialogPrimitive.Root>
      </div>

      <div className="space-y-4">
        {requests.length > 0 ? (
          requests.map((request) => (
            <div
              key={request.id}
              className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <p className="text-lg font-semibold tracking-[-0.03em] text-[color:var(--ink)]">{request.title}</p>
                  <p className="text-sm text-[color:var(--muted)]">{formatDate(request.created_at)}</p>
                </div>
                <PortalStatusBadge kind="maintenance" value={request.status} />
              </div>

              {request.photo_urls[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={request.photo_urls[0]}
                  alt={request.title}
                  className="mt-4 h-24 w-24 rounded-[1rem] object-cover"
                />
              ) : null}
            </div>
          ))
        ) : (
          <p className="text-sm leading-7 text-[color:var(--muted)]">No maintenance requests logged yet.</p>
        )}
      </div>
    </div>
  );
}
