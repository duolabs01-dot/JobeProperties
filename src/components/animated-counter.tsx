"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedCounterProps = {
  start: number;
  end: number;
  duration: number;
  active: boolean;
  formatValue?: (value: number) => string;
};

export function AnimatedCounter({
  start,
  end,
  duration,
  active,
  formatValue = (value) => `${Math.round(value)}`,
}: AnimatedCounterProps) {
  const [value, setValue] = useState(start);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!active || hasAnimated.current) {
      return;
    }

    hasAnimated.current = true;

    let frameId = 0;
    const startedAt = performance.now();

    const tick = (timestamp: number) => {
      const progress = Math.min((timestamp - startedAt) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      const currentValue = start + (end - start) * eased;

      setValue(currentValue);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [active, duration, end, start]);

  return <span>{formatValue(value)}</span>;
}
