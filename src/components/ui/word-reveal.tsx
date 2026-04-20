"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";

type WordRevealProps = {
  text: string;
  className?: string;
  delay?: number;
};

export function WordReveal({ text, className, delay = 0 }: WordRevealProps) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const words = text.split(" ");

  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          aria-hidden="true"
          style={{ display: "inline-block", marginRight: "0.28em" }}
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
            delay: delay + index * 0.06,
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
