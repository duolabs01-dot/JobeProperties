"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type AnimatedStatValueProps = {
  value: string;
};

function parseValue(value: string) {
  const match = value.match(/^(\D*)([\d,.]+)(.*)$/);

  if (!match) {
    return null;
  }

  const [, prefix, numericPart, suffix] = match;
  const decimals = numericPart.includes(".") ? numericPart.split(".")[1]?.length ?? 0 : 0;
  const numericValue = Number(numericPart.replace(/,/g, ""));

  if (Number.isNaN(numericValue)) {
    return null;
  }

  return { prefix, suffix, numericValue, decimals };
}

function formatValue(value: number, decimals: number) {
  return new Intl.NumberFormat("en-ZA", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function AnimatedStatValue({ value }: AnimatedStatValueProps) {
  const parsedValue = useMemo(() => parseValue(value), [value]);
  const ref = useRef<HTMLSpanElement | null>(null);
  const [displayValue, setDisplayValue] = useState(() =>
    parsedValue ? `${parsedValue.prefix}${formatValue(0, parsedValue.decimals)}${parsedValue.suffix}` : value,
  );

  useEffect(() => {
    if (!parsedValue || !ref.current) {
      return;
    }

    let hasAnimated = false;
    let frameId = 0;

    const animate = () => {
      const startedAt = performance.now();
      const duration = 1500;

      const tick = (timestamp: number) => {
        const rawProgress = Math.min((timestamp - startedAt) / duration, 1);
        const easedProgress = 1 - (1 - rawProgress) ** 3;
        const currentValue = parsedValue.numericValue * easedProgress;

        setDisplayValue(
          `${parsedValue.prefix}${formatValue(currentValue, parsedValue.decimals)}${parsedValue.suffix}`,
        );

        if (rawProgress < 1) {
          frameId = window.requestAnimationFrame(tick);
        }
      };

      frameId = window.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (!entry?.isIntersecting || hasAnimated) {
          return;
        }

        hasAnimated = true;
        animate();
        observer.disconnect();
      },
      { threshold: 0.45 },
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [parsedValue]);

  return <span ref={ref}>{displayValue}</span>;
}
