"use client";

import type { HTMLMotionProps, Transition, Variants } from "framer-motion";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";

export const revealEase: Transition["ease"] = [0.22, 1, 0.36, 1];

export const revealItemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: revealEase },
  },
};

const revealContainerVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: revealEase },
  },
};

const revealStaggerVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: revealEase,
      delayChildren: 0.1,
      staggerChildren: 0.08,
    },
  },
};

type RevealSectionProps = HTMLMotionProps<"section"> & {
  stagger?: boolean;
};

export function RevealSection({ stagger = false, children, ...props }: RevealSectionProps) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger ? revealStaggerVariants : revealContainerVariants}
      {...props}
    >
      {children}
    </motion.section>
  );
}

type RevealItemProps = HTMLMotionProps<"div">;

export function RevealItem(props: RevealItemProps) {
  return <motion.div variants={revealItemVariants} {...props} />;
}
