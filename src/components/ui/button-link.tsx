"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonLinkProps = React.ComponentProps<typeof Link>;

export function ButtonLink({ className, href, children, ...props }: ButtonLinkProps) {
  const isWhatsappLink = typeof href === "string" && href.startsWith("https://wa.me");

  return (
    <motion.span whileTap={{ scale: 0.97 }} className="inline-flex">
      <Link
        href={href}
        className={cn(
          "transition duration-300",
          isWhatsappLink && "hover:border-[#25D366] hover:bg-[#25D366] hover:text-white",
          className,
        )}
        {...props}
      >
        {children}
      </Link>
    </motion.span>
  );
}
